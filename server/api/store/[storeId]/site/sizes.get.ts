import prismadb from '@/lib/prismadb';

export default defineEventHandler(async (event) => {
    const params = await event.context.params

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

        return sizes;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});