import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap.js'
import './Cursor.css'

export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [enabled, setEnabled] = useState(false)

  // Phase 1: enable only on fine-pointer (mouse/trackpad) devices.
  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) setEnabled(true)
  }, [])

  // Phase 2: wire up GSAP once the dot/ring refs are actually in the DOM.
  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return

    const xToDot = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' })
    const yToDot = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' })
    const xToRing = gsap.quickTo(ring.current, 'x', { duration: 0.4, ease: 'power3' })
    const yToRing = gsap.quickTo(ring.current, 'y', { duration: 0.4, ease: 'power3' })

    const move = (e) => {
      xToDot(e.clientX)
      yToDot(e.clientY)
      xToRing(e.clientX)
      yToRing(e.clientY)
    }

    let isActive = null
    const over = (e) => {
      const target = !!e.target.closest('a, button, [data-cursor]')
      if (target === isActive) return // skip redundant tweens
      isActive = target
      gsap.to(ring.current, {
        scale: target ? 1.8 : 1,
        opacity: target ? 1 : 0.5,
        duration: 0.3,
        ease: 'power3',
      })
      if (ring.current) ring.current.classList.toggle('is-active', target)
    }

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <span className="cursor-dot" ref={dot} aria-hidden="true" />
      <span className="cursor-ring" ref={ring} aria-hidden="true" />
    </>
  )
}
