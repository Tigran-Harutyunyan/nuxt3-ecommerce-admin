<script setup lang="ts">
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-vue-next";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useModals } from "@/store/modals";

const { onOpen } = useModals();

const isOpen = ref(false);

interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface StoreSwitcherProps {
  items: Store[];
  className?: string;
}
const { items, className } = defineProps<StoreSwitcherProps>();

const formattedItems = computed(() => {
  return items.map((item) => ({
    label: item.name,
    value: item.id,
  }));
});

const route = useRoute();

const currentStore = computed(() => {
  return formattedItems.value.find(
    (item) => item.value === route.params.storeId
  );
});

const onSelectCommand = () => {
  isOpen.value = false;
  onOpen("store");
};

const onStoreSelect = (store: { value: string; label: string }) => {
  isOpen.value = false;
  navigateTo(`/${store.value}`);
};
</script>

<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        size="sm"
        role="combobox"
        :aria-expanded="isOpen"
        aria-label="Select a store"
        :class="cn('w-[200px] justify-between', className)"
      >
        <Store class="mr-2 h-4 w-4" />
        {{ currentStore?.label }}
        <ChevronsUpDown class="ml-auto h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-[200px] p-0">
      <Command>
        <CommandList>
          <CommandInput placeholder="Search store..." />
          <CommandEmpty>No store found.</CommandEmpty>
          <CommandGroup heading="Stores">
            <CommandItem
              v-for="store in formattedItems"
              :key="store.label"
              :value="store.label"
              @select="onStoreSelect(store)"
              class="text-sm"
            >
              <Store class="mr-2 h-4 w-4" />
              {{ store.label }}
              <Check
                :class="
                  cn(
                    'ml-auto h-4 w-4',
                    currentStore?.value === store.value
                      ? 'opacity-100'
                      : 'opacity-0'
                  )
                "
              />
            </CommandItem>
          </CommandGroup>
        </CommandList>
        <CommandSeparator />
        <CommandList>
          <CommandGroup>
            <CommandItem @select="onSelectCommand" value="new">
              <PlusCircle class="mr-2 h-5 w-5" />
              Create Store
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </PopoverContent>
  </Popover>
</template>
