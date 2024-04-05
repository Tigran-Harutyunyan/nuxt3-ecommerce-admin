<script setup lang="ts">
import { useClerkProvide } from "vue-clerk";

const { derivedState } = useClerkProvide();

const route = useRoute();

if (!derivedState.value.userId) {
  navigateTo("/sign-in");
}

const { data: store } = await useLazyAsyncData("store", () =>
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
