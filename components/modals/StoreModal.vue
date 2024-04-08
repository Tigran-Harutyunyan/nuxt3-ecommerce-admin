<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

import { useForm } from "vee-validate";
import { toast } from "vue-sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useModals } from "@/store/modals";

const { type, isOpen } = storeToRefs(useModals());
const { onClose } = useModals();
const isLoading = ref(false);

const isModalOpen = computed(() => {
  return isOpen.value && type.value === "store";
});

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;

  try {
    const response = await $fetch("/api/stores", {
      method: "post",
      body: {
        name: values.name,
      },
    });

    if (response?.id) {
      window.location.assign(`/${response.id}`);
    }
  } catch (error) {
    toast.error(error?.message);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <Modal
    title="Create store"
    description="Add a new store to manage products and categories."
    :isOpen="isModalOpen"
    @close="onClose"
  >
    <div>
      <div class="space-y-4 py-2 pb-4">
        <div class="space-y-2">
          <form @submit.prevent.stop="onSubmit">
            <FormField name="name" v-slot="{ componentField }">
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    :disabled="isLoading"
                    v-bind="componentField"
                    placeholder="E-Commerce"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <div class="pt-6 space-x-2 flex items-center justify-end w-full">
              <Button
                :disabled="isLoading"
                variant="outline"
                @click="onClose()"
              >
                Cancel
              </Button>
              <Button :disabled="isLoading" type="submit">Continue</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Modal>
</template>
