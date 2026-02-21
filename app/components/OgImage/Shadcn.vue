<script setup lang="ts">
/**
 * @props title - The title of the page
 * @props description - The description of the page
 * @props siteName - The name of the site
 */
defineProps<{
  title?: string;
  description?: string;
  siteName?: string;
}>();
</script>

<template>
  <div
    class="flex size-full flex-col items-center justify-center bg-[#09090b] px-20 text-white"
  >
    <!-- Grid Background -->
    <div
      class="absolute inset-0 z-0 opacity-20"
      :style="{
        backgroundImage: `radial-gradient(#27272a 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }"
    />

    <!-- Header Branding -->
    <div class="absolute top-12 left-12 flex items-center space-x-3">
      <div class="size-8 rounded-lg bg-white" />
      <span class="text-2xl font-bold tracking-tight text-white/90">
        {{ siteName || "shadcn-docs" }}
      </span>
    </div>

    <!-- Main Content -->
    <div class="z-10 flex flex-col items-center text-center">
      <h1 class="text-7xl/tight font-bold tracking-tighter text-white">
        {{ title || "The Foundation for your Design System" }}
      </h1>
      <p
        class="mt-6 max-w-3xl text-3xl/relaxed font-medium text-zinc-400"
      >
        {{
          description
            || "A set of beautifully designed components that you can customize, extend, and build on."
        }}
      </p>
    </div>

    <!-- Footer URL -->
    <div class="absolute bottom-12 text-xl font-medium text-zinc-500">
      {{ siteName ? `${siteName.toLowerCase()}.com` : "shadcn-docs.com" }}
    </div>
  </div>
</template>
