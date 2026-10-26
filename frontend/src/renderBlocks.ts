import type { PageBlock } from './types/blocks'
import { renderHeroBlock } from './blocks/Hero'
import { renderProgramsBlock } from './blocks/Programs'
import { renderAboutBlock } from './blocks/About'
import { renderCtaBlock } from './blocks/Cta'
import { renderBenefitsBlock } from './blocks/Benefits'
import { renderApplyFormBlock } from './blocks/ApplyForm'

/**
 * Головний диспетчер динамічного рендерингу блоків сторінки (Page Builder Engine)
 * Читає поле `type` з JSON-масиву блоків та викликає відповідний шаблон
 *
 * @param container DOM-контейнер для вставки згенерованих секцій
 * @param blocks Масив контентних блоків з API Payload CMS
 */
export function renderBlocks(
  container: HTMLElement,
  blocks: readonly PageBlock[]
): void {
  // Очищення контейнера перед рендерингом нового набору блоків
  container.innerHTML = ''

  if (!blocks || blocks.length === 0) {
    const emptyNotice = document.createElement('div')
    emptyNotice.className = 'container text-center py-12'
    emptyNotice.innerHTML = '<p>Вміст для цієї сторінки наразі формується в Payload CMS.</p>'
    container.appendChild(emptyNotice)
    return
  }

  // Знаходимо програми для передачі у випадаючий список форми заявки
  let availablePrograms: { id: string | number; name: string }[] = []
  const programsBlock = blocks.find((b) => b.type === 'programs')
  if (programsBlock && 'programs' in programsBlock && programsBlock.programs) {
    availablePrograms = programsBlock.programs.map((p) => ({
      id: p.id,
      name: `${p.name} (${p.amount.toLocaleString('uk-UA')} ₴ / ${p.amountNote})`,
    }))
  }

  // Послідовна обробка та складання блоків у DOM-дерево
  blocks.forEach((block) => {
    let blockElement: HTMLElement | null = null

    switch (block.type) {
      case 'hero':
        blockElement = renderHeroBlock(block)
        break

      case 'programs':
        blockElement = renderProgramsBlock(block)
        break

      case 'about':
        blockElement = renderAboutBlock(block)
        break

      case 'benefits':
        blockElement = renderBenefitsBlock(block)
        break

      case 'cta':
        blockElement = renderCtaBlock(block)
        break
      case 'apply-form':
        blockElement = renderApplyFormBlock(block, availablePrograms)
        break

      default: {
        // Exhaustive check: якщо додати новий тип у PageBlock без обробки — TypeScript підсвітить помилку
        const unknownBlock: never = block
        console.warn('[renderBlocks] Невідомий тип блоку:', unknownBlock)
        break
      }
    }

    if (blockElement) {
      container.appendChild(blockElement)
    }
  })
}
