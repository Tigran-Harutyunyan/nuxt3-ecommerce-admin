<script setup lang="ts">
import { useClerkProvide } from "vue-clerk";
import { useModals } from "@/store/modals";

const { derivedState } = useClerkProvide();

const route = useRoute();

const { onOpen } = useModals();

if (!derivedState.value.userId) {
  navigateTo("/sign-in");
}

const { data: store, pending } = await useLazyAsyncData("store", () =>
  $fetch(`/api/store/${route.params.storeId}`)
);

if (!store) {
  navigateTo("/");
}
</script>

<template>
  <Navbar />
  <slot />
</template>
