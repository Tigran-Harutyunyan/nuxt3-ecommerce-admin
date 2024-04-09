<script setup lang="ts">
import ProductForm from "@/components/products/ProductForm.vue";
import { useProduct } from "@/composables/useProduct";

const { sizes, colors, categories } = useProduct();

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>

<template>
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <ProductForm
        :colors="colors"
        :sizes="sizes"
        :categories="categories"
        :initialValues="null"
      />
    </div>
  </div>
</template>
