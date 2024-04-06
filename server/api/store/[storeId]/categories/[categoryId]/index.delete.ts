import { clerkClient } from 'h3-clerk'
import prismadb from '@/lib/prismadb';

export default defineEventHandler(async (event) => {
    const { auth } =  event.context;
    const params = await event.context.params; 

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

    if (!params.categoryId) {
        return  createError({
            status: 400,
            statusMessage: 'Category ID is required'
        });
    }

    try { 
        console.log('hello')
        const category = await prismadb.category.delete({
            where: {
              id: params.categoryId,
            }
          });

      return category;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
