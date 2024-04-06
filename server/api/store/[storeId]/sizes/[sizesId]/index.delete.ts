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

    if (!params?.sizesId) {
        return createError({
            status: 400,
            statusMessage: 'Size ID is required'
        });
    }

    try {

        const size = await prismadb.size.delete({
            where: {
                id: params.sizesId
            }
        });

        return size;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
