<script setup lang="ts">
import type { ContentNavigationItem } from "@nuxt/content";
import { showMcpDocs } from "~/lib/flag";
import {
  NAV_SECTIONS,
  SIDEBAR_EXCLUDED_PAGES,
  SIDEBAR_EXCLUDED_SECTIONS,
} from "~/lib/navigation";

defineProps<{
  tree: ContentNavigationItem;
}>();

const { path } = toRefs(useRoute());

const filteredSections = computed(() =>
  NAV_SECTIONS.filter(
    section => showMcpDocs || !section.href.includes("/mcp"),
  ),
);

function isActive(href: string) {
  return href === "/docs" ? path.value === href : path.value.startsWith(href);
}
</script>

<template>
  <Sidebar
    class="sticky top-[calc(var(--header-height)+1px)] z-30 hidden h-[calc(100svh-var(--footer-height)-4rem)] bg-transparent lg:flex"
    collapsible="none"
  >
    <SidebarContent class="no-scrollbar overflow-x-hidden px-2">
      <div
        class="sticky -top-1 z-10 h-8 shrink-0 bg-linear-to-b from-background via-background/80 to-background/50 blur-xs"
      />
      <SidebarGroup>
        <SidebarGroupLabel class="font-medium text-muted-foreground">
          Sections
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem
              v-for="{ name, href } in filteredSections"
              :key="name"
            >
              <SidebarMenuButton
                as-child
                :is-active="isActive(href)"
                class="
                  relative h-[30px] w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0
                  after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent 3xl:fixed:w-full 3xl:fixed:max-w-48
                "
              >
                <NuxtLink :to="href">
                  <span
                    class="absolute inset-0 flex w-(--sidebar-width) bg-transparent"
                  />
                  {{ name }}
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup
        v-for="item in tree.children?.filter(
          (section) =>
            !SIDEBAR_EXCLUDED_SECTIONS.includes(
              section.title.toLocaleLowerCase(),
            ),
        )"
        :key="item.title"
      >
        <SidebarGroupLabel class="font-medium text-muted-foreground">
          {{ item.title }}
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu class="gap-0.5">
            <template
              v-for="childItem in item?.children?.filter(
                (child) => !SIDEBAR_EXCLUDED_PAGES.includes(child.path),
              )"
              :key="childItem.path"
            >
              <SidebarMenuItem>
                <SidebarMenuButton
                  as-child
                  :is-active="childItem?.path === path"
                  class="
                    relative h-7.5 w-fit overflow-visible border border-transparent text-[0.8rem] font-medium after:absolute after:inset-x-0 after:-inset-y-1 after:z-0
                    after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent 3xl:fixed:w-full 3xl:fixed:max-w-48
                  "
                >
                  <NuxtLink :to="childItem?.path">
                    <span
                      class="absolute inset-0 flex w-(--sidebar-width) bg-transparent"
                    />
                    {{ childItem.title }}
                    <span
                      v-if="childItem.new"
                      class="flex size-2 rounded-full bg-green-500"
                      title="New"
                    />
                  </NuxtLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </template>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <div
        class="sticky -bottom-1 z-10 h-16 shrink-0 bg-linear-to-t from-background via-background/80 to-background/50 blur-xs"
      />
    </SidebarContent>
  </Sidebar>
</template>
