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
        const billboards = await prismadb.billboard.findMany({
            where: {
                storeId: params.storeId
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return Array.isArray(billboards) ? billboards : [billboards];

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
