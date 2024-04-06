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
        const colors = await prismadb.color.findMany({
            where: {
                storeId: params.storeId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return Array.isArray(colors) ? colors : [colors];

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
