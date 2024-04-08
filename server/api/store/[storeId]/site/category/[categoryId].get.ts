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
        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId
            },
            include: {
                billboard: true
            }
        });

        return category;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});