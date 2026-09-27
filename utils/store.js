// 원본과 같은 localStorage 키·형식을 사용한다.
export const store = {
  get mastered(){ return JSON.parse(localStorage.getItem('ee_mastered') || '[]'); },
  set mastered(arr){ localStorage.setItem('ee_mastered', JSON.stringify(arr)); },
  get bestScore(){ return Number(localStorage.getItem('ee_best_score') || 0); },
  set bestScore(n){ localStorage.setItem('ee_best_score', String(n)); },
  get lastVisit(){ return localStorage.getItem('ee_last_visit') || ''; },
  set lastVisit(d){ localStorage.setItem('ee_last_visit', d); },
  get streak(){ return Number(localStorage.getItem('ee_streak') || 0); },
  set streak(n){ localStorage.setItem('ee_streak', String(n)); },
};

export function updateStreak(){
  const today = new Date().toISOString().slice(0, 10);
  const last = store.lastVisit;
  if (last === today) return;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  store.streak = (last === yesterday) ? store.streak + 1 : 1;
  store.lastVisit = today;
}
