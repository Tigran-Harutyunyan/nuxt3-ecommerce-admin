<script setup lang="ts">
import { format } from "date-fns";
import { useMain } from "@/store/main";
import SizesClient from "@/components/sizes/Client.vue";
import type { SizeColumn } from "@/types";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const { entityUpdateTrigger } = storeToRefs(useMain());

const storeId = useRoute().params.storeId;

const {
  data: sizes,
  refresh,
  pending,
} = await useAsyncData("sizes", () => $fetch(`/api/store/${storeId}/sizes`));

const formattedSizes = computed<SizeColumn[]>(() => {
  if (!sizes.value) return [];
  return sizes.value.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
});

watch(
  () => entityUpdateTrigger.value,
  () => {
    refresh();
  }
);
</script>

<template>
  <NuxtPage />
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <div
        class="flex h-full w-full items-center justify-center"
        v-if="pending"
      >
        <Loader />
      </div>
      <SizesClient :data="formattedSizes" v-else />
    </div>
  </div>
</template>
