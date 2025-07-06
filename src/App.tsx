import Background from './components/Background';
import Header from './components/Header';
import MobileLayout from './components/MobileLayout';
import ProfileSection from './components/ProfileSection';
import ProjectNodes2D from './components/ProjectNodes2D';
import ScrollSections from './components/ScrollSections';
import { useAppContext } from './contexts/AppContext';
import { useDesktopScroll } from './hooks/useDesktopScroll';
import { useResponsiveLayout } from './hooks/useResponsiveLayout';
import { useThemeColors } from './hooks/useThemeColors';

function App() {
  const { isMobile, scrollProgress, hoveredSkill, setHoveredSkill } = useAppContext();
  const themeColors = useThemeColors();
  useResponsiveLayout();
  useDesktopScroll();

  if (isMobile) {
    return <MobileLayout />;
  }

  return (
    <div className={`fixed inset-0 bg-gradient-to-br ${themeColors.background} ${themeColors.textPrimary} overflow-hidden transition-colors duration-500`}>
      <div className="absolute inset-0 z-0">
        <Background />
      </div>

      <Header scrollProgress={scrollProgress} />

      {/* Main content area */}
      <div className="absolute inset-0 pt-16">
        {/* Hero Section - Projects and Profile */}
        <div className="absolute inset-0">
          <ProfileSection scrollProgress={scrollProgress} />
          <ProjectNodes2D scrollProgress={scrollProgress} hoveredSkill={hoveredSkill} />
        </div>        {/* Scroll Sections - appear at bottom when scrolled */}        <ScrollSections
          scrollProgress={scrollProgress}
          onSkillHover={setHoveredSkill}
        />
      </div>
    </div>
  );
}

export default App;
