import {sources} from './content.js';

const tokenize = (value) => value.toLowerCase().match(/[a-z0-9+]+/g) ?? [];
const ignored = new Set(['a','an','any','do','does','what','is','the','my','me','can','you','he','his','tell','about','i','to','of','for','where','did','from','how','in','are','and','who','which','has']);
export function retrieve(query, documents = sources, limit = 2) {
  const tokens = [...new Set(tokenize(query).filter(word => !ignored.has(word)))];
  return documents.map(document => {
    const words = new Set(tokenize(document.terms));
    return {document, score: tokens.filter(token => words.has(token) || words.has(token.replace(/s$/, ''))).length};
  }).filter(item => item.score > 0).sort((a,b) => b.score - a.score).slice(0,limit).map(item => item.document);
}

export const observations = [
  [.96,1],[.91,1],[.88,0],[.82,1],[.76,1],[.71,0],[.65,1],[.59,0],
  [.53,1],[.48,0],[.42,1],[.36,0],[.29,0],[.21,1],[.14,0],[.07,0]
];

export function evaluate(threshold, rows = observations) {
  const counts = {tp:0, fp:0, tn:0, fn:0};
  for (const [score,label] of rows) {
    counts[score >= threshold ? (label ? 'tp' : 'fp') : (label ? 'fn' : 'tn')]++;
  }
  const {tp,fp,fn} = counts;
  return {...counts, precision: tp + fp ? tp / (tp + fp) : null, recall: tp + fn ? tp / (tp + fn) : null};
}

const periods = [
  {month:'January',segment:'Direct',revenue:12400,cost:8200},
  {month:'February',segment:'Direct',revenue:14800,cost:8600},
  {month:'March',segment:'Direct',revenue:17300,cost:9800},
  {month:'January',segment:'Partner',revenue:8700,cost:6400},
  {month:'February',segment:'Partner',revenue:10500,cost:7300},
  {month:'March',segment:'Partner',revenue:11700,cost:7900}
];

export function report(segment) {
  const rows = periods.filter(row => segment === 'All' || row.segment === segment);
  const revenue = rows.reduce((total,row) => total + row.revenue,0);
  const cost = rows.reduce((total,row) => total + row.cost,0);
  return {rows,revenue,cost,margin:revenue ? (revenue - cost) / revenue : 0};
}

export function activate(a,b) {
  const hidden = [Math.max(0,a * .8 - b * .4 + .1), Math.max(0,b * .9 - a * .2)];
  const logit = hidden[0] * 1.4 - hidden[1] * .6 - .2;
  return {hidden, output: 1 / (1 + Math.exp(-logit))};
}
