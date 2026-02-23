<script lang="ts" setup>
import type { Toc } from "@nuxt/content";
import type { HTMLAttributes } from "vue";
import { cn } from "~/lib/utils";

const props = withDefaults(defineProps<{
  toc: Toc;
  variant?: "dropdown" | "list";
  class?: HTMLAttributes["class"];
}>(), {
  variant: "list",
});

const open = ref(false);
const { path } = toRefs(useRoute());

const activeHeading = ref("");

const tocLinks = computed(() => {
  const result: Toc["links"] = [];

  for (const node of props.toc.links) {
    // Add the current node (without children property)
    const { children, ...nodeWithoutChildren } = node;
    result.push(nodeWithoutChildren);

    // Add all direct children if they exist
    if (children && children.length > 0) {
      for (const child of children) {
        const { children: _, ...childWithoutChildren } = child;
        result.push(childWithoutChildren);
      }
    }
  }

  return result;
});

onMounted(() => {
  const elements = tocLinks.value.map(link => document.getElementById(link.id));
  const observers = useIntersectionObserver(elements, (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        activeHeading.value = entry.target.id;
      }
    }
  }, { rootMargin: "0% 0% -80% 0%" });

  onBeforeUnmount(() => {
    observers.stop();
  });
});
</script>

<template>
  <DropdownMenu
    v-model:open="open"
    v-if="variant === 'dropdown'"
  >
    <DropdownMenuTrigger as-child>
      <Button
        :class="cn('h-8 md:h-7', props.class)"
        size="sm"
        variant="outline"
      >
        <Icon name="tabler:menu-deep" />
        On This Page
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="start"
      class="no-scrollbar max-h-[70svh]"
    >
      <DropdownMenuItem
        v-for="item in tocLinks"
        :key="item.id"
        :data-depth="item.depth"
        as-child
        class="data-[depth=3]:pl-6 data-[depth=4]:pl-8"
        @click="open = true"
      >
        <a :href="`${path}#${item.id}`">{{ item.text }}</a>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <div
    v-else
    :class="cn('flex flex-col gap-2 p-4 pt-0 text-sm', props.class)"
  >
    <p
      v-if="tocLinks.length"
      class="sticky top-0 flex h-6 items-center gap-2 bg-background text-xs text-muted-foreground"
    >
      <Icon name="tabler:menu-deep" />
      On This Page
    </p>
    <a
      v-for="item in tocLinks"
      :key="item.id"
      :data-active="item.id === activeHeading"
      :data-depth="item.depth"
      :href="`${path}#${item.id}`"
      class="text-[0.8rem] text-muted-foreground no-underline transition-colors hover:text-foreground data-[active=true]:text-foreground data-[depth=3]:pl-4 data-[depth=4]:pl-6"
    >
      {{ item.text }}
    </a>
  </div>
</template>
