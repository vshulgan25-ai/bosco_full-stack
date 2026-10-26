import type { CtaBlockData } from '../types/blocks'

export function renderCtaBlock(data: CtaBlockData): HTMLElement {
  const section = document.createElement('section')
  section.id = 'cta'
  section.className = 'block block--cta'

  const container = document.createElement('div')
  container.className = 'container'

  const card = document.createElement('div')
  card.className = 'cta-card'

  if (data.badge) {
    const badge = document.createElement('span')
    badge.className = 'badge badge--accent'
    badge.textContent = data.badge
    card.appendChild(badge)
  }

  const title = document.createElement('h2')
  title.className = 'cta-title'
  title.textContent = data.title
  card.appendChild(title)

  if (data.description) {
    const desc = document.createElement('p')
    desc.className = 'cta-desc'
    desc.textContent = data.description
    card.appendChild(desc)
  }

  if (data.points && data.points.length > 0) {
    const list = document.createElement('ul')
    list.className = 'cta-points'
    data.points.forEach((point) => {
      const li = document.createElement('li')
      li.textContent = point.text
      list.appendChild(li)
    })
    card.appendChild(list)
  }

  const button = document.createElement('a')
  button.className = 'btn btn--accent btn--lg'
  button.textContent = data.buttonText
  button.href = data.buttonLink
  if (/^https?:\/\//i.test(data.buttonLink)) {
    button.target = '_blank'
    button.rel = 'noopener noreferrer'
  }
  card.appendChild(button)

  container.appendChild(card)
  section.appendChild(container)
  return section
}
