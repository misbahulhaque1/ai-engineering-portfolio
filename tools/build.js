import {cp, mkdir, readFile, readdir, rm, writeFile} from 'node:fs/promises';
import {name,headline,github,linkedin,experience,education,projects,credentials,notes,sources} from '../src/content.js';

const target = new URL('../dist/', import.meta.url);
const origin = (process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL && 'https://' + process.env.VERCEL_PROJECT_PRODUCTION_URL) || 'https://misbah-ai-engineering.vercel.app').replace(/\/$/,'');
const esc = value => String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const link = (url,label,cls='') => `<a ${cls ? 'class="'+cls+'"' : ''} href="${esc(url)}">${esc(label)}</a>`;
const pages = new Map();
const nav = [['/work/','Work'],['/lab/','AI Lab'],['/about/','About'],['/notes/','Notes']];
const descriptions = 'Portfolio of Misbah Ul Haque. Explore applied machine learning, research discovery, interactive AI experiments, and business intelligence.';
const breadcrumb = (href,label) => link(href,'← '+label,'back');
const title = (group,heading,lead) => `<header class="page-title"><p class="eyebrow">${group}</p><h1>${heading}</h1><p class="lead">${lead}</p></header>`;
const labels = items => `<ul class="tags">${items.map(item=>`<li>${item}</li>`).join('')}</ul>`;
const button = (url,label,primary=false) => link(url,label,'button'+(primary?' primary':''));

function layout(path, pageTitle, description, body) {
  const fullTitle = path === '/' ? name + ' | AI Engineer' : pageTitle + ' | ' + name;
  const canonical = origin + path;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(fullTitle)}</title><meta name="description" content="${esc(description)}">
${path === '/404.html' ? '<meta name="robots" content="noindex">' : '<link rel="canonical" href="'+esc(canonical)+'">'}
<meta name="theme-color" content="#090d0e"><meta property="og:type" content="website"><meta property="og:title" content="${esc(fullTitle)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${esc(canonical)}"><meta property="og:image" content="${esc(origin)}/social.png"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="/mark.svg"><link rel="stylesheet" href="/style.css"><script type="module" src="/app.js"></script></head>
<body><a class="skip" href="#main">Skip to content</a>
<header class="top"><div class="top-inner"><a class="brand" href="/"><span aria-hidden="true" class="brand-mark">M<span>.</span></span><span>Misbah Ul Haque</span></a>
<nav aria-label="Main navigation">${nav.map(([href,label])=>`<a href="${href}"${path.startsWith(href)?' aria-current="page"':''}>${label}</a>`).join('')}</nav>
<div class="top-actions"><button type="button" id="theme" aria-label="Switch to light theme">◐</button><button type="button" id="search-open"><span aria-hidden="true">⌕</span> Search <kbd aria-hidden="true">Ctrl K</kbd></button><a href="/recruiters/" class="recruiter-link">Recruiter view ↗</a></div></div></header>
<main id="main" tabindex="-1">${body}</main>
<footer class="footer"><div><a class="brand" href="/"><span class="brand-mark" aria-hidden="true">M<span>.</span></span><span>${name}</span></a><p>AI engineering · Pakistan</p></div><nav aria-label="Contact and profiles">${link(linkedin,'LinkedIn ↗')}${link(github,'GitHub ↗')}${link('/recruiters/','Recruiter view')}${link('/assistant/','Ask the portfolio')}</nav></footer>
<dialog id="search-dialog" aria-labelledby="search-title"><div class="dialog-head"><h2 id="search-title">Search portfolio</h2><button type="button" id="search-close" aria-label="Close search">×</button></div><label for="search-query">Projects, pages, and topics</label><input type="search" id="search-query" autocomplete="off" placeholder="Try Python or FlyRank"><ul id="search-results"></ul></dialog>
</body></html>`;
}

function page(path,pageTitle,description,body) {
  pages.set(path,layout(path,pageTitle,description,body));
}

const diagram = (flow,label) => `<figure class="architecture"><figcaption>${label}</figcaption><ol>${flow.map(item=>`<li>${item}</li>`).join('')}</ol></figure>`;
const visual = (project) => project.id === 'cognisight'
  ? `<div class="project-visual forest" aria-hidden="true"><div class="visual-caption"><span>MODEL OUTPUT</span><span>ILLUSTRATION</span></div><div class="sample-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>`
  : `<div class="project-visual papers" aria-hidden="true"><div class="visual-caption"><span>RESEARCH INDEX</span><span>ILLUSTRATION</span></div><div class="paper-stack"><i></i><i></i><i></i></div></div>`;

