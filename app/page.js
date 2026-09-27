import Link from 'next/link'
import HomeStats from '@/components/HomeStats'

const FEATURES = [
  { href: '/words', icon: '🃏', title: '단어 플래시카드', desc: '카드를 클릭해서 뜻을 확인하고, 아는 단어와 모르는 단어를 구분해서 학습하세요.' },
  { href: '/grammar', icon: '📐', title: '핵심 문법 포인트', desc: '한국인이 자주 헷갈리는 문법만 골라 예문과 함께 쉽게 설명합니다.' },
  { href: '/talk', icon: '💬', title: '상황별 실전 회화', desc: '카페, 공항, 회사 등 실생활에서 바로 쓰는 표현과 한글 발음을 제공합니다.' },
  { href: '/quiz', icon: '✅', title: '실력 점검 퀴즈', desc: '배운 내용을 퀴즈로 바로 점검하고 최고 점수에 도전해보세요.' },
];

export default function HomePage(){
  return (
    <section className="page active" id="page-home">
      <div className="hero">
        <h1>매일 조금씩, <br />확실하게 느는 영어</h1>
        <p>단어 · 문법 · 실전 회화 · 퀴즈까지 한 곳에서 끝내는 영어 학습</p>
        <div className="hero-buttons">
          <Link className="btn primary" href="/words">단어 학습 시작 →</Link>
          <Link className="btn ghost" href="/quiz">퀴즈 풀어보기</Link>
        </div>
      </div>

      <HomeStats />

      <div className="feature-grid">
        {FEATURES.map(f => (
          <Link className="feature-card" key={f.href} href={f.href}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
