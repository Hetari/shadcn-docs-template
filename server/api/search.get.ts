import type { ContentCollectionItem } from "@nuxt/content";
import { queryCollection } from "@nuxt/content/server";

export type SearchResult = {
  title: string;
  description?: string;
  path: string;
  body?: string;
  excerpt?: string;
};

export default defineCachedEventHandler(
  async (event) => {
    const query = getQuery(event).q as string;

    if (!query || query.trim().length < 2) {
      return [];
    }

    try {
      // Search through all markdown files in the content collection
      const results = (await queryCollection(event, "content")
        .where({
          _path: {
            $contains: "/docs/",
          },
        })
        .find()) as ContentCollectionItem[];

      const queryLower = query.toLowerCase().trim();
      const matched: SearchResult[] = [];

      for (const item of results) {
        const title = item.title?.toLowerCase() || "";
        const description = item.description?.toLowerCase() || "";
        const body = item.body?.toLowerCase() || "";
        const path = item._path?.toLowerCase() || "";

        // Check if query matches title, description, body, or path
        if (
          title.includes(queryLower)
          || description.includes(queryLower)
          || body.includes(queryLower)
          || path.includes(queryLower)
        ) {
          // Extract excerpt from body if available
          let excerpt: string | undefined;
          if (item.body) {
            const bodyLower = item.body.toLowerCase();
            const index = bodyLower.indexOf(queryLower);
            if (index !== -1) {
              const start = Math.max(0, index - 50);
              const end = Math.min(item.body.length, index + query.length + 50);
              excerpt = item.body.slice(start, end);
              if (start > 0)
                excerpt = `...${excerpt}`;
              if (end < item.body.length)
                excerpt = `${excerpt}...`;
            }
          }

          matched.push({
            title: item.title || "",
            description: item.description,
            path: item._path || "",
            body: item.body,
            excerpt,
          });
        }
      }

      // Sort by relevance (title matches first, then description, then body)
      matched.sort((a, b) => {
        const aTitleMatch = a.title.toLowerCase().includes(queryLower);
        const bTitleMatch = b.title.toLowerCase().includes(queryLower);
        if (aTitleMatch && !bTitleMatch)
          return -1;
        if (!aTitleMatch && bTitleMatch)
          return 1;

        const aDescMatch = a.description?.toLowerCase().includes(queryLower);
        const bDescMatch = b.description?.toLowerCase().includes(queryLower);
        if (aDescMatch && !bDescMatch)
          return -1;
        if (!aDescMatch && bDescMatch)
          return 1;

        return 0;
      });

      return matched.slice(0, 20); // Limit to 20 results
    }
    catch (error) {
      console.error("Search error:", error);
      return [];
    }
  },
  {
    maxAge: 60 * 60, // 1 hour
    name: "search",
    getKey: (event) => {
      const query = getQuery(event).q;
      return query ? `q:${query}` : "default";
    },
  },
);
