import { clerkClient } from 'h3-clerk'
import prismadb from '@/lib/prismadb';

export default defineEventHandler(async (event) => {
    const { auth } =  event.context;
    const params = await event.context.params
    const { name, billboardId} = await readBody(event);

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

    if (!name) {
         return  createError({
            status: 400,
            statusMessage: 'Name is required'
        });
    } 
 
    if (!billboardId) {
        return  createError({
            status: 400,
            statusMessage: 'Billboard ID is required'
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
            return  createError({
                status: 405,
                statusMessage: 'Unauthorized'
            });
           }
      
           const category = await prismadb.category.update({
                where: {
                    id: params.categoryId,
                },
                data: {
                    name,
                    billboardId
                }
            });

            return category;
    } catch (error) {
        return {
            error: error?.message
        }
    }
});
