'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { SITE_CONFIG, STATS } from '@/lib/data';
import { useApp } from '@/lib/context';
import { asset } from '@/lib/asset';

// ─── Asset paths (taruh di /public) ──────────────────────────────────────────
const BG_GIF = asset('/animation.gif'); // dipakai untuk desktop & mobile

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return mobile;
}

function useIsDark() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const check = () =>
      setDark(document.documentElement.getAttribute('data-theme') === 'dark');
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);
  return dark;
}

// ─── GIF Background ──────────────────────────────────────────────────────────
// Dipakai di semua device. Opacity disesuaikan per tema.

function Background({ isDark }: { isDark: boolean }) {
  return (
    <img
      src={BG_GIF}
      alt=""
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
        opacity: isDark ? 0.2 : 0.12,
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
        transition: 'opacity 0.5s ease',
      }}
    />
  );
}

// ─── Three.js Particles ───────────────────────────────────────────────────────
// Partikel lebih dalam (spread lebar, kamera lebih dekat, ukuran lebih besar)
// sehingga memenuhi seluruh viewport di desktop maupun mobile.

function ThreeParticles({
  containerRef,
  isDark,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  isDark: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas    = canvasRef.current;
    if (!container || !canvas) return;

    const W = container.clientWidth  || window.innerWidth;
    const H = container.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene  = new THREE.Scene();

    // Kamera lebih dekat → partikel terasa lebih "dalam" dan memenuhi layar
    const camera = new THREE.PerspectiveCamera(85, W / H, 0.1, 1000);
    camera.position.z = 3;

    // Lebih banyak partikel, spread lebih lebar & dalam
    const count     = window.innerWidth < 768 ? 900 : 2000;
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);

    const colA = new THREE.Color(isDark ? '#2dd4d4' : '#00868a');
    const colB = new THREE.Color(isDark ? '#0d9488' : '#004d50');
    const colC = new THREE.Color(isDark ? '#134e4a' : '#99f6e4');

    for (let i = 0; i < count; i++) {
      const spreadXY = 10;  // lebih lebar → meluber ke pinggir layar
      const spreadZ  = 6;   // lebih dalam → kedalaman terasa nyata

      positions[i * 3]     = (Math.random() - 0.5) * spreadXY;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spreadXY;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spreadZ;

      // Tiga warna di-lerp untuk variasi gradien
      const t  = Math.random();
      const c  = t < 0.5
        ? colA.clone().lerp(colB, t * 2)
        : colB.clone().lerp(colC, (t - 0.5) * 2);
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: window.innerWidth < 768 ? 0.032 : 0.026,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.82 : 0.55,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    // Mouse parallax
    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x =  (e.clientX / window.innerWidth  - 0.5) * 0.8;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.4;
    };
    window.addEventListener('mousemove', onMouse);

    let raf: number;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      // Rotasi lambat + drift mouse
      points.rotation.y = elapsed * 0.025 + mouse.x;
      points.rotation.x = elapsed * 0.01  + mouse.y;
      // Drift Z ringan untuk efek "napas"
      points.position.z = Math.sin(elapsed * 0.2) * 0.15;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const W2 = container.clientWidth;
      const H2 = container.clientHeight;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
    };
  }, [containerRef, isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 1,
      }}
    />
  );
}

// ─── Role Switcher ────────────────────────────────────────────────────────────
// Fade + slide — tidak menggeser elemen samping karena wrapper overflow hidden.

