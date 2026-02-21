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
    class="relative flex h-full w-full flex-col items-center justify-center bg-[#09090b] px-20 text-white"
    style="width: 1200px; height: 630px"
  >
    <!-- Grid Background -->
    <div
      class="absolute inset-0 z-0"
      :style="{
        backgroundImage: `radial-gradient(#27272a 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }"
    />

    <div class="absolute top-12 left-12 flex flex-row items-center space-x-4">
      <div class="size-10 rounded-lg bg-white" />
    </div>

    <!-- Main Content -->
    <div class="z-10 flex flex-col items-center text-center">
      <h1
        class="max-w-4xl text-7xl/tight font-bold tracking-tighter text-white"
      >
        {{ title || "The Foundation for your Design System" }}
      </h1>
      <p class="mt-2 max-w-3xl text-3xl/relaxed font-medium text-zinc-400">
        {{
          description
            || "A set of beautifully designed components that you can customize, extend, and build on."
        }}
      </p>

      <!-- CTA (Call to Action) -->
      <button
        class="mt-10 flex items-center justify-center rounded-full bg-white px-8 py-3 text-2xl font-bold text-black shadow-lg"
      >
        Get Started &rarr;
      </button>
    </div>
  </div>
</template>
