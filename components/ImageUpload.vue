<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-vue-next";

interface ImageUploadProps {
  images: string[];
  disabled?: boolean;
  multiple?: boolean;
}

const props = withDefaults(defineProps<ImageUploadProps>(), {
  multiple: false,
});

const { images, disabled, multiple } = toRefs(props);

const emit = defineEmits(["change", "remove"]);

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
            @click="$emit('remove', url)"
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
      :multiple="multiple"
      :options="{
        maxFiles: multiple ? 10 : 1,
      }"
      @upload="handleUpload"
    >
      <Button
        type="button"
        :disabled="disabled"
        variant="secondary"
        @click="open"
      >
        <ImagePlus class="h-4 w-4 mr-2" />
        Upload an image{{ multiple ? "(s)" : "" }}
      </Button>
    </CldUploadWidget>
  </div>
</template>
