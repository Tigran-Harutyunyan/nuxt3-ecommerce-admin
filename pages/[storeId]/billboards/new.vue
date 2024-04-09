<script setup lang="ts">
import BillboardForm from "@/components/billboards/BillboardForm.vue";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});
</script>

<template>
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <BillboardForm :initialValues="null" />
    </div>
  </div>
</template>
