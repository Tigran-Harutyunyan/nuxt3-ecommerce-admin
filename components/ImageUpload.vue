<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-vue-next";

interface ImageUploadProps {
  value: string;
  disabled?: boolean;
}

const props = defineProps<ImageUploadProps>();

const { value, disabled } = toRefs(props);

const emit = defineEmits(["change"]);

const uploadTest = ref("uw-test");

interface SuccessResponse {
  value: {
    event: "success";
    info: {
      secure_url: string;
    };
  };
}

interface ErrorResponse {
  value: {
    event: "error";
    error: {
      message: string;
    };
  };
}

type Response = SuccessResponse | ErrorResponse;

const handleUpload = (res: Response) => {
  if (res.value.event === "success") {
    emit("change", res.value?.info?.secure_url);
  }
};

const images = computed(() => {
  return value.value ? [value.value] : [];
});
</script>

<template>
  <div>
    <div class="mb-4 flex items-center gap-4">
      <div
        v-for="url in images"
        :key="url"
        class="relative w-[200px] h-[200px] rounded-md overflow-hidden"
      >
        <div class="z-10 absolute top-2 right-2">
          <Button
            type="button"
            @click="$emit('change', '')"
            variant="destructive"
            size="sm"
          >
            <Trash class="h-4 w-4" />
          </Button>
        </div>
        <NuxtImg fill class="object-cover" alt="Image" :src="url" />
      </div>
    </div>

    <CldUploadWidget
      v-slot="{ open }"
      :uploadPreset="uploadTest"
      :options="{ maxFiles: 1 }"
      @upload="handleUpload"
    >
      <Button
        type="button"
        :disabled="disabled"
        variant="secondary"
        @click="open"
      >
        <ImagePlus class="h-4 w-4 mr-2" />
        Upload an Image
      </Button>
    </CldUploadWidget>
  </div>
</template>
