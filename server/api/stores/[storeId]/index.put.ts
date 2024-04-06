import prismadb from '@/lib/prismadb';

export default defineEventHandler(async (event) => {
    const { auth } = event.context;
    const params = await event.context.params;
    const { name } = await readBody(event);

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

    if (!name) {
        return createError({
            status: 400,
            statusMessage: 'Name is required'
        });
    }

    try {

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId: auth.userId,
            },
            data: {
                name
            }
        });

        return store;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
