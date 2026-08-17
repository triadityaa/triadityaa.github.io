import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/gsap.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { education } from '../data/content.js'
import './Education.css'

export default function Education() {
  const root = useRef(null)
  const { t, lang } = useLanguage()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      gsap.from('.edu__item', {
        y: 44,
        autoAlpha: 0,
        duration: 0.95,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.edu__list', start: 'top 80%' },
      })
      gsap.from('.education .section-head', {
        y: 22,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
    },
    { scope: root, dependencies: [] }
  )

  return (
    <section className="section education" id="education" ref={root}>
      <div className="container">
        <div className="section-head">
          <h2 className="section-label">{t.sections.education}</h2>
          <span className="section-index">/ 05</span>
        </div>

        <div className="edu__list">
          {education.map((e, i) => (
            <article className="edu__item" key={i}>
              <div className="edu__top">
                <div>
                  <h3 className="edu__school">{e.school}</h3>
                  <span className="edu__degree">{e.degree[lang]}</span>
                </div>
                <span className="edu__period">{e.period}</span>
              </div>
              <ul className="edu__achievements">
                {e.achievements[lang].map((a, j) => (
                  <li key={j}>
                    <span className="edu__bullet">↳</span>
                    {a}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
