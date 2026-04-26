import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from '@/lib/data';
import { useApp } from '@/lib/context';

gsap.registerPlugin(ScrollTrigger);

const GithubSVG = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);
const LinkedinSVG = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const MailSVG = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
  </svg>
);
const FileSVG = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
  </svg>
);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, lang } = useApp();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-block', { scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' }, y: 50, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.contact-row > *', { scrollTrigger: { trigger: '.contact-row', start: 'top 84%' }, y: 30, opacity: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const links = [
    { icon: <MailSVG />, label: 'Email', value: SITE_CONFIG.personal.email, href: `mailto:${SITE_CONFIG.personal.email}`, color: '#2dd4d4' },
    { icon: <LinkedinSVG />, label: 'LinkedIn', value: 'linkedin.com/in/yudistioizza', href: SITE_CONFIG.socials.linkedin, color: '#0a66c2', external: true },
    { icon: <GithubSVG />, label: 'GitHub', value: 'github.com/yudistioizza', href: SITE_CONFIG.socials.github, color: 'var(--text)', external: true },
    { icon: <FileSVG />, label: t.nav.downloadResume, value: lang === 'id' ? 'Unduh CV PDF' : 'Download CV PDF', href: SITE_CONFIG.assets.cv, color: '#10b981', download: true },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-pad" style={{ background: 'var(--bg-alt)' }}>
      <div className="container-main">
        {/* CTA block */}
        <div className="cta-block" style={{ maxWidth: 680, margin: '0 auto 4rem', textAlign: 'center' }}>
          <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '1rem' }}>
            <span className="eyebrow-bar" />{t.contact.eyebrow}<span className="eyebrow-bar" />
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.75rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '1.1rem', lineHeight: 1.1 }}>
            {t.contact.title}{' '}
            <span className="text-gradient">{t.contact.titleAccent}</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.95rem', maxWidth: 500, margin: '0 auto 2rem' }}>
            {t.contact.subtitle}{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{t.contact.subtitleAccent}</span>
            {t.contact.subtitleEnd}
          </p>

          {/* Availability badge */}
          {SITE_CONFIG.status.available && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.65rem 1.5rem', borderRadius: 9999, background: 'var(--accent-light)', border: '1px solid color-mix(in srgb, var(--accent) 30%, transparent)', marginBottom: '0.5rem' }}>
              <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
              <span style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--accent)' }}>{t.contact.available}</span>
            </div>
          )}
          <p style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', letterSpacing: '0.08em', marginTop: '0.5rem' }}>
            {t.contact.lookingFor} {SITE_CONFIG.status.lookingFor.join(' · ')}
          </p>
        </div>

        {/* Contact links */}
        <div className="contact-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', maxWidth: 900, margin: '0 auto' }}>
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              download={link.download ? true : undefined}
              className="card"
              style={{ padding: '1.5rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'transform 0.2s' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent-light)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: link.color, flexShrink: 0 }}>
                {link.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text)', marginBottom: '0.2rem' }}>{link.label}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.value}</div>
              </div>
              <svg style={{ marginLeft: 'auto', flexShrink: 0, color: 'var(--text-muted)', opacity: 0.5 }} width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
