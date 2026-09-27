'use client'

import { useState } from 'react'
import CategoryTabs from './CategoryTabs'
import { useStudy } from './StudyProvider'
import { WORDS } from '@/data/content'

const CATEGORIES = ['전체', ...new Set(WORDS.map(w => w.category))];

export default function Flashcards(){
  const { mastered, updateMastered } = useStudy();
  const [category, setCategory] = useState('전체');
  const [fcIndex, setFcIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const words = category === '전체' ? WORDS : WORDS.filter(w => w.category === category);
  const w = words[fcIndex];

  function selectCategory(cat){
    setCategory(cat);
    setFcIndex(0);
    setFlipped(false);
  }

  function moveCard(delta){
    setFcIndex(i => (i + delta + words.length) % words.length);
    setFlipped(false);
  }

  function know(){
    if (!mastered.includes(w.id)) updateMastered([...mastered, w.id]);
    moveCard(1);
  }

  function dontKnow(){
    updateMastered(mastered.filter(m => m !== w.id));
    moveCard(1);
  }

  return (
    <>
      <CategoryTabs categories={CATEGORIES} current={category} onSelect={selectCategory} />

      <div className="flashcard-wrap">
        <div className={flipped ? 'flashcard flipped' : 'flashcard'} onClick={() => setFlipped(f => !f)}>
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <span className="card-category">{w.category}</span>
              <div className="card-word">{w.word}</div>
              <span className="card-hint">클릭해서 뜻 보기</span>
            </div>
            <div className="flashcard-back">
              <div className="card-meaning">{w.meaning}</div>
              <div className="card-example">{w.example}</div>
              <div className="card-example-kr">{w.exampleKr}</div>
            </div>
          </div>
        </div>

        <div className="flash-progress">
          <span>{fcIndex + 1}</span> / <span>{words.length}</span>
        </div>

        <div className="flash-controls">
          <button className="btn ghost" onClick={dontKnow}>🔁 다시 학습</button>
          <button className="btn outline" onClick={() => moveCard(-1)}>← 이전</button>
          <button className="btn outline" onClick={() => moveCard(1)}>다음 →</button>
          <button className="btn primary" onClick={know}>✅ 외웠어요</button>
        </div>
      </div>
    </>
  );
}
