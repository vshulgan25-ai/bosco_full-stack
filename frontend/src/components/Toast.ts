export type ToastType = 'success' | 'error' | 'info' | 'warning'

/**
 * Відображення спливаючого повідомлення (Toast Notification)
 */
export function showToast(
  message: string,
  type: ToastType = 'info',
  durationMs: number = 4000
): void {
  const container = document.getElementById('toast-container')
  if (!container) return

  const toast = document.createElement('div')
  toast.className = `toast toast--${type}`
  toast.setAttribute('role', 'alert')

  const iconSpan = document.createElement('span')
  iconSpan.className = 'toast__icon'
  iconSpan.textContent =
    type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ'

  const messageSpan = document.createElement('span')
  messageSpan.className = 'toast__message'
  messageSpan.textContent = message

  const closeBtn = document.createElement('button')
  closeBtn.className = 'toast__close'
  closeBtn.setAttribute('aria-label', 'Закрити')
  closeBtn.innerHTML = '&times;'
  closeBtn.onclick = () => {
    toast.classList.add('toast--hiding')
    setTimeout(() => toast.remove(), 300)
  }

  toast.appendChild(iconSpan)
  toast.appendChild(messageSpan)
  toast.appendChild(closeBtn)
  container.appendChild(toast)

  // Плавна поява
  requestAnimationFrame(() => {
    toast.classList.add('toast--visible')
  })

  // Автоматичне зникнення
  setTimeout(() => {
    if (toast.parentElement) {
      toast.classList.add('toast--hiding')
      setTimeout(() => toast.remove(), 300)
    }
  }, durationMs)
}
