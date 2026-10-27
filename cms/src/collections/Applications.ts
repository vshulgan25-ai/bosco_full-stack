import type { CollectionConfig } from 'payload'
import { anyone, isStaff } from '../access'

export const Applications: CollectionConfig = {
  slug: 'applications',
  labels: {
    singular: 'Заявка на стипендію',
    plural: 'Заявки на стипендії (2026-2027)',
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'group', 'program', 'status', 'academicYear', 'createdAt'],
    group: 'Заявки',
  },
  access: {
    create: anyone, // Дозволяє подавати заявку через веб-форму на фронтенді
    read: isStaff,   // Тільки модератори та адміністратори можуть переглядати всі заявки
    update: isStaff, // Редагувати статус можуть лише члени комісії
    delete: isStaff,
  },
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          data.status = 'pending' // Будь-яка нова заявка з фронтенду завжди створюється в статусі 'pending'
          if (!data.academicYear) {
            data.academicYear = '2026/2027'
          }
        }
        if (data.status && data.status !== 'pending' && !data.reviewedAt) {
          data.reviewedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'fullName',
          label: 'ПІБ учня',
          type: 'text',
          required: true,
        },
        {
          name: 'group',
          label: 'Навчальна група',
          type: 'select',
          required: true,
          options: [
            { label: 'ІТ-11', value: 'IT-11' },
            { label: 'ІТ-12', value: 'IT-12' },
            { label: 'Д-11', value: 'D-11' },
            { label: 'К-11', value: 'K-11' },
            { label: 'А-11', value: 'A-11' },
            { label: 'А-12', value: 'A-12' },
            { label: 'А-13', value: 'A-13' },
            { label: 'М-11', value: 'M-11' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'email',
          label: 'Електронна пошта',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          label: 'Номер телефону',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'program',
          label: 'Обрана стипендіальна програма',
          type: 'relationship',
          relationTo: 'scholarship-programs',
          required: true,
        },
        {
          name: 'academicYear',
          label: 'Навчальний рік',
          type: 'select',
          required: true,
          defaultValue: '2026/2027',
          options: [
            { label: '2025/2026 навчальний рік', value: '2025/2026' },
            { label: '2026/2027 навчальний рік', value: '2026/2027' },
          ],
        },
      ],
    },
    {
      name: 'motivation',
      label: 'Мотиваційний лист (обґрунтування потреби у стипендії)',
      type: 'textarea',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'status',
          label: 'Статус заявки',
          type: 'select',
          required: true,
          defaultValue: 'pending',
          options: [
            { label: 'На розгляді (Pending)', value: 'pending' },
            { label: 'Схвалено (Approved)', value: 'approved' },
            { label: 'Відхилено (Rejected)', value: 'rejected' },
          ],
        },
        {
          name: 'reviewedAt',
          label: 'Дата прийняття рішення комісією',
          type: 'date',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
      ],
    },
    {
      name: 'reviewNote',
      label: 'Коментар стипендіальної комісії',
      type: 'textarea',
      admin: {
        description: 'Примітка комісії або підстава схвалення/відхилення заявки',
      },
    },
  ],
}
