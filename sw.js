// ムスカムスカ育成ゲーム Service Worker
// バージョンを上げると古いキャッシュが自動で破棄され、新しいファイルに更新されます
const CACHE_VERSION = 'v1';
const CORE_CACHE = `musukamosuka-core-${CACHE_VERSION}`;
const RUNTIME_CACHE = `musukamosuka-runtime-${CACHE_VERSION}`;

// 確実に存在するファイルだけプリキャッシュする
const STAGES_IMG = ['egg','child','adult','legend'];
const OUTFITS = ['default','casual','fancy','sleep'];
const NATSUKI_KEYS = ['sleep','stare','sniff','sleeve','shoulder','wings'];

// 立ち絵：{stage}_{outfit}.png の全組み合わせ
const CHARA_IMAGES = STAGES_IMG.flatMap(stage =>
  OUTFITS.map(outfit => `./${stage}_${outfit}.png`)
);

// イベント絵：event_{key}_{stage}.png の全組み合わせ
const EVENT_IMAGES = STAGES_IMG.flatMap(stage =>
  NATSUKI_KEYS.map(key => `./event_${key}_${stage}.png`)
);

const CORE_ASSETS = [
  './',
  './index.html',
  './diary.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  ...CHARA_IMAGES,
  ...EVENT_IMAGES,
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CORE_CACHE)
      .then((cache) =>
        // 1枚でも欠けているとinstall全体が失敗するので、個別にキャッチして続行する
        Promise.allSettled(CORE_ASSETS.map((asset) => cache.add(asset)))
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CORE_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // ページ本体（HTML）はネットワーク優先。オフライン時はキャッシュ、それも無ければトップにフォールバック
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const clone = res.clone();
          caches.open(CORE_CACHE).then((cache) => cache.put(req, clone));
          return res;
        })
        .catch(() =>
          caches.match(req).then((cached) => cached || caches.match('./index.html'))
        )
    );
    return;
  }

  // 同一オリジンの画像（立ち絵・イベント絵・家具画像など）はキャッシュ優先
  // 一度表示した画像はオフラインでもそのまま使える
  if (url.origin === self.location.origin && /\.(png|jpg|jpeg|webp|svg)$/i.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then((cached) => {
        if (cached) return cached;
        return fetch(req).then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(RUNTIME_CACHE).then((cache) => cache.put(req, clone));
          }
          return res;
        }).catch(() => cached);
      })
    );
    return;
  }

  // JS/マニフェストなどのコアファイルはキャッシュ優先＋裏で更新
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const network = fetch(req).then((res) => {
          if (res.ok) {
            const clone = res.clone();
            caches.open(CORE_CACHE).then((cache) => cache.put(req, clone));
          }
          return res;
        }).catch(() => cached);
        return cached || network;
      })
    );
    return;
  }

  // 外部リソース（Googleフォント等）はブラウザの通常挙動に任せる
});
