<script setup lang="ts">
import { format } from "date-fns";

definePageMeta({
  layout: "dashboard",
});

import { useMain } from "@/store/main";
import ProductClient from "@/components/products/Client.vue";
import type { Product } from "@/types";
import { formatter } from "@/lib/utils";

const { entityUpdateTrigger } = storeToRefs(useMain());

const storeId = useRoute().params.storeId;

const {
  data: products,
  refresh,
  pending,
} = await useAsyncData<Product[]>(
  "products",
  () => $fetch(`/api/store/${storeId}/products`),
  {
    transform: (products) => {
      return products.map((item) => ({
        id: item.id,
        name: item.name,
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        price: formatter.format(Number(item.price)),
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
        isFeatured: item.isFeatured ? "Yes" : "No",
        isArchived: item.isArchived ? "Yes" : "No",
      }));
    },
  }
);

watch(
  () => entityUpdateTrigger.value,
  () => {
    refresh();
  }
);
</script>

<template>
  <NuxtPage />
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <div
        class="flex h-full w-full items-center justify-center"
        v-if="pending"
      >
        <Loader />
      </div>
      <ProductClient :data="products" v-else />
    </div>
  </div>
</template>
