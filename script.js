(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================================================
     PAGE 1 — EVASIVE "NO" BUTTON
  ========================================================= */
  const page1 = document.getElementById('page1');
  const page2 = document.getElementById('page2');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const questionBox = document.querySelector('.box-question');

  let noHasMoved = false;

  function moveNoButton() {
    // Not literally impossible to catch — small chance it just sits still.
    if (Math.random() < 0.14) return;

    const padding = 14;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Switch to fixed positioning (relative to viewport) the first time it dodges.
    if (!noHasMoved) {
      const rect = noBtn.getBoundingClientRect();
      noBtn.classList.add('escaping');
      noBtn.style.left = rect.left + 'px';
      noBtn.style.top = rect.top + 'px';
      // force reflow so the transition applies to the *next* move, not this one
      void noBtn.offsetWidth;
      noHasMoved = true;
    }

    const bw = noBtn.offsetWidth || 100;
    const bh = noBtn.offsetHeight || 48;

    const qRect = questionBox.getBoundingClientRect();
    const safeTop = Math.max(qRect.bottom + 20, vh * 0.42); // never over the question
    const maxTop = vh - bh - padding;
    const minTop = Math.min(safeTop, maxTop - 10);

    const maxLeft = Math.max(padding, vw - bw - padding);

    const left = padding + Math.random() * (maxLeft - padding);
    const top = minTop + Math.random() * Math.max(10, maxTop - minTop);

    noBtn.style.left = left + 'px';
    noBtn.style.top = top + 'px';
  }

  function resetPage1() {
    // Simplest, most reliable reset per spec: reload the page.
    window.location.reload();
  }

  // Desktop: dodge as soon as the pointer approaches (before a click can land).
  noBtn.addEventListener('pointerenter', (e) => {
    if (e.pointerType === 'mouse') moveNoButton();
  });

  // Mobile + mouse: dodge on press-down too.
  noBtn.addEventListener('pointerdown', () => {
    moveNoButton();
  });

  // If a click still lands (rare, by design), treat it as "No" pressed.
  noBtn.addEventListener('click', () => {
    resetPage1();
  });

  yesBtn.addEventListener('click', goToPage2);

  function goToPage2() {
    // iOS requires requesting motion permission inside a direct user gesture.
    requestMotionPermission();

    page1.classList.add('fade-out');
    setTimeout(() => {
      page1.classList.add('hidden');
      page1.setAttribute('aria-hidden', 'true');

      page2.classList.remove('hidden');
      page2.removeAttribute('aria-hidden');
      // force reflow before adding the fade-in class so the transition plays
      void page2.offsetWidth;
      page2.classList.add('fade-in');

      startPage2();
    }, prefersReducedMotion ? 50 : 550);
  }

  /* =========================================================
     PAGE 2 — STARS + GLOWING PARTICLES (canvas)
  ========================================================= */
  const canvas = document.getElementById('skyCanvas');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let particles = [];
  let skyAnimId = null;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function buildSky() {
    resizeCanvas();
    const starCount = Math.min(120, Math.floor((canvas.width * canvas.height) / 9000));
    stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.3 + 0.3,
      phase: Math.random() * Math.PI * 2,
      speed: 0.015 + Math.random() * 0.02,
    }));

    particles = Array.from({ length: 6 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 30 + Math.random() * 50,
      dx: (Math.random() - 0.5) * 0.06,
      dy: -0.05 - Math.random() * 0.08,
      alpha: 0.03 + Math.random() * 0.05,
    }));
  }

  let t = 0;
  function drawSky() {
    t += 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // soft cosmic depth vignette
    const grad = ctx.createRadialGradient(
      canvas.width / 2, canvas.height * 0.4, 0,
      canvas.width / 2, canvas.height * 0.4, Math.max(canvas.width, canvas.height) * 0.7
    );
    grad.addColorStop(0, 'rgba(40,20,60,0.35)');
    grad.addColorStop(1, 'rgba(5,4,12,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // glowing particles
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.y < -p.r) p.y = canvas.height + p.r;
      if (p.x < -p.r) p.x = canvas.width + p.r;
      if (p.x > canvas.width + p.r) p.x = -p.r;

      const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
      pg.addColorStop(0, `rgba(255,220,240,${p.alpha})`);
      pg.addColorStop(1, 'rgba(255,220,240,0)');
      ctx.fillStyle = pg;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // twinkling stars
    stars.forEach(s => {
      const twinkle = 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
      ctx.fillStyle = `rgba(255,255,255,${twinkle})`;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });

    skyAnimId = requestAnimationFrame(drawSky);
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!page2.classList.contains('hidden')) buildSky();
    }, 150);
  });

  /* =========================================================
     PAGE 2 — FALLING FRANGIPANI FLOWERS
  ========================================================= */
  const flowerLayer = document.getElementById('flowerLayer');
  let flowerTimer = null;

  function frangipaniSVG(hue) {
    // Simple 5-petal flower with a warm center, built from rotated ellipses.
    const petalColor = hue;
    let petals = '';
    for (let i = 0; i < 5; i++) {
      const angle = i * 72;
      petals += `<ellipse cx="20" cy="9" rx="7" ry="11" fill="${petalColor}" opacity="0.92" transform="rotate(${angle} 20 20)"/>`;
    }
    return `<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      ${petals}
      <circle cx="20" cy="20" r="4.2" fill="#ffd66b"/>
    </svg>`;
  }

  const petalPalette = ['#fff6f0', '#ffeef7', '#fff0e6', '#fdf2ff'];

  function spawnFlower(intensity) {
    const el = document.createElement('div');
    el.className = 'flower';

    const size = 16 + Math.random() * 20;
    const left = Math.random() * 100;
    const sway = (Math.random() - 0.5) * 140;
    const spin = 160 + Math.random() * 260 * (Math.random() < 0.5 ? 1 : -1);
    const baseDuration = 8.5 - intensity * 4.5; // faster when shaking
    const duration = Math.max(2.6, baseDuration + Math.random() * 3);
    const opacity = 0.55 + Math.random() * 0.4;
    const color = petalPalette[Math.floor(Math.random() * petalPalette.length)];

    el.style.left = left + 'vw';
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.opacity = opacity;
    el.style.setProperty('--sway', sway + 'px');
    el.style.setProperty('--spin', spin + 'deg');
    el.style.setProperty('--fall-distance', '112vh');
    el.style.animationDuration = duration + 's';
    el.innerHTML = frangipaniSVG(color);

    el.addEventListener('animationend', () => el.remove());
    flowerLayer.appendChild(el);
  }

  function flowerLoop() {
    const intensity = shakeIntensity; // 0..1
    const count = prefersReducedMotion ? 1 : 1 + Math.round(intensity * 3);
    for (let i = 0; i < count; i++) spawnFlower(intensity);

    const baseInterval = prefersReducedMotion ? 900 : 420;
    const interval = Math.max(90, baseInterval - intensity * 320);
    flowerTimer = setTimeout(flowerLoop, interval);
  }

  /* =========================================================
     PAGE 2 — PHONE SHAKE DETECTION
  ========================================================= */
  let shakeIntensity = 0; // smoothed 0..1, drives flower rate/speed
  let lastAcc = null;
  let lastMotionTime = 0;

  function handleMotion(event) {
    const acc = event.accelerationIncludingGravity || event.acceleration;
    if (!acc || acc.x === null) return;

    const now = Date.now();
    if (now - lastMotionTime < 90) return; // throttle sampling
    lastMotionTime = now;

    if (lastAcc) {
      const delta =
        Math.abs(acc.x - lastAcc.x) +
        Math.abs(acc.y - lastAcc.y) +
        Math.abs(acc.z - lastAcc.z);

      const threshold = 14; // ignore small jitters / normal handling
      if (delta > threshold) {
        const bump = Math.min(0.35, (delta - threshold) / 70);
        shakeIntensity = Math.min(1, shakeIntensity + bump);
      }
    }
    lastAcc = { x: acc.x, y: acc.y, z: acc.z };
  }

  function decayLoop() {
    shakeIntensity *= 0.965; // gradual return to normal
    if (shakeIntensity < 0.01) shakeIntensity = 0;
    requestAnimationFrame(decayLoop);
  }

  function requestMotionPermission() {
    const DME = window.DeviceMotionEvent;
    if (DME && typeof DME.requestPermission === 'function') {
      DME.requestPermission()
        .then(state => {
          if (state === 'granted') {
            window.addEventListener('devicemotion', handleMotion);
          }
          // if denied or errors: silently continue with normal flowers
        })
        .catch(() => { /* no technical errors shown to the user */ });
    } else if ('DeviceMotionEvent' in window) {
      window.addEventListener('devicemotion', handleMotion);
    }
    // if unsupported entirely: normal animation continues, nothing to do
  }

  /* =========================================================
     PAGE 2 — INIT + TEXT REVEAL SEQUENCE
  ========================================================= */
  let page2Started = false;

  function startPage2() {
    if (page2Started) return;
    page2Started = true;

    buildSky();
    drawSky();
    decayLoop();
    flowerLoop();

    setTimeout(() => {
      document.getElementById('knewIt').classList.add('moved-up');
      document.getElementById('bengaliText').classList.remove('hidden');
      requestAnimationFrame(() => {
        document.getElementById('bengaliText').classList.add('show');
      });
    }, 5000);

    // fade the shake hint out after a while so it doesn't linger forever
    setTimeout(() => {
      const hint = document.getElementById('shakeHint');
      if (hint) hint.style.opacity = '0';
    }, 9000);
  }
})();
