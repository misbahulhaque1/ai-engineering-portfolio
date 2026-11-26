import test from 'node:test';
import assert from 'node:assert/strict';
import {evaluate,activate,report,retrieve} from '../src/logic.js';

test('retrieves project, education, and internship evidence and declines unknown queries',()=>{
  assert.equal(retrieve('What did Misbah build with Python?')[0].title,'CogniSight source');
  assert.equal(retrieve('FlyRank internship')[0].title,'LinkedIn experience');
  assert.equal(retrieve('Which university?')[0].title,'LinkedIn education');
  assert.deepEqual(retrieve('xylophone rental prices'),[]);
});

test('threshold metrics use labeled observations with defined zero-denominator behavior',()=>{
  assert.deepEqual(evaluate(.5),{tp:6,fp:3,tn:5,fn:2,precision:2/3,recall:.75});
  assert.equal(evaluate(1).precision,null);
  assert.equal(evaluate(0).recall,1);
  assert.equal(evaluate(.5,[]).recall,null);
});

test('neural outputs reflect ReLU and sigmoid computations',()=>{
  const {hidden,output}=activate(0,0);
  assert.deepEqual(hidden,[.1,0]);
  assert.ok(output<.5 && output>.48);
  assert.ok(activate(1,0).output>activate(0,1).output);
});

test('business totals and margins follow the selected segment',()=>{
  const all=report('All'), direct=report('Direct'), partner=report('Partner');
  assert.equal(all.revenue,direct.revenue+partner.revenue);
  assert.equal(all.cost,direct.cost+partner.cost);
  assert.equal(direct.rows.length,3);
  assert.equal(partner.margin,(30900-21600)/30900);
});
