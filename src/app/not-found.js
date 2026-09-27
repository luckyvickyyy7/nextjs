import Link from 'next/link'

export const metadata = { title: '페이지를 찾을 수 없어요' };

export default function NotFound(){
  return (
    <section className="page active">
      <div className="hero">
        <h1>페이지를 찾을 수 없어요</h1>
        <p>주소가 잘못되었거나 없는 페이지예요.</p>
        <div className="hero-buttons">
          <Link className="btn primary" href="/">홈으로 →</Link>
        </div>
      </div>
    </section>
  );
}
