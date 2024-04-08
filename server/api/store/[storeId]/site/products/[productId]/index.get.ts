import prismadb from '@/lib/prismadb';

export default defineEventHandler(async (event) => {

    const params = await event.context.params

    if (!params?.storeId) {
        return createError({
            status: 400,
            statusMessage: 'Store ID is required'
        });
    }

    if (!params?.productId) {
        return createError({
            status: 400,
            statusMessage: 'Product ID is required'
        });
    }

    try {
        const product = await prismadb.product.findUnique({
            where: {
                id: params.productId
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true,
            }
        });

        return product;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
