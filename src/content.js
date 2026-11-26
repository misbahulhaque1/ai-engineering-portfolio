export const name = 'Misbah Ul Haque';
export const headline = 'AI Engineer | Developing Intelligent Systems at the Intersection of Data Science, Agentic AI & Business Intelligence';
export const github = 'https://github.com/misbahulhaque1';
export const linkedin = 'https://www.linkedin.com/in/misbahulhaque001/';
export const education = 'BS Computer Science, AI specialization · Sukkur IBA University · 2024–Present';
export const experience = [
  ['ML Engineering Intern', 'FlyRank AI', 'Jun–Sep 2026 · Remote', 'Worked through applied machine learning workflows for search ranking and discoverability.'],
  ['Project Manager', 'Sukkur IBA University', 'Apr–Dec 2025 · Part-time', 'Project management role listed on LinkedIn.'],
  ['C++ Developer', 'Self-employed', 'Dec 2024–Present', 'Built console applications for student record management and ATM simulation using core data structures.']
];

export const projects = [
  {
    id:'cognisight', title:'CogniSight', type:'Applied machine learning',
    videoScope:'The recording runs the bundled classifier on the sample profile. The local recording copy moves the demo loader before the button that calls it.',
    transcript:'Open the Streamlit dashboard and load the built-in profile. The report shows the model’s predicted class and winning-class probability, followed by cognitive assessment context. The validation page shows the classifier’s feature contract. This is a single inference example.',
    summary:'An interactive student-performance explorer with a random forest classifier and class probabilities.',
    repo: github + '/CogniSight-Streamlit-Student-Performance-Analyzer',
    stack:['Python','Streamlit','scikit-learn','Plotly'],
    flow:['Profile and assessments','Feature schema','Random forest inference','Probability display'],
    problem:'Make a tabular classifier easier to inspect by putting both its inputs and class probabilities in an interactive interface.',
    method:'The Streamlit app captures profile and assessment inputs, builds a 13-feature row, validates the feature order against the serialized classifier, then displays the predicted High, Medium or Low class and the probability distribution.',
    result:'The bundled model contains 200 trees and accepts 13 features. The built-in sample returned High at 76.66%, Medium at 22.60%, and Low at 0.74%. These are probabilities for one example. A held-out metric would require training data, the split definition, and evaluation artifacts.',
    tradeoff:'The interface shows model confidence as well as the predicted class. Using it for educational decisions would require calibration, fairness analysis, and independent validation.',
    links:[['Application source','blob/main/app.py'],['Inference utilities','blob/main/utils.py'],['Run instructions','blob/main/README.md']]
  },
  {
    id:'research-hub', title:'AI Research Paper Hub', type:'Information retrieval',
    videoScope:'The React and Express app ran locally with seeded SQLite and Redis. The recording copy routes an unavailable Elasticsearch service to the existing SQL fallback.',
    transcript:'Enter a search query. Two illustrative papers match. Open the first paper, read its abstract, and save it. Open the saved list and check that the bookmark appears. Open Recommendations to see the related record.',
    summary:'A research discovery application for searching papers, saving reading lists, and finding related work.',
    repo: github + '/AI-RESEARCH-PAPER-HUB',
    stack:['React','Express','MySQL','OpenAlex','Redis'],
    flow:['OpenAlex metadata','Import and deduplicate','Search and saved papers','Keyword recommendations'],
    problem:'Reduce the friction of moving from a paper search to a shortlist and a related set of papers.',
    method:'An import script maps OpenAlex metadata into the paper catalog and skips existing titles. React calls Express routes for search and saved papers. The recommendation service counts keywords in saved papers, filters a recent candidate pool for overlap, and caches results in Redis.',
    result:'A local run returned two seeded papers for the search query. The original HTTP handlers then saved one paper and returned a recommendation with an overlapping keyword. Production search quality and summary accuracy were outside this test.',
    tradeoff:'Keyword overlap is easy to inspect, while candidate recency and exact keyword matching constrain recall. AI-assisted summaries require a configured provider.',
    links:[['Quick start','blob/main/rpp_fixed/QUICKSTART.md'],['OpenAlex importer','blob/main/rpp_fixed/backend/src/scripts/importOpenAlex.js'],['Recommendation service','blob/main/rpp_fixed/backend/src/services/recommendationService.js'],['HTTP routes','tree/main/rpp_fixed/backend/src/routes']]
  },
  {
    id:'mathverse', title:'MathVerse AI', type:'Interactive math tooling',
    summary:'A public math workspace with symbolic arithmetic and linear equation solving.',
    live:'https://mathverseai.vercel.app/',
    stack:['Symbolic calculation','Interactive visualization'],
    flow:['Enter an expression','Symbolic solver','Calculated answer','Analytical steps'],
    problem:'Give learners a short path from entering a supported expression to checking the result and its working.',
    method:'The public workspace accepts an expression or a linear equation, runs the solve action, and offers an analytical steps panel. This description is based on observed behavior in the deployed app.',
    result:'The public deployment returned 20 for (2 + 3) × 4 and x = 4 for 2x + 3 = 11. Those two observed outputs can be checked manually.',
    tradeoff:'The walkthrough covers the supported symbolic path. The AI tutor, claimed benchmark figures, and source implementation require separate evidence.',
    videoScope:'Captured from the live MathVerse AI deployment.',
    transcript:'Enter (2 + 3) × 4 and run the symbolic solver. The workspace displays 20. Next enter 2x + 3 = 11. The solver displays x = 4 and offers analytical steps.',
    links:[]
  }
];

