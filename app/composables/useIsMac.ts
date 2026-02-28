import type { Ref } from "vue";
import { onMounted, ref } from "vue";

/**
 * Composable to detect if the user is on a Mac.
 * Uses a robust platform check with fallbacks for modern and legacy browsers.
 * Initialized to false to avoid SSR hydration mismatches.
 */
export function useIsMac(): Ref<boolean> {
  const isMac = ref(false);
  onMounted(() => {
    const nav = navigator as any;
    const platform = nav.userAgentData?.platform
      ?? nav.platform
      ?? nav.userAgent;
    isMac.value = String(platform).toUpperCase().includes("MAC");
  });
  return isMac;
}
