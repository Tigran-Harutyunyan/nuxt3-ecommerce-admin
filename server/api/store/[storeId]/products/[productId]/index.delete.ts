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

    if (!params?.productId) {
        return createError({
            status: 400,
            statusMessage: 'Product ID is required'
        });
    }

    try {

        const product = await prismadb.product.delete({
            where: {
                id: params.productId
            },
        });

        return product;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
