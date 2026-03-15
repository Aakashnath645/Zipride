import { useTheme as useNextTheme } from 'next-themes';

export function useTheme() {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme();

  const isDark = resolvedTheme === 'dark';
  const isLight = resolvedTheme === 'light';

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return {
    theme: theme || 'system',
    resolvedTheme: resolvedTheme || 'light',
    isDark,
    isLight,
    systemTheme,
    setTheme,
    toggleTheme,
  };
}
