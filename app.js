(() => {
'use strict';

const P = window.YY_PRODUCTS || [];
const C = ['实体类', '食品类', '咨询类', '课程类', '法会', '开光'];

const ROOT = [
  ['人生方向与决策', '决策'],
  ['事业、财运与学业', '事业'],
  ['姻缘、婚姻与人际', '姻缘'],
  ['求子与家庭', '求子'],
  ['健康与日常状态', '健康关切'],
  ['家宅、风水与平安', '家宅'],
  ['传统祈福与节庆', '祈福'],
  ['学习传统文化', '学习'],
  ['物品、茶饮与日常', '食品'],
  ['我有多个问题', '多项'],
  ['我不确定属于哪类', '不确定']
];

const SUB = {
  '决策': [
    ['有一件具体事情难以决定', '决策'],
    ['对未来感到迷茫', '成长'],
    ['希望持续规划与成长', '长期'],
    ['想先了解自己的情况', '咨询']
  ],
  '事业': [
    ['工作发展、升迁与就业', '事业'],
    ['财运祈愿或补财库', '财运'],
    ['学习考试与文昌', '学业'],
    ['开业、交易等事项择日', '择日']
  ],
  '姻缘': [
    ['希望了解姻缘、感情发展', '姻缘'],
    ['婚姻合婚、婚期', '婚姻'],
    ['夫妻关系或人际困扰', '人际'],
    ['感情方面想进一步沟通', '咨询']
  ],
  '求子': [
    ['关注求子祈愿', '求子'],
    ['想聊子女、家庭关系', '咨询'],
    ['希望先了解传统祈福选项', '祈福']
  ],
  '健康关切': [
    ['疲乏、气短、精神不足', '气虚'],
    ['面色、干燥等状态关切', '血虚'],
    ['希望静心安神', '静心'],
    ['为自己或长辈祈福', '平安'],
    ['希望进一步沟通', '咨询']
  ],
  '家宅': [
    ['房屋风水情况', '风水'],
    ['入住、装修或选址', '房屋'],
    ['家宅平安祈愿', '平安'],
    ['开光、镇物、供香', '开光'],
    ['择日或迁居', '择日']
  ],
  '祈福': [
    ['日常平安祈福', '平安'],
    ['节庆法会', '节庆'],
    ['个人专项法会', '个人法会'],
    ['祖先祭祀相关', '祖先祭祀'],
    ['了解符箓形式', '符箓']
  ],
  '学习': [
    ['国学入门', '国学'],
    ['梅花易数、小六壬', '术数'],
    ['秘法、静心相关课程', '秘法'],
    ['想看看全部课程', '学习']
  ],
  '食品': [
    ['日常茶饮、礼盒', '茶饮'],
    ['修愈乐红瓶或蓝瓶', '修愈乐'],
    ['香囊、饰品或朱砂', '实体物品'],
    ['物品开光或供香', '开光']
  ],
  '多项': [
    ['事业与财运', '事业'],
    ['感情与家庭', '姻缘'],
    ['家宅与平安', '家宅'],
    ['方向与成长', '成长'],
    ['健康与日常', '健康关切'],
    ['其他组合，进一步沟通', '咨询']
  ],
  '不确定': [
    ['先梳理自己的问题', '咨询'],
    ['先看看传统祈福', '祈福'],
    ['先看看实体物品', '实体物品'],
    ['先了解服务图鉴', '图鉴']
  ]
};

const FORM = [
  ['分析、咨询或决策参考', '咨询'],
  ['传统祈福、法会或仪式', '仪式'],
  ['符箓、饰品等实体物品', '物品'],
  ['风水、择日或开光事务', '事务'],
  ['课程、知识或技能', '学习'],
  ['茶饮、食品或日常用品', '食品'],
  ['尚不确定', '不限']
];

const DETAILS = {
  咨询: [
    ['有明确问题，简短咨询', '明确'],
    ['希望全面了解与深入梳理', '深入'],
    ['需要长期跟进', '长期'],
    ['暂不确定', '不限']
  ],
  仪式: [
    ['日常祈福', '祈福'],
    ['节庆法会', '法会'],
    ['个人专项定制', '个人法会'],
    ['暂不确定', '不限']
  ],
  物品: [
    ['符箓（各种形式）', '符箓'],
    ['饰品、朱砂、香囊', '实体物品'],
    ['希望了解开光', '开光'],
    ['暂不确定', '不限']
  ],
  事务: [
    ['房屋风水', '风水'],
    ['择日或合婚', '择日'],
    ['开光、供香', '开光'],
    ['暂不确定', '不限']
  ],
  学习: [
    ['国学基础', '国学'],
    ['术数学习', '术数'],
    ['秘法课程', '秘法'],
    ['暂不确定', '不限']
  ],
  食品: [
    ['修愈乐', '修愈乐'],
    ['茶叶礼盒', '茶饮'],
    ['香囊或朱砂', '实体物品'],
    ['暂不确定', '不限']
  ],
  不限: [
    ['先看可能的选择', '不限'],
    ['希望深入沟通', '咨询']
  ]
};

// 已删除第五步预算
const STAGES = [
  '关注方向',
  '具体困扰',
  '希望的帮助',
  '进一步偏好'
];

let S = {
  view: 'home',
  answers: [],
  step: 0,
  category: null,
  sub: null,
  query: '',
  detail: null,
  compare: [],
  from: 'catalog',
  multi: []
};

const $ = q => document.querySelector(q);

const escape = x => String(x ?? '待补充').replace(
  /[&<>"']/g,
  c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c])
);

function persist() {
  try {
    sessionStorage.setItem('yy_v2', JSON.stringify(S));
  } catch {}
}

function view(v) {
  S.view = v;
  render();
}

function start() {
  S = {
    ...S,
    view: 'explore',
    answers: [],
    step: 0,
    multi: []
  };
  render();
}

// 修复：第四步完成后直接进入推荐
function choose(v, l) {
  S.answers = S.answers.slice(0, S.step);
  S.answers.push({ value: v, label: l });
  S.step++;

  if (S.step >= 4) {
    S.view = 'results';
  }

  render();
}

function back(n) {
  S.answers = S.answers.slice(0, n);
  S.step = n;
  view('explore');
}

function header(body) {
  $('#app').innerHTML = `
    <div class="shell">
      <header class="top">
        <button class="brand" data-act="home">
          玉瑶司 <small>· 问心寻解</small>
        </button>
        <nav>
          <button data-act="explore">需求探索</button>
          <button data-act="catalog">服务图鉴</button>
          <button data-act="about">关于我们</button>
        </nav>
      </header>
      <main>${body}</main>
      <footer>
        玉瑶司 · 心有所惑，循迹而解。<br>
        本页面仅为服务信息导航，传统文化与祈福实践不保证现实结果，
        不能替代专业医疗、心理、法律或财务建议。
        探索选择仅存储于当前浏览器会话。
      </footer>
    </div>
  `;

  bind();
}

const button = (l, v) => `
  <button
    class="choice"
    data-choice="${escape(v)}"
    data-label="${escape(l)}"
  >
    ${escape(l)}<span>↗</span>
  </button>
`;

function home() {
  header(`
    <section class="hero">
      <div class="hero-side hero-side-left"
           aria-label="无缘千金难求道">
        无缘千金难求道
      </div>

      <div class="hero-side hero-side-right"
           aria-label="有缘分文不取收">
        有缘分文不取收
      </div>

      <div class="hero-center">
        <div class="seal">
          <span>玉</span>
          <span>瑶</span>
          <span>司</span>
        </div>

        <p class="eyebrow">Y U · Y A O · S I</p>

        <h1>
          念念不忘，<br>
          <em>必有回响。</em>
        </h1>

        <p>
          每个人的困惑都有不同的来处。<br>
          让我们从你的问题开始。
        </p>

        <button class="primary" data-act="start">
          开始探索　→
        </button>

        <div class="home-links">
          <button data-act="catalog">直接查看全部服务</button>
          <button data-act="unsure">我不知道自己需要什么</button>
          <button data-act="about">了解玉瑶司</button>
        </div>
      </div>
    </section>
  `);
}

function path() {
  return `
    <aside class="path">
      <p class="eyebrow">探索之径 · 点击返回</p>
      <div class="nodes">
        <button
          class="node ${S.step === 0 ? 'active' : 'done'}"
          data-back="0"
        >起点</button>

        ${S.answers.map((a, i) => `
          <span class="connector">│</span>
          <button class="node done" data-back="${i + 1}">
            <small>${STAGES[i]}</small>
            ${escape(a.label)}
          </button>
        `).join('')}
      </div>
    </aside>
  `;
}

function explore() {
  const n = Math.min(S.step, 3);

  const opts =
    n === 0 ? ROOT :
    n === 1 ? (SUB[S.answers[0]?.value] || SUB['不确定']) :
    n === 2 ? FORM :
    (DETAILS[S.answers[2]?.value] || DETAILS['不限']);

  const title = [
    '您目前最想了解什么？',
    '哪一种情况更贴近您？',
    '您希望获得怎样的帮助？',
    '进一步了解您的偏好'
  ][n];

  header(`
    <div class="explore-layout">
      ${path()}

      <section class="question">
        <p class="eyebrow">第 ${n + 1} / 4 步</p>
        <h2>${title}</h2>

        <p class="muted">
          选择最贴近您当前情况的一项；您可以随时返回修改。
        </p>

        <div class="choices">
          ${opts.map(([l, v]) => button(l, v)).join('')}
        </div>

        <div class="subactions">
          <button data-act="results">先看看推荐</button>
          <button data-act="restart">重新探索</button>
          <button data-act="catalog">直接查看服务</button>
        </div>
      </section>
    </div>
  `);
}

// 推荐算法：已移除全部预算判断
function match(p) {
  const a = S.answers;
  const primary = a[1]?.value || a[0]?.value;
  const top = a[0]?.value;
  const form = a[2]?.value;
  const detail = a[3]?.value;
  const t = p.tags;

  let score = 0;
  let why = [];

  if (!primary) {
    return { score: -1, why };
  }

  if (t.includes(primary)) {
    score += 65;
    why.push(
      `对应您关注的「${a[1]?.label || a[0]?.label}」`
    );
  } else if (t.includes(top)) {
    score += 25;
    why.push('与您选择的关注方向有关');
  }

  const fm = {
    咨询: ['咨询'],
    仪式: ['传统仪式', '法会', '祈福'],
    物品: ['实体物品'],
    事务: ['风水', '择日', '开光'],
    学习: ['学习'],
    食品: ['食品']
  };

  if (form && form !== '不限') {
    if ((fm[form] || []).some(x => t.includes(x))) {
      score += 30;
      why.push('符合您偏好的帮助形式');
    } else {
      score -= 45;
    }
  }

  if (detail && detail !== '不限') {
    if (t.includes(detail)) {
      score += 24;
      why.push('与进一步偏好相符');
    } else {
      score -= 12;
    }
  }

  // 符箓作为所有需求均可进一步咨询的传统文化选项
  if (p.subcategory === '符箓大类') {
    score = Math.max(score, 49);
    why = [
      '可作为进一步了解的传统符箓祈福选项；具体形式与适用方向需人工沟通确认'
    ];
  }

  if (
    primary === '求子' &&
    p.subcategory !== '符箓大类' &&
    !t.includes('求子')
  ) {
    score = -1;
  }

  if (primary === '图鉴') {
    score = -1;
  }

  return { score, why };
}

function matches() {

  if (!S.answers.length) return [];

  // 计算所有产品的匹配分数

  const all = P.map(p => ({

    p,

    ...match(p)

  }))

    .filter(x => x.score >= 49 && x.why.length)

    .sort((a, b) =>

      b.score - a.score ||

      a.p.id.localeCompare(b.p.id)

    );

  // 先选择最匹配的3种产品

  const selected = [];

  const names = new Set();

  for (const item of all) {

    if (!names.has(item.p.name)) {

      selected.push(item);

      names.add(item.p.name);

    }

    if (selected.length >= 3) break;

  }

  // 将选中产品的所有匹配规格一起展示

  return all.filter(item => names.has(item.p.name));

}

function summary() {
  return S.answers
    .map((a, i) => `${STAGES[i]}：${a.label}`)
    .join('\n') || '尚未完成探索';
}

function listItem(p) {
  return `
    <button class="product-row" data-detail="${p.id}">
      <span>${escape(p.name)}</span>
      <b>
        ${escape(p.price)}
        ${/^\d+$/.test(p.price) ? ' 元' : ''}
      </b>
    </button>
  `;
}

function resultCard(x, i) {
  const p = x.p;

  return `
    <article class="card">
      <p class="eyebrow">
        ${i === 0 ? '优先匹配' : '其他可考虑'}
      </p>

      <p class="chip">
        ${escape(p.category)} / ${escape(p.subcategory)}
      </p>

      <h3>${escape(p.name)}</h3>

      <p class="price">
        ${escape(p.price)}
        ${/^\d+$/.test(p.price) ? ' 元' : ''}
      </p>

      <p class="reason">
        根据您提供的信息，这项服务可能符合您的需求。
        ${escape(x.why.join('；'))}。
      </p>

      <div class="actions">
        <button data-detail="${p.id}">
          查看详细介绍
        </button>
        <button data-consult="${p.id}">
          咨询这项服务
        </button>
      </div>
    </article>
  `;
}

function results() {
  const m = matches();

  header(`
    <div class="page-head">
      <p class="eyebrow">问心 · 寻解</p>
      <h2>
        根据您的选择，我们找到了这些可能适合您的服务。
      </h2>
      <p class="muted">
        推荐为初步信息匹配，不代表对结果的保证。
      </p>
    </div>

    <div class="result-grid">
      <aside class="summary">
        <h3>您的探索路径</h3>
        <pre>${escape(summary())}</pre>
        <button data-act="copy">复制我的需求摘要</button>
        <button data-act="edit">修改选择</button>
      </aside>

      <section class="results">
        ${
          m.length
            ? m.map(resultCard).join('')
            : `
              <div class="empty">
                <h3>推荐进一步深入沟通</h3>
                <p>
                  目前信息不足以匹配具体服务。
                  可以在群里，或联系曾曾、火火进一步沟通。
                </p>
              </div>
            `
        }

        <div class="subactions">
          <button data-act="restart">重新探索</button>
          <button data-act="catalog">查看其他服务</button>
        </div>
      </section>
    </div>
  `);
}

function catalog() {
  const q = S.query.trim().toLowerCase();

  const items = P.filter(p =>
    [
      p.name,
      p.category,
      p.subcategory,
      p.price,
      p.remark,
      p.description,
      ...p.tags
    ].join(' ').toLowerCase().includes(q)
  );

  const cats = S.category ? [S.category] : C;

  const content = cats.map(cat => {
    const ps = items.filter(p => p.category === cat);

    if (!ps.length) return '';

    const subs = [...new Set(ps.map(p => p.subcategory))];

    return `
      <section class="catalog-cat">
        <button class="cat-heading" data-cat="${escape(cat)}">
          <span>
            ${escape(cat)} <small>${ps.length} 项</small>
          </span>
          <span>${S.category === cat ? '－' : '＋'}</span>
        </button>

        ${
          S.category === cat
            ? `
              <div class="subgroups">
                ${subs.map(sub => `
                  <section class="subgroup">
                    <button
                      class="sub-heading"
                      data-sub="${escape(sub)}"
                    >
                      ${escape(sub)}
                      <small>
                        ${ps.filter(p => p.subcategory === sub).length} 项
                      </small>
                      <span>${S.sub === sub ? '－' : '＋'}</span>
                    </button>

                    ${
                      S.sub === sub
                        ? `
                          <div class="products">
                            ${
                              ps.filter(p => p.subcategory === sub)
                                .map(listItem)
                                .join('')
                            }
                          </div>
                        `
                        : ''
                    }
                  </section>
                `).join('')}
              </div>
            `
            : ''
        }
      </section>
    `;
  }).join('');

  header(`
    <div class="page-head">
      <p class="eyebrow">玉瑶司 · 服务图鉴</p>
      <h2>一览所藏，按需寻访。</h2>
      <p class="muted">
        ${P.length} 项服务与产品 · 大类 → 子类 →
        名称与价格；点击名称查看详情。
      </p>
    </div>

    <div class="toolbar">
      <input
        id="search"
        type="search"
        placeholder="搜索名称、分类或关键词"
        value="${escape(S.query)}"
      >
      <button data-act="allcats">全部大类</button>
    </div>

    <div class="catalog-tree">
      ${content || '<div class="empty">没有找到相关服务，请更换关键词。</div>'}
    </div>

    <div class="subactions bottom">
      <button data-act="restart">返回需求探索</button>
      <button data-act="compare">
        查看产品对比（${S.compare.length}/3）
      </button>
    </div>
  `);
}

function detail() {
  const p = P.find(x => x.id === S.detail);

  if (!p) {
    view('catalog');
    return;
  }

  header(`
    <div class="page-head">
      <p class="eyebrow">服务详情 · ${escape(p.id)}</p>
      <h2>${escape(p.name)}</h2>
      <p class="muted">
        ${escape(p.category)} / ${escape(p.subcategory)}
      </p>
    </div>

    <article class="detail">
      <p class="price">
        ${escape(p.price)}
        ${/^\d+$/.test(p.price) ? ' 元' : ''}
      </p>

      <div class="detail-row">
        <b>详细描述</b>
        <p>${escape(p.description)}</p>
      </div>

      <div class="detail-row">
        <b>备注 / 规格 / 服务条件</b>
        <p>${escape(p.remark)}</p>
      </div>

      <div class="detail-row">
        <b>需求标签（依据描述整理，仅供导航）</b>
        <p>${escape(p.tags.join('、') || '待补充')}</p>
      </div>

      <div class="actions">
        <button data-consult="${p.id}">咨询这项服务</button>
        <button data-compare="${p.id}">
          ${S.compare.includes(p.id) ? '取消对比' : '加入对比'}
        </button>
        <button data-act="catalog">返回服务图鉴</button>
        <button data-act="results">返回推荐</button>
      </div>
    </article>
  `);
}

function consult() {
  const p = P.find(x => x.id === S.detail);

  header(`
    <div class="page-head">
      <p class="eyebrow">进一步沟通</p>
      <h2>把您的问题，带给我们。</h2>
    </div>

    <div class="detail">
      <p>
        意向服务：
        <b>${escape(p?.name || '尚未确定')}</b>
      </p>

      <pre>${escape(summary())}</pre>

      <p>
        可以在群里，或者联系
        <strong>曾曾或火火</strong>
        进行进一步沟通。
      </p>

      <p class="muted">
        本页面不提供联系方式，也不会自动上传您的选择。
      </p>

      <div class="actions">
        <button data-act="copyconsult">复制咨询摘要</button>
        <button data-act="catalog">查看全部服务</button>
        <button data-act="results">返回推荐</button>
      </div>
    </div>
  `);
}

function about() {
  header(`
    <div class="page-head">
      <p class="eyebrow">ABOUT · 玉瑶司</p>
      <h2>先问心，再寻解。</h2>
    </div>

    <div class="detail">
      <p>
        「问心寻解」是玉瑶司的互动服务导航：
        从当前困惑出发，了解可能相关的实体产品、
        食品、咨询、课程、法会与开光服务。
      </p>

      <p>
        如果希望进一步了解，可以在群里或者联系曾曾或火火沟通。
        本页面不公开联系方式。
      </p>

      <p class="muted">
        服务描述保留原始提供文本，其中传统功效属于商家描述与
        文化信仰表述，不应被理解为经科学验证的效果承诺。
        食品及身心相关服务不替代医疗诊断或治疗。
      </p>

      <button class="primary" data-act="start">
        开始探索
      </button>
    </div>
  `);
}

function compare() {
  const ps = S.compare
    .map(id => P.find(p => p.id === id))
    .filter(Boolean);

  header(`
    <div class="page-head">
      <h2>服务对比</h2>
      <p class="muted">最多对比 3 项</p>
    </div>

    <div class="comparison">
      ${
        ps.length
          ? ps.map(p => `
            <article class="card">
              <h3>${escape(p.name)}</h3>
              <p class="chip">
                ${escape(p.category)} / ${escape(p.subcategory)}
              </p>
              <p class="price">${escape(p.price)}</p>
              <p>${escape(p.description)}</p>
              <button data-detail="${p.id}">查看详情</button>
              <button data-compare="${p.id}">移除</button>
            </article>
          `).join('')
          : '<p>请先在图鉴或详情页添加需要对比的服务。</p>'
      }
    </div>

    <button data-act="catalog">返回服务图鉴</button>
  `);
}

function copy(t) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(t)
      .then(() => alert('已复制'))
      .catch(() => fallback(t));
  } else {
    fallback(t);
  }
}

