import prismadb from '@/lib/prismadb';

export default defineEventHandler(async (event) => {
    const { auth } = event.context;
    const params = await event.context.params;

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
        const salesCount = await prismadb.order.count({
            where: {
                storeId: params?.storeId,
                isPaid: true
            },
        });

        return salesCount;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});