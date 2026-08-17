import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/gsap.js'
import { useLanguage } from '../context/LanguageContext.jsx'
import { product } from '../data/content.js'
import './Product.css'

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

export default function Product() {
  const root = useRef(null)
  const { t, lang } = useLanguage()

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      gsap.from('.product .section-head, .product__media, .product__body > *', {
        y: 40,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 75%' },
      })
    },
    { scope: root, dependencies: [] }
  )

  return (
    <section className="section product" id="product" ref={root}>
      <div className="container">
        <div className="section-head">
          <h2 className="section-label">{t.sections.product}</h2>
          <span className="section-index">/ 03</span>
        </div>

        <div className="product__grid">
          <a
            className="product__media"
            href={product.link}
            target="_blank"
            rel="noreferrer"
            aria-label={`${product.name} — ${t.visitSite} (opens in a new tab)`}
            data-cursor
          >
            <img
              src={product.image}
              alt={`${product.name} website`}
              loading="lazy"
              decoding="async"
              width="1200"
              height="880"
            />
            <span className="product__media-arrow">
              <ArrowUpRight />
            </span>
          </a>

          <div className="product__body">
            <span className="product__eyebrow">{product.role[lang]}</span>
            <h3 className="product__name display">{product.name}</h3>
            <p className="product__tagline">{product.tagline[lang]}</p>
            <p className="product__desc">{product.description[lang]}</p>
            <ul className="product__tags">
              {product.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <a className="product__cta" href={product.link} target="_blank" rel="noreferrer" data-cursor>
              {t.visitSite} <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
