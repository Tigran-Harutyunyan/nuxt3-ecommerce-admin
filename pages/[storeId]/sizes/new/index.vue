<script setup lang="ts">
import SizeForm from "@/components/sizes/SizeForm.vue";

definePageMeta({
  layout: "dashboard",
});
</script>

<template>
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <SizeForm :initialValues="null" />
    </div>
  </div>
</template>
