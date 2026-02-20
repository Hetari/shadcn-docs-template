<script setup lang="ts">
import { ConfigProvider, TooltipProvider } from "reka-ui";

useHead({
  htmlAttrs: {
    lang: "en",
  },
});
</script>

<template>
  <SiteBody>
    <ConfigProvider>
      <TooltipProvider>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </TooltipProvider>
    </ConfigProvider>
  </SiteBody>
</template>
