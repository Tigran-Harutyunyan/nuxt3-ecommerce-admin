<script setup lang="ts">
import { useModals } from "@/store/modals";

const { type, isOpen } = storeToRefs(useModals());

const { onClose } = useModals();

const isModalOpen = computed(() => {
  return isOpen.value && type.value === "store";
});
</script>

<template>
  <Modal
    title="Create store"
    description="Add a new store to manage products and categories."
    :isOpen="isModalOpen"
    @close="onClose"
  >
    <CreateStoreForm @close="onClose" />
  </Modal>
</template>
