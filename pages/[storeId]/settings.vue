<script setup lang="ts">
import SettingsForm from "@/components/settings/SettingsForm.vue";
import type { Store } from "@/types";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const route = useRoute();

const { data: store, pending } = await useLazyAsyncData<Store>("store", () =>
  $fetch(`/api/store/${route.params.storeId}`)
);

if (!store) {
  navigateTo("/");
}
</script>

<template>
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <SettingsForm :initialValues="store" v-if="!pending" />
    </div>
  </div>
</template>
