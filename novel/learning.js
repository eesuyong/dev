(function () {
  'use strict';
  const data = {
    higashino: {
      title: '인물의 동기와 수수께끼를 함께 읽기',
      summary: '왜 그런 선택을 했는지와, 그 선택이 사건의 구조를 어떻게 바꾸는지 나란히 살펴봐요.',
      compare: ['인물의 선택·동기', '작품별로 살펴보기', '트릭과 감정의 연결'],
      task: ['감추고 싶은 사정이 있는 인물 두 명을 정해요.', '한 사람의 선택 때문에 다른 사람이 오해하는 장면을 200~400자로 써요.', '사정을 공개했을 때 앞 장면의 의미가 바뀌는지 확인해요.'],
      sources: [['본인 인터뷰 · 2002년 9월: 습작, 『トキオ』의 질문과 배경', 'https://www.webdoku.jp/rensai/sakka/michi13.html'], ['본인 인터뷰 · 2005-08-20: 장편 선택과 인물 조사', 'https://books.bunshun.jp/articles/-/1256'], ['본인 인터뷰 · 2018-12-13 공개: 인물의 선택을 따라 쓰기', 'https://books.bunshun.jp/articles/-/4572?page=2'], ['서지 · 문예춘추: 『容疑者Xの献身』 수상 기록', 'https://books.bunshun.jp/ud/book/num/9784167110123'], ['평론 · 집영사: 작풍 변화에 관한 비평', 'https://seidoku.shueisha.co.jp/1109/try01_sugie.html'], ['서지 · 문예춘추: 『永遠の記憶』·작가 소개', 'https://books.bunshun.jp/ud/book/num/9784163921327']]
    },
    imamura: {
      title: '독자가 풀 수 있는 규칙과 단서 설계',
      summary: '새로운 설정 하나를 고르고, 그 안에서 독자도 답에 도달할 수 있는 단서를 만드는 연습이에요.',
      compare: ['장치와 고립 조건', '구조를 분석하고 배치를 조정', '작품의 속도에 맞춘 정보량'],
      task: ['현실과 다른 규칙을 하나만 정하고 독자에게 먼저 알려 줘요.', '세 사람 중 한 명만 가능한 행동을 단서 세 개로 설계해요.', '정답을 모르는 사람이 단서만으로 답을 고를 수 있는지 확인해요.'],
      sources: [['본인 인터뷰 · 2017-12-20: 트릭의 수정과 배치', 'https://shosetsu-maru.com/interviews/authors/337'], ['본인 인터뷰 · 2019-05-23: 구조 분석과 독자의 반론', 'https://book.asahi.com/article/12351305'], ['서지 · 도쿄소겐샤: 데뷔작·수상 기록', 'https://www.tsogen.co.jp/pr/pr_shijinsou_ranking.pdf'], ['본인 인터뷰 · 2026-10-15 / PR: 『0秒前の彼女』와 정보 줄이기', 'https://realsound.jp/book/2026/10/post-2547729.html']]
    },
    shirai: {
      title: '풀고 싶은 논리에서 세계를 거꾸로 만들기',
      summary: '특이한 설정의 크기보다, 그 규칙이 추리를 성립시키는 데 꼭 필요한지 확인해요.',
      compare: ['추리 아이디어·형식', '다중 해결까지 미리 설계', '복선의 강약 조정'],
      task: ['같은 사건을 설명할 가설 두 개를 적어요.', '각 가설이 성립하는 조건과 틀리는 조건을 한 줄씩 써요.', '두 가설을 가르는 단서를 미리 보여 주는 짧은 장면을 써요.'],
      sources: [['서지 · 신초샤: 작가 소개·수상 이력', 'https://www.shinchosha.co.jp/book/104482/'], ['본인 답변 · 2024년 / 2025-05-02 공개: 창작과 실제 사건', 'https://j-nbooks.jp/article/244/'], ['저자·편집자 대담 · 2022-11-30 / 2023-04-21 공개: 플롯·퇴고', 'https://note.com/giallo_kobunsha/n/n156e8aee9aa4']]
    },
    aizawa: {
      title: '독자의 예상과 미리 심어 둔 장치',
      summary: '독자가 무엇을 당연하게 받아들일지 생각하고, 다시 읽었을 때도 말이 되는 문장을 준비해요.',
      compare: ['독자 경험·탐정', '작품별 방식이 다름', '반복의 변화와 초고 이후 편집'],
      task: ['한 문장이 두 가지 뜻으로 읽히는 상황을 정해요.', '독자가 먼저 떠올릴 뜻으로 짧은 대화를 써요.', '마지막 한 줄 뒤에 다시 읽어도 처음 문장이 거짓이 아닌지 확인해요.'],
      sources: [['저자·편집자 대담 · 2020-01-09: 『medium』의 플롯·초고·수정', 'https://news.kodansha.co.jp/books/8090'], ['본인 인터뷰 · 2020-02-22: 독자의 흥미와 탐정', 'https://www.webdoku.jp/rensai/sakka/michi215_aizawa/20200222_4.html'], ['본인 인터뷰 · 2021-07-31: 탐정의 설계와 『invert』', 'https://realsound.jp/book/2021/07/post-826269.html'], ['본인 인터뷰 · 2021-07-31 / 2쪽: 반복·인물·띠지', 'https://realsound.jp/book/2021/07/post-826269_2.html']]
    },
    nisio: {
      title: '대화와 제약으로 문장을 실험하기',
      summary: '인물의 대화와 문장 자체의 재미를 살피고, 설명을 덜어도 장면이 전해지는지 실험해 봐요.',
      compare: ['지금 쓰고 싶은 아이디어', '이야기의 구조와 역할을 자각', '활자의 재미·설명의 생략'],
      task: ['원하는 것이 다른 두 인물을 정해요.', '설명문 없이 대화 열 줄로 작은 갈등을 써요.', '같은 장면을 특정 단어 하나를 쓰지 않고 다시 써 보세요.'],
      sources: [['본인 인터뷰 · 2010-07-31: 아이디어와 활자의 재미', 'https://mantan-web.jp/article/20100730dog00m200032000c.html'], ['본인 대담 · 2021년: 미스터리 구조와 인물의 역할', 'https://kai-you.net/article/80332/page/3'], ['본인 메일 인터뷰 · 2023-02-23: 오디오북과 표현 선택', 'https://mantan-web.jp/article/20230220dog00m200056000c.html']]
    }
  };
  const names = Object.fromEntries(Array.from(document.querySelectorAll('[data-author]')).map(t => [t.dataset.author, t.querySelector('b').textContent]));
  const read = (key, fallback = '') => { try { return localStorage.getItem(key) || fallback; } catch (_) { return fallback; } };
  const write = (key, value) => { try { localStorage.setItem(key, value); return true; } catch (_) { return false; } };
  function el(tag, cls, text) { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; }
  function sourceList(sources) {
    const ul = el('ul', 'source-links');
    sources.forEach(([title, url]) => { const li = el('li'), a = el('a', '', title + ' ↗'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; li.append(a); ul.append(li); });
    return ul;
  }
  for (const [id, d] of Object.entries(data)) {
    const panel = document.getElementById('a-' + id), hero = panel.querySelector('.hero');
    const sections = Array.from(panel.children).filter(n => n.tagName === 'SECTION');
    const summary = el('section', 'study-summary'); summary.id = id + '-summary';
    summary.append(el('p', 'eyebrow', '핵심 · 이 노트의 학습 제안'), el('h2', '', d.title), el('p', '', d.summary));
    const toc = el('nav', 'author-toc'); toc.setAttribute('aria-label', names[id] + ' 차례');
    hero.after(summary); summary.after(toc);
    const core = [], deep = [];
    sections.forEach((section, i) => {
      section.id = id + '-section-' + i;
      const title = section.querySelector('h2').textContent;
      if (/작풍|어떻게 쓰는/.test(title)) core.push([0, section]);
      else if (/대표작/.test(title)) core.push([1, section]);
      else if (/쓰는 과정/.test(title)) core.push([2, section]);
      else deep.push(section);
    });
    core.sort((a, b) => a[0] - b[0]).forEach(([, section]) => panel.append(section));
    const task = el('section', 'study-task'); task.id = id + '-practice';
    task.append(el('p', 'eyebrow', '실습 · 이 노트가 제안하는 연습'), el('h2', '', '읽은 방법을 내 글에 적용하기'));
    const ol = el('ol'); d.task.forEach(t => ol.append(el('li', '', t))); task.append(ol);
    const label = el('label', '', '내 실습 메모'), textarea = el('textarea'); textarea.id = id + '-draft'; label.htmlFor = textarea.id;
    textarea.value = read('novel.draft.' + id); textarea.placeholder = '위의 세 단계를 따라 짧게 써 보세요.';
    const status = el('p', 'task-save', '메모는 이 브라우저에 저장돼요.'); status.setAttribute('role', 'status');
    textarea.addEventListener('input', () => { status.textContent = write('novel.draft.' + id, textarea.value) ? '이 브라우저에 저장했어요.' : '브라우저 저장을 사용할 수 없어요. 필요한 메모를 따로 복사해 주세요.'; });
    const checklabel = el('label', 'task-check'), check = el('input'); check.type = 'checkbox'; check.checked = read('novel.practice.' + id) === '1';
    check.addEventListener('change', () => write('novel.practice.' + id, check.checked ? '1' : '0'));
    checklabel.append(check, document.createTextNode('내 글에서 배운 점 한 가지를 확인했어요'));
    task.append(label, textarea, checklabel, status); panel.append(task);
    const deepBox = el('details', 'study-deep'); deepBox.id = id + '-deep'; deepBox.append(el('summary', '', '심화 · 생애, 데뷔 과정과 배울 점'));
    deep.forEach(section => deepBox.append(section)); panel.append(deepBox);
    const sources = el('section'); sources.id = id + '-sources';
    sources.append(el('h2', '', '출처와 해석'), el('p', '', '집필 방법의 각 항목에서 발언 시점·해당 작품·원문을 확인할 수 있어요. 아래 목록은 본인 인터뷰, 편집자와의 대담, 평론, 서지를 구분했어요. 작풍 비교와 실습은 이 노트의 해석이며 작가의 고정 원칙으로 보지는 않아요.'), sourceList(d.sources), el('p', 'source-note', '집필 방법 대조: 2026-10-24. 이 확인일은 모든 생애·판매·번역판 정보의 전수 검증을 뜻하지 않아요. 원문 인터뷰에는 작품 내용이 포함될 수 있어요.'));
    panel.append(sources);
    const targets = [[summary.id, '핵심'], ...core.map(([, n]) => [n.id, n.querySelector('h2').textContent.replace('작풍의 특징: 트릭은 약한 편일까?', '작풍').replace('작품을 쓰는 과정', '집필 방법')]), [task.id, '실습'], [deepBox.id, '생애·심화'], [sources.id, '출처']];
    targets.forEach(([target, title]) => { const a = el('a', '', title); a.href = '#' + target; toc.append(a); });
    core.filter(([n]) => n === 2).forEach(([, n]) => {
      const note = el('p', 'source-note'); note.append(document.createTextNode('관련 자료를 더 살펴보려면 '));
      const a = el('a', '', '원문 출처 확인'); a.href = '#' + sources.id; note.append(a); n.append(note);
    });
  }
  const comparison = el('section', 'comparison'); comparison.id = 'author-comparison';
  comparison.append(el('h2', '', '다섯 작가의 방법 비교'), el('p', 'note', '이 노트의 비교예요. 한 작가도 작품과 집필 시기에 따라 방법이 달라질 수 있어요. 작은 화면에서는 표를 좌우로 움직여 보세요.'));
  const wrap = el('div', 'compare-wrap'); wrap.tabIndex = 0; wrap.setAttribute('role', 'region'); wrap.setAttribute('aria-label', '작가별 착상·플롯·다듬기 비교');
  const table = el('table', 'tbl'); table.innerHTML = '<thead><tr><th scope="col">작가</th><th scope="col">착상·관심</th><th scope="col">플롯</th><th scope="col">다듬을 때 볼 점</th></tr></thead>';
  const body = el('tbody');
  Object.entries(data).forEach(([id, d]) => { const tr = el('tr'), th = el('th'), a = el('a', '', names[id]); th.scope = 'row'; a.href = '#a-' + id; th.append(a); tr.append(th); d.compare.forEach(t => tr.append(el('td', '', t))); body.append(tr); });
  table.append(body); wrap.append(table); comparison.append(wrap); document.querySelector('.tabs').before(comparison);
  const tabs = Array.from(document.querySelectorAll('[data-author]'));
  tabs.forEach(t => { t.id = 'tab-' + t.dataset.author; t.setAttribute('aria-controls', 'a-' + t.dataset.author); document.getElementById('a-' + t.dataset.author).setAttribute('aria-labelledby', t.id); });
  function show(id) {
    if (!document.getElementById('a-' + id)) id = 'common';
    tabs.forEach(t => { const active = t.dataset.author === id; t.setAttribute('aria-selected', String(active)); t.tabIndex = active ? 0 : -1; });
    document.querySelectorAll('.author').forEach(p => { p.hidden = p.id !== 'a-' + id; });
    write('novel.author', id);
  }
  function fromHash(scroll = true) {
    let hash; try { hash = decodeURIComponent(location.hash.slice(1)); } catch (_) { hash = ''; }
    const target = document.getElementById(hash), panel = target && target.closest('.author');
    show(panel ? panel.id.slice(2) : hash === 'author-comparison' ? 'common' : read('novel.author', 'common'));
    if (target) {
      let parent = target; while (parent) { if (parent.tagName === 'DETAILS') parent.open = true; parent = parent.parentElement; }
      // Scroll after the panel is visible, including background tabs where rAF is throttled.
      if (scroll) target.scrollIntoView({ block: 'start' });
    }
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => { location.hash = 'a-' + tab.dataset.author; show(tab.dataset.author); });
    tab.addEventListener('keydown', e => {
      let next = index;
      if (e.key === 'ArrowRight') next = (index + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      else return;
      e.preventDefault(); tabs[next].click(); tabs[next].focus({ preventScroll: true });
    });
  });
  document.addEventListener('click', e => { if (e.target.closest('a[href^="#"]')) setTimeout(() => fromHash(), 0); });
  window.addEventListener('hashchange', () => fromHash()); fromHash();
})();
