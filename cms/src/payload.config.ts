import path from 'path'
import { fileURLToPath } from 'url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { uk } from '@payloadcms/translations/languages/uk'
import { buildConfig } from 'payload'
import sharp from 'sharp'

// Колекції
import { Users } from './collections/Users'
import { ScholarshipPrograms } from './collections/ScholarshipPrograms'
import { Applications } from './collections/Applications'
import { Pages } from './collections/Pages'
import { Media } from './collections/Media'

// Глобальні сутності
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'

// Кастомні API ендпоінти
import { getCommonDataHandler } from './endpoints/common'
import { getPageDataHandler } from './endpoints/page'
import { submitApplicationHandler } from './endpoints/apply'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Налаштування списку дозволених CORS джерел для безпечної взаємодії з фронтендом
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const clean = (url: string): string => url.trim().replace(/\/+$/, '')

// Адреса самої CMS та локальні адреси додаються завжди, інакше куки входу в адмінку відхиляються (CSRF)
const allowedOrigins = Array.from(
  new Set(
    [
      ...(process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : []),
      serverUrl,
      'http://localhost:3000',
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ]
      .map(clean)
      .filter(Boolean)
  )
)

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  cors: allowedOrigins,
  csrf: allowedOrigins,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Центр професійної освіти Боско',
      icons: [{ rel: 'icon', type: 'image/png', url: '/logo.png' }],
    },
  },
  collections: [
    Users,
    ScholarshipPrograms,
    Applications,
    Pages,
    Media,
  ],
  globals: [
    Header,
    Footer,
  ],
  endpoints: [
    {
      path: '/common',
      method: 'get',
      handler: getCommonDataHandler,
    },
    {
      path: '/page',
      method: 'get',
      handler: getPageDataHandler,
    },
    {
      path: '/apply',
      method: 'post',
      handler: submitApplicationHandler,
    },
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'bosco-scholarships-secret-key-fallback',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Хмарне підключення до реляційної БД PostgreSQL на платформі Neon
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || 'postgresql://neondb_owner:npg@ep-cool-lake.eu-central-1.aws.neon.tech/neondb?sslmode=require',
    },
  }),
  i18n: {
    supportedLanguages: { uk, en },
    fallbackLanguage: 'uk',
  },
  sharp,
})
