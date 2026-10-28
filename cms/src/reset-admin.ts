import { getPayload } from 'payload'
import config from './payload.config'

const EMAIL = 'admin@bosco.local'
const PASSWORD = 'admin12345'

const payload = await getPayload({ config })

const found = await payload.find({
  collection: 'users',
  where: { email: { equals: EMAIL } },
  limit: 1,
})

if (found.docs[0]) {
  await payload.update({
    collection: 'users',
    id: found.docs[0].id,
    data: { password: PASSWORD, roles: ['admin'], loginAttempts: 0, lockUntil: null } as any,
  })
  payload.logger.info('Пароль адміністратора скинуто.')
} else {
  await payload.create({
    collection: 'users',
    data: {
      email: EMAIL,
      password: PASSWORD,
      firstName: 'Адміністратор',
      lastName: 'Системи',
      roles: ['admin'],
    } as any,
  })
  payload.logger.info('Акаунт адміністратора створено.')
}

payload.logger.info('Блокування акаунта знято.')

payload.logger.info(`Вхід в адмінку: ${EMAIL} / ${PASSWORD}`)
process.exit(0)
