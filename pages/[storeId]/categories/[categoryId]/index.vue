<script setup lang="ts">
import CategoryForm from "@/components/categories/CategoryForm.vue";
import type { Category, Billboard } from "@prisma/client";

definePageMeta({
  layout: "dashboard",
});

const params = useRoute().params;

const { data: category } = await useAsyncData<Category>("category", () =>
  $fetch(`/api/store/${params.storeId}/categories/${params.categoryId}`)
);

const { data: billboards } = await useAsyncData<Billboard[]>("billboards", () =>
  $fetch(`/api/store/${params.storeId}/billboards`)
);
</script>

<template>
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <CategoryForm
        :initialValues="category"
        :billboards="billboards"
        v-if="category"
      />
    </div>
  </div>
</template>