export const credentials = [
  ['Speed Up Data Analysis and Presentation Building','Google','Dec 2025'],
  ['Design Prompts for Everyday Work Tasks','Google','Dec 2025'],
  ['Start Writing Prompts like a Pro','Google','Dec 2025'],
  ['Use AI as a Creative or Expert Partner','Google','Dec 2025'],
  ['Foundations of User Experience (UX) Design','Google','Dec 2025'],
  ['Foundations of Project Management','Google','Dec 2025'],
  ['Foundations of Cybersecurity','Google','Dec 2025'],
  ['Accelerate Your Job Search with AI','Google','Dec 2025'],
  ['Work Smarter with Microsoft Excel','Microsoft','Jul 2025'],
  ['Build a Full Website using WordPress','Coursera','Aug 2025']
];

export const notes = [
  {id:'reading-probabilities', title:'Reading a model’s probabilities', type:'Model evaluation', text:'A classifier can assign 80% to one class and still be wrong. Calibration asks whether cases assigned a probability near 80% actually occur about 80% of the time. To check it, evaluate on a held-out split, group predictions into bins, and compare confidence with observed frequency. For a multiclass model, check whether each class behaves similarly. The threshold lab lets you see how the decision rule changes precision and recall on a small synthetic dataset.'},
  {id:'paper-discovery', title:'From a reading list to related papers', type:'Information retrieval',
    videoScope:'The React and Express app ran locally with seeded SQLite and Redis. The recording copy routes an unavailable Elasticsearch service to the existing SQL fallback.',
    transcript:'Enter a search query. Two illustrative papers match. Open the first paper, read its abstract, and save it. Open the saved list and check that the bookmark appears. Open Recommendations to see the related record.', text:'Start from the papers the reader saved. Count their keywords, choose the most frequent, and find candidate papers that share at least one. Exclude already-saved papers and keep the reason visible. An evaluation can compare keyword overlap with an embedding-based baseline using judged queries and recall at a fixed cutoff. Use a recent-paper fallback when there is no reading history.'}
];

export const sources = [
  {title:'CogniSight source', href:'/work/cognisight/', terms:'cognisight ml machine learning model random forest project student probability python streamlit evaluation', text:projects[0].summary + ' The case study documents the 13-feature inference path and its evidence limits.'},
  {title:'Research Hub source',href:'/work/research-hub/',terms:'research paper hub project search recommendations react openalex summary retrieval',text:projects[1].summary},
  {title:'MathVerse AI live case study',href:'/work/mathverse/',terms:'mathverse arithmetic algebra equation solver math project live',text:'The public MathVerse AI solver returned 20 for (2 + 3) × 4 and x = 4 for 2x + 3 = 11 in two manually checked examples.'},
  {title:'LinkedIn experience',href:linkedin,terms:'experience intern internship flyrank employment background hire manager remote c++ job',text:'Misbah was an ML Engineering Intern at FlyRank AI from June to September 2026, working remotely on applied search intelligence.'},
  {title:'LinkedIn education',href:linkedin,terms:'education university degree sukkur iba student school study',text:education + '.'},
  {title:'LinkedIn credentials',href:linkedin+'details/certifications/',terms:'certificate certification credentials google microsoft coursera learning',text:'Selected LinkedIn-listed credentials include Google’s Speed Up Data Analysis and Presentation Building and Microsoft’s Work Smarter with Microsoft Excel.'},
  {title:'Interactive lab',href:'/lab/',terms:'agent agentic explainable xai lab experiment data dashboard intelligence business bi demo',text:'The interactive lab contains a threshold explorer, a local research workflow, a neural-network explorer, and a synthetic business dashboard.'},
  {title:'Professional contact',href:linkedin,terms:'contact linkedin connect hiring collaboration email recruiter available hiring',text:'Connect with Misbah through LinkedIn for opportunities and collaborations.'}
];
