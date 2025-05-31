import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, Project } from '../data/projects'

interface ProjectNode2DProps {
  project: Project
  index: number
  onHover: (project: Project | null, position?: { x: number; y: number }) => void
}

const ProjectNode2D = ({ project, index, onHover }: ProjectNode2DProps) => {
  const [isHovered, setIsHovered] = useState(false)  // Calculate position in a larger circle, further from center
  const angle = (index / projects.length) * 2 * Math.PI
  const radius = 330 // Increased to accommodate larger nodes
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius

  const getSize = () => {
    switch (project.size) {
      case 'large': return 120
      case 'medium': return 100
      case 'small': return 85
      default: return 100
    }
  }

  const getProjectIcon = () => {
    const iconMap: { [key: string]: string } = {
      'holoportation': '🥽', // VR/AR headset
      'daily-ball': '🎮', // Gaming
      'vibe': '🎵', // Music
      'unitrade': '🛒', // Shopping/marketplace
      'choose-movie': '🎬' // Movies
    }
    return iconMap[project.id] || '💼'
  }
  const getTechIcons = () => {
    const techIconMap: { [key: string]: string } = {
      'C++': 'devicon-cplusplus-plain',
      'C#': 'devicon-csharp-plain',
      'Python': 'devicon-python-plain',
      'OpenCV': 'devicon-opencv-plain',
      'Unity': 'devicon-unity-plain',
      'JavaScript': 'devicon-javascript-plain',
      'HTML/CSS': 'devicon-html5-plain',
      'Java': 'devicon-java-plain',
      'Spring Boot': 'devicon-spring-plain',
      'React': 'devicon-react-original',
      'PostgreSQL': 'devicon-postgresql-plain',
      'Pandas': 'devicon-pandas-plain',
      'NumPy': 'devicon-numpy-original',
      'Streamlit': 'devicon-streamlit-plain', // Streamlit uses Python icon as fallback
      'WinForms': 'devicon-dot-net-plain',
      'SciPy': 'devicon-pandas-plain' // SciPy uses Pandas icon as fallback
    }
    
    // Get the 3 most prominent technologies for display
    return project.techStack.slice(0, 3).map(tech => {
      const iconClass = techIconMap[tech]
      return iconClass ? { tech, iconClass } : { tech, iconClass: 'devicon-code-plain' }
    })
  }

  const handleClick = () => {
    if (project.link) {
      window.open(project.link, '_blank')
    }
  }

  const handleHoverStart = () => {
    setIsHovered(true)
    // Calculate the actual screen position of the node
    const nodeScreenX = window.innerWidth / 2 + x
    const nodeScreenY = window.innerHeight / 2 + y
    onHover(project, { x: nodeScreenX, y: nodeScreenY })
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
    onHover(null)
  }

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.3, duration: 0.8, type: "spring" }}
    >
      <motion.div
        className="relative cursor-pointer"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onClick={handleClick}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 2, 0, -2, 0]
        }}
        transition={{
          duration: 6 + index * 0.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Main project node - transparent ring */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{ width: getSize(), height: getSize() }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: `3px solid ${project.color}`,
              background: `radial-gradient(circle, ${project.color}15, transparent 70%)`,
            }}
            animate={{
              boxShadow: isHovered
                ? [`0 0 20px ${project.color}60, 0 0 40px ${project.color}30`, `0 0 30px ${project.color}80, 0 0 60px ${project.color}40`]
                : [`0 0 15px ${project.color}40`, `0 0 20px ${project.color}30`]
            }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          />          {/* Inner content area */}
          <div className="relative z-10 text-center p-2 flex flex-col items-center justify-center h-full">
            {/* Project icon */}            <motion.div
              className="text-lg mb-1"
              animate={{
                scale: isHovered ? 1.1 : 1
              }}
            >
              {getProjectIcon()}
            </motion.div>

            {/* Project name */}
            <motion.div
              className="text-white font-bold mb-2 leading-tight text-center px-1"              style={{
                fontSize: project.size === 'large' ? '13px' : project.size === 'medium' ? '12px' : '11px',
                color: project.color,
                maxWidth: '90%',
                lineHeight: '1.2'
              }}
              animate={{
                textShadow: isHovered
                  ? `0 0 10px ${project.color}80`
                  : `0 0 5px ${project.color}40`
              }}
            >
              {project.name}
            </motion.div>            {/* Tech stack icons */}
            <div className="flex gap-1.5 justify-center">
              {getTechIcons().map(({ tech, iconClass }, index) => (
                <motion.i
                  key={tech}
                  className={`${iconClass} text-gray-300`}                  style={{ 
                    fontSize: project.size === 'large' ? '20px' : project.size === 'medium' ? '16px' : '14px'
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    color: isHovered ? project.color : '#d1d5db'
                  }}
                  transition={{ delay: index * 0.1 }}
                  title={tech}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Separate tooltip component that renders at the top level with higher z-index
const ProjectTooltip = ({ project, position }: { project: Project | null; position?: { x: number; y: number } }) => {
  if (!project || !position) return null

  // Determine the best position for the tooltip
  const isRightSide = position.x > window.innerWidth / 2
  const tooltipX = isRightSide ? position.x - 370 : position.x + 50 // 370 = tooltip width + some margin
  const tooltipY = Math.max(20, Math.min(position.y - 200, window.innerHeight - 420)) // Keep tooltip on screen

  return (
    <AnimatePresence>
      <motion.div
        className="fixed z-[9999] pointer-events-none"
        style={{
          left: `${tooltipX}px`,
          top: `${tooltipY}px`,
          width: '350px'
        }}
        initial={{ opacity: 0, x: isRightSide ? 50 : -50, scale: 0.9 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: isRightSide ? 50 : -50, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Backdrop for better visibility - now solid and no blur */}
        <div className="absolute inset-0 bg-slate-900 rounded-xl" />

        <div
          className="relative bg-slate-900 rounded-xl border-2 shadow-2xl overflow-hidden pointer-events-auto"
          style={{ borderColor: `${project.color}60` }}
        >
          {/* Header */}
          <div
            className="p-4 border-b"
            style={{
              background: `linear-gradient(135deg, ${project.color}20, ${project.color}05)`,
              borderBottomColor: `${project.color}30`
            }}
          >
            <h3 className="text-white font-bold text-xl mb-1">{project.name}</h3>
            <p className="text-gray-300 text-sm">{project.timeline}</p>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Tech stack */}
            <div className="mb-4">
              <h4 className="text-gray-200 font-semibold text-sm mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-full border"
                    style={{
                      backgroundColor: `${project.color}15`,
                      borderColor: `${project.color}40`,
                      color: project.color
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Action button */}
            {project.link && (
              <motion.button
                className="w-full py-2 px-4 rounded-lg font-medium text-white border-2 transition-all duration-200"
                style={{
                  backgroundColor: `${project.color}20`,
                  borderColor: project.color,
                  color: project.color
                }}
                whileHover={{
                  backgroundColor: `${project.color}30`,
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
              >
                Visit Live Demo →
              </motion.button>
            )}

            {!project.link && (
              <div className="w-full py-2 px-4 rounded-lg font-medium text-center border-2 border-gray-600 text-gray-400">
                Private Project
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

const ProjectNodes2D = () => {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | undefined>(undefined)

  const handleHover = (project: Project | null, position?: { x: number; y: number }) => {
    setHoveredProject(project)
    setTooltipPosition(position)
  }

  return (
    <>
      <div className="absolute inset-0 z-10">
        {/* Central connection point */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full border-2 border-gray-400 bg-gray-500/20 backdrop-blur-sm"
          style={{ transform: 'translate(-50%, -50%)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {projects.map((project, index) => (
          <ProjectNode2D key={project.id} project={project} index={index} onHover={handleHover} />
        ))}
      </div>
      
      {/* Tooltip rendered at the top level to avoid z-index conflicts */}
      <ProjectTooltip project={hoveredProject} position={tooltipPosition} />
    </>
  )
}

export default ProjectNodes2D