const cards = projects.map(project=>`<article class="project-card">${visual(project)}<div class="card-body"><p class="eyebrow">${project.type}</p><h3>${link('/work/'+project.id+'/',project.title)}</h3><p>${project.summary}</p>${labels(project.stack)}<div class="card-links">${link('/work/'+project.id+'/','Case study ↗')}${project.repo ? link(project.repo,'Source ↗') : link(project.live,'Live project ↗')}</div></div></article>`).join('');
page('/','Home',descriptions,`
<section class="hero"><div class="hero-copy"><p class="eyebrow"><span class="signal"></span> AI ENGINEER · PAKISTAN</p><h1>Misbah<br>Ul Haque<span>.</span></h1><p class="hero-intro">${esc(headline.split(' | ')[1])}</p><div class="actions">${button('/work/','Explore my work ↗',true)}${button('/lab/','Open the AI Lab')}</div></div>
<div class="hero-art"><canvas id="neural-field" aria-hidden="true"></canvas><div class="orb-fallback"></div><div class="art-label"><span>Neural field</span><button id="field-toggle" type="button" aria-pressed="false">Pause motion</button></div></div></section>
<div class="focus-strip" aria-label="Engineering focus"><span>Data Science</span><span>Agentic AI</span><span>Business Intelligence</span></div>
<section class="section"><div class="section-head"><div><p class="eyebrow">PORTFOLIO</p><h2>Selected work</h2></div>${link('/work/','All case studies ↗')}</div><div class="grid two">${cards}</div></section>
<section class="section invitation"><div><p class="eyebrow">INTERACTIVE EXPERIMENTS</p><h2>See what changes when you move the inputs.</h2><p>Adjust a decision threshold, trace a research workflow, or explore a small neural network layer by layer.</p></div>${button('/lab/','Explore the lab ↗',true)}</section>
<section class="section bio"><img src="/portrait.webp" alt="Portrait of Misbah Ul Haque" width="480" height="560" loading="lazy"><div><p class="eyebrow">ABOUT</p><h2>I build tools for exploring data and understanding model outputs.</h2><p>I study Computer Science with an AI specialization at Sukkur IBA University. My projects cover applied classification, research discovery, and interfaces that explain their results.</p>${link('/about/','Experience and credentials ↗')}</div></section>
<section class="section invitation"><div><p class="eyebrow">ASK THE PORTFOLIO</p><h2>Looking for a specific detail?</h2><p>Ask about my work, experience, or technical focus and follow the sources behind the answer.</p></div>${button('/assistant/','Open assistant ↗')}</section>`);

page('/work/','Selected work','Public AI engineering projects, architecture, and source code.',`${title('Engineering case studies','Selected work','Explore the source, design decisions, and limitations behind each project.')}<div class="jump-nav" aria-label="Portfolio views">${button('/recruiters/','Recruiter overview')}${button('/lab/','Engineering lab')}${button('/notes/','Research notes')}</div><section class="section compact grid two">${cards}</section>`);
for (const project of projects) {
  const demo = project.id === 'cognisight' ? '/lab/#threshold' : '/lab/#workflow';
  const videoFile = project.id + '.mp4';
  const available = await readFile(new URL('../public/'+videoFile,import.meta.url)).then(()=>true,()=>false);
  page('/work/'+project.id+'/',project.title,project.summary,`<div class="narrow">${breadcrumb('/work/','All work')}${title(project.type,project.title,project.summary)}
  ${labels(project.stack)}<div class="actions">${project.repo ? button(project.repo,'Open GitHub ↗',true) + button(demo,'Try related lab experiment') : button(project.live,'Open live project ↗',true)}</div>
  ${diagram(project.flow,'System architecture')}
  <div class="prose"><h2>Problem</h2><p>${project.problem}</p><h2>Methodology</h2><p>${project.method}</p><h2>Evidence and results</h2><p>${project.result}</p><h2>Design trade-offs</h2><p>${project.tradeoff}</p>
  ${project.links.length ? `<h2>Browse the source</h2><ul>${project.links.map(([label,path])=>`<li>${link(project.repo+'/'+path,label+' ↗')}</li>`).join('')}</ul>` : ''}</div>
  ${available ? `<section class="prose"><h2>Recorded walkthrough</h2><p>${project.videoScope}</p><video controls playsinline preload="metadata" src="/${videoFile}" aria-label="${project.title} walkthrough"></video><details><summary>Transcript</summary><p>${project.transcript}</p></details></section>` : ''}</div>`);
}

