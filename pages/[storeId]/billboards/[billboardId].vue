<script setup lang="ts">
import BillboardForm from "@/components/billboards/BillboardForm.vue";
import type { Billboard } from "@prisma/client";

definePageMeta({
  layout: "dashboard",
});

const params = useRoute().params;

const { data: billboard } = await useAsyncData<Billboard | null>(
  "billboard",
  () => $fetch(`/api/store/${params.storeId}/billboards/${params.billboardId}`)
);
</script>

<template>
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <BillboardForm :initialValues="billboard" v-if="billboard" />
    </div>
  </div>
</template>
