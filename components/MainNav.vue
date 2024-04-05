<script setup lang="ts">
import { cn } from "@/lib/utils";

const { className } = defineProps<{
  className: string;
}>();

const route = useRoute();

const pathname = computed(() => {
  return useRoute().path;
});

const storeId = route.params.storeId;

const routes = computed(() => {
  return [
    {
      href: `/${storeId}`,
      label: "Overview",
      active: pathname.value === `/${storeId}`,
    },
    {
      href: `/${storeId}/billboards`,
      label: "Billboards",
      active: pathname.value === `/${storeId}/billboards`,
    },
    {
      href: `/${storeId}/categories`,
      label: "Categories",
      active: pathname.value === `/${storeId}/categories`,
    },
    {
      href: `/${storeId}/sizes`,
      label: "Sizes",
      active: pathname.value === `/${storeId}/sizes`,
    },
    {
      href: `/${storeId}/colors`,
      label: "Colors",
      active: pathname.value === `/${storeId}/colors`,
    },
    {
      href: `/${storeId}/products`,
      label: "Products",
      active: pathname.value === `/${storeId}/products`,
    },
    {
      href: `/${storeId}/orders`,
      label: "Orders",
      active: pathname.value === `/${storeId}/orders`,
    },
    {
      href: `/${storeId}/settings`,
      label: "Settings",
      active: pathname.value === `/${storeId}/settings`,
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
