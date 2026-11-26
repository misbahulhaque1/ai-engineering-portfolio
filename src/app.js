import {retrieve,evaluate,report,activate} from './logic.js';
import {projects,notes} from './content.js';

const a = (text, href) => {
  const node = document.createElement('a');
  node.href = href;
  node.textContent = text;
  return node;
};
const element = (tag,text) => {
  const node = document.createElement(tag);
  if (text !== undefined) node.textContent = text;
  return node;
};
const byId = id => document.getElementById(id);
const percent = n => n === null ? 'Undefined' : (n*100).toFixed(0)+'%';
const currency = n => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);

const theme = byId('theme');
const preferLight = matchMedia('(prefers-color-scheme: light)');
function setTheme(value) {
  document.documentElement.dataset.theme = value;
  theme.textContent = value === 'light' ? '☀' : '◐';
  theme.setAttribute('aria-label','Switch to '+(value === 'light' ? 'dark' : 'light')+' theme');
}
let remembered;
try { remembered = localStorage.getItem('theme'); } catch {}
setTheme(remembered || (preferLight.matches ? 'light' : 'dark'));
theme.addEventListener('click',() => {
  const value = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  setTheme(value);
  try { localStorage.setItem('theme',value); } catch {}
});

const index = [
  ['Home','/','misbah ai engineer'],
  ['Selected work','/work/','portfolio projects'],
  ['AI Lab','/lab/','experiments ai machine learning agentic analytics business intelligence xai'],
  ['Threshold explorer','/lab/#threshold','evaluation synthetic dataset precision recall'],
  ['Neural network','/lab/#network','deep learning relu sigmoid activations'],
  ['Research workflow','/lab/#workflow','agentic planner retrieval evidence'],
  ['Revenue and margin','/lab/#bi','data dashboard bi'],
  ['About Misbah','/about/','experience education flyrank internship skills credentials'],
  ['Recruiter view','/recruiters/','contact recruiter hiring pdf'],
  ['Engineering notes','/notes/','technical writing articles'],
  ['Ask the portfolio','/assistant/','assistant sources'],
  ...projects.map(p=>[p.title,'/work/'+p.id+'/',p.stack.join(' ')+' '+p.type]),
  ...notes.map(n=>[n.title,'/notes/'+n.id+'/',n.type])
];
const dialog = byId('search-dialog');
const queryField = byId('search-query');
const searchResults = byId('search-results');
function renderSearch() {
  const tokens = queryField.value.toLowerCase().trim().split(/\s+/);
  const matches = index.filter(([title,,tags]) => tokens.every(word => (title+' '+tags).toLowerCase().includes(word)));
  searchResults.replaceChildren(...matches.slice(0,8).map(([title,href])=>{
    const item = element('li');
    item.append(a(title,href));
    return item;
  }));
  if (!matches.length) searchResults.append(element('li','No matching pages.'));
}
function openSearch() {
  if (dialog.open) return;
  queryField.value = '';
  renderSearch();
  dialog.showModal();
  queryField.focus();
}
byId('search-open').addEventListener('click',openSearch);
byId('search-close').addEventListener('click',()=>dialog.close());
queryField.addEventListener('input',renderSearch);
dialog.addEventListener('keydown',event=>{
  if (event.key === 'Escape') { event.preventDefault(); dialog.close(); }
});
dialog.addEventListener('click',event=>{if (event.target.closest('a')) dialog.close();});
document.addEventListener('keydown',event=>{
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase()==='k') {
    event.preventDefault();
    openSearch();
  }
});

function metrics(container, pairs) {
  container.replaceChildren(...pairs.map(([label,value])=>{
    const node = element('div');
    node.className = 'metric';
    node.append(element('strong',value),element('span',label));
    return node;
  }));
}