page('/about/','About','Education, past internship experience, engineering skills, and LinkedIn-listed credentials.',`
${title('Professional profile','About Misbah','I build tools for exploring data, finding relevant research, and understanding what a model predicts.')}
<section class="section compact bio"><img src="/portrait.webp" width="480" height="560" alt="Portrait of Misbah Ul Haque"><div><h2>Engineering approach</h2><p>Start with a question and a data contract. Establish a simple baseline, make the model output inspectable, and document the conditions under which the result holds.</p><p>${education}</p>${link(linkedin,'View LinkedIn profile ↗')}</div></section>
<section class="section"><h2>Experience</h2><ol class="timeline">${experience.map(([role,org,dates,copy])=>`<li><p class="eyebrow">${dates}</p><h3>${role}</h3><p class="org">${org}</p><p>${copy}</p></li>`).join('')}</ol></section>
<section class="section"><h2>Technical skills in the source</h2><div class="grid two">${projects.map(project=>`<article class="panel"><h3>${project.type}</h3>${labels(project.stack)}${link('/work/'+project.id+'/','Project evidence ↗')}</article>`).join('')}</div></section>
<section class="section"><div class="section-head"><div><h2>Selected credentials</h2><p>Titles, issuers, and dates listed on LinkedIn.</p></div>${link(linkedin+'details/certifications/','All LinkedIn credentials ↗')}</div><ul class="credentials">${credentials.map(([credential,issuer,date])=>`<li><strong>${credential}</strong><span>${issuer} · ${date}</span></li>`).join('')}</ul></section>`);

page('/recruiters/','Recruiter view','A quick overview of Misbah Ul Haque’s background, public work, and professional contact.',`<div class="narrow">${title('Recruiter view',name,esc(headline))}
<div class="actions">${button(linkedin,'Contact on LinkedIn ↗',true)}<a href="/misbah-ul-haque-cv.pdf" download class="button">Download CV</a><a href="/selected-work.pdf" download class="button">Download selected work PDF</a>${button(github,'GitHub ↗')}</div>
<div class="prose"><h2>At a glance</h2><p>${education}. Based in Pakistan.</p><p>Previous ML Engineering Intern at FlyRank AI, Jun–Sep 2026, fully remote.</p><h2>What to review</h2><ul>${projects.map(project=>`<li>${link('/work/'+project.id+'/',project.title)} · ${project.summary}</li>`).join('')}</ul><h2>Technical focus</h2><p>Applied ML, information retrieval, agentic workflows, and business intelligence.</p></div></div>`);

page('/notes/','Engineering notes','Technical notes on model evaluation and research discovery.',`${title('Technical writing','Engineering notes','Practical notes on evaluating models and building discovery systems.')}<div class="section compact grid two">${notes.map(note=>`<article class="panel"><p class="eyebrow">${note.type}</p><h2>${link('/notes/'+note.id+'/',note.title)}</h2><p>${note.text.split('. ')[0]}.</p></article>`).join('')}</div>`);
for (const note of notes) page('/notes/'+note.id+'/',note.title,note.text.split('. ')[0]+'.',`<div class="narrow">${breadcrumb('/notes/','All notes')}${title(note.type,note.title,'')}${'<div class="prose"><p>'+note.text+'</p></div>'}${button('/lab/','Explore related techniques ↗')}</div>`);

page('/assistant/','Portfolio assistant','Search sourced information about Misbah Ul Haque and his public projects.',`<div class="narrow">${title('Source-grounded assistant','Ask the portfolio','Answers draw from a small collection of portfolio and LinkedIn records. Each response includes its sources.')}
<section class="panel assistant"><form id="assistant"><label for="question">Your question</label><div class="input-row"><input id="question" maxlength="250" type="search" required placeholder="What did Misbah build with Python?"><button class="button primary" type="submit">Ask</button></div></form>
<div class="prompt-row"><button data-question="What projects has Misbah built?">Projects</button><button data-question="What was Misbah’s FlyRank internship?">Experience</button><button data-question="What is his education?">Education</button></div><div id="answer" aria-live="polite"></div></section></div>`);

