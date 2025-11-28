import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'system';
        }
        return 'system';
    });

    const [resolvedTheme, setResolvedTheme] = useState('dark');

    useEffect(() => {
        const root = window.document.documentElement;

        const applyTheme = (themeName) => {
            if (themeName === 'system') {
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                setResolvedTheme(systemTheme);
                root.classList.remove('light', 'dark');
                root.classList.add(systemTheme);
            } else {
                setResolvedTheme(themeName);
                root.classList.remove('light', 'dark');
                root.classList.add(themeName);
            }
        };

        applyTheme(theme);
        localStorage.setItem('theme', theme);

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                applyTheme('system');
            }
        };
        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    const value = {
        theme,
        setTheme,
        resolvedTheme,
        isDark: resolvedTheme === 'dark',
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
