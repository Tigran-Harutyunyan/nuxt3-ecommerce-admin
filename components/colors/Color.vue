<script setup lang="ts">
const { value } = defineProps<{ value: string }>();
</script>

<template>
  <div class="flex items-center gap-x-2">
    <div
      class="h-6 w-6 rounded-full border flex-sh"
      :style="{ backgroundColor: value }"
    ></div>
    {{ value }}
  </div>
</template>
