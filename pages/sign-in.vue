<script setup lang="ts">
import { SignIn } from "vue-clerk";

definePageMeta({ middleware: "public" });
</script>

<template>
  <NuxtLayout name="auth">
    <SignIn sign-up-url="/sign-up" />
  </NuxtLayout>
</template>
