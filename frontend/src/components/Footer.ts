import type { CommonApiResponse } from '../types/api'

/**
 * Рендеринг підвалу сайту (Footer) на основі даних з /api/common
 */
export function renderFooter(
  container: HTMLElement,
  data: CommonApiResponse['footer']
): void {
  container.innerHTML = ''

  const inner = document.createElement('div')
  inner.className = 'container footer-inner'

  const grid = document.createElement('div')
  grid.className = 'footer-grid'

  // Колонка 1: Про Центр Боско
  const col1 = document.createElement('div')
  col1.className = 'footer-col'
  col1.innerHTML = `
    <h3 class="footer-heading">Центр Боско</h3>
    <p class="footer-text">${data.aboutText}</p>
    <div class="footer-badge">Навчальний рік 2026–2027</div>
  `

  // Колонка 2: Контакти
  const col2 = document.createElement('div')
  col2.className = 'footer-col'
  col2.innerHTML = `
    <h3 class="footer-heading">Контакти відділу</h3>
    <ul class="footer-contacts">
      <li>📍 ${data.contacts.address}</li>
      <li>📞 <a href="tel:${data.contacts.phone.replace(/[^+\d]/g, '')}">${data.contacts.phone}</a></li>
      <li>✉️ <a href="mailto:${data.contacts.email}">${data.contacts.email}</a></li>
      <li>🕒 ${data.contacts.workingHours}</li>
    </ul>
  `

  // Колонка 3: Швидкі посилання
  const col3 = document.createElement('div')
  col3.className = 'footer-col'
  const linksList = data.quickLinks
    .map(
      (item) => `<li><a href="${item.url}" class="footer-link">${item.label}</a></li>`
    )
    .join('')
  col3.innerHTML = `
    <h3 class="footer-heading">Швидкі посилання</h3>
    <ul class="footer-links">${linksList}</ul>
  `

  // Колонка 4: Соціальні мережі
  const col4 = document.createElement('div')
  col4.className = 'footer-col'
  const socials = data.socialLinks
    .map(
      (s) =>
        `<a href="${s.url}" target="_blank" rel="noopener noreferrer" class="social-pill">${s.platform}</a>`
    )
    .join('')
  col4.innerHTML = `
    <h3 class="footer-heading">Ми в мережі</h3>
    <p class="footer-text">Слідкуйте за оновленнями та оголошеннями результатів відбору:</p>
    <div class="footer-socials">${socials}</div>
  `

  grid.appendChild(col1)
  grid.appendChild(col2)
  grid.appendChild(col3)
  grid.appendChild(col4)

  // Нижня лінія з копірайтом
  const bottomBar = document.createElement('div')
  bottomBar.className = 'footer-bottom'
  bottomBar.innerHTML = `
    <p class="copyright-text">${data.copyright}</p>
    <p class="developer-text">Розробка системи: <strong>Вероніка Шульган</strong> (Звіт з виробничої практики)</p>
  `

  inner.appendChild(grid)
  inner.appendChild(bottomBar)
  container.appendChild(inner)
}
