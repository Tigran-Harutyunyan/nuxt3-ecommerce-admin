<script setup lang="ts" generic="TData, TValue">
import {
  FlexRender,
  getCoreRowModel,
  useVueTable,
  getFilteredRowModel,
} from "@tanstack/vue-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type ColumnDef, type ColumnFiltersState } from "@tanstack/vue-table";

const { columns, data, searchKey } = defineProps<{
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
}>();

const columnFilters = ref<ColumnFiltersState>([]);

const table = useVueTable({
  get data() {
    return data;
  },
  columns,
  getFilteredRowModel: getFilteredRowModel(),
  getCoreRowModel: getCoreRowModel(),
  onColumnFiltersChange: (updaterOrValue) => {
    columnFilters.value =
      typeof updaterOrValue === "function"
        ? updaterOrValue(columnFilters.value)
        : updaterOrValue;
  },

  state: {
    get columnFilters() {
      return columnFilters.value;
    },
  },
});
</script>

<template>
  <div>
    <div class="flex items-center py-4">
      <Input
        placeholder="Search"
        @update:model-value="table.getColumn(searchKey)?.setFilterValue($event)"
        :model-value="table.getColumn(searchKey)?.getFilterValue() as string"
        class="max-w-sm"
      />
    </div>
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow
            :key="headerGroup.id"
            v-for="headerGroup in table.getHeaderGroups()"
          >
            <TableHead :key="header.id" v-for="header in headerGroup.headers">
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell :key="cell.id" v-for="cell in row.getVisibleCells()">
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell :colSpan="columns.length" class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
    <div class="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        @click="table.previousPage()"
        :disabled="!table.getCanPreviousPage()"
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        @click="table.nextPage()"
        :disabled="!table.getCanNextPage()"
      >
        Next
      </Button>
    </div>
  </div>
</template>
