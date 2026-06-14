import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap.js'
import { marquee } from '../data/content.js'
import './Marquee.css'

export default function Marquee() {
  const root = useRef(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return // keep the strip static
      const track = root.current.querySelector('.marquee__track')

      const loop = gsap.to(track, {
        xPercent: -50,
        ease: 'none',
        duration: 28,
        repeat: -1,
      })

      // Subtle speed change based on scroll velocity / direction.
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const dir = self.direction
          gsap.to(loop, {
            timeScale: dir * (1 + Math.min(Math.abs(self.getVelocity()) / 2500, 3)),
            overwrite: true,
          })
          gsap.to(loop, { timeScale: dir, duration: 0.7, delay: 0.05, overwrite: 'auto' })
        },
      })

      return () => {
        st.kill()
        loop.kill()
      }
    },
    { scope: root, dependencies: [] }
  )

  // Two copies for a seamless -50% loop.
  const items = [...marquee, ...marquee]

  return (
    <section className="marquee" ref={root} aria-hidden="true">
      <div className="marquee__track">
        {items.map((word, i) => (
          <span className="marquee__item" key={i}>
            {word}
            <span className="marquee__star" />
          </span>
        ))}
      </div>
    </section>
  )
}
