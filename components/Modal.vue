<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const emit = defineEmits(["close"]);

interface ModalProps {
  title: string;
  description: string;
  isOpen: boolean;
}

const { title, description, isOpen } = defineProps<ModalProps>();

const onChange = (open: boolean) => {
  if (!open) {
    emit("close");
  }
};
</script>

<template>
  <Dialog :open="isOpen" @update:open="onChange(false)">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription> {{ description }} </DialogDescription>
      </DialogHeader>
      <div><slot /></div>
    </DialogContent>
  </Dialog>
</template>
