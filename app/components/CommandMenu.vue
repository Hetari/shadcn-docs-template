<script setup lang="ts">
import { ChevronRight, Copy, CornerDownLeft, Square } from "lucide-vue-next";
import type { NavigationItem } from "~/composables/useNavigation";
import { cn } from "~/lib/utils";

type Props = {
  tree?: {
    children: NavigationItem[];
    title: string;
    path: string;
    stem?: string;
  };
  blocks?: { name: string; description: string; categories: string[] }[];
  navItems?: { href: string; label: string }[];
};

withDefaults(defineProps<Props>(), {
  blocks: undefined,
  navItems: undefined,
});

const router = useRouter();
const isMac = useIsMac();
const config = useConfig();
const open = ref(false);
const selectedType = ref<"page" | "component" | "block" | "copy" | null>(null);
const copyPayload = ref("");

const { searchQuery, searchResults, isSearching } = useSearch();

const pmToDlxCommand: Record<string, string> = {
  npm: "npx",
  yarn: "yarn dlx",
  pnpm: "pnpm dlx",
  bun: "bunx",
};

const packageManager = config.config.value.packageManager || "pnpm";

function handlePageHighlight(
  isComponent: boolean,
  item: { path: string; title?: string },
) {
  if (isComponent) {
    const componentName = item.path.split("/").pop();
    selectedType.value = "component";
    copyPayload.value = `${pmToDlxCommand[packageManager]} shadcn-vue@latest add ${componentName}`;
  }
  else {
    selectedType.value = "page";
    copyPayload.value = "";
  }
}

function handleBlockHighlight(block: {
  name: string;
  description: string;
  categories: string[];
}) {
  selectedType.value = "block";
  copyPayload.value = `${pmToDlxCommand[packageManager]} shadcn-vue@latest add ${block.name}`;
}

function handleCopyHighlight() {
  selectedType.value = "copy";
  copyPayload.value = "click to copy";
}

function runCommand(command: () => unknown) {
  open.value = false;
  command();
}

const { copy } = useClipboard({ source: copyPayload });

onMounted(() => {
  const down = (e: KeyboardEvent) => {
    if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
      if (
        (e.target instanceof HTMLElement && e.target.isContentEditable)
        || e.target instanceof HTMLInputElement
        || e.target instanceof HTMLTextAreaElement
        || e.target instanceof HTMLSelectElement
      ) {
        return;
      }
      e.preventDefault();
      open.value = !open.value;
    }
    if (
      e.key === "c"
      && (e.metaKey || e.ctrlKey)
      && open.value
      && copyPayload.value
    ) {
      runCommand(copy);
    }
  };
  document.addEventListener("keydown", down);
  onUnmounted(() => document.removeEventListener("keydown", down));
});
</script>

