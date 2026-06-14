import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { personal } from '../data/content.js'
import './Navbar.css'

const LINKS = [
  { key: 'home', href: '#hero' },
  { key: 'about', href: '#about' },
  { key: 'work', href: '#work' },
  { key: 'experience', href: '#experience' },
  { key: 'education', href: '#education' },
  { key: 'contact', href: '#contact' },
]

export default function Navbar({ scrollTo }) {
  const { t, lang, toggleLang } = useLanguage()
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const lastY = useRef(0)
  const burgerRef = useRef(null)
  const menuRef = useRef(null)

  const langLabel = `Language: ${lang === 'en' ? 'English' : 'Indonesian'}. Switch to ${
    lang === 'en' ? 'Indonesian' : 'English'
  }.`

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      // Hide when scrolling down past the hero, show when scrolling up.
      if (y > lastY.current && y > 400) setHidden(true)
      else setHidden(false)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Mobile menu: scroll lock, focus management, focus trap, Escape, background inert.
  useEffect(() => {
    const main = document.getElementById('main')
    if (!open) {
      document.body.style.overflow = ''
      main?.removeAttribute('inert')
      return
    }

    document.body.style.overflow = 'hidden'
    main?.setAttribute('inert', '')

    const menu = menuRef.current
    const focusables = menu ? menu.querySelectorAll('a[href], button') : []
    focusables[0]?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      if (e.key !== 'Tab' || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      main?.removeAttribute('inert')
      // Return focus to the trigger when the menu closes.
      burgerRef.current?.focus()
    }
  }, [open])

  const handleNav = (e, href) => {
    e.preventDefault()
    setOpen(false)
    scrollTo(href)
  }

  return (
    <>
      <header
        className={`nav ${hidden ? 'nav--hidden' : ''} ${scrolled ? 'nav--scrolled' : ''}`}
      >
        <a className="nav__logo" href="#hero" onClick={(e) => handleNav(e, '#hero')}>
          <span className="nav__mark">{personal.initials}</span>
          <span className="nav__name">{personal.name}</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.key} href={l.href} onClick={(e) => handleNav(e, l.href)}>
              {t.nav[l.key]}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button className="nav__lang" onClick={toggleLang} aria-label={langLabel}>
            <span className={lang === 'en' ? 'is-on' : ''}>EN</span>
            <span className="nav__lang-sep" aria-hidden="true">
              /
            </span>
            <span className={lang === 'id' ? 'is-on' : ''}>ID</span>
          </button>
          <a className="nav__cta" href="#contact" onClick={(e) => handleNav(e, '#contact')}>
            {t.cta}
          </a>
          <button
            ref={burgerRef}
            className={`nav__burger ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
      >
        <nav className="mobile-menu__links" aria-label="Mobile">
          {LINKS.map((l, i) => (
            <a
              key={l.key}
              href={l.href}
              onClick={(e) => handleNav(e, l.href)}
              style={{ transitionDelay: `${0.05 + i * 0.05}s` }}
            >
              <span className="mobile-menu__index">0{i + 1}</span>
              {t.nav[l.key]}
            </a>
          ))}
        </nav>
        <div className="mobile-menu__foot">
          <button className="nav__lang" onClick={toggleLang} aria-label={langLabel}>
            <span className={lang === 'en' ? 'is-on' : ''}>EN</span>
            <span className="nav__lang-sep" aria-hidden="true">
              /
            </span>
            <span className={lang === 'id' ? 'is-on' : ''}>ID</span>
          </button>
          <a href={personal.socials[1].url} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </>
  )
}
