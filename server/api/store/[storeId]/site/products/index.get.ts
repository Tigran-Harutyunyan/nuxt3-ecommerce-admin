import prismadb from '@/lib/prismadb';

export default defineEventHandler(async (event) => {

    const params = await event.context.params;
    const searchParams = await getQuery(event);

    const categoryId = searchParams.categoryId || undefined;
    const colorId = searchParams.colorId || undefined;
    const sizeId = searchParams.sizeId || undefined;
    const isFeatured = searchParams.isFeatured;


    if (!params?.storeId) {
        return createError({
            status: 400,
            statusMessage: 'Store ID is required'
        });
    }

    try {

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false,
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
