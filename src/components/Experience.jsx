import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/gsap.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { experience } from '../data/content.js'
import './Experience.css'

export default function Experience() {
  const root = useRef(null)
  const { t, lang } = useLanguage()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      gsap.from('.exp__row', {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.exp__list', start: 'top 78%' },
      })
      gsap.from('.experience .section-head', {
        y: 22,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
    },
    { scope: root, dependencies: [] }
  )

  const resolve = (v) => (typeof v === 'object' ? v[lang] : v)

  return (
    <section className="section experience" id="experience" ref={root}>
      <div className="container">
        <div className="section-head">
          <h2 className="section-label">{t.sections.experience}</h2>
          <span className="section-index">/ 04</span>
        </div>

        <div className="exp__list">
          {experience.map((item, i) => (
            <div className="exp__row" key={i}>
              <div className="exp__years">
                <span>{item.start}</span>
                <span className="exp__dash">—</span>
                <span>{resolve(item.end)}</span>
              </div>
              <div className="exp__main">
                <h3 className="exp__role">{resolve(item.role)}</h3>
                <span className="exp__company">{item.company}</span>
              </div>
              <p className="exp__desc">{resolve(item.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
