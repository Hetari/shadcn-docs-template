<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { GalleryHorizontalIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();

const { config } = useConfig();

function toggleLayout() {
  const newLayout = config.value.layout === "fixed" ? "full" : "fixed";
  config.value.layout = newLayout;
}
</script>

<template>
  <Button
    variant="ghost"
    size="icon"
    :class="cn('size-8', props.class)"
    title="Toggle layout"
    @click="toggleLayout()"
  >
    <span class="sr-only">Toggle layout</span>
    <GalleryHorizontalIcon />
  </Button>
</template>
