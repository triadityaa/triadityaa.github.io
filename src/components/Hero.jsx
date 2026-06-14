import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/gsap.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { personal } from '../data/content.js'
import './Hero.css'

export default function Hero({ intro, scrollTo }) {
  const root = useRef(null)
  const { t } = useLanguage()

  // Each word on its own line so the headline never overflows narrow screens.
  const words = personal.name.split(' ')

  useGSAP(
    () => {
      if (intro) return // wait for the preloader to finish

      if (prefersReducedMotion()) {
        // No motion: just show the headline in its final position.
        gsap.set('.hero__line .reveal', { y: 0 })
        return
      }

      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      tl.to('.hero__line .reveal', {
        y: 0,
        duration: 1.2,
        stagger: 0.12,
      })
        .from('.hero__eyebrow', { y: 20, autoAlpha: 0, duration: 0.9 }, 0.3)
        .from('.hero__meta > *', { y: 16, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.5)
        .from('.hero__intro', { y: 24, autoAlpha: 0, duration: 0.9 }, 0.6)
        .from('.hero__scroll', { autoAlpha: 0, duration: 0.8 }, 0.8)

      // Parallax fade as the hero scrolls away.
      gsap.to('.hero__title', {
        yPercent: 14,
        autoAlpha: 0.25,
        ease: 'none',
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: root, dependencies: [intro] }
  )

  return (
    <section className="hero" id="hero" ref={root}>
      <div className="container hero__container">
        <div className="hero__top">
          <span className="hero__eyebrow">
            <span className="hero__dot" />
            {t.available}
          </span>
          <div className="hero__meta">
            <span>{personal.location}</span>
            <span>{t.hero.tagline}</span>
          </div>
        </div>

        <h1 className="hero__title display">
          {words.map((word, i) => (
            <span className="hero__line" key={word + i}>
              <span className="reveal">
                {word}
                {i === words.length - 1 && <sup className="hero__reg">®</sup>}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero__bottom">
          <p className="hero__intro">{t.hero.intro}</p>
          <button
            className="hero__scroll"
            onClick={() => scrollTo('#about')}
            data-cursor
            aria-label={t.scroll}
          >
            <span className="hero__scroll-text">{t.scroll}</span>
            <span className="hero__scroll-line" />
          </button>
        </div>
      </div>
    </section>
  )
}
