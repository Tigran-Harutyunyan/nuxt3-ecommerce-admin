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

    if (!params?.colorId) {
        return createError({
            status: 400,
            statusMessage: 'Color ID is required'
        });
    }

    try {
        const color = await prismadb.color.findUnique({
            where: {
                id: params.colorId
            }
        });

        return color;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
