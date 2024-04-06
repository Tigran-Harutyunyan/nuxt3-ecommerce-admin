<script setup lang="ts">
import { UserButton } from "vue-clerk";
import { useMain } from "@/store/main";
import type { Store } from "@prisma/client";

const { storeUpdateTrigger } = storeToRefs(useMain());

const { data: stores, refresh } = await useLazyAsyncData<Store[]>(
  "stores",
  () => $fetch("/api/stores")
);

watch(
  () => storeUpdateTrigger.value,
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
        :key="storeUpdateTrigger"
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
