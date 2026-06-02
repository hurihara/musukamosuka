// ============================================================
//  diary.js  ムスカムスカ日記
//  成長段階(egg / child / adult / legend) × 性格(8種 + default)
//  毎日ランダムで1つ選ばれる
// ============================================================

const DIARY_ENTRIES = {

  // ========== たまご期 (Lv1〜2) ==========
  egg: {
    default: [
      { text: "ぬし" },
      { text: "ぬし\nそと" },
      { text: "くらい" },
    ],
    やんちゃ: [
      { text: "きっく\nいたい" },
    ],
    物知り: [
      { text: "ぬし\nこえ" },
    ],
    陽気: [
      { text: "たのしい" },
    ],
    のんびり: [
      { text: "ねた" },
    ],
    きれい好き: [
      { text: "ぶるぶる" },
    ],
    あまえんぼ: [
      { text: "なでて\nいっぱい" },
    ],
    食いしん坊: [
      { text: "ごはん" },
    ],
    さすらい: [
      { text: "とびたい" },
    ],
  },

  // ========== こども期・少年期 (Lv3〜9) ==========
  child: {
    default: [
      { text: "きょうにんげん\nみた" },
      { text: "ぱたぱた\nとぶ" },
      { text: "ぬしくつした\nすき" },
      { text: "おそと\nはっぱ\nえらい" },
      { text: "ぬし\nにこにこ" },
    ],
    やんちゃ: [
      { text: "いっぱいぶつかった\nいたかった" },
      { text: "じゃんぷ\nこわくない" },
    ],
    物知り: [
      { text: "えほん\nにんげん" },
      { text: "ほん\nうねうね\nいーっぱい" },
    ],
    陽気: [
      { text: "たのしかた！\nうきうき" },
      { text: "うたをうたった\nむすむするんるん" },
    ],
    のんびり: [
      { text: "きょうひなたぼっこ" },
      { text: "ねた" },
    ],
    きれい好き: [
      { text: "おふろにはいった\nぴかぴか" },
      { text: "はねふいた\nつやつや" },
    ],
    あまえんぼ: [
      { text: "ぬしなでて" },
      { text: "おひるね\nいっしょ" },
    ],
    食いしん坊: [
      { text: "ぬし\nカレー\nつくって" },
      { text: "おなかとせなかぺったんこ" },
    ],
    さすらい: [
      { text: "とおいとこ\nまたいく" },
      { text: "まいご\nぬしだっこした" },
    ],
  },

  // ========== 青年期・大人期 (Lv10〜19) ==========
  adult: {
    default: [
      { text: "ぬしがすやすやねてた。\n一緒にねた。" },
      { text: "ぬしにはっぱをあげた。\nぬし大喜び。" },
      { text: "空をみた。\nたくさんとんだ。" },
      { text: "ぬしがないていた。\nそばにいた。" },
      { text: "きょうはふつうの一日だった。\nふつうは大事なこと。" },
    ],
    やんちゃ: [
      { text: "きょうもきたえた。\nもっとつよくなる。ぬしをまもるために。" },
      { text: "だれかにまけた。\nくやしかった。\nあしたぜったいかつ。" },
    ],
    物知り: [
      { text: "ぬしのことばがすこしわかってきた。\nかなしいときに「だいじょうぶ」っていうらしい。" },
      { text: "なぜハエはにんげんにきらわれるのか、かんがえた。\nまだわからない。" },
    ],
    陽気: [
      { text: "わらった。\nぬしもわらってた。よかった。" },
      { text: "きょうはダンスした。\nぬし見てたかな。みてて。" },
    ],
    のんびり: [
      { text: "友だちのかたつむり\nつむちゃん" },
      { text: "ながいあいだぼーっとした。\nなにもかんがえなかった。" },
    ],
    きれい好き: [
      { text: "きょうはとくにきれいにした。\nぬしが見てくれた。\nうれしかった。" },
      { text: "よごれたらすぐあらう。\nこれがいちばん大事。\nぬしもそうすればいいのに。" },
    ],
    あまえんぼ: [
      { text: "ぎゅーてしてもらった。\うれしい。" },
      { text: "ぬしのおててはいいにおい" },
    ],
    食いしん坊: [
      { text: "おいしいものをたべると、\nしあわせ。\nきょうもそう思った。" },
      { text: "においをかいだだけでしあわせになった。\nたべたらもっとしあわせだった。\nたべた。" },
    ],
    さすらい: [
      { text: "きょうはとおくまでいった。\nすぐかえった。ここがすきだから。" },
      { text: "知らないばしょで知らないにおいをかいだ。\nこわかった。\nでもきもちよかった。" },
    ],
  },

  // ========== 覚醒期・伝説期 (Lv20〜) ==========
  legend: {
    default: [
      { text: "長い時間が経った。\n変わったこともあるし、\n変わらないこともある。ぬしの靴下が片方なくなるのは変わらない。" },
      { text: "昔のことを思い出した。\nたまごの頃。\nあの頃からぬしのことが大好きだ。" },
      { text: "強くなった。\nでも強さってなんだろう。\nぬしのそばにい続けることか？" },
      { text: "ぬしを見ている。\nぬしも私を見ている。\nそれだけで十分。" },
      { text: "いつか別れる日がくるかもしれない。\nでも今日はここにいる。\n今日のことだけ考える。" },
      { text: "ぬしの靴下。\n私はあれが好きだ。" },
    ],
    やんちゃ: [
      { text: "まだもっと強くなれる。\nそれが嬉しい。" },
      { text: "今日は壁にぶつかりすぎた……。\nぬしが駆け寄ってくれたので大丈夫。" },
    ],
    物知り: [
      { text: "ぬしの喋ることは大体理解できる。\nいつか私も喋れるようになりたい。" },
      { text: "ぬしはたまにテレビを見て大泣きする。\n最近私も泣くようになった。" },
    ],
    陽気: [
      { text: "ぬしと一緒にいると楽しくって仕方ない！" },
      { text: "ぬしも一緒に踊ろう！" },
    ],
    のんびり: [
      { text: "長く生きてきた。\nぬしは変わらず優しい。\n私もそうありたい。" },
      { text: "かたつむりのつむちゃんとぬしは仲良しだ。\n3人で日向ぼっこをした。" },
    ],
    きれい好き: [
      { text: "生まれた時から綺麗でいることを続けてきた。\nぬしが喜んでくれる。\nそれが嬉しくて、また綺麗にする。" },
      { text: "ぬしと相談して新しいシャンプーを買った。\nとってもいい匂いで嬉しい！" },
    ],
    あまえんぼ: [
      { text: "ずっとそばにいてくれた。\nありがとうとはうまく言えなかったけど、\n羽をぷるぷるさせて伝えた。" },
      { text: "ぬし構ってー！\nいっぱい構って！" },
    ],
    食いしん坊: [
      { text: "おいしいものを食べ続けた人生だった。\nまだ食べる。\n飽きない止まらない。" },
      { text: "ぬしはくさやが苦手らしい？\n私とは違うみたい。好みが。" },
    ],
    さすらい: [
      { text: "色んなところを飛んだ。\nでも必ず帰った。\nここが1番いい。" },
      { text: "いつかぬしと世界を一周したい。\n一緒に色々なものをみたい。" },
    ],
  },

};

