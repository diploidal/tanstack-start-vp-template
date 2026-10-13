import type { ThemeProviderProps } from "@wrksz/themes";

export const themes = ["light", "dark", "system"] as const;

export type ThemeOption = (typeof themes)[number];

export const isThemeOption = (value: unknown): value is ThemeOption =>
  themes.some((theme) => theme === value);

// Shared by ThemeScript and ThemeProvider - the docs require both to use the same config
export const themeConfig = {
  attribute: "data-theme",
  // Match --background in globals.css
  themeColor: { light: "#ffffff", dark: "#0a0a0a" },
} satisfies Omit<ThemeProviderProps, "children">;
