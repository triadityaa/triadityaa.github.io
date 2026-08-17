import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/gsap.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { skills } from '../data/content.js'
import './Skills.css'

export default function Skills() {
  const root = useRef(null)
  const { t } = useLanguage()

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        // Show bars and percentages at their final values, no animation.
        gsap.utils.toArray('.skill').forEach((rowEl) => {
          const fill = rowEl.querySelector('.skill__fill')
          const num = rowEl.querySelector('.skill__pct')
          const level = Number(rowEl.dataset.level)
          if (fill) gsap.set(fill, { scaleX: level / 100 })
          if (num) num.textContent = level + '%'
        })
        return
      }

      gsap.from('.skills .section-head, .skills__intro', {
        y: 22,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })

      const rows = gsap.utils.toArray('.skill')
      rows.forEach((rowEl, i) => {
        const fill = rowEl.querySelector('.skill__fill')
        const num = rowEl.querySelector('.skill__pct')
        const level = Number(rowEl.dataset.level)
        const counter = { v: 0 }

        const tl = gsap.timeline({
          scrollTrigger: { trigger: rowEl, start: 'top 88%' },
        })
        tl.from(rowEl, { y: 30, autoAlpha: 0, duration: 0.7, ease: 'power3.out', delay: i * 0.05 })
          .fromTo(
            fill,
            { scaleX: 0 },
            { scaleX: level / 100, duration: 1.3, ease: 'expo.out' },
            '<0.1'
          )
          .to(
            counter,
            {
              v: level,
              duration: 1.3,
              ease: 'expo.out',
              onUpdate: () => {
                if (num) num.textContent = Math.round(counter.v) + '%'
              },
            },
            '<'
          )
      })
    },
    { scope: root, dependencies: [] }
  )

  return (
    <section className="section skills" id="skills" ref={root}>
      <div className="container">
        <div className="section-head">
          <h2 className="section-label">{t.sections.skills}</h2>
          <span className="section-index">/ 06</span>
        </div>
        <p className="skills__intro">{t.skillsIntro}</p>

        <div className="skills__list">
          {skills.map((s) => (
            <div className="skill" key={s.name} data-level={s.level}>
              <div className="skill__head">
                <span className="skill__name">{s.name}</span>
                <span className="skill__pct">0%</span>
              </div>
              <div className="skill__bar">
                <span className="skill__fill" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
