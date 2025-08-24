
import { useLayoutEffect } from 'react';
import { SCROLL_CONFIG } from '../config/scroll';
import { useAppContext } from '../contexts/AppContext';

export const useDesktopScroll = () => {
  const { isMobile, setScrollProgress } = useAppContext();

  useLayoutEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const maxScrollDistance = windowHeight * SCROLL_CONFIG.maxScrollFactor;
      const progress = Math.min(currentScrollY / maxScrollDistance, 1);
      setScrollProgress(progress);
    };

    document.body.style.height = `${window.innerHeight * SCROLL_CONFIG.bodyHeightFactor}px`;
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.height = 'auto';
    };
  }, [isMobile, setScrollProgress]);
};
