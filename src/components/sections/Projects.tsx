import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, FEATURED_PROJECTS, type Project } from '@/lib/data';
import { useApp } from '@/lib/context';

gsap.registerPlugin(ScrollTrigger);

const STATUS = {
  completed: { bg: 'rgba(34,197,94,0.1)', color: '#22c55e', en: 'Completed', id: 'Selesai' },
  ongoing:   { bg: 'rgba(234,179,8,0.1)',  color: '#eab308', en: 'Ongoing',   id: 'Berlangsung' },
  wip:       { bg: 'rgba(59,130,246,0.1)', color: '#3b82f6', en: 'WIP',       id: 'WIP' },
};

const ProjectImage = ({ project }: { project: Project }) => {
  const icons: Record<string, string> = {
    'minid-portal':  '⚡',
    'minid-tableau': '📊',
  };
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '14px 14px 0 0', flexShrink: 0 }}>
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
      ) : null}
      {/* Fallback / overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(135deg, var(--accent-light), var(--surface-2))`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '3rem',
      }}>
        {icons[project.id] ?? '🖥️'}
      </div>
      {project.image && (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, var(--surface) 100%)' }} />
      )}
    </div>
  );
};

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, lang } = useApp();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.proj-head', { scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }, y: 40, opacity: 0, duration: 0.7, ease: 'power3.out' });
      gsap.from('.feat-card', { scrollTrigger: { trigger: '.feat-wrap', start: 'top 82%' }, y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' });
      gsap.from('.all-card',  { scrollTrigger: { trigger: '.all-wrap',  start: 'top 85%' }, y: 40, opacity: 0, duration: 0.55, stagger: 0.07, ease: 'power2.out' });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-pad" style={{ background: 'var(--bg-alt)' }}>
      <div className="container-main">
        {/* Heading */}
        <div className="proj-head" style={{ marginBottom: '3.5rem' }}>
          <div className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="eyebrow-bar" />{t.projects.eyebrow}</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.75rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            {t.projects.title}
          </h2>
        </div>

        {/* Featured */}
        {FEATURED_PROJECTS.length > 0 && (
          <div className="feat-wrap" style={{ marginBottom: '4rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>✦ {t.projects.featured}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {FEATURED_PROJECTS.map((project) => {
                const s = STATUS[project.status];
                return (
                  <div key={project.id} className="feat-card card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', transition: 'transform 0.25s ease' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; }}>
                    <ProjectImage project={project} />
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem', gap: '0.5rem' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent)', letterSpacing: '0.08em', lineHeight: 1.4 }}>{project.organization}</span>
                        <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.15rem 0.55rem', borderRadius: 9999, background: s.bg, color: s.color, border: `1px solid ${s.color}40`, flexShrink: 0 }}>
                          {lang === 'id' ? s.id : s.en}
                        </span>
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.6rem', letterSpacing: '-0.02em' }}>{project.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1rem', flex: 1 }}>
                        {lang === 'id' ? project.descriptionId : project.descriptionEn}
                      </p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.1rem' }}>
                        {project.technologies.map((tech) => <span key={tech} className="tech-tag">{tech}</span>)}
                      </div>
                      {(project.links?.live || project.links?.github) && (
                        <div style={{ display: 'flex', gap: '0.6rem' }}>
                          {project.links?.live && <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.78rem', padding: '0.5rem 1.1rem' }}>Live →</a>}
                          {project.links?.github && <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '0.78rem', padding: '0.5rem 1.1rem' }}>GitHub</a>}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All projects */}
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>✦ {t.projects.allProjects}</p>
          <div className="all-wrap" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {PROJECTS.map((project) => {
              const s = STATUS[project.status];
              return (
                <div key={project.id} className="all-card card" style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ''; }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', gap: '0.5rem', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent)', letterSpacing: '0.08em', lineHeight: 1.4 }}>{project.organization}</span>
                    <span style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em', textTransform: 'uppercase', padding: '0.12rem 0.5rem', borderRadius: 9999, background: s.bg, color: s.color, border: `1px solid ${s.color}40`, flexShrink: 0 }}>
                      {lang === 'id' ? s.id : s.en}
                    </span>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{project.title}</h4>
                  <p style={{ fontSize: '0.77rem', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', marginBottom: '0.9rem' }}>
                    {lang === 'id' ? project.descriptionId : project.descriptionEn}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '0.6rem' }}>
                    {project.technologies.slice(0, 3).map((tech) => <span key={tech} className="tech-tag" style={{ fontSize: '0.6rem' }}>{tech}</span>)}
                    {project.technologies.length > 3 && <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>+{project.technologies.length - 3}</span>}
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{project.year}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
