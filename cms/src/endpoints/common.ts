import type { PayloadHandler } from 'payload'

export const getCommonDataHandler: PayloadHandler = async (req) => {
  try {
    const payload = req.payload

    // Отримання глобальних конфігурацій Header та Footer
    const headerData = await payload.findGlobal({
      slug: 'header',
      depth: 1,
    })

    const footerData = await payload.findGlobal({
      slug: 'footer',
      depth: 1,
    })

    // Додаткова інформація про активний навчальний рік та кількість стипендій
    const activeProgramsCount = await payload.count({
      collection: 'scholarship-programs',
      where: {
        isActive: {
          equals: true,
        },
      },
    })

    const commonResponse = {
      academicYear: '2026/2027',
      header: {
        siteTitle: headerData.siteTitle || 'Центр професійної освіти Боско',
        siteSubtitle: headerData.siteSubtitle || 'Стипендіальний відділ',
        logoUrl: headerData.logoUrl || '/logo.png',
        navItems: headerData.navItems || [
          { label: 'Головна', url: '#hero' },
          { label: 'Програми стипендій', url: '#programs' },
          { label: 'Про Центр', url: '#about' },
          { label: 'Критерії', url: '#benefits' },
        ],
        ctaButton: headerData.ctaButton || {
          text: 'Перейти на основний сайт',
          link: process.env.MAIN_SITE_URL || 'https://mnzbosco.org.ua/',
        },
      },
      footer: {
        aboutText: footerData.aboutText || 'Центр професійної освіти св. Івана Боско — заклад сучасної фахової освіти.',
        contacts: footerData.contacts || {
          address: 'м. Львів, вул. Дорога Кривчицька, 19д',
          phone: '+38 (032) 223-08-33',
          email: 'scholarship@boscocenter.lviv.ua',
          workingHours: 'Пн–Пт: 09:00 – 17:00',
        },
        quickLinks: footerData.quickLinks || [
          { label: 'Офіційний сайт закладу', url: 'https://boscocenter.lviv.ua' },
          { label: 'Правила прийому 2026–2027', url: '#apply' },
          { label: 'Положення про стипендії', url: '#programs' },
        ],
        socialLinks: footerData.socialLinks || [
          { platform: 'Facebook', url: 'https://www.facebook.com/share/1C7upk7e3P/?mibextid=wwXIfr', icon: 'facebook' },
        { platform: 'Instagram', url: 'https://www.instagram.com/mnc_bosco?dlrf=aGgxa3J0dDVrYWl2', icon: 'instagram' },
        { platform: 'TikTok', url: 'https://www.tiktok.com/@bosco.center?_r=1&_t=ZS-9ApDO7d4SVa', icon: 'tiktok' },
        ],
        copyright: footerData.copyright || '© 2026 Центр професійної освіти св. Івана Боско. Всі права захищено.',
      },
      stats: {
        totalActivePrograms: activeProgramsCount.totalDocs,
      },
    }

    return Response.json(commonResponse, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (error: any) {
    req.payload.logger.error(`Error in /api/common endpoint: ${error.message}`)
    return Response.json(
      { error: 'Не вдалося завантажити глобальні налаштування сайту', details: error.message },
      { status: 500 }
    )
  }
}
