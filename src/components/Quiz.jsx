'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStudy } from './StudyProvider'
import { QUIZ } from '@/data/content'
import { shuffle } from '@/utils/shuffle'

function resultText(score){
  const ratio = score / QUIZ.length;
  if (ratio === 1) return { icon: '🏆', title: '완벽해요!', msg: '모든 문제를 맞혔어요. 정말 대단해요!' };
  if (ratio >= 0.7) return { icon: '🎉', title: '잘했어요!', msg: '조금만 더 하면 만점이에요!' };
  if (ratio >= 0.4) return { icon: '💪', title: '좋은 시작이에요!', msg: '단어와 문법을 복습하고 다시 도전해보세요.' };
  return { icon: '📚', title: '다시 공부해봐요!', msg: '단어 카드부터 차근차근 복습해봐요.' };
}

export default function Quiz(){
  const router = useRouter();
  const { loaded, bestScore, saveScore } = useStudy();
  const [phase, setPhase] = useState('intro'); // 'intro' | 'play' | 'result'
  const [order, setOrder] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const q = phase === 'play' ? QUIZ[order[index]] : null;
  const answered = selected !== null;
  // 답을 고른 순간 진행바를 (index+1)/total로 채운다.
  const progress = ((answered ? index + 1 : index) / QUIZ.length) * 100;

  function startQuiz(){
    setOrder(shuffle(QUIZ.map((_, i) => i)));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setPhase('play');
  }

  function selectAnswer(i){
    if (answered) return;
    setSelected(i);
    if (i === q.answer) setScore(s => s + 1);
  }

  function nextQuestion(){
    if (index + 1 >= QUIZ.length) {
      saveScore(score);
      setPhase('result');
    } else {
      setIndex(index + 1);
      setSelected(null);
    }
  }

  function optionClass(i){
    if (!answered) return 'quiz-option';
    if (i === q.answer) return 'quiz-option correct';
    if (i === selected) return 'quiz-option wrong';
    return 'quiz-option';
  }

  const result = resultText(score);

  return (
    <>
      <div className="quiz-intro" hidden={phase !== 'intro'}>
        <div className="quiz-intro-card">
          <div className="quiz-intro-icon">🎯</div>
          <h3>총 <span>{QUIZ.length}</span>문제</h3>
          <p>최고 점수: <strong>{loaded ? bestScore : '-'}</strong>점</p>
          <button className="btn primary" onClick={startQuiz}>퀴즈 시작하기</button>
        </div>
      </div>

      {q && (
        <div className="quiz-play">
          <div className="quiz-progress-bar"><div className="quiz-progress-fill" style={{ width: `${progress}%` }}></div></div>
          <div className="quiz-meta">
            <span>{index + 1}</span> / <span>{QUIZ.length}</span> 문제
            <span className="quiz-score">점수: <strong>{score}</strong></span>
          </div>
          <div className="quiz-question-card">
            <p className="quiz-question">{q.q}</p>
            <div className="quiz-options">
              {q.options.map((opt, i) => (
                <button key={`${index}-${i}`} className={optionClass(i)} disabled={answered} onClick={() => selectAnswer(i)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
          <button className="btn primary" hidden={!answered} onClick={nextQuestion}>다음 문제 →</button>
        </div>
      )}

      <div className="quiz-result" hidden={phase !== 'result'}>
        <div className="quiz-result-card">
          <div className="quiz-result-icon">{result.icon}</div>
          <h3>{result.title}</h3>
          <p className="quiz-result-score"><span>{score}</span> / <span>{QUIZ.length}</span></p>
          <p>{result.msg}</p>
          <div className="quiz-result-buttons">
            <button className="btn outline" onClick={startQuiz}>다시 풀기</button>
            <button className="btn primary" onClick={() => router.push('/')}>홈으로</button>
          </div>
        </div>
      </div>
    </>
  );
}
