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
      // Create multiple "pages" worth of scroll, each viewport height
      const totalScrollHeight = windowHeight * 4; // 4 sections total
      const progress = Math.min(currentScrollY / totalScrollHeight, 1);

      setScrollProgress(progress);
    };

    // Create a tall scrollable area
    document.body.style.height = `${window.innerHeight * 5}px`; // 5x viewport height

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

      {/* All content layers positioned absolutely over the same background */}
      <div className="absolute inset-0 pt-16">
        {/* Hero Section - visible when scrollProgress < 0.25 */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${scrollProgress < 0.5 ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <ProfileSection scrollProgress={scrollProgress} />
          <ProjectNodes2D scrollProgress={scrollProgress} />
        </div>

        {/* Skills Section - visible when scrollProgress 0.25-0.5 */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${scrollProgress >= 0.25 && scrollProgress < 0.75 ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <ScrollSections section="skills" scrollProgress={scrollProgress} />
        </div>

        {/* Experience Section - visible when scrollProgress 0.5-0.75 */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${scrollProgress >= 0.5 && scrollProgress < 1.0 ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <ScrollSections section="experience" scrollProgress={scrollProgress} />
        </div>

        {/* Education Section - visible when scrollProgress 0.75-1.0 */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${scrollProgress >= 0.75 ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <ScrollSections section="education" scrollProgress={scrollProgress} />
        </div>
      </div>
    </div>
  );
}

export default App;
