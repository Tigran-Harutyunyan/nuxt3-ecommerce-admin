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
        const sizes = await prismadb.size.findMany({
            where: {
                storeId: params.storeId
            }
        });

        return Array.isArray(sizes) ? sizes : [sizes];

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
