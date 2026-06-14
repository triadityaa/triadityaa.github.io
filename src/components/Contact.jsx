import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/gsap.js'
import { splitWords } from '../lib/splitText.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { personal } from '../data/content.js'
import './Contact.css'

function ArrowUpRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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

export default function Contact({ scrollTo }) {
  const root = useRef(null)
  const { t, lang } = useLanguage()
  const year = new Date().getFullYear()

  useGSAP(
    () => {
      const heading = root.current.querySelector('.contact__heading')
      const words = splitWords(heading)

      if (prefersReducedMotion()) {
        gsap.set(words, { yPercent: 0 })
        return
      }

      gsap.set(words, { yPercent: 110 })

      gsap.to(words, {
        yPercent: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.06,
        scrollTrigger: { trigger: heading, start: 'top 85%' },
      })

      gsap.from('.contact__sub, .contact__email, .contact__socials, .contact__bar', {
        y: 30,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.contact__inner', start: 'top 72%' },
      })
    },
    { scope: root, dependencies: [lang] }
  )

  return (
    <footer className="section contact" id="contact" ref={root}>
      <div className="container contact__inner">
        <div className="section-head">
          <span className="section-label">{t.sections.contact}</span>
          <span className="section-index">/ 06</span>
        </div>

        <h2 className="contact__heading display" key={lang}>
          {t.contact.heading}
        </h2>

        <p className="contact__sub">{t.contact.sub}</p>

        <a className="contact__email" href={`mailto:${personal.email}`} data-cursor>
          <span className="contact__email-text">{personal.email}</span>
          <span className="contact__email-icon">
            <ArrowUpRight />
          </span>
        </a>

        <div className="contact__socials">
          <span className="contact__socials-label">{t.contact.elsewhere}</span>
          <ul>
            {personal.socials.map((s) => (
              <li key={s.label}>
                <a href={s.url} target="_blank" rel="noreferrer" data-cursor>
                  {s.label}
                  <ArrowUpRight />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="contact__bar">
          <span className="contact__copy">
            © {year} {personal.name}. {t.contact.rights}
          </span>
          <span className="contact__built">{t.contact.builtWith}</span>
          <button className="contact__top" onClick={() => scrollTo('#hero')} data-cursor>
            {t.contact.backToTop} <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>

      <div className="contact__wordmark" aria-hidden="true">
        {personal.name}
      </div>
    </footer>
  )
}
