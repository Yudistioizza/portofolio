import { useEffect, useRef, useState  } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS_LIST, TECH_MARQUEE } from '@/lib/data';
import { useApp } from '@/lib/context';

gsap.registerPlugin(ScrollTrigger);

// SVG icons for skill pills - using devicons-style inline SVGs or emoji fallback
const DEVICON_MAP: Record<string, string> = {
  'PHP':          'php',
  'Laravel':      'laravel',
  'JavaScript':   'javascript',
  'TypeScript':   'typescript',
  'React':        'react',
  'Next.js':      'nextjs',
  'Node.js':      'nodejs',
  'HTML5':        'html5',
  'CSS3':         'css3',
  'Tailwind CSS': 'tailwindcss',
  'MySQL':        'mysql',
  'PostgreSQL':   'postgresql',
  'REST API':     'fastapi',       // placeholder — tidak ada icon REST API resmi
  'GitHub':       'github',
  'JWT':          'javascript',    // placeholder
  'Ubuntu':       'ubuntu',
  'Vite':         'vite',
  'WordPress':    'wordpress',
};

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useApp();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-head', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        y: 40, opacity: 0, duration: 0.7, ease: 'power3.out',
      });
      gsap.from('.skill-pill', {
        scrollTrigger: { trigger: '.pills-wrap', start: 'top 82%' },
        y: 30, opacity: 0, scale: 0.88,
        duration: 0.45, stagger: 0.03, ease: 'back.out(1.5)',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const words = Array.isArray(t.skills.subtitleBold) 
    ? t.skills.subtitleBold 
    : [t.skills.subtitleBold];
  const [wordIdx, setWordIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (words.length <= 1) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % words.length);
        setVisible(true);
      }, 300); // fade out 300ms lalu ganti kata
    }, 2000); // ganti setiap 2 detik
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section id="skills" ref={sectionRef} className="section-pad" style={{ background: 'var(--bg)' }}>
      <div className="container-main">
        {/* Heading block — like the reference: large ghost text + small title */}
        <div className="skills-head" style={{ position: 'relative', textAlign: 'center', marginBottom: '3.5rem' }}>
          {/* Ghost watermark */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none', zIndex: 0,
          }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 14vw, 9rem)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
              color: 'var(--border)',
              userSelect: 'none',
              lineHeight: 1,
            }}>
              {t.skills.title.split(' ')[0].toUpperCase()}
            </span>
          </div>

          {/* Actual heading on top */}
          <div style={{ position: 'relative', zIndex: 1, paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
            <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '0.5rem' }}><span className="eyebrow-bar" />{t.skills.eyebrow}<span className="eyebrow-bar" /></div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)' }}>
              {t.skills.title}
            </h2>
          </div>
        </div>

        {/* Subtitle line */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ flex: 1, height: 1, width: '3rem', background: 'var(--border)' }} />
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.7rem, 1.5vw, 0.9rem)',
              letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--text-secondary)',
            }}>
              {t.skills.subtitle}{' '}
              <span style={{
                color: 'var(--accent)',
                fontWeight: 700,
                display: 'inline-block',
                minWidth: '8ch',           // ← cegah layout shift saat kata berganti
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(-6px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}>
                {words[wordIdx]}
              </span>
            </span>
            <div style={{ flex: 1, height: 1, width: '3rem', background: 'var(--border)' }} />
          </div>
        </div>

        {/* Pills cloud */}
        <div
          className="pills-wrap"
          style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', justifyContent: 'center', maxWidth: 860, margin: '0 auto 4rem' }}
        >
          {SKILLS_LIST.map((skill) => {
            const slug = DEVICON_MAP[skill.name];
            return (
              <div key={skill.name} className="skill-pill">
                {slug ? (
                  <img
                    src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}/${slug}-original.svg`}
                    alt={skill.name}
                    width={18}
                    height={18}
                    style={{ flexShrink: 0, objectFit: 'contain' }}
                    onError={(e) => {
                      // fallback ke plain icon jika slug tidak tersedia
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <span style={{ fontSize: '1rem', lineHeight: 1, flexShrink: 0 }}>⚙️</span>
                )}
                <span>{skill.name}</span>
              </div>
            );
          })}
        </div>

        {/* Marquee */}
        <div style={{ position: 'relative', overflow: 'hidden', paddingBlock: '1.5rem', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, var(--bg), transparent)', zIndex: 2 }} />
          <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, var(--bg), transparent)', zIndex: 2 }} />
          <div className="marquee-track" style={{ display: 'flex', gap: '1.25rem', width: 'max-content' }}>
            {[...TECH_MARQUEE, ...TECH_MARQUEE].map((item, i) => (
              <span key={i} style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 2.5vw, 1.5rem)',
                fontWeight: item === '✦' ? 400 : 700,
                color: item === '✦' ? 'var(--accent)' : 'var(--border-hover)',
                letterSpacing: '-0.01em',
                userSelect: 'none',
                transition: 'color 0.2s',
              }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
