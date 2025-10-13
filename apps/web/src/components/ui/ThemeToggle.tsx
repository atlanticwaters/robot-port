'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'robot-port:theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  root.dataset.theme = theme;
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

  useEffect(() => {
    applyTheme(theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const handler = (event: MediaQueryListEvent) => {
      const system = event.matches ? 'dark' : 'light';
      setTheme((current) => {
        const stored = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
        if (stored) return current;
        return system;
      });
    };
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  const label = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/80 shadow-sm transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label={label}
      title={label}
    >
      <Sun
        className={`absolute h-4 w-4 text-foreground transition-transform duration-300 ${theme === 'dark' ? 'scale-0 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'}`}
      />
      <Moon
        className={`absolute h-4 w-4 text-foreground transition-transform duration-300 ${theme === 'dark' ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 -rotate-90'}`}
      />
    </button>
  );
}
