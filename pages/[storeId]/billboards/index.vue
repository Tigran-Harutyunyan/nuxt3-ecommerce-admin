<script setup lang="ts">
import { format } from "date-fns";
definePageMeta({
  layout: "dashboard",
});

import { useMain } from "@/store/main";
import BillboardClient from "@/components/billboards/Client.vue";
import type { BillboardColumn } from "@/types";

const { entityUpdateTrigger } = storeToRefs(useMain());

const storeId = useRoute().params.storeId;

const {
  data: billboards,
  refresh,
  pending,
} = await useAsyncData("billboards", () =>
  $fetch(`/api/store/${storeId}/billboards`)
);

const formattedBillboards = computed<BillboardColumn[]>(() => {
  if (!billboards.value) return [];
  return billboards.value.map((item) => ({
    id: item.id,
    label: item.label,
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
      <BillboardClient :data="formattedBillboards" v-else />
    </div>
  </div>
</template>
