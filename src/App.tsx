import { useEffect, useState } from 'react';
import Background from './components/Background';
import Header from './components/Header';
import MobileLayout from './components/MobileLayout';
import ProfileSection from './components/ProfileSection';
import ProjectNodes2D from './components/ProjectNodes2D';
import ScrollSections from './components/ScrollSections';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desktop scroll handling
  useEffect(() => {
    // Only setup scroll handling for desktop
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
  }, [isMobile]);

  // If mobile, render mobile layout
  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      <Header />

      {/* Main content area */}
      <div className="absolute inset-0 pt-16">
        {/* Hero Section - Projects and Profile */}
        <div className="absolute inset-0">
          <ProfileSection scrollProgress={scrollProgress} />
          <ProjectNodes2D scrollProgress={scrollProgress} hoveredSkill={hoveredSkill} />
        </div>
        {/* Scroll Sections - appear at bottom when scrolled */}
        <ScrollSections scrollProgress={scrollProgress} onSkillHover={setHoveredSkill} />
      </div>
    </div>
  );
}

export default App;
