
import { useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';

export const useResponsiveLayout = () => {
  const { setIsMobile } = useAppContext();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', checkMobile);
    checkMobile(); // Initial check

    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);
};
