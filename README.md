# Illinois Engineering Jobs

A hand-kept job board for Illinois engineers, built and maintained by Mohammed Shajiuddin Khan in Chicago.

Live site: https://mshajik97.github.io/illinois-engineering-jobs/
Repository: https://github.com/mshajik97/illinois-engineering-jobs

Tagline: A hand-kept job board for Illinois

## What this is

- Current open roles at firms working on IDOT and Illinois Tollway projects, plus other Illinois engineering firms added in the comprehensive pass.
- 800 open jobs and 195 firms at the last full rebuild on Nov 11, 2026.
- Each listing shows firm, job title, location, IDOT district, discipline, work setting, experience needed, license needed, pay when posted, date posted, and a direct link to apply on the firm site when an exact posting link exists.
- Roles with no exact official link are kept as leads and read "No official link found" until an exact link, or a labelled Indeed or LinkedIn fallback, is verified.
- The board is view only. There is no download or export of the full board. Please share the link, not copies, so people always see the current version.

## How the data stays current

- Firms are checked in 10 groups, about 10 percent of jobs per run, one group every 4 days. A full cycle is about 40 days.
- After every worksheet run: rebuild the shared spreadsheet copy, regenerate data.json, refresh the web app, and publish data.json to GitHub Pages (gh-pages first, then main).
- Top 20 new roles sweep and the whole sheet duplicate check run only on Group 1 and Group 6 runs.
- Quarterly check for new IDOT PTBs and Tollway PSBs. Watermarks at launch: PTB 221 and PSB 26-2. First quarterly check about Feb 6, 2027.
- Lead phase out: in each group run, that group's leads get one fresh exact link attempt, then an Indeed or LinkedIn fallback check. Still linkless leads are flagged in the master and removed from the shared copy and the web app for that cycle, and rechecked in later cycles.
- Link rule: every Apply link must be the exact posting link for that job, never a general careers page, board home, or search page.

## Site structure

- Home: landing view, welcome and tagline, live counts, Browse the jobs, entry tiles, and Popular quick starts that open Jobs with a filter already applied. Clicking the site name goes Home from anywhere.
- Jobs: search, filters, sort, job cards, Saved, back navigation, and Top and Bottom jump buttons.
- Companies: one row per firm, size, districts active in, projects won, and open roles now.
- How It Works: plain visitor guide, four steps, badge glossary, why this exists, and LinkedIn and WhatsApp contact for broken links.
- About: Mohammed's portfolio, timeline, selected projects, credentials, and resume downloads.

## Change log

All dates are Nov 11, 2026 unless noted. Live means pushed to GitHub Pages (gh-pages, then main). Pending means built locally and not pushed until Mohammed approves it.

### Launch and hosting, live

- Built the board, 800 jobs and 195 companies, light theme: warm paper background, dark ink text, deep green accent, thin bordered cards.
- Renamed the app from Illinois Transportation Engineering Jobs to Illinois Engineering Jobs, because the board covers more than transportation.
- Chose GitHub Pages over Netlify. Repository created by Mohammed (public, mshajik97/illinois-engineering-jobs). Pages publishes from the gh-pages branch.
- First push: index.html, data.json, and assets/data.json to main, then gh-pages created from the same commit.
- Page loads data from a sibling data.json first, then assets/data.json as fallback, so a data refresh does not need a full rebuild.

### PWA and install, live

- Added manifest.webmanifest, service worker, theme color, and apple touch icon so the site can be installed.
- Install icons are Mohammed's own Edifi.ce mark, trimmed and centered, icon-192.png and icon-512.png, uploaded to both branches.
- Fixed a stale page problem: cache renamed to iej-shell-v2, page and data requests are network first with cache fallback only when offline.

### Branding and logo, live

- First attempt pasted the logo image into the page. Mohammed rejected it: integrate it, recolor it to the site theme, do not just paste the supplied image.
- Three logo drafts were made and shown first. Mohammed chose Draft 2, with conditions: not a baked logo image, build it from native website elements that move and resize with the page, keep the tagline he liked, and make "Illinois Engineering Jobs" one uniform color and treatment.
- Draft 2 native lockup shipped live: transparent green mark in the top bar and in the Home lockup, name in Poppins 800 in one uniform dark ink, tagline directly under it, stacks on narrow screens. Approved by Mohammed before pushing.

