export const WORDS = [
  { id: 1, word: "apple", meaning: "사과", category: "음식", example: "I eat an apple every morning.", exampleKr: "나는 매일 아침 사과를 먹는다." },
  { id: 2, word: "restaurant", meaning: "식당", category: "음식", example: "Let's have dinner at that restaurant.", exampleKr: "저 식당에서 저녁을 먹자." },
  { id: 3, word: "delicious", meaning: "맛있는", category: "음식", example: "This soup is delicious.", exampleKr: "이 수프는 맛있다." },
  { id: 4, word: "recipe", meaning: "조리법", category: "음식", example: "Can you share the recipe?", exampleKr: "그 조리법 좀 알려줄 수 있어?" },
  { id: 5, word: "grocery", meaning: "식료품", category: "음식", example: "I need to buy groceries.", exampleKr: "식료품을 사야 해." },
  { id: 6, word: "schedule", meaning: "일정", category: "일상", example: "What's your schedule today?", exampleKr: "오늘 일정이 어떻게 돼?" },
  { id: 7, word: "laundry", meaning: "빨래", category: "일상", example: "I need to do the laundry.", exampleKr: "빨래를 해야 해." },
  { id: 8, word: "habit", meaning: "습관", category: "일상", example: "Reading is a good habit.", exampleKr: "독서는 좋은 습관이다." },
  { id: 9, word: "exhausted", meaning: "지친", category: "일상", example: "I'm exhausted after work.", exampleKr: "퇴근 후에 너무 지쳤어." },
  { id: 10, word: "neighbor", meaning: "이웃", category: "일상", example: "My neighbor is very kind.", exampleKr: "우리 이웃은 정말 친절해." },
  { id: 11, word: "deadline", meaning: "마감일", category: "비즈니스", example: "The deadline is next Friday.", exampleKr: "마감일은 다음 주 금요일이다." },
  { id: 12, word: "negotiate", meaning: "협상하다", category: "비즈니스", example: "We need to negotiate the price.", exampleKr: "가격을 협상해야 해요." },
  { id: 13, word: "colleague", meaning: "동료", category: "비즈니스", example: "She is my colleague.", exampleKr: "그녀는 제 동료입니다." },
  { id: 14, word: "budget", meaning: "예산", category: "비즈니스", example: "We are over budget.", exampleKr: "우리는 예산을 초과했어요." },
  { id: 15, word: "postpone", meaning: "연기하다", category: "비즈니스", example: "Let's postpone the meeting.", exampleKr: "회의를 연기합시다." },
  { id: 16, word: "luggage", meaning: "짐, 수하물", category: "여행", example: "Where can I pick up my luggage?", exampleKr: "수하물은 어디서 찾나요?" },
  { id: 17, word: "itinerary", meaning: "여행 일정", category: "여행", example: "Here is our travel itinerary.", exampleKr: "이게 우리 여행 일정이에요." },
  { id: 18, word: "reservation", meaning: "예약", category: "여행", example: "I have a reservation for two.", exampleKr: "두 명 예약했어요." },
  { id: 19, word: "departure", meaning: "출발", category: "여행", example: "The departure time is 9 AM.", exampleKr: "출발 시간은 오전 9시입니다." },
  { id: 20, word: "currency", meaning: "화폐", category: "여행", example: "What's the local currency here?", exampleKr: "여기 화폐는 뭐예요?" },
];

