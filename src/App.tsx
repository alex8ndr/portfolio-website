import { useEffect, useState } from 'react';
import Background from './components/Background';
import Header from './components/Header';
import ProfileSection from './components/ProfileSection';
import ProjectNodes2D from './components/ProjectNodes2D';
import ScrollSections from './components/ScrollSections';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      // Simplified scroll calculation for single-page experience
      const totalScrollHeight = windowHeight * 2; // Only need 2x viewport height
      const progress = Math.min(currentScrollY / totalScrollHeight, 1);

      setScrollProgress(progress);
    };

    // Create a scrollable area for transitions
    document.body.style.height = `${window.innerHeight * 3}px`; // 3x viewport height

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.height = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Fixed background that persists throughout scroll */}
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      <Header />

      {/* Main content area */}
      <div className="absolute inset-0 pt-16">
        {/* Hero Section - Projects and Profile */}
        <div className="absolute inset-0">
          <ProfileSection scrollProgress={scrollProgress} />
          <ProjectNodes2D scrollProgress={scrollProgress} />
        </div>

        {/* Scroll Sections - appear at bottom when scrolled */}
        <ScrollSections scrollProgress={scrollProgress} />
      </div>
    </div>
  );
}

export default App;
