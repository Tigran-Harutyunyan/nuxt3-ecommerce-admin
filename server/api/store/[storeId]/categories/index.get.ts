import { clerkClient } from 'h3-clerk'
import prismadb from '@/lib/prismadb';

export default defineEventHandler(async (event) => {
    const { auth } =  event.context;
    const params = await event.context.params

    if (!auth.userId) {
        setResponseStatus(event, 403)
        return ''
    }

    if (!params.storeId) {
        return  createError({
            status: 400,
            statusMessage: 'Store ID is required'
        });
    } 

    try {
        const categories = await prismadb.category.findMany({
            where: {
              storeId: params.storeId
            }, 
            include: {
                billboard: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return Array.isArray(categories)  ? categories : [categories];

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