### Pages and content, live

- Home became the landing view. Menu order: Home, How It Works, Jobs, Companies, About.
- How It Works rebuilt as a visitor guide only. Internal process wording was removed.
- About keeps the full portfolio. LinkedIn photo is used for professional pages, not the older Instagram photo.
- Resume downloads fixed: the About buttons are plain links to the real files in the repository root, Mohammed_Khan_Resume.pdf and Mohammed_Khan_Resume_Locked.docx, instead of inlined downloads that phone browsers blocked. The Word file opens read only.
- Privacy rules kept: no home address, no email, no salary, no visa details, and no application details anywhere in the app. Contact is LinkedIn and WhatsApp only.
- Footer: Made by Mohammed Shajiuddin Khan in Chicago, data updated date, sources, and copyright asking people to share the link, not copies.

### Filters, scroll, and navigation, live

- Dropdown repair: at phone widths filter panels opened far below the button. Panel positioning fixed, mobile panel height capped, aria labels added. Mohammed confirmed it working.
- Scroll preservation: any click that re-renders Jobs or Saved (filters, sort, search, chips, clear, saving a job) keeps the scroll position instead of jumping to the top. Saved opens at the list, not the big masthead.
- Back navigation, draft filters, and jump buttons: in-app history stack with a visible Back button, browser back support, and a left edge swipe to go back. Every filter panel is draft then Apply: Apply commits, closes the panel, and records a back step. Tapping outside or Escape closes the panel and keeps the draft, with a pending badge on the filter button. Only Cancel discards the draft. Floating Top and Bottom pill in Jobs and Saved.
- Back navigation, draft filters, and jump buttons in this set shipped live first. The Location filter was later replaced by the single district tree described in the next section, which is now live.

### Location tree, transitions, and cleanup, live Nov 11, 2026

- Location consolidation v1, built, superseded: Area, District, and City replaced by one Location tree (Chicagoland and Rest of Illinois on top, districts indented under them, cities under districts), the two experience filters merged into one Experience filter, and the separate Firm dropdown removed. Mohammed did not approve this version.
- Panel repair plus flat city list, built, superseded: fixed opening a panel jumping to the jobs (focus scrolling), ticking rebuilding the whole list, and Apply not closing and landing on results. Location was replaced with a flat A to Z city list. Mohammed rejected the flat list.
- District tree Location, live Nov 11, 2026: one Location panel with districts in number order, cities indented under their district, A to Z, with counts. Ticking a district selects its whole subtree, partial picks show a dash. Draft then Apply, pending badge, chips, and Back history are unchanged.
- Location indexing correction, live Nov 11, 2026: a listing that names several places is split into separate individual entries, never one combined leaf, and the job is indexed under each place it mentions, so selecting Peoria (or any single city in a multi-location listing) returns that job. Places that belong to an IDOT district appear only under that district, even when the job's district field is blank. Chicagoland region phrases (Chicagoland, Greater Chicagoland, Chicagoland and surrounding regions) belong under District 1. The No district listed branch keeps only places that cannot be assigned to any Illinois district, such as out-of-state places and non-city descriptors, each separated out as its own individual entry. These location rules are written into the scheduled worksheet update job so future data refreshes preserve them and never regress to combined location strings or single place indexing.
- Chicagoland region fix, live Nov 11, 2026: the three Chicagoland wordings were still landing under No district listed as descriptor leaves. They are now region leaves under District 1 in their exact wording (Chicagoland 3 jobs, Greater Chicagoland 3, Chicagoland and surrounding regions 2), sorted in with District 1's cities A to Z. Ticking District 1 returns 666 jobs and includes all 8 jobs carrying a Chicagoland phrase (5 of them newly covered by District 1; the other 3 were already covered through Chicago or Lombard). Ticking any one region leaf returns exactly its jobs. Verified with the page's own location code against the real data: zero Chicagoland leaves remain under No district listed (now 45 jobs, 33 leaves, all out-of-state places or phrases belonging to no single district), Peoria still returns 33, no combined leaves, and zero jobs unreachable. Any future wording containing Chicagoland is routed to District 1 by rule, so refreshes cannot regress this. Other region phrases in the data were audited and none clearly belongs to one district, so none was moved: Northern Illinois and Northern Illinois - IDOT client site span Districts 1 to 3, Southern IL spans Districts 8 and 9, and Illinois and IDOT Service Areas throughout Illinois are statewide. One job (Greater Chicagoland / IDOT Service Areas throughout Illinois) correctly appears under both District 1 and No district listed, because it names one place in each.
- Smooth transitions, built then revised at Mohammed's feedback, live Nov 11, 2026: the first pass covered only a few things and felt too fast (view switching about 220 ms, panels about 180 ms). The revision is slower and universal: view changes 420 ms, filter panels and menu 360 ms open and 280 ms close, and every button, link, chip, tab, select, search field, filter row, and card eases over 300 ms with a soft press. Nothing blocks taps or breaks Back scroll restoration, and prefers-reduced-motion turns the animations off.
- Name cleanup, live Nov 11, 2026 with the same build: any tool or platform name was removed from the site files headed for this repository, including one code comment near the data loading code, and a case-insensitive search confirms zero mentions remain in index.html, sw.js, and manifest.webmanifest.
- Panel repair, live Nov 11, 2026 with the same build: opening a filter panel no longer scrolls the page to the jobs, ticking a choice changes only the draft, and Apply closes the panel and lands on the updated results.
- Pushed live on Nov 11, 2026 after Mohammed approved the preview build: district tree Location, split multi-location indexing, Chicagoland phrases under District 1, panel repair, slower universal transitions, and the name cleanup, all in one index.html push (gh-pages first, then main), with this README published in the same run.

