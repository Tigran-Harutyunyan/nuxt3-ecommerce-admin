<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { ColorColumn } from "@/types";
import { type ColumnDef } from "@tanstack/vue-table";
import CellAction from "./CellAction.vue";
import Color from "./Color.vue";

interface ColorClientProps {
  data: ColorColumn[];
}

const { data } = defineProps<ColorClientProps>();
const query = useRoute();

const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => h(Color, { value: row.original.value }),
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
      :title="`Colors (${data?.length})`"
      description="Manage colors for your products"
    />
    <Button @click="navigateTo(`/${query.params.storeId}/colors/new`)">
      <Plus class="mr-2 h-4 w-4" /> Add New
    </Button>
  </div>

  <Separator />

  <DataTable searchKey="name" :columns="columns" :data="data" />
  <Heading title="API" description="API Calls for Colors" />

  <Separator />

  <ApiList entityName="colors" entityIdName="colorId" />
</template>
