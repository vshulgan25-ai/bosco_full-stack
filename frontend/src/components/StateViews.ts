/**
 * Компоненти відображення станів інтерфейсу (Loading, Error)
 */

export function renderLoadingSkeleton(): HTMLElement {
  const container = document.createElement('div')
  container.className = 'state-view state-view--loading'

  container.innerHTML = `
    <div class="skeleton-hero">
      <div class="skeleton skeleton-badge"></div>
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-subtitle"></div>
      <div class="skeleton-stats">
        <div class="skeleton skeleton-card"></div>
        <div class="skeleton skeleton-card"></div>
        <div class="skeleton skeleton-card"></div>
        <div class="skeleton skeleton-card"></div>
      </div>
    </div>
    <div class="loading-spinner-wrap">
      <div class="spinner" aria-label="Завантаження контенту..."></div>
      <p class="loading-text">Завантаження даних...</p>
    </div>
  `

  return container
}

export function renderErrorView(
  errorMessage: string,
  onRetry: () => void
): HTMLElement {
  const container = document.createElement('div')
  container.className = 'state-view state-view--error'

  const card = document.createElement('div')
  card.className = 'error-card'

  const icon = document.createElement('div')
  icon.className = 'error-card__icon'
  icon.textContent = '⚠️'

  const title = document.createElement('h2')
  title.className = 'error-card__title'
  title.textContent = 'Не вдалося завантажити дані'

  const text = document.createElement('p')
  text.className = 'error-card__text'
  text.textContent =
    errorMessage ||
    'Виникла мережева помилка під час зв’язку з сервером Payload CMS. Перевірте підключення до Інтернету.'

  const retryButton = document.createElement('button')
  retryButton.className = 'btn btn--primary'
  retryButton.textContent = 'Спробувати знову'
  retryButton.onclick = () => {
    onRetry()
  }

  card.appendChild(icon)
  card.appendChild(title)
  card.appendChild(text)
  card.appendChild(retryButton)
  container.appendChild(card)

  return container
}
