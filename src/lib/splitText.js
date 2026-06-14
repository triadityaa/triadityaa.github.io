/**
 * Lightweight text splitter — wraps each word in a masked span so GSAP can
 * reveal words line-by-line without depending on the SplitText plugin.
 * Returns the array of inner word elements to animate.
 */
export function splitWords(el) {
  if (!el || el.dataset.split === 'true') {
    return el ? Array.from(el.querySelectorAll('.word-inner')) : []
  }

  const text = el.textContent
  const words = text.split(/(\s+)/) // keep whitespace tokens
  el.textContent = ''
  el.dataset.split = 'true'

  const inners = []
  words.forEach((token) => {
    if (token.trim() === '') {
      el.appendChild(document.createTextNode(token))
      return
    }
    const mask = document.createElement('span')
    mask.className = 'word-mask'
    mask.style.display = 'inline-block'
    mask.style.overflow = 'hidden'
    mask.style.verticalAlign = 'top'

    const inner = document.createElement('span')
    inner.className = 'word-inner'
    inner.style.display = 'inline-block'
    inner.style.willChange = 'transform'
    inner.textContent = token

    mask.appendChild(inner)
    el.appendChild(mask)
    inners.push(inner)
  })

  return inners
}

/** Split into individual characters (used for the hero headline). */
export function splitChars(el) {
  if (!el || el.dataset.splitChars === 'true') {
    return el ? Array.from(el.querySelectorAll('.char-inner')) : []
  }
  const text = el.textContent
  el.textContent = ''
  el.dataset.splitChars = 'true'

  const inners = []
  Array.from(text).forEach((ch) => {
    if (ch === ' ') {
      el.appendChild(document.createTextNode(' '))
      return
    }
    const mask = document.createElement('span')
    mask.className = 'char-mask'
    mask.style.display = 'inline-block'
    mask.style.overflow = 'hidden'
    mask.style.verticalAlign = 'top'

    const inner = document.createElement('span')
    inner.className = 'char-inner'
    inner.style.display = 'inline-block'
    inner.style.willChange = 'transform'
    inner.textContent = ch

    mask.appendChild(inner)
    el.appendChild(mask)
    inners.push(inner)
  })
  return inners
}
