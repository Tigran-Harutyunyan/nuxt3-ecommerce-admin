<script setup lang="ts">
import { SignUp } from "vue-clerk";

definePageMeta({ middleware: "public" });
</script>

<template>
  <NuxtLayout name="auth">
    <div class="grid h-full place-items-center">
      <SignUp
        sign-in-url="/sign-in"
        :appearance="{
          variables: {
            colorBackground: '#19191A',
            colorInputBackground: '#19191A',
            colorAlphaShade: 'white',
            colorText: 'white',
            colorInputText: 'white',
            colorShimmer: 'rgba(255,255,255,0.36)',
            shadowShimmer: '1px 1px 2px rgba(0,0,0,0.36)',
          },
          elements: {
            providerIcon__apple: { filter: 'invert(1)' },
            providerIcon__github: { filter: 'invert(1)' },
            activeDeviceIcon: {
              '--cl-chassis-bottom': '#d2d2d2',
              '--cl-chassis-back': '#e6e6e6',
              '--cl-chassis-screen': '#e6e6e6',
              '--cl-screen': '#111111',
            },
          },
        }"
      />
    </div>
  </NuxtLayout>
</template>
