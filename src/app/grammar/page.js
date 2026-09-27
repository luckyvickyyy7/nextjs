import GrammarCard from '@/components/GrammarCard'
import { GRAMMAR } from '@/data/content'

export const metadata = { title: '문법' };

export default function GrammarPage(){
  return (
    <section className="page active" id="page-grammar">
      <div className="page-head">
        <h2>핵심 문법 포인트</h2>
        <p>한국인이 특히 어려워하는 영문법만 뽑았어요. 카드를 눌러 예문을 확인하세요.</p>
      </div>
      <div className="grammar-list">
        {GRAMMAR.map((g, i) => <GrammarCard key={g.title} num={i + 1} item={g} />)}
      </div>
    </section>
  );
}
