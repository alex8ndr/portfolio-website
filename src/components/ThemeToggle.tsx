import { motion } from 'framer-motion';
import { HiMoon, HiSun } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme, isDark } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className={`relative p-2 rounded-full transition-all duration-300 ${isDark
                    ? 'text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10'
                    : 'text-orange-500 hover:text-orange-600 hover:bg-orange-500/10'
                }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, rotate: -180 }}
            animate={{
                opacity: 1,
                rotate: 0,
                transition: { duration: 0.6, delay: 0.8 }
            }}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            <motion.div
                key={theme}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="text-base 2xl:text-xl 3xl:text-2xl"
            >
                {isDark ? <HiSun /> : <HiMoon />}
            </motion.div>
        </motion.button>
    );
};

export default ThemeToggle;
