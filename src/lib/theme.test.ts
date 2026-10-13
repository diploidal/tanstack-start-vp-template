import { describe, expect, it } from "vite-plus/test";

import { isThemeOption } from "@/lib/theme";

describe("isThemeOption", () => {
  it.each(["light", "dark", "system"])("accepts %s", (value) => {
    expect(isThemeOption(value)).toBe(true);
  });

  it.each(["", "Dark", "sepia", 1, undefined])("rejects %s", (value) => {
    expect(isThemeOption(value)).toBe(false);
  });
});
