
import prismadb from "@/lib/prismadb"
import Stripe from "stripe";
import { defineStripeWebhook } from '@fixers/nuxt-stripe/server';

/**
 * @param event - the H3 event
 * @param stipe - the Stripe instance
 * @param stripeEvent - the Stripe Webhook event
 */


const STRIPE_API_KEY = useRuntimeConfig().stripeKey as string;

const WEBHOOK_SECRET = useRuntimeConfig().stripeWebhookSecret

const stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: "2023-10-16"
});

const webhookOptions = {
  webhookSecret: WEBHOOK_SECRET,
  stripe,
}

export default defineStripeWebhook(async ({ event, stripeEvent }) => {

  if (!isMethod(event, ['POST'])) {
    setResponseStatus(event, 400)

    return { ok: false }
  }

  const session = stripeEvent.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(', ');

  switch (stripeEvent.type) {
    case 'checkout.session.completed': {

      const order = await prismadb.order.update({
        where: {
          id: session?.metadata?.orderId,
        },
        data: {
          isPaid: true,
          address: addressString,
          phone: session?.customer_details?.phone || '',
        },
        include: {
          orderItems: true,
        }
      });

      const productIds = order.orderItems.map((orderItem) => orderItem.productId);

      await prismadb.product.updateMany({
        where: {
          id: {
            in: [...productIds],
          },
        },
        data: {
          isArchived: true
        }
      });
    }
  }

  return {
    hello: 'world'
  }

}, webhookOptions); 