import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LEADERSHIP_ROLES, CERTIFICATIONS } from '@/lib/data';
import { useApp } from '@/lib/context';

gsap.registerPlugin(ScrollTrigger);

export function Leadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, lang } = useApp();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lead-head', { scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }, y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' });
      gsap.from('.lead-card', { scrollTrigger: { trigger: '.lead-grid', start: 'top 82%' }, y: 50, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' });
      gsap.from('.cert-item', { scrollTrigger: { trigger: '.cert-grid', start: 'top 85%' }, scale: 0.9, opacity: 0, duration: 0.45, stagger: 0.06, ease: 'back.out(1.4)' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="leadership" ref={sectionRef} className="section-pad" style={{ background: 'var(--bg)' }}>
      <div className="container-main">
        {/* Heading */}
        <div className="lead-head" style={{ marginBottom: '3.5rem' }}>
          <div className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="eyebrow-bar" />{t.leadership.eyebrow}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.75rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            {t.leadership.title} <span className="text-gradient">{t.leadership.titleAccent}</span>
          </h2>
        </div>

        {/* Leadership roles */}
        <div style={{ marginBottom: '4rem' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>✦ {t.leadership.rolesTitle}</p>
          <div className="lead-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {LEADERSHIP_ROLES.map((role) => (
              <div key={role.id} className="lead-card card" style={{ padding: '1.4rem', position: 'relative', overflow: 'hidden', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: 'linear-gradient(180deg, var(--accent) 0%, transparent 100%)' }} />
                <div style={{ paddingLeft: '0.4rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>{role.period}</div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.2rem', letterSpacing: '-0.01em' }}>
                    {lang === 'id' ? role.titleId : role.titleEn}
                  </h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent)', marginBottom: '0.6rem' }}>{role.organization}</p>
                  <p style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
                    {lang === 'id' ? role.descriptionId : role.descriptionEn}
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {role.achievements.slice(0, 2).map((a, i) => (
                      <li key={i} style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.4rem' }}>
                        <span style={{ color: 'var(--accent)', flexShrink: 0 }}>▸</span>{a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>✦ {t.leadership.certsTitle}</p>
          <div className="cert-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '0.85rem' }}>
            {CERTIFICATIONS.map((cert) => (
              <div key={cert.id} className="cert-item card" style={{ padding: '1.25rem', textAlign: 'center', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, rgba(251,191,36,0.12), rgba(234,88,12,0.08))', border: '1px solid rgba(251,191,36,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', fontSize: '1.25rem' }}>
                  🏆
                </div>
                <h4 style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text)', marginBottom: '0.3rem', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {cert.name}
                </h4>
                <p style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>{cert.issuer}</p>
                <p style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{cert.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
