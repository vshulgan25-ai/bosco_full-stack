import type { GlobalConfig } from 'payload'
import { anyone, isStaff } from '../access'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Шапка сайту (Header)',
  access: {
    read: anyone,
    update: isStaff,
  },
  admin: {
    group: 'Глобальні налаштування',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'siteTitle',
          label: 'Назва закладу',
          type: 'text',
          required: true,
          defaultValue: 'Центр професійної освіти Боско',
        },
        {
          name: 'siteSubtitle',
          label: 'Підзаголовок відділу',
          type: 'text',
          defaultValue: 'Стипендіальний портал 2026–2027',
        },
      ],
    },
    {
      name: 'logoUrl',
      label: 'URL Логотипу',
      type: 'text',
      defaultValue: '/logo.png',
    },
    {
      name: 'navItems',
      label: 'Пункти головного меню',
      type: 'array',
      labels: {
        singular: 'Пункт меню',
        plural: 'Пункти меню',
      },
      fields: [
        {
          name: 'label',
          label: 'Текст пункту',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'Посилання (#якор або URL)',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'ctaButton',
      label: 'Кнопка заклику до дії (Header CTA)',
      fields: [
        {
          name: 'text',
          label: 'Текст кнопки',
          type: 'text',
          defaultValue: 'Подати заявку',
        },
        {
          name: 'link',
          label: 'Посилання',
          type: 'text',
          defaultValue: '#apply',
        },
      ],
    },
  ],
}
