<script setup lang="ts">
import { useClerkProvide } from "vue-clerk";
import { useModals } from "@/store/modals";

const { derivedState } = useClerkProvide();

const { onOpen } = useModals();

if (!derivedState.value.userId) {
  navigateTo("/sign-in");
}

const { data: store, pending } = await useLazyAsyncData("store", () =>
  $fetch("/api/store")
);

watch(
  () => pending.value,
  () => {
    if (pending.value) return;
    if (store.value) {
      navigateTo(`/${store.value?.id}`);
    } else {
      onOpen("store");
    }
  }
);
</script>

<template></template>
