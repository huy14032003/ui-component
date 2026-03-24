import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { themes, applyTheme, type Theme } from './themes';

const STORAGE_KEY = 'ui-theme';

interface ThemeContextValue {
  currentTheme: Theme;
  setTheme: (name: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextValue>({
  currentTheme: themes[0],
  setTheme: () => {},
  themes,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return themes.find(t => t.name === saved) ?? themes[0];
  });

  useEffect(() => {
    applyTheme(currentTheme);
  }, [currentTheme]);

  const setTheme = (name: string) => {
    const found = themes.find(t => t.name === name);
    if (!found) return;
    localStorage.setItem(STORAGE_KEY, name);
    setCurrentTheme(found);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
