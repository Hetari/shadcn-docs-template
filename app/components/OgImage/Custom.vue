<script setup lang="ts">
defineProps({
  title: String,
  description: String,
});
</script>

<template>
  <div
    class="flex h-full w-full bg-black text-white"
    :style="{ fontFamily: 'Geist' }"
  >
    <div class="absolute inset-y-0 left-16 flex w-px border border-dashed border-stone-700" />
    <div class="absolute inset-y-0 right-16 flex w-px border border-dashed border-stone-700" />
    <div class="absolute inset-x-0 top-16 flex h-px border border-stone-700" />
    <div class="absolute inset-x-0 bottom-16 flex h-px border border-stone-700" />
    <div class="absolute right-24 bottom-24 flex flex-row text-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        width="48"
        height="48"
        style="color: #41B883"
      >
        <rect width="256" height="256" fill="none" />
        <line
          x1="208"
          y1="128"
          x2="128"
          y2="208"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
        />
        <line
          x1="192"
          y1="40"
          x2="40"
          y2="192"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="32"
        />
      </svg>
    </div>
    <div class="absolute top-32 right-32 bottom-32 left-32 flex w-[896px] flex-col justify-center">
      <div
        class="flex grow flex-col justify-center leading-[1.1] tracking-tight"
        :style="{
          textWrap: 'balance',
          fontWeight: 600,
          fontSize: title && title.length > 20 ? 64 : 80,
          letterSpacing: '-0.04em',
        }"
      >
        {{ title }}
      </div>
      <div
        class="grow text-[40px] leading-normal text-stone-400"
        :style="{
          fontWeight: 400,
          textWrap: 'balance',
        }"
      >
        {{ description }}
      </div>
    </div>
  </div>
</template>
