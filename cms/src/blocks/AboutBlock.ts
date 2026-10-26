import type { Block } from 'payload'

export const AboutBlock: Block = {
  slug: 'about',
  labels: {
    singular: 'Секція «Про Центр Боско»',
    plural: 'Секції «Про Центр Боско»',
  },
  fields: [
    {
      name: 'badge',
      label: 'Бейдж',
      type: 'text',
      defaultValue: 'Салезіанська освітня спільнота',
    },
    {
      name: 'title',
      label: 'Заголовок',
      type: 'text',
      required: true,
      defaultValue: 'Центр професійної освіти св. Івана Боско',
    },
    {
      name: 'leadText',
      label: 'Вступний абзац',
      type: 'textarea',
      defaultValue: 'Центр професійної освіти Боско у Львові — це унікальний заклад професійно-технічної освіти, де поєднуються передові технологічні лабораторії, християнські цінності та всебічна опіка над молоддю за системою Дона Боско.',
    },
    {
      name: 'features',
      label: 'Ключові особливості закладу',
      type: 'array',
      labels: {
        singular: 'Особливість',
        plural: 'Особливості',
      },
      fields: [
        {
          name: 'title',
          label: 'Заголовок пункту',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Опис пункту',
          type: 'textarea',
          required: true,
        },
        {
          name: 'icon',
          label: 'Іконка (назва або код)',
          type: 'text',
          defaultValue: 'graduation-cap',
        },
      ],
    },
  ],
}
