'use client'

import { useState } from 'react'
import CategoryTabs from './CategoryTabs'
import { PHRASES } from '@/data/content'

const CATEGORIES = Object.keys(PHRASES);

function PhraseCard({ phrase }){
  const [revealed, setRevealed] = useState(false);
  return (
    <div className={revealed ? 'phrase-card revealed' : 'phrase-card'} onClick={() => setRevealed(r => !r)}>
      <div>
        <div className="phrase-en">{phrase.en}</div>
        <div className="phrase-kr">{phrase.kr}</div>
        <div className="phrase-pron">🔊 {phrase.pron}</div>
      </div>
      <div className="phrase-icon">👆</div>
    </div>
  );
}

export default function TalkList(){
  const [category, setCategory] = useState(CATEGORIES[0]);

  return (
    <>
      <CategoryTabs categories={CATEGORIES} current={category} onSelect={setCategory} />
      <div className="phrase-list">
        {/* key에 카테고리를 넣어 원본처럼 탭을 바꾸면 revealed가 초기화되게 한다. */}
        {PHRASES[category].map(p => <PhraseCard key={`${category}-${p.en}`} phrase={p} />)}
      </div>
    </>
  );
}
