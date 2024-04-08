<script setup lang="ts">
import { Copy, Server } from "lucide-vue-next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "vue-sonner";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const props = withDefaults(defineProps<ApiAlertProps>(), {
  variant: "public",
});

const { title, description, variant } = toRefs(props);

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const onCopy = (description: string) => {
  navigator.clipboard.writeText(description);
  toast.success("API Route copied to clipboard.");
};
</script>

<template>
  <Alert>
    <Server class="h-4 w-4" />
    <AlertTitle class="flex items-center gap-x-2">
      {{ title }}
      <Badge :variant="variantMap[variant]">
        {{ textMap[variant] }}
      </Badge>
    </AlertTitle>
    <AlertDescription class="mt-4 flex items-center justify-between">
      <code
        class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
      >
        {{ description }}
      </code>
      <Button variant="outline" size="sm" @click="onCopy(description)">
        <Copy class="h-4 w-4" />
      </Button>
    </AlertDescription>
  </Alert>
</template>
