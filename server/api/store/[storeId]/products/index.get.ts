import prismadb from '@/lib/prismadb';

export default defineEventHandler(async (event) => {
    const { auth } = event.context;
    const params = await event.context.params

    if (!auth.userId) {
        setResponseStatus(event, 403)
        return ''
    }

    if (!params?.storeId) {
        return createError({
            status: 400,
            statusMessage: 'Store ID is required'
        });
    }

    try {
        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId
            },
            include: {
                category: true,
                size: true,
                color: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return Array.isArray(products) ? products : [products];

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