function fallback(t) {
  const el = document.createElement('textarea');
  el.value = t;
  document.body.append(el);
  el.select();

  try {
    document.execCommand('copy');
    alert('已复制');
  } catch {
    alert('请手动复制');
  }

  el.remove();
}

function bind() {
  document.querySelectorAll('[data-act]').forEach(b =>
    b.addEventListener('click', () => {
      const a = b.dataset.act;

      if (a === 'home') view('home');
      else if (a === 'start' || a === 'restart') start();
      else if (a === 'unsure') {
        start();
        choose('不确定', '我不确定属于哪类');
      }
      else if (a === 'explore') view('explore');
      else if (a === 'edit') back(Math.max(0, S.answers.length - 1));
      else if (a === 'results') view('results');
      else if (a === 'catalog') view('catalog');
      else if (a === 'about') view('about');
      else if (a === 'allcats') {
        S.category = null;
        S.sub = null;
        view('catalog');
      }
      else if (a === 'compare') view('compare');
      else if (a === 'copy') {
        copy('玉瑶司 · 需求摘要\n' + summary());
      }
      else if (a === 'copyconsult') {
        const p = P.find(x => x.id === S.detail);
        copy(
          '玉瑶司 · 咨询摘要\n意向服务：' +
          (p?.name || '待确认') +
          '\n' + summary()
        );
      }
    })
  );

  document.querySelectorAll('[data-choice]').forEach(b =>
    b.addEventListener('click', () => {
      if (b.dataset.choice === '图鉴') {
        view('catalog');
        return;
      }
      choose(b.dataset.choice, b.dataset.label);
    })
  );

  document.querySelectorAll('[data-back]').forEach(b =>
    b.addEventListener('click', () =>
      back(Number(b.dataset.back))
    )
  );

  document.querySelectorAll('[data-cat]').forEach(b =>
    b.addEventListener('click', () => {
      S.category =
        S.category === b.dataset.cat ? null : b.dataset.cat;
      S.sub = null;
      render();
    })
  );

  document.querySelectorAll('[data-sub]').forEach(b =>
    b.addEventListener('click', () => {
      S.sub = S.sub === b.dataset.sub ? null : b.dataset.sub;
      render();
    })
  );

  document.querySelectorAll('[data-detail]').forEach(b =>
    b.addEventListener('click', () => {
      S.detail = b.dataset.detail;
      view('detail');
    })
  );

  document.querySelectorAll('[data-consult]').forEach(b =>
    b.addEventListener('click', () => {
      S.detail = b.dataset.consult;
      view('consult');
    })
  );

  document.querySelectorAll('[data-compare]').forEach(b =>
    b.addEventListener('click', () => {
      const id = b.dataset.compare;

      if (S.compare.includes(id)) {
        S.compare = S.compare.filter(x => x !== id);
      } else if (S.compare.length < 3) {
        S.compare.push(id);
      } else {
        alert('最多对比3项');
        return;
      }

      render();
    })
  );

  const input = $('#search');

  if (input) {
    input.addEventListener('input', () => {
      const pos = input.selectionStart;
      S.query = input.value;
      catalog();

      const next = $('#search');
      next.focus();
      next.setSelectionRange(pos, pos);
    });
  }
}

function render() {
  persist();

  ({
    home,
    explore,
    results,
    catalog,
    detail,
    consult,
    about,
    compare
  }[S.view] || home)();

  window.scrollTo(0, 0);
}

// 修复：恢复状态时最多允许4步
try {
  const saved = JSON.parse(sessionStorage.getItem('yy_v2'));

  if (
    saved &&
    Array.isArray(saved.answers) &&
    Number.isInteger(saved.step) &&
    saved.step >= 0 &&
    saved.step <= 4
  ) {
    S = { ...S, ...saved };
  }
} catch {}

window.YY_APP = {
  products: P,
  matches,
  start,
  render,
  ROOT,
  SUB
};

render();

})();
