'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { store, updateStreak } from '@/utils/store'

const StudyContext = createContext(null);

export function useStudy(){
  return useContext(StudyContext);
}

export default function StudyProvider({ children }){
  // 서버에는 localStorage가 없으므로 기본값으로 시작하고 마운트 후에 채운다.
  const [loaded, setLoaded] = useState(false);
  const [mastered, setMastered] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    updateStreak();
    /* eslint-disable react-hooks/set-state-in-effect -- 외부 저장소(localStorage)와 동기화 */
    setMastered(store.mastered);
    setBestScore(store.bestScore);
    setStreak(store.streak);
    setLoaded(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  function updateMastered(next){
    store.mastered = next;
    setMastered(next);
  }

  function saveScore(score){
    if (score > store.bestScore) {
      store.bestScore = score;
      setBestScore(score);
    }
  }

  return (
    <StudyContext.Provider value={{ loaded, mastered, bestScore, streak, updateMastered, saveScore }}>
      {children}
    </StudyContext.Provider>
  );
}
