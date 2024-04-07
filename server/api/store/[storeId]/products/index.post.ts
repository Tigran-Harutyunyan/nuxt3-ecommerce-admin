import prismadb from '@/lib/prismadb';

export default defineEventHandler(async (event) => {
    const { auth } = event.context;
    const params = await event.context.params
    const { name, images, price, categoryId, sizeId, colorId, isFeatured, isArchived } = await readBody(event);

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

    if (!images || !images.length) {
        return createError({
            status: 400,
            statusMessage: 'Image is required'
        });
    }

    if (!name) {
        return createError({
            status: 400,
            statusMessage: 'Name is required'
        });
    }

    if (!sizeId) {
        return createError({
            status: 400,
            statusMessage: 'Size id is required'
        });
    }

    if (!colorId) {
        return createError({
            status: 400,
            statusMessage: 'Color id is required'
        });
    }

    if (!categoryId) {
        return createError({
            status: 400,
            statusMessage: 'Category id is required'
        });
    }

    if (!price) {
        return createError({
            status: 400,
            statusMessage: 'Price is required'
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

        const product = await prismadb.product.create({
            data: {
                name,
                price,
                isFeatured,
                isArchived,
                categoryId,
                colorId,
                sizeId,
                storeId: params.storeId,
                images: {
                    createMany: {
                        data: [
                            ...images.map((image: { url: string }) => image),
                        ],
                    },
                },
            },
        });

        return product;
    } catch (error) {
        return {
            error: error?.message
        }
    }
});
