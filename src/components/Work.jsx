import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/gsap.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { featuredProjects, moreProjects } from '../data/content.js'
import './Work.css'

function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 12L12 4M12 4H5.5M12 4V10.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Work() {
  const root = useRef(null)
  const { t, lang } = useLanguage()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return // gsap.from() leaves content visible

      gsap.from('.work__card', {
        y: 60,
        autoAlpha: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.work__grid', start: 'top 80%' },
      })

      gsap.from('.work .section-head, .work__intro', {
        y: 22,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 72%' },
      })

      gsap.from('.work__more-row', {
        y: 30,
        autoAlpha: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.07,
        scrollTrigger: { trigger: '.work__more', start: 'top 85%' },
      })

      gsap.from('.work__more-head', {
        y: 22,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.work__more', start: 'top 88%' },
      })
    },
    { scope: root, dependencies: [] }
  )

  return (
    <section className="section work" id="work" ref={root}>
      <div className="container">
        <div className="section-head">
          <h2 className="section-label">{t.sections.work}</h2>
          <span className="section-index">/ 02</span>
        </div>
        <p className="work__intro">{t.workIntro}</p>

        <div className="work__grid">
          {featuredProjects.map((p, i) => {
            const hasLink = p.link && p.link !== '#'
            const Tag = hasLink ? 'a' : 'div'
            return (
              <Tag
                key={p.id}
                className="work__card"
                {...(hasLink
                  ? { href: p.link, target: '_blank', rel: 'noreferrer', 'data-cursor': '' }
                  : {})}
                aria-label={hasLink ? `${p.name} — ${p.role[lang]} (opens in a new tab)` : undefined}
              >
                <div className="work__media">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={`${p.name} website`}
                      loading="lazy"
                      decoding="async"
                      width="1200"
                      height="880"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  ) : (
                    <div className="work__placeholder">
                      <span className="work__placeholder-num">0{i + 1}</span>
                      <span className="work__placeholder-name">{p.name}</span>
                    </div>
                  )}
                  <span className="work__media-arrow">
                    <ArrowUpRight />
                  </span>
                </div>

                <div className="work__body">
                  <div className="work__head">
                    <h3 className="work__name">{p.name}</h3>
                    <span className="work__year">{p.year}</span>
                  </div>
                  <span className="work__role">{p.role[lang]}</span>
                  <p className="work__desc">{p.description[lang]}</p>
                  <ul className="work__tags">
                    {p.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  {hasLink && (
                    <span className="work__view">
                      {t.visitSite} <ArrowUpRight />
                    </span>
                  )}
                </div>
              </Tag>
            )
          })}
        </div>

        <div className="work__more">
          <div className="work__more-head">
            <span className="section-label">{t.moreWork}</span>
            <span className="work__more-count">{moreProjects.length}</span>
          </div>
          <ul className="work__more-list">
            {moreProjects.map((p) => {
              const hasLink = p.link && p.link !== '#'
              const Tag = hasLink ? 'a' : 'div'
              return (
                <Tag
                  key={p.name}
                  className="work__more-row"
                  {...(hasLink
                    ? { href: p.link, target: '_blank', rel: 'noreferrer', 'data-cursor': '' }
                    : {})}
                >
                  <span className="work__more-name">
                    {p.name}
                    {hasLink && <ArrowUpRight />}
                  </span>
                  <span className="work__more-summary">{p.summary[lang]}</span>
                  <span className="work__more-tags">
                    {p.tags.map((tag) => (
                      <em key={tag}>{tag}</em>
                    ))}
                  </span>
                  <span className="work__more-year">{p.year}</span>
                </Tag>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