export const GRAMMAR = [
  {
    title: "현재완료 vs 과거시제",
    tip: "과거는 '끝난 일', 현재완료는 '현재와 연결된 일'을 말할 때 써요.",
    example: "I lived in Seoul for 5 years. (과거, 지금은 아님)",
    exampleKr: "나는 5년 동안 서울에 살았다. (지금은 다른 곳에 삶)",
  },
  {
    title: "관사 a / an / the",
    tip: "처음 언급하는 것은 a/an, 서로 아는 특정한 것은 the를 써요.",
    example: "I saw a cat. The cat was black.",
    exampleKr: "나는 고양이를 봤다. 그 고양이는 검은색이었다.",
  },
  {
    title: "전치사 in / on / at",
    tip: "in(넓은 공간·월/년), on(표면·요일/날짜), at(정확한 지점·시각)에 사용해요.",
    example: "I'll meet you at 3 PM on Friday in June.",
    exampleKr: "6월 금요일 오후 3시에 만나자.",
  },
  {
    title: "3인칭 단수 -s",
    tip: "주어가 He/She/It일 때 현재시제 동사 뒤에 -s를 붙여요.",
    example: "She works at a bank.",
    exampleKr: "그녀는 은행에서 일한다.",
  },
  {
    title: "가산명사 vs 불가산명사",
    tip: "셀 수 있는 명사는 many/a few, 셀 수 없는 명사는 much/a little을 써요.",
    example: "I don't have much time, but I have a few minutes.",
    exampleKr: "시간이 많지 않지만, 몇 분은 있어.",
  },
  {
    title: "비교급과 최상급",
    tip: "짧은 단어는 -er/-est, 긴 단어는 more/most를 붙여요.",
    example: "This book is more interesting than that one.",
    exampleKr: "이 책이 저 책보다 더 재미있다.",
  },
  {
    title: "to부정사 vs 동명사",
    tip: "want, decide는 to부정사, enjoy, finish는 동명사(-ing)와 어울려요.",
    example: "I enjoy reading, but I want to travel more.",
    exampleKr: "나는 독서를 즐기지만, 더 여행하고 싶다.",
  },
  {
    title: "수동태 (be + p.p.)",
    tip: "행위자보다 행동을 당하는 대상이 중요할 때 수동태를 써요.",
    example: "The email was sent yesterday.",
    exampleKr: "그 이메일은 어제 발송되었다.",
  },
  {
    title: "관계대명사 who / which / that",
    tip: "사람은 who, 사물은 which, 둘 다 that을 쓸 수 있어요.",
    example: "The man who called you is my boss.",
    exampleKr: "너에게 전화한 그 남자는 내 상사야.",
  },
  {
    title: "조동사 can / could / should",
    tip: "can(능력), could(공손한 요청·과거 능력), should(조언)로 구분해요.",
    example: "Could you help me? You should rest more.",
    exampleKr: "도와주실 수 있나요? 좀 더 쉬는 게 좋겠어요.",
  },
];

