const root = document.getElementById('root');
const REGISTER_URL = 'https://events.vitap.ac.in/e/vtapp-events-d59c5d25-5690-4499-8cd3-3acb80b20c60';

const eventInfo = {
  date: '11 September 2026', time: '11:00 AM - 6:00 PM', venue: 'CB - G13',
  teamSize: 'Teams of 2 - 4', entryFee: 'INR 60', prizePool: 'INR 5,500',
  coordinator: 'Manas Vishwakarma', phone: '9430591299',
};

const tracks = [
  { id: 'all', label: 'All Tracks' }, { id: 'satellite', label: 'Space Debris' },
  { id: 'earth', label: 'Earth Observation' }, { id: 'telemetry', label: 'Telemetry Health' },
];

const problemStatements = [
  { id: 'PS-01', track: 'satellite', title: 'Collision Risk Prioritization', summary: 'Turn uncertain conjunction warnings into a clear, actionable queue for satellite operators.', link: 'pages/problem-statement-1.html' },
  { id: 'PS-02', track: 'earth', title: 'AgriPulse: Land Use Classification', summary: 'Use Sentinel-2 imagery to classify land use and make changing regions easier to understand.', link: 'pages/problem-statement-2.html' },
  { id: 'PS-03', track: 'telemetry', title: 'Satellite Health Under Watch', summary: 'Detect unusual telemetry patterns, assess risk, and surface early warnings of subsystem failure.', link: 'pages/problem-statement-3.html' },
];

const datasets = [
  ['Space Debris & Collision Warning', 'NASA', 'Near-Earth object and orbital data for impact-risk modelling.', '~140 MB', 'https://cneos.jpl.nasa.gov/'],
  ['Earth Observation & Climate Intelligence', 'ISRO', 'Multispectral imagery and land-use layers over India.', '~2 GB', 'https://bhuvan.nrsc.gov.in/'],
  ['Telemetry Anomaly Detector', 'ESA', 'Open spacecraft telemetry benchmarks for anomaly detection.', '~80 GB', 'https://www.kaggle.com/datasets/patrickfleith/nasa-anomaly-detection-dataset-smap-msl'],
];

function renderProblems(filter = 'all') {
  const items = filter === 'all' ? problemStatements : problemStatements.filter((item) => item.track === filter);
  return items.map((item) => `<a class="problem-card" href="${item.link}"><span class="font-mono problem-id">${item.id}</span><h3 class="font-orbitron">${item.title}</h3><p>${item.summary}</p><span class="font-mono problem-track">${item.track.toUpperCase()}</span><span class="font-mono problem-link">OPEN BRIEF &rarr;</span></a>`).join('');
}

