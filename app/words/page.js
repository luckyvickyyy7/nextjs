import Flashcards from '@/components/Flashcards'

export const metadata = { title: '단어' };

export default function WordsPage(){
  return (
    <section className="page active" id="page-words">
      <div className="page-head">
        <h2>단어 플래시카드</h2>
        <p>카드를 클릭하면 뜻이 보여요. 아는 단어면 ✅, 모르면 🔁를 눌러주세요.</p>
      </div>
      <Flashcards />
    </section>
  );
}