page('/lab/','AI Lab','Interactive model evaluation, explainability, research workflow, and business intelligence demonstrations.',`
${title('Interactive experiments','AI Lab','Change an input and see its effect on a prediction, research workflow, or business metric. The examples use synthetic data and public technical notes.')}
<div class="jump-nav" aria-label="Lab experiments">${[['threshold','Threshold explorer'],['network','Neural network'],['workflow','Research workflow'],['bi','Business intelligence']].map(([id,label])=>link('#'+id,label,'button')).join('')}</div>
<div class="section compact lab-grid">
<section class="panel experiment" id="threshold"><p class="eyebrow">MACHINE LEARNING · EXPLAINABILITY</p><h2>Threshold explorer</h2><p>Move the classification threshold to see the trade-off between precision and recall on 16 labeled examples.</p><label for="threshold-value">Decision threshold <output id="threshold-out" for="threshold-value">0.50</output></label><input id="threshold-value" type="range" min="0" max="100" value="50"><div id="threshold-results" class="metric-grid" aria-live="polite"></div><details><summary>Dataset and calculation</summary><p>Each synthetic row contains a prediction score and a binary label. The decision is positive when score ≥ threshold. Precision divides true positives by predicted positives. Recall divides them by actual positives.</p><p>${link('/threshold-data.csv','Download the labeled dataset')}${' · '}${link('/threshold-evaluation.ipynb','Download the reproducible notebook')}</p></details></section>
<section class="panel experiment" id="network"><p class="eyebrow">DEEP LEARNING</p><h2>Neural network explorer</h2><p>Trace two inputs through a fixed, untrained network and inspect the output activation.</p><label for="node-a">Input A <output id="a-out" for="node-a">0.60</output></label><input id="node-a" type="range" min="0" max="100" value="60"><label for="node-b">Input B <output id="b-out" for="node-b">0.35</output></label><input id="node-b" type="range" min="0" max="100" value="35"><div id="network-results" class="metric-grid" aria-live="polite"></div><h3>What changes the output?</h3><p>Compare the current activation with each input independently set to zero. The difference shows that input’s effect for this specific baseline.</p><div id="network-effects" class="metric-grid" aria-live="polite"></div><details><summary>Weights and activations</summary><p>Hidden 1 = ReLU(0.8A − 0.4B + 0.1). Hidden 2 = ReLU(0.9B − 0.2A). The output applies a sigmoid to 1.4 × Hidden 1 − 0.6 × Hidden 2 − 0.2.</p></details></section>
<section class="panel experiment" id="workflow"><p class="eyebrow">AGENTIC WORKFLOW</p><h2>Research workflow</h2><p>Choose a task and inspect the plan, the local source lookup, and the evidence check.</p><form id="agent"><label for="objective">Research task</label><select id="objective"><option value="cognisight model classification">Inspect a classifier</option><option value="research paper recommendations">Review a recommender</option><option value="flyrank internship experience">Check internship history</option><option value="qzxv">Test a missing source</option></select><button class="button primary" type="submit">Run workflow</button></form><ol id="agent-results" aria-live="polite"></ol><p class="fine-print">Runs a deterministic workflow against a local index.</p></section>
<section class="panel experiment" id="bi"><p class="eyebrow">BUSINESS INTELLIGENCE</p><h2>Revenue and margin</h2><p>Filter a synthetic quarterly dataset to see how segment mix changes revenue and margin.</p><label for="segment">Sales segment</label><select id="segment"><option>All</option><option>Direct</option><option>Partner</option></select><div id="bi-results" class="metric-grid" aria-live="polite"></div><div id="bi-bars"></div><details><summary>Dataset and calculation</summary><p>Six illustrative monthly rows. Margin equals (revenue − cost) / revenue. The dashboard calculations run locally in the browser.</p></details></section>
</div>`);
page('/404.html','Page not found','This portfolio page could not be found.',`${title('404','Page not found','Use the navigation or return to the portfolio homepage.')}<div class="section compact">${button('/','Back home',true)}</div>`);

await rm(target,{recursive:true,force:true});
await mkdir(target,{recursive:true});
await cp(new URL('../public/',import.meta.url),target,{recursive:true});
for (const name of ['app.js','logic.js','content.js','style.css']) await cp(new URL('../src/'+name,import.meta.url),new URL(name,target));
for (const [path,html] of pages) {
  const leaf = path === '/404.html' ? '404.html' : path.slice(1)+'index.html';
  const file = new URL(leaf,target);
  await mkdir(new URL('.',file),{recursive:true});
  await writeFile(file,html);
}
await writeFile(new URL('sitemap.xml',target), '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+[...pages.keys()].filter(path=>path!=='/404.html').map(path=>'<url><loc>'+esc(origin+path)+'</loc></url>').join('')+'</urlset>');
await writeFile(new URL('robots.txt',target),'User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n');
console.log('Built '+pages.size+' pages.');
