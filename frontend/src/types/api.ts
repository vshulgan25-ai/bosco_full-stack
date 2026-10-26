export type {
  ID,
  AcademicYear,
  AcademicGroup,
  ProgramKind,
  StudentCategory,
  NavItem,
  CtaButton,
  ContactInfo,
  SocialLink,
  Identifiable,
  WithTimestamps,
} from './common'

import type {
  ID,
  AcademicYear,
  AcademicGroup,
  ProgramKind,
  StudentCategory,
  NavItem,
  CtaButton,
  ContactInfo,
  SocialLink,
  Identifiable,
  WithTimestamps,
} from './common'
import type { PageBlock } from './blocks'

/**
 * Опис контрактів API (DTO — Data Transfer Objects)
 */

export interface ScholarshipProgramItem extends Identifiable<{}> {
  readonly name: string
  readonly kind: ProgramKind
  readonly shortDescription: string
  readonly description?: string
  readonly amount: number
  readonly amountNote: string
  readonly category: StudentCategory
  readonly badge?: string
  readonly isActive: boolean
}

// Приклад використання Intersection Types (Типи перетину)
export type CompleteProgramDetails = ScholarshipProgramItem &
  WithTimestamps<{
    readonly eligibilityRules?: readonly string[]
    readonly sponsorName?: string
  }>

export interface CommonApiResponse {
  readonly academicYear: AcademicYear
  readonly header: {
    readonly siteTitle: string
    readonly siteSubtitle: string
    readonly logoUrl: string
    readonly navItems: readonly NavItem[]
    readonly ctaButton: CtaButton
  }
  readonly footer: {
    readonly aboutText: string
    readonly contacts: ContactInfo
    readonly quickLinks: readonly NavItem[]
    readonly socialLinks: readonly SocialLink[]
    readonly copyright: string
  }
  readonly stats: {
    readonly totalActivePrograms: number
  }
}

export interface PageApiResponse extends Identifiable<{}> {
  readonly title: string
  readonly path: string
  readonly metaDescription?: string
  readonly blocks: readonly PageBlock[]
}

export interface ApplicationSubmission {
  readonly fullName: string
  readonly group: AcademicGroup
  readonly email: string
  readonly phone: string
  readonly program: string
  readonly motivation: string
  readonly academicYear?: AcademicYear
}

export interface ApplicationSubmissionSuccess {
  readonly success: true
  readonly message: string
  readonly applicationId: ID
}

export interface ApplicationSubmissionError {
  readonly success: false
  readonly error: string
  readonly field?: keyof ApplicationSubmission
  readonly details?: string
}

// Discriminated Union для результату подання форми
export type ApplicationSubmissionResult =
  | ApplicationSubmissionSuccess
  | ApplicationSubmissionError

export interface ApiErrorResponse {
  readonly error: string
  readonly details?: string
  readonly requestedPath?: string
}

// Узагальнений тип перетину з часовою міткою отримання
export type ApiResponseWithMetadata<T> = T & {
  readonly fetchedAt: string
}