// ============================================================
//  以下はシステムコード（編集不要）
// ============================================================

const DIARY_SAVE_KEY = 'musukamosuka_diary';

function getDiaryStage(lv) {
  if (lv <= 2)  return 'egg';
  if (lv <= 9)  return 'child';
  if (lv <= 19) return 'adult';
  return 'legend';
}

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

function getDiaryData() {
  try {
    const raw = localStorage.getItem(DIARY_SAVE_KEY);
    return raw ? JSON.parse(raw) : { log: [] };
  } catch { return { log: [] }; }
}

function saveDiaryData(data) {
  localStorage.setItem(DIARY_SAVE_KEY, JSON.stringify(data));
}

// 今日の日記を取得（なければ生成して保存）
function getTodayDiary(state, getPersonality) {
  const data = getDiaryData();
  const todayKey = getTodayKey();
  const existing = data.log.find(e => e.date === todayKey);
  if (existing) return existing;

  // 新しく生成
  const stage = getDiaryStage(state.lv);
  const p = getPersonality();
  const personalityName = p ? p.name : 'default';

  const pool = (DIARY_ENTRIES[stage] || {});
  const entries = pool[personalityName] || pool['default'] || [];

  if (entries.length === 0) return null;

  const entry = entries[Math.floor(Math.random() * entries.length)];
  const newEntry = {
    date: todayKey,
    text: entry.text,
    lv: state.lv,
    stage,
    personality: personalityName,
  };

  data.log.unshift(newEntry); // 新しいものを先頭に
  if (data.log.length > 365) data.log = data.log.slice(0, 365); // 最大1年分
  saveDiaryData(data);
  return newEntry;
}

function renderDiaryPage(state, getPersonality) {
  const page = document.getElementById('page-日記');
  if (!page) return;

  const today = getTodayDiary(state, getPersonality);
  const data = getDiaryData();

  let html = '';

  // 今日の日記
  html += `<div class="card" style="margin-bottom:10px;">
    <div class="section-title">📔 きょうの日記</div>`;

  if (today) {
    html += `
    <div style="text-align:center;font-size:13px;color:var(--text3);margin-bottom:10px;">
      ${today.date} ／ Lv.${today.lv} ／ ${today.personality === 'default' ? 'まだわからない' : today.personality}
    </div>
    <div style="
      font-family:'Klee One',cursive;
      font-size:15px;
      color:var(--text);
      line-height:2.2;
      white-space:pre-line;
      background:rgba(90,200,150,0.06);
      border-radius:14px;
      padding:1rem 1.2rem;
      border-left:3px solid var(--teal);
    ">${today.text}</div>`;
  } else {
    html += `<div style="font-size:13px;color:var(--text3);text-align:center;padding:1rem;">
      まだ日記がない…あとでかく。
    </div>`;
  }

  html += `</div>`;

  // バックログ
  const past = data.log.filter(e => e.date !== getTodayKey());
  if (past.length > 0) {
    html += `<div class="card">
      <div class="section-title">📚 これまでの日記</div>`;
    past.forEach(e => {
      html += `
      <div style="margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid var(--border);">
        <div style="font-size:11px;color:var(--text3);margin-bottom:6px;">
          ${e.date} ／ Lv.${e.lv} ／ ${e.personality === 'default' ? 'まだわからない' : e.personality}
        </div>
        <div style="font-family:'Klee One',cursive;font-size:13px;color:var(--text2);line-height:2;white-space:pre-line;">${e.text}</div>
      </div>`;
    });
    html += `</div>`;
  }

  page.innerHTML = html;
}
