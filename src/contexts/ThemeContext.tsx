import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === 'undefined') return 'dark';

        const saved = localStorage.getItem('theme');
        if (saved === 'light' || saved === 'dark') {
            return saved;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const [previousTheme, setPreviousTheme] = useState<Theme | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const gradientMap: Record<Theme, string> = {
        light: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-sky-50',
        dark: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
    };

    const toggleTheme = () => {
        setPreviousTheme(theme);
        setIsTransitioning(true);
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove('dark', 'light');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);

        let cleanup: (() => void) | undefined;
        if (isTransitioning) {
            const handleEnd = () => {
                setIsTransitioning(false);
            };
            // Attach listener to document to catch overlay animation end
            document.addEventListener('animationend', handleEnd, { once: true });
            cleanup = () => document.removeEventListener('animationend', handleEnd);
        }
        return () => {
            if (cleanup) cleanup();
        };
    }, [theme, isTransitioning]);

    const isDark = theme === 'dark';

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
            {children}
            {isTransitioning && previousTheme && (
                <div aria-hidden="true" className={`theme-fade-overlay pointer-events-none fixed inset-0 z-[999] ${gradientMap[previousTheme]}`} />
            )}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
