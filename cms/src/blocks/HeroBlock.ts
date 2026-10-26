import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Секція',
    plural: 'Hero Секції',
  },
  fields: [
    {
      name: 'badge',
      label: 'Верхній бейдж',
      type: 'text',
      defaultValue: 'Стипендії 2026–2027 навчального року',
    },
    {
      name: 'title',
      label: 'Головний заголовок',
      type: 'text',
      required: true,
      defaultValue: 'Система управління стипендіальними програмами учнів Центру Боско',
    },
    {
      name: 'subtitle',
      label: 'Підзаголовок / Опис',
      type: 'textarea',
      required: true,
      defaultValue: 'Підтримка обдарованих, старанних та соціально вразливих учнів Центру професійної освіти св. Івана Боско у здобутті фахової освіти європейського рівня.',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'primaryCtaText',
          label: 'Текст головної кнопки',
          type: 'text',
          defaultValue: 'Подати заявку на стипендію',
        },
        {
          name: 'primaryCtaLink',
          label: 'Посилання головної кнопки',
          type: 'text',
          defaultValue: '#apply',
        },
        {
          name: 'secondaryCtaText',
          label: 'Текст вторинної кнопки',
          type: 'text',
          defaultValue: 'Ознайомитися з програмами',
        },
        {
          name: 'secondaryCtaLink',
          label: 'Посилання вторинної кнопки',
          type: 'text',
          defaultValue: '#programs',
        },
      ],
    },
    {
      name: 'stats',
      label: 'Ключові статистичні показники',
      type: 'array',
      labels: {
        singular: 'Показник',
        plural: 'Показники',
      },
      fields: [
        {
          name: 'value',
          label: 'Число / Значення (наприклад: 10 000 грн, 120+, 100%)',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          label: 'Опис показника',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
