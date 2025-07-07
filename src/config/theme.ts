export const themeConfig = {
    light: {
        // Main backgrounds
        background: 'from-blue-50 via-indigo-50 to-sky-50',
        backgroundSolid: 'bg-blue-50',

        // Card backgrounds
        cardBackground: 'bg-white',
        cardBackgroundHover: 'bg-blue-100',
        cardBackgroundActive: 'bg-blue-100',

        // Header
        headerBackground: 'bg-white/90',

        // Text colors
        textPrimary: 'text-slate-800',
        textSecondary: 'text-slate-600',
        textTertiary: 'text-slate-500',
        textAccent: 'text-blue-600',

        // Borders
        border: 'border-slate-200/60',
        borderHover: 'border-blue-300/60',
        borderActive: 'border-blue-500/60',

        // Gradients
        gradientPrimary: 'from-blue-500 to-indigo-600',
        gradientSecondary: 'from-indigo-400 to-blue-500',
        gradientText: 'from-blue-600 to-indigo-700',

        // Button states
        buttonHover: 'hover:bg-blue-100/80',

        // Special elements
        skillActive: 'bg-blue-600/30 border-blue-500',
        skillInactive: 'bg-slate-100/60 border-slate-300/40',
        skillHover: 'hover:bg-blue-50/80',
        skillHoverBg: 'bg-blue-200',
        skillHoverBorder: 'border-blue-400',

        // Scrollbar
        scrollbarTrack: 'rgba(148, 163, 184, 0.3)',
        scrollbarThumb: 'rgba(59, 130, 246, 0.6)',
        scrollbarThumbHover: 'rgba(59, 130, 246, 0.8)',
    },
    dark: {
        // Main backgrounds  
        background: 'from-slate-900 via-slate-800 to-slate-900',
        backgroundSolid: 'bg-slate-900',

        // Card backgrounds
        cardBackground: 'bg-slate-800',
        cardBackgroundHover: 'bg-slate-700',
        cardBackgroundActive: 'bg-slate-700',

        // Header
        headerBackground: 'bg-slate-900/80',

        // Text colors
        textPrimary: 'text-white',
        textSecondary: 'text-gray-200',
        textTertiary: 'text-gray-300',
        textAccent: 'text-purple-400',

        // Borders
        border: 'border-gray-700/50',
        borderHover: 'border-purple-500/50',
        borderActive: 'border-purple-500/50',

        // Gradients
        gradientPrimary: 'from-purple-500 to-blue-500',
        gradientSecondary: 'from-purple-400 to-blue-400',
        gradientText: 'from-purple-400 to-blue-400',

        // Button states
        buttonHover: 'hover:bg-slate-700/50',

        // Special elements
        skillActive: 'bg-purple-600/30 border-purple-500',
        skillInactive: 'bg-slate-700/30 border-gray-600/30',
        skillHover: 'bg-slate-700/50',
        skillHoverBg: 'bg-purple-500/80',
        skillHoverBorder: 'border-purple-400',

        // Scrollbar
        scrollbarTrack: 'rgba(30, 41, 59, 0.5)',
        scrollbarThumb: 'rgba(139, 92, 246, 0.5)',
        scrollbarThumbHover: 'rgba(139, 92, 246, 0.7)',
    }
};

export type ThemeColors = typeof themeConfig.light;
