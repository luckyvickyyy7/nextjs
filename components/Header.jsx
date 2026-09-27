'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/', label: '홈' },
  { href: '/words', label: '단어' },
  { href: '/grammar', label: '문법' },
  { href: '/talk', label: '회화' },
  { href: '/quiz', label: '퀴즈' },
];

export default function Header(){
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // 주소가 바뀌면 (뒤로가기 포함) 모바일 메뉴를 닫는다.
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="logo">📘 <span>이지<em>잉글리시</em></span></div>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'}>
          {NAV.map(n => (
            <Link
              key={n.href}
              href={n.href}
              className={n.href === pathname ? 'nav-btn active' : 'nav-btn'}
              onClick={() => setMenuOpen(false)}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <button className="hamburger" aria-label="메뉴 열기" onClick={() => setMenuOpen(o => !o)}>☰</button>
      </div>
    </header>
  );
}
