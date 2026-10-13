import { useHydrated, useTheme } from "@wrksz/themes/client";
import type { LucideIcon } from "lucide-react";
import { Monitor, Moon, Sun } from "lucide-react";
import type { Key } from "react-aria-components";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { isThemeOption } from "@/lib/theme";
import type { ThemeOption } from "@/lib/theme";

const themeOptions = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
] satisfies Array<{ value: ThemeOption; label: string; Icon: LucideIcon }>;

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const isHydrated = useHydrated();
  // Theme is unknown on the server - keep nothing selected until hydrated to avoid a mismatch
  const selectedKeys = isHydrated && theme ? [theme] : [];

  const handleSelectionChange = (keys: Set<Key>) => {
    const [nextTheme] = keys;
    if (!isThemeOption(nextTheme)) return;
    setTheme(nextTheme);
  };

  return (
    <ToggleGroup
      aria-label="Theme"
      variant="outline"
      disallowEmptySelection
      selectedKeys={selectedKeys}
      onSelectionChange={handleSelectionChange}
    >
      {themeOptions.map(({ value, label, Icon }) => (
        <ToggleGroupItem key={value} id={value} aria-label={label}>
          <Icon />
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
