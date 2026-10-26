import type { HeroBlockData } from '../types/blocks'

function bindAnchor(a: HTMLAnchorElement, link: string): void {
  a.href = link
  if (/^https?:\/\//i.test(link)) {
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
  }
  a.addEventListener('click', (e) => {
    if (!link.startsWith('#')) return
    e.preventDefault()
    document.getElementById(link.slice(1))?.scrollIntoView({ behavior: 'smooth' })
  })
}

/**
 * Hero-секція: фонове фото Центру Боско (/bosco-hero-bg.jpg) за текстом,
 * нижче — смуга зі статистикою (як на mnzbosco.org.ua).
 */
export function renderHeroBlock(data: HeroBlockData): HTMLElement {
  const wrapper = document.createElement('div')
  wrapper.className = 'hero-wrapper'

  const section = document.createElement('section')
  section.id = 'hero'
  section.className = 'block block--hero'

  const container = document.createElement('div')
  container.className = 'container hero-container'

  const content = document.createElement('div')
  content.className = 'hero-content'

  if (data.badge) {
    const badge = document.createElement('span')
    badge.className = 'badge badge--accent'
    badge.textContent = data.badge
    content.appendChild(badge)
  }

  const title = document.createElement('h1')
  title.className = 'hero-title'
  title.textContent = data.title
  content.appendChild(title)

  const subtitle = document.createElement('p')
  subtitle.className = 'hero-subtitle'
  subtitle.textContent = data.subtitle
  content.appendChild(subtitle)

  const actions = document.createElement('div')
  actions.className = 'hero-actions'

  if (data.primaryCtaText) {
    const primary = document.createElement('a')
    primary.className = 'btn btn--accent btn--lg'
    primary.textContent = data.primaryCtaText
    bindAnchor(primary, data.primaryCtaLink || '#apply')
    actions.appendChild(primary)
  }

  if (data.secondaryCtaText) {
    const secondary = document.createElement('a')
    secondary.className = 'btn btn--light btn--lg'
    secondary.textContent = data.secondaryCtaText
    bindAnchor(secondary, data.secondaryCtaLink || '#programs')
    actions.appendChild(secondary)
  }

  content.appendChild(actions)
  container.appendChild(content)
  section.appendChild(container)
  wrapper.appendChild(section)

  if (data.stats && data.stats.length > 0) {
    const band = document.createElement('div')
    band.className = 'stats-band'
    const grid = document.createElement('div')
    grid.className = 'container hero-stats-grid'

    data.stats.forEach((stat) => {
      const item = document.createElement('div')
      item.className = 'stat-item'
      const value = document.createElement('div')
      value.className = 'stat-item__value'
      value.textContent = stat.value
      const label = document.createElement('div')
      label.className = 'stat-item__label'
      label.textContent = stat.label
      item.append(value, label)
      grid.appendChild(item)
    })

    band.appendChild(grid)
    wrapper.appendChild(band)
  }

  return wrapper
}
