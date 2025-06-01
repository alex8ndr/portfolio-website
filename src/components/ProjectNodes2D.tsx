import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, Project } from '../data/projects'
import { 
  BsHeadsetVr, 
  BsMusicNoteBeamed, 
  BsBagFill, 
  BsCameraReelsFill 
} from 'react-icons/bs'
import { FaGamepad } from 'react-icons/fa'

/**
 * Configuration object for easy customization of project nodes
 * Edit these values to adjust the appearance and behavior of project nodes
 */
const NODE_CONFIG = {
  // Node sizes for different project sizes
  sizes: {
    small: 85,
    medium: 100,
    large: 120,
  },
  
  // Expanded node configuration
  expanded: {
    minHeight: 260,
    baseHeight: 60, // Icon space
    padding: 20,
  },
    // Typography sizes for each node size
  typography: {
    // Typography for small nodes
    small: {
      normal: {
        iconSize: 'text-sm',
        titleSize: 'text-xs',
        techIconSize: 'text-xs',
      },
      expanded: {
        iconSize: 'text-2xl',
        titleSize: 'text-base',
        descriptionSize: 'text-xs',
        techIconSize: 'text-xs',
        techTextSize: 'text-xs',
        linkHintSize: 'text-xs',
      }
    },
    // Typography for medium nodes
    medium: {
      normal: {
        iconSize: 'text-lg',
        titleSize: 'text-xs',
        techIconSize: 'text-sm',
      },
      expanded: {
        iconSize: 'text-2xl',
        titleSize: 'text-base',
        descriptionSize: 'text-xs',
        techIconSize: 'text-xs',
        techTextSize: 'text-xs',
        linkHintSize: 'text-xs',
      }
    },
    // Typography for large nodes
    large: {
      normal: {
        iconSize: 'text-xl',
        titleSize: 'text-sm',
        techIconSize: 'text-lg',
      },
      expanded: {
        iconSize: 'text-2xl',
        titleSize: 'text-base',
        descriptionSize: 'text-xs',
        techIconSize: 'text-xs',
        techTextSize: 'text-xs',
        linkHintSize: 'text-xs',
      }
    }
  },
  
  // Layout spacing
  spacing: {
    // Normal state spacing
    normal: {
      iconMarginBottom: 'mb-2',
      titleMarginBottom: 'mb-1',
      techIconGap: 'gap-1',
    },
    // Expanded state spacing
    expanded: {
      iconMarginBottom: 'mb-3',
      titleMarginBottom: 'mb-2',
      descriptionMarginBottom: 'mb-2',
      techStackMarginBottom: 'mb-3',
      techItemGap: 'gap-1.5',
      techItemPadding: 'px-1.5 py-0.5',
    }
  },
  
  // Layout calculations
  layout: {
    profileCenter: {
      width: 600,
      height: 600,
    },
    collisionPadding: 40,
    nodeRadius: 60,
    // Text calculations for expanded size
    text: {
      titleHeightSingle: 35,
      titleHeightMultiLine: 50,
      titleCharThreshold: 15,
      descriptionCharsPerLine: 42,
      descriptionLineHeight: 14,
      descriptionMinHeight: 40,
      techItemsPerRow: 2,
      techRowHeight: 24,
      linkHeight: 20,
    }
  },
  
  // Animation settings
  animation: {
    initialDelay: 0.2, // Delay between each node appearing
    positionDuration: 0.4,
    sizeDuration: 0.4,
    hoverDuration: 0.3,
    expandedContentDelay: 0.1,
    floatDuration: 6, // Base duration for floating animation
    floatOffset: 15, // Pixels to float up/down
  }
}

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
  // Helper function to calculate expanded size for any project using configuration
  const getExpandedSize = (proj: Project) => {
    const { expanded, layout } = NODE_CONFIG
    const { text } = layout
    
    let calculatedHeight = expanded.baseHeight + expanded.padding
    
    // Add title height
    const titleHeight = proj.name.length > text.titleCharThreshold 
      ? text.titleHeightMultiLine 
      : text.titleHeightSingle
    calculatedHeight += titleHeight
    
    // Add description height
    const descriptionLines = Math.ceil(proj.description.length / text.descriptionCharsPerLine)
    const descriptionHeight = Math.max(
      descriptionLines * text.descriptionLineHeight + 16, 
      text.descriptionMinHeight
    )
    calculatedHeight += descriptionHeight
    
    // Add tech stack height
    const techStackRows = Math.ceil(proj.techStack.length / text.techItemsPerRow)
    const techStackHeight = techStackRows * text.techRowHeight + 16
    calculatedHeight += techStackHeight
    
    // Add link height if present
    if (proj.link) {
      calculatedHeight += text.linkHeight
    }
    
    return calculatedHeight
  }
  
  // Dynamic positioning based on viewport and number of projects
  const getBasePosition = () => {
    const { width, height } = containerBounds
    const { layout } = NODE_CONFIG
    const totalProjects = projects.length
    
    // Calculate safe area boundaries (accounting for largest possible expanded node size)
    const maxExpandedSize = Math.max(...projects.map(p => getExpandedSize(p)))
    const margin = maxExpandedSize / 2 // Extra margin for safety

    // Reserve center area for profile section
    const { profileCenter } = layout
    
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
      const radiusX = Math.max(profileCenter.width / 2 + 120, 250)
      const radiusY = Math.max(profileCenter.height / 2 + 100, 200)
      
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
      const radiusX = Math.max(profileCenter.width / 2 + 180, 320)
      const radiusY = Math.max(profileCenter.height / 2 + 140, 260)
      
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
  
  // Enhanced collision avoidance using configuration
  const getDisplacedPosition = () => {
    if (hoveredIndex === null || hoveredIndex === index) {
      return basePosition
    }
    
    const { layout } = NODE_CONFIG
    const hoveredPosition = getHoveredNodePosition()
    const dx = basePosition.x - hoveredPosition.x
    const dy = basePosition.y - hoveredPosition.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    
    // Get the actual expanded size of the hovered node
    const hoveredProject = projects[hoveredIndex]
    const hoveredExpandedSize = getExpandedSize(hoveredProject)
    const expandedRadius = hoveredExpandedSize / 2
    const nodeRadius = layout.nodeRadius / 2 // Half of normal node size
    const minDistance = expandedRadius + nodeRadius + layout.collisionPadding
    
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
    const { layout } = NODE_CONFIG
    const totalProjects = projects.length
    const maxExpandedSize = Math.max(...projects.map(p => getExpandedSize(p)))
    const margin = maxExpandedSize / 2 + 50
    const { profileCenter } = layout
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
      const radiusX = Math.max(profileCenter.width / 2 + 120, 250)
      const radiusY = Math.max(profileCenter.height / 2 + 100, 200)
      const maxRadiusX = Math.min(radiusX, safeWidth / 2.2)
      const maxRadiusY = Math.min(radiusY, safeHeight / 2.2)
      
      return {
        x: Math.cos(angle) * maxRadiusX,
        y: Math.sin(angle) * maxRadiusY
      }
    } else {
      const angle = (hoveredIndex / totalProjects) * 2 * Math.PI
      const radiusX = Math.max(profileCenter.width / 2 + 180, 320)
      const radiusY = Math.max(profileCenter.height / 2 + 140, 260)
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
    if (isExpanded) {
      // Calculate dynamic height based on actual content using configuration
      const { expanded, layout } = NODE_CONFIG
      const { text } = layout
      const nodeSize = project.size as keyof typeof NODE_CONFIG.sizes
      const typography = NODE_CONFIG.typography[nodeSize].expanded
      
      let calculatedHeight = expanded.baseHeight + expanded.padding
      
      // Add title height
      const titleHeight = project.name.length > text.titleCharThreshold 
        ? text.titleHeightMultiLine 
        : text.titleHeightSingle
      calculatedHeight += titleHeight
      
      // Add description height
      const descriptionLines = Math.ceil(project.description.length / text.descriptionCharsPerLine)
      const descriptionHeight = Math.max(
        descriptionLines * text.descriptionLineHeight + 16, 
        text.descriptionMinHeight
      )
      calculatedHeight += descriptionHeight
      
      // Add tech stack height
      const techStackRows = Math.ceil(project.techStack.length / text.techItemsPerRow)
      const techStackHeight = techStackRows * text.techRowHeight + 16
      calculatedHeight += techStackHeight
      
      // Add link height if present
      if (project.link) {
        calculatedHeight += text.linkHeight
      }
      
      return calculatedHeight
    }
    
    const { sizes } = NODE_CONFIG
    return sizes[project.size as keyof typeof sizes] || sizes.medium
  }
  const getProjectIcon = () => {
    const { typography } = NODE_CONFIG
    const nodeSize = project.size as keyof typeof typography
    const sizeTypography = typography[nodeSize]
    const iconClass = isExpanded ? sizeTypography.expanded.iconSize : sizeTypography.normal.iconSize
    
    const iconMap: { [key: string]: JSX.Element } = {
      'holoportation': <BsHeadsetVr className={`text-purple-400 ${iconClass}`} />,
      'daily-ball': <FaGamepad className={`text-blue-400 ${iconClass}`} />,
      'vibe': <BsMusicNoteBeamed className={`text-cyan-400 ${iconClass}`} />,
      'unitrade': <BsBagFill className={`text-emerald-400 ${iconClass}`} />,
      'choose-movie': <BsCameraReelsFill className={`text-amber-400 ${iconClass}`} />
    }
    return iconMap[project.id] || <FaGamepad className={`text-gray-400 ${iconClass}`} />
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
    
    return project.techStack.map((tech: string) => {
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
  const { animation, typography, spacing } = NODE_CONFIG
  const nodeSize = project.size as keyof typeof typography
  const sizeTypography = typography[nodeSize]

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
        delay: index * animation.initialDelay,
        duration: 0.8, 
        type: "spring",
        left: { duration: animation.positionDuration, ease: "easeOut" },
        top: { duration: animation.positionDuration, ease: "easeOut" },
        zIndex: { duration: 0 }
      }}
    >
      <motion.div
        className="relative cursor-pointer"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onClick={handleClick}
        animate={{
          y: isExpanded ? 0 : [0, -animation.floatOffset, 0],
          rotate: isExpanded ? 0 : [0, 2, 0, -2, 0]
        }}
        transition={{
          duration: isExpanded ? animation.hoverDuration : animation.floatDuration + index * 0.8,
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
          transition={{ duration: animation.sizeDuration, ease: "easeOut" }}
        >          
          {/* Outer glow ring with opaque background */}
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
              borderRadius: { duration: animation.sizeDuration, ease: "easeOut" }
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
                    className={spacing.normal.iconMarginBottom}
                    animate={{
                      scale: isHovered ? 1.1 : 1
                    }}
                  >
                    {getProjectIcon()}
                  </motion.div>                  {/* Project title */}
                  <h3 className={`text-white ${sizeTypography.normal.titleSize} font-medium ${spacing.normal.titleMarginBottom} leading-tight`}>
                    {project.name}
                  </h3>

                  {/* Quick tech icons */}
                  <div className={`flex items-center justify-center ${spacing.normal.techIconGap}`}>
                    {getTechIcons().slice(0, 3).map(({ tech, iconClass }, iconIndex) => (
                      <i
                        key={iconIndex}
                        className={`${iconClass} ${sizeTypography.normal.techIconSize} opacity-70`}
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
                  transition={{ duration: animation.hoverDuration, delay: animation.expandedContentDelay }}
                  className="flex flex-col items-center justify-start h-full w-full py-2"
                >
                  {/* Project icon - larger */}
                  <motion.div
                    className={spacing.expanded.iconMarginBottom}
                    initial={{ scale: 1 }}
                    animate={{ scale: 1.2 }}
                    transition={{ duration: animation.hoverDuration }}
                  >
                    {getProjectIcon()}
                  </motion.div>                  {/* Project title - larger */}
                  <h3 className={`text-white ${sizeTypography.expanded.titleSize} font-bold ${spacing.expanded.titleMarginBottom} text-center leading-tight`}>
                    {project.name}
                  </h3>                  

                  {/* Description */}
                  <p className={`text-gray-300 ${sizeTypography.expanded.descriptionSize} ${spacing.expanded.descriptionMarginBottom} text-center leading-relaxed px-3 max-w-full`}>
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className={`flex flex-wrap items-center justify-center ${spacing.expanded.techItemGap} ${spacing.expanded.techStackMarginBottom} px-2`}>
                    {getTechIcons().map(({ tech, iconClass }, iconIndex) => (
                      <div
                        key={iconIndex}
                        className={`flex items-center gap-1 bg-gray-800/50 rounded-md ${spacing.expanded.techItemPadding} ${sizeTypography.expanded.techTextSize}`}
                      >
                        <i
                          className={`${iconClass} ${sizeTypography.expanded.techIconSize}`}
                          style={{ color: project.color }}
                        />
                        <span className={`text-gray-300 ${sizeTypography.expanded.techTextSize} whitespace-nowrap`}>{tech}</span>
                      </div>
                    ))}
                  </div>

                  {/* Link hint */}
                  {project.link && (
                    <motion.div
                      className={`${sizeTypography.expanded.linkHintSize} text-gray-400 opacity-80`}
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