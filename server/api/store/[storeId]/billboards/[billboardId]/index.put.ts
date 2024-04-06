import { clerkClient } from 'h3-clerk'
import prismadb from '@/lib/prismadb';

export default defineEventHandler(async (event) => {
    const { auth } =  event.context;
    const params = await event.context.params
    const { label, imageUrl} = await readBody(event);

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

    if (!label) {
         return  createError({
            status: 400,
            statusMessage: 'Label is required'
        });
    }
  
    if (!imageUrl) {
        return  createError({
            status: 400,
            statusMessage: 'Image URL is required'
        });
    }
  
    if (!params.billboardId) {
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
      
          const billboard = await prismadb.billboard.update({
            where: {
              id: params.billboardId,
            },
            data: {
              label,
              imageUrl
            }
          });
          return billboard
    } catch (error) {
        return {
            error: error?.message
        }
    }
});
