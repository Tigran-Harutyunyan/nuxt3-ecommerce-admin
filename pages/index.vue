<script setup lang="ts">
import { useClerkProvide } from "vue-clerk";

definePageMeta({
  middleware: "auth",
});

const { derivedState } = useClerkProvide();

if (!derivedState.value.userId) {
  navigateTo("/sign-in");
}

const { data: store, pending } = await useFetch("/api/store");

watch(
  () => pending.value,
  () => {
    if (pending.value) return;
    if (store.value) {
      navigateTo(`/${store.value?.id}`);
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <NuxtLayout name="home">
    <div class="flex items-center justify-center h-screen">
      <Loader v-if="pending" />
      <div
        v-if="!pending && !store"
        class="flex flex-col max-w-[500px] mx-auto my-auto"
      >
        <h1
          class="text-lg text-foreground font-semibold leading-none tracking-tight"
        >
          Create store
        </h1>
        <p class="text-muted-foreground text-sm mt-2 mb-2">
          Add a new store to manage products and categories.
        </p>
        <CreateStoreForm :showCancel="false" />
      </div>
    </div>
  </NuxtLayout>
</template>
