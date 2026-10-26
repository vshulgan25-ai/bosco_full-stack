import type {
  ApiResponseWithMetadata,
  CommonApiResponse,
  PageApiResponse,
  ApplicationSubmission,
  ApplicationSubmissionResult,
} from '../types/api'
import { FALLBACK_COMMON, FALLBACK_PAGE } from './mockData'

/** Базова адреса бекенду (у dev порожня → працює Vite proxy, у продакшені — URL CMS на Vercel) */
const API_BASE_URL: string = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? ''

/** Демо-режим: тільки якщо явно ввімкнено VITE_USE_MOCK=true (для презентації без бекенду) */
const USE_MOCK: boolean = import.meta.env.VITE_USE_MOCK === 'true'

/** Власний клас помилки API з HTTP-статусом — використовується екраном помилки */
export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Типізований GET-запит. Generic <T> описує очікувану форму JSON-відповіді.
 * Будь-який збій (мережа, HTTP != 2xx, не-JSON) перетворюється на ApiError.
 */
async function getJson<T>(url: string): Promise<ApiResponseWithMetadata<T>> {
  let response: Response
  try {
    response = await fetch(url, { method: 'GET', headers: { Accept: 'application/json' } })
  } catch {
    throw new ApiError('Немає зв’язку із сервером. Перевірте інтернет або чи запущено Payload CMS.')
  }

  if (!response.ok) {
    throw new ApiError(
      `Сервер повернув помилку ${response.status}${response.statusText ? ` (${response.statusText})` : ''}.`,
      response.status
    )
  }

  try {
    const data = (await response.json()) as T
    return { ...data, fetchedAt: new Date().toISOString() }
  } catch {
    throw new ApiError('Сервер повернув некоректну відповідь (очікувався JSON).', response.status)
  }
}

/** Глобальні дані: Header, Footer, контакти (GET /api/common) */
export async function fetchCommonData(): Promise<CommonApiResponse> {
  if (USE_MOCK) return FALLBACK_COMMON
  return getJson<CommonApiResponse>(`${API_BASE_URL}/api/common`)
}

/** Сторінка та її блоки (GET /api/page?path=...) */
export async function fetchPageData(path: string = '/'): Promise<PageApiResponse> {
  if (USE_MOCK) return FALLBACK_PAGE
  return getJson<PageApiResponse>(`${API_BASE_URL}/api/page?path=${encodeURIComponent(path)}`)
}

/** Відправка заявки (POST /api/apply). Повертає Discriminated Union: success | error */
export async function submitApplication(
  payload: ApplicationSubmission
): Promise<ApplicationSubmissionResult> {
  if (USE_MOCK) {
    return {
      success: true,
      message: 'Заявку збережено (демо-режим).',
      applicationId: `demo-${Date.now()}`,
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/apply`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    })

    const result = (await response.json().catch(() => ({}))) as Record<string, any>

    if (!response.ok) {
      return {
        success: false,
        error: result.error || `Помилка сервера ${response.status}`,
        field: result.field,
        details: result.details,
      }
    }

    return {
      success: true,
      message: result.message || 'Заявку успішно зареєстровано!',
      applicationId: result.applicationId,
    }
  } catch {
    // Чесно повідомляємо про збій, а не імітуємо успіх
    return {
      success: false,
      error: 'Не вдалося відправити заявку: немає зв’язку із сервером. Спробуйте пізніше.',
    }
  }
}
