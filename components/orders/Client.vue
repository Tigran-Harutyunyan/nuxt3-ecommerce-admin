<script setup lang="ts">
import { Separator } from "@/components/ui/separator";
import type { OrderColumn } from "@/types";
import { type ColumnDef } from "@tanstack/vue-table";

interface OrderClientProps {
  data: OrderColumn[];
}

const { data } = defineProps<OrderClientProps>();
const query = useRoute();

const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "products",
    header: "Products",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
];
</script>

<template>
  <Heading
    :title="`Orders (${data?.length})`"
    description="Manage orders for your store"
  />

  <Separator />
  <DataTable searchKey="products" :columns="columns" :data="data" />
  <Separator />
</template>
