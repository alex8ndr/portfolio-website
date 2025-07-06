import { themeConfig, type ThemeColors } from '../config/theme';
import { useTheme as useThemeContext } from '../contexts/ThemeContext';

export const useThemeColors = (): ThemeColors => {
    const { theme } = useThemeContext();
    return themeConfig[theme];
};

// Helper hook for combining theme classes
export const useThemeHelpers = () => {
    const { theme, toggleTheme, isDark } = useThemeContext();
    const colors = useThemeColors();

    return {
        theme,
        toggleTheme,
        isDark,
        colors,
        // Utility functions for common combinations
        getCardClasses: (isActive = false, isHovered = false) => {
            let classes = `${colors.cardBackground} ${colors.border}`;
            if (isActive) classes += ` ${colors.cardBackgroundActive} ${colors.borderActive}`;
            else if (isHovered) classes += ` ${colors.cardBackgroundHover} ${colors.borderHover}`;
            return classes;
        },
        getTextClasses: (variant: 'primary' | 'secondary' | 'tertiary' | 'accent' = 'primary') => {
            switch (variant) {
                case 'primary': return colors.textPrimary;
                case 'secondary': return colors.textSecondary;
                case 'tertiary': return colors.textTertiary;
                case 'accent': return colors.textAccent;
                default: return colors.textPrimary;
            }
        }
    };
};
