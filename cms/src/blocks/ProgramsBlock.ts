import type { Block } from 'payload'

export const ProgramsBlock: Block = {
  slug: 'programs',
  labels: {
    singular: 'Секція стипендійних програм',
    plural: 'Секції стипендійних програм',
  },
  fields: [
    {
      name: 'badge',
      label: 'Бейдж над заголовком',
      type: 'text',
      defaultValue: 'Доступні напрями фінансування',
    },
    {
      name: 'title',
      label: 'Заголовок секції',
      type: 'text',
      required: true,
      defaultValue: 'Актуальні стипендіальні програми 2026–2027',
    },
    {
      name: 'description',
      label: 'Опис секції',
      type: 'textarea',
      defaultValue: 'Оберіть програму, яка відповідає вашим потребам та життєвим обставинам. Комісія Центру Боско гарантує об’єктивний і прозорий розгляд кожного мотиваційного листа.',
    },
    {
      name: 'showOnlyActive',
      label: 'Показувати лише активні програми',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
