import type { PayloadHandler } from 'payload'

export const getPageDataHandler: PayloadHandler = async (req) => {
  try {
    const payload = req.payload
    const url = new URL(req.url ?? '/', 'http://localhost')
    const requestedPath = url.searchParams.get('path') || '/'

    // Пошук сторінки за заданим шляхом
    let pageRes = await payload.find({
      collection: 'pages',
      where: {
        path: {
          equals: requestedPath,
        },
      },
      limit: 1,
      depth: 2,
    })

    // Якщо за специфічним шляхом не знайдено, пробуємо взяти головну сторінку
    if (!pageRes.docs.length && requestedPath !== '/') {
      pageRes = await payload.find({
        collection: 'pages',
        where: {
          path: {
            equals: '/',
          },
        },
        limit: 1,
        depth: 2,
      })
    }

    const page = pageRes.docs[0]

    if (!page) {
      return Response.json(
        {
          error: 'Сторінку не знайдено',
          requestedPath,
        },
        { status: 404 }
      )
    }

    // Підготовка та сплющення контентних блоків для фронтенду
    const rawBlocks = (page.layout as any[]) || []
    const transformedBlocks = await Promise.all(
      rawBlocks.map(async (block) => {
        const { blockType, id, ...rest } = block

        // Якщо це блок стипендіальних програм, автоматично підтягуємо актуальні дані з колекції
        if (blockType === 'programs') {
          const programsDocs = await payload.find({
            collection: 'scholarship-programs',
            where: {
              isActive: {
                equals: true,
              },
            },
            sort: 'order',
            limit: 20,
          })

          const formattedPrograms = programsDocs.docs.map((p) => ({
            id: p.id,
            name: p.name,
            kind: p.kind,
            shortDescription: p.shortDescription,
            description: p.description,
            amount: p.amount,
            amountNote: p.amountNote,
            category: p.category,
            badge: p.badge,
            isActive: p.isActive,
          }))

          return {
            id,
            type: 'programs',
            ...rest,
            programs: formattedPrograms,
          }
        }

        return {
          id,
          type: blockType,
          ...rest,
        }
      })
    )

    const responseData = {
      id: page.id,
      title: page.title,
      path: page.path,
      metaDescription: page.metaDescription,
      blocks: transformedBlocks,
    }

    return Response.json(responseData, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (error: any) {
    req.payload.logger.error(`Error in /api/page endpoint: ${error.message}`)
    return Response.json(
      { error: 'Помилка при отриманні вмісту сторінки', details: error.message },
      { status: 500 }
    )
  }
}