<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button
        variant="secondary"
        :class="
          cn(
            'relative h-8 w-full justify-start bg-surface pl-3 font-medium text-foreground shadow-none sm:pr-12 md:w-48 lg:w-56 xl:w-64 dark:bg-card',
          )
        "
        @click="open = true"
      >
        <span class="hidden lg:inline-flex">Search documentation...</span>
        <span class="inline-flex lg:hidden">Search...</span>
        <div class="absolute top-1.5 right-1.5 hidden gap-1 sm:flex">
          <KbdGroup>
            <Kbd class="border">{{ isMac ? "⌘" : "Ctrl" }}</Kbd>
            <Kbd class="border">K</Kbd>
          </KbdGroup>
        </div>
      </Button>
    </DialogTrigger>
    <DialogContent
      class="rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800"
      :show-close-button="false"
    >
      <DialogHeader class="sr-only">
        <DialogTitle>Search documentation...</DialogTitle>
        <DialogDescription>Search for a command to run...</DialogDescription>
      </DialogHeader>
      <Command
        highlight-on-hover
        class="
          rounded-none bg-transparent **:data-[slot=command-input]:h-9! **:data-[slot=command-input]:py-0 **:data-[slot=command-input-wrapper]:mb-0
          **:data-[slot=command-input-wrapper]:h-9! **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border
          **:data-[slot=command-input-wrapper]:border-input **:data-[slot=command-input-wrapper]:bg-input/50
        "
        :filter="(value: string, search: string, keywords?: string[]) => {
          const extendValue = `${value} ${keywords?.join(' ') || ''}`
          if (extendValue.toLowerCase().includes(search.toLowerCase())) {
            return 1
          }
          return 0
        }"
      >
        <CommandInput
          v-model="searchQuery"
          placeholder="Search documentation..."
        />
        <CommandList class="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5">
          <CommandEmpty class="py-12 text-center text-sm text-muted-foreground">
            <span v-if="isSearching">Searching...</span>
            <span v-else>No results found.</span>
          </CommandEmpty>

          <!-- Search Results from Markdown Files -->
          <CommandGroup
            v-if="searchResults.length > 0"
            heading="Search Results"
            class="p-0! **:data-[slot=command-group-heading]:scroll-mt-16 **:data-[slot=command-group-heading]:p-3! **:data-[slot=command-group-heading]:pb-1!"
          >
            <CommandItem
              v-for="result in searchResults"
              :key="result.path"
              :value="`${result.title} ${result.description || ''} ${
                result.path
              }`"
              @select="() => runCommand(() => router.push(result.path))"
              @highlight="
                () => {
                  selectedType = 'page';
                  copyPayload = '';
                }
              "
            >
              <ChevronRight />
              <div class="flex flex-col">
                <span class="font-medium">{{ result.title }}</span>
                <span
                  v-if="result.description"
                  class="text-xs text-muted-foreground"
                >{{ result.description }}</span>
                <span
                  v-if="result.excerpt"
                  class="mt-1 line-clamp-1 text-xs text-muted-foreground"
                >{{ result.excerpt }}</span>
              </div>
            </CommandItem>
          </CommandGroup>

          <!-- Navigation Items -->
          <CommandGroup
            v-if="
              navItems
                && navItems.length > 0
                && (!searchQuery || searchQuery.length < 2)
            "
            heading="Pages"
            class="p-0! **:data-[slot=command-group-heading]:scroll-mt-16 **:data-[slot=command-group-heading]:p-3! **:data-[slot=command-group-heading]:pb-1!"
          >
            <CommandItem
              v-for="item in navItems"
              :key="item.href"
              :value="`Navigation ${item.label}`"
              @select="() => runCommand(() => router.push(item.href))"
              @highlight="
                () => {
                  selectedType = 'page';
                  copyPayload = '';
                }
              "
            >
              <ChevronRight />
              {{ item.label }}
            </CommandItem>
          </CommandGroup>

          <!-- Documentation Tree -->
          <CommandGroup
            v-for="group in tree?.children"
            :key="group.title"
            :heading="group.title"
            class="p-0! **:data-[slot=command-group-heading]:scroll-mt-16 **:data-[slot=command-group-heading]:p-3! **:data-[slot=command-group-heading]:pb-1!"
          >
            <template v-if="group.type === 'group'">
              <CommandItem
                v-for="item in group.children?.filter((i: NavigationItem) => i.type === 'page' || i.type === 'component')"
                :key="item.title"
                :value="
                  item.title?.toString() ? `${group.title} ${item.title}` : ''
                "
                :keywords="
                  item.type === 'component' ? ['component'] : undefined
                "
                @highlight="
                  () => handlePageHighlight(item.type === 'component', item)
                "
                @select="() => runCommand(() => router.push(item.path))"
              >
                <div
                  v-if="item.type === 'component'"
                  class="aspect-square size-4 rounded-full border border-dashed border-muted-foreground"
                />
                <ChevronRight v-else />
                {{ item.title }}
              </CommandItem>
            </template>
          </CommandGroup>

          <!-- Click to Copy Item -->
          <CommandGroup
            v-if="!searchQuery || searchQuery.length < 2"
            heading="Actions"
            class="p-0! **:data-[slot=command-group-heading]:p-3!"
          >
            <CommandMenuItem
              value="click to copy"
              :keywords="['copy', 'clipboard', 'click']"
              @highlight="handleCopyHighlight"
              @select="() => runCommand(() => copy('click to copy'))"
            >
              <Copy class="size-4" />
              click to copy
            </CommandMenuItem>
          </CommandGroup>

          <!-- Blocks -->
          <CommandGroup
            v-if="blocks?.length && (!searchQuery || searchQuery.length < 2)"
            heading="Blocks"
            class="p-0! **:data-[slot=command-group-heading]:p-3!"
          >
            <CommandMenuItem
              v-for="block in blocks"
              :key="block.name"
              :value="block.name"
              :keywords="[
                'block',
                block.name,
                block.description,
                ...block.categories,
              ]"
              @highlight="() => handleBlockHighlight(block)"
              @select="
                () =>
                  runCommand(() =>
                    router.push(`/blocks/${block.categories[0]}#${block.name}`),
                  )
              "
            >
              <Square />
              {{ block.description }}
              <span
                class="ml-auto font-mono text-xs font-normal text-muted-foreground tabular-nums"
              >
                {{ block.name }}
              </span>
            </CommandMenuItem>
          </CommandGroup>
        </CommandList>
      </Command>
      <div
        class="
          absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 text-xs font-medium text-muted-foreground
          dark:border-t-neutral-700 dark:bg-neutral-800
        "
      >
        <div class="flex items-center gap-2">
          <CommandMenuKbd>
            <CornerDownLeft />
          </CommandMenuKbd>
          <span v-if="selectedType === 'page' || selectedType === 'component'">Go to Page</span>
          <span v-if="selectedType === 'copy'">Click to Copy</span>
        </div>
        <Separator v-if="copyPayload" orientation="vertical" class="h-4!" />
        <div v-if="copyPayload" class="flex items-center gap-1">
          <CommandMenuKbd>{{ isMac ? "⌘" : "Ctrl" }}</CommandMenuKbd>
          <CommandMenuKbd>C</CommandMenuKbd>
          {{ copyPayload }}
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>
