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
  return items.map((item, idx) => `
    <a class="problem-card anim-reveal anim-stagger-${(idx % 3) + 1} card-pop-in" href="${item.link}">
      <span class="font-mono problem-id">${item.id}</span>
      <h3 class="font-orbitron">${item.title}</h3>
      <p>${item.summary}</p>
      <span class="font-mono problem-track">${item.track.toUpperCase()}</span>
      <span class="font-mono problem-link">OPEN BRIEF &rarr;</span>
    </a>
  `).join('');
}

function renderApp() {
  root.innerHTML = `
    <div class="app-shell">
      <canvas class="starfield" aria-hidden="true"></canvas>
      <div class="grid-overlay"></div>
      <div class="scanline"></div>
      <div class="vignette"></div>

      <header class="site-header">
        <div class="container nav-bar">
          <a class="brand-lockup" href="#top" aria-label="Orbital Guard home">
            <span class="brand-mark">◉</span>
            <span><strong class="font-orbitron">ORBITAL <em>GUARD</em></strong><small class="font-mono">SEDS AURORA x VIT-AP</small></span>
          </a>
          <nav class="desktop-nav" aria-label="Main navigation">
            ${[['about', 'ABOUT'], ['details', 'DETAILS'], ['problems', 'PROBLEMS'], ['datasets', 'DATASETS'], ['round-2', 'ROUND 2'], ['contact', 'CONTACT']].map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}
            <button class="btn-primary nav-register js-register-btn" type="button">REGISTER</button>
          </nav>
          <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu">MENU</button>
        </div>
        <nav id="mobile-menu" class="mobile-menu" aria-label="Mobile navigation">
          ${[['about', 'ABOUT'], ['details', 'DETAILS'], ['problems', 'PROBLEMS'], ['datasets', 'DATASETS'], ['round-2', 'ROUND 2'], ['contact', 'CONTACT']].map(([id, label]) => `<a href="#${id}">${label}</a>`).join('')}
          <button class="btn-primary js-register-btn" type="button">REGISTER NOW</button>
        </nav>
      </header>

      <aside class="social-sidebar" aria-label="Social links">
        <a href="#contact" aria-label="Instagram">◎</a>
        <a href="#contact" aria-label="LinkedIn">in</a>
        <a href="#contact" aria-label="YouTube">▶</a>
        <a href="#contact" aria-label="X">𝕏</a>
      </aside>

      <main id="top">
        <section class="hero-section">
          <div class="container hero-grid">
            <div class="hero-copy-block">
              <div class="hero-tags anim-reveal anim-stagger-1">
                <span class="tag">HACKATHON</span>
                <span class="tag tag-cyan">VTAPP-26 - VIT-AP UNIVERSITY</span>
                <span class="tag tag-muted">SEDS AURORA x VIT-AP</span>
              </div>
              <h1 class="font-orbitron hero-wordmark anim-reveal anim-stagger-2">ORBITAL<br><span>GUARD</span></h1>
              <div class="hero-kicker font-mono anim-reveal anim-stagger-3"><i></i> DECODE THE UNIVERSE</div>
              <p class="hero-copy anim-reveal anim-stagger-4">Explore real NASA, ISRO and ESA space data. Solve challenges in satellite tracking, Earth observation and telemetry anomaly detection.</p>
              <div class="hero-actions anim-reveal anim-stagger-5">
                <button class="btn-primary js-register-btn" type="button">REGISTER NOW <span>&rarr;</span></button>
                <a class="btn-ghost" href="#problems">VIEW PROBLEM STATEMENTS</a>
              </div>
              <div class="hero-facts anim-reveal anim-stagger-6">
                <div><span class="font-mono">PRIZE POOL</span><strong class="font-orbitron">${eventInfo.prizePool}</strong></div>
                <div><span class="font-mono">TEAM SIZE</span><strong class="font-orbitron">2 - 4</strong></div>
                <div><span class="font-mono">DURATION</span><strong class="font-orbitron">7 HRS</strong></div>
              </div>
            </div>
            <div class="planet-scene">
              <canvas class="planet-canvas" aria-label="Interactive 3D Orbital Globe"></canvas>
              <span class="scene-badge badge-top font-mono"><span class="beacon-dot"></span>TRACKING <span class="tracking-count">8,243</span> OBJECTS</span>
              <span class="scene-badge badge-bottom font-mono"><span class="beacon-dot"></span><span class="signal-status">SIGNAL: NOMINAL</span></span>
              <span class="scene-hint font-mono">⟲ DRAG TO ROTATE GLOBE</span>
            </div>
          </div>
          <div class="scroll-cue font-mono">SCROLL <i></i></div>
        </section>

        <section id="about">
          <div class="container about-grid">
            <div>
              <div class="section-subtitle anim-reveal">// ABOUT THIS EVENT</div>
              <h2 class="section-title anim-reveal">About the Mission</h2>
              <p class="about-copy anim-reveal">Orbital Guard is an electrifying space-tech hackathon where you use genuine data from NASA, ISRO and ESA to tackle pressing cosmic issues.</p>
              <p class="about-copy anim-reveal">With AI, trace satellites, keep an eye on Earth, and uncover telemetry abnormalities to secure space assets. Build a solution that helps shape the future of space exploration.</p>
              <div class="about-actions anim-reveal">
                <a class="btn-primary" href="#problems">VIEW PROBLEMS</a>
                <a class="btn-ghost" href="#datasets">BROWSE DATASETS</a>
              </div>
            </div>
            <div class="mission-grid">
              ${[['◉', 'REAL SPACE DATA', 'Authentic NASA, ISRO and ESA mission datasets.'], ['⌬', 'TELEMETRY AI', 'Trace satellites and spot anomalies.'], ['◎', 'EARTH OBSERVATION', 'Harness imagery for real impact.'], ['◇', 'SPACE DEBRIS', 'Tackle the growing orbital debris problem.']].map(([icon, title, text], i) => `<article class="mission-card anim-reveal anim-stagger-${i + 1}"><span>${icon}</span><h3 class="font-orbitron">${title}</h3><p>${text}</p></article>`).join('')}
            </div>
          </div>
        </section>

        <section id="details">
          <div class="container">
            <div class="section-subtitle anim-reveal">// MISSION BRIEFING</div>
            <h2 class="section-title anim-reveal">Event Details</h2>
            <div class="details-grid">
              ${[['TIME', eventInfo.time], ['VENUE', eventInfo.venue], ['TEAM SIZE', eventInfo.teamSize], ['ENTRY FEE', eventInfo.entryFee], ['PRIZE POOL', eventInfo.prizePool, 'highlight'], ['DATE', eventInfo.date]].map(([label, value, extra], i) => `<div class="detail-card ${extra || ''} anim-reveal anim-stagger-${(i % 3) + 1}"><span class="font-mono detail-label">${label}</span><strong class="font-orbitron">${value}</strong></div>`).join('')}
            </div>
          </div>
        </section>

        <section id="problems">
          <div class="container">
            <div class="section-subtitle anim-reveal">// MISSION OBJECTIVES</div>
            <h2 class="section-title anim-reveal">Problem Statements</h2>
            <p class="section-intro anim-reveal">Choose your track, pick a challenge, and build something extraordinary.</p>
            <div class="filter-row anim-reveal">
              ${tracks.map((track, index) => `<button class="filter ${index === 0 ? 'active' : ''}" data-filter="${track.id}">${track.label}</button>`).join('')}
            </div>
            <div class="problem-grid">${renderProblems()}</div>
          </div>
        </section>

        <section id="datasets">
          <div class="container">
            <div class="section-subtitle anim-reveal">// AUTHORISED FEEDS</div>
            <h2 class="section-title anim-reveal">Curated Datasets</h2>
            <p class="section-intro anim-reveal">A starter pack of public space datasets, curated by SEDS AURORA for the hackathon.</p>
            <div class="dataset-grid">
              ${datasets.map(([name, provider, description, size, link], i) => `<a class="dataset-card anim-reveal anim-stagger-${(i % 3) + 1}" href="${link}" target="_blank" rel="noopener noreferrer"><div class="dataset-meta"><span class="font-mono">${provider}</span><span class="font-mono">${size}</span></div><h3 class="font-orbitron">${name}</h3><p>${description}</p><span class="dataset-open font-mono">OPEN SOURCE &rarr;</span></a>`).join('')}
            </div>
          </div>
        </section>

        <section>
          <div class="container">
            <div class="section-subtitle anim-reveal">// MISSION TIMELINE</div>
            <h2 class="section-title anim-reveal">Countdown Sequence</h2>
            <div class="timeline-grid">
              ${[['T-7 DAYS', 'Form your crew', 'Assemble 2 - 4 cadets. Pick a track.'], ['T-24 HOURS', 'Pre-flight check', 'Set up your data pipelines.'], ['T-00:00', 'Launch sequence', '11:00 AM - hackathon starts.'], ['T+07:00', 'Re-entry & review', 'Submissions close.']].map(([time, title, text], i) => `<div class="timeline-step anim-reveal anim-stagger-${i + 1}"><span class="timeline-dot"></span><span class="font-mono">${time}</span><h3 class="font-orbitron">${title}</h3><p>${text}</p></div>`).join('')}
            </div>
          </div>
        </section>

        <section id="contact">
          <div class="container">
            <div class="section-subtitle anim-reveal">// COMMS CHANNEL</div>
            <h2 class="section-title anim-reveal">Contact</h2>
            <div class="contact-grid">
              ${[['COORDINATOR', eventInfo.coordinator, eventInfo.phone], ['VENUE', eventInfo.venue, 'VIT-AP University, Amaravati'], ['CLUSTER', 'SEDS AURORA', 'VTAPP 2026']].map(([label, name, text], i) => `<article class="contact-card anim-reveal anim-stagger-${i + 1}"><span class="font-mono">${label}</span><strong class="font-orbitron">${name}</strong><p>${text}</p></article>`).join('')}
            </div>
            <div class="contact-action anim-reveal">
              <button class="btn-primary js-register-btn" type="button">REGISTER YOUR TEAM <span>&rarr;</span></button>
              <span class="font-mono">⌬ ENTRY FEE - ${eventInfo.entryFee} - LIMITED SLOTS ⌬</span>
            </div>
          </div>
        </section>
        <section id="round-2" class="round2-section">
          <div class="container">
            <div class="section-subtitle anim-reveal">// MISSION PHASE TRANSITION</div>
            <h2 class="section-title anim-reveal">Second Round </h2>
            <p class="section-intro anim-reveal">Live telemetry countdown and automated portal for Stage 02 evaluation.</p>

            <div class="round2-portal-box anim-reveal anim-stagger-1" id="round2-box">
              <div class="round2-ambient-glow" aria-hidden="true"></div>

              <!-- Telemetry Header Strip -->
              <div class="round2-telemetry-bar">
                <div class="round2-status-pill" id="round2-status-pill">
                  <span class="pulse-beacon"></span>
                  <span class="font-mono round2-status-txt" id="round2-status-txt">STAGE 01 IN PROGRESS // STAGE 02 LOCKED</span>
                </div>
                <div class="round2-time-target font-mono">
                  <span>UNSEAL TIME:</span> <strong id="round2-target-label">11 SEP 2026, 14:30 PM IST</strong>
                </div>
              </div>

              <!-- Locked State: Countdown Display -->
              <div class="round2-state-view is-locked" id="round2-locked-view">
                <div class="round2-hero-info">
                  <h3 class="font-orbitron round2-headline">STAGE 02 ACCESS COUNTDOWN</h3>
                  <p class="round2-subtext">
                    The HackJudge benchmark, telemetry verification, and evaluation portal unlocks tomorrow at 14:30 PM (2:30 PM). Complete Stage 01 development and prepare your repositories.
                  </p>
                </div>

                <div class="round2-timer-grid" id="round2-timer-grid">
                  <div class="timer-card">
                    <div class="timer-digit-wrapper">
                      <span class="timer-digit font-orbitron" id="r2-days">00</span>
                    </div>
                    <span class="timer-unit font-mono">DAYS</span>
                  </div>
                  <div class="timer-divider font-orbitron">:</div>
                  <div class="timer-card">
                    <div class="timer-digit-wrapper">
                      <span class="timer-digit font-orbitron" id="r2-hours">00</span>
                    </div>
                    <span class="timer-unit font-mono">HOURS</span>
                  </div>
                  <div class="timer-divider font-orbitron">:</div>
                  <div class="timer-card">
                    <div class="timer-digit-wrapper">
                      <span class="timer-digit font-orbitron" id="r2-minutes">00</span>
                    </div>
                    <span class="timer-unit font-mono">MINUTES</span>
                  </div>
                  <div class="timer-divider font-orbitron">:</div>
                  <div class="timer-card">
                    <div class="timer-digit-wrapper">
                      <span class="timer-digit font-orbitron" id="r2-seconds">00</span>
                    </div>
                    <span class="timer-unit font-mono">SECONDS</span>
                  </div>
                </div>

                <div class="round2-lock-notice font-mono">
                  <span class="lock-icon">🔒</span>
                  <span>TRANSMISSION LOCKED: Stage 02 evaluation link will automatically activate when timer reaches 00:00:00.</span>
                </div>
              </div>

              <!-- Unlocked State: Revealed HackJudge Link -->
              <div class="round2-state-view is-unlocked" id="round2-unlocked-view" style="display: none;">
                <div class="unlocked-badge font-mono">
                  <span class="pulse-beacon green"></span>
                  <span>STAGE 02 UNSEALED // HACKJUDGE GATEWAY ACTIVE</span>
                </div>
                <h3 class="font-orbitron unlocked-title">SECOND ROUND EVALUATION LIVE</h3>
                <p class="unlocked-desc">
                  Timer complete! Round 2 is officially open. Access the HackJudge automated platform below to submit your models, execute telemetry benchmarks, and view live scoring.
                </p>
                <div class="unlocked-actions">
                  <a href="https://hackjudge-frontend.onrender.com/" target="_blank" rel="noopener noreferrer" class="btn-primary round2-link-btn" id="round2-link-btn">
                    PROCEED TO ROUND 2 // HACKJUDGE <span>&rarr;</span>
                  </a>
                </div>
                <div class="round2-destination font-mono">
                  <span>DIRECT PORTAL LINK:</span>
                  <a href="https://hackjudge-frontend.onrender.com/" target="_blank" rel="noopener noreferrer" class="destination-link">
                    https://hackjudge-frontend.onrender.com/
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <footer>
        <div class="container footer-grid">
          <div class="footer-brand-col">
            <div class="font-orbitron brand-footer">ORBITAL <span>GUARD</span></div>
            <p class="footer-tagline">Decode the universe. A space-tech hackathon by SEDS AURORA at VTAPP 2026.</p>
            <div class="footer-orbital-tag font-mono">
              <span class="footer-dot"></span> VIT-AP UNIVERSITY &bull; CB-G13
            </div>
          </div>
          <div class="footer-links-col">
            <span class="font-mono footer-label">// QUICK ACCESS</span>
            <div class="footer-nav-list">
              <a href="#about" class="footer-link"><span>&rarr;</span> About</a>
              <a href="#problems" class="footer-link"><span>&rarr;</span> Problems</a>
              <a href="#datasets" class="footer-link"><span>&rarr;</span> Datasets</a>
              <a href="https://forms.gle/GaKsfZJML96PgXYm9" target="_blank" rel="noopener noreferrer" class="footer-link"><span>&rarr;</span> PS Submission</a>
              <a href="https://forms.gle/CLj8WjHpyNTbx7yw7" target="_blank" rel="noopener noreferrer" class="footer-link"><span>&rarr;</span> Attendance</a>
              <a href="#round-2" class="footer-link highlight"><span>&rarr;</span> Round 2 Portal</a>
            </div>
          </div>
          <div class="footer-coord-col">
            <span class="font-mono footer-label">// COORDINATOR</span>
            <div class="footer-coord-card">
              <div class="coord-meta font-mono">MISSION LEAD</div>
              <strong class="font-orbitron coord-name">${eventInfo.coordinator}</strong>
              <a href="tel:${eventInfo.phone}" class="coord-comms font-mono">
                <span class="comms-icon">⌬</span> ${eventInfo.phone}
              </a>
            </div>
          </div>
        </div>
        <div class="container footer-bottom font-mono">
          <div class="footer-copy">
            © 2026 SEDS AURORA x VTAPP. ALL TRANSMISSIONS RESERVED.
          </div>
          <div class="footer-status">
            <span class="footer-status-dot"></span>
            <span>⌬ ORBITAL STATUS: NOMINAL ⌬</span>
          </div>
        </div>
      </footer>
    </div>`;

  initNavigation();
  initProblemFilters();
}

