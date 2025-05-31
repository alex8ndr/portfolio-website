import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, Project } from '../data/projects'

/**
 * ProjectNodes2D Component
 * 
 * Features:
 * - Dynamic positioning that adapts to the number of projects
 * - Avoids overlapping with the central profile section
 * - Responsive collision detection that moves nodes away when one expands
 * - Stays within viewport bounds regardless of screen size
 * - Flexible layout that works with any number of projects
 */

interface ProjectNode2DProps {
  project: Project
  index: number
  hoveredIndex: number | null
  onHover: (index: number | null) => void
  containerBounds: { width: number; height: number }
}

const ProjectNode2D = ({ project, index, hoveredIndex, onHover, containerBounds }: ProjectNode2DProps) => {
  const [isHovered, setIsHovered] = useState(false)
    // Dynamic positioning based on viewport and number of projects
  const getBasePosition = () => {
    const { width, height } = containerBounds
    const totalProjects = projects.length
    
    // Calculate safe area boundaries (accounting for expanded node size)
    const expandedSize = 300
    const margin = expandedSize / 2 // Extra margin for safety

    // Reserve center area for profile section (roughly 600x600px)
    const profileCenterWidth = 600
    const profileCenterHeight = 600
    
    // Calculate available areas around the profile
    const safeWidth = width - margin * 2
    const safeHeight = height - margin * 2
    
    // Use different layouts based on number of projects
    if (totalProjects <= 4) {
      // Place nodes in corners around profile
      const positions = [
        { x: -safeWidth / 3, y: -safeHeight / 3 }, // Top left
        { x: safeWidth / 3, y: -safeHeight / 3 },  // Top right
        { x: -safeWidth / 3, y: safeHeight / 3 },  // Bottom left
        { x: safeWidth / 3, y: safeHeight / 3 }    // Bottom right
      ]
      return positions[index] || { x: 0, y: 0 }
    } else if (totalProjects <= 8) {
      // Octagon layout around the profile center
      const angle = (index / totalProjects) * 2 * Math.PI
      const radiusX = Math.max(profileCenterWidth / 2 + 120, 250)
      const radiusY = Math.max(profileCenterHeight / 2 + 100, 200)
      
      // Ensure we don't go beyond safe bounds
      const maxRadiusX = Math.min(radiusX, safeWidth / 2.2)
      const maxRadiusY = Math.min(radiusY, safeHeight / 2.2)
      
      return {
        x: Math.cos(angle) * maxRadiusX,
        y: Math.sin(angle) * maxRadiusY
      }
    } else {
      // For many projects, use a larger circle/ellipse
      const angle = (index / totalProjects) * 2 * Math.PI
      const radiusX = Math.max(profileCenterWidth / 2 + 180, 320)
      const radiusY = Math.max(profileCenterHeight / 2 + 140, 260)
      
      // Ensure we don't go beyond safe bounds
      const maxRadiusX = Math.min(radiusX, safeWidth / 2.1)
      const maxRadiusY = Math.min(radiusY, safeHeight / 2.1)
      
      return {
        x: Math.cos(angle) * maxRadiusX,
        y: Math.sin(angle) * maxRadiusY
      }
    }
  }
  
  const basePosition = getBasePosition()
    // Enhanced collision avoidance
  const getDisplacedPosition = () => {
    if (hoveredIndex === null || hoveredIndex === index) {
      return basePosition
    }
    
    const hoveredPosition = getHoveredNodePosition()
    const dx = basePosition.x - hoveredPosition.x
    const dy = basePosition.y - hoveredPosition.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // Expanded node takes up more space
    const expandedRadius = 180 // Increased from 150 for better spacing
    const nodeRadius = 60 // Half of normal node size
    const minDistance = expandedRadius + nodeRadius + 40 // Increased padding
    
    if (distance < minDistance && distance > 0) {
      // Push away from expanded node with stronger force
      const pushFactor = (minDistance - distance) / distance * 1.2 // Increased multiplier
      let pushX = dx * pushFactor
      let pushY = dy * pushFactor
      
      // Ensure pushed position stays within bounds
      const { width, height } = containerBounds
      const maxX = width / 2 - 120 // Increased margin
      const maxY = height / 2 - 120
      
      // Clamp to bounds but allow more movement
      const clampedPushX = Math.max(-maxX - basePosition.x, Math.min(maxX - basePosition.x, pushX))
      const clampedPushY = Math.max(-maxY - basePosition.y, Math.min(maxY - basePosition.y, pushY))
      
      // If clamping reduced the push significantly, try to push in the perpendicular direction
      if (Math.abs(clampedPushX) < Math.abs(pushX) * 0.5 || Math.abs(clampedPushY) < Math.abs(pushY) * 0.5) {
        // Push perpendicular to the line connecting the nodes
        const perpX = -dy / distance * (minDistance - distance) * 0.8
        const perpY = dx / distance * (minDistance - distance) * 0.8
        
        return {
          x: Math.max(-maxX, Math.min(maxX, basePosition.x + perpX)),
          y: Math.max(-maxY, Math.min(maxY, basePosition.y + perpY))
        }
      }
      
      return {
        x: basePosition.x + clampedPushX,
        y: basePosition.y + clampedPushY
      }
    }
    
    return basePosition
  }
    const getHoveredNodePosition = () => {
    if (hoveredIndex === null) return { x: 0, y: 0 }
    
    // Use the same positioning logic as getBasePosition for the hovered node
    const { width, height } = containerBounds
    const totalProjects = projects.length
    const expandedSize = 300
    const margin = expandedSize / 2 + 50
    const profileCenterWidth = 400
    const profileCenterHeight = 400
    const safeWidth = width - margin * 2
    const safeHeight = height - margin * 2
    
    if (totalProjects <= 4) {
      const positions = [
        { x: -safeWidth / 3, y: -safeHeight / 3 },
        { x: safeWidth / 3, y: -safeHeight / 3 },
        { x: -safeWidth / 3, y: safeHeight / 3 },
        { x: safeWidth / 3, y: safeHeight / 3 }
      ]
      return positions[hoveredIndex] || { x: 0, y: 0 }
    } else if (totalProjects <= 8) {
      const angle = (hoveredIndex / totalProjects) * 2 * Math.PI
      const radiusX = Math.max(profileCenterWidth / 2 + 120, 250)
      const radiusY = Math.max(profileCenterHeight / 2 + 100, 200)
      const maxRadiusX = Math.min(radiusX, safeWidth / 2.2)
      const maxRadiusY = Math.min(radiusY, safeHeight / 2.2)
      
      return {
        x: Math.cos(angle) * maxRadiusX,
        y: Math.sin(angle) * maxRadiusY
      }
    } else {
      const angle = (hoveredIndex / totalProjects) * 2 * Math.PI
      const radiusX = Math.max(profileCenterWidth / 2 + 180, 320)
      const radiusY = Math.max(profileCenterHeight / 2 + 140, 260)
      const maxRadiusX = Math.min(radiusX, safeWidth / 2.1)
      const maxRadiusY = Math.min(radiusY, safeHeight / 2.1)
      
      return {
        x: Math.cos(angle) * maxRadiusX,
        y: Math.sin(angle) * maxRadiusY
      }
    }
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
      initial={{ scale: 0, opacity: 0 }}      animate={{ 
        scale: 1, 
        opacity: 1,
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        zIndex: isExpanded ? 50 : 20
      }}
      transition={{ 
        delay: index * 0.2, // Reduced delay for faster initial animation
        duration: 0.8, 
        type: "spring",
        left: { duration: 0.4, ease: "easeOut" }, // Faster position transitions
        top: { duration: 0.4, ease: "easeOut" },
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
        >          {/* Outer glow ring with opaque background */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              border: `3px solid ${project.color}`,
              background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)`,
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
  const [containerBounds, setContainerBounds] = useState({ width: 1200, height: 800 })

  useEffect(() => {
    const updateBounds = () => {
      // Use viewport dimensions with some padding, but cap at reasonable maximums
      const width = Math.min(window.innerWidth * 0.9, 1600) // 90% of viewport width, max 1600px
      const height = Math.min(window.innerHeight * 0.8, 1000) // 80% of viewport height, max 1000px
      setContainerBounds({ width, height })
    }

    updateBounds()
    window.addEventListener('resize', updateBounds)
    
    return () => window.removeEventListener('resize', updateBounds)
  }, [])

  return (
    <div className="relative w-full h-full">
      {projects.map((project, index) => (
        <ProjectNode2D
          key={project.id}
          project={project}
          index={index}
          hoveredIndex={hoveredIndex}
          onHover={setHoveredIndex}
          containerBounds={containerBounds}
        />
      ))}
    </div>
  )
}

export default ProjectNodes2D
