import './style.css'
import { fetchCommonData, fetchPageData } from './services/api'
import { renderHeader } from './components/Header'
import { renderFooter } from './components/Footer'
import { renderBlocks } from './renderBlocks'
import { renderLoadingSkeleton, renderErrorView } from './components/StateViews'
import { showToast } from './components/Toast'
import type { CommonApiResponse, PageApiResponse } from './types/api'
import type { UiStateStatus } from './types/common'

/** Поточний стан інтерфейсу: idle → loading → success | error */
let uiState: UiStateStatus = 'idle'

function setState(next: UiStateStatus): void {
  uiState = next
  document.body.dataset.state = next
}

/** Безпечне отримання тексту помилки з unknown */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message
  return 'Не вдалося зв’язатися із сервером. Перевірте статус Payload CMS.'
}

/**
 * Точка входу: керує життєвим циклом сторінки та трьома станами UI
 * (завантаження / помилка / готовність).
 */
async function initApplication(): Promise<void> {
  if (uiState === 'loading') return

  const headerElement = document.getElementById('app-header')
  const contentElement = document.getElementById('app-content')
  const footerElement = document.getElementById('app-footer')

  if (!headerElement || !contentElement || !footerElement) {
    console.error('[App] Кореневі елементи верстки не знайдені в DOM')
    return
  }

  // 1. LOADING
  setState('loading')
  contentElement.replaceChildren(renderLoadingSkeleton())

  try {
    const currentPath = window.location.pathname || '/'

    // 2. Паралельні асинхронні запити
    const [commonData, pageData]: [CommonApiResponse, PageApiResponse] = await Promise.all([
      fetchCommonData(),
      fetchPageData(currentPath),
    ])

    if (pageData.title) {
      document.title = `${pageData.title} | ${commonData.header.siteTitle}`
    }

    // 3. SUCCESS
    renderHeader(headerElement, commonData.header, commonData.footer)
    renderBlocks(contentElement, pageData.blocks)
    renderFooter(footerElement, commonData.footer)
    setState('success')
  } catch (error: unknown) {
    // 4. ERROR
    console.error('[App] Помилка завантаження:', error)
    setState('error')
    headerElement.replaceChildren()
    footerElement.replaceChildren()
    contentElement.replaceChildren(renderErrorView(getErrorMessage(error), () => void initApplication()))
    showToast('Виникла помилка зв’язку з сервером', 'error')
  }
}

document.addEventListener('DOMContentLoaded', () => {
  void initApplication()
})
