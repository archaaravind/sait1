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
     1. CINEMATIC SAIT INTRO SEQUENCE CONTROLLER (PORTRAIT VIDEO)
     ========================================================================== */
  const IntroSequenceController = {
    overlay: null,
    skipBtn: null,
    video: null,
    bgBlurVideo: null,
    invideoOverlay: null,
    progressBar: null,
    timer: null,
    isDismissed: false,

    init() {
      this.overlay = document.getElementById('saitIntroOverlay');
      if (!this.overlay) return;

      this.skipBtn = document.getElementById('introSkipBtn');
      this.video = document.getElementById('saitIntroVideo');
      this.bgBlurVideo = document.getElementById('introBgBlurVideo');
      this.invideoOverlay = document.getElementById('invideoTextOverlay');
      this.progressBar = document.getElementById('introProgressBar');

      // Accessibility: Respect prefers-reduced-motion
      if (prefersReducedMotion) {
        setTimeout(() => this.dismiss(true), 600);
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

      this.playSequence();
    },

    playSequence() {
      // Start ambient blurred background video if present
      if (this.bgBlurVideo) {
        this.bgBlurVideo.muted = true;
        this.bgBlurVideo.defaultMuted = true;
        this.bgBlurVideo.playsInline = true;
        this.bgBlurVideo.play().catch(() => {});
      }

      if (this.video) {
        // Strictly set mute and inline parameters before playback
        this.video.muted = true;
        this.video.defaultMuted = true;
        this.video.playsInline = true;
        this.video.currentTime = 0;

        // Fallback safety timer: Video is ~8s; auto-dismiss if playback stalls or hangs
        this.timer = setTimeout(() => {
          this.dismiss(false);
        }, 11000);

        // When video reaches natural end, smoothly transition to homepage
        this.video.addEventListener('ended', () => {
          if (this.progressBar) this.progressBar.style.width = '100%';
          this.dismiss(false);
        }, { once: true });

        // Graceful error handling: If video cannot load, transition immediately
        this.video.addEventListener('error', () => {
          this.dismiss(false);
        }, { once: true });

        // Update progress bar & reveal SAIT branding overlay at 4.25s
        this.video.addEventListener('timeupdate', () => {
          if (this.progressBar && this.video.duration) {
            const pct = (this.video.currentTime / this.video.duration) * 100;
            this.progressBar.style.width = Math.min(pct, 100) + '%';
          }

          // Reveal the SAIT branding overlay when the chip locks into center
          if (this.video.currentTime >= 4.25 && this.invideoOverlay) {
            this.invideoOverlay.classList.add('text-revealed');
          }
        });

        // Trigger autoplay
        const playPromise = this.video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('SAIT Intro Video Autoplay delayed or restricted:', err);
            // In case autoplay is restricted, reveal text overlay and dismiss after short delay
            if (this.invideoOverlay) {
              this.invideoOverlay.classList.add('text-revealed');
            }
            // Allow tap/click on screen or auto-proceed after 3.5s so user is never stuck
            const playOnInteraction = () => {
              this.video.play().catch(() => {});
              if (this.bgBlurVideo) this.bgBlurVideo.play().catch(() => {});
              window.removeEventListener('click', playOnInteraction);
              window.removeEventListener('touchstart', playOnInteraction);
            };
            window.addEventListener('click', playOnInteraction, { once: true });
            window.addEventListener('touchstart', playOnInteraction, { once: true });

            setTimeout(() => {
              this.dismiss(false);
            }, 3500);
          });
        }
      } else {
        // Fallback if video tag missing
        this.timer = setTimeout(() => {
          this.dismiss(false);
        }, 2000);
      }
    },

    dismiss(immediate) {
      if (this.isDismissed) return;
      this.isDismissed = true;

      if (this.timer) clearTimeout(this.timer);

      if (!this.overlay) return;

      if (this.video) {
        try {
          this.video.pause();
        } catch (e) {}
      }
      if (this.bgBlurVideo) {
        try {
          this.bgBlurVideo.pause();
        } catch (e) {}
      }

      if (immediate) {
        this.overlay.classList.add('intro-hidden');
        this.overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('intro-active');
        this.triggerHeroEntrance();
        return;
      }

      // Smooth cinematic exit transition
      this.overlay.classList.add('intro-exit');
      setTimeout(() => {
        if (this.overlay) {
          this.overlay.classList.add('intro-hidden');
          this.overlay.setAttribute('aria-hidden', 'true');
        }
        document.body.classList.remove('intro-active');
        this.triggerHeroEntrance();
      }, 700);
    },

    triggerHeroEntrance() {
      const heroBrand = document.getElementById('heroBrandTitle');
      if (heroBrand) {
        heroBrand.classList.add('hero-brand-animate');
      }
    }
  };

  /* ==========================================================================
     2. LIVE IVORY, NAVY & WARM GOLD AMBIENT CANVAS SYSTEM
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

    // Ivory + Navy + Gold palette: Navy tones, Gold accents, Warm Ivory nodes
    colors: [
      { r: 8,   g: 43,  b: 76 },  // #082B4C Primary Navy
      { r: 11,  g: 53,  b: 92 },  // #0B355C Navy Blue
      { r: 23,  g: 74,  b: 115 }, // #174A73 Lighter Navy
      { r: 181, g: 138, b: 58 },  // #B58A3A Warm Gold
      { r: 208, g: 170, b: 91 },  // #D0AA5B Soft Gold
      { r: 140, g: 105, b: 40 }   // #8C6928 Deep Gold
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
      // Particle count optimized for smooth performance
      const count = isMobile ? 18 : isTablet ? 28 : 40;

      for (let i = 0; i < count; i++) {
        const color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.22 : 0.35),
          vy: (Math.random() - 0.5) * (isMobile ? 0.22 : 0.35),
          radius: Math.random() * 1.5 + 1.2,
          color: color,
          baseAlpha: Math.random() * 0.3 + 0.2,
          alpha: 0.25,
          pulseSpeed: Math.random() * 0.02 + 0.012,
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
            const force = (1 - Math.sqrt(dSq) / mouseDistThreshold) * 0.7;
            p.x += (dx / Math.sqrt(dSq)) * force * 1.4;
            p.y += (dy / Math.sqrt(dSq)) * force * 1.4;
          }
        }

        // Pulse alpha
        p.pulsePhase += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.12;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${Math.max(0.08, p.alpha)})`;
        ctx.fill();

        // Connect nearby particles with subtle architectural lines
        for (let j = i + 1; j < pLen; j++) {
          const p2 = this.particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const ldSq = ldx * ldx + ldy * ldy;

          if (ldSq < maxConnectDistSq) {
            const dist = Math.sqrt(ldSq);
            const lineAlpha = (1 - dist / maxConnectDist) * 0.09;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(8, 43, 76, ${lineAlpha})`;
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
