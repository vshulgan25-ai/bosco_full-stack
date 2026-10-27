import type { ApplyFormBlockData } from '../types/blocks'
import type { AcademicGroup, ApplicationSubmission } from '../types/api'
import { submitApplication } from '../services/api'
import { showToast } from '../components/Toast'

const ACADEMIC_GROUPS: { label: string; value: AcademicGroup }[] = [
  { label: 'ІТ-21 (Програмне забезпечення)', value: 'IT-21' },
  { label: 'ІТ-22 (Веб-розробка)', value: 'IT-22' },
  { label: 'АВ-21 (Автомобільний транспорт)', value: 'AV-21' },
  { label: 'ПО-22 (Перукарське мистецтво)', value: 'PO-22' },
  { label: 'КП-21 (Кухарська справа)', value: 'KP-21' },
  { label: 'РЕМ-21 (Ремонт та обслуговування)', value: 'REM-21' },
  { label: 'ЕЛ-22 (Електротехніка)', value: 'EL-22' },
]

const DEFAULT_PROGRAMS = [
  { id: 'tuition', name: 'Стипендія на оплату навчання (10 000 ₴ / модуль)' },
  { id: 'collegium', name: 'Стипендія на проживання в колегіумі (4 000 ₴ / міс)' },
  { id: 'cafe', name: 'Харчування в кафе «Мама Маргарита» (200 ₴ / день)' },
  { id: 'social', name: 'Соціальна підтримка учнів у скруті (3 500 ₴ / міс)' },
  { id: 'merit', name: 'Іменна академічна відзнака св. Івана Боско (5 000 ₴ / сем)' },
]

/**
 * Рендеринг форми подання заявки з повною клієнтською валідацією
 */
