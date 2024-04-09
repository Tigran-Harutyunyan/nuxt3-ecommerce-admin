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

    try {
        const paidOrders = await prismadb.order.findMany({
            where: {
                storeId: params?.storeId,
                isPaid: true
            },
            include: {
                orderItems: {
                    include: {
                        product: true
                    }
                }
            }
        });

        const totalRevenue = paidOrders.reduce((total, order) => {
            const orderTotal = order.orderItems.reduce((orderSum, item) => {
                return orderSum + item.product.price.toNumber();
            }, 0);
            return total + orderTotal;
        }, 0);

        return totalRevenue;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
