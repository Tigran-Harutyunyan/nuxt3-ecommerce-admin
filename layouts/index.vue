<script setup lang="ts">
const { data: store } = await useLazyAsyncData("store", () =>
  $fetch("/api/store")
);
debugger;
if (store) {
  navigateTo(`/${store.id}`);
}
</script>
<template>
  <slot />
</template>
