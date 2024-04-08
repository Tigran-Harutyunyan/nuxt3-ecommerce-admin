<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import type { Category, Billboard } from "@prisma/client";
import { Trash } from "lucide-vue-next";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import AlertModal from "@/components/modals/AlertModal.vue";
import { useModals } from "@/store/modals";

interface CategoryFormProps {
  initialValues: Category | null;
  billboards: Billboard[] | null;
}

const props = defineProps<CategoryFormProps>();
const { initialValues, billboards } = toRefs(props);

const route = useRoute();
const { type, isOpen } = storeToRefs(useModals());

const { onClose, onOpen } = useModals();

const isModalOpen = computed(() => {
  return isOpen.value && type.value === "alert";
});

const addMode = route.name === "storeId-categories-new";

const title = addMode ? "Create category" : "Edit category";
const description = addMode ? "Add a new category" : "Edit a category.";
const toastMessage = addMode ? "Category created." : "Category updated.";
const action = addMode ? "Create" : "Save changes";

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Please enter a valid name"),
    billboardId: z
      .string({
        required_error: "Billboard is required",
      })
      .min(1, "Please enter a valid Billboard name"),
  })
);

const form = useForm({
  initialValues: initialValues.value || {
    name: "",
    billboardId: "",
  },
  validationSchema: formSchema,
});

const isLoading = ref(false);

const onDelete = async () => {
  onClose();

  try {
    isLoading.value = true;

    const response = await $fetch(
      `/api/store/${route.params.storeId}/categories/${route.params.categoryId}`,
      {
        method: "delete",
      }
    );

    if (response?.id) {
      navigateTo(`/${route.params.storeId}/categories`);
      toast.success("Category deleted.");
    }
  } catch (error: any) {
    toast.error(
      "Make sure you removed all categories using this billboard first."
    );
  } finally {
    isLoading.value = false;
  }
};

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;

  try {
    let url = "";

    if (addMode) {
      url = `/api/store/${route.params.storeId}/categories`;
    } else {
      url = `/api/store/${route.params.storeId}/categories/${route.params.categoryId}`;
    }

    const response = await $fetch(url, {
      method: addMode ? "post" : "put",
      body: {
        name: values.name,
        billboardId: values.billboardId,
      },
    });

    if (response?.id) {
      toast.success(toastMessage);
      if (addMode) {
        navigateTo(`/${route.params.storeId}/categories`);
      }
    }
  } catch (error) {
    toast.error(error?.message);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <AlertModal
    @confirm="onDelete"
    @close="onClose"
    :loading="isLoading"
    :isOpen="isModalOpen"
  />
  <div class="flex items-center justify-between">
    <Heading :title="title" :description="description" />

    <Button
      v-if="!addMode"
      :disabled="isLoading"
      variant="destructive"
      size="sm"
      @click="onOpen('alert')"
    >
      <Trash class="h-4 w-4" />
    </Button>
  </div>

  <Separator />

  <form @submit.prevent.stop="onSubmit" class="space-y-8 w-full">
    <div class="md:grid md:grid-cols-3 gap-8">
      <FormField name="name" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              :disabled="isLoading"
              v-bind="componentField"
              placeholder="Category name"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="billboardId">
        <FormItem>
          <FormLabel>Billboard</FormLabel>
          <FormControl v-if="billboards">
            <Select :disabled="isLoading" v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a billboard" />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                <SelectItem
                  v-for="billboard in billboards"
                  :key="billboard.id"
                  :value="billboard.id"
                >
                  {{ billboard.label }}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <Button
      :disabled="isLoading"
      :loading="isLoading"
      class="ml-auto"
      type="submit"
    >
      {{ action }}
    </Button>
  </form>
</template>
