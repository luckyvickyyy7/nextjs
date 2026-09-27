# 이지잉글리시 Next.js 이전 구현 계획

`react/`(Vite + React)를 Next.js로 다시 구현한다. 화면은 원본과 같게 유지하고, 페이지마다 URL을 나눈다.
동작 기준은 `vanila/english-study-site`이고, 코드는 이미 컴포넌트로 나뉜 `react/src`를 옮긴다.

## 1. 결정 사항

| 항목 | 결정 | 이유 |
|---|---|---|
| 프레임워크 | Next.js (App Router) | 최신 권장 방식. 레이아웃·메타데이터·라우팅이 기본 제공됨 (Node v24, npm 11 확인됨) |
| 언어 | JavaScript | `react/src`의 `.jsx`를 거의 그대로 옮길 수 있음 |
| 페이지 전환 | 페이지별 URL (`/`, `/words`, `/grammar`, `/talk`, `/quiz`) | 새로고침·뒤로가기·링크 공유가 가능해짐 |
| 스타일 | 기존 `style.css`를 `app/globals.css`로 전역 import | class 이름을 유지해 화면이 원본과 1:1로 같음 |
| 상태관리 | React Context 하나 (`StudyProvider`) | 여러 페이지가 공유하는 통계(외운 단어, 최고 점수, 연속 학습일)만 올림 |
| 폴더 위치 | 새 폴더 `nextjs/` | `vanila/`, `react/`와 나란히 두고 비교 |

## 2. React 버전과 달라지는 점

### 2-1. 라우팅
- React 버전은 5개 페이지를 항상 렌더링하고 `.page.active`로만 전환했다. Next.js에서는 **라우트마다 해당 페이지 하나만 렌더링**한다.
- 각 페이지는 `<section className="page active">`로 감싼다. CSS의 `.page{display:none}` 규칙을 그대로 두고, 페이지가 마운트될 때마다 `fadeIn` 애니메이션이 적용된다.
- `onNavigate('words')` → `<Link href="/words">`, 퀴즈 결과의 "홈으로"는 `useRouter().push('/')`.
- 헤더의 활성 탭은 `usePathname()`으로 판단한다.
- 이동하면 Next.js가 맨 위로 스크롤한다(기본 동작). 부드러운 스크롤은 없어도 되는 것으로 한다.

### 2-2. 탭 이동 시 상태 초기화 (의도된 변화)
- 페이지가 언마운트되므로 탭을 옮기면 **단어 카드 위치, 퀴즈 진행 상태, 문법·회화 펼침 상태가 초기화된다.**
- 통계(`mastered`, `bestScore`, `streak`)는 Context + localStorage에 있으므로 유지된다.
- 퀴즈 진행 상태를 유지해야 한다면 나중에 퀴즈 상태도 Context로 올린다. 1차 구현에서는 하지 않는다.

### 2-3. 서버 렌더링과 localStorage
- 서버에는 `localStorage`가 없다. `useState(() => store.mastered)`처럼 초기값에서 읽으면 서버 HTML과 클라이언트 값이 달라 **hydration 오류**가 난다.
- 해결: `StudyProvider`는 기본값(`[]`, `0`, `0`)으로 시작하고, `useEffect`에서 `updateStreak()` 실행 후 localStorage 값을 읽어 채운다.
- 따라서 첫 화면에서 홈 통계가 잠깐 0으로 보였다가 실제 값으로 바뀐다. 거슬리면 `loaded` 플래그를 두고 로딩 전에는 `-`로 표시한다.
- `updateStreak()`는 같은 날 두 번 실행해도 결과가 같으므로 개발 모드(StrictMode)에서 effect가 두 번 돌아도 문제없다.

### 2-4. 서버/클라이언트 컴포넌트 구분
- `useState`, `onClick`, Context, `usePathname`을 쓰는 파일은 맨 위에 `'use client'`를 붙인다.
- `app/*/page.js`는 서버 컴포넌트로 두고 `metadata`(탭 제목)만 export한 뒤, 실제 UI는 클라이언트 컴포넌트를 렌더링한다.
- `Footer`, 정적인 페이지 머리말은 서버 컴포넌트로 둔다.

