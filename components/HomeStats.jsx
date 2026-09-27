'use client'

import { useStudy } from './StudyProvider'
import { WORDS } from '@/data/content'

export default function HomeStats(){
  const { loaded, mastered, bestScore, streak } = useStudy();
  // localStorage를 읽기 전에는 0 대신 '-'를 보여 깜빡임을 줄인다.
  const show = n => (loaded ? n : '-');

  const stats = [
    { num: WORDS.length, label: '전체 단어' },
    { num: show(mastered.length), label: '외운 단어' },
    { num: show(bestScore), label: '퀴즈 최고 점수' },
    { num: show(streak), label: '연속 학습일 🔥' },
  ];

  return (
    <div className="stats-grid">
      {stats.map(s => (
        <div className="stat-card" key={s.label}>
          <span className="stat-num">{s.num}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
