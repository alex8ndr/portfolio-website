import Background from './components/Background';
import Header from './components/Header';
import ProfileSection from './components/ProfileSection';
import ProjectNodes2D from './components/ProjectNodes2D';
import ScrollSections from './components/ScrollSections';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      <Header />      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-16">
        {/* Dynamic background */}
        <Background />

        <ProfileSection />
        <ProjectNodes2D />
      </section>

      <ScrollSections />
    </div>
  );
}

export default App;