### 2-5. 폰트
- `index.html`의 Google Fonts `<link>` 대신 `next/font/google`의 `Noto_Sans_KR`, `Poppins`를 쓴다(자체 호스팅되어 레이아웃 흔들림이 없음).
- `variable` 옵션으로 `--font-noto`, `--font-poppins` CSS 변수를 `<html>`에 붙이고, `globals.css`의 `font-family` 4곳(74, 219, 323, 528행)을 변수로 바꾼다.
  - 예: `font-family: var(--font-noto), var(--font-poppins), sans-serif;`
- `Noto_Sans_KR`은 `subsets: ['latin']`, `weight: ['400','500','700','900']`, `Poppins`는 `weight: ['500','700']`.

## 3. 폴더 구조

```
nextjs/
├── package.json
├── next.config.mjs
├── jsconfig.json           # "@/*" 경로 별칭
├── .gitignore              # node_modules, .next, out, .vercel
├── plan.md
├── app/
│   ├── layout.js           # <html lang="ko">, 폰트, metadata, StudyProvider, Header, Footer
│   ├── globals.css         # react/src/style.css 복사 (font-family만 수정)
│   ├── page.js             # 홈 (/)
│   ├── words/page.js
│   ├── grammar/page.js
│   ├── talk/page.js
│   ├── quiz/page.js
│   └── not-found.js        # 없는 주소일 때 홈으로 안내
├── components/
│   ├── StudyProvider.jsx   # 'use client'. mastered / bestScore / streak Context
│   ├── Header.jsx          # 'use client'. Link + usePathname + 햄버거 menuOpen
│   ├── Footer.jsx
│   ├── CategoryTabs.jsx    # 'use client'. 단어/회화 공용
│   ├── HomeStats.jsx       # 'use client'. Context에서 통계 읽음
│   ├── Flashcards.jsx      # 'use client'. 단어 페이지 본문
│   ├── GrammarCard.jsx     # 'use client'
│   ├── TalkList.jsx        # 'use client'. PhraseCard 포함
│   └── Quiz.jsx            # 'use client'
├── data/
│   └── content.js          # react/src/data/content.js 그대로
└── utils/
    ├── store.js            # 같은 localStorage 키 (ee_mastered, ee_best_score, ee_last_visit, ee_streak)
    └── shuffle.js
```

## 4. React 코드 → Next.js 대응표

| react/src | nextjs |
|---|---|
| `index.html` (lang, title, 폰트 link) | `app/layout.js`의 `<html lang="ko">`, `metadata`, `next/font` |
| `main.jsx` + `import './style.css'` | `app/layout.js`에서 `import './globals.css'` |
| `App.jsx`의 `page` 상태, `goToPage()` | 파일 기반 라우트 + `<Link>` / `router.push` |
| `App.jsx`의 `mastered`, `bestScore`, `streak` 상태 | `StudyProvider` Context (`useStudy()` 훅) |
| `App.jsx`의 `useEffect(updateStreak)` | `StudyProvider`의 `useEffect` (localStorage 로드와 함께) |
| `Header`의 `page` prop | `usePathname()` |
| `Header`의 `menuOpen` (App에 있던 상태) | `Header` 내부 상태. `pathname`이 바뀌면 닫음 |
| `HomePage` | `app/page.js`(hero, 기능 카드는 `<Link>`) + `HomeStats` |
| `WordsPage` | `app/words/page.js` + `Flashcards` (`mastered`는 Context에서) |
| `GrammarPage` | `app/grammar/page.js`(서버) + `GrammarCard`(클라이언트) |
| `TalkPage` | `app/talk/page.js` + `TalkList` |
| `QuizPage`의 `onFinish`, `onNavigate` | Context의 `saveScore()`, `router.push('/')` |

## 5. 원본과 똑같이 동작하게 하는 핵심 포인트

