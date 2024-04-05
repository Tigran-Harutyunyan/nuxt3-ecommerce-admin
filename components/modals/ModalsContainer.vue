<script setup lang="ts">
import { useModals } from "@/store/modals";

const { type } = storeToRefs(useModals());

import StoreModal from "@/components/modals/StoreModal.vue";

const computedComponent = computed(() => {
  if (type.value !== null) {
    switch (type.value) {
      case "store":
        return StoreModal;
    }
  }

  return null;
});
</script>

<template>
  <component :is="computedComponent" />
</template>
