<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ProductColumn } from "@/types";
import { type ColumnDef } from "@tanstack/vue-table";
import CellAction from "./CellAction.vue";
import Color from "@/components/colors/Color.vue";

interface ProductClientProps {
  data: ProductColumn[];
}

const { data } = defineProps<ProductClientProps>();
const query = useRoute();

const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => h(Color, { value: row.original.color }),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => h(CellAction, { data: row.original }),
  },
];
</script>

<template>
  <div class="flex items-center justify-between">
    <Heading
      :title="`Products (${data?.length})`"
      description="Manage products for your store"
    />
    <Button @click="navigateTo(`/${query.params.storeId}/products/new`)">
      <Plus class="mr-2 h-4 w-4" /> Add New
    </Button>
  </div>

  <Separator />

  <DataTable searchKey="name" :columns="columns" :data="data" />
  <Heading title="API" description="API Calls for Products" />

  <Separator />

  <ApiList entityName="products" entityIdName="productId" />
</template>
