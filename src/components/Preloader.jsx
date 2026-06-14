import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, prefersReducedMotion } from '../lib/gsap.js'
import { personal } from '../data/content.js'
import './Preloader.css'

export default function Preloader({ onComplete }) {
  const root = useRef(null)
  const countRef = useRef(null)
  const barRef = useRef(null)

  useGSAP(
    () => {
      // Reduced-motion users normally never see the preloader (App skips it),
      // but guard here too so it never blocks if it somehow mounts.
      if (prefersReducedMotion()) {
        onComplete?.()
        return
      }

      const counter = { value: 0 }
      const tl = gsap.timeline({
        defaults: { ease: 'power3.inOut' },
        onComplete: () => onComplete?.(),
      })

      // Kept deliberately short (~2.3s) so the hero (LCP) paints quickly.
      tl.set(root.current, { autoAlpha: 1 })
        .to('.pre-word .word-line', {
          y: 0,
          duration: 0.7,
          stagger: 0.06,
          ease: 'expo.out',
        })
        .to(
          counter,
          {
            value: 100,
            duration: 1.1,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (countRef.current)
                countRef.current.textContent = String(Math.round(counter.value)).padStart(3, '0')
            },
          },
          0
        )
        .to(barRef.current, { scaleX: 1, duration: 1.1, ease: 'power2.inOut' }, 0)
        .to('.pre-word .word-line', { y: '-110%', duration: 0.5, stagger: 0.04, ease: 'expo.in' }, '+=0.1')
        .to('.pre-meta', { autoAlpha: 0, duration: 0.3 }, '<')
        .to(root.current, { yPercent: -100, duration: 0.8, ease: 'expo.inOut' }, '-=0.2')
    },
    { scope: root, dependencies: [] }
  )

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="pre-inner">
        <div className="pre-word display">
          <span className="word-line-wrap">
            <span className="word-line">{personal.name.split(' ')[0]}</span>
          </span>{' '}
          <span className="word-line-wrap">
            <span className="word-line">{personal.name.split(' ').slice(1).join(' ')}</span>
          </span>
        </div>
      </div>
      <div className="pre-meta">
        <span className="pre-label">Portfolio</span>
        <span className="pre-count" ref={countRef}>
          000
        </span>
      </div>
      <div className="pre-bar">
        <span className="pre-bar-fill" ref={barRef} />
      </div>
    </div>
  )
}
