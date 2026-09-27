// Merriam-Webster Collegiate Dictionary API를 서버에서 대신 호출한다.
// API 키는 .env.local 의 MW_DICTIONARY_KEY 에만 있고 브라우저로는 전달되지 않는다.
const MW_URL = 'https://dictionaryapi.com/api/v3/references/collegiate/json/';
const AUDIO_URL = 'https://media.merriam-webster.com/audio/prons/en/us/mp3/';

export async function GET(request, { params }){
  const { word } = await params;
  const key = process.env.MW_DICTIONARY_KEY;
  if (!key){
    return Response.json({ error: 'MW_DICTIONARY_KEY가 설정되지 않았어요.' }, { status: 500 });
  }

  const res = await fetch(`${MW_URL}${encodeURIComponent(word)}?key=${encodeURIComponent(key)}`);
  if (!res.ok){
    return Response.json({ error: `사전 API 오류 (${res.status})` }, { status: 502 });
  }

  const entries = await res.json();
  // 단어를 못 찾으면 MW는 비슷한 철자의 추천 단어(문자열 배열)를 돌려준다.
  if (!Array.isArray(entries) || typeof entries[0] !== 'object'){
    return Response.json({ error: '사전에 없는 단어예요.' }, { status: 404 });
  }

  return Response.json(simplify(word, entries), {
    headers: { 'Cache-Control': 'public, max-age=86400' },
  });
}

// MW 응답에서 화면에 필요한 정보만 뽑아낸다.
function simplify(word, entries){
  // 'apple:1', 'apple:2' 처럼 같은 단어의 항목만 쓰고, 관련 숙어 항목은 제외한다.
  const exact = entries.filter(e => e.meta?.id?.split(':')[0].toLowerCase() === word.toLowerCase());
  const list = exact.length ? exact : entries.slice(0, 1);

  const pron = list.flatMap(e => e.hwi?.prs || [])[0];

  const meanings = list.slice(0, 2).map(e => ({
    partOfSpeech: e.fl || '',
    definitions: (e.shortdef || []).slice(0, 2),
    // 다른 뜻의 예문이 섞이지 않도록 첫 번째 뜻 묶음에서만 찾는다.
    example: findExample(e.def?.[0]?.sseq?.[0]),
  }));

  return {
    phonetic: pron?.mw ? `\\${pron.mw}\\` : '',
    audio: pron?.sound?.audio ? audioUrl(pron.sound.audio) : '',
    meanings,
  };
}

// MW 규칙: 파일명 앞부분에 따라 하위 폴더가 정해진다.
function audioUrl(file){
  let dir = file[0];
  if (file.startsWith('bix')) dir = 'bix';
  else if (file.startsWith('gg')) dir = 'gg';
  else if (/^[^a-z]/i.test(file)) dir = 'number';
  return `${AUDIO_URL}${dir}/${file}.mp3`;
}

// def > sseq 안쪽 깊숙이 있는 첫 번째 예문(vis)을 찾는다.
function findExample(node){
  if (!Array.isArray(node) && (typeof node !== 'object' || node === null)) return '';
  if (Array.isArray(node) && node[0] === 'vis') return cleanText(node[1]?.[0]?.t || '');
  for (const child of Object.values(node)){
    const found = findExample(child);
    if (found) return found;
  }
  return '';
}

// {it}apple{/it}, {wi}...{/wi}, {sx|fruit||} 같은 MW 서식 기호를 일반 텍스트로 바꾼다.
function cleanText(text){
  return text
    .replace(/\{ldquo\}/g, '“')
    .replace(/\{rdquo\}/g, '”')
    .replace(/\{(?:a_link|d_link|i_link|et_link|sx|mat|dxt)\|([^|}]*)[^}]*\}/g, '$1')
    .replace(/\{[^}]*\}/g, '')
    .trim();
}
