// 우리 서버의 /api/dictionary/[word] 를 호출한다. (실제 Merriam-Webster 호출은 서버에서)

// 같은 단어를 다시 요청하지 않도록 결과(Promise)를 캐시한다.
const cache = new Map();

export function lookupWord(word){
  const key = word.toLowerCase();
  if (!cache.has(key)){
    const request = fetchEntry(key).catch(err => {
      cache.delete(key); // 실패한 요청은 다음에 다시 시도할 수 있게 지운다.
      throw err;
    });
    cache.set(key, request);
  }
  return cache.get(key);
}

async function fetchEntry(word){
  const res = await fetch(`/api/dictionary/${encodeURIComponent(word)}`);
  if (res.status === 404) return null; // 사전에 없는 단어
  if (!res.ok) throw new Error(`사전 API 오류 (${res.status})`);
  return res.json();
}
