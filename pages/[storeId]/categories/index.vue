<script setup lang="ts">
import { format } from "date-fns";
import { useMain } from "@/store/main";
import CategoriesClient from "@/components/categories/Client.vue";
import type { CategoryColumn } from "@/types";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const { entityUpdateTrigger } = storeToRefs(useMain());

const storeId = useRoute().params.storeId;

const {
  data: categories,
  refresh,
  pending,
} = await useAsyncData("categories", () =>
  $fetch(`/api/store/${storeId}/categories`)
);

const formattedCategories = computed<CategoryColumn[]>(() => {
  if (!categories.value) return [];
  return categories.value.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
});

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
      <CategoriesClient :data="formattedCategories" v-else />
    </div>
  </div>
</template>
