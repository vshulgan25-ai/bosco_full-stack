import type { CommonApiResponse, NavItem } from '../types/api'

type HeaderData = CommonApiResponse['header']
type FooterData = CommonApiResponse['footer']

const SOCIAL_ICONS: Record<string, string> = {
  facebook: 'f',
  instagram: '◎',
  tiktok: '♪',
  youtube: '▶',
}

/** Плавний скрол до якоря всередині сторінки */
function scrollToAnchor(url: string): boolean {
  if (!url.startsWith('#')) return false
  const target = document.getElementById(url.slice(1))
  if (!target) return false
  target.scrollIntoView({ behavior: 'smooth' })
  return true
}

/**
 * Прибираємо з меню пункти, які дублюють кнопку CTA
 * (щоб «Подати заявку» не відображалась двічі).
 */
function withoutCtaDuplicates(items: readonly NavItem[], cta: HeaderData['ctaButton']): NavItem[] {
  const norm = (s: string): string => s.trim().toLowerCase()
  return items.filter((i) => norm(i.url) !== norm(cta.link) && norm(i.label) !== norm(cta.text))
}

/**
 * Шапка у стилі mnzbosco.org.ua:
 * 1) верхня смуга з контактами та соцмережами, 2) біла панель з логотипом і меню.
 */
export function renderHeader(container: HTMLElement, data: HeaderData, footer: FooterData): void {
  container.replaceChildren()

  // ---------- Верхня смуга ----------
  const topbar = document.createElement('div')
  topbar.className = 'topbar'
  const topInner = document.createElement('div')
  topInner.className = 'container topbar-inner'

  const contacts = document.createElement('div')
  contacts.className = 'topbar-contacts'
  contacts.innerHTML = `
    <span>тел: <a href="tel:${footer.contacts.phone.replace(/[^+\d]/g, '')}">${footer.contacts.phone}</a></span>
    <span>email: <a href="mailto:${footer.contacts.email}">${footer.contacts.email}</a></span>
  `

  const socials = document.createElement('div')
  socials.className = 'topbar-socials'
  footer.socialLinks.forEach((s) => {
    const a = document.createElement('a')
    a.href = s.url
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    a.className = 'topbar-social'
    a.setAttribute('aria-label', s.platform)
    a.textContent = SOCIAL_ICONS[(s.icon || s.platform).toLowerCase()] ?? '●'
    socials.appendChild(a)
  })

  topInner.append(contacts, socials)
  topbar.appendChild(topInner)

  // ---------- Основна панель ----------
  const bar = document.createElement('div')
  bar.className = 'header-bar'
  const inner = document.createElement('div')
  inner.className = 'container header-inner'

  const brand = document.createElement('a')
  brand.href = '/'
  brand.className = 'header-brand'
  brand.setAttribute('aria-label', data.siteTitle)
  const logo = document.createElement('img')
  logo.src = data.logoUrl || '/logo.png'
  logo.alt = data.siteTitle
  logo.className = 'header-logo'
  brand.appendChild(logo)

  const nav = document.createElement('nav')
  nav.className = 'header-nav'
  nav.setAttribute('aria-label', 'Головне меню сайту')
  const navList = document.createElement('ul')
  navList.className = 'nav-list'

  const burgerBtn = document.createElement('button')
  burgerBtn.type = 'button'
  burgerBtn.className = 'header-burger'
  burgerBtn.setAttribute('aria-label', 'Відкрити меню')
  burgerBtn.setAttribute('aria-expanded', 'false')
  burgerBtn.innerHTML = '<span></span><span></span><span></span>'

  const closeMenu = (): void => {
    nav.classList.remove('is-open')
    burgerBtn.classList.remove('is-active')
    burgerBtn.setAttribute('aria-expanded', 'false')
  }

  withoutCtaDuplicates(data.navItems, data.ctaButton).forEach((item) => {
    const li = document.createElement('li')
    const a = document.createElement('a')
    a.href = item.url
    a.className = 'nav-link'
    a.textContent = item.label
    a.addEventListener('click', (e) => {
      if (scrollToAnchor(item.url)) {
        e.preventDefault()
        closeMenu()
      }
    })
    li.appendChild(a)
    navList.appendChild(li)
  })

  // Єдина кнопка дії — в меню на мобільних, окремо на десктопі
  const cta = document.createElement('a')
  cta.href = data.ctaButton.link
  cta.className = 'btn btn--primary header-cta'
  cta.textContent = data.ctaButton.text
  if (/^https?:\/\//i.test(data.ctaButton.link)) {
    cta.target = '_blank'
    cta.rel = 'noopener noreferrer'
  }
  cta.addEventListener('click', (e) => {
    if (scrollToAnchor(data.ctaButton.link)) {
      e.preventDefault()
      closeMenu()
    }
  })

  nav.appendChild(navList)
  burgerBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open')
    burgerBtn.classList.toggle('is-active', isOpen)
    burgerBtn.setAttribute('aria-expanded', String(isOpen))
  })

  inner.append(brand, nav, cta, burgerBtn)
  bar.appendChild(inner)
  container.append(topbar, bar)
}
