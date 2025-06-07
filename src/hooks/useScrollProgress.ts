import { useEffect, useState } from 'react';

export interface ScrollProgress {
    scrollY: number;
    scrollProgress: number; // 0 to 1
    windowHeight: number;
    documentHeight: number;
}

export const useScrollProgress = () => {
    const [scrollData, setScrollData] = useState<ScrollProgress>({
        scrollY: 0,
        scrollProgress: 0,
        windowHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
        documentHeight: typeof document !== 'undefined' ? document.documentElement.scrollHeight : 0,
    });

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollProgress = Math.min(scrollY / (documentHeight - windowHeight), 1);

            setScrollData({
                scrollY,
                scrollProgress,
                windowHeight,
                documentHeight,
            });
        };

        const handleResize = () => {
            handleScroll(); // Recalculate on resize
        };

        handleScroll(); // Initial calculation
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return scrollData;
};
