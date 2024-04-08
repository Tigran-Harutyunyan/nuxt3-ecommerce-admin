
import Stripe from "stripe";
import prismadb from '@/lib/prismadb';

const STRIPE_API_KEY = useRuntimeConfig().stripeKey as string;
const FRONTEND_STORE_URL = useRuntimeConfig().storeUrl as string;

const stripe = new Stripe(STRIPE_API_KEY, {
    apiVersion: "2023-10-16",
    typescript: true,
});

export default defineEventHandler(async (event) => {

    try {

        const { productIds } = await readBody(event);

        const params = await event.context.params;

        if (!params?.storeId) {
            return createError({
                status: 400,
                statusMessage: 'Store ID is required'
            });
        }

        if (!productIds || productIds.length === 0) {
            return createError({
                status: 400,
                statusMessage: 'Product ids are required'
            });
        }

        const products = await prismadb.product.findMany({
            where: {
                id: {
                    in: productIds
                }
            }
        });

        const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

        products.forEach((product) => {
            line_items.push({
                quantity: 1,
                price_data: {
                    currency: 'USD',
                    product_data: {
                        name: product.name,
                    },
                    unit_amount: product.price.toNumber() * 100
                }
            });
        });

        const order = await prismadb.order.create({
            data: {
                storeId: params.storeId,
                isPaid: false,
                orderItems: {
                    create: productIds.map((productId: string) => ({
                        product: {
                            connect: {
                                id: productId
                            }
                        }
                    }))
                }
            }
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            billing_address_collection: 'required',
            phone_number_collection: {
                enabled: true,
            },
            success_url: `${FRONTEND_STORE_URL}/cart?success=1`,
            cancel_url: `${FRONTEND_STORE_URL}/cart?canceled=1`,
            metadata: {
                orderId: order.id
            },
        });

        return { url: session.url }

    } catch (error) {
        console.log("[STRIPE]", error);
        createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});
