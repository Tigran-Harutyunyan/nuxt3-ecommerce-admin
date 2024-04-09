<script setup lang="ts">
import CategoryForm from "@/components/categories/CategoryForm.vue";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const route = useRoute();

const { data: billboards } = useAsyncData("billboards", () =>
  $fetch(`/api/store/${route.params.storeId}/billboards`)
);
</script>

<template>
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <CategoryForm :initialValues="null" :billboards="billboards" />
    </div>
  </div>
</template>
