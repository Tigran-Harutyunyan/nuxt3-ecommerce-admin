<script setup lang="ts">
import { useColorMode } from "@vueuse/core";

const mode = useColorMode({
  emitAuto: true,
  modes: {
    dark: "dark",
    light: "",
  },
});
</script>

<template>
  <div class="grid h-screen place-items-center">
    <slot></slot>
  </div>
</template>
