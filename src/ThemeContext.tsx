import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a type for your context data
type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

// Create your context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define a type for your custom hook
type UseThemeType = () => ThemeContextType;

// Define a type for the ThemeProvider props
type ThemeProviderProps = {
  children: ReactNode;
};

// Create a custom hook to access the context
export const useTheme: UseThemeType = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