function renderApp() {
  root.innerHTML = `
    <div class="app-shell">
      <canvas class="starfield" aria-hidden="true"></canvas><div class="grid-overlay"></div><div class="scanline"></div><div class="vignette"></div>
      <header class="site-header"><div class="container nav-bar">
        <a class="brand-lockup" href="#top" aria-label="Orbital Guard home"><span class="brand-mark">◉</span><span><strong class="font-orbitron">ORBITAL <em>GUARD</em></strong><small class="font-mono">SEDS AURORA x VIT-AP</small></span></a>
        <nav class="desktop-nav" aria-label="Main navigation">${[['about', 'ABOUT'], ['details', 'DETAILS'], ['problems', 'PROBLEMS'], ['datasets', 'DATASETS'], ['contact', 'CONTACT']].map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}<a class="btn-primary nav-register" href="${REGISTER_URL}" target="_blank" rel="noopener noreferrer">REGISTER</a></nav>
        <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu">MENU</button>
      </div><nav id="mobile-menu" class="mobile-menu" aria-label="Mobile navigation">${[['about', 'ABOUT'], ['details', 'DETAILS'], ['problems', 'PROBLEMS'], ['datasets', 'DATASETS'], ['contact', 'CONTACT']].map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}<a class="btn-primary" href="${REGISTER_URL}" target="_blank" rel="noopener noreferrer">REGISTER NOW</a></nav></header>
      <aside class="social-sidebar" aria-label="Social links"><a href="#contact" aria-label="Instagram">◎</a><a href="#contact" aria-label="LinkedIn">in</a><a href="#contact" aria-label="YouTube">▶</a><a href="#contact" aria-label="X">𝕏</a></aside>
      <main id="top">
        <section class="hero-section"><div class="container hero-grid"><div class="hero-copy-block"><div class="hero-tags"><span class="tag">HACKATHON</span><span class="tag tag-cyan">VTAPP-26 - VIT-AP UNIVERSITY</span><span class="tag tag-muted">SEDS AURORA x VIT-AP</span></div><h1 class="font-orbitron hero-wordmark">ORBITAL<br><span>GUARD</span></h1><div class="hero-kicker font-mono"><i></i> DECODE THE UNIVERSE</div><p class="hero-copy">Explore real NASA, ISRO and ESA space data. Solve challenges in satellite tracking, Earth observation and telemetry anomaly detection.</p><div class="hero-actions"><a class="btn-primary" href="${REGISTER_URL}" target="_blank" rel="noopener noreferrer">REGISTER NOW <span>&rarr;</span></a><a class="btn-ghost" href="#problems">VIEW PROBLEM STATEMENTS</a></div><div class="hero-facts"><div><span class="font-mono">PRIZE POOL</span><strong class="font-orbitron">${eventInfo.prizePool}</strong></div><div><span class="font-mono">TEAM SIZE</span><strong class="font-orbitron">2 - 4</strong></div><div><span class="font-mono">DURATION</span><strong class="font-orbitron">7 HRS</strong></div></div></div><div class="planet-scene"><canvas class="planet-canvas" aria-hidden="true"></canvas><span class="scene-badge badge-top font-mono">◉ TRACKING 8,243 OBJECTS</span><span class="scene-badge badge-bottom font-mono">⌬ SIGNAL: NOMINAL</span></div></div><div class="scroll-cue font-mono">SCROLL <i></i></div></section>
        <section id="about"><div class="container about-grid"><div><div class="section-subtitle">// ABOUT THIS EVENT</div><h2 class="section-title">About the Mission</h2><p class="about-copy">Orbital Guard is an electrifying space-tech hackathon where you use genuine data from NASA, ISRO and ESA to tackle pressing cosmic issues.</p><p class="about-copy">With AI, trace satellites, keep an eye on Earth, and uncover telemetry abnormalities to secure space assets. Build a solution that helps shape the future of space exploration.</p><div class="about-actions"><a class="btn-primary" href="#problems">VIEW PROBLEMS</a><a class="btn-ghost" href="#datasets">BROWSE DATASETS</a></div></div><div class="mission-grid">${[['◉', 'REAL SPACE DATA', 'Authentic NASA, ISRO and ESA mission datasets.'], ['⌬', 'TELEMETRY AI', 'Trace satellites and spot anomalies.'], ['◎', 'EARTH OBSERVATION', 'Harness imagery for real impact.'], ['◇', 'SPACE DEBRIS', 'Tackle the growing orbital debris problem.']].map(([icon, title, text]) => `<article class="mission-card"><span>${icon}</span><h3 class="font-orbitron">${title}</h3><p>${text}</p></article>`).join('')}</div></div></section>
        <section id="details"><div class="container"><div class="section-subtitle">// MISSION BRIEFING</div><h2 class="section-title">Event Details</h2><div class="details-grid">${[['TIME', eventInfo.time], ['VENUE', eventInfo.venue], ['TEAM SIZE', eventInfo.teamSize], ['ENTRY FEE', eventInfo.entryFee], ['PRIZE POOL', eventInfo.prizePool, 'highlight'], ['DATE', eventInfo.date]].map(([label, value, extra]) => `<div class="detail-card ${extra || ''}"><span class="font-mono detail-label">${label}</span><strong class="font-orbitron">${value}</strong></div>`).join('')}</div></div></section>
        <section id="problems"><div class="container"><div class="section-subtitle">// MISSION OBJECTIVES</div><h2 class="section-title">Problem Statements</h2><p class="section-intro">Choose your track, pick a challenge, and build something extraordinary.</p><div class="filter-row">${tracks.map((track, index) => `<button class="filter ${index === 0 ? 'active' : ''}" data-filter="${track.id}">${track.label}</button>`).join('')}</div><div class="problem-grid">${renderProblems()}</div></div></section>
        <section id="datasets"><div class="container"><div class="section-subtitle">// AUTHORISED FEEDS</div><h2 class="section-title">Curated Datasets</h2><p class="section-intro">A starter pack of public space datasets, curated by SEDS AURORA for the hackathon.</p><div class="dataset-grid">${datasets.map(([name, provider, description, size, link]) => `<a class="dataset-card" href="${link}" target="_blank" rel="noopener noreferrer"><div class="dataset-meta"><span class="font-mono">${provider}</span><span class="font-mono">${size}</span></div><h3 class="font-orbitron">${name}</h3><p>${description}</p><span class="dataset-open font-mono">OPEN SOURCE &rarr;</span></a>`).join('')}</div></div></section>
        <section><div class="container"><div class="section-subtitle">// MISSION TIMELINE</div><h2 class="section-title">Countdown Sequence</h2><div class="timeline-grid">${[['T-7 DAYS', 'Form your crew', 'Assemble 2 - 4 cadets. Pick a track.'], ['T-24 HOURS', 'Pre-flight check', 'Set up your data pipelines.'], ['T-00:00', 'Launch sequence', '11:00 AM - hackathon starts.'], ['T+07:00', 'Re-entry & review', 'Submissions close.']].map(([time, title, text]) => `<div class="timeline-step"><span class="timeline-dot"></span><span class="font-mono">${time}</span><h3 class="font-orbitron">${title}</h3><p>${text}</p></div>`).join('')}</div></div></section>
        <section id="contact"><div class="container"><div class="section-subtitle">// COMMS CHANNEL</div><h2 class="section-title">Contact</h2><div class="contact-grid">${[['COORDINATOR', eventInfo.coordinator, eventInfo.phone], ['VENUE', eventInfo.venue, 'VIT-AP University, Amaravati'], ['CLUSTER', 'SEDS AURORA', 'VTAPP 2026']].map(([label, name, text]) => `<article class="contact-card"><span class="font-mono">${label}</span><strong class="font-orbitron">${name}</strong><p>${text}</p></article>`).join('')}</div><div class="contact-action"><a class="btn-primary" href="${REGISTER_URL}" target="_blank" rel="noopener noreferrer">REGISTER YOUR TEAM</a><span class="font-mono">⌬ ENTRY FEE - ${eventInfo.entryFee} - LIMITED SLOTS ⌬</span></div></div></section>
      </main><footer><div class="container footer-grid"><div><div class="font-orbitron brand-footer">ORBITAL <span>GUARD</span></div><p>Decode the universe. A space-tech hackathon by SEDS AURORA at VTAPP 2026.</p></div><div><span class="font-mono footer-label">QUICK ACCESS</span><a href="#about">&rarr; About</a><a href="#problems">&rarr; Problems</a><a href="#datasets">&rarr; Datasets</a></div><div><span class="font-mono footer-label">COORDINATOR</span><strong>${eventInfo.coordinator}</strong><span class="font-mono">${eventInfo.phone}</span></div></div><div class="container footer-bottom font-mono">© 2026 SEDS AURORA x VTAPP. ALL TRANSMISSIONS RESERVED.<span>⌬ ORBITAL STATUS: NOMINAL ⌬</span></div></footer>
    </div>`;

  initNavigation();
  document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => { document.querySelector('.filter.active')?.classList.remove('active'); button.classList.add('active'); document.querySelector('.problem-grid').innerHTML = renderProblems(button.dataset.filter); }));
}

