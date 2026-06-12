import { useTheme } from "../hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextThemeLabel = theme === "light" ? "Modo escuro" : "Modo claro";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle rounded-lg border px-3 py-2 text-sm font-medium"
      aria-label={`Ativar ${nextThemeLabel.toLowerCase()}`}
    >
      {nextThemeLabel}
    </button>
  );
}
