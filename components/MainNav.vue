<script setup lang="ts">
import { cn } from "@/lib/utils";

const { className } = defineProps<{
  className: string;
}>();

const pathname = computed(() => {
  return useRoute().path;
});

const storeId = computed(() => {
  return useRoute().params.storeId;
});

const routes = computed(() => {
  return [
    {
      href: `/${storeId.value}`,
      label: "Overview",
      active: pathname.value === `/${storeId.value}`,
    },
    {
      href: `/${storeId.value}/billboards`,
      label: "Billboards",
      active: pathname.value === `/${storeId.value}/billboards`,
    },
    {
      href: `/${storeId.value}/categories`,
      label: "Categories",
      active: pathname.value === `/${storeId.value}/categories`,
    },
    {
      href: `/${storeId.value}/sizes`,
      label: "Sizes",
      active: pathname.value === `/${storeId.value}/sizes`,
    },
    {
      href: `/${storeId.value}/colors`,
      label: "Colors",
      active: pathname.value === `/${storeId.value}/colors`,
    },
    {
      href: `/${storeId.value}/products`,
      label: "Products",
      active: pathname.value === `/${storeId.value}/products`,
    },
    {
      href: `/${storeId.value}/orders`,
      label: "Orders",
      active: pathname.value === `/${storeId.value}/orders`,
    },
    {
      href: `/${storeId.value}/settings`,
      label: "Settings",
      active: pathname.value === `/${storeId.value}/settings`,
    },
  ];
});
</script>

<template>
  <nav :class="cn('flex items-center space-x-4 lg:space-x-6', className)">
    <NuxtLink
      v-for="route in routes"
      :key="route.href"
      :to="route.href"
      :class="
        cn(
          'text-sm font-medium transition-colors hover:text-primary',
          route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
        )
      "
    >
      {{ route.label }}
    </NuxtLink>
  </nav>
</template>
