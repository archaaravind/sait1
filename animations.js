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

      // Skip intro if requested via query param or prefers-reduced-motion
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('nointro') || urlParams.has('skipintro') || prefersReducedMotion) {
        this.dismiss(true);
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
     2. GLOBAL INTERACTIVE GALAXY & PARTICLE ENGINE (REUSABLE SYSTEM)
     ========================================================================== */
  const GalaxyBackground = {
    canvas: null,
    ctx: null,
    width: 0,
    height: 0,
    dpr: 1,
    isRunning: false,
    animId: null,
    time: 0,

    // Layers
    starsLayer1: [], // Deep background starfield
    dustLayer2: [],  // Mid nebula dust motes
    starsLayer3: [], // Foreground interactive stars

    // Cosmic Streaks / Shooting stars
    cosmicStreak: null,
    nextStreakTime: 0,

    // Ripple wave queue
    ripples: [],

    // Pointer state (mouse or touch)
    pointer: {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      active: false,
      isTouch: false
    },

    // Page-adaptive parameters
    currentMode: 'home',
    modeParams: {
      home: {
        speedMul: 1.0,
        orbitCurvature: 0.0003,
        constellationDist: 105,
        nebulaAlpha: 0.18,
        twinkleRate: 1.0
      },
      about: {
        speedMul: 0.70,
        orbitCurvature: 0.0005,
        constellationDist: 85,
        nebulaAlpha: 0.13,
        twinkleRate: 0.8
      },
      events: {
        speedMul: 1.25,
        orbitCurvature: 0.0004,
        constellationDist: 120,
        nebulaAlpha: 0.22,
        twinkleRate: 1.3
      },
      announcements: {
        speedMul: 0.95,
        orbitCurvature: 0.00035,
        constellationDist: 100,
        nebulaAlpha: 0.16,
        twinkleRate: 1.1
      },
      people: {
        speedMul: 0.75,
        orbitCurvature: 0.00025,
        constellationDist: 80,
        nebulaAlpha: 0.12,
        twinkleRate: 0.85
      },
      technology: {
        speedMul: 1.15,
        orbitCurvature: 0.0002,
        constellationDist: 135,
        nebulaAlpha: 0.19,
        twinkleRate: 1.2
      },
      contact: {
        speedMul: 0.60,
        orbitCurvature: 0.00015,
        constellationDist: 75,
        nebulaAlpha: 0.11,
        twinkleRate: 0.7
      }
    },
    activeSpeed: 1.0,
    activeOrbit: 0.0003,
    activeConstellationDist: 105,
    activeNebulaAlpha: 0.18,
    activeTwinkleRate: 1.0,

    isDarkTheme() {
      return true;
    },

    init() {
      this.canvas = document.getElementById('ambientCanvas');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) return;

      this.resize();

      if (prefersReducedMotion) {
        this.initLayers();
        this.drawStaticGalaxy();
        return;
      }

      this.initLayers();
      this.bindEvents();
      this.setupSectionObserver();
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

    initLayers() {
      const isMobile = this.width < 768;
      const isTablet = this.width < 1024;

      // Layer 1: Deep Cosmic Starfield (Micro-stars)
      const l1Count = isMobile ? 65 : isTablet ? 110 : 185;
      this.starsLayer1 = [];
      for (let i = 0; i < l1Count; i++) {
        this.starsLayer1.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.09,
          vy: (Math.random() - 0.5) * 0.09 - 0.035, // subtle upward drift
          radius: Math.random() * 0.85 + 0.65,
          baseAlpha: Math.random() * 0.45 + 0.32,
          alpha: 0.45,
          twinkleSpeed: Math.random() * 0.022 + 0.009,
          twinklePhase: Math.random() * Math.PI * 2,
          color: Math.random() > 0.35 
            ? (Math.random() > 0.4 ? '#F7F3EA' : '#B8CCE0') 
            : (Math.random() > 0.5 ? '#D6B36A' : '#4D8DFF')
        });
      }

      // Layer 2: Cosmic Dust & Nebula Motes
      const l2Count = isMobile ? 24 : isTablet ? 38 : 55;
      this.dustLayer2 = [];
      for (let i = 0; i < l2Count; i++) {
        const isGold = Math.random() > 0.70;
        const isCyan = !isGold && Math.random() > 0.45;
        this.dustLayer2.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18 - 0.045,
          radius: Math.random() * 1.8 + 1.4,
          baseAlpha: Math.random() * 0.35 + 0.22,
          alpha: 0.30,
          colorRgb: isGold ? '214, 179, 106' : (isCyan ? '77, 141, 255' : '184, 204, 224'),
          orbitRadius: Math.random() * 45 + 20,
          orbitAngle: Math.random() * Math.PI * 2,
          orbitSpeed: (Math.random() - 0.5) * 0.009
        });
      }

      // Layer 3: Foreground Interactive Constellation Stars
      const l3Count = isMobile ? 18 : isTablet ? 28 : 42;
      this.starsLayer3 = [];
      for (let i = 0; i < l3Count; i++) {
        const isGold = Math.random() > 0.60;
        this.starsLayer3.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          originX: 0,
          originY: 0,
          vx: (Math.random() - 0.5) * 0.24,
          vy: (Math.random() - 0.5) * 0.24,
          dispX: 0,
          dispY: 0,
          radius: Math.random() * 1.3 + 2.0,
          baseAlpha: Math.random() * 0.30 + 0.65,
          alpha: 0.8,
          hoverBoost: 0,
          colorRgb: isGold ? '214, 179, 106' : '77, 141, 255',
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.028 + 0.014
        });
      }

      this.nextStreakTime = Date.now() + 4000;
    },

    bindEvents() {
      let resizeTimer = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.resize();
          this.initLayers();
        }, 150);
      }, { passive: true });

      // Desktop Pointer Tracking
      window.addEventListener('mousemove', (e) => {
        const p = this.pointer;
        p.prevX = p.x;
        p.prevY = p.y;
        p.x = e.clientX;
        p.y = e.clientY;
        p.vx = p.x - p.prevX;
        p.vy = p.y - p.prevY;
        p.active = true;
        p.isTouch = false;
      }, { passive: true });

      window.addEventListener('mouseleave', () => {
        this.pointer.active = false;
        this.pointer.x = -1000;
        this.pointer.y = -1000;
      });

      // Desktop Click Ripple
      window.addEventListener('click', (e) => {
        this.createRipple(e.clientX, e.clientY, 1.0);
      }, { passive: true });

      // Mobile Touch Handling (Passive & Non-blocking)
      window.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length > 0) {
          const t = e.touches[0];
          this.pointer.x = t.clientX;
          this.pointer.y = t.clientY;
          this.pointer.active = true;
          this.pointer.isTouch = true;
          this.createRipple(t.clientX, t.clientY, 0.85);
        }
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length > 0) {
          const t = e.touches[0];
          this.pointer.prevX = this.pointer.x;
          this.pointer.prevY = this.pointer.y;
          this.pointer.x = t.clientX;
          this.pointer.y = t.clientY;
          this.pointer.vx = this.pointer.x - this.pointer.prevX;
          this.pointer.vy = this.pointer.y - this.pointer.prevY;
          this.pointer.active = true;
          this.pointer.isTouch = true;
        }
      }, { passive: true });

      window.addEventListener('touchend', () => {
        setTimeout(() => {
          if (!this.pointer.isTouch) return;
          this.pointer.active = false;
          this.pointer.x = -1000;
          this.pointer.y = -1000;
        }, 600);
      }, { passive: true });

      // Tab visibility
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.stop();
        } else {
          this.start();
        }
      });
    },

    createRipple(x, y, strength = 1.0) {
      if (this.ripples.length > 6) {
        this.ripples.shift();
      }
      this.ripples.push({
        x,
        y,
        radius: 4,
        maxRadius: Math.min(window.innerWidth, window.innerHeight) * 0.35,
        speed: 5.2,
        alpha: 0.65 * strength,
        strength: strength
      });
    },

    setupSectionObserver() {
      const sectionMap = [
        { id: 'home', mode: 'home' },
        { id: 'about', mode: 'about' },
        { id: 'events', mode: 'events' },
        { id: 'announcements', mode: 'announcements' },
        { id: 'people', mode: 'people' },
        { id: 'careers', mode: 'technology' },
        { id: 'resources', mode: 'technology' },
        { id: 'achievements', mode: 'technology' },
        { id: 'activity-logger', mode: 'technology' },
        { id: 'contact', mode: 'contact' }
      ];

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.25) {
            const match = sectionMap.find(s => s.id === entry.target.id);
            if (match) {
              this.setMode(match.mode);
            }
          }
        });
      }, { threshold: [0.25, 0.5] });

      sectionMap.forEach(item => {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      });
    },

    setMode(mode) {
      if (this.modeParams[mode]) {
        this.currentMode = mode;
      }
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

    render(timestamp) {
      this.time = timestamp || performance.now();
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      // Smoothly interpolate page-adaptive mood parameters
      const targetParams = this.modeParams[this.currentMode] || this.modeParams.home;
      const lerpFactor = 0.04;
      this.activeSpeed += (targetParams.speedMul - this.activeSpeed) * lerpFactor;
      this.activeOrbit += (targetParams.orbitCurvature - this.activeOrbit) * lerpFactor;
      this.activeConstellationDist += (targetParams.constellationDist - this.activeConstellationDist) * lerpFactor;
      this.activeNebulaAlpha += (targetParams.nebulaAlpha - this.activeNebulaAlpha) * lerpFactor;
      this.activeTwinkleRate += (targetParams.twinkleRate - this.activeTwinkleRate) * lerpFactor;

      ctx.clearRect(0, 0, w, h);

      // -------------------------------------------------------------
      // 1. Living Atmospheric Nebula Light & Cosmic Gradients
      // -------------------------------------------------------------
      const t = this.time;
      const nAlpha = this.activeNebulaAlpha;

      // Cyan-blue celestial nebula
      const neb1X = w * (0.30 + 0.12 * Math.sin(t * 0.00032));
      const neb1Y = h * (0.34 + 0.09 * Math.cos(t * 0.00028));
      const neb1R = Math.min(w, h) * 0.52;
      const gradNeb1 = ctx.createRadialGradient(neb1X, neb1Y, 0, neb1X, neb1Y, neb1R);
      gradNeb1.addColorStop(0, `rgba(77, 141, 255, ${nAlpha * 0.7})`);
      gradNeb1.addColorStop(0.5, `rgba(18, 54, 92, ${nAlpha * 0.3})`);
      gradNeb1.addColorStop(1, 'transparent');
      ctx.fillStyle = gradNeb1;
      ctx.fillRect(0, 0, w, h);

      // Warm gold starlight cluster nebula
      const neb2X = w * (0.75 + 0.12 * Math.cos(t * 0.00026));
      const neb2Y = h * (0.68 + 0.10 * Math.sin(t * 0.00034));
      const neb2R = Math.min(w, h) * 0.48;
      const gradNeb2 = ctx.createRadialGradient(neb2X, neb2Y, 0, neb2X, neb2Y, neb2R);
      gradNeb2.addColorStop(0, `rgba(214, 179, 106, ${nAlpha * 0.5})`);
      gradNeb2.addColorStop(0.55, `rgba(11, 35, 66, ${nAlpha * 0.25})`);
      gradNeb2.addColorStop(1, 'transparent');
      ctx.fillStyle = gradNeb2;
      ctx.fillRect(0, 0, w, h);

      // -------------------------------------------------------------
      // 2. Ripple Wave Processing & Rendering
      // -------------------------------------------------------------
      for (let rIdx = this.ripples.length - 1; rIdx >= 0; rIdx--) {
        const rp = this.ripples[rIdx];
        rp.radius += rp.speed;
        rp.alpha *= 0.96;

        if (rp.alpha < 0.02 || rp.radius > rp.maxRadius) {
          this.ripples.splice(rIdx, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(77, 141, 255, ${rp.alpha * 0.45})`;
        ctx.lineWidth = 1.6;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(rp.x, rp.y, Math.max(0, rp.radius - 8), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(214, 179, 106, ${rp.alpha * 0.25})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // Pointer radius constants
      const ptr = this.pointer;
      const isMobile = w < 768;
      const hoverRadius = isMobile ? 85 : 120;
      const hoverRadiusSq = hoverRadius * hoverRadius;

      // -------------------------------------------------------------
      // 3. Layer 1: Deep Cosmic Starfield (Slow drift & Twinkle)
      // -------------------------------------------------------------
      const l1Len = this.starsLayer1.length;
      for (let i = 0; i < l1Len; i++) {
        const s = this.starsLayer1[i];

        s.x += s.vx * this.activeSpeed;
        s.y += s.vy * this.activeSpeed;

        // Subtle curved orbital drift
        s.x += Math.sin(t * this.activeOrbit + i) * 0.12;

        if (s.x < -10) s.x = w + 10;
        else if (s.x > w + 10) s.x = -10;
        if (s.y < -10) s.y = h + 10;
        else if (s.y > h + 10) s.y = -10;

        s.twinklePhase += s.twinkleSpeed * this.activeTwinkleRate;
        const tw = Math.sin(s.twinklePhase);
        s.alpha = s.baseAlpha + tw * 0.22;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = Math.max(0.08, Math.min(1, s.alpha));
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // -------------------------------------------------------------
      // 4. Layer 2: Cosmic Dust & Nebula Motes (Soft Glow)
      // -------------------------------------------------------------
      const l2Len = this.dustLayer2.length;
      for (let i = 0; i < l2Len; i++) {
        const d = this.dustLayer2[i];

        d.orbitAngle += d.orbitSpeed * this.activeSpeed;
        d.x += (d.vx + Math.cos(d.orbitAngle) * 0.25) * this.activeSpeed;
        d.y += (d.vy + Math.sin(d.orbitAngle) * 0.25) * this.activeSpeed;

        if (d.x < -20) d.x = w + 20;
        else if (d.x > w + 20) d.x = -20;
        if (d.y < -20) d.y = h + 20;
        else if (d.y > h + 20) d.y = -20;

        // Soft radial glow mote
        const moteGrad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.radius * 3.5);
        moteGrad.addColorStop(0, `rgba(${d.colorRgb}, ${d.baseAlpha * 0.9})`);
        moteGrad.addColorStop(0.4, `rgba(${d.colorRgb}, ${d.baseAlpha * 0.4})`);
        moteGrad.addColorStop(1, `rgba(${d.colorRgb}, 0)`);

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = moteGrad;
        ctx.fill();
      }

      // -------------------------------------------------------------
      // 5. Layer 3: Foreground Interactive Constellation Stars
      // -------------------------------------------------------------
      const l3Len = this.starsLayer3.length;
      const maxConnectDist = this.activeConstellationDist;
      const maxConnectDistSq = maxConnectDist * maxConnectDist;

      for (let i = 0; i < l3Len; i++) {
        const s = this.starsLayer3[i];

        // Normal drift
        s.x += s.vx * this.activeSpeed;
        s.y += s.vy * this.activeSpeed;

        // Screen wrap
        if (s.x < -15) s.x = w + 15;
        else if (s.x > w + 15) s.x = -15;
        if (s.y < -15) s.y = h + 15;
        else if (s.y > h + 15) s.y = -15;

        // Pointer Gravity / Repulsion / Swirl
        if (ptr.active) {
          const dx = s.x - ptr.x;
          const dy = s.y - ptr.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < hoverRadiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const normX = dx / dist;
            const normY = dy / dist;
            const force = (1 - dist / hoverRadius);

            if (dist < 40) {
              s.dispX += normX * force * 2.2;
              s.dispY += normY * force * 2.2;
            } else {
              const swirlX = -normY * 0.8;
              const swirlY = normX * 0.8;
              s.dispX += (normX * -0.4 + swirlX) * force * 1.5;
              s.dispY += (normY * -0.4 + swirlY) * force * 1.5;
            }

            s.hoverBoost = Math.min(0.45, s.hoverBoost + 0.08);
          }
        }

        // Ripple interaction
        for (let r = 0; r < this.ripples.length; r++) {
          const rp = this.ripples[r];
          const rdx = s.x - rp.x;
          const rdy = s.y - rp.y;
          const rDist = Math.sqrt(rdx * rdx + rdy * rdy);
          const waveDelta = Math.abs(rDist - rp.radius);

          if (waveDelta < 24 && rDist > 0) {
            const waveForce = (1 - waveDelta / 24) * rp.strength * 1.8;
            s.dispX += (rdx / rDist) * waveForce;
            s.dispY += (rdy / rDist) * waveForce;
            s.hoverBoost = Math.min(0.55, s.hoverBoost + 0.15);
          }
        }

        // Smooth spring dampening back to zero displacement
        s.dispX *= 0.90;
        s.dispY *= 0.90;
        s.hoverBoost *= 0.95;

        const renderX = s.x + s.dispX;
        const renderY = s.y + s.dispY;

        s.pulsePhase += s.pulseSpeed;
        const baseAlpha = s.baseAlpha + Math.sin(s.pulsePhase) * 0.15 + s.hoverBoost;
        const totalAlpha = Math.min(1, Math.max(0.15, baseAlpha));

        // Draw star core + halo
        ctx.beginPath();
        ctx.arc(renderX, renderY, s.radius * (1 + s.hoverBoost * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.colorRgb}, ${totalAlpha})`;
        ctx.shadowColor = `rgba(${s.colorRgb}, 0.8)`;
        ctx.shadowBlur = s.hoverBoost > 0.1 ? 12 : 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Constellation lines linking nearby stars
        for (let j = i + 1; j < l3Len; j++) {
          const s2 = this.starsLayer3[j];
          const cdx = renderX - (s2.x + s2.dispX);
          const cdy = renderY - (s2.y + s2.dispY);
          const cdSq = cdx * cdx + cdy * cdy;

          if (cdSq < maxConnectDistSq) {
            const dist = Math.sqrt(cdSq);
            const lineAlpha = (1 - dist / maxConnectDist) * 0.22 * (1 + (s.hoverBoost + s2.hoverBoost) * 0.5);
            ctx.beginPath();
            ctx.moveTo(renderX, renderY);
            ctx.lineTo(s2.x + s2.dispX, s2.y + s2.dispY);
            ctx.strokeStyle = `rgba(77, 141, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      // -------------------------------------------------------------
      // 6. Occasional Shooting Star / Cosmic Streak
      // -------------------------------------------------------------
      const now = Date.now();
      if (!this.cosmicStreak && now > this.nextStreakTime) {
        const isGold = Math.random() > 0.5;
        this.cosmicStreak = {
          x: Math.random() * (w * 0.7),
          y: Math.random() * (h * 0.4),
          len: Math.random() * 80 + 100,
          speed: Math.random() * 8 + 10,
          angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
          progress: 0,
          isGold
        };
      }

      if (this.cosmicStreak) {
        const cs = this.cosmicStreak;
        cs.progress += cs.speed;
        const curX = cs.x + Math.cos(cs.angle) * cs.progress;
        const curY = cs.y + Math.sin(cs.angle) * cs.progress;
        const tailX = curX - Math.cos(cs.angle) * cs.len;
        const tailY = curY - Math.sin(cs.angle) * cs.len;

        const maxDist = 450;
        if (cs.progress > maxDist) {
          this.cosmicStreak = null;
          this.nextStreakTime = now + (Math.random() * 4000 + 7000);
        } else {
          const streakAlpha = Math.sin((cs.progress / maxDist) * Math.PI) * 0.85;
          const streakColor = cs.isGold ? '214, 179, 106' : '77, 141, 255';

          const sGrad = ctx.createLinearGradient(tailX, tailY, curX, curY);
          sGrad.addColorStop(0, `rgba(${streakColor}, 0)`);
          sGrad.addColorStop(0.7, `rgba(${streakColor}, ${streakAlpha * 0.45})`);
          sGrad.addColorStop(1, `rgba(247, 243, 234, ${streakAlpha})`);

          ctx.beginPath();
          ctx.moveTo(tailX, tailY);
          ctx.lineTo(curX, curY);
          ctx.strokeStyle = sGrad;
          ctx.lineWidth = 1.8;
          ctx.stroke();

          // Glowing tip
          ctx.beginPath();
          ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(247, 243, 234, ${streakAlpha})`;
          ctx.shadowColor = `rgba(${streakColor}, 0.9)`;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
    },

    drawStaticGalaxy() {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;
      ctx.clearRect(0, 0, w, h);

      // Render static background starfield
      this.starsLayer1.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.baseAlpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      // Render static brighter stars
      this.starsLayer3.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.colorRgb}, ${s.baseAlpha})`;
        ctx.fill();
      });
    }
  };

  // Reusable Global Components & Aliases
  const AmbientCanvasSystem = GalaxyBackground;
  window.GalaxyBackground = GalaxyBackground;

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

      const cardSelectors = [
        '.feature-card',
        '.stat-strip-card',
        '.event-card',
        '.person-card',
        '.alumni-card',
        '.resource-card',
        '.foundation-card',
        '.why-sait-card',
        '.featured-slide-card',
        '.featured-ann-card',
        '.notice-card',
        '.career-card',
        '.glass-card'
      ];

      const cards = document.querySelectorAll(cardSelectors.join(', '));

      cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = ((e.clientX - rect.left) / rect.width) * 100;
          const y = ((e.clientY - rect.top) / rect.height) * 100;
          card.style.setProperty('--mouse-x', `${x.toFixed(1)}%`);
          card.style.setProperty('--mouse-y', `${y.toFixed(1)}%`);
        }, { passive: true });

        // Subtle galaxy ripple on card mouseenter
        card.addEventListener('mouseenter', (e) => {
          if (window.GalaxyBackground && typeof window.GalaxyBackground.createRipple === 'function') {
            window.GalaxyBackground.createRipple(e.clientX, e.clientY, 0.4);
          }
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