function initNavigation() {
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu-toggle');
  if (menu && header) {
    menu.addEventListener('click', () => {
      const open = header.classList.toggle('menu-open');
      menu.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.mobile-menu a').forEach((link) => {
      link.addEventListener('click', () => {
        header.classList.remove('menu-open');
        menu.setAttribute('aria-expanded', 'false');
      });
    });
  }

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        header?.classList.toggle('scrolled', window.scrollY > 30);
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // Smooth in-page navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href) return;
      if (href === '#' || href === '#top') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initProblemFilters() {
  document.querySelectorAll('.filter').forEach((button) => {
    button.addEventListener('click', () => {
      const activeBtn = document.querySelector('.filter.active');
      if (activeBtn === button) return;
      activeBtn?.classList.remove('active');
      button.classList.add('active');

      const grid = document.querySelector('.problem-grid');
      if (!grid) return;

      grid.style.opacity = '0';
      grid.style.transform = 'translateY(8px)';
      grid.style.transition = 'opacity 0.18s ease, transform 0.18s ease';

      setTimeout(() => {
        grid.innerHTML = renderProblems(button.dataset.filter);
        grid.style.opacity = '1';
        grid.style.transform = 'translateY(0)';
        grid.querySelectorAll('.anim-reveal').forEach((el) => el.classList.add('is-visible'));
      }, 180);
    });
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.anim-reveal');
  if (!('IntersectionObserver' in window)) {
    revealElements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach((el) => observer.observe(el));
}

function initStarfield() {
  const canvas = document.querySelector('.starfield');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  let stars = [];
  let meteors = [];
  let mouseX = innerWidth / 2;
  let mouseY = innerHeight / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);

    stars = Array.from({ length: 180 }, () => {
      const layer = Math.random() < 0.65 ? 1 : Math.random() < 0.85 ? 2 : 3;
      return {
        x: Math.random() * innerWidth,
        y: Math.random() * innerHeight,
        r: layer === 1 ? Math.random() * 0.9 + 0.3 : layer === 2 ? Math.random() * 1.3 + 0.8 : Math.random() * 1.8 + 1.2,
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.025 + 0.01,
        color: layer === 3 ? (Math.random() < 0.5 ? '255,161,74' : '54,226,255') : '230,235,255',
        layer: layer
      };
    });
  };

  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('pointermove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  }, { passive: true });

  const spawnMeteor = () => {
    if (meteors.length >= 2 || Math.random() > 0.4) return;
    const startX = Math.random() * (innerWidth * 0.8) + innerWidth * 0.1;
    const startY = Math.random() * (innerHeight * 0.35);
    const angle = (Math.PI / 4) + (Math.random() * 0.3 - 0.15); // ~45 deg
    const speed = Math.random() * 10 + 14;
    const len = Math.random() * 70 + 70;

    meteors.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      len: len,
      life: 1.0,
      decay: Math.random() * 0.016 + 0.018,
      sparks: []
    });
  };

  let meteorTimer = 0;

  const draw = () => {
    context.clearRect(0, 0, innerWidth, innerHeight);

    // Smooth mouse parallax
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;
    const parallaxX = (mouseX / innerWidth - 0.5);
    const parallaxY = (mouseY / innerHeight - 0.5);

    // Draw stars
    stars.forEach((star) => {
      star.phase += star.twinkleSpeed;
      const alpha = 0.3 + (Math.sin(star.phase) + 1) * 0.35;
      const ox = star.x - parallaxX * (star.layer * 12);
      const oy = star.y - parallaxY * (star.layer * 12);

      context.fillStyle = `rgba(${star.color}, ${Math.min(1, alpha)})`;
      context.beginPath();
      context.arc(ox, oy, star.r, 0, Math.PI * 2);
      context.fill();
    });

    // Spawn meteors occasionally
    meteorTimer++;
    if (meteorTimer > 120) {
      spawnMeteor();
      meteorTimer = 0;
    }

    // Update & draw meteors
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      m.x += m.vx;
      m.y += m.vy;
      m.life -= m.decay;

      // Add sparks
      if (Math.random() < 0.4) {
        m.sparks.push({
          x: m.x - m.vx * 0.3,
          y: m.y - m.vy * 0.3,
          r: Math.random() * 1.5 + 0.5,
          life: 1.0,
          decay: 0.08
        });
      }

      if (m.life <= 0 || m.x > innerWidth + 100 || m.y > innerHeight + 100) {
        meteors.splice(i, 1);
        continue;
      }

      // Draw meteor streak
      const tailX = m.x - (m.vx / Math.hypot(m.vx, m.vy)) * m.len;
      const tailY = m.y - (m.vy / Math.hypot(m.vx, m.vy)) * m.len;
      const grad = context.createLinearGradient(m.x, m.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${m.life})`);
      grad.addColorStop(0.2, `rgba(54, 226, 255, ${m.life * 0.9})`);
      grad.addColorStop(0.6, `rgba(255, 122, 24, ${m.life * 0.6})`);
      grad.addColorStop(1, 'rgba(255, 122, 24, 0)');

      context.strokeStyle = grad;
      context.lineWidth = 2.2;
      context.beginPath();
      context.moveTo(m.x, m.y);
      context.lineTo(tailX, tailY);
      context.stroke();

      // Meteor head glow
      context.fillStyle = `rgba(255, 255, 255, ${m.life})`;
      context.beginPath();
      context.arc(m.x, m.y, 2, 0, Math.PI * 2);
      context.fill();

      // Update & draw sparks
      for (let s = m.sparks.length - 1; s >= 0; s--) {
        const spark = m.sparks[s];
        spark.life -= spark.decay;
        if (spark.life <= 0) {
          m.sparks.splice(s, 1);
          continue;
        }
        context.fillStyle = `rgba(255, 180, 74, ${spark.life * m.life})`;
        context.beginPath();
        context.arc(spark.x, spark.y, spark.r, 0, Math.PI * 2);
        context.fill();
      }
    }

    requestAnimationFrame(draw);
  };
  draw();
}

function initPlanetScene() {
  const canvas = document.querySelector('.planet-canvas');
  if (!canvas) return;
  const context = canvas.getContext('2d');
  let time = 0;

  // Globe orientation & physics
  let rotAngle = 1.35; // initial rotation showing India / Indian Ocean / Asia
  let pitchAngle = 0.32; // natural 3D axial tilt
  let targetTiltX = 0;
  let targetTiltY = 0;
  let tiltX = 0;
  let tiltY = 0;

  // Drag interaction state
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;
  let velX = 0;
  let velY = 0;

  canvas.addEventListener('pointerdown', (e) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    velX = 0;
    velY = 0;
    try { canvas.setPointerCapture(e.pointerId); } catch {}
  });

  window.addEventListener('pointermove', (e) => {
    if (isDragging) {
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      velX = dx * 0.005;
      velY = dy * 0.005;
      rotAngle += velX;
      pitchAngle = Math.max(-0.7, Math.min(0.7, pitchAngle + velY));
    } else {
      const parent = canvas.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      const normX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const normY = ((e.clientY - r.top) / r.height - 0.5) * 2;
      targetTiltX = Math.max(-1, Math.min(1, normX));
      targetTiltY = Math.max(-1, Math.min(1, normY));
    }
  }, { passive: true });

  const endDrag = (e) => {
    if (isDragging) {
      isDragging = false;
      try { canvas.releasePointerCapture(e.pointerId); } catch {}
    }
  };
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);

  // High-Resolution Continental Biome Polygons (Clean regional contours)
  const REGIONS = [
    // INDIA & SOUTH ASIA
    { name: 'IndiaMain', color: '#2d7a36', shelf: '#2be3ff', pts: [[28, 70], [32, 75], [30, 80], [26, 88], [22, 89], [19, 85], [16, 82], [13, 80], [9, 78], [8, 77], [10, 76], [13, 74], [16, 73], [19, 72], [22, 69], [25, 68], [28, 70]] },
    { name: 'IndiaNorth', color: '#3d8f45', shelf: '#2be3ff', pts: [[28, 70], [33, 74], [35, 76], [34, 79], [30, 80], [28, 70]] },
    { name: 'SriLanka', color: '#267030', shelf: '#2be3ff', pts: [[9.5, 80], [8, 81.5], [6, 80.5], [7, 79.5], [9.5, 80]] },

    // EAST & SOUTHEAST ASIA
    { name: 'ChinaEast', color: '#32863c', shelf: '#2be3ff', pts: [[22, 108], [25, 118], [30, 122], [37, 122], [40, 120], [40, 115], [35, 110], [28, 105], [22, 108]] },
    { name: 'ChinaNorth', color: '#4a8e4a', shelf: '#2be3ff', pts: [[40, 115], [45, 120], [48, 128], [45, 132], [42, 130], [38, 125], [40, 115]] },
    { name: 'Indochina', color: '#26732f', shelf: '#2be3ff', pts: [[22, 100], [20, 106], [15, 108], [11, 106], [10, 104], [14, 101], [18, 97], [22, 100]] },
    { name: 'MalayArch', color: '#206828', shelf: '#2be3ff', pts: [[6, 100], [4, 103], [1.5, 104], [2, 101], [6, 100]] },
    { name: 'Sumatra', color: '#226b2b', shelf: '#2be3ff', pts: [[5, 95], [2, 98], [-3, 102], [-5, 105], [-4, 102], [1, 97], [5, 95]] },
    { name: 'Borneo', color: '#226b2b', shelf: '#2be3ff', pts: [[7, 116], [4, 118], [-1, 117], [-3, 114], [-1, 110], [3, 109], [7, 116]] },
    { name: 'Japan', color: '#2d7a36', shelf: '#2be3ff', pts: [[31, 131], [34, 133], [36, 138], [40, 141], [43, 144], [40, 140], [35, 136], [32, 131], [31, 131]] },

    // MIDDLE EAST & CENTRAL ASIA
    { name: 'Arabia', color: '#a6804a', shelf: '#2be3ff', pts: [[13, 44], [15, 52], [22, 59], [25, 56], [28, 49], [30, 35], [25, 36], [20, 40], [13, 44]] },
    { name: 'Persia', color: '#688c52', shelf: '#2be3ff', pts: [[26, 56], [32, 60], [36, 61], [38, 55], [36, 47], [30, 49], [26, 56]] },
    { name: 'CentralAsia', color: '#568048', shelf: '#2be3ff', pts: [[36, 60], [42, 65], [46, 75], [44, 85], [38, 82], [36, 70], [36, 60]] },

    // EUROPE
    { name: 'EuroWest', color: '#389242', shelf: '#2be3ff', pts: [[36, -5], [43, -3], [46, -1], [48, 3], [51, 2], [48, 6], [44, 6], [40, 3], [36, -5]] },
    { name: 'EuroCentral', color: '#32863c', shelf: '#2be3ff', pts: [[44, 6], [48, 8], [54, 10], [54, 20], [48, 22], [45, 16], [44, 6]] },
    { name: 'Scandinavia', color: '#4a9254', shelf: '#2be3ff', pts: [[58, 6], [62, 10], [68, 16], [70, 25], [65, 23], [60, 18], [58, 6]] },
    { name: 'Iberia', color: '#7a8e48', shelf: '#2be3ff', pts: [[36, -9], [43, -9], [43, -2], [37, -2], [36, -9]] },
    { name: 'UK', color: '#34863c', shelf: '#2be3ff', pts: [[50, -5], [54, -3], [58, -4], [57, -1], [52, 1], [50, -5]] },

    // AFRICA
    { name: 'AfricaNorth', color: '#9a7a42', shelf: '#2be3ff', pts: [[32, -8], [36, 0], [34, 12], [32, 28], [30, 32], [22, 36], [16, 36], [14, 20], [12, -14], [16, -16], [25, -14], [32, -8]] },
    { name: 'AfricaCentral', color: '#256a28', shelf: '#2be3ff', pts: [[14, -14], [14, 10], [10, 14], [4, 9], [3, 20], [4, 30], [-5, 38], [-10, 36], [-10, 15], [-5, 10], [5, 4], [8, -12], [14, -14]] },
    { name: 'AfricaSouth', color: '#527f38', shelf: '#2be3ff', pts: [[-10, 14], [-10, 36], [-18, 35], [-26, 33], [-33, 27], [-34, 18], [-28, 16], [-18, 12], [-10, 14]] },
    { name: 'Madagascar', color: '#2d7a36', shelf: '#2be3ff', pts: [[-12, 49], [-16, 50], [-25, 47], [-25, 43], [-18, 44], [-12, 49]] },

    // AUSTRALIA & OCEANIA
    { name: 'AustraliaMain', color: '#926a38', shelf: '#2be3ff', pts: [[-12, 131], [-14, 136], [-12, 142], [-20, 148], [-28, 153], [-37, 150], [-38, 144], [-34, 137], [-33, 124], [-28, 114], [-20, 118], [-15, 124], [-12, 131]] },
    { name: 'AustraliaEast', color: '#4d8838', shelf: '#2be3ff', pts: [[-18, 146], [-24, 151], [-32, 152], [-37, 148], [-33, 145], [-24, 144], [-18, 146]] },

    // THE AMERICAS
    { name: 'NAmericaEast', color: '#388a42', shelf: '#2be3ff', pts: [[25, -80], [30, -82], [35, -76], [42, -71], [45, -65], [48, -68], [42, -78], [35, -85], [30, -88], [25, -80]] },
    { name: 'NAmericaWest', color: '#568444', shelf: '#2be3ff', pts: [[32, -117], [38, -123], [46, -124], [52, -128], [55, -124], [48, -114], [40, -106], [32, -104], [32, -117]] },
    { name: 'NAmericaNorth', color: '#447844', shelf: '#2be3ff', pts: [[48, -114], [56, -110], [60, -95], [58, -78], [52, -80], [48, -90], [48, -114]] },
    { name: 'CentralAm', color: '#2b7834', shelf: '#2be3ff', pts: [[22, -98], [18, -90], [15, -88], [10, -84], [8, -80], [8, -78], [10, -84], [16, -92], [22, -98]] },
    { name: 'SAmericaBrazil', color: '#257228', shelf: '#2be3ff', pts: [[2, -50], [-4, -37], [-10, -36], [-18, -39], [-23, -43], [-24, -50], [-18, -55], [-10, -60], [-2, -58], [2, -50]] },
    { name: 'SAmericaWest', color: '#548240', shelf: '#2be3ff', pts: [[8, -77], [2, -79], [-5, -80], [-15, -75], [-25, -70], [-35, -72], [-45, -74], [-53, -69], [-46, -66], [-35, -65], [-20, -66], [-8, -70], [8, -77]] },
    { name: 'NZNorth', color: '#389238', shelf: '#2be3ff', pts: [[-35, 174], [-38, 177], [-41, 175], [-38, 173], [-35, 174]] },
    { name: 'NZSouth', color: '#389238', shelf: '#2be3ff', pts: [[-41, 174], [-44, 171], [-46, 168], [-43, 170], [-41, 174]] },
    { name: 'Cuba', color: '#389238', shelf: '#2be3ff', pts: [[23, -82], [22, -84], [20, -77], [21, -75], [23, -82]] },
    { name: 'Iceland', color: '#eef6fc', shelf: '#2be3ff', pts: [[64, -22], [66, -18], [66, -14], [64, -14], [64, -22]] }
  ];

  // Authentic Space Missions in True 3D Keplerian Orbits
  const SATELLITES = [
    {
      id: 'eos04',
      name: 'ISRO EOS-04',
      type: 'RADAR IMAGER',
      agency: 'ISRO',
      alt: '529 KM',
      vel: '7.6 KM/S',
      radiusMult: 1.34,
      inc: 1.70, // 97.4° Sun-Synchronous Polar Orbit
      node: -0.42,
      speed: 0.42,
      color: '#ffa14a',
      glow: '#ff7714',
      phase: 0.5
    },
    {
      id: 'iss',
      name: 'ISS (ZARYA)',
      type: 'SPACE STATION',
      agency: 'NASA / ESA',
      alt: '418 KM',
      vel: '7.7 KM/S',
      radiusMult: 1.23,
      inc: 0.90, // 51.6° Inclined Orbit
      node: 0.84,
      speed: 0.52,
      color: '#5cffaa',
      glow: '#18e878',
      phase: 2.3
    },
    {
      id: 'sentinel',
      name: 'ESA SENTINEL-2A',
      type: 'MULTISPECTRAL',
      agency: 'ESA',
      alt: '786 KM',
      vel: '7.4 KM/S',
      radiusMult: 1.45,
      inc: 1.62, // 92.8° Polar Orbit
      node: 2.35,
      speed: 0.36,
      color: '#36e2ff',
      glow: '#00b4ff',
      phase: 4.2
    }
  ];

  // 3D Point Projection onto Sphere for Continents
  const project = (latDeg, lonDeg, rad, rot, pitch, cx, cy) => {
    const phi = latDeg * Math.PI / 180;
    const lambda = lonDeg * Math.PI / 180;
    const x = Math.cos(phi) * Math.sin(lambda - rot);
    const y = -Math.sin(phi);
    const z = Math.cos(phi) * Math.cos(lambda - rot);

    const cosP = Math.cos(pitch);
    const sinP = Math.sin(pitch);
    const yRot = y * cosP + z * sinP;
    const zRot = -y * sinP + z * cosP;
    const xRot = x;

    return {
      x: cx + xRot * rad,
      y: cy + yRot * rad,
      depth: zRot,
      nx: xRot,
      ny: yRot,
      nz: zRot
    };
  };

  // Exact 3D Keplerian Orbit Calculator
  const getOrbitPoint = (sat, theta, rad, pitch, cx, cy) => {
    const a = rad * sat.radiusMult;
    const inc = sat.inc;
    const node = sat.node;

    const cosT = Math.cos(theta);
    const sinT = Math.sin(theta);
    const cosInc = Math.cos(inc);
    const sinInc = Math.sin(inc);
    const cosNode = Math.cos(node);
    const sinNode = Math.sin(node);

    // 3D ECI Position (Equatorial Frame)
    const xEq = a * (cosNode * cosT - sinNode * sinT * cosInc);
    const yEq = -a * (sinT * sinInc); // Negative Y is North in our canvas
    const zEq = a * (sinNode * cosT + cosNode * sinT * cosInc);

    // Pitch viewing transform
    const cosP = Math.cos(pitch);
    const sinP = Math.sin(pitch);
    const xCam = xEq;
    const yCam = yEq * cosP + zEq * sinP;
    const zCam = -yEq * sinP + zEq * cosP;

    // Velocity tangent vector for prograde flight heading
    const vxEq = a * (-cosNode * sinT - sinNode * cosT * cosInc);
    const vyEq = -a * (cosT * sinInc);
    const vzEq = a * (-sinNode * sinT + cosNode * cosT * cosInc);

    const vxCam = vxEq;
    const vyCam = vyEq * cosP + vzEq * sinP;
    const heading = Math.atan2(vyCam, vxCam);

    return {
      xEq, yEq, zEq,
      xCam, yCam, zCam,
      screenX: cx + xCam,
      screenY: cy + yCam,
      dist: Math.hypot(xCam, yCam),
      heading,
      a
    };
  };

  // Convert 3D orbital position to real-time Geographic Coordinates (Lat / Lon)
  const getGeoCoords = (pt, sat, effectiveRot) => {
    const normY = Math.max(-1, Math.min(1, -pt.yEq / pt.a));
    const lat = (Math.asin(normY) * 180 / Math.PI).toFixed(1);
    const lambdaInertial = Math.atan2(pt.xEq, pt.zEq) * 180 / Math.PI;
    let lon = (((lambdaInertial - effectiveRot * 180 / Math.PI) % 360) + 540) % 360 - 180;
    lon = lon.toFixed(1);
    const latStr = lat >= 0 ? `${lat}°N` : `${Math.abs(lat)}°S`;
    const lonStr = lon >= 0 ? `${lon}°E` : `${Math.abs(lon)}°W`;
    return { latStr, lonStr };
  };

    const resizeCanvas = () => {
    const parent = canvas.parentElement;
    if (!parent) return;
    const bounds = parent.getBoundingClientRect();
    const w = bounds.width || 420;
    const h = bounds.height || 420;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  const draw = () => {
    const parent = canvas.parentElement;
    const w = parent ? parent.clientWidth : 420;
    const h = parent ? parent.clientHeight : 420;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    }

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.355;

    context.clearRect(0, 0, w, h);

    // Inertial rotation decay & auto-spin
    if (!isDragging) {
      rotAngle += 0.0026 + velX;
      pitchAngle = Math.max(-0.7, Math.min(0.7, pitchAngle + velY));
      velX *= 0.93;
      velY *= 0.93;
    }

    // Parallax mouse tilt
    tiltX += (targetTiltX - tiltX) * 0.04;
    tiltY += (targetTiltY - tiltY) * 0.04;
    const effectivePitch = pitchAngle + tiltY * 0.12;
    const effectiveRot = rotAngle - tiltX * 0.12;

    // Pre-calculate satellite positions for this frame
    const satStates = SATELLITES.map((sat) => {
      const currentTheta = sat.phase + time * sat.speed;
      const pt = getOrbitPoint(sat, currentTheta, radius, effectivePitch, cx, cy);
      const isOccluded = pt.zCam < -0.05 && pt.dist < radius * 0.97;
      const geo = getGeoCoords(pt, sat, effectiveRot);

      // Ground track nadir projection point
      const surfRatio = radius / pt.a;
      const gx = cx + pt.xEq * surfRatio;
      const gy = cy + (pt.yEq * Math.cos(effectivePitch) + pt.zEq * Math.sin(effectivePitch)) * surfRatio;

      return {
        sat,
        currentTheta,
        pt,
        isOccluded,
        geo,
        gx,
        gy
      };
    });

    // =========================================================================
    // LAYER 1: Deep Space Rear Orbit Arcs (Passed behind the planet sphere)
    // =========================================================================
    context.save();
    satStates.forEach(({ sat }) => {
      const segments = 64;
      context.beginPath();
      context.strokeStyle = `${sat.color}35`;
      context.lineWidth = 0.9;
      context.setLineDash([2, 5]);

      for (let i = 0; i < segments; i++) {
        const t1 = (i / segments) * Math.PI * 2;
        const t2 = ((i + 1) / segments) * Math.PI * 2;
        const p1 = getOrbitPoint(sat, t1, radius, effectivePitch, cx, cy);
        const p2 = getOrbitPoint(sat, t2, radius, effectivePitch, cx, cy);

        // Only draw segments that lie on the rear hemisphere (zCam < 0)
        if (p1.zCam < 0 || p2.zCam < 0) {
          context.moveTo(p1.screenX, p1.screenY);
          context.lineTo(p2.screenX, p2.screenY);
        }
      }
      context.stroke();
    });
    context.restore();

    // =========================================================================
    // LAYER 2: Atmospheric Outer Rayleigh Glow
    // =========================================================================
    const atmoGlow = context.createRadialGradient(cx, cy, radius * 0.92, cx, cy, radius * 1.35);
    atmoGlow.addColorStop(0, 'rgba(54, 205, 255, 0.52)');
    atmoGlow.addColorStop(0.22, 'rgba(30, 140, 255, 0.28)');
    atmoGlow.addColorStop(0.55, 'rgba(15, 60, 180, 0.10)');
    atmoGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    context.fillStyle = atmoGlow;
    context.beginPath();
    context.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
    context.fill();

    // =========================================================================
    // LAYER 3: Earth Globe Body & Continents (Naturally occludes rear orbits!)
    // =========================================================================
    context.save();
    context.beginPath();
    context.arc(cx, cy, radius, 0, Math.PI * 2);
    context.clip();

    // Radiant ocean gradient (vibrant azure to deep royal blue)
    const sunOffsetX = cx - radius * 0.30;
    const sunOffsetY = cy - radius * 0.35;
    const oceanGrad = context.createRadialGradient(sunOffsetX, sunOffsetY, radius * 0.1, cx, cy, radius * 1.05);
    oceanGrad.addColorStop(0, '#1c64d4'); // Radiant azure on sunlit side
    oceanGrad.addColorStop(0.42, '#12459c'); // Rich royal ocean
    oceanGrad.addColorStop(0.82, '#0c2d6e'); // Deep navy
    oceanGrad.addColorStop(1, '#081d4a'); // Cosmic sapphire rim
    context.fillStyle = oceanGrad;
    context.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    // Subtle navigation graticule lines
    context.strokeStyle = 'rgba(54, 226, 255, 0.12)';
    context.lineWidth = 0.8;
    for (let latDeg = -60; latDeg <= 60; latDeg += 30) {
      context.beginPath();
      let first = true;
      for (let lonDeg = 0; lonDeg <= 360; lonDeg += 10) {
        const pt = project(latDeg, lonDeg, radius, effectiveRot, effectivePitch, cx, cy);
        if (pt.depth > -0.05) {
          if (first) { context.moveTo(pt.x, pt.y); first = false; }
          else { context.lineTo(pt.x, pt.y); }
        } else {
          first = true;
        }
      }
      context.stroke();
    }
    for (let lonDeg = 0; lonDeg < 360; lonDeg += 45) {
      context.beginPath();
      let first = true;
      for (let latDeg = -80; latDeg <= 80; latDeg += 8) {
        const pt = project(latDeg, lonDeg, radius, effectiveRot, effectivePitch, cx, cy);
        if (pt.depth > -0.05) {
          if (first) { context.moveTo(pt.x, pt.y); first = false; }
          else { context.lineTo(pt.x, pt.y); }
        } else {
          first = true;
        }
      }
      context.stroke();
    }

    // Ocean Specular Sun Glint
    const glintX = cx - radius * 0.32;
    const glintY = cy - radius * 0.36;
    const oceanGlint = context.createRadialGradient(glintX, glintY, 0, glintX, glintY, radius * 0.52);
    oceanGlint.addColorStop(0, 'rgba(255, 255, 250, 0.65)');
    oceanGlint.addColorStop(0.22, 'rgba(180, 230, 255, 0.32)');
    oceanGlint.addColorStop(0.6, 'rgba(60, 175, 255, 0.10)');
    oceanGlint.addColorStop(1, 'rgba(0, 0, 0, 0)');
    context.fillStyle = oceanGlint;
    context.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    // Continents & Biomes with Glowing Coastal Shelves
    REGIONS.forEach((region) => {
      let sumLat = 0, sumLon = 0;
      for (let i = 0; i < region.pts.length; i++) {
        sumLat += region.pts[i][0];
        sumLon += region.pts[i][1];
      }
      const centerLat = sumLat / region.pts.length;
      const centerLon = sumLon / region.pts.length;
      const centerPt = project(centerLat, centerLon, radius, effectiveRot, effectivePitch, cx, cy);

      if (centerPt.depth < -0.18) return;

      const pts = [];
      let visibleCount = 0;
      for (let i = 0; i < region.pts.length; i++) {
        const pt = project(region.pts[i][0], region.pts[i][1], radius, effectiveRot, effectivePitch, cx, cy);
        if (pt.depth > -0.12) visibleCount++;
        pts.push(pt);
      }

      if (visibleCount < 2) return;

      context.beginPath();
      context.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) {
        context.lineTo(pts[i].x, pts[i].y);
      }
      context.closePath();

      // Vibrant turquoise coastal water shelf
      context.strokeStyle = 'rgba(40, 220, 255, 0.72)';
      context.lineWidth = 3.2;
      context.stroke();

      // Rich biome land fill
      context.fillStyle = region.color;
      context.fill();
    });

    // Sub-Satellite Ground Target Reticles & Active Radar Footprints (On Earth Surface)
    satStates.forEach(({ sat, pt, isOccluded, gx, gy }) => {
      if (isOccluded || pt.zCam <= 0) return;

      // Active radar sweep ground footprint
      const ping = (time * 1.8 + sat.phase) % 1.0;
      context.save();

      // Ground swath ellipse
      context.beginPath();
      context.ellipse(gx, gy, 14, 8, effectivePitch * 0.5, 0, Math.PI * 2);
      context.fillStyle = `${sat.color}18`;
      context.fill();
      context.strokeStyle = `${sat.color}40`;
      context.lineWidth = 0.8;
      context.stroke();

      // Expanding radar pulse wave
      context.beginPath();
      context.ellipse(gx, gy, 14 + ping * 16, 8 + ping * 9, effectivePitch * 0.5, 0, Math.PI * 2);
      context.strokeStyle = sat.color;
      context.globalAlpha = (1 - ping) * 0.65;
      context.lineWidth = 1.0;
      context.stroke();

      // Ground crosshair target
      context.globalAlpha = 0.9;
      context.strokeStyle = sat.color;
      context.strokeRect(gx - 2.5, gy - 2.5, 5, 5);
      context.restore();
    });

    // Day/Night Twilight Shading
    const nightShade = context.createRadialGradient(sunOffsetX, sunOffsetY, radius * 0.35, cx + radius * 0.25, cy + radius * 0.25, radius * 1.15);
    nightShade.addColorStop(0, 'rgba(0, 0, 0, 0)');
    nightShade.addColorStop(0.52, 'rgba(2, 6, 20, 0.04)');
    nightShade.addColorStop(0.80, 'rgba(2, 8, 28, 0.28)');
    nightShade.addColorStop(1, 'rgba(1, 4, 18, 0.48)');
    context.fillStyle = nightShade;
    context.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    // Warm sunset/sunrise twilight band along terminator
    const twilightGlow = context.createRadialGradient(sunOffsetX, sunOffsetY, radius * 0.65, cx + radius * 0.15, cy + radius * 0.15, radius * 1.05);
    twilightGlow.addColorStop(0, 'rgba(255, 110, 30, 0)');
    twilightGlow.addColorStop(0.7, 'rgba(255, 125, 45, 0.14)');
    twilightGlow.addColorStop(0.85, 'rgba(255, 80, 20, 0.08)');
    twilightGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    context.fillStyle = twilightGlow;
    context.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

    context.restore(); // End globe clipping

    // =========================================================================
    // LAYER 4: Atmospheric Rayleigh Limb Highlight
    // =========================================================================
    context.save();
    context.beginPath();
    context.arc(cx, cy, radius, 0, Math.PI * 2);
    context.strokeStyle = 'rgba(70, 195, 255, 0.65)';
    context.lineWidth = 1.8;
    context.stroke();

    context.beginPath();
    context.arc(cx, cy, radius + 0.8, -Math.PI * 0.84, Math.PI * 0.12);
    context.strokeStyle = 'rgba(180, 235, 255, 0.95)';
    context.lineWidth = 2.6;
    context.shadowColor = '#36b8ff';
    context.shadowBlur = 14;
    context.stroke();
    context.restore();

    // =========================================================================
    // LAYER 5: Front Orbit Arcs & Luminous Flight Trails (In Front of Earth)
    // =========================================================================
    context.save();
    satStates.forEach(({ sat, currentTheta }) => {
      const segments = 64;

      // 1. Front Trajectory Arc
      context.beginPath();
      context.strokeStyle = `${sat.color}80`;
      context.lineWidth = 1.1;
      context.setLineDash([2, 5]);

      for (let i = 0; i < segments; i++) {
        const t1 = (i / segments) * Math.PI * 2;
        const t2 = ((i + 1) / segments) * Math.PI * 2;
        const p1 = getOrbitPoint(sat, t1, radius, effectivePitch, cx, cy);
        const p2 = getOrbitPoint(sat, t2, radius, effectivePitch, cx, cy);

        // Only draw segments that lie on the front hemisphere (zCam >= 0)
        if (p1.zCam >= 0 || p2.zCam >= 0) {
          context.moveTo(p1.screenX, p1.screenY);
          context.lineTo(p2.screenX, p2.screenY);
        }
      }
      context.stroke();

      // 2. Dynamic Luminous Flight Wake / Ion Trail trailing behind satellite
      const trailPoints = 14;
      const trailSpan = 0.55; // radians behind spacecraft
      context.setLineDash([]);
      for (let j = 0; j < trailPoints; j++) {
        const fract1 = j / trailPoints;
        const fract2 = (j + 1) / trailPoints;
        const tp1 = currentTheta - (1 - fract1) * trailSpan;
        const tp2 = currentTheta - (1 - fract2) * trailSpan;
        const p1 = getOrbitPoint(sat, tp1, radius, effectivePitch, cx, cy);
        const p2 = getOrbitPoint(sat, tp2, radius, effectivePitch, cx, cy);

        if (p1.zCam >= -0.05 || p2.zCam >= -0.05) {
          context.beginPath();
          context.moveTo(p1.screenX, p1.screenY);
          context.lineTo(p2.screenX, p2.screenY);
          context.strokeStyle = sat.color;
          context.globalAlpha = fract2 * 0.75;
          context.lineWidth = 1.0 + fract2 * 1.4;
          context.stroke();
        }
      }
    });
    context.restore();

    // =========================================================================
    // LAYER 6: Spacecraft Models, Nadir Targeting Beams & HUD Badges
    // =========================================================================
    satStates.forEach(({ sat, pt, isOccluded, geo, gx, gy }) => {
      // Natural Planetary Occlusion: if behind solid Earth, don't draw
      if (isOccluded) return;

      const satX = pt.screenX;
      const satY = pt.screenY;

      // 3D Perspective Scale: larger in front, smaller when farther away
      const depthScale = Math.max(0.75, Math.min(1.15, 0.94 + (pt.zCam / pt.a) * 0.22));

      // 1. Nadir Ground Laser Beam (when facing camera)
      if (pt.zCam > 0.05) {
        context.save();
        context.beginPath();
        context.setLineDash([2, 3]);
        context.strokeStyle = `${sat.color}90`;
        context.lineWidth = 1.0;
        context.moveTo(gx, gy);
        context.lineTo(satX, satY);
        context.stroke();
        context.restore();
      }

      // 2. Render Spacecraft Model (Aligned to Velocity Heading!)
      context.save();
      context.translate(satX, satY);
      context.scale(depthScale, depthScale);
      context.rotate(pt.heading);

      if (sat.id === 'eos04') {
        // --- ISRO EOS-04 (Radar Earth Observation Satellite - RISAT-1A) ---
        // Synthetic Aperture Radar (SAR) planar antenna panel (golden kapton)
        context.fillStyle = '#f59e0b';
        context.strokeStyle = '#fde68a';
        context.lineWidth = 0.8;
        context.fillRect(-12, -10, 24, 5);
        context.strokeRect(-12, -10, 24, 5);

        // SAR antenna cross-hatch seams
        context.strokeStyle = '#b45309';
        context.lineWidth = 0.5;
        context.beginPath();
        for (let x = -8; x <= 8; x += 4) {
          context.moveTo(x, -10); context.lineTo(x, -5);
        }
        context.stroke();

        // Main Satellite Bus with Gold MLI insulation
        context.fillStyle = '#d97706';
        context.strokeStyle = '#ffd275';
        context.lineWidth = 0.8;
        context.fillRect(-6, -4, 12, 8);
        context.strokeRect(-6, -4, 12, 8);

        // Deployable Photovoltaic Solar Wing
        context.fillStyle = '#1e3a8a';
        context.strokeStyle = '#38bdf8';
        context.lineWidth = 0.7;
        context.fillRect(-5, 5, 10, 10);
        context.strokeRect(-5, 5, 10, 10);
        // Solar grid cell divider
        context.beginPath();
        context.moveTo(-5, 10); context.lineTo(5, 10);
        context.stroke();

        // Telemetry beacon LED
        const blink = Math.sin(time * 7) > 0;
        context.fillStyle = blink ? '#ffffff' : '#ffa14a';
        context.beginPath();
        context.arc(0, 0, 1.8, 0, Math.PI * 2);
        context.fill();

      } else if (sat.id === 'iss') {
        // --- ISS (ZARYA) Space Station with Integrated Truss Structure ---
        // Central pressurized module core
        context.fillStyle = '#e2e8f0';
        context.strokeStyle = '#94a3b8';
        context.lineWidth = 0.8;
        context.fillRect(-4, -5, 8, 10);
        context.strokeRect(-4, -5, 8, 10);

        // Transverse ITS Truss
        context.strokeStyle = '#cbd5e1';
        context.lineWidth = 1.5;
        context.beginPath();
        context.moveTo(-18, 0); context.lineTo(18, 0);
        context.stroke();

        // Quad Photovoltaic Solar Array Wings (2 Port, 2 Starboard)
        context.fillStyle = '#b45309';
        context.strokeStyle = '#f59e0b';
        context.lineWidth = 0.7;
        // Port Wings
        context.fillRect(-20, -11, 7, 9);
        context.strokeRect(-20, -11, 7, 9);
        context.fillRect(-20, 2, 7, 9);
        context.strokeRect(-20, 2, 7, 9);
        // Starboard Wings
        context.fillRect(13, -11, 7, 9);
        context.strokeRect(13, -11, 7, 9);
        context.fillRect(13, 2, 7, 9);
        context.strokeRect(13, 2, 7, 9);

        // Heat rejection radiators
        context.fillStyle = '#ffffff';
        context.fillRect(-8, -8, 3, 6);
        context.fillRect(5, -8, 3, 6);

        // Station navigation strobes (Green/Emerald)
        const strobe = Math.sin(time * 5) > 0.2;
        context.fillStyle = strobe ? '#ffffff' : '#5cffaa';
        context.beginPath();
        context.arc(-18, 0, 1.6, 0, Math.PI * 2);
        context.arc(18, 0, 1.6, 0, Math.PI * 2);
        context.fill();

      } else {
        // --- ESA SENTINEL-2A (Multispectral Optical Earth Observation) ---
        // Hexagonal stealth bus
        context.fillStyle = '#1e293b';
        context.strokeStyle = '#64748b';
        context.lineWidth = 0.9;
        context.fillRect(-6, -4, 12, 8);
        context.strokeRect(-6, -4, 12, 8);

        // Signature Asymmetric Curved Solar Wing (ESA Sentinel design)
        context.fillStyle = '#0f294a';
        context.strokeStyle = '#36e2ff';
        context.lineWidth = 0.8;
        context.fillRect(7, -3, 14, 6);
        context.strokeRect(7, -3, 14, 6);
        // Solar grid division
        context.beginPath();
        context.moveTo(14, -3); context.lineTo(14, 3);
        context.stroke();

        // Multi-Spectral Instrument (MSI) Optical Camera Barrel
        context.fillStyle = '#38bdf8';
        context.strokeStyle = '#0284c7';
        context.beginPath();
        context.arc(-7, 0, 2.8, 0, Math.PI * 2);
        context.fill();
        context.stroke();

        // Mission beacon
        const blink = Math.sin(time * 6 + 1.5) > 0;
        context.fillStyle = blink ? '#ffffff' : '#36e2ff';
        context.fillRect(-1, -1, 2, 2);
      }

      context.restore();

      // 3. Cybernetic Tactical HUD Callout Badge (with smooth horizon fading)
      const hudAlpha = Math.max(0, Math.min(1, (pt.zCam / pt.a + 0.35) * 2.2));
      if (hudAlpha > 0.05) {
        const isRight = pt.xCam >= 0;
        const isTop = pt.yCam <= -radius * 0.25;
        const dirX = isRight ? 1 : -1;
        const dirY = isTop ? 1 : -1;

        const p1x = satX + dirX * 12;
        const p1y = satY + dirY * 7;
        const p2x = satX + dirX * 26;
        const p2y = Math.max(24, Math.min(h - 36, satY + dirY * 18));
        const p3x = p2x + dirX * 110;
        const p3y = p2y;

        context.save();
        context.globalAlpha = hudAlpha;

        // Angled cybernetic bracket line
        context.beginPath();
        context.strokeStyle = sat.color;
        context.lineWidth = 1.0;
        context.moveTo(p1x, p1y);
        context.lineTo(p2x, p2y);
        context.lineTo(p3x, p3y);
        context.stroke();

        const textX = isRight ? p2x + 4 : p2x - 4;
        context.textAlign = isRight ? 'left' : 'right';

        // Header: Spacecraft Mission Name & Real-time Live Beacon
        context.font = 'bold 8.5px "Share Tech Mono", monospace';
        context.fillStyle = sat.color;
        context.fillText(`[${sat.name}] ● LIVE`, textX, p2y - 4);

        // Sub-satellite Geographic Coordinates
        context.font = '7.5px "Share Tech Mono", monospace';
        context.fillStyle = '#ffffff';
        context.fillText(`LOC: ${geo.latStr}, ${geo.lonStr}`, textX, p2y + 8);

        // Orbit Telemetry & Velocity
        context.font = '7px "Share Tech Mono", monospace';
        context.fillStyle = 'rgba(160, 185, 220, 0.92)';
        context.fillText(`ALT: ${sat.alt} | VEL: ${sat.vel}`, textX, p2y + 17);
        context.restore();
      }
    });

    // =========================================================================
    // LAYER 7: Orbital Telemetry Status Bar
    // =========================================================================
    context.save();
    context.font = '8px "Share Tech Mono", monospace';
    context.fillStyle = 'rgba(138, 147, 166, 0.7)';
    const displayLon = ((effectiveRot * 180 / Math.PI) % 360).toFixed(1);
    const displayLat = (effectivePitch * 60).toFixed(1);
    context.fillText(`LAT: ${displayLat > 0 ? '+' : ''}${displayLat}° | LON: ${displayLon}° | TRACKING: 3 ASSETS [3D KEPLERIAN]`, 10, h - 10);
    context.restore();

    time += 0.014;
    requestAnimationFrame(draw);
  };

  requestAnimationFrame(draw);
}
function initTelemetryBadges() {
  const countEl = document.querySelector('.tracking-count');
  const signalEl = document.querySelector('.signal-status');
  if (!countEl) return;

  let count = 8243;
  setInterval(() => {
    const delta = Math.floor(Math.random() * 7) - 3;
    count = Math.max(8236, Math.min(8252, count + delta));
    countEl.textContent = count.toLocaleString();
  }, 3400);

  if (signalEl) {
    const signals = ['SIGNAL: NOMINAL', 'UPLINK: 99.8%', 'ORBIT: SYNCHRONIZED', 'SIGNAL: NOMINAL'];
    let sigIdx = 0;
    setInterval(() => {
      sigIdx = (sigIdx + 1) % signals.length;
      signalEl.textContent = signals[sigIdx];
    }, 5500);
  }
}

function initIntro() {
  let seen = false;
  try {
    seen = sessionStorage.getItem('og-intro-seen') === '1';
  } catch {}

  if (seen) return;

  const splash = document.createElement('div');
  splash.className = 'intro-splash';
  splash.innerHTML = `
    <div class="intro-ring"></div>
    <div class="intro-logo">SEDS <span>AURORA</span></div>
    <div class="font-mono intro-kicker">// ESTABLISHING UPLINK</div>
    <strong class="font-orbitron">ORBITAL <span>GUARD</span></strong>
    <div class="font-mono intro-subtitle">DECODE THE UNIVERSE</div>
    <div class="intro-progress"></div>
    <div class="font-mono intro-skip">[ PRESS ANY KEY OR CLICK TO SKIP ]</div>
  `;
  document.body.appendChild(splash);

  const close = () => {
    splash.classList.add('dismissed');
    try { sessionStorage.setItem('og-intro-seen', '1'); } catch {}
    setTimeout(() => splash.remove(), 650);
  };

  const timer = setTimeout(close, 1800);
  const skip = () => {
    clearTimeout(timer);
    close();
    window.removeEventListener('keydown', skip);
    window.removeEventListener('click', skip);
    window.removeEventListener('pointerdown', skip);
  };

  window.addEventListener('keydown', skip, { once: true });
  window.addEventListener('click', skip, { once: true });
  window.addEventListener('pointerdown', skip, { once: true });
}

function initRocketCursor() {
  if (matchMedia('(pointer: coarse)').matches) return;

  const cursorRoot = document.createElement('div');
  cursorRoot.className = 'cursor-root cursor-hidden';
  cursorRoot.setAttribute('aria-hidden', 'true');
  cursorRoot.innerHTML = `
    <canvas class="cursor-canvas"></canvas>
    <div class="cursor-reticle">
      <div class="reticle-dot"></div>
      <div class="reticle-ring"></div>
      <div class="reticle-brackets"></div>
      <div class="reticle-badge">TARGET LOCK</div>
    </div>
    <div class="cursor-ship-wrap">
      <svg class="cursor-rocket" viewBox="0 0 36 36" width="38" height="38">
        <defs>
          <linearGradient id="cursorCanopy" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="40%" stop-color="#36e2ff"/>
            <stop offset="100%" stop-color="#093863"/>
          </linearGradient>
          <linearGradient id="cursorHull" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#94a3b8"/>
            <stop offset="30%" stop-color="#f8fafc"/>
            <stop offset="70%" stop-color="#f8fafc"/>
            <stop offset="100%" stop-color="#64748b"/>
          </linearGradient>
          <linearGradient id="cursorWing" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#334155"/>
            <stop offset="60%" stop-color="#1e293b"/>
            <stop offset="100%" stop-color="#0f172a"/>
          </linearGradient>
          <radialGradient id="cursorPlasma" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="50%" stop-color="#36e2ff"/>
            <stop offset="100%" stop-color="#ff7a18"/>
          </radialGradient>
        </defs>

        <!-- Port Wing -->
        <polygon points="15,14 2,27 8,27 15,22" fill="url(#cursorWing)" stroke="#ff7a18" stroke-width="0.8" stroke-linejoin="round"/>
        <!-- Starboard Wing -->
        <polygon points="21,14 34,27 28,27 21,22" fill="url(#cursorWing)" stroke="#ff7a18" stroke-width="0.8" stroke-linejoin="round"/>

        <!-- Wingtip Plasma Emitters -->
        <rect x="2" y="25" width="2" height="3" rx="0.5" fill="#36e2ff"/>
        <rect x="32" y="25" width="2" height="3" rx="0.5" fill="#36e2ff"/>

        <!-- Wing Trim Accent Lines -->
        <line x1="8" y1="21" x2="13.5" y2="24" stroke="rgba(54, 226, 255, 0.7)" stroke-width="0.8"/>
        <line x1="28" y1="21" x2="22.5" y2="24" stroke="rgba(54, 226, 255, 0.7)" stroke-width="0.8"/>

        <!-- Main Stealth Fuselage -->
        <path d="M 18,2 C 16.8,7 14,14 13.5,23 L 13.5,29 L 16.5,29 L 17,25 L 19,25 L 19.5,29 L 22.5,29 L 22.5,23 C 22,14 19.2,7 18,2 Z" 
              fill="url(#cursorHull)" stroke="#38bdf8" stroke-width="0.85" stroke-linejoin="round"/>

        <!-- Center Spine -->
        <line x1="18" y1="4.5" x2="18" y2="22" stroke="#64748b" stroke-width="0.75"/>

        <!-- Cockpit Visor -->
        <polygon points="18,7 16,13 18,17 20,13" fill="url(#cursorCanopy)" stroke="#38bdf8" stroke-width="0.65"/>
        <line x1="17.2" y1="9" x2="16.5" y2="13" stroke="#ffffff" stroke-width="0.7" stroke-linecap="round"/>

        <!-- Dual Plasma Ion Thrusters -->
        <rect x="14" y="28.5" width="2.5" height="2.5" rx="0.6" fill="url(#cursorPlasma)"/>
        <rect x="19.5" y="28.5" width="2.5" height="2.5" rx="0.6" fill="url(#cursorPlasma)"/>
      </svg>
    </div>
  `;
  document.body.appendChild(cursorRoot);

  const canvas = cursorRoot.querySelector('.cursor-canvas');
  const reticle = cursorRoot.querySelector('.cursor-reticle');
  const reticleBadge = cursorRoot.querySelector('.reticle-badge');
  const shipWrap = cursorRoot.querySelector('.cursor-ship-wrap');
  const rocket = cursorRoot.querySelector('.cursor-rocket');
  const ctx = canvas.getContext('2d');

  let mouseX = innerWidth / 2;
  let mouseY = innerHeight / 2;
  let shipX = mouseX;
  let shipY = mouseY;
  let prevX = mouseX;
  let prevY = mouseY;
  let currentAngle = 0;
  let targetAngle = 0;
  let idleTime = 0;
  let isHovering = false;
  let isClicking = false;
  let isOrbitHover = false;
  let particles = [];
  let shockwaves = [];
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let cursorHadDrawables = false;

  const resizeCanvas = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Mouse leave/enter viewport handling
  document.addEventListener('mouseleave', () => {
    cursorRoot.classList.add('cursor-hidden');
  });
  document.addEventListener('mouseenter', () => {
    cursorRoot.classList.remove('cursor-hidden');
  });

  // Pointer position & hover detection
  document.addEventListener('pointermove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorRoot.classList.remove('cursor-hidden');

    // Instant 0ms reticle placement
    reticle.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    // Detect target element directly from event
    const el = e.target;
    const isInput = Boolean(el?.closest('input, textarea, select, [contenteditable="true"]'));
    cursorRoot.classList.toggle('over-input', isInput);

    if (isInput) return;

    const clickable = el?.closest(
      'a, button, [role="button"], .problem-card, .dataset-card, .detail-card, .mission-card, .filter, .tab-btn, .theme-btn, .timeline-dot, .modal-close-btn, .modal-card, .js-register-btn, .team-card, .faq-item, .resource-card, input[type="submit"]'
    );
    const planetEl = el?.closest('.planet-scene, .planet-canvas');
    
    isHovering = Boolean(clickable);
    isOrbitHover = Boolean(planetEl);

    cursorRoot.classList.toggle('cursor-hover', isHovering || isOrbitHover);

    if (reticleBadge) {
      if (isOrbitHover) {
        reticleBadge.textContent = 'ORBIT DRAG';
      } else if (clickable?.classList.contains('js-register-btn')) {
        reticleBadge.textContent = 'RESTRICTED';
      } else if (isHovering) {
        reticleBadge.textContent = 'ENGAGE [L-CLICK]';
      }
    }
  }, { passive: true });

  // Pointer down & click tactile explosion
  document.addEventListener('pointerdown', (e) => {
    if (e.target?.closest?.('input, textarea, select')) return;
    isClicking = true;
    cursorRoot.classList.add('cursor-click');

    // Cybernetic expanding shockwave
    shockwaves.push({
      x: e.clientX,
      y: e.clientY,
      r: 4,
      maxR: 44,
      alpha: 1.0,
      color: isHovering ? '#ff7a18' : '#36e2ff'
    });

    // High velocity burst sparks
    for (let i = 0; i < 14; i++) {
      const spd = Math.random() * 5.5 + 2.5;
      const ang = Math.random() * Math.PI * 2;
      particles.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        r: Math.random() * 2.6 + 1.2,
        life: 1.0,
        decay: Math.random() * 0.05 + 0.035,
        color: Math.random() < 0.55 ? '#ff7a18' : '#36e2ff'
      });
    }
  }, { passive: true });

  document.addEventListener('pointerup', () => {
    isClicking = false;
    cursorRoot.classList.remove('cursor-click');
  }, { passive: true });

  // Shortest angular lerp
  const lerpAngle = (current, target, factor) => {
    let diff = (target - current) % (Math.PI * 2);
    if (diff < -Math.PI) diff += Math.PI * 2;
    if (diff > Math.PI) diff -= Math.PI * 2;
    return current + diff * factor;
  };

  let frameCount = 0;

  const animate = () => {
    frameCount++;
    const vx = mouseX - prevX;
    const vy = mouseY - prevY;
    const speed = Math.hypot(vx, vy);

    // Responsive interceptor tracking
    shipX += (mouseX - shipX) * 0.34;
    shipY += (mouseY - shipY) * 0.34;

    // Aerodynamic flight orientation
    if (speed > 1.2) {
      targetAngle = Math.atan2(vy, vx) + Math.PI / 2;
      idleTime = 0;

      // Dual Ion Thruster Plumes
      const nozzleDist = 16;
      const leftAngle = currentAngle - 0.26;
      const rightAngle = currentAngle + 0.26;

      const p1X = shipX - Math.sin(leftAngle) * nozzleDist;
      const p1Y = shipY + Math.cos(leftAngle) * nozzleDist;
      const p2X = shipX - Math.sin(rightAngle) * nozzleDist;
      const p2Y = shipY + Math.cos(rightAngle) * nozzleDist;

      // Emit from twin nozzles (capped to keep performance high)
      if (particles.length < 50) {
        const emit = (nx, ny) => {
          particles.push({
            x: nx,
            y: ny,
            vx: -Math.sin(currentAngle) * (Math.random() * 3 + 2.5) + (Math.random() - 0.5) * 1.5,
            vy: Math.cos(currentAngle) * (Math.random() * 3 + 2.5) + (Math.random() - 0.5) * 1.5,
            r: Math.random() * 2.6 + 1.2,
            life: 1.0,
            decay: Math.random() * 0.06 + 0.04,
            color: Math.random() < 0.65 ? '#ff7a18' : '#36e2ff'
          });
        };
        emit(p1X, p1Y);
        if (speed > 3) emit(p2X, p2Y);
      }
    } else {
      idleTime += 0.016;
      if (idleTime > 0.35) {
        targetAngle = 0; // Return upright
      }
    }

    const prevAngle = currentAngle;
    currentAngle = lerpAngle(currentAngle, targetAngle, 0.24);
    const angularDiff = (currentAngle - prevAngle);
    const bankRoll = Math.max(-0.4, Math.min(0.4, angularDiff * 3.2));

    prevX = mouseX;
    prevY = mouseY;

    // Hover breathing oscillation
    const idleY = speed < 0.8 ? Math.sin(frameCount * 0.06) * 2.5 : 0;
    const hoverScale = isClicking ? 0.9 : (isHovering || isOrbitHover ? 1.16 : 1.0);

    // Position Aerospace Craft
    shipWrap.style.transform = `translate3d(${shipX}px, ${shipY + idleY}px, 0)`;
    rocket.style.transform = `translate(-50%, -50%) rotate(${currentAngle}rad) skewX(${bankRoll * 18}deg) scale(${hoverScale})`;

    // Draw canvas particles & shockwaves only when active
    const hasDrawables = shockwaves.length > 0 || particles.length > 0;
    if (hasDrawables || cursorHadDrawables) {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      cursorHadDrawables = hasDrawables;
    }

    // Draw Shockwave rings
    for (let i = shockwaves.length - 1; i >= 0; i--) {
      const sw = shockwaves[i];
      sw.r += (sw.maxR - sw.r) * 0.22 + 0.8;
      sw.alpha -= 0.055;

      if (sw.alpha <= 0) {
        shockwaves.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.strokeStyle = sw.color;
      ctx.globalAlpha = sw.alpha;
      ctx.lineWidth = 2.0;
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
      ctx.stroke();

      // Outer faint aura
      ctx.lineWidth = 4.0;
      ctx.globalAlpha = sw.alpha * 0.3;
      ctx.stroke();
      ctx.restore();
    }

    // Draw Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      p.r = Math.max(0.2, p.r * 0.93);

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life * 0.9;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(animate);
  };

  animate();
}

function initRegistrationModal() {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'modal-closed-title');
  modal.innerHTML = `
    <div class="modal-card">
      <button class="modal-close-btn" type="button" aria-label="Close dialog">&times;</button>
      <div class="modal-status-badge">
        <span class="modal-status-dot"></span>
        <span>REGISTRATION WINDOW TERMINATED</span>
      </div>
      <h2 id="modal-closed-title" class="modal-title">REGISTRATION <span>CLOSED</span></h2>
      <p class="modal-desc">Cadet enrollments for Orbital Guard 2026 have reached maximum orbital capacity. All mission slots are officially locked.</p>
      <div class="modal-info-box">
        <div class="modal-info-row">
          <span>MISSION STATUS:</span>
          <strong>CAPACITY EXCEEDED [100%]</strong>
        </div>
        <div class="modal-info-row">
          <span>TELEMETRY SLOTS:</span>
          <strong style="color: #ff5533;">LOCKED</strong>
        </div>
        <div class="modal-info-row">
          <span>EVENT:</span>
          <strong>VTAPP 2026 × SEDS AURORA</strong>
        </div>
      </div>
      <div class="modal-actions">
        <button class="modal-ack-btn" type="button">ACKNOWLEDGE [CLOSE]</button>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    const closeBtn = modal.querySelector('.modal-close-btn');
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  // Close event handlers
  modal.querySelector('.modal-close-btn')?.addEventListener('click', closeModal);
  modal.querySelector('.modal-ack-btn')?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Intercept any clicks on register triggers across the application
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.js-register-btn, .nav-register, [href*="events.vitap.ac.in"]');
    if (btn) {
      e.preventDefault();
      openModal(e);
    }
  });
}


