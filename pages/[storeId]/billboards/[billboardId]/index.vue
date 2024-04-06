<script setup lang="ts">
import BillboardForm from "@/components/billboards/BillboardForm.vue";

definePageMeta({
  layout: "dashboard",
});

const params = useRoute().params;

const { data: billboard } = await useAsyncData("billboard", () =>
  $fetch(`/api/store/${params.storeId}/billboards/${params.billboardId}`)
);
</script>

<template>
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <BillboardForm :initialValues="billboard" />
    </div>
  </div>
</template>
