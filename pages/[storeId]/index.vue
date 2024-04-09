<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});

import { CreditCard, DollarSign, Package } from "lucide-vue-next";

import { Separator } from "@/components/ui/separator";
import Overview from "@/components/dashboard/Overview.vue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { formatter } from "@/lib/utils";

const storeId = useRoute().params.storeId;

const { data: graphRevenue } = await useAsyncData("graphRevenue", () =>
  $fetch(`/api/store/${storeId}/dashboard/graph-revenue`)
);

const { data: salesCount } = await useAsyncData("salesCount", () =>
  $fetch(`/api/store/${storeId}/dashboard/sales-count`)
);

const { data: stockCount } = await useAsyncData("stockCount", () =>
  $fetch(`/api/store/${storeId}/dashboard/stock-count`)
);

const { data: totalRevenue } = await useAsyncData("totalRevenue", () =>
  $fetch(`/api/store/${storeId}/dashboard/total-revenue`)
);
</script>

<template>
  <NuxtPage />
  <div class="flex-col">
    <div class="flex-1 space-y-4 p-8 pt-6">
      <Heading title="Dashboard" description="Overview of your store" />
      <Separator />
      <div class="grid gap-4 grid-cols-3">
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium"> Total Revenue </CardTitle>
            <DollarSign class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              {{ formatter.format(totalRevenue) }}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium">Sales</CardTitle>
            <CreditCard class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">+{{ salesCount }}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader
            class="flex flex-row items-center justify-between space-y-0 pb-2"
          >
            <CardTitle class="text-sm font-medium">Products In Stock</CardTitle>
            <Package class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{ stockCount }}</div>
          </CardContent>
        </Card>
      </div>
      <Card class="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent class="pl-2">
          <Overview :data="graphRevenue" />
        </CardContent>
      </Card>
    </div>
  </div>
</template>
