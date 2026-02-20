export type Layout = "fixed" | "full";
export type PackageManager = "pnpm" | "npm" | "yarn" | "bun";
export type InstallationType = "cli" | "manual";

export type IUserConfig = {
  layout: Layout;
  packageManager: PackageManager;
  installationType: InstallationType;
};

export const useConfig = createSharedComposable(() => {
  const config = useCookie<IUserConfig>("user-config", {
    default: () => ({
      layout: "fixed",
      packageManager: "pnpm",
      installationType: "cli",
    }),
    path: "/",
    maxAge: 31536000,
    sameSite: "lax",
  });

  const isLayoutFull = computed(() => config.value.layout === "full");

  return {
    config,
    isLayoutFull,
  };
});
