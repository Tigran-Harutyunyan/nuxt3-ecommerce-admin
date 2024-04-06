<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import type { Size } from "@prisma/client";
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

import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/Heading.vue";
import AlertModal from "@/components/modals/AlertModal.vue";
import { useModals } from "@/store/modals";

interface SizeFormProps {
  initialValues: Size | null;
}

const props = defineProps<SizeFormProps>();
const { initialValues } = toRefs(props);

const route = useRoute();
const { type, isOpen } = storeToRefs(useModals());

const { onClose, onOpen } = useModals();

const isModalOpen = computed(() => {
  return isOpen.value && type.value === "alert";
});

const addMode = route.name === "storeId-sizes-new";

const title = addMode ? "Create size" : "Edit size";
const description = addMode ? "Add a new size" : "Edit a size.";
const toastMessage = addMode ? "Size created." : "Size updated.";
const action = addMode ? "Create" : "Save changes";

const formSchema = toTypedSchema(
  z.object({
    name: z
      .string({
        required_error: "Name is required",
      })
      .min(1, "Please enter a valid name"),
    value: z
      .string({
        required_error: "Value is required",
      })
      .min(1, "Please enter a valid value"),
  })
);

const form = useForm({
  initialValues: initialValues.value || {
    name: "",
    value: "",
  },
  validationSchema: formSchema,
});

const isLoading = ref(false);

const onDelete = async () => {
  onClose();
  try {
    isLoading.value = true;

    const response = await $fetch(
      `/api/store/${route.params.storeId}/sizes/${route.params.sizeId}`,
      {
        method: "delete",
      }
    );

    if (response?.id) {
      navigateTo(`/${route.params.storeId}/sizes`);
      toast.success("Category deleted.");
    }
  } catch (error: any) {
    toast.error("Make sure you removed all products using this size first.");
  } finally {
    isLoading.value = false;
  }
};

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;

  try {
    let url = "";

    if (addMode) {
      url = `/api/store/${route.params.storeId}/sizes`;
    } else {
      url = `/api/store/${route.params.storeId}/sizes/${route.params.sizeId}`;
    }

    const response = await $fetch(url, {
      method: addMode ? "post" : "put",
      body: {
        name: values.name,
        value: values.value,
      },
    });

    if (response?.id) {
      toast.success(toastMessage);
      navigateTo(`/${route.params.storeId}/sizes`);
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
              placeholder="Size name"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="value">
        <FormItem>
          <FormLabel>Value</FormLabel>
          <FormControl>
            <Input
              :disabled="isLoading"
              v-bind="componentField"
              placeholder="Value"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>

    <Button :disabled="isLoading" class="ml-auto" type="submit">
      {{ action }}
    </Button>
  </form>
</template>
