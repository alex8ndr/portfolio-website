import Header from './components/Header'
import ProfileSection from './components/ProfileSection'
import ScrollSections from './components/ScrollSections'
import ProjectNodes2D from './components/ProjectNodes2D'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-32 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-700"></div>
          <div className="absolute top-1/3 right-20 w-5 h-5 bg-purple-300 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 right-1/4 w-3 h-3 bg-blue-300 rounded-full animate-pulse delay-500"></div>        </div>

        <ProfileSection />
        <ProjectNodes2D />
      </section>

      <ScrollSections />
    </div>
  )
}

export default App
