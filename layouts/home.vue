<script setup lang="ts">
import { UserButton } from "vue-clerk";
</script>

<template>
  <div>
    <div class="border-b flex p-2">
      <div class="ml-auto flex items-center space-x-4">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
    <slot />
  </div>
</template>
