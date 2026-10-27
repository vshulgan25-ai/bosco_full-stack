import { getPayload } from 'payload'
import config from './payload.config'

const STUDENT_PASSWORD = process.env.SEED_STUDENT_PASSWORD || 'Bosco2026!'

async function seed() {
  const payload = await getPayload({ config })
  const MAIN_SITE_URL = process.env.MAIN_SITE_URL || 'https://mnzbosco.org.ua/'
  payload.logger.info('Початок ініціалізації бази даних (Seeding) для Центру Боско...')

  // 1. Створення користувачів (Адміністратори, Редактори, Учні)
  const ensureUser = async (email: string, data: Record<string, any>) => {
    const found = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
    })
    if (found.docs[0]) return found.docs[0]
    return payload.create({
      collection: 'users',
      data: { email, ...data } as any,
    })
  }

  const admin = await ensureUser('admin@bosco.local', {
    password: 'admin12345',
    firstName: 'Адміністратор',
    lastName: 'Системи',
    patronymic: 'Боско',
    roles: ['admin'],
  })

  const editor = await ensureUser('editor@bosco.local', {
    password: 'editor12345',
    firstName: 'Оксана',
    lastName: 'Мельник',
    patronymic: 'Степанівна',
    roles: ['editor'],
  })

  const studentVeronika = await ensureUser('shulhan.veronika@bosco.local', {
    password: STUDENT_PASSWORD,
    firstName: 'Вероніка',
    lastName: 'Шульган',
    group: 'IT-12',
    course: '2',
    phone: '+38 (098) 111-22-33',
    roles: ['student'],
  })

  const studentTereza = await ensureUser('fedash.tereza@bosco.local', {
    password: STUDENT_PASSWORD,
    firstName: 'Тереза',
    lastName: 'Федаш',
    group: 'IT-11',
    course: '2',
    phone: '+38 (097) 222-33-44',
    roles: ['student'],
  })

  const studentBohdan = await ensureUser('kovalchuk.bohdan@bosco.local', {
    password: STUDENT_PASSWORD,
    firstName: 'Богдан',
    lastName: 'Ковальчук',
    group: 'A-11',
    course: '1',
    phone: '+38 (063) 333-44-55',
    roles: ['student'],
  })

  payload.logger.info('Користувачів створено/перевірено успішно.')

  // 2. Створення стипендіальних програм
  const programsData = [
    {
      name: 'Стипендія на оплату навчання',
      kind: 'tuition',
      shortDescription: 'Покриття вартості навчання в Центрі Боско за навчальний модуль для мотивованих учнів.',
      description: 'Програма надає адресне фінансування витрат на здобуття фахової освіти. Пріоритет надається внутрішньо переміщеним особам та дітям захисників України з високим рівнем навчальних досягнень.',
      amount: 10000,
      amountNote: 'за модуль',
      category: 'vpo',
      badge: 'Пріоритетна',
      isActive: true,
      order: 1,
    },
    {
      name: 'Стипендія на проживання в колегіумі',
      kind: 'collegium',
      shortDescription: 'Повне або часткове покриття проживання у сучасному студентському колегіумі при Центрі.',
      description: 'Створена для учнів з інших областей та віддалених районів, які потребують комфортного і безпечного середовища для проживання, навчання та духовного зростання у спільноті.',
      amount: 4000,
      amountNote: 'щомісяця',
      category: 'collegium_residents',
      badge: 'Для мешканців',
      isActive: true,
      order: 2,
    },
    {
      name: 'Харчування в кафе «Мама Маргарита»',
      kind: 'cafe',
      shortDescription: 'Щоденний комплексний збалансований обід у затишному кафе навчального центру.',
      description: 'Забезпечує повноцінне гаряче харчування учнів щодня протягом навчального року. Фінансується благодійними партнерами та фондом св. Івана Боско.',
      amount: 200,
      amountNote: 'щодня',
      category: 'all',
      badge: 'Гарячий обід',
      isActive: true,
      order: 3,
    },
    {
      name: 'Соціальна підтримка учнів у скруті',
      kind: 'social',
      shortDescription: 'Матеріальна допомога учням із багатодітних родин та сиротам.',
      description: 'Допомога на придбання спеціального робочого одягу, професійного інструменту для майстерень та навчальних матеріалів.',
      amount: 3500,
      amountNote: 'щомісяця',
      category: 'low_income',
      badge: 'Соціальна',
      isActive: true,
      order: 4,
    },
    {
      name: 'Іменна академічна відзнака св. Івана Боско',
      kind: 'merit',
      shortDescription: 'Заохочувальна премія за найвищі навчальні бали та волонтерське лідерство.',
      description: 'Призначається учням, які демонструють зразкову поведінку, активну участь у салезіанських молодіжних проєктах та високі результати на фахових конкурсах.',
      amount: 5000,
      amountNote: 'на семестр',
      category: 'high_achievers',
      badge: 'Лідерство',
      isActive: true,
      order: 5,
    },
  ]

  const createdPrograms: Record<string, any> = {}
  for (const prog of programsData) {
    const found = await payload.find({
      collection: 'scholarship-programs',
      where: { kind: { equals: prog.kind } },
      limit: 1,
    })
    createdPrograms[prog.kind] = found.docs[0] ?? (await payload.create({
      collection: 'scholarship-programs',
      data: prog as any,
    }))
  }
  payload.logger.info('Стипендіальні програми перевірено/створено.')

  // 3. Створення контрольних заявок 2026–2027 н.р.
  const sampleApplications = [
    {
      fullName: 'Шульган Вероніка Олександрівна',
      group: 'IT-12',
      email: 'shulhan.veronika@bosco.local',
      phone: '+38 (098) 111-22-33',
      program: createdPrograms['tuition'].id,
      academicYear: '2026/2027',
      motivation: 'Навчаюся на 2 курсі веб-розробки. Мрію створювати корисні цифрові сервіси для освітніх закладів. Стипендія дозволить мені повністю сфокусуватися на практичних проєктах та успішно завершити дипломну роботу.',
      status: 'approved',
      reviewNote: 'Високий академічний рейтинг, активна участь у студентських заходах закладу. Схвалено комісією.',
      reviewedAt: new Date('2026-10-15T10:00:00Z').toISOString(),
    },
    {
      fullName: 'Федаш Тереза Михайлівна',
      group: 'IT-11',
      email: 'fedash.tereza@bosco.local',
      phone: '+38 (097) 222-33-44',
      program: createdPrograms['collegium'].id,
      academicYear: '2026/2027',
      motivation: 'Приїхала на навчання з іншої області. Проживання в колегіумі Боско забезпечує відмінну дружню атмосферу та доступ до навчальних майстерень у вечірній час.',
      status: 'approved',
      reviewNote: 'Документи відповідають критеріям мешканців колегіуму. Затверджено.',
      reviewedAt: new Date('2026-10-16T11:30:00Z').toISOString(),
    },
    {
      fullName: 'Ковальчук Богдан Ігорович',
      group: 'A-11',
      email: 'kovalchuk.bohdan@bosco.local',
      phone: '+38 (063) 333-44-55',
      program: createdPrograms['cafe'].id,
      academicYear: '2026/2027',
      motivation: 'Учень першого курсу з обслуговування автотранспорту. Комплексний обід у кафе «Мама Маргарита» дуже допоможе мені під час тривалих практичних змін у майстернях.',
      status: 'pending',
      reviewNote: '',
    },
  ]

  for (const app of sampleApplications) {
    const existing = await payload.find({
      collection: 'applications',
      where: {
        and: [
          { email: { equals: app.email } },
          { academicYear: { equals: app.academicYear } },
        ],
      },
      limit: 1,
    })
    if (!existing.docs.length) {
      await payload.create({
        collection: 'applications',
        data: app as any,
      })
    }
  }
  payload.logger.info('Контрольні заявки 2026-2027 створено.')

  // 4. Оновлення Globals: Header & Footer
  await payload.updateGlobal({
    slug: 'header',
    data: {
      siteTitle: 'Центр професійної освіти Боско',
      siteSubtitle: 'Стипендіальний портал 2026–2027',
      logoUrl: '/logo.png',
      navItems: [
        { label: 'Головна', url: '#hero' },
        { label: 'Програми', url: '#programs' },
        { label: 'Про Центр', url: '#about' },
        { label: 'Критерії', url: '#benefits' },
      ],
      ctaButton: {
        text: 'Перейти на основний сайт',
        link: MAIN_SITE_URL,
      },
    },
  })

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      aboutText: 'Центр професійної освіти св. Івана Боско — заклад освіти нового типу у Львові. Ми навчаємо сучасних робітничих професій, формуємо християнські цінності та підтримуємо кожного учня.',
      contacts: {
        address: '79014, м. Львів, вул. Дорога Кривчицька, 19д',
        phone: '+38 (032) 223-08-33',
        email: 'scholarship@boscocenter.lviv.ua',
        workingHours: 'Пн–Пт: 09:00 – 17:00',
      },
      quickLinks: [
        { label: 'Офіційний сайт Центру Боско', url: 'https://boscocenter.lviv.ua' },
        { label: 'Колегіум для молоді', url: '#about' },
        { label: 'Кафе «Мама Маргарита»', url: '#programs' },
        { label: 'Контакти приймальної комісії', url: '#apply' },
      ],
      socialLinks: [
        { platform: 'Facebook', url: 'https://www.facebook.com/share/1C7upk7e3P/?mibextid=wwXIfr' },
        { platform: 'Instagram', url: 'https://www.instagram.com/mnc_bosco?dlrf=aGgxa3J0dDVrYWl2' },
        { platform: 'TikTok', url: 'https://www.tiktok.com/@bosco.center?_r=1&_t=ZS-9ApDO7d4SVa' },
      ],
      copyright: '© 2026 Центр професійної освіти св. Івана Боско. Всі права захищено.',
    },
  })
  payload.logger.info('Глобальні налаштування Header/Footer оновлено.')

  // 5. Створення головної сторінки з блоками
  const existingPage = await payload.find({
    collection: 'pages',
    where: { path: { equals: '/' } },
    limit: 1,
  })

  const pageLayout = [
    {
      blockType: 'hero',
      badge: 'Набір заявок на 2026–2027 навчальний рік відкритий',
      title: 'Система управління стипендіальними програмами учнів Центру професійної освіти Боско',
      subtitle: 'Офіційний портал підтримки учнів Центру Боско: прозорий відбір, електронне подання мотиваційних листів та пряма допомога в оплаті навчання, проживання і харчування.',
      primaryCtaText: 'Перейти на основний сайт',
      primaryCtaLink: MAIN_SITE_URL,
      secondaryCtaText: 'Переглянути програми',
      secondaryCtaLink: '#programs',
      stats: [
        { value: '10 000 ₴', label: 'Максимальний розмір стипендії за модуль' },
        { value: '120+', label: 'Стипендіатів минулого навчального року' },
        { value: '5 напрямів', label: 'Підтримки для учнів різних спеціальностей' },
      ],
    },
    {
      blockType: 'programs',
      badge: 'Фінансова підтримка молоді',
      title: 'Доступні стипендіальні програми',
      description: 'Ознайомтеся з актуальними видами стипендій Центру Боско на 2026–2027 навчальний рік. Кожна програма спрямована на конкретну потребу учня.',
      showOnlyActive: true,
    },
    {
      blockType: 'about',
      badge: 'Про наш заклад',
      title: 'Центр професійної освіти св. Івана Боско',
      leadText: 'Ми створюємо умови, де кожен юнак і кожна дівчина можуть розкрити свій професійний потенціал, опанувати сучасну затребувану спеціальність та знайти своє покликання у житті.',
      features: [
        {
          title: 'Сучасні навчальні майстерні',
          description: 'Практичні лабораторії веб-розробки, комп’ютерної діагностики автотранспорту, кулінарного та перукарського мистецтва, оснащені європейським обладнанням.',
          icon: 'tool',
        },
        {
          title: 'Педагогіка доброти Дона Боско',
          description: 'Виховна система, заснована на розумі, релігії та доброзичливості, де викладач є другом, наставником і підтримкою для кожного учня.',
          icon: 'heart',
        },
        {
          title: 'Комфортний студентський колегіум',
          description: 'Безпечний та затишний простір для проживання іногородніх студентів поруч із навчальними корпусами та спортивним комплексом.',
          icon: 'home',
        },
        {
          title: 'Власне кафе «Мама Маргарита»',
          description: 'Якісне щоденне харчування для учнів закладу, приготоване з турботою та дотриманням найвищих стандартів якості.',
          icon: 'coffee',
        },
      ],
    },
    {
      blockType: 'benefits',
      badge: 'Чому це важливо',
      title: 'Критерії відбору та переваги системи',
      description: 'Наша стипендіальна система орієнтована на справедливість, рівність можливостей та адресну допомогу тим, хто цього найбільше потребує.',
      items: [
        {
          stepNumber: '01',
          title: 'Прозорий електронний конкурс',
          description: 'Всі заявки реєструються в цифровій базі Neon PostgreSQL та оцінюються комісією за чіткими фіксованими критеріями.',
        },
        {
          stepNumber: '02',
          title: 'Пріоритет для пільгових категорій',
          description: 'Особлива увага приділяється внутрішньо переміщеним особам, дітям військовослужбовців та учням із малозабезпечених сімей.',
        },
        {
          stepNumber: '03',
          title: 'Комплексна підтримка',
          description: 'Можливість отримувати як стипендію на навчання, так і допомогу на колегіум або безкоштовні щоденні обіди.',
        },
        {
          stepNumber: '04',
          title: 'Швидке сповіщення про результат',
          description: 'Рішення комісії оперативно фіксується в системі та надсилається на контактну пошту учня.',
        },
      ],
    },
    {
      blockType: 'apply-form',
      badge: 'Онлайн реєстрація',
      title: 'Подати заявку на стипендію 2026–2027',
      description: 'Заповніть форму нижче, оберіть вашу академічну групу та програму стипендії, а також напишіть мотиваційний лист, у якому опишіть свої досягнення та потребу в отриманні допомоги.',
      deadlineNotice: 'Термін прийому заявок: до 24 грудня 2026 року',
      supportContact: 'З питаннями звертайтеся: scholarship@boscocenter.lviv.ua | +38 (032) 223-08-33',
    },
    {
      blockType: 'cta',
      badge: 'Основний сайт',
      title: 'Вже подали заявку? Переходьте на основний сайт',
      points: [
        { text: 'Подайте заявку на одну чи кілька стипендій онлайн' },
        { text: 'Стежте за статусом розгляду в особистому кабінеті' },
        { text: 'Дізнайтеся результати та перегляньте список стипендіатів' },
      ],
      buttonText: 'Перейти на основний сайт',
      buttonLink: MAIN_SITE_URL,
    },
  ]

  if (existingPage.docs.length > 0) {
    await payload.update({
      collection: 'pages',
      id: existingPage.docs[0].id,
      data: {
        title: 'Головна сторінка — Стипендії Центру Боско',
        path: '/',
        metaDescription: 'Офіційний портал подання заявок на стипендії Центру професійної освіти св. Івана Боско у Львові на 2026-2027 навчальний рік.',
        layout: pageLayout as any,
      },
    })
    payload.logger.info('Головну сторінку оновлено.')
  } else {
    await payload.create({
      collection: 'pages',
      data: {
        title: 'Головна сторінка — Стипендії Центру Боско',
        path: '/',
        metaDescription: 'Офіційний портал подання заявок на стипендії Центру професійної освіти св. Івана Боско у Львові на 2026-2027 навчальний рік.',
        layout: pageLayout as any,
      },
    })
    payload.logger.info('Головну сторінку створено успішно.')
  }

  payload.logger.info('Ініціалізація успішно завершена!')
  payload.logger.info('Адміністратор: admin@bosco.local / admin12345')
  payload.logger.info('Модератор: editor@bosco.local / editor12345')
  payload.logger.info(`Учні: shulhan.veronika@bosco.local / ${STUDENT_PASSWORD}`)
  process.exit(0)
}

// Top-level await: `payload run` викликає process.exit(0) одразу після імпорту файлу,
// тому без await seed() обривався б до першого запиту до бази.
try {
  await seed()
} catch (err) {
  console.error('Помилка під час ініціалізації бази даних:', err)
  process.exit(1)
}
