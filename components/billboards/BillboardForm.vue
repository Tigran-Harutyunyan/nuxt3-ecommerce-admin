<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import type { Billboard } from "@prisma/client";
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

interface BillboardFormProps {
  initialValues: Billboard | null;
}

const props = defineProps<BillboardFormProps>();
const { initialValues } = toRefs(props);

const route = useRoute();
const { type, isOpen } = storeToRefs(useModals());

const { onClose, onOpen } = useModals();

const isModalOpen = computed(() => {
  return isOpen.value && type.value === "alert";
});

const addMode = route.name === "storeId-billboards-new";

const title = addMode ? "Create billboard" : "Edit billboard";
const description = addMode ? "Add a new billboard" : "Edit a billboard.";
const toastMessage = addMode ? "Billboard created." : "Billboard updated.";
const action = addMode ? "Create" : "Save changes";

const formSchema = toTypedSchema(
  z.object({
    label: z
      .string({
        required_error: "Label is required",
      })
      .min(1, "Please enter a valid label"),
    imageUrl: z
      .string({
        required_error: "Image is required",
      })
      .min(1, "Image is required"),
  })
);

const form = useForm({
  initialValues: initialValues.value || {
    label: "",
    imageUrl: "",
  },
  validationSchema: formSchema,
});

const isLoading = ref(false);

const onDelete = async () => {
  onClose();
  try {
    isLoading.value = true;

    const response = await $fetch(
      `/api/store/${route.params.storeId}/billboards/${route.params.billboardId}`,
      {
        method: "delete",
      }
    );

    if (response?.id) {
      navigateTo(`/${route.params.storeId}/billboards`);
      toast.success("Billboard deleted.");
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
      url = `/api/store/${route.params.storeId}/billboards`;
    } else {
      url = `/api/store/${route.params.storeId}/billboards/${route.params.billboardId}`;
    }

    const response = await $fetch(url, {
      method: addMode ? "post" : "put",
      body: {
        label: values.label,
        imageUrl: values.imageUrl,
      },
    });

    if (response?.id) {
      toast.success(toastMessage);

      if (addMode) {
        navigateTo(`/${route.params.storeId}/billboards`);
      }
    }
  } catch (error) {
    toast.error(error?.message);
  } finally {
    isLoading.value = false;
  }
});

const onImgUpload = (src: string) => {
  form.setFieldValue("imageUrl", src);
};

const onRemoveImage = (url: string) => {
  form.setFieldValue("imageUrl", "");
};
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
    <FormField v-slot="{ componentField }" name="imageUrl">
      <FormItem>
        <FormLabel>Background image</FormLabel>
        <FormControl>
          <ImageUpload
            :disabled="isLoading"
            :images="
              componentField.modelValue ? [componentField.modelValue] : []
            "
            @change="onImgUpload"
            @remove="onRemoveImage"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="md:grid md:grid-cols-3 gap-8">
      <FormField name="label" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>Label</FormLabel>
          <FormControl>
            <Input
              :disabled="isLoading"
              v-bind="componentField"
              placeholder="Billboard label"
            />
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
