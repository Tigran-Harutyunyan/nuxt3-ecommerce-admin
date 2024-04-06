<script setup lang="ts">
import { useModals } from "@/store/modals";

const { type } = storeToRefs(useModals());

import StoreModal from "@/components/modals/StoreModal.vue";
import AlertModal from "@/components/modals/AlertModal.vue";

const computedComponent = computed(() => {
  if (type.value !== null) {
    switch (type.value) {
      case "store":
        return StoreModal;
      case "alert":
        return AlertModal;
    }
  }

  return null;
});
</script>

<template>
  <component :is="computedComponent" />
</template>
