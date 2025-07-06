
import { useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

export const useDesktopScroll = () => {
  const { isMobile, setScrollProgress } = useAppContext();

  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const maxScrollDistance = windowHeight * 1.5;
      const progress = Math.min(currentScrollY / maxScrollDistance, 1);
      setScrollProgress(progress);
    };

    document.body.style.height = `${window.innerHeight * 2}px`;
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.height = 'auto';
    };
  }, [isMobile, setScrollProgress]);
};
