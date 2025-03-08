'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: 'light' | 'dark'; // The actual theme (light/dark) after resolving system preference
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Apply theme when it changes
  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    const isDark = theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    setResolvedTheme(isDark ? 'dark' : 'light');
    
    root.classList.remove('light', 'dark');
    root.classList.add(isDark ? 'dark' : 'light');

    // Update localStorage
    localStorage.setItem('hhs-heart-theme', theme);
  }, [theme, mounted]);

  // Handle system theme changes
  useEffect(() => {
    if (!mounted) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement;
        const isDark = mediaQuery.matches;
        
        setResolvedTheme(isDark ? 'dark' : 'light');
        
        root.classList.remove('light', 'dark');
        root.classList.add(isDark ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  // Initialize theme from localStorage
  useEffect(() => {
    // Try to get saved theme from localStorage
    const savedTheme = localStorage.getItem('hhs-heart-theme') as Theme | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // If no saved theme, detect preferred color scheme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setResolvedTheme(prefersDark ? 'dark' : 'light');
    }
    
    setMounted(true);
  }, []);

  // Don't render anything until the component has mounted to avoid hydration errors
  // This ensures the theme is consistent between server and client
  const providerValue = {
    theme,
    setTheme,
    resolvedTheme
  };

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 