import type { StatItem, FeatureItem, BenefitStepItem, ID } from './common'
import type { ScholarshipProgramItem } from './api'

/**
 * Опис структури блоків контенту (Page Builder Blocks)
 * Використовує суворі інтерфейси та дискриміноване об'єднання (Discriminated Union)
 */

export interface BaseBlock {
  readonly id?: ID
  readonly type: string
}

export interface HeroBlockData extends BaseBlock {
  readonly type: 'hero'
  readonly badge?: string
  readonly title: string
  readonly subtitle: string
  readonly primaryCtaText?: string
  readonly primaryCtaLink?: string
  readonly secondaryCtaText?: string
  readonly secondaryCtaLink?: string
  readonly stats?: readonly StatItem[]
}

export interface ProgramsBlockData extends BaseBlock {
  readonly type: 'programs'
  readonly badge?: string
  readonly title: string
  readonly description?: string
  readonly showOnlyActive?: boolean
  readonly programs?: readonly ScholarshipProgramItem[]
}

export interface AboutBlockData extends BaseBlock {
  readonly type: 'about'
  readonly badge?: string
  readonly title: string
  readonly leadText?: string
  readonly features?: readonly FeatureItem[]
}

export interface BenefitsBlockData extends BaseBlock {
  readonly type: 'benefits'
  readonly badge?: string
  readonly title: string
  readonly description?: string
  readonly items?: readonly BenefitStepItem[]
}

export interface ApplyFormBlockData extends BaseBlock {
  readonly type: 'apply-form'
  readonly badge?: string
  readonly title: string
  readonly description?: string
  readonly deadlineNotice?: string
  readonly supportContact?: string
}

export interface CtaBlockData extends BaseBlock {
  readonly type: 'cta'
  readonly badge?: string
  readonly title: string
  readonly description?: string
  readonly points?: readonly { readonly text: string }[]
  readonly buttonText: string
  readonly buttonLink: string
}

// Головне дискриміноване об'єднання типів (Discriminated Union Type)
export type PageBlock =
  | HeroBlockData
  | ProgramsBlockData
  | AboutBlockData
  | BenefitsBlockData
  | CtaBlockData
  | ApplyFormBlockData

// Літеральний тип усіх доступних типів блоків
export type BlockType = PageBlock['type']

// Type Guards для безпечного звуження типів блоків (Type Narrowing)
export function isHeroBlock(block: PageBlock): block is HeroBlockData {
  return block.type === 'hero'
}

export function isProgramsBlock(block: PageBlock): block is ProgramsBlockData {
  return block.type === 'programs'
}

export function isAboutBlock(block: PageBlock): block is AboutBlockData {
  return block.type === 'about'
}

export function isBenefitsBlock(block: PageBlock): block is BenefitsBlockData {
  return block.type === 'benefits'
}

export function isApplyFormBlock(block: PageBlock): block is ApplyFormBlockData {
  return block.type === 'apply-form'
}

export function isCtaBlock(block: PageBlock): block is CtaBlockData {
  return block.type === 'cta'
}
