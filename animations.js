/**
 * SAIT Animation System — animations.js
 * Premium Tech Animation System for SAIT (Students Association of Information Technology)
 * SOE, CUSAT — Cochin University of Science and Technology
 * Theme: Ivory + Navy Blue + Warm Gold
 * Palette: #F8F4EA (Ivory), #082B4C (Deep Navy), #0B355C (Navy Blue), #174A73 (Mid Navy), #B58A3A (Warm Gold), #D0AA5B (Soft Gold)
 */

(function () {
  'use strict';

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. CINEMATIC CODED SAIT INTRO CONTROLLER (HTML / CSS / JS — REAL SAIT LOGO)
     ========================================================================== */
  const IntroSequenceController = {
    overlay: null,
    canvas: null,
    ctx: null,
    skipBtn: null,
    progressBar: null,
    logoOrbit: null,
    textCluster: null,
    animId: null,
    startTime: null,
    duration: 4800, // 4.8 seconds sequence
    isDismissed: false,
    particles: [],
    circuits: [],
    width: 0,
    height: 0,

    init() {
      this.overlay = document.getElementById('saitIntroOverlay');
      if (!this.overlay) {
        this.triggerHeroEntrance();
        return;
      }

      this.skipBtn = document.getElementById('introSkipBtn');
      this.progressBar = document.getElementById('introProgressBar');
      this.canvas = document.getElementById('introCanvas');
      this.logoOrbit = document.getElementById('introLogoOrbit');
      this.textCluster = document.getElementById('introTextCluster');

      // Accessibility: Respect prefers-reduced-motion
      if (prefersReducedMotion) {
        setTimeout(() => this.dismiss(true), 400);
        return;
      }

      this.overlay.classList.remove('intro-exit', 'intro-hidden');
      this.overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('intro-active');

      // Skip button listener
      if (this.skipBtn) {
        this.skipBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.dismiss(false);
        });
      }

      // Keyboard Esc to skip
      const keyHandler = (e) => {
        if (e.key === 'Escape') {
          this.dismiss(false);
          window.removeEventListener('keydown', keyHandler);
        }
      };
      window.addEventListener('keydown', keyHandler);

      // Initialize Intro Canvas
      this.initCanvas();

      // Start Sequence Timer & Animation Loop
      this.startTime = performance.now();
      this.tick();
    },

    initCanvas() {
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) return;

      this.resize();
      window.addEventListener('resize', () => this.resize(), { passive: true });

      // Generate subtle tech particles
      const count = window.innerWidth < 768 ? 24 : 45;
      this.particles = [];
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.8 + 0.8,
          alpha: Math.random() * 0.5 + 0.25,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulsePhase: Math.random() * Math.PI * 2,
          isGold: Math.random() > 0.82
        });
      }

      // Generate circuit lines
      const circuitCount = window.innerWidth < 768 ? 6 : 14;
      this.circuits = [];
      for (let i = 0; i < circuitCount; i++) {
        const startY = Math.random() * this.height;
        const segmentLen = Math.random() * 180 + 120;
        const startX = Math.random() * this.width;
        this.circuits.push({
          startX,
          startY,
          midX: startX + segmentLen * (Math.random() > 0.5 ? 1 : -1),
          midY: startY + (Math.random() - 0.5) * 100,
          endX: startX + segmentLen * 1.8 * (Math.random() > 0.5 ? 1 : -1),
          pulseProgress: Math.random(),
          speed: Math.random() * 0.005 + 0.003,
          isGold: Math.random() > 0.75
        });
      }
    },

    resize() {
      if (!this.canvas) return;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    },

    tick() {
      if (this.isDismissed) return;

      if (!this.startTime) {
        this.startTime = performance.now();
      }

      const now = performance.now();
      const elapsed = Math.max(now - this.startTime, 0);
      const progress = Math.min(elapsed / this.duration, 1);

      // Update progress bar
      if (this.progressBar) {
        this.progressBar.style.width = (progress * 100) + '%';
      }

      // Stage 1: Reveal SAIT Logo Orbit with scale, fade & glow
      if (elapsed >= 300 && this.logoOrbit && !this.logoOrbit.classList.contains('revealed')) {
        this.logoOrbit.classList.add('revealed');
      }

      // Stage 2: Reveal Large SAIT Title & Academic Gold Divider
      if (elapsed >= 1200 && this.textCluster && !this.textCluster.classList.contains('show-title')) {
        this.textCluster.classList.add('show-title');
      }

      // Stage 3: Reveal Subtitle (Students Association of Information Technology)
      if (elapsed >= 2200 && this.textCluster && !this.textCluster.classList.contains('show-subtitle')) {
        this.textCluster.classList.add('show-subtitle');
      }

      // Stage 4: Light sweep sheen through SAIT text & logo
      if (elapsed >= 3300 && this.textCluster && !this.textCluster.classList.contains('show-sweep')) {
        this.textCluster.classList.add('show-sweep');
      }

      // Draw Intro Canvas Frame
      this.drawCanvas(elapsed);

      // Sequence completed -> transition to homepage
      if (progress >= 1) {
        this.dismiss(false);
        return;
      }

      this.animId = requestAnimationFrame(() => this.tick());
    },

    drawCanvas(time) {
      if (!this.ctx || !this.width || !this.height) return;
      const ctx = this.ctx;
      const t = time * 0.001;

      ctx.clearRect(0, 0, this.width, this.height);

      // 1. Slow Moving Ambient Blue & Gold Light Nodes
      const glow1X = this.width * (0.5 + 0.18 * Math.cos(t * 0.7));
      const glow1Y = this.height * (0.45 + 0.14 * Math.sin(t * 0.5));
      const g1 = ctx.createRadialGradient(glow1X, glow1Y, 10, glow1X, glow1Y, this.width * 0.45);
      g1.addColorStop(0, 'rgba(0, 140, 255, 0.14)');
      g1.addColorStop(0.5, 'rgba(8, 43, 76, 0.08)');
      g1.addColorStop(1, 'transparent');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, this.width, this.height);

      const glow2X = this.width * (0.5 + 0.15 * Math.sin(t * 0.8));
      const glow2Y = this.height * (0.52 + 0.12 * Math.cos(t * 0.6));
      const g2 = ctx.createRadialGradient(glow2X, glow2Y, 5, glow2X, glow2Y, this.width * 0.35);
      g2.addColorStop(0, 'rgba(208, 170, 91, 0.09)');
      g2.addColorStop(0.6, 'rgba(8, 43, 76, 0.04)');
      g2.addColorStop(1, 'transparent');
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, this.width, this.height);

      // 2. Circuit Traces & Traveling Energy Pulses
      for (let c of this.circuits) {
        c.pulseProgress = (c.pulseProgress + c.speed) % 1;

        // Trace line
        ctx.beginPath();
        ctx.moveTo(c.startX, c.startY);
        ctx.lineTo(c.midX, c.startY);
        ctx.lineTo(c.endX, c.midY);
        ctx.strokeStyle = c.isGold ? 'rgba(208, 170, 91, 0.08)' : 'rgba(0, 210, 255, 0.07)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Traveling pulse point
        const px = c.startX + (c.endX - c.startX) * c.pulseProgress;
        const py = c.startY + (c.midY - c.startY) * c.pulseProgress;
        ctx.beginPath();
        ctx.arc(px, py, c.isGold ? 2.2 : 1.8, 0, Math.PI * 2);
        ctx.fillStyle = c.isGold ? 'rgba(208, 170, 91, 0.7)' : 'rgba(0, 210, 255, 0.75)';
        ctx.shadowColor = c.isGold ? '#D0AA5B' : '#00D2FF';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Subtle Floating Particles & Interconnecting Gossamer Threads
      const maxConnDist = window.innerWidth < 768 ? 75 : 110;
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        // Move particle
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = this.width;
        if (p.x > this.width) p.x = 0;
        if (p.y < 0) p.y = this.height;
        if (p.y > this.height) p.y = 0;

        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.alpha * (0.7 + 0.3 * Math.sin(p.pulsePhase));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isGold ? `rgba(208, 170, 91, ${currentAlpha})` : `rgba(0, 210, 255, ${currentAlpha})`;
        ctx.fill();

        // Connection lines
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnDist) {
            const lineAlpha = (1 - dist / maxConnDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 210, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
    },

    dismiss(immediate) {
      if (this.isDismissed) return;
      this.isDismissed = true;

      if (!this.overlay) return;

      if (immediate) {
        if (this.animId) cancelAnimationFrame(this.animId);
        this.overlay.classList.add('intro-hidden');
        this.overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('intro-active');
        this.triggerHeroEntrance();
        return;
      }

      // Smooth cinematic exit transition (0.5s)
      this.overlay.classList.add('intro-exit');
      let exitFrames = 0;
      const totalExitFrames = 30; // ~500ms

      const exitStep = () => {
        exitFrames++;
        if (exitFrames >= totalExitFrames) {
          if (this.animId) cancelAnimationFrame(this.animId);
          if (this.overlay) {
            this.overlay.classList.add('intro-hidden');
            this.overlay.setAttribute('aria-hidden', 'true');
          }
          document.body.classList.remove('intro-active');
          this.triggerHeroEntrance();
          return;
        }
        this.animId = requestAnimationFrame(exitStep);
      };
      this.animId = requestAnimationFrame(exitStep);

      // Safe fallback timeout
      setTimeout(() => {
        if (this.overlay && !this.overlay.classList.contains('intro-hidden')) {
          this.overlay.classList.add('intro-hidden');
          this.overlay.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('intro-active');
          this.triggerHeroEntrance();
        }
      }, 550);
    },

    triggerHeroEntrance() {
      const heroBrand = document.getElementById('heroBrandTitle');
      if (heroBrand) {
        heroBrand.classList.add('hero-brand-animate');
      }
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.classList.add('hero-content-animate');
      }
    }
  };

  /* ==========================================================================
     2. LIVE TECHNOLOGY BACKGROUND (CIRCUITS, PARTICLES, AMBIENT GLOW & GOLD STREAKS)
     ========================================================================== */
  const AmbientCanvasSystem = {
    canvas: null,
    ctx: null,
    particles: [],
    circuits: [],
    goldStreak: null,
    nextStreakTime: 0,
    animId: null,
    width: 0,
    height: 0,
    dpr: 1,
    isRunning: false,
    mouse: { x: -1000, y: -1000, active: false },
    time: 0,

    isDarkTheme() {
      return document.documentElement.getAttribute('data-theme') === 'dark';
    },

    init() {
      this.canvas = document.getElementById('ambientCanvas');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) return;

      this.resize();

      if (prefersReducedMotion) {
        this.initEntities();
        this.drawStatic();
        return;
      }

      this.initEntities();
      this.bindEvents();
      this.start();
    },

    resize() {
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.canvas.width = this.width * this.dpr;
      this.canvas.height = this.height * this.dpr;
      this.canvas.style.width = this.width + 'px';
      this.canvas.style.height = this.height + 'px';

      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(this.dpr, this.dpr);
    },

    initEntities() {
      const isMobile = this.width < 768;
      const isTablet = this.width < 1024;
      const dark = this.isDarkTheme();

      // 1. Subtle Floating Particles
      this.particles = [];
      const pCount = isMobile ? 16 : isTablet ? 26 : 38;
      const colors = dark ? [
        { r: 0,   g: 180, b: 255 }, // Tech Cyan
        { r: 208, g: 170, b: 91 },  // Soft Gold
        { r: 23,  g: 74,  b: 115 }, // Mid Navy
        { r: 248, g: 244, b: 234 }  // Light Ivory
      ] : [
        { r: 8,   g: 43,  b: 76 },  // Primary Navy
        { r: 23,  g: 74,  b: 115 }, // Mid Navy
        { r: 181, g: 138, b: 58 },  // Warm Gold
        { r: 208, g: 170, b: 91 }   // Soft Gold
      ];

      for (let i = 0; i < pCount; i++) {
        const c = colors[Math.floor(Math.random() * colors.length)];
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.20 : 0.28),
          vy: (Math.random() - 0.5) * (isMobile ? 0.20 : 0.28),
          radius: Math.random() * 1.4 + 1.1,
          color: c,
          baseAlpha: Math.random() * 0.25 + 0.15,
          alpha: 0.2,
          pulseSpeed: Math.random() * 0.018 + 0.010,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }

      // 2. Architectural PCB Circuit Lines
      this.circuits = [];
      const cCount = isMobile ? 5 : isTablet ? 8 : 12;
      const gridSize = 64;

      for (let i = 0; i < cCount; i++) {
        // Generate orthogonal circuit traces
        const gx = Math.floor(Math.random() * (this.width / gridSize)) * gridSize;
        const gy = Math.floor(Math.random() * (this.height / gridSize)) * gridSize;
        const dir = Math.random() > 0.5 ? 1 : -1;
        const hLen = (Math.floor(Math.random() * 3) + 2) * gridSize * dir;
        const vLen = (Math.floor(Math.random() * 2) + 1) * gridSize * (Math.random() > 0.5 ? 1 : -1);

        const p0 = { x: gx, y: gy };
        const p1 = { x: gx + hLen, y: gy };
        const p2 = { x: gx + hLen, y: gy + vLen };

        const seg1Len = Math.abs(hLen);
        const seg2Len = Math.abs(vLen);
        const totalLen = seg1Len + seg2Len;

        this.circuits.push({
          p0, p1, p2,
          seg1Len, seg2Len, totalLen,
          speed: Math.random() * 0.35 + 0.35, // slow, dignified speed
          dist: Math.random() * totalLen,
          pulseLen: Math.random() * 25 + 35,
          active: true
        });
      }

      // Streak timer
      this.nextStreakTime = Date.now() + 4000;
    },

    bindEvents() {
      let resizeTimer = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.resize();
          this.initEntities();
        }, 150);
      }, { passive: true });

      // Listen for theme toggle to update colors smoothly
      const observer = new MutationObserver(() => {
        this.initEntities();
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
      });

      // Mouse tracking
      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.mouse.active = true;
      }, { passive: true });

      window.addEventListener('mouseleave', () => {
        this.mouse.active = false;
        this.mouse.x = -1000;
        this.mouse.y = -1000;
      });

      // Tab visibility
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stop();
        } else {
          this.start();
        }
      });
    },

    start() {
      if (this.isRunning) return;
      this.isRunning = true;
      const loop = (timestamp) => {
        this.render(timestamp);
        this.animId = requestAnimationFrame(loop);
      };
      this.animId = requestAnimationFrame(loop);
    },

    stop() {
      this.isRunning = false;
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
    },

    // Compute point along 2-segment circuit path
    getPointOnCircuit(c, d) {
      if (d <= c.seg1Len) {
        const t = d / c.seg1Len;
        return {
          x: c.p0.x + (c.p1.x - c.p0.x) * t,
          y: c.p0.y
        };
      } else {
        const t = (d - c.seg1Len) / c.seg2Len;
        return {
          x: c.p1.x,
          y: c.p1.y + (c.p2.y - c.p1.y) * t
        };
      }
    },

    render(timestamp) {
      this.time = timestamp || performance.now();
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;
      const dark = this.isDarkTheme();

      ctx.clearRect(0, 0, w, h);

      // -------------------------------------------------------------
      // 1. Slow Blue Ambient Light Movement
      // -------------------------------------------------------------
      const t = this.time;
      const glow1X = w * (0.28 + 0.12 * Math.sin(t * 0.00035));
      const glow1Y = h * (0.32 + 0.08 * Math.cos(t * 0.00030));
      const glow1R = Math.min(w, h) * 0.42;

      const grad1 = ctx.createRadialGradient(glow1X, glow1Y, 0, glow1X, glow1Y, glow1R);
      if (dark) {
        grad1.addColorStop(0, 'rgba(0, 180, 255, 0.075)');
        grad1.addColorStop(0.5, 'rgba(11, 53, 92, 0.035)');
        grad1.addColorStop(1, 'transparent');
      } else {
        grad1.addColorStop(0, 'rgba(11, 53, 92, 0.055)');
        grad1.addColorStop(0.5, 'rgba(23, 74, 115, 0.025)');
        grad1.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, w, h);

      const glow2X = w * (0.72 + 0.14 * Math.cos(t * 0.00028));
      const glow2Y = h * (0.65 + 0.10 * Math.sin(t * 0.00038));
      const glow2R = Math.min(w, h) * 0.46;

      const grad2 = ctx.createRadialGradient(glow2X, glow2Y, 0, glow2X, glow2Y, glow2R);
      if (dark) {
        grad2.addColorStop(0, 'rgba(17, 74, 115, 0.065)');
        grad2.addColorStop(0.6, 'rgba(3, 15, 28, 0.03)');
        grad2.addColorStop(1, 'transparent');
      } else {
        grad2.addColorStop(0, 'rgba(8, 43, 76, 0.045)');
        grad2.addColorStop(0.6, 'rgba(241, 235, 221, 0.02)');
        grad2.addColorStop(1, 'transparent');
      }
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, w, h);

      // -------------------------------------------------------------
      // 2. Slowly Moving Circuit Lines & Data Packets
      // -------------------------------------------------------------
      const traceColor = dark ? 'rgba(0, 180, 255, 0.09)' : 'rgba(8, 43, 76, 0.08)';
      const nodeColor = dark ? 'rgba(0, 180, 255, 0.22)' : 'rgba(181, 138, 58, 0.22)';
      const pulseBaseColor = dark ? 'rgba(0, 210, 255,' : 'rgba(181, 138, 58,';

      const cLen = this.circuits.length;
      for (let i = 0; i < cLen; i++) {
        const c = this.circuits[i];

        // Draw circuit trace lines
        ctx.beginPath();
        ctx.moveTo(c.p0.x, c.p0.y);
        ctx.lineTo(c.p1.x, c.p1.y);
        ctx.lineTo(c.p2.x, c.p2.y);
        ctx.strokeStyle = traceColor;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Solder pad terminals at start, turn, and end
        ctx.beginPath();
        ctx.arc(c.p0.x, c.p0.y, 2, 0, Math.PI * 2);
        ctx.arc(c.p1.x, c.p1.y, 2, 0, Math.PI * 2);
        ctx.arc(c.p2.x, c.p2.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Advance pulse
        c.dist += c.speed;
        if (c.dist > c.totalLen) {
          c.dist = 0;
        }

        // Draw moving light pulse packet
        const headPt = this.getPointOnCircuit(c, c.dist);
        const tailDist = Math.max(0, c.dist - c.pulseLen);
        const tailPt = this.getPointOnCircuit(c, tailDist);

        const pulseGrad = ctx.createLinearGradient(tailPt.x, tailPt.y, headPt.x, headPt.y);
        pulseGrad.addColorStop(0, `${pulseBaseColor} 0)`);
        pulseGrad.addColorStop(0.7, `${pulseBaseColor} 0.35)`);
        pulseGrad.addColorStop(1, `${pulseBaseColor} 0.85)`);

        ctx.beginPath();
        ctx.moveTo(tailPt.x, tailPt.y);
        if (c.dist > c.seg1Len && tailDist < c.seg1Len) {
          ctx.lineTo(c.p1.x, c.p1.y);
        }
        ctx.lineTo(headPt.x, headPt.y);
        ctx.strokeStyle = pulseGrad;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Head glowing dot
        ctx.beginPath();
        ctx.arc(headPt.x, headPt.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `${pulseBaseColor} 0.95)`;
        ctx.fill();
      }

      // -------------------------------------------------------------
      // 3. Occasional Subtle Gold Light Streaks
      // -------------------------------------------------------------
      const now = Date.now();
      if (!this.goldStreak && now > this.nextStreakTime && cLen > 0) {
        const picked = this.circuits[Math.floor(Math.random() * cLen)];
        this.goldStreak = {
          circuit: picked,
          progress: 0,
          speed: 0.007, // ~2.4 seconds duration
          streakLen: 65
        };
      }

      if (this.goldStreak) {
        const gs = this.goldStreak;
        gs.progress += gs.speed;

        if (gs.progress >= 1) {
          this.goldStreak = null;
          this.nextStreakTime = now + (Math.random() * 3000 + 6000); // next in 6-9s
        } else {
          const headDist = gs.progress * gs.circuit.totalLen;
          const tailDist = Math.max(0, headDist - gs.streakLen);
          const headPt = this.getPointOnCircuit(gs.circuit, headDist);
          const tailPt = this.getPointOnCircuit(gs.circuit, tailDist);

          // Alpha fade in & out curve
          const streakAlpha = Math.sin(gs.progress * Math.PI) * (dark ? 0.9 : 0.75);

          const streakGrad = ctx.createLinearGradient(tailPt.x, tailPt.y, headPt.x, headPt.y);
          streakGrad.addColorStop(0, 'rgba(181, 138, 58, 0)');
          streakGrad.addColorStop(0.6, `rgba(181, 138, 58, ${streakAlpha * 0.5})`);
          streakGrad.addColorStop(1, `rgba(208, 170, 91, ${streakAlpha})`);

          ctx.beginPath();
          ctx.moveTo(tailPt.x, tailPt.y);
          if (headDist > gs.circuit.seg1Len && tailDist < gs.circuit.seg1Len) {
            ctx.lineTo(gs.circuit.p1.x, gs.circuit.p1.y);
          }
          ctx.lineTo(headPt.x, headPt.y);
          ctx.strokeStyle = streakGrad;
          ctx.lineWidth = 2.4;
          ctx.stroke();

          // Golden pulse halo at head
          ctx.beginPath();
          ctx.arc(headPt.x, headPt.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(208, 170, 91, ${streakAlpha})`;
          ctx.shadowColor = 'rgba(208, 170, 91, 0.8)';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      }

      // -------------------------------------------------------------
      // 4. Subtle Floating Particles
      // -------------------------------------------------------------
      const isMobile = w < 768;
      const maxConnectDist = isMobile ? 80 : 115;
      const maxConnectDistSq = maxConnectDist * maxConnectDist;
      const mouseDistThreshold = isMobile ? 90 : 130;
      const mouseDistSq = mouseDistThreshold * mouseDistThreshold;
      const connectColorBase = dark ? 'rgba(0, 180, 255,' : 'rgba(8, 43, 76,';

      const pLen = this.particles.length;
      for (let i = 0; i < pLen; i++) {
        const p = this.particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;

        if (this.mouse.active) {
          const dx = p.x - this.mouse.x;
          const dy = p.y - this.mouse.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < mouseDistSq && dSq > 0) {
            const force = (1 - Math.sqrt(dSq) / mouseDistThreshold) * 0.7;
            p.x += (dx / Math.sqrt(dSq)) * force * 1.2;
            p.y += (dy / Math.sqrt(dSq)) * force * 1.2;
          }
        }

        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.08;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${Math.max(0.06, p.alpha)})`;
        ctx.fill();

        for (let j = i + 1; j < pLen; j++) {
          const p2 = this.particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const ldSq = ldx * ldx + ldy * ldy;

          if (ldSq < maxConnectDistSq) {
            const dist = Math.sqrt(ldSq);
            const lineAlpha = (1 - dist / maxConnectDist) * (dark ? 0.09 : 0.07);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${connectColorBase} ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }
    },

    drawStatic() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.width, this.height);
      this.particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.baseAlpha})`;
        ctx.fill();
      });
    }
  };

  /* ==========================================================================
     3. MOUSE & TOUCH CURSOR GLOW CONTROLLER
     ========================================================================== */
  const CursorGlowController = {
    glowEl: null,
    currX: -500,
    currY: -500,
    targetX: -500,
    targetY: -500,
    rafId: null,
    isActive: false,

    init() {
      this.glowEl = document.getElementById('cursorAmbientGlow');
      if (!this.glowEl) return;

      if (prefersReducedMotion) return;

      // Check for fine pointer (desktop mouse)
      const hasFinePointer = window.matchMedia && window.matchMedia('(pointer: fine)').matches;

      if (hasFinePointer) {
        window.addEventListener('mousemove', (e) => {
          this.targetX = e.clientX;
          this.targetY = e.clientY;
          if (!this.isActive) {
            this.isActive = true;
            this.currX = this.targetX;
            this.currY = this.targetY;
            this.glowEl.classList.add('active');
            this.startLoop();
          }
        }, { passive: true });

        window.addEventListener('mouseleave', () => {
          this.glowEl.classList.remove('active');
          this.isActive = false;
          if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
          }
        });
      } else {
        // Touch device
        let touchTimeout = null;
        window.addEventListener('touchstart', (e) => {
          if (e.touches && e.touches[0]) {
            this.targetX = e.touches[0].clientX;
            this.targetY = e.touches[0].clientY;
            this.glowEl.style.transform = `translate3d(${this.targetX}px, ${this.targetY}px, 0)`;
            this.glowEl.classList.add('active');
            clearTimeout(touchTimeout);
          }
        }, { passive: true });

        window.addEventListener('touchmove', (e) => {
          if (e.touches && e.touches[0]) {
            this.targetX = e.touches[0].clientX;
            this.targetY = e.touches[0].clientY;
            this.glowEl.style.transform = `translate3d(${this.targetX}px, ${this.targetY}px, 0)`;
          }
        }, { passive: true });

        window.addEventListener('touchend', () => {
          touchTimeout = setTimeout(() => {
            this.glowEl.classList.remove('active');
          }, 600);
        });
      }
    },

    startLoop() {
      const step = () => {
        if (!this.isActive) return;
        // Smooth LERP interpolation
        this.currX += (this.targetX - this.currX) * 0.14;
        this.currY += (this.targetY - this.currY) * 0.14;

        this.glowEl.style.transform = `translate3d(${this.currX}px, ${this.currY}px, 0)`;
        this.rafId = requestAnimationFrame(step);
      };
      this.rafId = requestAnimationFrame(step);
    }
  };

  /* ==========================================================================
     4. HERO VISUAL 3D PARALLAX & ARCHITECTURAL LOGO STAGE
     ========================================================================== */
  const HeroVisualController = {
    heroSection: null,
    orbitalStage: null,
    targetRotX: 0,
    targetRotY: 0,
    currRotX: 0,
    currRotY: 0,
    rafId: null,

    init() {
      this.heroSection = document.getElementById('home');
      this.orbitalStage = document.getElementById('heroOrbitalStage');
      if (!this.heroSection || !this.orbitalStage) return;

      if (prefersReducedMotion || window.innerWidth < 992) return;

      this.heroSection.addEventListener('mousemove', (e) => {
        const rect = this.heroSection.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const normX = (e.clientX - centerX) / (rect.width / 2);
        const normY = (e.clientY - centerY) / (rect.height / 2);

        // Subtle architectural tilt (max 6 degrees)
        this.targetRotY = normX * 6;
        this.targetRotX = -normY * 6;

        if (!this.rafId) {
          this.startLoop();
        }
      }, { passive: true });

      this.heroSection.addEventListener('mouseleave', () => {
        this.targetRotX = 0;
        this.targetRotY = 0;
      });
    },

    startLoop() {
      const step = () => {
        this.currRotX += (this.targetRotX - this.currRotX) * 0.08;
        this.currRotY += (this.targetRotY - this.currRotY) * 0.08;

        if (this.orbitalStage) {
          this.orbitalStage.style.transform =
            `perspective(1100px) rotateX(${this.currRotX.toFixed(2)}deg) rotateY(${this.currRotY.toFixed(2)}deg)`;
        }

        // Stop loop when close to zero
        if (
          Math.abs(this.targetRotX - this.currRotX) < 0.01 &&
          Math.abs(this.targetRotY - this.currRotY) < 0.01 &&
          this.targetRotX === 0 && this.targetRotY === 0
        ) {
          if (this.orbitalStage) {
            this.orbitalStage.style.transform = '';
          }
          this.rafId = null;
          return;
        }

        this.rafId = requestAnimationFrame(step);
      };
      this.rafId = requestAnimationFrame(step);
    }
  };

  /* ==========================================================================
     5. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const ScrollRevealController = {
    init() {
      if (prefersReducedMotion) {
        document.querySelectorAll('.scroll-reveal').forEach(el => el.classList.add('revealed'));
        return;
      }

      // Collect target elements for reveal
      const targets = [
        '.section-header',
        '.stat-strip-card',
        '.feature-card',
        '.event-flagship-card',
        '.flagship-card',
        '.event-card',
        '.announcement-item',
        '.achievement-card',
        '.person-card',
        '.alumni-card',
        '.resource-card',
        '.career-card',
        '.contact-card',
        '.cta-banner-content',
        '.about-visual',
        '.about-info-col'
      ];

      const elements = document.querySelectorAll(targets.join(', '));
      if (!elements.length) return;

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      elements.forEach((el) => {
        el.classList.add('scroll-reveal');

        // Check if element is already in the viewport on load
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('revealed');
        } else {
          observer.observe(el);
        }
      });
    }
  };

  /* ==========================================================================
     6. CARD HOVER SHEEN & SUBTLE INTERACTIONS
     ========================================================================== */
  const CardInteractionsController = {
    init() {
      if (prefersReducedMotion) return;

      const cards = document.querySelectorAll('.feature-card, .stat-strip-card, .event-card, .person-card, .alumni-card, .resource-card');

      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty('--mouse-x', `${x.toFixed(1)}%`);
          card.style.setProperty('--mouse-y', `${y.toFixed(1)}%`);
        }, { passive: true });
      });
    }
  };

  /* ==========================================================================
     7. ABOUT PAGE MOTION & SCROLL REVEAL CONTROLLER
     ========================================================================== */
  const AboutPageMotionController = {
    aboutSection: null,
    imageFrame: null,
    isListeningScroll: false,
    rafId: null,

    init() {
      this.aboutSection = document.getElementById('about');
      if (!this.aboutSection) return;

      this.imageFrame = document.getElementById('aboutImageFrame');

      if (prefersReducedMotion) {
        this.revealAllInstantly();
        return;
      }

      this.initScrollObservers();
      this.initParallax();
      this.initCardInteractions();
      this.initSmoothScrollButtons();
    },

    revealAllInstantly() {
      const selectors = [
        '.about-reveal-block',
        '.about-reveal-up',
        '.about-reveal-left',
        '.about-reveal-right',
        '.stagger-card',
        '.stagger-why',
        '.journey-stage-node'
      ];
      document.querySelectorAll(selectors.join(', ')).forEach(el => {
        el.classList.add('revealed', 'illuminated');
      });

      const drawLine = document.getElementById('whoWeAreDrawLine');
      if (drawLine) drawLine.classList.add('drawn');

      const vmConnector = document.getElementById('vmConnector');
      if (vmConnector) vmConnector.classList.add('connected');

      const trackFill = document.getElementById('journeyTrackFill');
      if (trackFill) {
        trackFill.style.width = '100%';
        trackFill.style.height = '100%';
      }
    },

    initScrollObservers() {
      // 1. Hero Header Staggered Reveal
      const heroHeader = document.getElementById('aboutHeroHeader');
      if (heroHeader) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              heroHeader.classList.add('revealed');
              obs.unobserve(heroHeader);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        obs.observe(heroHeader);
      }

      // 2. Together Towards Technology (Split Left & Right with Stagger)
      const showcaseGrid = document.getElementById('aboutShowcase');
      if (showcaseGrid) {
        const leftCol = showcaseGrid.querySelector('.about-reveal-left');
        const rightCol = showcaseGrid.querySelector('.about-reveal-right');

        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (leftCol) leftCol.classList.add('revealed');
              setTimeout(() => {
                if (rightCol) rightCol.classList.add('revealed');
              }, 140);
              obs.unobserve(showcaseGrid);
            }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
        obs.observe(showcaseGrid);
      }

      // 3. Who We Are Section & Self-Drawing Line
      const whoWeAre = document.getElementById('who-we-are');
      if (whoWeAre) {
        const drawLine = document.getElementById('whoWeAreDrawLine');
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              whoWeAre.querySelectorAll('.about-reveal-up').forEach((el, i) => {
                setTimeout(() => el.classList.add('revealed'), i * 120);
              });
              setTimeout(() => {
                if (drawLine) drawLine.classList.add('drawn');
              }, 300);
              obs.unobserve(whoWeAre);
            }
          });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
        obs.observe(whoWeAre);
      }

      // 4. What We Do (Sequential 6-Card Stagger Reveal)
      const whatWeDo = document.getElementById('what-we-do');
      if (whatWeDo) {
        const header = whatWeDo.querySelector('.about-reveal-up');
        const cards = whatWeDo.querySelectorAll('.stagger-card');

        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (header) header.classList.add('revealed');
              cards.forEach((card, idx) => {
                setTimeout(() => {
                  card.classList.add('revealed');
                }, 160 + idx * 110);
              });
              obs.unobserve(whatWeDo);
            }
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        obs.observe(whatWeDo);
      }

      // 5. Vision & Mission Section with Dynamic Connector
      const visionMission = document.getElementById('about-vision-mission');
      if (visionMission) {
        const header = visionMission.querySelector('.about-reveal-up');
        const visionCard = visionMission.querySelector('.vision-card');
        const missionCard = visionMission.querySelector('.mission-card');
        const vmConnector = document.getElementById('vmConnector');

        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (header) header.classList.add('revealed');
              setTimeout(() => {
                if (visionCard) visionCard.classList.add('revealed');
              }, 120);
              setTimeout(() => {
                if (missionCard) missionCard.classList.add('revealed');
              }, 220);
              setTimeout(() => {
                if (vmConnector) vmConnector.classList.add('connected');
              }, 600);
              obs.unobserve(visionMission);
            }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        obs.observe(visionMission);
      }

      // 6. Why SAIT Section (4-Card Sequential Stagger Reveal)
      const whySait = document.getElementById('why-sait');
      if (whySait) {
        const header = whySait.querySelector('.about-reveal-up');
        const cards = whySait.querySelectorAll('.stagger-why');

        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (header) header.classList.add('revealed');
              cards.forEach((card, idx) => {
                setTimeout(() => {
                  card.classList.add('revealed');
                }, 150 + idx * 110);
              });
              obs.unobserve(whySait);
            }
          });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
        obs.observe(whySait);
      }

      // 7. SAIT Journey Section (Progressive Line & Node Illumination)
      const journey = document.getElementById('about-journey');
      if (journey) {
        const header = journey.querySelector('.about-reveal-up');
        const trackFill = document.getElementById('journeyTrackFill');
        const nodes = journey.querySelectorAll('.journey-stage-node');

        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              if (header) header.classList.add('revealed');

              const isMobile = window.innerWidth < 900;
              if (trackFill) {
                if (isMobile) {
                  trackFill.style.height = '100%';
                } else {
                  trackFill.style.width = '100%';
                }
              }

              nodes.forEach((node, idx) => {
                setTimeout(() => {
                  node.classList.add('illuminated');
                }, 200 + idx * 240);
              });

              obs.unobserve(journey);
            }
          });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        obs.observe(journey);
      }

      // 8. Faculty Leadership (Preserved cards)
      const faculty = document.getElementById('about-faculty');
      if (faculty) {
        const obs = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const items = faculty.querySelectorAll('.about-reveal-up');
              items.forEach((item, idx) => {
                setTimeout(() => item.classList.add('revealed'), idx * 120);
              });
              obs.unobserve(faculty);
            }
          });
        }, { threshold: 0.05, rootMargin: '0px 0px 80px 0px' });
        obs.observe(faculty);
      }
    },

    initParallax() {
      if (!this.imageFrame || window.innerWidth < 768) return;

      const showcase = document.getElementById('aboutShowcase');
      if (!showcase) return;

      let ticking = false;

      const updateParallax = () => {
        const rect = showcase.getBoundingClientRect();
        // Check if showcase is in or near the viewport
        if (rect.bottom > -100 && rect.top < window.innerHeight + 100) {
          const centerY = window.innerHeight / 2;
          const showcaseCenter = rect.top + rect.height / 2;
          const diff = (showcaseCenter - centerY) * -0.035;
          // Clamp to range -12px to 12px
          const clamped = Math.max(-12, Math.min(12, diff));
          this.imageFrame.style.transform = `translate3d(0, ${clamped.toFixed(1)}px, 0)`;
        }
        ticking = false;
      };

      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      }, { passive: true });
    },

    initCardInteractions() {
      const cards = document.querySelectorAll('.what-card, .why-card, .vm-card');
      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty('--mouse-x', `${x.toFixed(1)}%`);
          card.style.setProperty('--mouse-y', `${y.toFixed(1)}%`);
        }, { passive: true });
      });
    },

    initSmoothScrollButtons() {
      const knowMoreBtn = document.getElementById('aboutKnowMoreBtn');
      if (knowMoreBtn) {
        knowMoreBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById('who-we-are');
          if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        });
      }

      const exploreBtn = document.querySelector('.about-explore-btn');
      if (exploreBtn) {
        exploreBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById('about-journey');
          if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        });
      }
    }
  };

  /* ==========================================================================
     8. EVENTS MOTION CONTROLLER (FEATURED SLIDER, DRAG, AUTO-SLIDE & REVEALS)
     ========================================================================== */
  const EventsMotionController = {
    sliderSection: null,
    viewport: null,
    track: null,
    slides: [],
    prevBtn: null,
    nextBtn: null,
    dots: [],
    progressBar: null,
    currNumEl: null,
    totalNumEl: null,
    heroHeader: null,
    eventsGrid: null,

    currentIndex: 0,
    totalSlides: 0,
    autoSlideDuration: 6000,
    progressAnimId: null,
    progressStartTime: null,
    isPaused: false,
    isDragging: false,
    dragStartX: 0,
    dragDeltaX: 0,
    currentTranslate: 0,

    init() {
      this.sliderSection = document.getElementById('featuredEventsSlider');
      if (!this.sliderSection) return;

      this.viewport = document.getElementById('eventsCarouselViewport');
      this.track = document.getElementById('eventsCarouselTrack');
      this.slides = Array.from(this.sliderSection.querySelectorAll('.featured-slide-card'));
      this.prevBtn = document.getElementById('sliderPrevBtn');
      this.nextBtn = document.getElementById('sliderNextBtn');
      this.dots = Array.from(this.sliderSection.querySelectorAll('.slider-dot'));
      this.progressBar = document.getElementById('sliderProgressBar');
      this.currNumEl = document.getElementById('sliderCurrNum');
      this.totalNumEl = document.getElementById('sliderTotalNum');
      this.heroHeader = document.getElementById('eventsHeroHeader');
      this.eventsGrid = document.getElementById('eventsGridContainer');

      if (!this.viewport || !this.track || this.slides.length === 0) return;

      this.totalSlides = this.slides.length;
      if (this.totalNumEl) {
        this.totalNumEl.textContent = String(this.totalSlides).padStart(2, '0');
      }

      this.setupControls();
      this.setupGestures();
      this.setupCardSheen();
      this.setupScrollReveal();

      // Initial layout positioning
      window.requestAnimationFrame(() => {
        this.updatePosition(false);
        if (!prefersReducedMotion) {
          this.startProgressBar();
        }
      });

      // Window resize handling (debounced)
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.updatePosition(false);
        }, 120);
      }, { passive: true });

      // Page visibility handling
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.pauseAutoSlide();
        } else if (!this.isPaused && !prefersReducedMotion) {
          this.startProgressBar();
        }
      });
    },

    setupControls() {
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.prev();
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.next();
        });
      }

      this.dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
          if (!isNaN(targetIdx) && targetIdx !== this.currentIndex) {
            this.goToSlide(targetIdx);
          }
        });
      });

      // Keyboard navigation on viewport
      if (this.viewport) {
        this.viewport.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.prev();
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            this.next();
          }
        });
      }

      // Hover pause on slider area
      this.sliderSection.addEventListener('mouseenter', () => {
        this.pauseAutoSlide();
      });

      this.sliderSection.addEventListener('mouseleave', () => {
        if (!this.isDragging) {
          this.resumeAutoSlide();
        }
      });
    },

    setupGestures() {
      if (!this.viewport) return;

      const onStart = (clientX) => {
        this.isDragging = true;
        this.dragStartX = clientX;
        this.dragDeltaX = 0;
        this.pauseAutoSlide();
        this.track.style.transition = 'none';
      };

      const onMove = (clientX) => {
        if (!this.isDragging) return;
        this.dragDeltaX = clientX - this.dragStartX;
        // Rubber-band / resistance effect
        const liveOffset = this.currentTranslate + (this.dragDeltaX * 0.75);
        this.track.style.transform = `translateX(${liveOffset.toFixed(1)}px)`;
      };

      const onEnd = () => {
        if (!this.isDragging) return;
        this.isDragging = false;
        const threshold = 55;
        if (this.dragDeltaX < -threshold) {
          this.next();
        } else if (this.dragDeltaX > threshold) {
          this.prev();
        } else {
          this.updatePosition(true);
        }
        this.resumeAutoSlide();
      };

      // Pointer Events
      this.viewport.addEventListener('pointerdown', (e) => {
        // Only primary click / touch
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        onStart(e.clientX);
      });

      window.addEventListener('pointermove', (e) => {
        if (this.isDragging) {
          onMove(e.clientX);
        }
      });

      window.addEventListener('pointerup', () => {
        if (this.isDragging) {
          onEnd();
        }
      });

      window.addEventListener('pointercancel', () => {
        if (this.isDragging) {
          onEnd();
        }
      });

      // Touch events fallback for mobile gestures
      this.viewport.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length === 1) {
          onStart(e.touches[0].clientX);
        }
      }, { passive: true });

      this.viewport.addEventListener('touchmove', (e) => {
        if (this.isDragging && e.touches && e.touches.length === 1) {
          onMove(e.touches[0].clientX);
        }
      }, { passive: true });

      this.viewport.addEventListener('touchend', () => {
        if (this.isDragging) {
          onEnd();
        }
      }, { passive: true });
    },

    setupCardSheen() {
      this.slides.forEach((slide) => {
        slide.addEventListener('mousemove', (e) => {
          const rect = slide.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          slide.style.setProperty('--mouse-x', `${x.toFixed(1)}%`);
          slide.style.setProperty('--mouse-y', `${y.toFixed(1)}%`);
        }, { passive: true });
      });
    },

    setupScrollReveal() {
      const targets = [this.heroHeader, this.sliderSection, this.eventsGrid].filter(Boolean);
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.12,
          rootMargin: '0px 0px -40px 0px'
        });

        targets.forEach((el) => observer.observe(el));
      } else {
        // Fallback for environments without IntersectionObserver
        targets.forEach((el) => el.classList.add('revealed'));
      }
    },

    updatePosition(animate = true) {
      if (!this.viewport || !this.track || this.slides.length === 0) return;

      const viewportWidth = this.viewport.offsetWidth;
      const currentSlide = this.slides[this.currentIndex];
      if (!currentSlide) return;

      const slideWidth = currentSlide.offsetWidth;
      const slideLeft = currentSlide.offsetLeft;

      // Perfectly center the active slide
      const targetOffset = (viewportWidth - slideWidth) / 2 - slideLeft;
      this.currentTranslate = targetOffset;

      if (animate) {
        this.track.style.transition = 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
      } else {
        this.track.style.transition = 'none';
      }

      this.track.style.transform = `translateX(${targetOffset.toFixed(1)}px)`;

      // Update slide states & micro-animation triggers
      this.slides.forEach((slide, idx) => {
        const isActive = idx === this.currentIndex;
        if (isActive) {
          slide.classList.add('active-slide');
          slide.setAttribute('aria-hidden', 'false');
          // Restart content animations on the newly active slide
          const content = slide.querySelector('.slide-card-content');
          if (content) {
            content.classList.remove('slide-content-active');
            void content.offsetWidth; // force DOM reflow
            content.classList.add('slide-content-active');
          }
        } else {
          slide.classList.remove('active-slide');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      // Update pagination dots
      this.dots.forEach((dot, idx) => {
        const isActive = idx === this.currentIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Update counter
      if (this.currNumEl) {
        this.currNumEl.textContent = String(this.currentIndex + 1).padStart(2, '0');
      }

      // Reset auto-slide progress bar
      if (!prefersReducedMotion) {
        this.startProgressBar();
      }
    },

    goToSlide(index) {
      this.currentIndex = (index + this.totalSlides) % this.totalSlides;
      this.updatePosition(true);
    },

    next() {
      this.goToSlide(this.currentIndex + 1);
    },

    prev() {
      this.goToSlide(this.currentIndex - 1);
    },

    startProgressBar() {
      if (prefersReducedMotion || this.isPaused) return;

      if (this.progressAnimId) {
        cancelAnimationFrame(this.progressAnimId);
        this.progressAnimId = null;
      }

      if (this.progressBar) {
        this.progressBar.style.width = '0%';
      }

      this.progressStartTime = performance.now();

      const step = (now) => {
        if (this.isPaused) return;

        const elapsed = now - this.progressStartTime;
        const progress = Math.min(1, elapsed / this.autoSlideDuration);

        if (this.progressBar) {
          this.progressBar.style.width = `${(progress * 100).toFixed(1)}%`;
        }

        if (progress < 1) {
          this.progressAnimId = requestAnimationFrame(step);
        } else {
          this.next();
        }
      };

      this.progressAnimId = requestAnimationFrame(step);
    },

    pauseAutoSlide() {
      this.isPaused = true;
      if (this.progressAnimId) {
        cancelAnimationFrame(this.progressAnimId);
        this.progressAnimId = null;
      }
    },

    resumeAutoSlide() {
      this.isPaused = false;
      if (!prefersReducedMotion) {
        this.startProgressBar();
      }
    }
  };

  /* ==========================================================================
     9. ANNOUNCEMENTS MOTION CONTROLLER (FEATURED SLIDER, DRAG, AUTOPLAY & REVEALS)
     ========================================================================== */
  const AnnouncementsMotionController = {
    sliderSection: null,
    viewport: null,
    track: null,
    slides: [],
    prevBtn: null,
    nextBtn: null,
    dots: [],
    progressBar: null,
    currNumEl: null,
    totalNumEl: null,
    heroHeader: null,
    controlsRow: null,
    announcementsGrid: null,

    currentIndex: 0,
    totalSlides: 0,
    autoSlideDuration: 5500,
    progressAnimId: null,
    progressStartTime: null,
    isPaused: false,
    isDragging: false,
    dragStartX: 0,
    dragDeltaX: 0,
    currentTranslate: 0,

    init() {
      this.sliderSection = document.getElementById('featuredAnnouncementsSlider');
      if (!this.sliderSection) return;

      this.viewport = document.getElementById('announcementSliderViewport');
      this.track = document.getElementById('announcementSliderTrack');
      this.slides = Array.from(this.sliderSection.querySelectorAll('.featured-ann-card'));
      this.prevBtn = document.getElementById('announcementPrevBtn');
      this.nextBtn = document.getElementById('announcementNextBtn');
      this.dots = Array.from(this.sliderSection.querySelectorAll('.ann-dot'));
      this.progressBar = document.getElementById('announcementProgressBar');
      this.currNumEl = document.getElementById('announcementCurrNum');
      this.totalNumEl = document.getElementById('announcementTotalNum');
      this.heroHeader = document.getElementById('announcementsHeroHeader');
      this.controlsRow = document.getElementById('noticeControlsRow');
      this.announcementsGrid = document.getElementById('announcementsGridContainer');

      if (!this.viewport || !this.track || this.slides.length === 0) return;

      this.totalSlides = this.slides.length;
      if (this.totalNumEl) {
        this.totalNumEl.textContent = String(this.totalSlides).padStart(2, '0');
      }

      this.setupControls();
      this.setupGestures();
      this.setupCardSheen();
      this.setupScrollReveal();
      this.setupSyncListener();

      // Initial layout positioning
      window.requestAnimationFrame(() => {
        this.updatePosition(false);
        if (!prefersReducedMotion) {
          this.startProgressBar();
        }
      });

      // Window resize handling (debounced)
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.updatePosition(false);
        }, 120);
      }, { passive: true });

      // Page visibility handling
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.pauseAutoSlide();
        } else if (!this.isPaused && !prefersReducedMotion) {
          this.startProgressBar();
        }
      });
    },

    setupControls() {
      if (this.prevBtn) {
        this.prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.prev();
        });
      }

      if (this.nextBtn) {
        this.nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          this.next();
        });
      }

      this.dots.forEach((dot) => {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
          if (!isNaN(targetIdx) && targetIdx !== this.currentIndex) {
            this.goToSlide(targetIdx);
          }
        });
      });

      // Keyboard navigation on viewport
      if (this.viewport) {
        this.viewport.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.prev();
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            this.next();
          }
        });
      }

      // Hover pause on slider area
      this.sliderSection.addEventListener('mouseenter', () => {
        this.pauseAutoSlide();
      });

      this.sliderSection.addEventListener('mouseleave', () => {
        if (!this.isDragging) {
          this.resumeAutoSlide();
        }
      });
    },

    setupGestures() {
      if (!this.viewport) return;

      const onStart = (clientX) => {
        this.isDragging = true;
        this.dragStartX = clientX;
        this.dragDeltaX = 0;
        this.pauseAutoSlide();
        this.track.style.transition = 'none';
      };

      const onMove = (clientX) => {
        if (!this.isDragging) return;
        this.dragDeltaX = clientX - this.dragStartX;
        const liveOffset = this.currentTranslate + (this.dragDeltaX * 0.75);
        this.track.style.transform = `translateX(${liveOffset.toFixed(1)}px)`;
      };

      const onEnd = () => {
        if (!this.isDragging) return;
        this.isDragging = false;
        const threshold = 50;
        if (this.dragDeltaX < -threshold) {
          this.next();
        } else if (this.dragDeltaX > threshold) {
          this.prev();
        } else {
          this.updatePosition(true);
        }
        this.resumeAutoSlide();
      };

      // Pointer Events
      this.viewport.addEventListener('pointerdown', (e) => {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        onStart(e.clientX);
      });

      window.addEventListener('pointermove', (e) => {
        if (this.isDragging) {
          onMove(e.clientX);
        }
      });

      window.addEventListener('pointerup', () => {
        if (this.isDragging) {
          onEnd();
        }
      });

      window.addEventListener('pointercancel', () => {
        if (this.isDragging) {
          onEnd();
        }
      });

      // Touch events fallback
      this.viewport.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length === 1) {
          onStart(e.touches[0].clientX);
        }
      }, { passive: true });

      this.viewport.addEventListener('touchmove', (e) => {
        if (this.isDragging && e.touches && e.touches.length === 1) {
          onMove(e.touches[0].clientX);
        }
      }, { passive: true });

      this.viewport.addEventListener('touchend', () => {
        if (this.isDragging) {
          onEnd();
        }
      }, { passive: true });
    },

    setupCardSheen() {
      this.slides.forEach((slide) => {
        slide.addEventListener('mousemove', (e) => {
          const rect = slide.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          slide.style.setProperty('--mouse-x', `${x.toFixed(1)}%`);
          slide.style.setProperty('--mouse-y', `${y.toFixed(1)}%`);
        }, { passive: true });
      });
    },

    setupScrollReveal() {
      const targets = [this.heroHeader, this.sliderSection, this.controlsRow, this.announcementsGrid].filter(Boolean);
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.1,
          rootMargin: '0px 0px -40px 0px'
        });

        targets.forEach((el) => observer.observe(el));
      } else {
        targets.forEach((el) => el.classList.add('revealed'));
      }
    },

    setupSyncListener() {
      window.addEventListener('sait:announcements-updated', () => {
        if (window.STATE && window.STATE.announcements) {
          this.slides.forEach((slide) => {
            const annId = slide.getAttribute('data-id');
            const dataItem = window.STATE.announcements.find((a) => a.id === annId);
            if (dataItem) {
              const readBtn = slide.querySelector('.ann-read-btn span');
              const readIcon = slide.querySelector('.ann-read-btn i');
              if (readBtn && readIcon) {
                if (dataItem.read) {
                  readBtn.textContent = 'Mark as Unread';
                  readIcon.className = 'fa-solid fa-envelope';
                  slide.classList.add('read');
                  slide.classList.remove('unread');
                } else {
                  readBtn.textContent = 'Mark as Read';
                  readIcon.className = 'fa-solid fa-envelope-open';
                  slide.classList.add('unread');
                  slide.classList.remove('read');
                }
              }
            }
          });
        }
      });
    },

    updatePosition(animate = true) {
      if (!this.viewport || !this.track || this.slides.length === 0) return;

      const viewportWidth = this.viewport.offsetWidth;
      const currentSlide = this.slides[this.currentIndex];
      if (!currentSlide) return;

      const slideWidth = currentSlide.offsetWidth;
      const slideLeft = currentSlide.offsetLeft;

      // Perfectly center active slide
      const targetOffset = (viewportWidth - slideWidth) / 2 - slideLeft;
      this.currentTranslate = targetOffset;

      if (animate) {
        this.track.style.transition = 'transform 0.62s cubic-bezier(0.16, 1, 0.3, 1)';
      } else {
        this.track.style.transition = 'none';
      }

      this.track.style.transform = `translateX(${targetOffset.toFixed(1)}px)`;

      // Update slide states
      this.slides.forEach((slide, idx) => {
        const isActive = idx === this.currentIndex;
        if (isActive) {
          slide.classList.add('active-ann-slide');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('active-ann-slide');
          slide.setAttribute('aria-hidden', 'true');
        }
      });

      // Update dots
      this.dots.forEach((dot, idx) => {
        const isActive = idx === this.currentIndex;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      // Update counter
      if (this.currNumEl) {
        this.currNumEl.textContent = String(this.currentIndex + 1).padStart(2, '0');
      }

      // Reset auto-slide progress bar
      if (!prefersReducedMotion) {
        this.startProgressBar();
      }
    },

    goToSlide(index) {
      this.currentIndex = (index + this.totalSlides) % this.totalSlides;
      this.updatePosition(true);
    },

    next() {
      this.goToSlide(this.currentIndex + 1);
    },

    prev() {
      this.goToSlide(this.currentIndex - 1);
    },

    startProgressBar() {
      if (prefersReducedMotion || this.isPaused) return;

      if (this.progressAnimId) {
        cancelAnimationFrame(this.progressAnimId);
        this.progressAnimId = null;
      }

      if (this.progressBar) {
        this.progressBar.style.width = '0%';
      }

      this.progressStartTime = performance.now();

      const step = (now) => {
        if (this.isPaused) return;

        const elapsed = now - this.progressStartTime;
        const progress = Math.min(1, elapsed / this.autoSlideDuration);

        if (this.progressBar) {
          this.progressBar.style.width = `${(progress * 100).toFixed(1)}%`;
        }

        if (progress < 1) {
          this.progressAnimId = requestAnimationFrame(step);
        } else {
          this.next();
        }
      };

      this.progressAnimId = requestAnimationFrame(step);
    },

    pauseAutoSlide() {
      this.isPaused = true;
      if (this.progressAnimId) {
        cancelAnimationFrame(this.progressAnimId);
        this.progressAnimId = null;
      }
    },

    resumeAutoSlide() {
      this.isPaused = false;
      if (!prefersReducedMotion) {
        this.startProgressBar();
      }
    }
  };

  /* ==========================================================================
     INITIALIZATION ON DOM READY
     ========================================================================== */
  function initAnimations() {
    IntroSequenceController.init();
    AmbientCanvasSystem.init();
    CursorGlowController.init();
    HeroVisualController.init();
    ScrollRevealController.init();
    CardInteractionsController.init();
    AboutPageMotionController.init();
    EventsMotionController.init();
    AnnouncementsMotionController.init();

    // Trigger hero entrance if intro is not active or reduced motion
    if (!document.body.classList.contains('intro-active')) {
      setTimeout(() => {
        IntroSequenceController.triggerHeroEntrance();
      }, 300);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

})();

