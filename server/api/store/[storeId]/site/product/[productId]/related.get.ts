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
        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId
            },
        });

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId: product?.categoryId,
                NOT: {
                    id: params.productId
                },
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
            },

            orderBy: {
                createdAt: 'desc',
            }
        });

        return products;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
