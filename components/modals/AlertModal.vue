<script setup lang="ts">
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/Modal.vue";

interface AlertModalProps {
  loading: boolean;
  isOpen: boolean;
}
const { loading, isOpen } = defineProps<AlertModalProps>();

const emit = defineEmits(["confirm", "close"]);
</script>

<template>
  <Modal
    title="Are you sure?"
    description="This action cannot be undone."
    :isOpen="isOpen"
    @close="emit('close')"
  >
    <div class="pt-6 space-x-2 flex items-center justify-end w-full">
      <Button :disabled="loading" variant="outline" @click="emit('close')">
        Cancel
      </Button>
      <Button :disabled="loading" variant="destructive" @click="emit('confirm')"
        >Continue
      </Button>
    </div>
  </Modal>
</template>
