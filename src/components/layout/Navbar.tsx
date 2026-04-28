import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useApp } from '@/lib/context';
import { SITE_CONFIG } from '@/lib/data';
import { asset } from '@/lib/asset';

function SunIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="5"/>
      <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
    </svg>
  );
}
function ChevronIcon() {
  return (
    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
    </svg>
  );
}
function EyeIcon() {
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
function DownloadIcon() {
  return (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
    </svg>
  );
}

const NAV_LINKS = (t: any) => [
  { href: '#about',      label: t.nav.about },
  { href: '#projects',   label: t.nav.projects },
  { href: '#skills',     label: t.nav.skills },
  // { href: '#leadership', label: t.nav.leadership },
  { href: '#contact',    label: t.nav.contact },
];

export function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme, lang, setLang, t } = useApp();

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close resume dropdown on outside click
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (resumeRef.current && !resumeRef.current.contains(e.target as Node)) {
        setResumeOpen(false);
      }
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = NAV_LINKS(t);

  const scrolledBg = scrolled
    ? 'backdrop-blur-xl'
    : '';

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        transition: 'all 0.4s ease',
        padding: scrolled ? '0.6rem 0' : '1rem 0',
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
      className={scrolledBg}
    >
      <div className="container-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
          style={{ flex: 1, display: 'flex', justifyContent: 'flex-start', textDecoration: 'none' }}
        >
          <img
            src={
              theme === 'dark'
                ? asset('/favicon_dark.svg')
                : asset('/favicon.svg')
            }
            alt="Logo"
            style={{ height: 32, width: 'auto' }}
          />
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="hidden-mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              style={{
                padding: '0.45rem 0.85rem', borderRadius: 9999,
                fontSize: '0.82rem', fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s, background 0.2s',
              }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--accent)'; (e.target as HTMLElement).style.background = 'var(--accent-light)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--text-secondary)'; (e.target as HTMLElement).style.background = 'transparent'; }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Controls */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem' }} className="hidden-mobile">
          {/* Lang toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
            style={{
              padding: '0.4rem 0.75rem', borderRadius: 9999,
              border: '1px solid var(--border)',
              background: 'transparent', color: 'var(--text-secondary)',
              fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em', cursor: 'pointer',
              transition: 'all 0.2s', fontWeight: 600,
            }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.borderColor = 'var(--accent)'; (e.target as HTMLElement).style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.borderColor = 'var(--border)'; (e.target as HTMLElement).style.color = 'var(--text-secondary)'; }}
            title={lang === 'en' ? 'Switch to Indonesian' : 'Ganti ke Inggris'}
          >
            {lang === 'en' ? '🇮🇩 ID' : '🇬🇧 EN'}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              width: 36, height: 36, borderRadius: 9999,
              border: '1px solid var(--border)',
              background: 'transparent', color: 'var(--text-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => { (e.currentTarget).style.borderColor = 'var(--accent)'; (e.currentTarget).style.color = 'var(--accent)'; (e.currentTarget).style.background = 'var(--accent-light)'; }}
            onMouseLeave={(e) => { (e.currentTarget).style.borderColor = 'var(--border)'; (e.currentTarget).style.color = 'var(--text-secondary)'; (e.currentTarget).style.background = 'transparent'; }}
            title={theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Resume dropdown */}
          <div ref={resumeRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setResumeOpen(!resumeOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.45rem 1rem', borderRadius: 9999,
                background: 'var(--accent)', color: '#fff',
                border: 'none', fontWeight: 600, fontSize: '0.82rem',
                cursor: 'pointer', transition: 'opacity 0.2s, transform 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget).style.opacity = '0.85'; (e.currentTarget).style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { (e.currentTarget).style.opacity = '1'; (e.currentTarget).style.transform = ''; }}
            >
              {t.nav.resume}
              <span style={{ transition: 'transform 0.2s', transform: resumeOpen ? 'rotate(180deg)' : 'rotate(0)' }}>
                <ChevronIcon />
              </span>
            </button>
            {resumeOpen && (
              <div className="dropdown-menu">
                <a href={SITE_CONFIG.assets.cv} target="_blank" rel="noopener noreferrer" className="dropdown-item" onClick={() => setResumeOpen(false)}>
                  <EyeIcon /> {t.nav.viewResume}
                </a>
                <a href={SITE_CONFIG.assets.cv} download className="dropdown-item" onClick={() => setResumeOpen(false)}>
                  <DownloadIcon /> {t.nav.downloadResume}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Mobile hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="show-mobile">
          <button onClick={toggleTheme} style={{ width: 32, height: 32, borderRadius: 9999, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ padding: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px' }}
            aria-label="Menu"
          >
            {[0,1,2].map((i) => (
              <span key={i} style={{
                display: 'block', width: 22, height: 2, background: 'var(--text)',
                borderRadius: 2,
                transition: 'all 0.3s',
                transform: menuOpen ? (i === 0 ? 'rotate(45deg) translateY(7px)' : i === 2 ? 'rotate(-45deg) translateY(-7px)' : 'scaleX(0)') : 'none',
                opacity: (menuOpen && i === 1) ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div style={{
        overflow: 'hidden', maxHeight: menuOpen ? 480 : 0, opacity: menuOpen ? 1 : 0,
        transition: 'max-height 0.35s ease, opacity 0.3s ease',
        background: 'var(--surface)', borderTop: menuOpen ? '1px solid var(--border)' : 'none',
      }}>
        <div className="container-main" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              style={{ padding: '0.65rem 0.75rem', borderRadius: 8, fontSize: '0.9rem', color: 'var(--text-secondary)', textDecoration: 'none', transition: 'all 0.2s' }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--accent)'; (e.target as HTMLElement).style.background = 'var(--accent-light)'; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--text-secondary)'; (e.target as HTMLElement).style.background = 'transparent'; }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.75rem', marginTop: '0.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
              style={{ padding: '0.45rem 0.9rem', borderRadius: 9999, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}>
              {lang === 'en' ? '🇮🇩 Bahasa ID' : '🇬🇧 English'}
            </button>
            <a href={SITE_CONFIG.assets.cv} target="_blank" rel="noopener noreferrer"
              style={{ padding: '0.45rem 0.9rem', borderRadius: 9999, background: 'var(--accent)', color: '#fff', fontSize: '0.78rem', textDecoration: 'none', fontWeight: 600 }}>
              {t.nav.resume}
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) { .hidden-mobile { display: flex !important; } .show-mobile { display: none !important; } }
        @media (max-width: 767px) { .hidden-mobile { display: none !important; } .show-mobile { display: flex !important; } }
      `}</style>
    </nav>
  );
}
