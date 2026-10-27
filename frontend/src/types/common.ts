/**
 * Загальні типи та моделі даних системи стипендій Центру Боско
 */

// Базові аліаси типів (Type Aliases)
export type ID = string | number
export type AcademicYear = '2025/2026' | '2026/2027'

// Об'єднання літеральних типів (Union Types) для суворої валідації
export type AcademicGroup =
  | 'IT-11' // ІТ-11
  | 'IT-12' // ІТ-12
  | 'D-11' // Д-11
  | 'K-11' // К-11
  | 'A-11' // А-11
  | 'A-12' // А-12
  | 'A-13' // А-13
  | 'M-11' // М-11

export type ProgramKind =
  | 'tuition'   // Навчання в закладі
  | 'collegium' // Колегіум
  | 'cafe'      // Харчування в кафе «Мама Маргарита»
  | 'social'    // Соціальна підтримка
  | 'merit'     // Академічні досягнення

export type ApplicationStatus = 'pending' | 'approved' | 'rejected'

export type StudentCategory =
  | 'all'
  | 'vpo'
  | 'military_children'
  | 'low_income'
  | 'collegium_residents'
  | 'high_achievers'

export type UiStateStatus = 'idle' | 'loading' | 'success' | 'error'

// Типи перетину (Intersection Types)
export type Identifiable<T> = T & {
  readonly id: ID
}

export type WithTimestamps<T> = T & {
  readonly createdAt: string
  readonly updatedAt?: string
}

// Інтерфейси навігаційних і контактних сутностей
export interface NavItem {
  readonly label: string
  readonly url: string
  readonly isExternal?: boolean
}

export interface CtaButton {
  readonly text: string
  readonly link: string
}

export interface ContactInfo {
  readonly address: string
  readonly phone: string
  readonly email: string
  readonly workingHours: string
}

export interface SocialLink {
  readonly platform: 'Facebook' | 'Instagram' | 'TikTok' | string
  readonly url: string
  readonly icon?: string
}

export interface StatItem {
  readonly value: string
  readonly label: string
}

export interface FeatureItem {
  readonly title: string
  readonly description: string
  readonly icon?: string
}

export interface BenefitStepItem {
  readonly stepNumber?: string
  readonly title: string
  readonly description: string
}