function initFloatingRocketLaunch() {
  // Create the floating launchpad dock in the bottom-right corner
  const dock = document.createElement('div');
  dock.className = 'floating-launch-dock';
  dock.setAttribute('role', 'button');
  dock.setAttribute('aria-label', 'Launch Heavy Orbital Rocket');
  dock.innerHTML = `
    <div class="launch-tooltip">
      <span class="launch-status-dot"></span>
      <span class="tooltip-text">CLICK TO LAUNCH</span>
    </div>
    <div class="launch-gantry-arm left"></div>
    <div class="launch-gantry-arm right"></div>
    <div class="launch-vehicle-wrap">
      <svg class="launch-rocket-svg" viewBox="0 0 44 120">
        <defs>
          <linearGradient id="fairingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#cbd5e1"/>
            <stop offset="30%" stop-color="#ffffff"/>
            <stop offset="70%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#94a3b8"/>
          </linearGradient>
          <linearGradient id="boosterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#94a3b8"/>
            <stop offset="25%" stop-color="#f8fafc"/>
            <stop offset="75%" stop-color="#f8fafc"/>
            <stop offset="100%" stop-color="#64748b"/>
          </linearGradient>
          <linearGradient id="loxLine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#ffa14a"/>
            <stop offset="100%" stop-color="#ff7a18"/>
          </linearGradient>
          <linearGradient id="nozzleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#475569"/>
            <stop offset="70%" stop-color="#1e293b"/>
            <stop offset="100%" stop-color="#ff7a18"/>
          </linearGradient>
        </defs>

        <!-- Titanium Aerodynamic Nose Tip -->
        <polygon points="22,3 20,8 24,8" fill="#38bdf8"/>

        <!-- Payload Fairing (Nosecone) -->
        <path d="M 22,8 C 17,14 14,21 14,28 L 30,28 C 30,21 27,14 22,8 Z" fill="url(#fairingGrad)" stroke="#64748b" stroke-width="0.75"/>
        <!-- Fairing Center Seam Line -->
        <line x1="22" y1="8" x2="22" y2="28" stroke="#cbd5e1" stroke-width="0.5"/>
        <!-- Mission Insignia -->
        <polygon points="22,14 18.5,21 22,19.5 25.5,21" fill="#36e2ff"/>

        <!-- Second Stage -->
        <rect x="14" y="28" width="16" height="22" fill="url(#fairingGrad)" stroke="#64748b" stroke-width="0.75"/>
        <!-- Thermal Band -->
        <rect x="14" y="36" width="16" height="3" fill="#1e293b"/>
        <line x1="16" y1="43" x2="28" y2="43" stroke="#36e2ff" stroke-width="0.8"/>

        <!-- Interstage Lattice Adapter -->
        <rect x="14.5" y="50" width="15" height="8" fill="#1e293b" stroke="#475569" stroke-width="0.6"/>
        <line x1="17" y1="50" x2="17" y2="58" stroke="#64748b" stroke-width="0.6"/>
        <line x1="22" y1="50" x2="22" y2="58" stroke="#64748b" stroke-width="0.6"/>
        <line x1="27" y1="50" x2="27" y2="58" stroke="#64748b" stroke-width="0.6"/>

        <!-- Stage 1 Core Booster -->
        <rect x="14" y="58" width="16" height="46" fill="url(#boosterGrad)" stroke="#64748b" stroke-width="0.75"/>
        <!-- Cryogenic Fuel Feed Line -->
        <rect x="19.5" y="58" width="2.2" height="44" fill="url(#loxLine)"/>
        <!-- Aerospace Hull Markings -->
        <rect x="14" y="70" width="4" height="2" fill="#ff7a18"/>
        <rect x="26" y="70" width="4" height="2" fill="#ff7a18"/>

        <!-- Titanium Steering Grid Fins -->
        <rect x="8.5" y="60" width="5.5" height="7" rx="1" fill="#334155" stroke="#94a3b8" stroke-width="0.6"/>
        <rect x="30" y="60" width="5.5" height="7" rx="1" fill="#334155" stroke="#94a3b8" stroke-width="0.6"/>

        <!-- Engine Aft Skirt -->
        <polygon points="14,104 12,109 32,109 30,104" fill="#1e293b" stroke="#475569" stroke-width="0.75"/>

        <!-- Quad Rocket Engine Nozzle Bells -->
        <rect x="13.5" y="109" width="3.2" height="5.5" rx="0.5" fill="url(#nozzleGrad)"/>
        <rect x="18" y="109" width="3.2" height="5.5" rx="0.5" fill="url(#nozzleGrad)"/>
        <rect x="22.8" y="109" width="3.2" height="5.5" rx="0.5" fill="url(#nozzleGrad)"/>
        <rect x="27.3" y="109" width="3.2" height="5.5" rx="0.5" fill="url(#nozzleGrad)"/>
      </svg>
    </div>
    <div class="launch-pad-base">
      <div class="pad-hull"></div>
      <div class="pad-repulsor-glow"></div>
    </div>
  `;
  document.body.appendChild(dock);

  // Dedicated Launch Simulation Canvas (Fixed overlay)
  const canvas = document.createElement('canvas');
  canvas.className = 'launch-sim-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  // Mission Toast Banner
  const toast = document.createElement('div');
  toast.className = 'launch-mission-toast';
  toast.innerHTML = `
    <span>🚀</span>
    <span>ORBITAL INSERTION CONFIRMED // PAYLOAD DEPLOYED: <span class="highlight">LEO [418 KM]</span></span>
  `;
  document.body.appendChild(toast);

  const vehicleWrap = dock.querySelector('.launch-vehicle-wrap');
  const tooltipText = dock.querySelector('.tooltip-text');

  let isLaunching = false;
  let particles = [];
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  const resizeCanvas = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Intermittent cryogenic LOX venting when idle on pad
  setInterval(() => {
    if (isLaunching) return;
    const rect = vehicleWrap.getBoundingClientRect();
    const ventX = rect.left + rect.width * 0.5;
    const ventY = rect.top + rect.height * 0.44;

    for (let i = 0; i < 4; i++) {
      particles.push({
        type: 'smoke',
        x: ventX + (Math.random() - 0.5) * 6,
        y: ventY,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -Math.random() * 1.5 - 0.5,
        r: Math.random() * 2 + 1.5,
        maxR: Math.random() * 8 + 6,
        alpha: 0.55,
        decay: 0.025,
        color: 'rgba(215, 235, 255,'
      });
    }
  }, 1800);

  // Click Trigger Launch
  dock.addEventListener('click', () => {
    if (isLaunching) return;
    triggerRealisticLaunch();
  });

  function triggerRealisticLaunch() {
    isLaunching = true;
    dock.classList.add('is-launching');
    tooltipText.textContent = 'IGNITION SEQUENCE';

    const rect = vehicleWrap.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    // Hide static rocket on pad
    vehicleWrap.style.opacity = '0';

    // Flying rocket state
    let rx = startX;
    let ry = startY;
    let vy = 0;
    let accel = 0.05;
    let frame = 0;
    let altitude = 0; // km
    let velocity = 0; // km/s

    // Camera rumble container
    const appShell = document.querySelector('.app-shell') || document.body;

    const launchLoop = () => {
      frame++;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Phase 1: Pre-launch Main Engine Ignition & Hold-Down (Frames 0 to 45, ~0.75s)
      if (frame < 45) {
        // Micro vibrations on pad
        rx = startX + (Math.random() - 0.5) * 1.8;
        ry = startY + (Math.random() - 0.5) * 1.2;

        // Billowing ignition blast smoke clouds spreading horizontally
        for (let i = 0; i < 6; i++) {
          const spreadDir = Math.random() < 0.5 ? -1 : 1;
          particles.push({
            type: 'blastSmoke',
            x: startX + (Math.random() - 0.5) * 12,
            y: startY + 54,
            vx: spreadDir * (Math.random() * 5 + 3),
            vy: -Math.random() * 2.5 - 0.5,
            r: Math.random() * 6 + 6,
            maxR: Math.random() * 32 + 24,
            alpha: 0.85,
            decay: 0.02,
            color: Math.random() < 0.35 ? 'rgba(255, 122, 24,' : 'rgba(200, 215, 235,'
          });
        }

        // Ignition sparks
        for (let i = 0; i < 5; i++) {
          const ang = Math.random() * Math.PI + Math.PI;
          const spd = Math.random() * 6 + 3;
          particles.push({
            type: 'spark',
            x: startX + (Math.random() - 0.5) * 10,
            y: startY + 54,
            vx: Math.cos(ang) * spd,
            vy: Math.sin(ang) * spd,
            r: Math.random() * 2 + 1,
            alpha: 1.0,
            decay: 0.045,
            color: Math.random() < 0.5 ? '#ff7a18' : '#ffffff'
          });
        }

        // Screen rumble
        const shake = (Math.random() - 0.5) * 3;
        appShell.style.transform = `translate3d(0, ${shake}px, 0)`;
      } 
      // Phase 2: Liftoff & Atmospheric Ascent (Frame 45+)
      else {
        // Accelerating ascent physics
        accel += 0.007;
        vy += accel;
        ry -= vy;
        altitude += vy * 0.18;
        velocity = (vy * 0.22).toFixed(2);

        // Tower clear sound/rumble decay
        if (frame < 120) {
          const shake = (Math.random() - 0.5) * Math.max(0.5, 3.5 - (frame - 45) * 0.04);
          appShell.style.transform = `translate3d(0, ${shake}px, 0)`;
        } else {
          appShell.style.transform = '';
        }

        // Generate supersonic rocket exhaust plume
        const nozzleX = rx;
        const nozzleY = ry + 54;

        // Billowing trail smoke particles
        for (let i = 0; i < 4; i++) {
          particles.push({
            type: 'smoke',
            x: nozzleX + (Math.random() - 0.5) * 12,
            y: nozzleY + Math.random() * 10,
            vx: (Math.random() - 0.5) * (vy * 0.35 + 2),
            vy: Math.random() * 3 + 2,
            r: Math.random() * 6 + 5,
            maxR: Math.random() * 45 + 30,
            alpha: 0.78,
            decay: 0.015,
            color: 'rgba(210, 225, 245,'
          });
        }

        // Fire sparks in exhaust
        for (let i = 0; i < 6; i++) {
          particles.push({
            type: 'spark',
            x: nozzleX + (Math.random() - 0.5) * 10,
            y: nozzleY + Math.random() * 15,
            vx: (Math.random() - 0.5) * 3.5,
            vy: Math.random() * 7 + 4,
            r: Math.random() * 2.2 + 1,
            alpha: 1.0,
            decay: 0.035,
            color: Math.random() < 0.6 ? '#ff7a18' : '#ffe17d'
          });
        }

        // Phase 3: Transonic Prandtl-Glauert Condensation Vapor Shockwave (at mid-altitude)
        if (frame >= 85 && frame <= 105) {
          particles.push({
            type: 'vaporCone',
            x: rx,
            y: ry - 20,
            r: 12 + (frame - 85) * 2.8,
            maxR: 70,
            alpha: 0.7,
            decay: 0.06
          });
        }
      }

      // Draw all smoke and blast particles behind rocket
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        if (p.type === 'blastSmoke' || p.type === 'smoke') {
          p.x += p.vx;
          p.y += p.vy;
          p.r += (p.maxR - p.r) * 0.08;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          const grad = ctx.createRadialGradient(p.x, p.y, p.r * 0.15, p.x, p.y, p.r);
          grad.addColorStop(0, `${p.color}${p.alpha})`);
          grad.addColorStop(0.6, `${p.color}${p.alpha * 0.45})`);
          grad.addColorStop(1, `${p.color}0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

        } else if (p.type === 'spark') {
          p.x += p.vx;
          p.y += p.vy;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();

        } else if (p.type === 'vaporCone') {
          p.r += 3.5;
          p.alpha -= p.decay;

          if (p.alpha <= 0) {
            particles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.strokeStyle = 'rgba(220, 245, 255, ' + p.alpha + ')';
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.r, p.r * 0.45, 0, 0, Math.PI * 2);
          ctx.stroke();

          // Outer shock aura
          ctx.strokeStyle = 'rgba(54, 226, 255, ' + (p.alpha * 0.5) + ')';
          ctx.lineWidth = 5;
          ctx.stroke();
          ctx.restore();
        }
      }

      // Draw Engine Supersonic Flame Column & Mach Shock Diamonds
      if (frame >= 40 && ry > -150) {
        const flameLen = Math.min(180, 50 + vy * 8);
        const nozzleX = rx;
        const nozzleY = ry + 54;

        ctx.save();
        // Supersonic flame plume gradient
        const flameGrad = ctx.createLinearGradient(nozzleX, nozzleY, nozzleX, nozzleY + flameLen);
        flameGrad.addColorStop(0, '#ffffff');
        flameGrad.addColorStop(0.12, 'rgba(54, 226, 255, 0.95)');
        flameGrad.addColorStop(0.35, '#ffe566');
        flameGrad.addColorStop(0.65, '#ff7a18');
        flameGrad.addColorStop(0.9, 'rgba(255, 40, 0, 0.5)');
        flameGrad.addColorStop(1, 'rgba(255, 40, 0, 0)');

        ctx.fillStyle = flameGrad;
        ctx.beginPath();
        ctx.moveTo(nozzleX - 9, nozzleY);
        ctx.quadraticCurveTo(nozzleX - 16, nozzleY + flameLen * 0.5, nozzleX, nozzleY + flameLen);
        ctx.quadraticCurveTo(nozzleX + 16, nozzleY + flameLen * 0.5, nozzleX + 9, nozzleY);
        ctx.closePath();
        ctx.fill();

        // Mach Shock Diamonds
        const diamonds = 4;
        for (let d = 1; d <= diamonds; d++) {
          const dy = nozzleY + (flameLen * 0.7) * (d / (diamonds + 1));
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.beginPath();
          ctx.moveTo(nozzleX, dy - 5);
          ctx.lineTo(nozzleX + 3.5, dy);
          ctx.lineTo(nozzleX, dy + 5);
          ctx.lineTo(nozzleX - 3.5, dy);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      // Draw Flying Rocket Vehicle itself on Canvas
      if (ry > -120) {
        ctx.save();
        ctx.translate(rx, ry);

        // Rocket Body Render:
        // Fairing
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -56);
        ctx.quadraticCurveTo(9, -40, 9, -28);
        ctx.lineTo(-9, -28);
        ctx.quadraticCurveTo(-9, -40, 0, -56);
        ctx.fill();
        ctx.stroke();

        // Titanium Nose tip
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.moveTo(0, -60);
        ctx.lineTo(3, -55);
        ctx.lineTo(-3, -55);
        ctx.fill();

        // Second Stage
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(-9, -28, 18, 22);
        ctx.strokeRect(-9, -28, 18, 22);
        // Thermal stripe
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(-9, -20, 18, 3.5);

        // Interstage lattice
        ctx.fillStyle = '#334155';
        ctx.fillRect(-8.5, -6, 17, 8);
        ctx.strokeRect(-8.5, -6, 17, 8);

        // Main Core Booster (Stage 1)
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(-9, 2, 18, 44);
        ctx.strokeRect(-9, 2, 18, 44);

        // Orange LOX Feedline
        ctx.fillStyle = '#ff7a18';
        ctx.fillRect(-1.2, 2, 2.4, 42);

        // Titanium Grid Fins
        ctx.fillStyle = '#334155';
        ctx.fillRect(-15, 4, 6, 7);
        ctx.fillRect(9, 4, 6, 7);

        // Engine Aft Skirt
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        ctx.moveTo(-9, 46);
        ctx.lineTo(-12, 51);
        ctx.lineTo(12, 51);
        ctx.lineTo(9, 46);
        ctx.fill();

        // Engine Nozzle bells
        ctx.fillStyle = '#ff9b44';
        ctx.fillRect(-7.5, 51, 3.5, 5);
        ctx.fillRect(-3, 51, 3.5, 5);
        ctx.fillRect(1.5, 51, 3.5, 5);
        ctx.fillRect(6, 51, 3.5, 5);

        // Live Telemetry HUD Tag (Follows rocket ascent)
        if (frame > 45) {
          ctx.font = 'bold 8.5px "Share Tech Mono", monospace';
          ctx.fillStyle = '#36e2ff';
          ctx.textAlign = 'left';
          ctx.fillText(`ALT: ${altitude.toFixed(1)} KM`, 22, -18);
          ctx.font = '7.5px "Share Tech Mono", monospace';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`VEL: ${velocity} KM/S`, 22, -8);
          ctx.fillStyle = '#ffa14a';
          ctx.fillText(`MAX-Q: NOMINAL`, 22, 2);
        }

        ctx.restore();
      }

      // Check if rocket has reached orbital altitude (flown past top edge)
      if (ry <= -120 && particles.length === 0) {
        // Show celebratory toast
        toast.classList.add('is-active');

        setTimeout(() => {
          toast.classList.remove('is-active');

          // Reset launchpad dock: new rocket rolls in
          dock.classList.remove('is-launching');
          vehicleWrap.style.transform = 'translateY(25px) scale(0.8)';
          vehicleWrap.style.opacity = '0';

          setTimeout(() => {
            vehicleWrap.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            vehicleWrap.style.transform = 'translateY(0) scale(1)';
            vehicleWrap.style.opacity = '1';
            tooltipText.textContent = 'CLICK TO LAUNCH';
            isLaunching = false;
          }, 300);
        }, 3200);

        return; // Stop animation loop
      }

      requestAnimationFrame(launchLoop);
    };

    requestAnimationFrame(launchLoop);
  }
}


function initRound2Countdown() {
  const box = document.getElementById('round2-box');
  const lockedView = document.getElementById('round2-locked-view');
  const unlockedView = document.getElementById('round2-unlocked-view');
  const statusPill = document.getElementById('round2-status-pill');
  const statusTxt = document.getElementById('round2-status-txt');

  const elDays = document.getElementById('r2-days');
  const elHours = document.getElementById('r2-hours');
  const elMinutes = document.getElementById('r2-minutes');
  const elSeconds = document.getElementById('r2-seconds');

  if (!box || !lockedView || !unlockedView || !elDays || !elHours || !elMinutes || !elSeconds) return;

  function getTargetTime() {
    const urlParams = new URLSearchParams(window.location.search);
    const override = urlParams.get('round2');
    if (override === 'unlock' || override === 'unlocked' || override === 'now') {
      return Date.now() - 1000;
    }
    if (override === '10s') {
      return Date.now() + 10000;
    }
    if (override === '60s') {
      return Date.now() + 60000;
    }

    const now = new Date();
    // 11 September 2026, 14:30:00 local time
    const eventTarget = new Date(2026, 8, 11, 14, 30, 0, 0);

    // If current system date is on or around the event (Sept 2026):
    if (now.getFullYear() === 2026 && now.getMonth() === 8 && now.getDate() <= 11) {
      return eventTarget.getTime();
    }

    // Otherwise target tomorrow 14:30:00 local time:
    const tomorrowTarget = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 14, 30, 0, 0);
    return tomorrowTarget.getTime();
  }

  const targetTime = getTargetTime();
  let timerId = null;

  function update() {
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      // Completed! Switch to unlocked view
      lockedView.style.display = 'none';
      unlockedView.style.display = 'flex';
      box.classList.add('is-unlocked');
      if (statusPill) statusPill.classList.add('is-unlocked');
      if (statusTxt) statusTxt.textContent = 'STAGE 02 UNLOCKED // EVALUATION ACTIVE';

      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      }
      return;
    }

    // Counting down
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    elDays.textContent = String(days).padStart(2, '0');
    elHours.textContent = String(hours).padStart(2, '0');
    elMinutes.textContent = String(minutes).padStart(2, '0');
    elSeconds.textContent = String(seconds).padStart(2, '0');
  }

  update();
  timerId = setInterval(update, 1000);
}

// Boot application
renderApp();
initStarfield();
initPlanetScene();
initTelemetryBadges();
initScrollReveal();
initIntro();
initRocketCursor();
initRegistrationModal();
initFloatingRocketLaunch();
initRound2Countdown();
