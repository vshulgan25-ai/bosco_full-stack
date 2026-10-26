import type { AboutBlockData } from '../types/blocks'

const ICONS_MAP: Record<string, string> = {
  tool: '🛠️',
  heart: '❤️',
  home: '🏠',
  coffee: '☕',
  'graduation-cap': '🎓',
}

/**
 * Рендеринг блоку «Про Центр Боско»
 */
export function renderAboutBlock(data: AboutBlockData): HTMLElement {
  const section = document.createElement('section')
  section.id = 'about'
  section.className = 'block block--about'

  const container = document.createElement('div')
  container.className = 'container'

  const header = document.createElement('div')
  header.className = 'section-header text-center'

  if (data.badge) {
    const badge = document.createElement('span')
    badge.className = 'badge badge--secondary'
    badge.textContent = data.badge
    header.appendChild(badge)
  }

  const title = document.createElement('h2')
  title.className = 'section-title'
  title.textContent = data.title
  header.appendChild(title)

  if (data.leadText) {
    const lead = document.createElement('p')
    lead.className = 'section-desc text-lead'
    lead.textContent = data.leadText
    header.appendChild(lead)
  }

  container.appendChild(header)

  if (data.features && data.features.length > 0) {
    const grid = document.createElement('div')
    grid.className = 'about-features-grid'

    data.features.forEach((feature) => {
      const card = document.createElement('div')
      card.className = 'feature-card'

      const iconBox = document.createElement('div')
      iconBox.className = 'feature-card__icon'
      iconBox.textContent = ICONS_MAP[feature.icon || 'tool'] || '⭐'

      const featTitle = document.createElement('h3')
      featTitle.className = 'feature-card__title'
      featTitle.textContent = feature.title

      const featDesc = document.createElement('p')
      featDesc.className = 'feature-card__desc'
      featDesc.textContent = feature.description

      card.appendChild(iconBox)
      card.appendChild(featTitle)
      card.appendChild(featDesc)
      grid.appendChild(card)
    })

    container.appendChild(grid)
  }

  section.appendChild(container)
  return section
}
