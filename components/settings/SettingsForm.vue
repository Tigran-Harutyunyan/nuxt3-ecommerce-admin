<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";

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
import AlertModal from "@/components/modals/AlertModal.vue";

import type { Store } from "@/types";
import { useModals } from "@/store/modals";
import { useMain } from "@/store/main";

const { updateEntityTrigger } = useMain();

const { type, isOpen } = storeToRefs(useModals());

const { onClose, onOpen } = useModals();

const isModalOpen = computed(() => {
  return isOpen.value && type.value === "alert";
});

interface SettingsFormProps {
  initialValues: Store;
}

const { initialValues } = defineProps<SettingsFormProps>();

const isLoading = ref(false);

const route = useRoute();
const origin = window?.location?.origin;

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2),
  })
);

const form = useForm({
  initialValues,
  validationSchema: formSchema,
});

const onDelete = async () => {
  try {
    isLoading.value = true;

    const response = await $fetch(`/api/stores/${route.params.storeId}`, {
      method: "delete",
    });

    if (response?.error) {
      toast.error("Something went wrong");
    } else {
      updateEntityTrigger();
      navigateTo("/");
      toast.success("Store deleted.");
    }
  } catch (error: any) {
    toast.error("Make sure you removed all products and categories first.");
  } finally {
    isLoading.value = false;
  }
};

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;

  try {
    const response = await $fetch(`/api/stores/${route.params.storeId}`, {
      method: "put",
      body: {
        name: values.name,
      },
    });

    if (!response?.error) {
      updateEntityTrigger();
      toast.success("Store updated.");
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
    <Heading title="Store settings" description="Manage store preferences" />
    <Button
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
    <div class="grid grid-cols-3 gap-8">
      <FormField name="name" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              :disabled="isLoading"
              v-bind="componentField"
              placeholder="Store name"
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
      Save changes
    </Button>
  </form>
  <Separator />
  <ClientOnly>
    <ApiAlert
      title="GET"
      variant="public"
      :description="`${origin}/api/${route.params.storeId}`"
    />
  </ClientOnly>
</template>
