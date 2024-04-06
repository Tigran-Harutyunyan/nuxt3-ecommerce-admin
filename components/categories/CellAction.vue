<script setup lang="ts">
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AlertModal from "@/components/modals/AlertModal.vue";
import { toast } from "vue-sonner";
import { useModals } from "@/store/modals";
import { useMain } from "@/store/main";

import type { CategoryColumn } from "@/types";

interface CellActionProps {
  data: CategoryColumn;
}

const { data } = defineProps<CellActionProps>();

const route = useRoute();
const loading = ref(false);
const { type, isOpen } = storeToRefs(useModals());

const { onClose, onOpen } = useModals();

const { updateEntityTrigger } = useMain();

const isModalOpen = computed(() => {
  return isOpen.value && type.value === "alert";
});

const onConfirm = async () => {
  try {
    loading.value = true;
    const response = await $fetch(
      `/api/store/${route.params.storeId}/categories/${data.id}`,
      {
        method: "delete",
      }
    );

    if (response?.id) {
      updateEntityTrigger();
      toast.success("Category deleted.");
    }
  } catch (error) {
    toast.error(
      "Make sure you removed all products using this category first."
    );
  } finally {
    onClose();
    loading.value = false;
  }
};

const onCopy = (id: string) => {
  navigator.clipboard.writeText(id);
  toast.success("Category ID copied to clipboard.");
};
</script>

<template>
  <AlertModal
    :isOpen="isModalOpen"
    :loading="loading"
    @close="onClose()"
    @confirm="onConfirm"
  />
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="h-8 w-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="onCopy(data.id)">
        <Copy class="mr-2 h-4 w-4" /> Copy Id
      </DropdownMenuItem>
      <DropdownMenuItem
        @click="navigateTo(`/${route.params.storeId}/categories/${data.id}`)"
      >
        <Edit class="mr-2 h-4 w-4" /> Update
      </DropdownMenuItem>
      <DropdownMenuItem @click="onOpen('alert')">
        <Trash class="mr-2 h-4 w-4" /> Delete
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
