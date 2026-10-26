import type { Block } from 'payload'

export const CtaBlock: Block = {
  slug: 'cta',
  labels: {
    singular: 'Заклик перейти на основний сайт',
    plural: 'Заклики перейти на основний сайт',
  },
  fields: [
    {
      name: 'badge',
      label: 'Бейдж',
      type: 'text',
      defaultValue: 'Основний сайт',
    },
    {
      name: 'title',
      label: 'Заголовок',
      type: 'text',
      required: true,
      defaultValue: 'Готові подати заявку? Переходьте на основний сайт',
    },
    {
      name: 'description',
      label: 'Короткий опис',
      type: 'textarea',
      defaultValue: 'На основному сайті можна зареєструватися, подати заявку на стипендію та стежити за її розглядом.',
    },
    {
      name: 'points',
      label: 'Причини перейти (2–4 пункти)',
      type: 'array',
      labels: { singular: 'Причина', plural: 'Причини' },
      fields: [
        {
          name: 'text',
          label: 'Текст причини',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'buttonText',
      label: 'Текст кнопки',
      type: 'text',
      required: true,
      defaultValue: 'Перейти на основний сайт',
    },
    {
      name: 'buttonLink',
      label: 'Адреса основного сайту',
      type: 'text',
      required: true,
      defaultValue: 'https://',
    },
  ],
}
