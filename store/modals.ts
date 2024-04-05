import { defineStore } from "pinia";
export type ModalType = "alert" | "store";

export const useModals = defineStore("modals", () => {
  const type = ref<ModalType | null>(null);
  const isOpen = ref(false); 

  function onOpen(id: string) {
    type.value = id;
    isOpen.value = true; 
  }

  function onClose() {
    isOpen.value = false;
  }

  return {
    isOpen,
    type, 
    onOpen,
    onClose,
  };
});

 