export interface ThemeColors {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  background: string;
  foreground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  danger: string;
  dangerForeground: string;
  destructive: string;
  destructiveForeground: string;
}

export interface Theme {
  name: string;
  label: string;
  colors: ThemeColors;
}

export const themes: Theme[] = [
  {
    name: 'blue',
    label: '🔵 Blue (Default)',
    colors: {
      primary: '#3b82f6',
      primaryForeground: '#ffffff',
      secondary: '#2e2e2e',
      secondaryForeground: '#ffffff',
      accent: '#f59e0b',
      background: '#ffffff',
      foreground: '#0f172a',
      success: '#10b981',
      successForeground: '#ffffff',
      warning: '#f59e0b',
      warningForeground: '#ffffff',
      danger: '#ef4444',
      dangerForeground: '#ffffff',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
    },
  },
  {
    name: 'violet',
    label: '🟣 Violet',
    colors: {
      primary: '#7c3aed',
      primaryForeground: '#ffffff',
      secondary: '#1e1b4b',
      secondaryForeground: '#ffffff',
      accent: '#a78bfa',
      background: '#ffffff',
      foreground: '#1e1b4b',
      success: '#10b981',
      successForeground: '#ffffff',
      warning: '#f59e0b',
      warningForeground: '#ffffff',
      danger: '#ef4444',
      dangerForeground: '#ffffff',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
    },
  },
  {
    name: 'rose',
    label: '🌹 Rose',
    colors: {
      primary: '#e11d48',
      primaryForeground: '#ffffff',
      secondary: '#3f3f46',
      secondaryForeground: '#ffffff',
      accent: '#fb7185',
      background: '#ffffff',
      foreground: '#18181b',
      success: '#10b981',
      successForeground: '#ffffff',
      warning: '#f59e0b',
      warningForeground: '#ffffff',
      danger: '#ef4444',
      dangerForeground: '#ffffff',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
    },
  },
  {
    name: 'emerald',
    label: '💚 Emerald',
    colors: {
      primary: '#059669',
      primaryForeground: '#ffffff',
      secondary: '#064e3b',
      secondaryForeground: '#ffffff',
      accent: '#34d399',
      background: '#ffffff',
      foreground: '#064e3b',
      success: '#10b981',
      successForeground: '#ffffff',
      warning: '#f59e0b',
      warningForeground: '#ffffff',
      danger: '#ef4444',
      dangerForeground: '#ffffff',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
    },
  },
  {
    name: 'orange',
    label: '🟠 Orange',
    colors: {
      primary: '#ea580c',
      primaryForeground: '#ffffff',
      secondary: '#431407',
      secondaryForeground: '#ffffff',
      accent: '#fb923c',
      background: '#ffffff',
      foreground: '#1c1917',
      success: '#10b981',
      successForeground: '#ffffff',
      warning: '#f59e0b',
      warningForeground: '#ffffff',
      danger: '#ef4444',
      dangerForeground: '#ffffff',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
    },
  },
  {
    name: 'slate',
    label: '⚫ Slate',
    colors: {
      primary: '#475569',
      primaryForeground: '#ffffff',
      secondary: '#0f172a',
      secondaryForeground: '#ffffff',
      accent: '#94a3b8',
      background: '#ffffff',
      foreground: '#0f172a',
      success: '#10b981',
      successForeground: '#ffffff',
      warning: '#f59e0b',
      warningForeground: '#ffffff',
      danger: '#ef4444',
      dangerForeground: '#ffffff',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
    },
  },
];

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const { colors: c } = theme;

  root.style.setProperty('--color-primary', c.primary);
  root.style.setProperty('--color-primary-foreground', c.primaryForeground);
  root.style.setProperty('--color-secondary', c.secondary);
  root.style.setProperty('--color-secondary-foreground', c.secondaryForeground);
  root.style.setProperty('--color-accent', c.accent);
  root.style.setProperty('--color-background', c.background);
  root.style.setProperty('--color-foreground', c.foreground);
  root.style.setProperty('--color-success', c.success);
  root.style.setProperty('--color-success-foreground', c.successForeground);
  root.style.setProperty('--color-warning', c.warning);
  root.style.setProperty('--color-warning-foreground', c.warningForeground);
  root.style.setProperty('--color-danger', c.danger);
  root.style.setProperty('--color-danger-foreground', c.dangerForeground);
  root.style.setProperty('--color-destructive', c.destructive);
  root.style.setProperty('--color-destructive-foreground', c.destructiveForeground);
}
