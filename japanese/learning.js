/* 기존 노트의 렌더러·단어 사전을 공유하는 학습 순서와 브라우저 복습. */
window.JapaneseLearning = function (app) {
  'use strict';
  const { esc, rich, renderJP, plainOf, readingOf, store, CATALOG, loadSong, loadWords, canonical, Progress } = app;
  const lessons = {
    marigold: ['첫 곡 추천', 'は·が와 い/な형용사', ['〜ている', '〜ないで', '〜ますように']],
    kimirock: ['기초 다음', '동사의 て형과 ます형', ['〜そう', '〜てほしい', '〜てきた']],
    heroine: ['기초 다음', 'い형용사와 동사의 활용', ['〜そうに', '〜かける', '〜たくなる']],
    xmassong: ['기초 다음', 'て형·부정형', ['〜てほしい', '〜らしくない', '〜じゃないと']],
    hanako: ['중급 도전', '수동형·사역형', ['〜られる', '〜させる', '가사의 비표준 구어']],
    suiheisen: ['기초 다음', 'て형·가능형', ['〜ように', '〜といい', '〜ながら']],
    aiwo: ['중급 도전', 'て형·조건 표현', ['〜わけでもない', '〜ちゃう', '〜ずに']],
    film: ['중급 도전', '명사 수식·의지형', ['〜てもらえる', '〜ていく', '〜たくもない']],
    pretender: ['중급 도전', '가능형·조건 표현', ['〜たらよかった', '〜にとって', '〜難い']],
    gurenge: ['중급 도전', '가능형·수동형', ['명령형', '〜のは〜だけ', '〜なら']],
    shukumei: ['중급 도전', '명령형·て형', ['〜なくていい', '〜合う', '〜てたまるか']],
    laughter: ['중급 도전', '가능형·명사 수식', ['〜ずに', '〜べき', '〜でありたい']],
    thesis: ['심화 읽기', '명사 수식·수동형', ['명령형', '〜ための', '가사 속 특수 읽기']],
    zankyosanka: ['심화 읽기', '명령형·조건 표현', ['〜ばいい', '옛말·옛 표기', '〜んじゃない']],
    rashisa: ['심화 읽기', '부정형·조건 표현', ['〜である', '〜しか〜ない', '〜けりゃ']]
  };
  const link = (to, label) => '<a href="#' + to + '" data-a="nav" data-to="' + to + '">' + label + ' →</a>';
  function homeHTML() {
    return '<section class="block" aria-labelledby="study-start"><h2 class="h2" id="study-start">처음이라면 이 순서로</h2>'
      + '<p class="muted">하루 10분, 한 곡 전체보다 짧은 구간 하나를 읽어요.</p><ol class="study-path">'
      + '<li><b>1. 소리와 글자</b><p>あ행 5자부터 읽고, 글자를 가린 채 소리를 떠올려 보세요.</p>' + link('kana', '가나 연습') + '</li>'
      + '<li><b>2. 문장의 뼈대</b><p>は·が·を와 문장 끝의 동사·형용사를 살펴봐요.</p>' + link('guide', '문자·기초 문법') + '</li>'
      + '<li><b>3. 첫 곡, 그리고 복습</b><p>マリーゴールド의 첫 구간에서 세 줄을 읽고, 해석을 가려 확인해요.</p>' + link('song.marigold', '첫 곡 읽기') + ' ' + link('review', '단어 복습') + '</li></ol>'
      + '<p class="hint">곡별 표시는 이 노트의 학습 순서 제안이에요. 공식 JLPT 등급이나 노래의 빠르기 등급은 아니에요.</p></section>';
  }
  function cardHTML(id) {
    const l = lessons[id];
    return l ? '<p class="study-meta">' + esc(l[0]) + ' · 먼저: ' + esc(l[1]) + '</p><ul class="study-focus">' + l[2].map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>' : '';
  }
  function lessonHTML(id) {
    const l = lessons[id]; if (!l) return '';
    return '<details class="study-details"><summary>이 곡의 10분 학습 · ' + esc(l[0]) + '</summary><p>먼저 익힐 것: ' + esc(l[1]) + '. 낯설면 문자·기초 문법을 먼저 읽어요.</p>'
      + '<ul class="study-focus">' + l[2].map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>'
      + '<ol><li>2분: 첫 구간에서 세 줄을 골라 소리 내어 읽어요.</li><li>5분: 단어와 문법을 열어 직역·해석을 비교해요.</li><li>3분: 해석 가리기를 켜고 뜻을 말해 본 뒤, 확인하고 체크해요.</li></ol>'
      + '<div class="study-actions">' + link('guide', '기초 확인') + link('review.songs', '기억 확인하기') + '</div></details>';
  }
  function sourcesHTML(s) {
    const sources = s.sources || [];
    return '<details class="study-details"><summary>출처와 읽는 기준</summary><p>발매·타이업은 아래 자료를 참고했어요. 번역과 장면 해석은 이 노트의 풀이이며, 표기가 주는 인상은 작사자의 의도가 확인된 경우와 구별해 읽어 주세요.</p>'
      + (sources.length ? '<ul class="sources">' + sources.map(x => '<li><a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + esc(x.title) + ' ↗</a></li>').join('') + '</ul>' : '<p>개별 자료의 출처는 아직 정리 중이에요. 작사 의도로 단정하지 않고 읽어 주세요.</p>')
      + '<p class="hint">주요 사실 확인: 2026-10-24. 가사와 번역의 한글 발음은 학습 보조이며, 실제 노래의 음성·억양과 다를 수 있어요.</p></details>';
  }

  let reviewData = store.get('hgn.review', {});
  if (!reviewData || typeof reviewData !== 'object' || Array.isArray(reviewData)) reviewData = {};
  const selected = Object.assign({ songs: true, food: false, travel: false }, store.get('hgn.reviewSources', {}));
  let entries = [], queue = [], current = null, revealed = false, session = { total: 0, right: 0, done: 0 }, filter = 'due', loading = 0;
  const isReview = () => app.state.route.split('.')[0] === 'review';
  const shuffle = xs => {
    xs = xs.slice(); for (let i = xs.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [xs[i], xs[j]] = [xs[j], xs[i]]; } return xs;
  };
  function record(key) { const r = reviewData[key]; return r && typeof r === 'object' ? r : {}; }
  function due(e) { return !record(e.key).due || record(e.key).due <= Date.now(); }
  function pool() { return entries.filter(e => selected[e.source] && (filter === 'all' || due(e))); }
  function start() {
    const candidates = pool();
    // Missed items precede overdue items, then new words; a large dictionary must not bury mistakes.
    const priority = e => reviewData[e.key] ? (record(e.key).streak ? 1 : 0) : 2;
    queue = (filter === 'all' ? shuffle(candidates) : [0, 1, 2].flatMap(p => shuffle(candidates.filter(e => priority(e) === p)))).slice(0, 10);
    current = queue.shift() || null; revealed = false;
    session = { total: queue.length + (current ? 1 : 0), right: 0, done: 0 };
    draw();
  }
  function draw(focus) {
    const mount = document.getElementById('review-mount'); if (!mount || !isReview()) return;
    const n = pool().length;
    let html = '<p class="review-stats" aria-live="polite">' + (filter === 'all' ? '선택한 자료 ' : '지금 다시 볼 항목 ') + n + '개 · 이번 연습 ' + session.done + '/' + session.total + '</p>';
    if (current) {
      html += '<article class="review-card"><p class="eyebrow">' + esc(current.label) + ' · 뜻을 먼저 떠올려 보세요</p>'
        + '<p class="review-prompt" lang="ja">' + esc(plainOf(current.t)) + '</p>'
        + (revealed ? '<div class="review-answer"><p class="review-reading" lang="ja">' + esc(readingOf(current.t)) + '</p><p>' + rich(current.m) + '</p>'
          + (current.example ? '<p lang="ja">' + renderJP(current.example.t) + '</p><p>' + esc(current.example.ko) + '</p>' : '')
          + app.speakBtn(app.speechOf(current.t)) + '</div><p class="hint">정답을 보기 전에 떠올린 답을 기준으로 골라요.</p><div class="study-actions"><button class="tg" data-study="grade" data-grade="again">다시 볼게요</button><button class="tg" data-study="grade" data-grade="known">기억했어요</button></div>'
          : '<button class="tg" data-study="reveal">정답 확인</button>')
        + (current.to ? '<div class="study-actions">' + link(current.to, '원문에서 확인') + '</div>' : '') + '</article>';
    } else {
      html += '<div class="study-box review-empty"><h2>' + (session.done ? '이번 연습을 마쳤어요' : '지금 복습할 항목이 없어요') + '</h2><p>'
        + (session.done ? session.done + '개 중 ' + session.right + '개를 기억했어요. 다시 볼 항목은 다음 연습에 남겨 뒀어요.' : '자료를 선택하거나 ‘전체 연습’으로 이미 확인한 항목도 다시 볼 수 있어요.')
        + '</p><div class="study-actions"><button class="tg" data-study="restart">다음 10개 연습</button></div></div>';
    }
    html += '<p class="hint">‘다시 볼게요’는 바로 다음 연습에, ‘기억했어요’는 1일·3일·7일 뒤에 다시 보여 줘요. 기록은 현재 브라우저에 저장돼요. 기존의 ‘외웠어요’ 체크와는 별도예요.</p>';
    mount.innerHTML = html;
    if (focus) { const b = mount.querySelector('[data-study="reveal"], [data-study="grade"], [data-study="restart"]'); if (b) b.focus({ preventScroll: true }); }
  }
  async function viewReview(source) {
    if (['songs', 'food', 'travel'].includes(source)) {
      Object.keys(selected).forEach(k => { selected[k] = k === source; });
      store.set('hgn.reviewSources', selected);
    }
    const request = ++loading;
    app.setView('<header class="page-head"><p class="eyebrow">기억을 확인하는 시간</p><h1 class="page-title">복습</h1><p class="lede">한 번에 최대 10개. 뜻을 먼저 떠올리고 정답을 확인해요. 음식·여행 표현도 선택해서 연습할 수 있어요.</p></header>'
      + '<fieldset class="review-controls"><legend>복습할 자료</legend>' + [['songs', '노래 단어'], ['food', '음식 표현'], ['travel', '여행 회화']].map(x => '<label><input type="checkbox" data-study-source="' + x[0] + '"' + (selected[x[0]] ? ' checked' : '') + '>' + x[1] + '</label>').join('') + '</fieldset>'
      + '<div class="study-actions" role="group" aria-label="복습 범위"><button class="tg" data-study="filter" data-filter="due" aria-pressed="' + (filter === 'due') + '">다시 볼 항목</button><button class="tg" data-study="filter" data-filter="all" aria-pressed="' + (filter === 'all') + '">전체 연습</button></div>'
      + '<div id="review-mount"><p class="empty">복습 자료를 모으는 중…</p></div>');
    const loaded = await Promise.all(CATALOG.filter(c => c.status === 'ready').map(c => loadSong(c.id).catch(() => null)).concat([loadWords()]));
    loaded.pop();
    if (request !== loading || !isReview()) return;
    const byKey = new Map();
    loaded.filter(s => s && s.kind !== 'travel').forEach(s => s.vocab.forEach(v => {
      if (byKey.has(v.key) || app.catOf(v.tok) === 'l') return;
      const t = canonical(v.tok), w = app.words()[v.key] || {};
      byKey.set(v.key, { key: 'word:' + v.key, source: 'songs', label: '노래 단어', t: t.b || t.t, m: t.bm || t.m, example: w.ex && w.ex[0], to: 'song.' + s.id + '.words' });
    }));
    entries = Array.from(byKey.values());
    const travel = loaded.find(s => s && s.kind === 'travel');
    if (travel) travel.uniq.forEach(l => entries.push({ key: 'travel:' + l.key, source: 'travel', label: '여행 · ' + travel.sections[l.sec].label, t: l.toks.map(t => t.t).join(''), m: l.ko, to: 'travel' }));
    const food = new Map();
    [app.FOOD.menu, app.FOOD.sign, app.FOOD.taste, app.FOOD.texture, app.FOOD.talk, app.FOOD_CULTURE.place, app.FOOD_CULTURE.idiom].forEach(list => list.forEach(x => {
      const t = app.phraseJP(x[0]), key = 'food:' + plainOf(t);
      food.set(key, { key, source: 'food', label: '음식 표현', t, m: x[1], to: 'food' });
    }));
    entries.push(...food.values()); start();
    const failed = CATALOG.filter(c => c.status === 'ready').length - loaded.filter(Boolean).length;
    if (failed) { const p = document.createElement('p'); p.className = 'hint'; p.textContent = '일부 자료를 불러오지 못했어요. 사용 가능한 자료로 연습 중이에요. 다시 접속하면 재시도해요.'; document.getElementById('review-mount').before(p); }
  }
  function click(el) {
    const a = el.dataset.study;
    if (a === 'reveal' && current) { revealed = true; draw(true); }
    if (a === 'grade' && current && revealed) {
      const known = el.dataset.grade === 'known', previous = record(current.key);
      const streak = known ? Math.min((Number(previous.streak) || 0) + 1, 3) : 0;
      reviewData[current.key] = { streak, due: known ? Date.now() + [0, 1, 3, 7][streak] * 86400000 : 0 };
      store.set('hgn.review', reviewData); session.done++; if (known) session.right++;
      current = queue.shift() || null; revealed = false; draw(true);
    }
    if (a === 'restart') start();
    if (a === 'filter') {
      filter = el.dataset.filter;
      document.querySelectorAll('[data-study="filter"]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === filter))); start();
    }
  }
  function change(el) { selected[el.dataset.studySource] = el.checked; store.set('hgn.reviewSources', selected); start(); }
  function reset() { reviewData = {}; store.set('hgn.review', reviewData); }
  return { homeHTML, cardHTML, lessonHTML, sourcesHTML, viewReview, click, change, reset };
};
