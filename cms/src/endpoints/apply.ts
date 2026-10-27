import type { PayloadHandler } from 'payload'

const VALID_GROUPS = ['IT-11', 'IT-12', 'D-11', 'K-11', 'A-11', 'A-12', 'A-13', 'M-11']

export const submitApplicationHandler: PayloadHandler = async (req) => {
  try {
    const payload = req.payload
    const body = await (req as any).json().catch(() => null)

    if (!body) {
      return Response.json(
        { success: false, error: 'Тіло запиту має містити JSON з даними заявки' },
        { status: 400 }
      )
    }

    const { fullName, group, email, phone, program, motivation, academicYear = '2026/2027' } = body

    // 1. Валідація обов'язкових полів
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 5) {
      return Response.json(
        { success: false, field: 'fullName', error: 'Вкажіть повне ПІБ (не менше 5 символів)' },
        { status: 422 }
      )
    }

    if (!group || !VALID_GROUPS.includes(group)) {
      return Response.json(
        { success: false, field: 'group', error: 'Оберіть коректну навчальну групу зі списку' },
        { status: 422 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return Response.json(
        { success: false, field: 'email', error: 'Введіть коректну адресу електронної пошти' },
        { status: 422 }
      )
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 9) {
      return Response.json(
        { success: false, field: 'phone', error: 'Введіть контактний номер телефону' },
        { status: 422 }
      )
    }

    if (!program) {
      return Response.json(
        { success: false, field: 'program', error: 'Оберіть бажану стипендіальну програму' },
        { status: 422 }
      )
    }

    if (!motivation || typeof motivation !== 'string' || motivation.trim().length < 20) {
      return Response.json(
        { success: false, field: 'motivation', error: 'Мотиваційний лист повинен містити не менше 20 символів' },
        { status: 422 }
      )
    }

    // 2. Перевірка наявності програми
    let targetProgramId = program
    // Якщо передано назву виду програми (kind), знаходимо її id
    if (typeof program === 'string' && isNaN(Number(program)) && program.length < 20) {
      const foundProgram = await payload.find({
        collection: 'scholarship-programs',
        where: {
          kind: {
            equals: program,
          },
        },
        limit: 1,
      })
      if (foundProgram.docs.length > 0) {
        targetProgramId = foundProgram.docs[0].id
      }
    }

    // 3. Збереження заявки в базу даних
    const createdApp = await payload.create({
      collection: 'applications',
      data: {
        fullName: fullName.trim(),
        group,
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        program: targetProgramId,
        motivation: motivation.trim(),
        academicYear,
        status: 'pending',
      },
    })

    return Response.json(
      {
        success: true,
        message: 'Вашу заявку успішно зареєстровано та передано на розгляд стипендіальної комісії Центру Боско!',
        applicationId: createdApp.id,
      },
      { status: 201 }
    )
  } catch (error: any) {
    req.payload.logger.error(`Error in /api/apply endpoint: ${error.message}`)
    return Response.json(
      { success: false, error: 'Помилка при збереженні заявки в системі', details: error.message },
      { status: 500 }
    )
  }
}
