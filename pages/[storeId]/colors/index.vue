<script setup lang="ts">
import { format } from "date-fns";
import { useMain } from "@/store/main";
import ColorClient from "@/components/colors/Client.vue";
import type { ColorColumn } from "@/types";

definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

const { entityUpdateTrigger } = storeToRefs(useMain());

const storeId = useRoute().params.storeId;

const {
  data: colors,
  refresh,
  pending,
} = await useAsyncData("colors", () => $fetch(`/api/store/${storeId}/colors`));

const formattedColors = computed<ColorColumn[]>(() => {
  if (!colors.value) return [];
  return colors.value.map((item) => ({
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
      <ColorClient :data="formattedColors" v-else />
    </div>
  </div>
</template>
