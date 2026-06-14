import { useCallback, useEffect, useRef, useState } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll.js'
import { ScrollTrigger, prefersReducedMotion } from './lib/gsap.js'
import { useLanguage } from './context/LanguageContext.jsx'

import Preloader from './components/Preloader.jsx'
import Cursor from './components/Cursor.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Work from './components/Work.jsx'
import Experience from './components/Experience.jsx'
import Education from './components/Education.jsx'
import Skills from './components/Skills.jsx'
import Contact from './components/Contact.jsx'

const reduced = prefersReducedMotion()

export default function App() {
  const lenisRef = useRef(null)
  // Reduced-motion users skip the preloader intro entirely (no scroll lock).
  const [intro, setIntro] = useState(!reduced)
  const { lang } = useLanguage()

  useSmoothScroll(
    useCallback((lenis) => {
      lenisRef.current = lenis
      // Hold scroll while the intro plays (skipped under reduced motion).
      if (!reduced) lenis?.stop()
    }, [])
  )

  // Scroll helper passed to nav links.
  const scrollTo = useCallback((target) => {
    const el = document.querySelector(target)
    if (!el) return
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0, duration: 1.3 })
    } else {
      el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    }
  }, [])

  const handleIntroDone = useCallback(() => {
    setIntro(false)
    lenisRef.current?.start()
    // Layout may have shifted while locked — recalc triggers.
    requestAnimationFrame(() => ScrollTrigger.refresh())
  }, [])

  // Safety net: never let a stalled intro lock scrolling permanently.
  useEffect(() => {
    if (reduced) return
    const failSafe = setTimeout(() => {
      setIntro((wasIntro) => {
        if (wasIntro) lenisRef.current?.start()
        return false
      })
    }, 3000)
    return () => clearTimeout(failSafe)
  }, [])

  // Recalculate triggers when language (and therefore text length) changes,
  // and once web fonts have settled.
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 120)
    return () => clearTimeout(id)
  }, [lang])

  useEffect(() => {
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => ScrollTrigger.refresh())
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Cursor />
      {intro && <Preloader onComplete={handleIntroDone} />}
      <Navbar scrollTo={scrollTo} />
      <main id="main" tabIndex={-1}>
        <Hero intro={intro} scrollTo={scrollTo} />
        <Marquee />
        <About />
        <Work />
        <Experience />
        <Education />
        <Skills />
        <Contact scrollTo={scrollTo} />
      </main>
    </>
  )
}
