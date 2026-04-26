import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG, EXPERIENCE } from '@/lib/data';
import { useApp } from '@/lib/context';

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, lang } = useApp();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-top', { scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' }, y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' });
      gsap.from('.about-col-l', { scrollTrigger: { trigger: '.about-grid', start: 'top 80%' }, x: -40, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.about-col-r', { scrollTrigger: { trigger: '.about-grid', start: 'top 80%' }, x: 40, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.1 });
      gsap.from('.tl-item', { scrollTrigger: { trigger: '.tl-wrap', start: 'top 82%' }, x: -30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const meta = [
    { label: t.meta.location, value: SITE_CONFIG.personal.location.display },
    { label: t.meta.university, value: 'UNSIKA – Karawang' },
    { label: t.meta.email, value: SITE_CONFIG.personal.email },
    { label: t.meta.status, value: t.meta.openToWork },
  ];

  return (
    <section id="about" ref={sectionRef} className="section-pad" style={{ background: 'var(--bg)' }}>
      <div className="container-main">
        <div className="about-top" style={{ marginBottom: '3.5rem' }}>
          <div className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="eyebrow-bar" />{t.about.eyebrow}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.75rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            {t.about.title}
          </h2>
        </div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3.5rem', alignItems: 'start' }}>
          {/* Left */}
          <div className="about-col-l">
            {/* Photo placeholder */}
            <div style={{ width: '100%', maxWidth: 340, aspectRatio: '4/5', borderRadius: 20, border: '1px solid var(--border)', background: 'linear-gradient(135deg, var(--surface) 0%, var(--surface-2) 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem', position: 'relative', overflow: 'hidden', boxShadow: 'var(--card-shadow)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '60%', background: 'radial-gradient(ellipse at 50% 0%, var(--accent-glow) 0%, transparent 70%)', opacity: 0.4 }} />
              <svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="var(--accent)" strokeWidth={0.8} style={{ opacity: 0.3 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', marginTop: '0.5rem', fontFamily: 'var(--font-mono)' }}>foto.jpg</p>
            </div>

            {/* Meta grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {meta.map((item) => (
                <div key={item.label} className="card" style={{ padding: '0.85rem 1rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>{item.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text)', fontWeight: 500, wordBreak: 'break-all', lineHeight: 1.4 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="about-col-r">
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.9rem' }}>{t.about.backgroundTitle}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '0.85rem', fontSize: '0.9rem' }}>{t.about.bio1}</p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '2.5rem' }}>{t.about.bio2}</p>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--text)', marginBottom: '1.5rem' }}>{t.about.experienceTitle}</h3>
            <div className="tl-wrap" style={{ display: 'flex', flexDirection: 'column' }}>
              {EXPERIENCE.map((exp, i) => (
                <div key={exp.id} className="tl-item" style={{ display: 'flex', gap: '1.1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 12px var(--accent-glow)', marginTop: 4 }} />
                    {i < EXPERIENCE.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border)', margin: '5px 0' }} />}
                  </div>
                  <div style={{ paddingBottom: i < EXPERIENCE.length - 1 ? '1.75rem' : 0, flex: 1 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{exp.period}</div>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.15rem' }}>{lang === 'id' ? exp.roleId : exp.roleEn}</h4>
                    <p style={{ fontSize: '0.78rem', color: 'var(--accent)', marginBottom: '0.4rem' }}>{exp.organization}</p>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{lang === 'id' ? exp.descriptionId : exp.descriptionEn}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.6rem' }}>
                      {exp.technologies.slice(0, 4).map((tech) => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
