import { defineStore } from "pinia";

export const useMain = defineStore("main", () => {
  const entityUpdateTrigger = ref(0);

  const setEntityTrigger = () => {
    entityUpdateTrigger.value++;
  }

  return {
    entityUpdateTrigger,
    setEntityTrigger
  };
});
