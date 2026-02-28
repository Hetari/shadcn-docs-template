import { refDebounced } from "@vueuse/core";

export type SearchResult = {
  title: string;
  description?: string;
  path: string;
  body?: string;
  excerpt?: string;
};

export function useSearch() {
  const searchQuery = ref("");
  const debouncedQuery = refDebounced(searchQuery, 300);
  const isSearching = ref(false);
  const searchResults = ref<SearchResult[]>([]);

  async function performSearch(query: string): Promise<SearchResult[]> {
    if (!query || query.trim().length < 2) {
      return [];
    }

    try {
      isSearching.value = true;

      const results = await $fetch<SearchResult[]>("/api/search", {
        query: { q: query },
      });

      return results || [];
    }
    catch (error) {
      console.error("Search error:", error);
      return [];
    }
    finally {
      isSearching.value = false;
    }
  }

  // Watch debounced query and perform search
  watch(debouncedQuery, async (newQuery) => {
    if (newQuery && newQuery.trim().length >= 2) {
      searchResults.value = await performSearch(newQuery);
    }
    else {
      searchResults.value = [];
    }
  });

  return {
    searchQuery,
    debouncedQuery,
    isSearching,
    searchResults,
    performSearch,
  };
}
