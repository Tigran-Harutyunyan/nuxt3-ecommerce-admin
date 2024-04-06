<script setup lang="ts">
import { Plus } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DataTable from "@/components/ui/DataTable.vue";
import Heading from "@/components/ui/Heading.vue";
import ApiList from "@/components/ui/ApiList.vue";
import type { BillboardColumn } from "@/types";
import { type ColumnDef } from "@tanstack/vue-table";
import CellAction from "./CellAction.vue";

interface BillboardClientProps {
  data: BillboardColumn[];
}

const { data } = defineProps<BillboardClientProps>();
const query = useRoute();

const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
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
      :title="`Billboards (${data?.length})`"
      description="Manage billboards for your store"
    />
    <Button @click="navigateTo(`/${query.params.storeId}/billboards/new`)">
      <Plus class="mr-2 h-4 w-4" /> Add New
    </Button>
  </div>

  <Separator />

  <DataTable searchKey="label" :columns="columns" :data="data" />
  <Heading title="API" description="API Calls for Billboards" />

  <Separator />

  <ApiList entityName="billboards" entityIdName="billboardId" />
</template>
