import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isStaff } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  labels: {
    singular: 'Користувач',
    plural: 'Користувачі',
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'lastName', 'firstName', 'roles', 'group'],
    group: 'Адміністрування',
  },
  access: {
    read: isStaff,
    create: isAdmin,
    update: isStaff,
    delete: isAdmin,
    admin: ({ req: { user } }) => Boolean(user && (user.roles?.includes('admin') || user.roles?.includes('editor'))),
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          label: "Ім'я",
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          label: 'Прізвище',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'patronymic',
      label: 'По батькові',
      type: 'text',
    },
    {
      name: 'roles',
      label: 'Ролі в системі',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['student'],
      options: [
        { label: 'Головний адміністратор', value: 'admin' },
        { label: 'Контент-редактор / Модератор', value: 'editor' },
        { label: 'Учень Центру Боско', value: 'student' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'group',
          label: 'Академічна група',
          type: 'select',
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
        {
          name: 'course',
          label: 'Курс навчання',
          type: 'select',
          options: [
            { label: '1 курс', value: '1' },
            { label: '2 курс', value: '2' },
            { label: '3 курс', value: '3' },
          ],
        },
      ],
    },
    {
      name: 'phone',
      label: 'Контактний телефон',
      type: 'text',
    },
  ],
}