### About text corrections, live Nov 11, 2026

- Removed an entry from the Credentials list on the About page that said Mohammed is a mentor in a mentorship program he only applied to. He is not a mentor in that program, so the entry came out completely and nothing replaced it. The program name now appears nowhere on the page.
- Rewrote the Why I built this board section on the About page in Mohammed's own approved words. The new text says the openings are spread across 195 company websites, that he put them together in one place and keeps the board updated, and that the board is for students, recent grads, and anyone searching for a role in Illinois civil engineering. The earlier wording that presented him as an experienced insider and gave advice as a mentor was removed at his instruction.

### Back end wording cleanup, live Nov 11, 2026

- Removed every piece of internal back end explanation from the visitor pages at Mohammed's instruction. Out went the filter matching explanation at the top of the filter card, the Sort by note explaining pay conversion and band matching, the district tree and matching rules inside How It Works Step 1, the verified link and lead count breakdown, the lead process wording on cards, the rolling recheck cycle lines, the underlying list and refresh wording, and the research spreadsheet phrase in the footer.
- Kept, at his instruction, the sources line in the footer and the checked dates on job cards. The Lead label and the No official link found text stay as plain labels with no process explanation behind them. No data, counts, links, or filtering behavior changed in this pass.

## Rules for future changes

- Show Mohammed a first draft or preview first. Do not publish, upload, or push anything live until he approves that exact version.
- When approved, push index.html changes to gh-pages first, then main. Data-only refreshes push data.json and assets/data.json only, in that same branch order, and never push index.html in a data refresh.
- Keep this README updated in the same run as any approved change: add a dated entry under Change log, move pending items to live once pushed, and note the commit hashes when they are known.
- Never add personal notes, salary, application status, or private instructions to the public site, the shared spreadsheet, or this README.
- No tool or platform names in the repository or on the public site, in visible text, code comments, or metadata. The board is presented as Mohammed's own work.

## Known open items

- Manhard Consulting Dayforce board was down during the Nov 11 check, so its 8 roles stay leads pending a retry in a later cycle.
- Ciorba Group board is broken and its careers page points to LinkedIn, so its 11 roles stay leads pending a LinkedIn fallback check.
- Spreadsheet category cleanup (same standardized categories inside the spreadsheet itself) is deferred to the week of Nov 16, 2026, at Mohammed's instruction.
