'use client'

import { useEffect, useState } from 'react'
import { lookupWord } from '@/utils/dictionary'

export default function DictionaryPanel({ word }){
  // 어떤 단어에 대한 결과인지 함께 저장해서, 단어가 바뀌면 자동으로 '불러오는 중'이 된다.
  const [result, setResult] = useState({ word: null, data: null, error: false });

  useEffect(() => {
    let ignore = false;
    lookupWord(word)
      .then(data => { if (!ignore) setResult({ word, data, error: false }); })
      .catch(() => { if (!ignore) setResult({ word, data: null, error: true }); });
    return () => { ignore = true; };
  }, [word]);

  if (result.word !== word){
    return <div className="dict-panel dict-muted">📖 사전 정보를 불러오는 중...</div>;
  }
  if (result.error){
    return <div className="dict-panel dict-muted">사전 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</div>;
  }
  if (!result.data){
    return <div className="dict-panel dict-muted">사전에서 이 단어를 찾을 수 없어요.</div>;
  }

  const { phonetic, audio, meanings } = result.data;

  return (
    <div className="dict-panel">
      <div className="dict-head">
        <strong className="dict-word">{word}</strong>
        {phonetic && <span className="dict-phonetic">{phonetic}</span>}
        {audio && (
          <button
            type="button"
            className="dict-audio"
            onClick={() => new Audio(audio).play()}
            aria-label={`${word} 발음 듣기`}
          >
            🔊 발음 듣기
          </button>
        )}
      </div>

      {meanings.map((m, i) => (
        <div className="dict-meaning" key={i}>
          <span className="dict-pos">{m.partOfSpeech}</span>
          <ol>
            {m.definitions.map((d, j) => <li key={j}>{d}</li>)}
          </ol>
          {m.example && <div className="dict-example">“{m.example}”</div>}
        </div>
      ))}

      <div className="dict-source">Merriam-Webster Collegiate® Dictionary</div>
    </div>
  );
}
