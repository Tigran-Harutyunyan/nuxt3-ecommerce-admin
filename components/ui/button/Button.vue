<script setup lang="ts">
import type { VariantProps } from "class-variance-authority";
import { Primitive, type PrimitiveProps } from "radix-vue";
import { buttonVariants } from ".";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-vue-next";

interface ButtonVariantProps extends VariantProps<typeof buttonVariants> {}

interface Props extends PrimitiveProps {
  variant?: ButtonVariantProps["variant"];
  size?: ButtonVariantProps["size"];
  as?: string;
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: "default",
  size: "default",
  as: "button",
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
  >
    <Loader2 class="w-4 h-4 mr-2 animate-spin" v-if="loading" />

    <slot v-else />
  </Primitive>
</template>
