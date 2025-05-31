import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, Project } from '../data/projects'

interface ProjectNode2DProps {
  project: Project
  index: number
  hoveredIndex: number | null
  onHover: (index: number | null) => void
}

const ProjectNode2D = ({ project, index, hoveredIndex, onHover }: ProjectNode2DProps) => {
  const [isHovered, setIsHovered] = useState(false)
  
  // Calculate base position in a circle
  const angle = (index / projects.length) * 2 * Math.PI
  const baseRadius = 330
  const baseX = Math.cos(angle) * baseRadius
  const baseY = Math.sin(angle) * baseRadius
  
  // Calculate displaced position when another node is hovered
  const getDisplacedPosition = () => {
    if (hoveredIndex === null || hoveredIndex === index) {
      return { x: baseX, y: baseY }
    }
    
    // Calculate position of hovered node
    const hoveredAngle = (hoveredIndex / projects.length) * 2 * Math.PI
    const hoveredX = Math.cos(hoveredAngle) * baseRadius
    const hoveredY = Math.sin(hoveredAngle) * baseRadius
    
    // Calculate vector from hovered node to this node
    const dx = baseX - hoveredX
    const dy = baseY - hoveredY
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // If too close, push away
    const minDistance = 200 // Minimum distance from expanded node
    if (distance < minDistance && distance > 0) {
      const pushFactor = (minDistance - distance) / distance
      const pushX = dx * pushFactor * 0.5
      const pushY = dy * pushFactor * 0.5
      return {
        x: baseX + pushX,
        y: baseY + pushY
      }
    }
    
    return { x: baseX, y: baseY }
  }
  
  const { x, y } = getDisplacedPosition()
  const isExpanded = hoveredIndex === index
  
  const getSize = () => {
    if (isExpanded) return 300 // Expanded size
    switch (project.size) {
      case 'large': return 120
      case 'medium': return 100
      case 'small': return 85
      default: return 100
    }
  }

  const getProjectIcon = () => {
    const iconMap: { [key: string]: string } = {
      'holoportation': '🥽',
      'daily-ball': '🎮',
      'vibe': '🎵',
      'unitrade': '🛒',
      'choose-movie': '🎬'
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
      'Streamlit': 'devicon-streamlit-plain',
      'WinForms': 'devicon-dot-net-plain',
      'SciPy': 'devicon-pandas-plain'
    }
    
    return project.techStack.map(tech => {
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
    onHover(index)
  }

  const handleHoverEnd = () => {
    setIsHovered(false)
    onHover(null)
  }

  return (
    <motion.div
      className="absolute z-20"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        zIndex: isExpanded ? 50 : 20
      }}
      transition={{ 
        delay: index * 0.3, 
        duration: 0.8, 
        type: "spring",
        left: { duration: 0.6, ease: "easeOut" },
        top: { duration: 0.6, ease: "easeOut" },
        zIndex: { duration: 0 }
      }}
    >
      <motion.div
        className="relative cursor-pointer"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onClick={handleClick}
        animate={{
          y: isExpanded ? 0 : [0, -15, 0],
          rotate: isExpanded ? 0 : [0, 2, 0, -2, 0]
        }}
        transition={{
          duration: isExpanded ? 0.3 : 6 + index * 0.8,
          repeat: isExpanded ? 0 : Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Main project node */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{ width: getSize(), height: getSize() }}
          animate={{
            width: getSize(),
            height: getSize()
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              border: `3px solid ${project.color}`,
              background: `radial-gradient(circle, ${project.color}15, transparent 70%)`,
            }}
            animate={{
              borderRadius: isExpanded ? '12px' : '50%',
              boxShadow: isHovered || isExpanded
                ? `0 0 30px ${project.color}80, 0 0 60px ${project.color}40`
                : `0 0 20px ${project.color}30`
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              repeatType: "reverse",
              borderRadius: { duration: 0.4, ease: "easeOut" }
            }}
          />

          {/* Content area */}
          <div className="relative z-10 text-center p-4 flex flex-col items-center justify-center h-full w-full">
            {/* Normal state content */}
            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center h-full"
                >
                  {/* Project icon */}
                  <motion.div
                    className="text-lg mb-1"
                    animate={{
                      scale: isHovered ? 1.1 : 1
                    }}
                  >
                    {getProjectIcon()}
                  </motion.div>

                  {/* Project title */}
                  <h3 className="text-white text-xs font-medium mb-1 leading-tight">
                    {project.name}
                  </h3>

                  {/* Quick tech icons */}
                  <div className="flex items-center justify-center gap-1">
                    {getTechIcons().slice(0, 3).map(({ tech, iconClass }, iconIndex) => (
                      <i
                        key={iconIndex}
                        className={`${iconClass} text-xs opacity-70`}
                        style={{ color: project.color }}
                        title={tech}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Expanded state content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="flex flex-col items-center justify-start h-full w-full"
                >
                  {/* Project icon - larger */}
                  <motion.div
                    className="text-3xl mb-3"
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.2 }}
                    transition={{ duration: 0.3 }}
                  >
                    {getProjectIcon()}
                  </motion.div>

                  {/* Project title - larger */}
                  <h3 className="text-white text-lg font-bold mb-2 text-center leading-tight">
                    {project.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-300 text-xs mb-3 text-center leading-relaxed px-2">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
                    {getTechIcons().slice(0, 6).map(({ tech, iconClass }, iconIndex) => (
                      <div
                        key={iconIndex}
                        className="flex items-center gap-1 bg-gray-800/50 rounded-md px-2 py-1"
                      >
                        <i
                          className={`${iconClass} text-sm`}
                          style={{ color: project.color }}
                        />
                        <span className="text-gray-300 text-xs">{tech}</span>
                      </div>
                    ))}
                  </div>

                  {/* Link hint */}
                  {project.link && (
                    <motion.div
                      className="text-xs text-gray-400 opacity-80"
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      Click to visit →
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Main container component
const ProjectNodes2D = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <div className="relative w-full h-full">
      {projects.map((project, index) => (
        <ProjectNode2D
          key={project.id}
          project={project}
          index={index}
          hoveredIndex={hoveredIndex}
          onHover={setHoveredIndex}
        />
      ))}
    </div>
  )
}

export default ProjectNodes2D
