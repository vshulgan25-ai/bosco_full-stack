import type { CollectionConfig } from 'payload'
import { anyone, isStaff } from '../access'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Медіафайл',
    plural: 'Медіафайли',
  },
  admin: {
    group: 'Контент',
  },
  access: {
    read: anyone,
    create: isStaff,
    update: isStaff,
    delete: isStaff,
  },
  upload: {
    staticDir: 'public/media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      label: 'Альтернативний текст (Alt Text)',
      type: 'text',
      required: true,
    },
  ],
}
