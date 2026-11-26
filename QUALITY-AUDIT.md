# AI engineering portfolio quality audit

26 November 2026 · Pakistan

## Scope and evidence

The original enumerated list of 46 items could not be recovered from the previous conversation. The table below reconstructs the coverage from the available brief and retained feature list. It distinguishes working features, limited implementations, and items that need evidence or access. The portfolio uses a dependency-free static build with client-side demos and no hosted credentials.

### Implementation coverage

| # | Feature | Status and evidence |
|---|---|---|
| 1 | Cinematic animated hero | Canvas 3D projection, orbital motion, pause control |
| 2 | Interactive neural field | Pointer-controlled tilt and motion toggle |
| 3 | Typography | System sans and monospace type scale with layout-specific hierarchy |
| 4 | Dark and light themes | System preference and persistent manual override |
| 5 | Page transitions | Smooth in-page navigation and card transitions. Cross-page animation remains open. |
| 6 | Project previews | Custom graphics, source links, case studies, and recorded walkthroughs |
| 7 | Responsive layout | Chromium checks at 320, 390, and 1440 px |
| 8 | Micro-interactions | Focus states, hover motion, live controls, and reduced motion |
| 9 | Professional photograph | Optimized portrait from the previously prepared headshot |
| 10 | Professional headline | User-supplied headline |
| 11 | Engineering approach | About page, with linked project evidence |
| 12 | Experience timeline | LinkedIn records including FlyRank AI, Jun–Sep 2026 |
| 13 | Education | LinkedIn-listed BS Computer Science with AI specialization |
| 14 | Certifications | Ten LinkedIn-listed entries. Independent issuer verification remains open. |
| 15 | Downloadable CV | One-page CV from reviewed profile and project evidence |
| 16 | LinkedIn integration | Profile, credentials, and contact links |
| 17 | Contact and collaboration | Recruiter view and LinkedIn contact |
| 18 | Featured projects | CogniSight, AI Research Paper Hub, and MathVerse AI |
| 19 | Engineering case studies | Problem, methodology, evidence, and trade-offs for all three |
| 20 | Architecture diagrams | Ordered component flow for each case study |
| 21 | Technology stack | Stack chips and evidence links for source-reviewed projects |
| 22 | Source links | Verified public repositories for CogniSight and Research Hub. MathVerse has a verified live link. |
| 23 | Live project demonstrations | Public MathVerse deployment and interactive portfolio labs. Original local apps demonstrated by video. |
| 24 | API documentation | Research Hub endpoints and quick start link to the original repo. |
| 25 | Development methodology | Project methodology and engineering notes |
| 26 | ML playground | Decision threshold, confusion counts, precision and recall |
| 27 | Deep learning architecture explorer | Two-input, two-ReLU network with output activation |
| 28 | Agentic AI demo | Deterministic plan, lookup and evidence check with a missing-source path |
| 29 | Portfolio assistant | Local retrieval with linked excerpts and missing-evidence handling. A generative RAG backend remains open. |
| 30 | Explainable AI explorer | Shows network output differences when each input is independently set to zero |
| 31 | Research publications | Technical notes only. No authored publication was verified. |
| 32 | Dataset documentation | Synthetic data provenance and threshold and BI formula definitions |
| 33 | Model evaluation dashboard | Interactive precision, recall and confusion counts on labeled synthetic rows |
| 34 | Business intelligence and Power BI | Browser-based synthetic revenue and margin dashboard. A verified Power BI report remains open. |
| 35 | Reproducible notebook | Python notebook and CSV for threshold evaluation |
| 36 | Universal command palette | Ctrl/Cmd+K, text filtering, keyboard focus and Escape |
| 37 | Recruiter quick view | Background, portfolio links, downloadable CV and direct contact |
| 38 | Engineering and research views | Dedicated lab and technical notes routes |
| 39 | Technical blog | Two original technical notes |
| 40 | SEO and social previews | Per-page titles, canonicals, Open Graph image, sitemap, robots.txt |
| 41 | Accessibility and keyboard | Semantic markup, reduced motion, keyboard navigation and automated WCAG scanning |
| 42 | Security | No front-end secrets, policy headers, fixed source index, and text-node rendering |
| 43 | Performance | No runtime dependencies, optimized portrait, viewport-aware animation and lazy media |
| 44 | Automated testing | Node unit tests, Playwright Chromium checks and optional axe scans |
| 45 | Dedicated source repository | [GitHub](https://github.com/misbahulhaque1/ai-engineering-portfolio) |
| 46 | Vercel hosting | [Production](https://misbah-ai-engineering.vercel.app/) |

### Repository audit

| Repository | What the review established |
|---|---|
| CogniSight | Reviewed Streamlit inference, model loading, bundled artifact, README and Dockerfile. README and loaded artifact agreed on 13 features. GitHub description advertises 19 and should be brought into alignment. The demo button references a function before Python defines it. The recording used a local ordering fix. |
| AI Research Paper Hub | Reviewed React and Express manifests, route layout, OpenAlex ingestion, search fallback and recommendations. Elasticsearch failures returned an empty result before the SQL fallback could run. The local recording copy surfaced that failure to the original controller and used SQLite plus Redis for the demo. Dependency installation flagged the older Multer series. |
| Internship-Assignment and Internship-Assignment-ai | Reviewed both READMEs and root trees. They share FlyRank starter material. Template metrics and proprietary data were not used as portfolio evidence. |
| National-mock-testing-service | Reviewed the root layout and setup documentation. It contains a TypeScript app and Drizzle migrations, with a Gemini key required for the documented AI setup. |
| National-Mock-Test-Service and xyz | GitHub reported both repositories were empty. |
| Smart-Academy-DSA-Project- | GitHub returned no root entries in the contents response and the root README request returned 404. Runtime and implementation remain unverified. |
| langchain | Public upstream-style repository layout. No original project claim was made from the repository listing. |
| enterprise-ai-knowledge-platform | Root contained README, license and ignore file. The README describes planned infrastructure. |
| misbahulhaque1 | Reviewed the public profile README and cross-checked its listed engineering claims against the two featured repositories and the public MathVerse deployment. |

### Project run evidence

- **CogniSight, 67 seconds.** Original serialized scikit-learn 1.6.1 random forest, 200 trees and 13 features. Built-in sample produced High 76.66%, Medium 22.60%, and Low 0.74%. These are single-profile probabilities.
- **AI Research Paper Hub, 68 seconds.** The original search, save, list and recommendation handlers returned HTTP 200, 201, 200 and 200 respectively with seeded data. SQLite replaced MySQL for this isolated run. The run used the existing SQL search fallback and Redis. MongoDB history, Elasticsearch search, and provider-generated summaries remain unverified.
- **MathVerse AI, 65 seconds.** The public application returned 20 for `(2 + 3) × 4` and x = 4 for `2x + 3 = 11`. The video uses screen captures from the public run. A public source repository and independent tutor evaluation were unavailable.
- Videos have on-screen narration with text transcripts on the case-study pages.

### Design references

- Hamish Williams uses project-led storytelling with a strong visual opening. [Portfolio](https://hamishw.com/)
- Bruno Simon makes the main interaction part of the identity. [Portfolio](https://bruno-simon.com/)
- Brittany Chiang exposes experience and project evidence through easily scanned sections. [Portfolio](https://brittanychiang.com/)
- Rauno Freiberg emphasizes small, carefully designed interactions. [Portfolio](https://rauno.me/)
- Amelia Wattenberger ties technical writing to exploratory interfaces. [Portfolio and notes](https://wattenberger.com/)