const assistant = byId('assistant');
if (assistant) {
  const question = byId('question');
  const answer = byId('answer');
  assistant.addEventListener('submit',event=>{
    event.preventDefault();
    answer.replaceChildren();
    const hits = retrieve(question.value);
    if (!hits.length) {
      answer.append(element('p','I couldn’t find a source for that question. Try asking about a project, education, or experience.'));
      return;
    }
    for (const hit of hits) {
      const article = element('article');
      article.append(element('p',hit.text), a(hit.title+' ↗',hit.href));
      answer.append(article);
    }
  });
  for (const prompt of document.querySelectorAll('[data-question]')) {
    prompt.addEventListener('click',()=>{
      question.value = prompt.dataset.question;
      assistant.requestSubmit();
    });
  }
}
const threshold = byId('threshold-value');
if (threshold) {
  const render = () => {
    const value = Number(threshold.value)/100;
    byId('threshold-out').value = value.toFixed(2);
    const {precision,recall,tp,fp,tn,fn} = evaluate(value);
    metrics(byId('threshold-results'),[['Precision',percent(precision)],['Recall',percent(recall)],['True positives',tp],['False positives',fp],['True negatives',tn],['False negatives',fn]]);
  };
  threshold.addEventListener('input',render);
  render();
}
const inputA = byId('node-a');
if (inputA) {
  const inputB = byId('node-b');
  function render() {
    const x = Number(inputA.value)/100;
    const y = Number(inputB.value)/100;
    byId('a-out').value = x.toFixed(2);
    byId('b-out').value = y.toFixed(2);
    const {hidden,output} = activate(x,y);
    metrics(byId('network-results'),[['Hidden 1',hidden[0].toFixed(3)],['Hidden 2',hidden[1].toFixed(3)],['Output',output.toFixed(3)]]);
    metrics(byId('network-effects'),[['Effect of A',(output-activate(0,y).output).toFixed(3)],['Effect of B',(output-activate(x,0).output).toFixed(3)]]);
  }
  inputA.addEventListener('input',render);
  inputB.addEventListener('input',render);
  render();
}
const agent = byId('agent');
if (agent) {
  agent.addEventListener('submit',event=>{
    event.preventDefault();
    const objective = byId('objective');
    const hits = retrieve(objective.value);
    const evidence = element('li',hits.length ? 'Evidence check: open the matching source. ' : 'Evidence check: stopped because no matching source was found.');
    if (hits.length) evidence.append(a(hits[0].title+' ↗',hits[0].href));
    byId('agent-results').replaceChildren(element('li','Plan: '+objective.selectedOptions[0].text+'.'),element('li','Lookup: '+hits.length+' matching source'+(hits.length===1?'':'s')+'.'),evidence);
  });
}
const segment = byId('segment');
if (segment) {
  function render() {
    const {rows,revenue,cost,margin} = report(segment.value);
    metrics(byId('bi-results'),[['Revenue',currency(revenue)],['Cost',currency(cost)],['Gross margin',percent(margin)]]);
    const totals = new Map();
    for (const {month,revenue} of rows) totals.set(month,(totals.get(month) ?? 0)+revenue);
    byId('bi-bars').replaceChildren(...Array.from(totals,([month,revenue])=>{
      const row = element('div');
      row.className = 'bi-row';
      const meter = element('meter');
      meter.max = 30000;
      meter.value = revenue;
      meter.setAttribute('aria-label',month+' revenue');
      row.append(element('span',month),meter,element('span',currency(revenue)));
      return row;
    }));
  }
  segment.addEventListener('change',render);
  render();
}

