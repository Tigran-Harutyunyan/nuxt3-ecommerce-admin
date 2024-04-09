<script setup lang="ts">
import ColorForm from "@/components/colors/ColorForm.vue";
import type { Color } from "@prisma/client";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const params = useRoute().params;

const { data: color } = await useAsyncData<Color>("color", () =>
  $fetch(`/api/store/${params.storeId}/colors/${params.colorId}`)
);
</script>

<template>
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <ColorForm :initialValues="color" v-if="color" />
    </div>
  </div>
</template>