function RoleSwitcher({ roles }: { roles: readonly string[] }) {
  const [idx, setIdx]         = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const HOLD     = 2800;
    const FADE_OUT = 350;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(p => (p + 1) % roles.length);
        setVisible(true);
      }, FADE_OUT);
    }, HOLD);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <span style={{ display: 'block', overflow: 'hidden', minWidth: 0 }}>
      <span
        className="text-gradient"
        style={{
          display: 'block',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 4rem)',
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(10px)',
          transition: 'opacity 0.35s ease, transform 0.35s ease',
          willChange: 'opacity, transform',
        }}
      >
        {roles[idx]}
      </span>
    </span>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);
  const { t, lang }  = useApp();
  const isMobile     = useIsMobile();
  const isDark       = useIsDark();
  const roles        = t.hero.taglineRole;

  // GSAP entrance animation
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const children = Array.from(el.children) as HTMLElement[];
    children.forEach(c => {
      c.style.opacity   = '1';
      c.style.transform = 'none';
    });
    gsap.fromTo(
      children,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.13, ease: 'power3.out', delay: 0.5 },
    );
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      {/* Layer 0 — GIF background */}
      <Background isDark={isDark} />

      {/* Layer 1 — overlay untuk keterbacaan teks */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: isDark ? 'rgba(0,0,0,0.52)' : 'rgba(255,255,255,0.48)',
          backdropFilter: 'blur(1px)',
          WebkitBackdropFilter: 'blur(1px)',
        }}
      />

      {/* Layer 2 — Three.js particles */}
      <ThreeParticles containerRef={containerRef} isDark={isDark} />

      {/* Layer 3 — radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2,
          background:
            'radial-gradient(ellipse 70% 55% at 50% 30%, var(--accent-glow) 0%, transparent 65%)',
          opacity: 0.35,
        }}
      />

      {/* Layer 4 — content */}
      <div
        className="container-main"
        ref={contentRef}
        style={{
          position: 'relative', zIndex: 10,
          paddingTop: '6rem', paddingBottom: '4rem',
          width: '100%',
        }}
      >
        {/* Hero grid */}
        <div
          style={{
            display: isMobile ? 'flex' : 'grid',
            flexDirection: isMobile ? 'column' : undefined,
            gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
            gridTemplateRows: isMobile ? 'auto auto' : 'auto auto',
            gap: '0.75rem',
            marginBottom: '1rem',
          }}
        >
          {/* Box 1 — Role switcher */}
          <div
            style={{
              gridColumn: '1',
              gridRow: '1',
              padding: isMobile ? '1.25rem 0' : '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: isMobile ? 'flex-start' : 'flex-end',
              overflow: 'hidden',
              minWidth: 0,
            }}
          >
            <RoleSwitcher roles={roles} />
          </div>

          {/* Box 2 — Greeting + shortName */}
          <div
            style={{
              gridColumn: isMobile ? '1' : '2',
              gridRow: '1',
              padding: isMobile ? '0' : '2rem',
              paddingLeft: isMobile ? 0 : '2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderLeft: isMobile
                ? 'none'
                : '1px solid color-mix(in srgb, var(--accent) 25%, transparent)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.65rem, 1.3vw, 0.85rem)',
                fontWeight: 400,
                color: 'var(--text-secondary)',
                letterSpacing: '0.1em',
                marginBottom: '0.35rem',
                textTransform: 'uppercase',
              }}
            >
              {t.hero.greeting}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3.2vw, 2.8rem)',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
              }}
            >
              {SITE_CONFIG.personal.shortName}
            </span>
          </div>

          {/* Box 3 — Tagline */}
          {/* <div
            style={{
              gridColumn: '1 / -1',
              gridRow: isMobile ? '3' : '2',
              padding: isMobile ? '0.5rem 0' : '1.5rem 0 0',
              borderTop: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(0.85rem, 1.6vw, 1rem)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                maxWidth: 560,
              }}
            >
              {SITE_CONFIG.personal.tagline}
            </p>
          </div> */}
        </div>

        {/* Box 4 — Stats */}
        {/* <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: isMobile ? '1.5rem 2rem' : '2.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border)',
            marginBottom: '2.5rem',
          }}
        >
          {STATS.map((stat) => (
            <div key={stat.labelEn}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: isMobile ? '1.8rem' : '2.2rem',
                  fontWeight: 800,
                  color: 'var(--accent)',
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  marginTop: '0.3rem',
                  textTransform: 'uppercase',
                }}
              >
                {lang === 'id' ? stat.labelId : stat.labelEn}
              </div>
            </div>
          ))}
        </div> */}

        {/* CTAs */}
        {/* <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary"
          >
            {t.projects.title} →
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-outline"
          >
            {t.contact.eyebrow}
          </a>
        </div> */}
      </div>

      {/* Scroll indicator */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '0.5rem', opacity: 0.4, zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
          }}
        >
          {t.hero.scrollHint}
        </span>
        <div
          style={{
            width: 1, height: 36,
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
          }}
        />
      </div>
    </section>
  );
}