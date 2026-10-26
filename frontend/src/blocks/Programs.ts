import type { ProgramsBlockData } from '../types/blocks'
import type { ScholarshipProgramItem } from '../types/api'

const CATEGORY_NAMES: Record<string, string> = {
  all: 'Усі учні Центру Боско',
  vpo: 'ВПО та постраждалі від війни',
  military_children: 'Діти військовослужбовців та ветеранів',
  low_income: 'Багатодітні та малозабезпечені',
  collegium_residents: 'Мешканці колегіуму',
  high_achievers: 'Відмінники та активісти',
}

const KIND_NAMES: Record<string, string> = {
  tuition: 'Навчання',
  collegium: 'Колегіум',
  cafe: 'Кафе «Мама Маргарита»',
  social: 'Соціальна',
  merit: 'Відзнака',
}

/**
 * Рендеринг блоку програм стипендій з інтерактивною фільтрацією
 */
export function renderProgramsBlock(data: ProgramsBlockData): HTMLElement {
  const section = document.createElement('section')
  section.id = 'programs'
  section.className = 'block block--programs'

  const container = document.createElement('div')
  container.className = 'container'

  // Заголовок секції
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

  const programs: ScholarshipProgramItem[] = (data.programs || []) as ScholarshipProgramItem[]

  // Фільтри категорій
  const filterWrap = document.createElement('div')
  filterWrap.className = 'programs-filter'

  const filterOptions = [
    { label: 'Всі програми', value: 'all_kinds' },
    { label: 'Оплата навчання', value: 'tuition' },
    { label: 'Колегіум', value: 'collegium' },
    { label: 'Харчування', value: 'cafe' },
    { label: 'Соціальна допомога', value: 'social' },
  ]

  let currentFilter = 'all_kinds'

  const grid = document.createElement('div')
  grid.className = 'programs-grid'

  function renderCards(filter: string) {
    grid.innerHTML = ''

    const filtered = programs.filter((p) => {
      if (filter === 'all_kinds') return true
      return p.kind === filter
    })

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <p>За обраним напрямом наразі немає відкритих стипендій.</p>
        </div>
      `
      return
    }

    filtered.forEach((prog) => {
      const card = document.createElement('article')
      card.className = 'program-card'

      const topRow = document.createElement('div')
      topRow.className = 'program-card__top'

      const kindTag = document.createElement('span')
      kindTag.className = `tag tag--${prog.kind}`
      kindTag.textContent = KIND_NAMES[prog.kind] || prog.kind
      topRow.appendChild(kindTag)

      const progTitle = document.createElement('h3')
      progTitle.className = 'program-card__title'
      progTitle.textContent = prog.name

      const progDesc = document.createElement('p')
      progDesc.className = 'program-card__desc'
      progDesc.textContent = prog.shortDescription

      const amountBox = document.createElement('div')
      amountBox.className = 'program-card__amount-box'

      const amountVal = document.createElement('span')
      amountVal.className = 'program-card__amount'
      amountVal.textContent = `${prog.amount.toLocaleString('uk-UA')} ₴`

      const amountNote = document.createElement('span')
      amountNote.className = 'program-card__note'
      amountNote.textContent = prog.amountNote ? `/ ${prog.amountNote}` : ''

      amountBox.appendChild(amountVal)
      amountBox.appendChild(amountNote)

      const categoryInfo = document.createElement('div')
      categoryInfo.className = 'program-card__category'
      categoryInfo.innerHTML = `<strong>Цільова група:</strong> ${
        CATEGORY_NAMES[prog.category] || prog.category
      }`

      // Кнопка подачі заявки з прив'язкою до форми
      const applyBtn = document.createElement('button')
      applyBtn.className = 'btn btn--primary btn--block program-card__btn'
      applyBtn.textContent = 'Подати заявку на цю програму'
      applyBtn.onclick = () => {
        const formSection = document.getElementById('apply')
        const select = document.getElementById('apply-program') as HTMLSelectElement | null
        if (select) {
          // Знаходимо відповідний option за id або назвою
          for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].value === String(prog.id) || select.options[i].value === prog.kind) {
              select.selectedIndex = i
              break
            }
          }
        }
        formSection?.scrollIntoView({ behavior: 'smooth' })
        const fullNameInput = document.getElementById('apply-fullName') as HTMLInputElement | null
        fullNameInput?.focus()
      }

      card.appendChild(topRow)
      card.appendChild(progTitle)
      card.appendChild(progDesc)
      card.appendChild(amountBox)
      card.appendChild(categoryInfo)
      card.appendChild(applyBtn)

      grid.appendChild(card)
    })
  }

  filterOptions.forEach((opt) => {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className = `filter-btn ${opt.value === currentFilter ? 'is-active' : ''}`
    btn.textContent = opt.label
    btn.onclick = () => {
      currentFilter = opt.value
      filterWrap.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('is-active'))
      btn.classList.add('is-active')
      renderCards(currentFilter)
    }
    filterWrap.appendChild(btn)
  })

  container.appendChild(filterWrap)
  renderCards(currentFilter)
  container.appendChild(grid)

  section.appendChild(container)
  return section
}