export function renderApplyFormBlock(
  data: ApplyFormBlockData,
  availablePrograms: { id: string | number; name: string }[] = []
): HTMLElement {
  const section = document.createElement('section')
  section.id = 'apply'
  section.className = 'block block--apply'

  const container = document.createElement('div')
  container.className = 'container form-container-wrapper'

  // Заголовок форми
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

  // Картка з формою
  const card = document.createElement('div')
  card.className = 'form-card'

  if (data.deadlineNotice || data.supportContact) {
    const noticeBox = document.createElement('div')
    noticeBox.className = 'form-notice-box'
    noticeBox.innerHTML = `
      <div class="notice-icon">📅</div>
      <div>
        <strong>${data.deadlineNotice || 'Навчальний рік 2026–2027'}</strong>
        <p class="notice-sub">${data.supportContact || ''}</p>
      </div>
    `
    card.appendChild(noticeBox)
  }

  const form = document.createElement('form')
  form.className = 'scholarship-form'
  form.noValidate = true

  const programsList =
    availablePrograms.length > 0 ? availablePrograms : DEFAULT_PROGRAMS

  const programOptionsHtml = programsList
    .map((p) => `<option value="${p.id}">${p.name}</option>`)
    .join('')

  const groupOptionsHtml = ACADEMIC_GROUPS.map(
    (g) => `<option value="${g.value}">${g.label}</option>`
  ).join('')

  form.innerHTML = `
    <div class="form-row">
      <div class="form-group">
        <label for="apply-fullName" class="form-label">
          Прізвище, ім'я та по батькові учня <span class="required">*</span>
        </label>
        <input
          type="text"
          id="apply-fullName"
          name="fullName"
          class="form-control"
          placeholder="Прізвище Ім'я По батькові (повністю)"
          required
        />
        <span class="form-error" id="error-fullName"></span>
      </div>

      <div class="form-group">
        <label for="apply-group" class="form-label">
          Академічна група (строгий селект) <span class="required">*</span>
        </label>
        <select id="apply-group" name="group" class="form-control" required>
          <option value="" disabled selected>Оберіть вашу навчальну групу...</option>
          ${groupOptionsHtml}
        </select>
        <span class="form-error" id="error-group"></span>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="apply-email" class="form-label">
          Електронна пошта (для сповіщення) <span class="required">*</span>
        </label>
        <input
          type="email"
          id="apply-email"
          name="email"
          class="form-control"
          placeholder="student@bosco.lviv.ua"
          required
        />
        <span class="form-error" id="error-email"></span>
      </div>

      <div class="form-group">
        <label for="apply-phone" class="form-label">
          Контактний номер телефону <span class="required">*</span>
        </label>
        <input
          type="tel"
          id="apply-phone"
          name="phone"
          class="form-control"
          placeholder="+38 (098) 123-45-67"
          required
        />
        <span class="form-error" id="error-phone"></span>
      </div>
    </div>

    <div class="form-group">
      <label for="apply-program" class="form-label">
        Обрана стипендіальна програма <span class="required">*</span>
      </label>
      <select id="apply-program" name="program" class="form-control" required>
        <option value="" disabled selected>Оберіть напрям фінансування...</option>
        ${programOptionsHtml}
      </select>
      <span class="form-error" id="error-program"></span>
    </div>

    <div class="form-group">
      <div class="label-with-hint">
        <label for="apply-motivation" class="form-label">
          Мотиваційний лист та обґрунтування потреби <span class="required">*</span>
        </label>
        <span class="char-count" id="char-count">0 / 20 мін.</span>
      </div>
      <textarea
        id="apply-motivation"
        name="motivation"
        rows="4"
        class="form-control form-textarea"
        placeholder="Опишіть ваші навчальні досягнення, участь у практичних роботах майстерень або сімейні/соціальні обставини, через які ви потребуєте стипендіальної підтримки..."
        required
      ></textarea>
      <span class="form-error" id="error-motivation"></span>
    </div>

    <div class="form-footer">
      <p class="form-privacy">
        🔒 Ваші персональні дані захищені та обробляються виключно стипендіальною комісією Центру Боско.
      </p>
      <button type="submit" id="apply-submit-btn" class="btn btn--primary btn--lg">
        <span class="btn-text">Надіслати заявку до комісії</span>
        <span class="btn-spinner" style="display: none;">⏳ Відправка...</span>
      </button>
    </div>
  `

  // Динамічний лічильник символів для мотиваційного листа
  const motivationInput = form.querySelector('#apply-motivation') as HTMLTextAreaElement
  const charCount = form.querySelector('#char-count') as HTMLElement
  motivationInput.addEventListener('input', () => {
    const len = motivationInput.value.length
    charCount.textContent = `${len} / 20 мін.`
    if (len >= 20) {
      charCount.classList.add('is-valid')
    } else {
      charCount.classList.remove('is-valid')
    }
  })

  // Обробка відправки форми
  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // Очищення попередніх помилок
    form.querySelectorAll('.form-error').forEach((el) => (el.textContent = ''))
    form.querySelectorAll('.form-control').forEach((el) => el.classList.remove('is-invalid'))

    const fullName = (form.querySelector('#apply-fullName') as HTMLInputElement).value.trim()
    const group = (form.querySelector('#apply-group') as HTMLSelectElement).value as AcademicGroup
    const email = (form.querySelector('#apply-email') as HTMLInputElement).value.trim()
    const phone = (form.querySelector('#apply-phone') as HTMLInputElement).value.trim()
    const program = (form.querySelector('#apply-program') as HTMLSelectElement).value
    const motivation = (form.querySelector('#apply-motivation') as HTMLTextAreaElement).value.trim()

    let hasErrors = false

    const setError = (fieldId: string, errorMsg: string) => {
      hasErrors = true
      const input = form.querySelector(`#apply-${fieldId}`) as HTMLElement | null
      const errSpan = form.querySelector(`#error-${fieldId}`) as HTMLElement | null
      input?.classList.add('is-invalid')
      if (errSpan) errSpan.textContent = errorMsg
    }

    // Клієнтська валідація
    if (!fullName || fullName.length < 5) {
      setError('fullName', "Вкажіть повне Прізвище, Ім'я та По батькові (не менше 5 символів)")
    }

    if (!group) {
      setError('group', 'Оберіть вашу академічну групу')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      setError('email', 'Введіть коректну адресу електронної пошти')
    }

    if (!phone || phone.length < 9) {
      setError('phone', 'Вкажіть актуальний номер телефону для зв’язку')
    }

    if (!program) {
      setError('program', 'Оберіть стипендіальну програму')
    }

    if (!motivation || motivation.length < 20) {
      setError('motivation', 'Мотиваційний лист повинен містити щонайменше 20 символів')
    }

    if (hasErrors) {
      showToast('Будь ласка, виправте виділені поля форми', 'warning')
      return
    }

    // Стан відправки
    const submitBtn = form.querySelector('#apply-submit-btn') as HTMLButtonElement
    const btnText = submitBtn.querySelector('.btn-text') as HTMLElement
    const btnSpinner = submitBtn.querySelector('.btn-spinner') as HTMLElement

    submitBtn.disabled = true
    btnText.style.display = 'none'
    btnSpinner.style.display = 'inline'

    const payload: ApplicationSubmission = {
      fullName,
      group,
      email,
      phone,
      program,
      motivation,
      academicYear: '2026/2027',
    }

    try {
      const result = await submitApplication(payload)

      if (result.success) {
        showToast(result.message, 'success', 6000)

        // Показ картки успіху
        card.innerHTML = `
          <div class="form-success-card">
            <div class="success-icon">🎉</div>
            <h3 class="success-title">Заявку успішно прийнято!</h3>
            <p class="success-desc">
              Дякуємо, <strong>${fullName}</strong>! Ваша заявка для групи <strong>${group}</strong> 
              зареєстрована в системі під номером:
            </p>
            <div class="application-id-tag">Номер заявки: ${result.applicationId}</div>
            <p class="success-note">
              Рішення стипендіальної комісії Центру Боско буде надіслано на вашу пошту 
              <strong>${email}</strong> після завершення періоду розгляду.
            </p>
            <button type="button" class="btn btn--outline" id="btn-submit-another">
              Подати ще одну заявку
            </button>
          </div>
        `

        card.querySelector('#btn-submit-another')?.addEventListener('click', () => {
          // Перезапуск рендерингу форми
          const newBlock = renderApplyFormBlock(data, availablePrograms)
          section.replaceWith(newBlock)
        })
      } else {
        showToast(result.error || 'Помилка валідації на сервері', 'error')
        if (result.field) {
          setError(result.field, result.error)
        }
      }
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Виникла непередбачувана помилка при відправці', 'error')
    } finally {
      submitBtn.disabled = false
      btnText.style.display = 'inline'
      btnSpinner.style.display = 'none'
    }
  })

  card.appendChild(form)
  container.appendChild(card)
  section.appendChild(container)
  return section
}
