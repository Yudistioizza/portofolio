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
    <section id="about" ref={sectionRef} className="section-pad" style={{ background: 'var(--bg-alt)' }}>
      <div className="container-main">
        <div className="about-top" style={{ marginBottom: '3.5rem' }}>
          <div className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="eyebrow-bar" />{t.about.eyebrow}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.75rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            {t.about.title}
          </h2>
        </div>

        <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1rem', alignItems: 'start' }}>
          {/* Left */}
          <div className="about-col-l">
            {/* Photo placeholder */}
            <div style={{ 
              width: '100%', 
              maxWidth: 340,        // ← diperkecil dari 340
              aspectRatio: '3/4',   // ← lebih compact dari 4/5
              borderRadius: 16, 
              border: '1px solid var(--border)', 
              overflow: 'hidden',
              boxShadow: 'var(--card-shadow)',
              flexShrink: 0,
              margin: '0 auto'
            }}>
              <img 
                src={SITE_CONFIG.assets.photo}    // ← sesuaikan nama file aslimu
                alt="Yudistio"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            {/* Meta grid */}
            {/* <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              {meta.map((item) => (
                <div key={item.label} className="card" style={{ padding: '0.85rem 1rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>{item.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text)', fontWeight: 500, wordBreak: 'break-all', lineHeight: 1.4 }}>{item.value}</div>
                </div>
              ))}
            </div> */}
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
