/**
 * SAIT Animation System — animations.js
 * Premium Tech Animation System for SAIT (Students Association of Information Technology)
 * SOE, CUSAT — Cochin University of Science and Technology
 * Theme: Burgundy & Nude / Deep Wine
 * Palette: #160B0D, #241216, #5A1824, #7A2635, #963B4D, #D8B9A6, #E8D5C8, #F4E9E1
 */

(function () {
  'use strict';

  // Check user preference for reduced motion
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. CINEMATIC SAIT INTRO SEQUENCE CONTROLLER
     ========================================================================== */
  const IntroSequenceController = {
    overlay: null,
    skipBtn: null,
    titleChars: [],
    tagline: null,
    timer: null,
    charTimers: [],

    init() {
      this.overlay = document.getElementById('saitIntroOverlay');
      if (!this.overlay) return;

      this.skipBtn = document.getElementById('introSkipBtn');
      this.titleChars = Array.from(this.overlay.querySelectorAll('.intro-char'));
      this.tagline = document.getElementById('introTagline');

      // Skip immediately if reduced motion is requested
      if (prefersReducedMotion) {
        this.dismiss(true);
        return;
      }

      // Check if intro was already seen in this browser session
      const hasSeen = sessionStorage.getItem('sait_intro_seen');
      const forceReplay = window.location.search.includes('intro=1') || window.location.search.includes('replay=1');

      if (hasSeen && !forceReplay) {
        // Fast skip for subsequent visits in the same session
        this.dismiss(true);
        return;
      }

      this.overlay.setAttribute('aria-hidden', 'false');
      document.body.classList.add('intro-active');

      // Skip button listener
      if (this.skipBtn) {
        this.skipBtn.addEventListener('click', () => this.dismiss(false));
      }

      // Keyboard Esc to skip
      const keyHandler = (e) => {
        if (e.key === 'Escape') {
          this.dismiss(false);
          window.removeEventListener('keydown', keyHandler);
        }
      };
      window.addEventListener('keydown', keyHandler);

      this.playSequence();
    },

    playSequence() {
      // Staggered reveal for intro characters S-A-I-T
      const baseDelay = 450;
      const charInterval = 200;

      this.titleChars.forEach((char, idx) => {
        const t = setTimeout(() => {
          char.classList.add('char-revealed');
        }, baseDelay + (idx * charInterval));
        this.charTimers.push(t);
      });

      // Reveal Tagline
      const taglineDelay = baseDelay + (this.titleChars.length * charInterval) + 120;
      const taglineTimer = setTimeout(() => {
        if (this.tagline) {
          this.tagline.classList.add('tagline-revealed');
        }
      }, taglineDelay);
      this.charTimers.push(taglineTimer);

      // Auto dismiss after ~2.4 seconds
      this.timer = setTimeout(() => {
        this.dismiss(false);
      }, 2400);
    },

    dismiss(immediate) {
      if (this.timer) clearTimeout(this.timer);
      this.charTimers.forEach(t => clearTimeout(t));

      try {
        sessionStorage.setItem('sait_intro_seen', '1');
      } catch (err) {
        // Ignore storage errors in restricted contexts
      }

      if (!this.overlay) return;

      if (immediate) {
        this.overlay.classList.add('intro-hidden');
        this.overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('intro-active');
        this.triggerHeroEntrance();
        return;
      }

      // Smooth exit
      this.overlay.classList.add('intro-exit');
      setTimeout(() => {
        if (this.overlay) {
          this.overlay.classList.add('intro-hidden');
          this.overlay.setAttribute('aria-hidden', 'true');
        }
        document.body.classList.remove('intro-active');
        this.triggerHeroEntrance();
      }, 650);
    },

    triggerHeroEntrance() {
      const heroBrand = document.getElementById('heroBrandTitle');
      if (heroBrand) {
        heroBrand.classList.add('hero-brand-animate');
      }
    }
  };

  /* ==========================================================================
     2. LIVE BURGUNDY & NUDE AMBIENT CANVAS SYSTEM
     ========================================================================== */
  const AmbientCanvasSystem = {
    canvas: null,
    ctx: null,
    particles: [],
    animId: null,
    width: 0,
    height: 0,
    dpr: 1,
    isRunning: false,
    mouse: { x: -1000, y: -1000, active: false },

    // Theme palette particles: Burgundy tones & Nude/Ivory tones
    colors: [
      { r: 122, g: 38,  b: 53 },  // #7A2635 Primary burgundy
      { r: 150, g: 59,  b: 77 },  // #963B4D Bright burgundy
      { r: 90,  g: 24,  b: 36 },  // #5A1824 Deep burgundy
      { r: 216, g: 185, b: 166 }, // #D8B9A6 Nude accent
      { r: 232, g: 213, b: 200 }, // #E8D5C8 Light nude
      { r: 244, g: 233, b: 225 }  // #F4E9E1 Soft ivory
    ],

    init() {
      this.canvas = document.getElementById('ambientCanvas');
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      if (!this.ctx) return;

      this.resize();

      if (prefersReducedMotion) {
        // Draw one static frame without animation loop
        this.initParticles();
        this.drawStatic();
        return;
      }

      this.initParticles();
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

    initParticles() {
      this.particles = [];
      const isMobile = this.width < 768;
      const isTablet = this.width < 1024;
      // Particle count optimized for silky 60fps
      const count = isMobile ? 18 : isTablet ? 28 : 42;

      for (let i = 0; i < count; i++) {
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.4),
          vy: (Math.random() - 0.5) * (isMobile ? 0.25 : 0.4),
          radius: Math.random() * 1.5 + 1.2,
          color: color,
          baseAlpha: Math.random() * 0.35 + 0.25,
          alpha: 0.3,
          pulseSpeed: Math.random() * 0.02 + 0.015,
          pulsePhase: Math.random() * Math.PI * 2
        });
      }
    },

    bindEvents() {
      let resizeTimer = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.resize();
          this.initParticles();
        }, 150);
      }, { passive: true });

      // Track mouse position over canvas
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

      // Mobile touch
      window.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
          this.mouse.x = e.touches[0].clientX;
          this.mouse.y = e.touches[0].clientY;
          this.mouse.active = true;
        }
      }, { passive: true });

      window.addEventListener('touchend', () => {
        setTimeout(() => {
          this.mouse.active = false;
        }, 500);
      });

      // Pause when tab hidden to save CPU/battery
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
      const loop = () => {
        this.render();
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

    render() {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      ctx.clearRect(0, 0, w, h);

      const isMobile = w < 768;
      const maxConnectDist = isMobile ? 85 : 120;
      const maxConnectDistSq = maxConnectDist * maxConnectDist;
      const mouseDistThreshold = isMobile ? 90 : 130;
      const mouseDistSq = mouseDistThreshold * mouseDistThreshold;

      // Update and draw particles
      const pLen = this.particles.length;
      for (let i = 0; i < pLen; i++) {
        const p = this.particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges smoothly
        if (p.x < -10) p.x = w + 10;
        else if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        else if (p.y > h + 10) p.y = -10;

        // Mouse gentle repulsion
        if (this.mouse.active) {
          const dx = p.x - this.mouse.x;
          const dy = p.y - this.mouse.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < mouseDistSq && dSq > 0) {
            const force = (1 - Math.sqrt(dSq) / mouseDistThreshold) * 0.8;
            p.x += (dx / Math.sqrt(dSq)) * force * 1.5;
            p.y += (dy / Math.sqrt(dSq)) * force * 1.5;
          }
        }

        // Pulse alpha
        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.15;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${Math.max(0.08, p.alpha)})`;
        ctx.fill();

        // Connect nearby particles with subtle lines
        for (let j = i + 1; j < pLen; j++) {
          const p2 = this.particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const ldSq = ldx * ldx + ldy * ldy;

          if (ldSq < maxConnectDistSq) {
            const dist = Math.sqrt(ldSq);
            const lineAlpha = (1 - dist / maxConnectDist) * 0.13;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(216, 185, 166, ${lineAlpha})`;
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
     4. HERO VISUAL 3D PARALLAX & LOGO STAGE
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

        // Subtle 3D tilt (max 7 degrees)
        this.targetRotY = normX * 7;
        this.targetRotX = -normY * 7;

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
            `perspective(1000px) rotateX(${this.currRotX.toFixed(2)}deg) rotateY(${this.currRotY.toFixed(2)}deg)`;
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
        // In reduced motion, ensure all content is visible immediately
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
     INITIALIZATION ON DOM READY
     ========================================================================== */
  function initAnimations() {
    IntroSequenceController.init();
    AmbientCanvasSystem.init();
    CursorGlowController.init();
    HeroVisualController.init();
    ScrollRevealController.init();
    CardInteractionsController.init();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
  } else {
    initAnimations();
  }

})();
