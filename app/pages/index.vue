<script setup lang="ts">
import { siteConfig } from "~/lib/siteConfig";

const title = "Build your own docs like Shadcn with the power of Nuxt & Vue";
const description = `A set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own.`;

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: siteConfig.ogImage,
  twitterImage: siteConfig.ogImage,
  twitterCard: "summary_large_image",
});

defineOgImageComponent("Custom", {
  title,
  description,
  siteName: siteConfig.name,
});
</script>

<template>
  <div class="flex flex-1 flex-col items-center justify-center">
    <PageHeader>
      <PageHeaderHeading class="max-w-4xl">
        {{ title }}
      </PageHeaderHeading>
      <PageHeaderDescription>{{ description }}</PageHeaderDescription>
    </PageHeader>
  </div>
</template>
