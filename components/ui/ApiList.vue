<script setup lang="ts">
import ApiAlert from "@/components/ui/ApiAlert.vue";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}
const route = useRoute();
const props = defineProps<ApiListProps>();
const { entityName, entityIdName } = toRefs(props);

const baseUrl = `${location.origin}/api/store/${route.params.storeId}`;
</script>

<template>
  <ApiAlert
    title="GET"
    variant="public"
    :description="`${baseUrl}/${entityName}`"
  />
  <ApiAlert
    title="GET"
    variant="public"
    :description="`${baseUrl}/${entityIdName}`"
  />
  <ApiAlert
    title="POST"
    variant="admin"
    :description="`${baseUrl}/${entityName}`"
  />
  <ApiAlert
    title="PATCH"
    variant="admin"
    :description="`${baseUrl}/${entityIdName}`"
  />
  <ApiAlert
    title="DELETE"
    variant="admin"
    :description="`${baseUrl}/${entityIdName}`"
  />
</template>
