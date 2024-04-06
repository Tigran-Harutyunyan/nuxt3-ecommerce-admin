<script setup lang="ts">
import SizeForm from "@/components/sizes/SizeForm.vue";
import type { Size } from "@prisma/client";

definePageMeta({
  layout: "dashboard",
});

const params = useRoute().params;

const { data: size } = await useAsyncData<Size>("size", () =>
  $fetch(`/api/store/${params.storeId}/sizes/${params.sizeId}`)
);
</script>

<template>
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <SizeForm :initialValues="size" v-if="size" />
    </div>
  </div>
</template>
