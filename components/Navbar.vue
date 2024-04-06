<script setup lang="ts">
import { UserButton } from "vue-clerk";
import { useMain } from "@/store/main";

const { storeUpdateCounter } = storeToRefs(useMain());

const {
  data: stores,
  refresh,
  pending,
} = await useLazyAsyncData("stores", () => $fetch("/api/stores"));

watch(
  () => storeUpdateCounter.value,
  () => {
    refresh();
  }
);
</script>

<template>
  <div class="border-b">
    <div class="flex h-16 items-center px-4">
      <StoreSwitcher
        :items="stores"
        :key="storeUpdateCounter"
        v-if="stores && Array.isArray(stores)"
      />
      <MainNav className="mx-6" />
      <div class="ml-auto flex items-center space-x-4">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  </div>
</template>
