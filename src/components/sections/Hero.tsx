import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { SITE_CONFIG, STATS } from '@/lib/data';
import { useApp } from '@/lib/context';

function ThreeParticles({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const W = container.clientWidth || window.innerWidth;
    const H = container.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 1000);
    camera.position.z = 4;

    // Teal-themed particles matching the accent
    const count = window.innerWidth < 768 ? 600 : 1400;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const colA = new THREE.Color(isDark ? '#2dd4d4' : '#00868a');
    const colB = new THREE.Color(isDark ? '#1a8080' : '#004d50');

    for (let i = 0; i < count; i++) {
      // Scatter particles in a galaxy-like field
      const spread = 6;
      positions[i * 3]     = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.4;

      const t = Math.random();
      const c = colA.clone().lerp(colB, t);
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.022,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.85 : 0.55,
      sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener('mousemove', onMouse);

    let raf: number;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.03 + mouse.x;
      points.rotation.x = mouse.y * 0.5;
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
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    />
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useApp();
  const roles = t.hero.taglineRole;
  const [roleIdx, setRoleIdx] = useState(0);
  const [display, setDisplay] = useState('');
  const [typing, setTyping] = useState(true);

  // Typewriter
  useEffect(() => {
    const cur = roles[roleIdx];
    const timer = typing
      ? setTimeout(() => {
          if (display.length < cur.length) setDisplay(cur.slice(0, display.length + 1));
          else setTimeout(() => setTyping(false), 2000);
        }, 75)
      : setTimeout(() => {
          if (display.length > 0) setDisplay(display.slice(0, -1));
          else { setRoleIdx((p) => (p + 1) % roles.length); setTyping(true); }
        }, 40);
    return () => clearTimeout(timer);
  }, [display, typing, roleIdx, roles]);

  // GSAP entrance
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const children = Array.from(el.children) as HTMLElement[];
    
    // Paksa visible dulu sebagai fallback
    children.forEach(c => {
      (c as HTMLElement).style.opacity = '1';
      (c as HTMLElement).style.transform = 'none';
    });

    // Lalu animasikan
    gsap.fromTo(children,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 1, stagger: 0.13,
        ease: 'power3.out', delay: 0.6,
      }
    );
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      style={{
        position: 'relative', minHeight: '100svh',
        display: 'flex', alignItems: 'center', overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      <ThreeParticles containerRef={containerRef} />

      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 55% at 50% 30%, var(--accent-glow) 0%, transparent 65%)',
        opacity: 0.4,
      }} />

      <div className="container-main" style={{ position: 'relative', zIndex: 10, paddingTop: '6rem', paddingBottom: '4rem' }} ref={contentRef}>
        {/* Status pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.35rem 0.9rem', borderRadius: 9999,
            background: 'var(--accent-light)', border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)',
            fontSize: '0.72rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
            color: 'var(--accent)', textTransform: 'uppercase',
          }}>
            <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
            {t.hero.available}
          </span>
        </div>

        {/* Name + typewriter */}
        <h1 style={{ fontFamily: 'var(--font-display)', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
          <span style={{ display: 'block', fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)', fontWeight: 400, color: 'var(--text-secondary)', letterSpacing: '0.08em', marginBottom: '0.4rem', fontFamily: 'var(--font-mono)' }}>
            {t.hero.greeting} {SITE_CONFIG.personal.shortName}
          </span>
          <span style={{ display: 'block', fontSize: 'clamp(3.5rem, 10vw, 8.5rem)', fontWeight: 800 }}>
            <span className="text-gradient">{display}</span>
            <span className="cursor-blink" style={{ display: 'inline-block', width: '0.05em', height: '0.8em', background: 'var(--accent)', marginLeft: '0.06em', verticalAlign: 'middle' }} />
          </span>
        </h1>

        {/* Tagline */}
        <p style={{ maxWidth: 520, fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '2.5rem' }}>
          {SITE_CONFIG.personal.tagline}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
          <a href="#projects" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary">
            {t.projects.title} →
          </a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-outline">
            {t.contact.eyebrow}
          </a>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
          {STATS.map((stat) => (
            <div key={stat.labelEn}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
                {stat.value}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.12em', color: 'var(--text-muted)', marginTop: '0.35rem', textTransform: 'uppercase' }}>
                {lang === 'id' ? stat.labelId : stat.labelEn}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', opacity: 0.4 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{t.hero.scrollHint}</span>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, var(--accent), transparent)' }} />
      </div>
    </section>
  );
}
