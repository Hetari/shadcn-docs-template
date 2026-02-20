<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
  items: { href: string; label: string }[];
  class?: HTMLAttributes["class"];
}>();

const { path } = toRefs(useRoute());
</script>

<template>
  <nav :class="cn('items-center', props.class)" aria-label="Main Navigation">
    <Button
      v-for="item in items"
      :key="item.href"
      as-child
      size="sm"
      variant="ghost"
    >
      <NuxtLink
        :class="cn(path === item.href && 'text-primary')"
        :to="item.href"
      >
        {{ item.label }}
      </NuxtLink>
    </Button>
  </nav>
</template>
