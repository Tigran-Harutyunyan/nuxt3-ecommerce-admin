import prismadb from '@/lib/prismadb';

export default defineEventHandler(async (event) => {
    const { auth } = event.context;
    const params = await event.context.params
    const { name, value } = await readBody(event);

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

    if (!value) {
        return createError({
            status: 400,
            statusMessage: 'Value is required'
        });
    }

    if (!name) {
        return createError({
            status: 400,
            statusMessage: 'Name is required'
        });
    }

    try {
        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: auth.userId,
            }
        });

        if (!storeByUserId) {
            return createError({
                status: 405,
                statusMessage: 'Unauthorized'
            });
        }

        const size = await prismadb.size.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        });

        return size;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
