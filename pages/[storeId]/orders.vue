<script setup lang="ts">
import OrderClient from "@/components/orders/Client.vue";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const storeId = useRoute().params.storeId;

const { data: orders } = await useAsyncData(
  "orders",
  () => $fetch(`/api/store/${storeId}/orders`),
  {
    transform: (orders) => {
      if (orders === null) return [];
      return orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        products: item.orderItems
          .map((orderItem) => orderItem.product.name)
          .join(", "),
        totalPrice: formatter.format(
          item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price);
          }, 0)
        ),
        isPaid: item.isPaid ? "yes" : "no",
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
      }));
    },
  }
);
</script>

<template>
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <OrderClient :data="orders" />
    </div>
  </div>
</template>
