<script setup lang="ts">
import { siteConfig } from "~/lib/siteConfig";

const title = "The Foundation for your Design System";
const description = `A set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own. Open Source. Open Code.`;

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: siteConfig.ogImage,
  twitterImage: siteConfig.ogImage,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center">
    <h1>Hi</h1>
  </div>
</template>
