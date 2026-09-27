import { Noto_Sans_KR, Poppins } from 'next/font/google'
import StudyProvider from '@/components/StudyProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const noto = Noto_Sans_KR({
  variable: '--font-noto',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['500', '700'],
});

export const metadata = {
  title: {
    template: '%s | 이지잉글리시',
    default: '이지잉글리시',
  },
  description: '단어 · 문법 · 실전 회화 · 퀴즈까지 한 곳에서 끝내는 영어 학습',
};

export default function RootLayout({ children }){
  return (
    <html lang="ko" className={`${noto.variable} ${poppins.variable}`}>
      <body>
        <StudyProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </StudyProvider>
      </body>
    </html>
  );
}
