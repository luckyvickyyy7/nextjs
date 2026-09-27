import TalkList from '@/components/TalkList'

export const metadata = { title: '회화' };

export default function TalkPage(){
  return (
    <section className="page active" id="page-talk">
      <div className="page-head">
        <h2>상황별 실전 회화</h2>
        <p>실생활 상황을 골라 바로 쓸 수 있는 표현을 익혀보세요.</p>
      </div>
      <TalkList />
    </section>
  );
}
