import { clerkClient } from 'h3-clerk'
import prismadb from '@/lib/prismadb';

export default defineEventHandler(async (event) => {
    const { auth } =  event.context;

    if (!auth.userId) {
        setResponseStatus(event, 403)
        return ''
    } 

    try {
        const store = await prismadb.store.findFirst({
            where: {
              userId: auth.userId,
            }
          });

          return store;

    } catch (error) {
        return {
            error: error?.message
        }
    }
});
