<script setup lang="ts">
import { Toaster } from "@/components/ui/sonner";
import ModalsContainer from "@/components/modals/ModalsContainer.vue";
import { ClerkLoaded } from "vue-clerk";
</script>
<template>
  <NuxtLoadingIndicator color="#4ade80" :height="6" />

  <ClerkLoaded>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Toaster />
    <ModalsContainer />
  </ClerkLoaded>
</template>
