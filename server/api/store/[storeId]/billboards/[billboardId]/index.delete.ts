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

    if (!params.billboardId) {
        return  createError({
            status: 400,
            statusMessage: 'Billboard ID is required'
        });
    }

    try { 
        
        const billboard = await prismadb.billboard.delete({
            where: {
              id: params.billboardId,
            }
        });

      return billboard;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