const canvas = byId('neural-field');
if (canvas) {
  const context = canvas.getContext('2d');
  const toggle = byId('field-toggle');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches;
  let seen = true;
  let raf = 0;
  let angle = .4;
  let tilt = -.16;
  let width = 0;
  let height = 0;
  const pointCount = 142;
  const points = Array.from({length:pointCount},(_,i)=>{
    const y = 1-(i/(pointCount-1))*2;
    const r = Math.sqrt(1-y*y);
    const theta = i * Math.PI * (3-Math.sqrt(5));
    return [r*Math.cos(theta),y,r*Math.sin(theta)];
  });
  const edges = points.flatMap(([x,y,z],i)=>points.slice(i+1).map(([a,b,c],delta)=>[i,i+1+delta,Math.hypot(x-a,y-b,z-c)]).filter(([, ,d])=>d<.39));
  const stars = Array.from({length:82},(_,i)=>[(Math.sin(i*47.267)*.5+.5),(Math.cos(i*129.635)*.5+.5),i%7]);

  function draw() {
    if (!context || !width || !height) return;
    context.clearRect(0,0,width,height);
    const cx = width*.5, cy = height*.49;
    const radius = Math.min(width,height)*.375;
    for (const [x,y,s] of stars) {
      context.fillStyle = s===0 ? '#a8e6a1a0' : '#a8e6a14d';
      context.fillRect(x*width,y*height,s===0?2:1,s===0?2:1);
    }
    context.strokeStyle = '#80be844a';
    for (const factor of [1.15,1.29]) {
      context.beginPath();
      context.ellipse(cx,cy,radius*factor,radius*.29,-.43,0,Math.PI*2);
      context.stroke();
    }
    const ca = Math.cos(angle), sa = Math.sin(angle);
    const ct = Math.cos(tilt), st = Math.sin(tilt);
    const projected = points.map(([x,y,z])=>{
      const horizontal = x*ca-z*sa;
      const z1 = x*sa+z*ca;
      const depth = y*st+z1*ct;
      const scale = 1/(1.42-depth*.29);
      return [cx+horizontal*radius*scale*1.2,cy+(y*ct-z1*st)*radius*scale*1.2,depth];
    });
    for (const [from,to] of edges) {
      const [x,y,z]=projected[from], [a,b,d]=projected[to];
      const opacity = .12 + ((z+d+2)/4)*.48;
      context.strokeStyle = 'rgba(177,245,125,'+opacity+')';
      context.beginPath();
      context.moveTo(x,y);
      context.lineTo(a,b);
      context.stroke();
    }
    projected.forEach(([x,y,z],i)=>{
      const bright = i%9 === 0;
      context.fillStyle = bright ? '#d6ffc7' : 'rgba(175,255,132,'+(.42+.25*z)+')';
      context.shadowBlur = bright ? 13 : 0;
      context.shadowColor = '#abff82';
      context.beginPath();
      context.arc(x,y,bright ? 2.3 : 1.35,0,Math.PI*2);
      context.fill();
    });
    context.shadowBlur = 0;
  }
  function tick() {
    raf = 0;
    angle += .005;
    draw();
    schedule();
  }
  function schedule() {
    if (seen && !paused && !document.hidden && !raf) raf = requestAnimationFrame(tick);
  }
  function updatePause() {
    toggle.textContent = paused ? 'Play motion' : 'Pause motion';
    toggle.setAttribute('aria-pressed',String(paused));
    if (paused && raf) {cancelAnimationFrame(raf);raf=0;}
    schedule();
  }
  if (context) {
    canvas.parentElement.classList.add('rendered');
    new ResizeObserver(()=>{
      const dpr = Math.min(devicePixelRatio,2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width*dpr;
      canvas.height = height*dpr;
      context.setTransform(dpr,0,0,dpr,0,0);
      draw();
    }).observe(canvas);
    new IntersectionObserver(([entry])=>{
      seen = entry.isIntersecting;
      schedule();
    }).observe(canvas);
    canvas.addEventListener('pointermove',event=>{
      if (!paused && width) tilt = (event.offsetY/height-.5)*.9;
    });
    toggle.addEventListener('click',()=>{paused=!paused;updatePause();});
    reduced.addEventListener('change',()=>{paused=reduced.matches;updatePause();});
    document.addEventListener('visibilitychange',schedule);
    updatePause();
  } else {
    toggle.hidden = true;
  }
}
