<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DataTable from "@/components/ui/DataTable.vue";
import Heading from "@/components/ui/Heading.vue";
import ApiList from "@/components/ui/ApiList.vue";
import type { CategoryColumn } from "@/types";
import { type ColumnDef } from "@tanstack/vue-table";
import CellAction from "./CellAction.vue";

interface CategoryClientProps {
  data: CategoryColumn[];
}

const { data } = defineProps<CategoryClientProps>();
const query = useRoute();

const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.billboardLabel,
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
      :title="`Categories (${data?.length})`"
      description="Manage categories for your store"
    />
    <Button @click="navigateTo(`/${query.params.storeId}/categories/new`)">
      <Plus class="mr-2 h-4 w-4" /> Add New
    </Button>
  </div>

  <Separator />

  <DataTable searchKey="name" :columns="columns" :data="data" />
  <Heading title="API" description="API Calls for Categories" />

  <Separator />

  <ApiList entityName="categories" entityIdName="categoryId" />
</template>