export const PHRASES = {
  "카페": [
    { en: "Can I get a tall iced americano?", kr: "톨 사이즈 아이스 아메리카노 주세요.", pron: "캔 아이 겟 어 톨 아이스드 아메리카노" },
    { en: "For here or to go?", kr: "매장에서 드시나요, 포장인가요?", pron: "포 히어 오어 투 고우" },
    { en: "Could I get a receipt, please?", kr: "영수증 좀 주시겠어요?", pron: "쿠드 아이 겟 어 리시트 플리즈" },
    { en: "Is there free Wi-Fi here?", kr: "여기 무료 와이파이 있나요?", pron: "이즈 데어 프리 와이파이 히어" },
  ],
  "공항": [
    { en: "Where is the check-in counter?", kr: "체크인 카운터가 어디인가요?", pron: "웨어 이즈 더 체크인 카운터" },
    { en: "I'd like a window seat, please.", kr: "창가 좌석으로 주세요.", pron: "아이드 라이크 어 윈도우 싯 플리즈" },
    { en: "How much luggage can I check in?", kr: "수하물은 몇 개까지 부칠 수 있나요?", pron: "하우 머치 러기지 캔 아이 체크인" },
    { en: "Where is the boarding gate?", kr: "탑승구가 어디인가요?", pron: "웨어 이즈 더 보딩 게이트" },
  ],
  "회사": [
    { en: "Could we reschedule the meeting?", kr: "회의 일정을 다시 잡을 수 있을까요?", pron: "쿠드 위 리스케줄 더 미팅" },
    { en: "I'll send you the report by tomorrow.", kr: "내일까지 보고서 보내드릴게요.", pron: "아일 센드 유 더 리포트 바이 투모로우" },
    { en: "Let's touch base next week.", kr: "다음 주에 다시 이야기 나눠요.", pron: "렛츠 터치 베이스 넥스트 위크" },
    { en: "Sorry, I'm running a bit late.", kr: "죄송해요, 조금 늦고 있어요.", pron: "쏘리 아임 러닝 어 빗 레이트" },
  ],
  "길찾기": [
    { en: "Excuse me, how do I get to the station?", kr: "실례합니다, 역에 어떻게 가나요?", pron: "익스큐즈 미 하우 두 아이 겟 투 더 스테이션" },
    { en: "Is it within walking distance?", kr: "걸어서 갈 수 있는 거리인가요?", pron: "이즈 잇 위딘 워킹 디스턴스" },
    { en: "Turn left at the next corner.", kr: "다음 모퉁이에서 좌회전하세요.", pron: "턴 레프트 앳 더 넥스트 코너" },
    { en: "How long does it take from here?", kr: "여기서부터 얼마나 걸리나요?", pron: "하우 롱 더즈 잇 테이크 프롬 히어" },
  ],
  "쇼핑": [
    { en: "Can I try this on?", kr: "이거 입어봐도 되나요?", pron: "캔 아이 트라이 디스 온" },
    { en: "Do you have this in a different size?", kr: "다른 사이즈도 있나요?", pron: "두 유 해브 디스 인 어 디퍼런트 사이즈" },
    { en: "Is this on sale?", kr: "이거 할인 중인가요?", pron: "이즈 디스 온 세일" },
    { en: "I'll take this one.", kr: "이걸로 살게요.", pron: "아일 테이크 디스 원" },
  ],
  "전화통화": [
    { en: "May I speak to Mr. Kim, please?", kr: "김 선생님과 통화할 수 있을까요?", pron: "메이 아이 스피크 투 미스터 킴 플리즈" },
    { en: "Can you hold on for a moment?", kr: "잠시만 기다려 주시겠어요?", pron: "캔 유 홀드 온 포 어 모먼트" },
    { en: "I'll call you back shortly.", kr: "곧 다시 전화드릴게요.", pron: "아일 콜 유 백 숏틀리" },
    { en: "Sorry, could you repeat that?", kr: "죄송하지만 다시 말씀해 주시겠어요?", pron: "쏘리 쿠드 유 리핏 댓" },
  ],
};

export const QUIZ = [
  { q: "'사과'를 뜻하는 영어 단어는?", options: ["apple", "grocery", "recipe", "habit"], answer: 0 },
  { q: "'동료'를 뜻하는 영어 단어는?", options: ["deadline", "colleague", "budget", "currency"], answer: 1 },
  { q: "'예약'을 뜻하는 영어 단어는?", options: ["departure", "luggage", "reservation", "itinerary"], answer: 2 },
  { q: "She ___ at a bank. 빈칸에 알맞은 것은?", options: ["work", "working", "works", "to work"], answer: 2 },
  { q: "This book is ___ than that one. 빈칸에 알맞은 것은?", options: ["more interesting", "interestinger", "most interesting", "interesting"], answer: 0 },
  { q: "I enjoy ___. 빈칸에 알맞은 것은?", options: ["to read", "reading", "read", "reads"], answer: 1 },
  { q: "The email ___ yesterday. (수동태)", options: ["sent", "was sent", "is sending", "sends"], answer: 1 },
  { q: "카페에서 '포장이요'라고 할 때 알맞은 표현은?", options: ["For here, please.", "To go, please.", "Check, please.", "One more, please."], answer: 1 },
  { q: "'Could you help me?'의 could는 어떤 의미로 쓰였나요?", options: ["과거의 능력", "공손한 요청", "추측", "의무"], answer: 1 },
  { q: "공항에서 '탑승구가 어디인가요?'는 영어로?", options: ["Where is the check-in counter?", "Where is the boarding gate?", "Where is the restroom?", "Where is my luggage?"], answer: 1 },
  { q: "'습관'을 뜻하는 영어 단어는?", options: ["habit", "schedule", "laundry", "neighbor"], answer: 0 },
  { q: "The man ___ called you is my boss. 빈칸에 알맞은 것은?", options: ["which", "who", "whose", "whom"], answer: 1 },
];
