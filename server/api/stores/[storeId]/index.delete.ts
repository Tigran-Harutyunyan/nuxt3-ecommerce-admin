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

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId: auth.userId
            }
        });

        return store;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
