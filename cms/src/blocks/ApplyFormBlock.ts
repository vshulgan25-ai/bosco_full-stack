import type { Block } from 'payload'

export const ApplyFormBlock: Block = {
  slug: 'apply-form',
  labels: {
    singular: 'Секція «Форма подачі заявки»',
    plural: 'Секції «Форми подачі заявок»',
  },
  fields: [
    {
      name: 'badge',
      label: 'Бейдж',
      type: 'text',
      defaultValue: 'Подання документів онлайн',
    },
    {
      name: 'title',
      label: 'Заголовок форми',
      type: 'text',
      required: true,
      defaultValue: 'Подайте заявку на отримання стипендії',
    },
    {
      name: 'description',
      label: 'Пояснення для учнів',
      type: 'textarea',
      defaultValue: 'Заповніть електронну анкету нижче. Ваша заявка потрапить на розгляд комісії Центру Боско. Відповідь буде надіслана на вказану електронну пошту.',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'deadlineNotice',
          label: 'Термін прийому (дедлайн)',
          type: 'text',
          defaultValue: 'Кінцевий термін подання: 24 грудня 2026 року',
        },
        {
          name: 'supportContact',
          label: 'Контакт відповідальної особи',
          type: 'text',
          defaultValue: 'тел. +38 (032) 223-08-33 | scholarship@boscocenter.lviv.ua',
        },
      ],
    },
  ],
}
