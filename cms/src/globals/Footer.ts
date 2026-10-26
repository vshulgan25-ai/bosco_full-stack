import type { GlobalConfig } from 'payload'
import { anyone, isStaff } from '../access'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Підвал сайту (Footer)',
  access: {
    read: anyone,
    update: isStaff,
  },
  admin: {
    group: 'Глобальні налаштування',
  },
  fields: [
    {
      name: 'aboutText',
      label: 'Текст про Центр',
      type: 'textarea',
      defaultValue: 'Центр професійної освіти св. Івана Боско — благодійний навчальний заклад у Львові, що надає сучасну фахову освіту та формує відповідальну молодь.',
    },
    {
      type: 'group',
      name: 'contacts',
      label: 'Контактна інформація',
      fields: [
        {
          name: 'address',
          label: 'Адреса закладу',
          type: 'text',
          defaultValue: '79014, м. Львів, вул. Дорога Кривчицька, 19д',
        },
        {
          name: 'phone',
          label: 'Контактний телефон',
          type: 'text',
          defaultValue: '+38 (032) 223-08-33',
        },
        {
          name: 'email',
          label: 'Електронна пошта',
          type: 'email',
          defaultValue: 'scholarship@boscocenter.lviv.ua',
        },
        {
          name: 'workingHours',
          label: 'Години роботи',
          type: 'text',
          defaultValue: 'Пн–Пт: 09:00 – 17:00',
        },
      ],
    },
    {
      name: 'quickLinks',
      label: 'Швидкі посилання',
      type: 'array',
      fields: [
        {
          name: 'label',
          label: 'Текст посилання',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'Адреса посилання',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'socialLinks',
      label: 'Соціальні мережі',
      type: 'array',
      fields: [
        {
          name: 'platform',
          label: 'Назва платформи (Facebook, Instagram, TikTok)',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          label: 'Посилання на сторінку',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'copyright',
      label: 'Текст копірайту',
      type: 'text',
      defaultValue: '© 2026 Центр професійної освіти св. Івана Боско. Всі права захищено.',
    },
  ],
}
