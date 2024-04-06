import prismadb from '@/lib/prismadb';

export default defineEventHandler(async (event) => {
  const { auth } = event.context;
  const { name } = await readBody(event);

  if (!auth.userId) {
    setResponseStatus(event, 403)
    return ''
  }

  if (!name) {
    return createError({
      status: 400,
      statusMessage: 'Name is required'
    });
  }

  try {

    const store = await prismadb.store.create({
      data: {
        name,
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
