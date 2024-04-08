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
        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId,
                id: params.categoryId || undefined
            },
            include: {
                billboard: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });


        return categories;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
