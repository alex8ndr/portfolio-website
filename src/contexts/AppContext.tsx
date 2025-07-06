
import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;
  hoveredSkill: string | null;
  setHoveredSkill: (skill: string | null) => void;
  clearHoveredSkill: () => void;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth <= 768;
  });



  const clearTimeoutRef = React.useRef<number | null>(null);

  const safeSetHoveredSkill = React.useCallback((skill: string | null) => {
    if (clearTimeoutRef.current !== null) {
      clearTimeout(clearTimeoutRef.current);
      clearTimeoutRef.current = null;
    }
    setHoveredSkill(skill);
  }, []);


  const clearHoveredSkill = React.useCallback(() => {
    if (clearTimeoutRef.current !== null) {
      clearTimeout(clearTimeoutRef.current);
      clearTimeoutRef.current = null;
    }
    clearTimeoutRef.current = window.setTimeout(() => {
      setHoveredSkill(null);
      clearTimeoutRef.current = null;
    }, 40);
  }, []);

  return (
    <AppContext.Provider value={{ scrollProgress, setScrollProgress, hoveredSkill, setHoveredSkill: safeSetHoveredSkill, clearHoveredSkill, isMobile, setIsMobile }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
