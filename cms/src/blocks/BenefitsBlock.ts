import type { Block } from 'payload'

export const BenefitsBlock: Block = {
  slug: 'benefits',
  labels: {
    singular: 'Секція «Переваги та критерії»',
    plural: 'Секції «Переваги та критерії»',
  },
  fields: [
    {
      name: 'badge',
      label: 'Бейдж',
      type: 'text',
      defaultValue: 'Чому це важливо',
    },
    {
      name: 'title',
      label: 'Заголовок секції',
      type: 'text',
      required: true,
      defaultValue: 'Переваги участі у стипендіальній програмі',
    },
    {
      name: 'description',
      label: 'Опис секції',
      type: 'textarea',
      defaultValue: 'Ми переконані, що фінансові труднощі не повинні стояти на заваді отриманню якісної професії. Наша система забезпечує рівні умови для кожного мотивованого учня.',
    },
    {
      name: 'items',
      label: 'Перелік переваг',
      type: 'array',
      labels: {
        singular: 'Перевага',
        plural: 'Переваги',
      },
      fields: [
        {
          name: 'title',
          label: 'Назва переваги',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Детальний опис',
          type: 'textarea',
          required: true,
        },
        {
          name: 'stepNumber',
          label: 'Номер етапу або позначка',
          type: 'text',
        },
      ],
    },
  ],
}
