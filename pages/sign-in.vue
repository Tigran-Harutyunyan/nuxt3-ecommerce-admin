<script setup lang="ts">
import { SignIn } from "vue-clerk";

definePageMeta({ middleware: "public" });
</script>

<template>
  <div class="grid h-screen place-items-center">
    <SignIn sign-up-url="/sign-up" />
  </div>
</template>