function initNavigation() {
  const header = document.querySelector('.site-header'); const menu = document.querySelector('.menu-toggle');
  menu.addEventListener('click', () => { const open = header.classList.toggle('menu-open'); menu.setAttribute('aria-expanded', String(open)); });
  document.querySelectorAll('.mobile-menu a').forEach((link) => link.addEventListener('click', () => { header.classList.remove('menu-open'); menu.setAttribute('aria-expanded', 'false'); }));
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 30), { passive: true });
}

function initStarfield() {
  const canvas = document.querySelector('.starfield'); const context = canvas.getContext('2d'); let stars = [];
  const resize = () => { const dpr = Math.min(devicePixelRatio || 1, 2); canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr; canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`; context.setTransform(dpr, 0, 0, dpr, 0, 0); stars = Array.from({ length: 180 }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, r: Math.random() * 1.3 + .2, phase: Math.random() * Math.PI * 2 })); };
  resize(); window.addEventListener('resize', resize); const draw = () => { context.clearRect(0, 0, innerWidth, innerHeight); stars.forEach((star) => { star.phase += .02; context.fillStyle = `rgba(230,230,255,${.35 + (Math.sin(star.phase) + 1) * .3})`; context.beginPath(); context.arc(star.x, star.y, star.r, 0, Math.PI * 2); context.fill(); }); requestAnimationFrame(draw); }; draw();
}

function initPlanetScene() {
  const canvas = document.querySelector('.planet-canvas'); const context = canvas.getContext('2d'); let time = 0;
  const draw = () => { const bounds = canvas.parentElement.getBoundingClientRect(); const dpr = Math.min(devicePixelRatio || 1, 2); if (canvas.width !== bounds.width * dpr || canvas.height !== bounds.height * dpr) { canvas.width = bounds.width * dpr; canvas.height = bounds.height * dpr; canvas.style.width = `${bounds.width}px`; canvas.style.height = `${bounds.height}px`; } context.setTransform(dpr, 0, 0, dpr, 0, 0); const cx = bounds.width / 2; const cy = bounds.height / 2; const radius = Math.min(bounds.width, bounds.height) * .31; context.clearRect(0, 0, bounds.width, bounds.height); const glow = context.createRadialGradient(cx, cy, radius * .7, cx, cy, radius * 1.8); glow.addColorStop(0, 'rgba(255,122,24,.3)'); glow.addColorStop(1, 'rgba(255,122,24,0)'); context.fillStyle = glow; context.beginPath(); context.arc(cx, cy, radius * 1.8, 0, Math.PI * 2); context.fill(); const planet = context.createRadialGradient(cx - radius * .4, cy - radius * .45, radius * .1, cx, cy, radius); planet.addColorStop(0, '#49301d'); planet.addColorStop(.55, '#1d1009'); planet.addColorStop(1, '#050302'); context.fillStyle = planet; context.beginPath(); context.arc(cx, cy, radius, 0, Math.PI * 2); context.fill(); context.strokeStyle = 'rgba(255,122,24,.7)'; context.stroke(); context.save(); context.translate(cx, cy); context.rotate(-Math.PI / 6); context.setLineDash([4, 6]); context.strokeStyle = 'rgba(255,180,100,.45)'; context.beginPath(); context.ellipse(0, 0, radius * 1.45, radius * .45, 0, 0, Math.PI * 2); context.stroke(); context.setLineDash([]); const angle = time * .7; context.translate(Math.cos(angle) * radius * 1.45, Math.sin(angle) * radius * .45); context.fillStyle = '#ff7a18'; context.fillRect(-6, -3, 12, 6); context.restore(); time += .012; requestAnimationFrame(draw); };
  draw();
}

function initIntro() {
  let seen = false; try { seen = sessionStorage.getItem('og-intro-seen') === '1'; } catch {}
  if (seen) return; const splash = document.createElement('div'); splash.className = 'intro-splash'; splash.innerHTML = `<div class="intro-ring"></div><div class="intro-logo">SEDS <span>AURORA</span></div><div class="font-mono intro-kicker">// ESTABLISHING UPLINK</div><strong class="font-orbitron">ORBITAL <span>GUARD</span></strong><div class="font-mono intro-subtitle">DECODE THE UNIVERSE</div><div class="intro-progress"></div><div class="font-mono intro-skip">[ PRESS ANY KEY OR CLICK TO SKIP ]</div>`; document.body.appendChild(splash);
  const close = () => { splash.classList.add('dismissed'); try { sessionStorage.setItem('og-intro-seen', '1'); } catch {} setTimeout(() => splash.remove(), 650); }; const timer = setTimeout(close, 4200); const skip = () => { clearTimeout(timer); close(); window.removeEventListener('keydown', skip); window.removeEventListener('click', skip); }; window.addEventListener('keydown', skip, { once: true }); window.addEventListener('click', skip, { once: true });
}

function initRocketCursor() {
  if (matchMedia('(pointer: coarse)').matches) return; const cursorRoot = document.createElement('div'); cursorRoot.className = 'cursor-root'; cursorRoot.setAttribute('aria-hidden', 'true'); cursorRoot.innerHTML = `<div class="cursor-trail"></div><svg class="cursor-rocket" viewBox="0 0 32 32"><path d="M16 4c-5 4-5 10-5 18h10c0-8 0-14-5-18Z" fill="#e7ecf3" stroke="#ff7a18"/><circle cx="16" cy="13" r="2.2" fill="#36e2ff"/><path d="M11 18 6 25l5-3M21 18l5 7-5-3M16 22v7" fill="none" stroke="#ff7a18" stroke-width="2" stroke-linecap="round"/></svg>`; document.body.appendChild(cursorRoot); const rocket = cursorRoot.querySelector('.cursor-rocket'); const trail = cursorRoot.querySelector('.cursor-trail'); let x = innerWidth / 2; let y = innerHeight / 2; let targetX = x; let targetY = y; document.addEventListener('pointermove', (event) => { targetX = event.clientX; targetY = event.clientY; rocket.style.left = `${targetX}px`; rocket.style.top = `${targetY}px`; }, { passive: true }); const animate = () => { x += (targetX - x) * .18; y += (targetY - y) * .18; trail.style.left = `${x}px`; trail.style.top = `${y}px`; requestAnimationFrame(animate); }; animate();
}

renderApp(); initStarfield(); initPlanetScene(); initIntro(); initRocketCursor();
