import Quiz from '@/components/Quiz'

export const metadata = { title: '퀴즈' };

export default function QuizPage(){
  return (
    <section className="page active" id="page-quiz">
      <div className="page-head">
        <h2>실력 점검 퀴즈</h2>
        <p>단어와 문법을 얼마나 이해했는지 확인해보세요.</p>
      </div>
      <Quiz />
    </section>
  );
}
