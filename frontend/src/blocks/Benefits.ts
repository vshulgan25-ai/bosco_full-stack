import type { BenefitsBlockData } from '../types/blocks'

/**
 * Рендеринг блоку «Критерії та переваги»
 */
export function renderBenefitsBlock(data: BenefitsBlockData): HTMLElement {
  const section = document.createElement('section')
  section.id = 'benefits'
  section.className = 'block block--benefits'

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

  if (data.description) {
    const desc = document.createElement('p')
    desc.className = 'section-desc'
    desc.textContent = data.description
    header.appendChild(desc)
  }

  container.appendChild(header)

  if (data.items && data.items.length > 0) {
    const grid = document.createElement('div')
    grid.className = 'benefits-steps-grid'

    data.items.forEach((item, index) => {
      const card = document.createElement('div')
      card.className = 'step-card'

      const num = document.createElement('div')
      num.className = 'step-card__number'
      num.textContent = item.stepNumber || `0${index + 1}`

      const stepTitle = document.createElement('h3')
      stepTitle.className = 'step-card__title'
      stepTitle.textContent = item.title

      const stepDesc = document.createElement('p')
      stepDesc.className = 'step-card__desc'
      stepDesc.textContent = item.description

      card.appendChild(num)
      card.appendChild(stepTitle)
      card.appendChild(stepDesc)
      grid.appendChild(card)
    })

    container.appendChild(grid)
  }

  section.appendChild(container)
  return section
}