1. **마크업과 class 이름을 그대로 유지한다.** 문법 번호 뱃지, `＋` 회전, 회화 👆 아이콘, `hidden` 속성으로 나누는 퀴즈 3단계 등이 그대로여야 CSS가 맞는다.
2. **기능 카드·히어로 버튼을 `<Link>`로 바꿔도 모양이 같아야 한다.** `<Link className="btn primary">`로 바꾸면 `<a>`가 되므로 밑줄·색 상속을 확인하고, 필요하면 `globals.css`에 `a.btn, a.feature-card { text-decoration: none; color: inherit; }` 정도만 추가한다.
3. **localStorage 키와 저장 형식을 그대로 쓴다.** 같은 브라우저·같은 도메인이면 기존 기록을 이어서 쓸 수 있다.
4. **퀴즈 세부 동작을 그대로 옮긴다.**
   - 답을 고르면 모든 보기를 비활성화하고, 정답에는 `correct`, 고른 오답에는 `wrong`을 붙인다.
   - 진행바는 답을 고른 순간 `(index+1)/total`로 채운다.
   - 결과 문구는 점수 비율 1 / 0.7 / 0.4 기준으로 나눈다.
   - 문제 섞기(`shuffle`)는 "시작" 버튼을 누를 때만 실행되므로 hydration 문제가 없다.
5. **"외웠어요"와 "다시 학습"은 `mastered`를 갱신한 뒤 다음 카드로 넘어간다.** 이전/다음 이동은 처음과 끝이 이어진다.
6. **다크모드는 CSS의 `prefers-color-scheme`만 사용한다.** JS가 필요 없으므로 서버 렌더링에서 깜빡임이 없다.

## 6. 작업 순서

1. 프로젝트 생성
   ```
   npx create-next-app@latest nextjs --js --app --eslint --no-tailwind --no-src-dir --import-alias "@/*" --use-npm
   ```
   이미 있는 `plan.md` 때문에 생성이 막히면 잠시 옮겨 두었다가 되돌린다.
   기본 템플릿의 `page.module.css`, `public/*.svg`, 기본 `globals.css` 내용, 기본 홈 화면을 정리한다.
2. `react/src/style.css`를 `app/globals.css`로 복사하고, `layout.js`에 `lang="ko"`, `metadata`(title: 이지잉글리시), `next/font` 폰트를 설정한다.
3. `data/content.js`, `utils/store.js`, `utils/shuffle.js`를 복사한다.
4. `StudyProvider`를 만들고 `layout.js`에서 `Header` / `{children}` / `Footer`를 감싼다.
5. `Header`(Link, 활성 탭, 햄버거 메뉴)를 구현하고 5개 라우트에 빈 페이지를 만들어 이동을 확인한다.
6. 홈 → 단어 → 문법 → 회화 → 퀴즈 순서로 페이지를 옮긴다. 페이지마다 `metadata.title`을 붙인다(예: `단어 | 이지잉글리시`).
7. `not-found.js`를 추가한다.
8. `npm run dev`로 실행해 `react/`(또는 `vanila/`)와 나란히 비교한다.
   - 각 페이지 화면
   - 다크모드
   - 모바일 폭(햄버거 메뉴, 이동 후 메뉴 닫힘)
   - 홈 통계 갱신 (단어 외우기, 퀴즈 점수)
   - 새로고침 후 데이터 유지, `/words` 같은 주소로 바로 접속
   - 브라우저 뒤로가기
   - 퀴즈 전체 흐름
   - 콘솔에 hydration 경고가 없는지
9. `npm run build`와 `npm run lint`로 빌드·린트 오류가 없는지 확인한다.
10. (선택) Vercel에 Root Directory를 `nextjs`로 지정해 배포한다.

## 7. 옮기지 않는 것

- `react/dist/`, `react/vite.config.js`, `react/index.html`, `main.jsx`: Next.js가 대신한다.
- `react/src/App.jsx`: 역할이 `layout.js`, 라우트, `StudyProvider`로 나뉘어 사라진다.
- `vanila/`의 `.vercel/`, `english-study-site.zip`, 빈 `test` 파일

## 8. 나중에 고려할 것

- 퀴즈 진행 상태·단어 카드 위치를 탭 이동 후에도 유지 (Context로 올리기)
- 데이터가 모두 정적이므로 `output: 'export'`로 정적 사이트 배포도 가능
- TypeScript 전환
