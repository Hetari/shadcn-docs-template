<script lang="ts" setup>
import { GithubIcon } from "lucide-vue-next";
import { siteConfig } from "~/lib/siteConfig";
import Skeleton from "./ui/skeleton/Skeleton.vue";

const { data, pending, error } = useLazyFetch<{
  stargazers_count: number;
}>(siteConfig.links.githubAPI, {
  server: false,
  cache: "no-cache",
});

const stars = computed<string | null>(() => {
  const count = data.value?.stargazers_count;
  if (count !== 0 && !count) {
    return null;
  }
  return count >= 1000
    ? `${(count / 1000).toFixed(1)}k`
    : count.toLocaleString();
});

watch(error, (err) => {
  if (err) {
    console.error("Failed to fetch GitHub stars:", err);
  }
});
</script>

<template>
  <Button as-child class="h-8 shadow-none" size="sm" variant="ghost">
    <NuxtLink :to="siteConfig.links.github" rel="noreferrer" target="_blank">
      <GithubIcon />
      <span
        v-if="!pending && (stars || error)"
        class="text-xs text-muted-foreground tabular-nums"
      >
        {{ stars || "—" }}
      </span>
      <Skeleton v-else class="h-4 w-8" />
    </NuxtLink>
  </Button>
</template>
