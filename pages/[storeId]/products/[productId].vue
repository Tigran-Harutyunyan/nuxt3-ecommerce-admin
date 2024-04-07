<script setup lang="ts">
import ProductForm from "@/components/products/ProductForm.vue";
import { useProduct } from "@/composables/useProduct";
const { sizes, colors, categories } = useProduct();

definePageMeta({
  layout: "dashboard",
});

const params = useRoute().params;

const { data: product } = await useAsyncData("product", () =>
  $fetch(`/api/store/${params.storeId}/products/${params.productId}`)
);
</script>

<template>
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <ProductForm
        v-if="product"
        :colors="colors"
        :sizes="sizes"
        :categories="categories"
        :initialValues="product"
      />
    </div>
  </div>
</template>
