import { SITE_CONFIG } from '@/lib/data';
import { useApp } from '@/lib/context';

const EmailSVG = () => (
  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
);
const GithubSVG = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);
const LinkedinSVG = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const DownloadSVG = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);
const ViewSVG = () => (
  <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export function Footer() {
  const { t, lang } = useApp();

  const socials = [
    { href: `mailto:${SITE_CONFIG.personal.email}`, icon: <EmailSVG />, label: 'Email' },
    { href: SITE_CONFIG.socials.linkedin, icon: <LinkedinSVG />, label: 'LinkedIn' },
    { href: SITE_CONFIG.socials.github, icon: <GithubSVG />, label: 'GitHub' },
  ];

  return (
    <footer id="contact" className="section-pad" style={{ 
      borderTop: '1px solid var(--border)', 
      background: 'var(--bg)', 
      position: 'relative', 
      overflow: 'hidden',
      minHeight: '100svh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>

      {/* Decorative radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, var(--accent-glow, rgba(35,155,167,0.07)) 0%, transparent 70%)',
      }} />

      {/* Main content */}
      <div className="container-main" style={{ position: 'relative' }}>

        {/* Eyebrow */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            <span className="eyebrow-bar" />
            {lang === 'id' ? 'Kontak & Sosial' : 'Contact & Social'}
            <span className="eyebrow-bar" />
          </div>
        </div>

        {/* Photo — centered, full width up to max */}
        {/* <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 'clamp(100px, 18vw, 160px)',
            aspectRatio: '1/1',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid var(--border)',
            boxShadow: '0 0 0 6px var(--accent-light, rgba(35,155,167,0.08))',
            flexShrink: 0,
          }}>
            <img
              src={SITE_CONFIG.assets.photo}
              alt={SITE_CONFIG.personal.shortName}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
            />
          </div>
        </div> */}

        {/* Name + tagline */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <img src="/longicon.svg" alt={SITE_CONFIG.personal.shortName} style={{ height: 'clamp(12rem, 4vw, 24rem)', width: 'auto', marginBottom: '0.5rem', display: 'block', margin: '0 auto 0.5rem' }} />
        </div>

        {/* Status badge */}
        {/* <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: 9999,
            background: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.25)',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 6px #22c55e', flexShrink: 0 }} />
            <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#22c55e', fontWeight: 600 }}>
              {lang === 'id' ? 'Terbuka untuk Peluang' : 'Open to Opportunities'}
            </span>
          </div>
        </div> */}

        {/* Resume CTAs */}
        {/* <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <a
            href={SITE_CONFIG.assets.cv}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.7rem 1.4rem', borderRadius: 12,
              background: 'var(--accent)', color: '#fff',
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.82rem',
              letterSpacing: '-0.01em', textDecoration: 'none',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.opacity = '0.85';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = '';
            }}
            >
            <ViewSVG />
            {t.nav.viewResume}
          </a>
            <a
            href={SITE_CONFIG.assets.cv}
            download
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.7rem 1.4rem', borderRadius: 12,
              background: 'transparent',
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '0.82rem',
              letterSpacing: '-0.01em', textDecoration: 'none',
              transition: 'border-color 0.2s ease, transform 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--accent)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.borderColor = '';
              e.currentTarget.style.color = '';
              e.currentTarget.style.transform = '';
            }}
          >
            <DownloadSVG />
            {t.nav.downloadResume}
          </a>
        </div> */}

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: 320, margin: '0 auto 2.5rem' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            {lang === 'id' ? 'Temukan saya di' : 'Find me on'}
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {/* Social icons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.85rem', marginBottom: '1rem' }}>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.label !== 'Email' ? '_blank' : undefined}
              rel={s.label !== 'Email' ? 'noopener noreferrer' : undefined}
              aria-label={s.label}
              title={s.label}
              style={{
                width: 44, height: 44, borderRadius: 12,
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-muted)', textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.color = 'var(--accent)';
                e.currentTarget.style.background = 'var(--accent-light, rgba(35,155,167,0.08))';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.borderColor = '';
                e.currentTarget.style.color = '';
                e.currentTarget.style.background = '';
                e.currentTarget.style.transform = '';
              }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Email teks */}
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {SITE_CONFIG.personal.email}
        </p>
      </div>

      {/* Bottom bar */}
      {/* <div style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container-main" style={{
          padding: '1rem 1.5rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '0.5rem',
        }}>
          <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {t.footer.copyright} {new Date().getFullYear()} {SITE_CONFIG.personal.name}. {t.footer.rights}
          </p>
          <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {t.footer.builtWith} React · Vite · GSAP · Three.js
          </p>
        </div>
      </div> */}
    </footer>
  );
}