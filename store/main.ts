import { defineStore } from "pinia";

export const useMain = defineStore("main", () => {
  const entityUpdateTrigger = ref(0);
  const storeUpdateTrigger = ref(0);

  const updateEntityTrigger = () => {
    entityUpdateTrigger.value++;
  }

  const updateStoreTrigger = () => {
    storeUpdateTrigger.value++;
  }

  return {
    entityUpdateTrigger,
    storeUpdateTrigger,
    updateEntityTrigger,
    updateStoreTrigger
  };
});
