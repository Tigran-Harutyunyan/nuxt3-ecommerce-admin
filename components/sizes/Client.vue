<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { SizeColumn } from "@/types";
import { type ColumnDef } from "@tanstack/vue-table";
import CellAction from "./CellAction.vue";

interface SizeClientProps {
  data: SizeColumn[];
}

const { data } = defineProps<SizeClientProps>();
const query = useRoute();

const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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
      :title="`Sizes (${data?.length})`"
      description="Manage sizes for your store"
    />
    <Button @click="navigateTo(`/${query.params.storeId}/sizes/new`)">
      <Plus class="mr-2 h-4 w-4" /> Add New
    </Button>
  </div>

  <Separator />

  <DataTable searchKey="name" :columns="columns" :data="data" />
  <Heading title="API" description="API Calls for Sizes" />

  <Separator />

  <ApiList entityName="sizes" entityIdName="sizeId" />
</template>
