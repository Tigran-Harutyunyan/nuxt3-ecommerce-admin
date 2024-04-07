<script setup lang="ts">
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import type { Category, Color, Image, Product, Size } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

import Heading from "@/components/ui/Heading.vue";
import AlertModal from "@/components/modals/AlertModal.vue";
import { useModals } from "@/store/modals";

interface ProductFormProps {
  initialValues:
    | (Product & {
        images: Image[];
      })
    | null;
  categories: Category[] | null;
  colors: Color[] | null;
  sizes: Size[] | null;
}

const props = defineProps<ProductFormProps>();
const { initialValues } = toRefs(props);

const route = useRoute();
const { type, isOpen } = storeToRefs(useModals());

const { onClose, onOpen } = useModals();

const isModalOpen = computed(() => {
  return isOpen.value && type.value === "alert";
});

const addMode = route.name === "storeId-products-new";

const title = addMode ? "Create product" : "Edit product";
const description = addMode ? "Add a new product" : "Edit a product.";
const toastMessage = addMode ? "Product created." : "Product updated.";
const action = addMode ? "Create" : "Save changes";

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "Name is required"),
    images: z.object({ url: z.string() }).array().min(1, "Image is required"),
    price: z.coerce.number().min(1, "Price is required"),
    categoryId: z.string().min(1, "Category is required"),
    colorId: z.string().min(1, "Color is equired"),
    sizeId: z.string().min(1, "Size is required"),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional(),
  })
);

const form = useForm({
  initialValues: initialValues.value
    ? {
        ...initialValues.value,
        price: parseFloat(String(initialValues.value?.price)),
      }
    : {
        name: "",
        images: [],
        price: 0,
        categoryId: "",
        colorId: "",
        sizeId: "",
        isFeatured: false,
        isArchived: false,
      },
  validationSchema: formSchema,
});

const isLoading = ref(false);

const onDelete = async () => {
  onClose();

  try {
    isLoading.value = true;

    const response = await $fetch(
      `/api/store/${route.params.storeId}/products/${route.params.billboardId}`,
      {
        method: "delete",
      }
    );

    if (response?.id) {
      navigateTo(`/${route.params.storeId}/products`);
      toast.success("Product deleted.");
    }
  } catch (error: any) {
    toast.error("Something went wrong.");
  } finally {
    isLoading.value = false;
  }
};

const onSubmit = form.handleSubmit(async (values) => {
  isLoading.value = true;

  try {
    let url = "";

    if (addMode) {
      url = `/api/store/${route.params.storeId}/products`;
    } else {
      url = `/api/store/${route.params.storeId}/products/${route.params.productId}`;
    }

    const response = await $fetch(url, {
      method: addMode ? "post" : "put",
      body: {
        ...values,
      },
    });

    if (response?.id) {
      toast.success(toastMessage);
      navigateTo(`/${route.params.storeId}/products`);
    }
  } catch (error) {
    toast.error(error?.message);
  } finally {
    isLoading.value = false;
  }
});

const onImgUpload = (url: string) => {
  form.setFieldValue("images", form.values.images?.concat([{ url }]));
};

const onRemoveImage = (url: string) => {
  form.setFieldValue(
    "images",
    form.values.images?.filter((item) => item.url !== url)
  );
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
    <FormField v-slot="{ componentField }" name="images">
      <FormItem>
        <FormLabel>Images</FormLabel>
        <FormControl>
          <ImageUpload
            :disabled="isLoading"
            :images="componentField.modelValue.map((item) => item.url)"
            multiple
            @change="onImgUpload"
            @remove="onRemoveImage"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="md:grid md:grid-cols-3 gap-8">
      <FormField name="name" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>Name</FormLabel>
          <FormControl>
            <Input
              :disabled="isLoading"
              v-bind="componentField"
              placeholder="Product name"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField name="price" v-slot="{ componentField }">
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input
              :disabled="isLoading"
              v-bind="componentField"
              placeholder="9.99"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="categoryId">
        <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <Select :disabled="isLoading" v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>

              <SelectContent v-if="categories">
                <SelectItem
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="sizeId">
        <FormItem>
          <FormLabel>Size</FormLabel>
          <FormControl>
            <Select :disabled="isLoading" v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
              </FormControl>

              <SelectContent v-if="sizes">
                <SelectItem
                  v-for="size in sizes"
                  :key="size.id"
                  :value="size.id"
                >
                  {{ size.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="colorId">
        <FormItem>
          <FormLabel>Color</FormLabel>
          <FormControl>
            <Select :disabled="isLoading" v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
              </FormControl>

              <SelectContent v-if="colors">
                <SelectItem
                  v-for="color in colors"
                  :key="color.id"
                  :value="color.id"
                >
                  {{ color.name }}
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ value, handleChange }"
        name="isFeatured"
        type="checkbox"
        :unchecked-value="false"
      >
        <FormItem
          class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-4 md:mt-0"
        >
          <FormControl>
            <Checkbox :checked="value" @update:checked="handleChange" />
          </FormControl>
          <div class="space-y-1 leading-none">
            <FormLabel>Featured</FormLabel>
            <FormDescription>
              This product will appear on the home page
            </FormDescription>
          </div>
          <FormMessage />
        </FormItem>
      </FormField>

      <FormField
        v-slot="{ value, handleChange }"
        name="isArchived"
        type="checkbox"
        :unchecked-value="false"
      >
        <FormItem
          class="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-4 md:mt-0"
        >
          <FormControl>
            <Checkbox :checked="value" @update:checked="handleChange" />
          </FormControl>
          <div class="space-y-1 leading-none">
            <FormLabel>Archived</FormLabel>
            <FormDescription>
              This product will not appear anywhere in the store.
            </FormDescription>
          </div>
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
