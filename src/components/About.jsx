import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/gsap.js'
import { splitWords } from '../lib/splitText.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import './About.css'

export default function About() {
  const root = useRef(null)
  const { t, lang } = useLanguage()

  useGSAP(
    () => {
      const lead = root.current.querySelector('.about__lead')
      const words = splitWords(lead)

      if (prefersReducedMotion()) {
        gsap.set(words, { yPercent: 0 })
        return
      }

      gsap.set(words, { yPercent: 110 })

      gsap.to(words, {
        yPercent: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.03,
        scrollTrigger: {
          trigger: lead,
          start: 'top 85%',
        },
      })

      gsap.from('.about__col p, .about__fact', {
        y: 28,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: '.about__grid',
          start: 'top 78%',
        },
      })

      gsap.from('.section-head', {
        y: 22,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
    },
    { scope: root, dependencies: [lang] }
  )

  return (
    <section className="section about" id="about" ref={root}>
      <div className="container">
        <div className="section-head">
          <h2 className="section-label">{t.sections.about}</h2>
          <span className="section-index">/ 01</span>
        </div>

        <p className="about__lead display" key={lang}>
          {t.about.lead}
        </p>

        <div className="about__grid">
          <div className="about__col about__col--text">
            {t.about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="about__col about__facts">
            {t.about.facts.map((f) => (
              <div className="about__fact" key={f.label}>
                <span className="about__fact-label">{f.label}</span>
                <span className="about__fact-value">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
