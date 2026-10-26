import type { CollectionConfig } from 'payload'
import { anyone, isStaff } from '../access'
import { HeroBlock } from '../blocks/HeroBlock'
import { ProgramsBlock } from '../blocks/ProgramsBlock'
import { AboutBlock } from '../blocks/AboutBlock'
import { BenefitsBlock } from '../blocks/BenefitsBlock'
import { ApplyFormBlock } from '../blocks/ApplyFormBlock'
import { CtaBlock } from '../blocks/CtaBlock'

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: 'Сторінка сайту',
    plural: 'Сторінки сайту',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'path', 'updatedAt'],
    group: 'Контент',
  },
  access: {
    read: anyone,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          label: 'Назва сторінки',
          type: 'text',
          required: true,
        },
        {
          name: 'path',
          label: 'URL Шлях сторінки (наприклад: / або /scholarships)',
          type: 'text',
          required: true,
          unique: true,
          defaultValue: '/',
        },
      ],
    },
    {
      name: 'metaDescription',
      label: 'SEO Опис сторінки (Meta Description)',
      type: 'textarea',
      defaultValue: 'Офіційний портал стипендіальних програм Центру професійної освіти св. Івана Боско у Львові.',
    },
    {
      name: 'layout',
      label: 'Блоки контенту сторінки (Page Builder)',
      type: 'blocks',
      required: true,
      blocks: [
        HeroBlock,
        ProgramsBlock,
        AboutBlock,
        BenefitsBlock,
        CtaBlock,
        ApplyFormBlock,
      ],
    },
  ],
}
