import prismadb from '@/lib/prismadb';

export default defineEventHandler(async (event) => {

    const params = await event.context.params;

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
            }
        });

        return colors;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});