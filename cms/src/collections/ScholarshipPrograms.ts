import type { CollectionConfig } from 'payload'
import { anyone, isStaff } from '../access'

export const ScholarshipPrograms: CollectionConfig = {
  slug: 'scholarship-programs',
  labels: {
    singular: 'Стипендіальна програма',
    plural: 'Стипендіальні програми',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'kind', 'amount', 'category', 'isActive'],
    group: 'Стипендії',
  },
  access: {
    read: anyone,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          label: 'Назва стипендіальної програми',
          type: 'text',
          required: true,
        },
        {
          name: 'kind',
          label: 'Тип програми',
          type: 'select',
          required: true,
          options: [
            { label: 'Оплата навчання в закладі', value: 'tuition' },
            { label: 'Проживання в колегіумі', value: 'collegium' },
            { label: 'Харчування в кафе «Мама Маргарита»', value: 'cafe' },
            { label: 'Соціальна підтримка', value: 'social' },
            { label: 'Академічна відзнака', value: 'merit' },
          ],
        },
      ],
    },
    {
      name: 'shortDescription',
      label: 'Короткий опис (для карток на сайті)',
      type: 'textarea',
      required: true,
    },
    {
      name: 'description',
      label: 'Повний опис та умови надання',
      type: 'textarea',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'amount',
          label: 'Розмір стипендії (грн)',
          type: 'number',
          required: true,
          min: 0,
        },
        {
          name: 'amountNote',
          label: 'Періодичність виплати',
          type: 'select',
          defaultValue: 'за модуль',
          options: [
            { label: 'за модуль', value: 'за модуль' },
            { label: 'щомісяця', value: 'щомісяця' },
            { label: 'щодня (комплексний обід)', value: 'щодня' },
            { label: 'на семестр', value: 'на семестр' },
            { label: 'одноразово', value: 'одноразово' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'category',
          label: 'Категорія учнів',
          type: 'select',
          required: true,
          options: [
            { label: 'Усі учні Центру Боско', value: 'all' },
            { label: 'ВПО та постраждалі від війни', value: 'vpo' },
            { label: 'Діти військовослужбовців та ветеранів', value: 'military_children' },
            { label: 'Учні з багатодітних та малозабезпечених сімей', value: 'low_income' },
            { label: 'Мешканці студентського колегіуму', value: 'collegium_residents' },
            { label: 'Відмінники навчання та лідери волонтерства', value: 'high_achievers' },
          ],
        },
        {
          name: 'badge',
          label: 'Бейдж (наприклад: "Топ вибір", "Соціальна")',
          type: 'text',
          defaultValue: 'Активна',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'isActive',
          label: 'Прийом заявок відкритий (2026-2027 н.р.)',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'order',
          label: 'Порядок сортування',
          type: 'number',
          defaultValue: 10,
        },
      ],
    },
  ],
}
