<script lang="ts" setup>
import { GithubIcon } from "lucide-vue-next";
import { siteConfig } from "~/lib/siteConfig";
import Skeleton from "./ui/skeleton/Skeleton.vue";

const { data, pending } = useLazyFetch<{
  repo: {
    stars: number;
  };
}>(siteConfig.links.ungh, {});

const stars = computed(() => {
  const count = (data.value as any)?.repo?.stars;
  if (count !== 0 && !count) {
    return null;
  }
  return count >= 1000
    ? `${(count / 1000).toFixed(1)}k`
    : count.toLocaleString();
});
</script>

<template>
  <Button as-child class="h-8 shadow-none" size="sm" variant="ghost">
    <NuxtLink :to="siteConfig.links.github" rel="noreferrer" target="_blank">
      <GithubIcon />
      <span
        v-if="!pending && stars"
        class="text-xs text-muted-foreground tabular-nums"
      >
        {{ stars }}
      </span>
      <Skeleton v-else class="h-4 w-8" />
    </NuxtLink>
  </Button>
</template>
