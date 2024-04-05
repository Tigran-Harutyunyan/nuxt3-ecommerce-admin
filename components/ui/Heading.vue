<script setup lang="ts">
interface HeadingProps {
  title: string;
  description: string;
}
const { title, description } = defineProps<HeadingProps>();
</script>

<template>
  <div>
    <h2 class="text-3xl font-bold tracking-tight">{{ title }}</h2>
    <p class="text-sm text-muted-foreground">
      {{ description }}
    </p>
  </div>
</template>
