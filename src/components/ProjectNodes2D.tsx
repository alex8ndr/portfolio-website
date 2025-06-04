import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  BsBagFill,
  BsCameraReelsFill,
  BsHeadsetVr,
  BsMusicNoteBeamed,
  BsRobot,
} from 'react-icons/bs';
import {
  FaCalendarAlt,
  FaCode,
  FaExternalLinkAlt,
  FaGamepad,
  FaGithub,
  FaGooglePlay,
  FaYoutube,
} from 'react-icons/fa';
import { SiDevpost } from 'react-icons/si';
import { projects, type Project, type ProjectButton } from '../data/projects';

/**
 * Configuration object for easy customization of project nodes
 * Edit these values to adjust the appearance and behavior of project nodes
 */
const NODE_CONFIG = {
  // Node sizes for different project sizes
  sizes: {
    small: 82,
    medium: 100,
    large: 125,
  },  // Simple circular ring configuration
  rings: {
    large: { radius: 250 },   // Outer ring for large projects
    medium: { radius: 400 },  // Middle ring for medium projects  
    small: { radius: 550 },   // Far ring for small projects
  },  // Margins to keep nodes on screen
  margins: {
    top: 80, // Increased to account for header height
    bottom: 80,
    sides: 80,
  },

  // Expanded node configuration
  expanded: {
    width: 255,
    baseHeight: 115,
    charsPerLine: 40,
    heightPerLine: 15,
    heightPerTechItem: 20,
    heightPerButton: 35,
    maxHeight: 350,
    padding: 20,
  },

  // Typography sizes for each node size
  typography: {
    small: {
      normal: {
        iconSize: 'text-sm',
        titleSize: 'text-xs/3',
        techIconSize: 'text-xs',
      },
      expanded: {
        iconSize: 'text-2xl',
        titleSize: 'text-base/5',
        descriptionSize: 'text-xs',
        techIconSize: 'text-xs',
        techTextSize: 'text-xs',
        linkHintSize: 'text-xs',
      },
    },
    medium: {
      normal: {
        iconSize: 'text-lg',
        titleSize: 'text-xs/3',
        techIconSize: 'text-sm',
      },
      expanded: {
        iconSize: 'text-2xl',
        titleSize: 'text-base/5',
        descriptionSize: 'text-xs',
        techIconSize: 'text-xs',
        techTextSize: 'text-xs',
        linkHintSize: 'text-xs',
      },
    }, large: {
      normal: {
        iconSize: 'text-xl',
        titleSize: 'text-sm/4',
        techIconSize: 'text-lg',
      },
      expanded: {
        iconSize: 'text-2xl',
        titleSize: 'text-base/5',
        descriptionSize: 'text-xs',
        techIconSize: 'text-xs',
        techTextSize: 'text-xs',
        linkHintSize: 'text-xs',
      },
    },
  },

  // Layout spacing
  spacing: {
    normal: {
      iconMarginBottom: 'mb-1.5',
      titleMarginBottom: 'mb-1',
      techIconGap: 'gap-1',
    },
    expanded: {
      iconMarginBottom: 'mb-3',
      titleMarginBottom: 'mb-1',
      descriptionMarginBottom: 'mb-2',
      techStackMarginBottom: 'mb-3',
      techItemGap: 'gap-1.5',
      techItemPadding: 'px-1.5 py-0.5',
    },
  },

  // Animation settings
  animation: {
    initialDelay: 0.2,
    positionDuration: 0.4,
    sizeDuration: 0.4,
    hoverDuration: 0.3,
    expandedContentDelay: 0.1,
    floatDuration: 5,
    floatOffset: 10,
  },
};

/**
 * Helper function to get the appropriate icon for a button type
 */
const getButtonIcon = (type: ProjectButton['type']) => {
  switch (type) {
    case 'github':
      return <FaGithub />;
    case 'devpost':
      return <SiDevpost />;
    case 'demo':
      return <FaExternalLinkAlt />;
    case 'googleplay':
      return <FaGooglePlay />;
    default:
      return <FaExternalLinkAlt />;
  }
};

interface ProjectNode2DProps {
  project: Project;
  index: number;
  hoveredIndex: number | null;
  onHover: (index: number | null) => void;
  containerBounds: { width: number; height: number };
}

const ProjectNode2D = ({
  project,
  index,
  hoveredIndex,
  onHover,
  containerBounds,
}: ProjectNode2DProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Helper function to calculate optimal height for expanded projects
  const getExpandedHeight = (proj: Project) => {
    const { expanded } = NODE_CONFIG;
    let height = expanded.baseHeight;

    // Add height based on description length (longer descriptions need more space)
    const descriptionLines = Math.ceil(proj.description.length / expanded.charsPerLine);
    height += descriptionLines * expanded.heightPerLine;

    // Add height based on tech stack size (more items = more height)
    const techItemsShown = Math.min(proj.techStack.length, 5); // We show max 5 items
    height += expanded.heightPerTechItem * Math.min(Math.ceil(techItemsShown / 2), 2); // 2 items per row, max 2 rows

    // Add height if there are buttons
    if (proj.buttons && proj.buttons.length > 0) {
      height += expanded.heightPerButton;
    }

    // Ensure within reasonable bounds
    return Math.max(expanded.baseHeight, Math.min(height, expanded.maxHeight));
  };  // Simple positioning - get position from project data and radius from config
  const getPosition = () => {
    const { width, height } = containerBounds;
    const { rings, margins } = NODE_CONFIG;

    // Get the ring radius for this project's size
    const ringConfig = rings[project.size as keyof typeof rings];
    const radius = ringConfig.radius;    // Convert position (0-4) to angle in radians
    // 0 = top (270°), 1 = right (0°), 2 = bottom (90°), 3 = left (180°)
    // Each unit is 90 degrees, decimals allow fine-tuning
    const angleInDegrees = (project.position * 90) - 90; // Subtract 90 to make 0 = top
    const angleInRadians = (angleInDegrees * Math.PI) / 180;

    // Calculate position
    const x = Math.cos(angleInRadians) * radius;
    const y = Math.sin(angleInRadians) * radius;

    // Apply bounds checking with margins to keep nodes on screen
    const maxX = (width / 2) - margins.sides;
    const maxY = (height / 2) - margins.bottom;
    const minX = -(width / 2) + margins.sides;
    const minY = -(height / 2) + margins.top;

    const clampedX = Math.max(minX, Math.min(maxX, x));
    const clampedY = Math.max(minY, Math.min(maxY, y));

    return { x: clampedX, y: clampedY };
  };

  const { x, y } = getPosition();
  const isExpanded = hoveredIndex === index;

  const getSize = () => {
    if (isExpanded) {
      // Return fixed width and let height be determined by CSS flexbox
      return NODE_CONFIG.expanded.width;
    }

    const { sizes } = NODE_CONFIG;
    return sizes[project.size as keyof typeof sizes] || sizes.medium;
  };
  const getProjectIcon = () => {
    const { typography } = NODE_CONFIG;
    const nodeSize = project.size as keyof typeof typography;
    const sizeTypography = typography[nodeSize];
    const iconClass = isExpanded
      ? sizeTypography.expanded.iconSize
      : sizeTypography.normal.iconSize; const iconMap: { [key: string]: JSX.Element } = {
        holoportation: <BsHeadsetVr className={`text-purple-400 ${iconClass}`} />,
        'daily-ball': <FaGamepad className={`text-blue-400 ${iconClass}`} />,
        vibe: <BsMusicNoteBeamed className={`text-cyan-400 ${iconClass}`} />,
        unitrade: <BsBagFill className={`text-emerald-400 ${iconClass}`} />,
        'choose-movie': (
          <BsCameraReelsFill className={`text-amber-400 ${iconClass}`} />
        ),
        'personal-website': <FaCode className={`text-red-400 ${iconClass}`} />,
        'event-horizons': <FaCalendarAlt className={`text-green-400 ${iconClass}`} />,
        'impostorbot': <BsRobot className={`text-violet-400 ${iconClass}`} />,
        'slightly-edited-songs': (
          <FaYoutube className={`text-red-400 ${iconClass}`} />
        ),
      };
    return (
      iconMap[project.id] || (
        <FaGamepad className={`text-gray-400 ${iconClass}`} />
      )
    );
  };

  const getTechIcons = () => {
    const techIconMap: { [key: string]: string } = {
      'C++': 'devicon-cplusplus-plain',
      'C#': 'devicon-csharp-plain',
      Python: 'devicon-python-plain',
      OpenCV: 'devicon-opencv-plain',
      Unity: 'devicon-unity-plain',
      JavaScript: 'devicon-javascript-plain',
      'HTML/CSS': 'devicon-html5-plain',
      HTML: 'devicon-html5-plain',
      CSS: 'devicon-css3-plain',
      TypeScript: 'devicon-typescript-plain',
      'Node.js': 'devicon-nodejs-plain',
      Tailwind: 'devicon-tailwindcss-plain',
      Vite: 'devicon-vitejs-plain',
      Java: 'devicon-java-plain',
      'Spring Boot': 'devicon-spring-plain',
      React: 'devicon-react-original',
      PostgreSQL: 'devicon-postgresql-plain',
      Pandas: 'devicon-pandas-plain',
      NumPy: 'devicon-numpy-plain',
      Streamlit: 'devicon-streamlit-plain',
      WinForms: 'devicon-dot-net-plain',
      Django: 'devicon-django-plain',
      SciPy: 'devicon-swiper-plain',
    };

    return project.techStack.map((tech: string) => {
      const iconClass = techIconMap[tech];
      return iconClass
        ? { tech, iconClass }
        : { tech, iconClass: 'devicon-code-plain' };
    });
  };

  const handleClick = () => {
    if (project.link) {
      window.open(project.link, '_blank');
    }
  };

  const handleHoverStart = () => {
    setIsHovered(true);
    onHover(index);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    onHover(null);
  };
  const { animation, typography, spacing } = NODE_CONFIG;
  const nodeSize = project.size as keyof typeof typography;
  const sizeTypography = typography[nodeSize];
  return (
    <motion.div
      className="absolute z-20"
      style={{
        left: `calc(50% + ${x}px - ${isExpanded ? NODE_CONFIG.expanded.width / 2 : getSize() / 2}px)`,
        top: `calc(50% + ${y}px - ${isExpanded ? getExpandedHeight(project) / 2 : getSize() / 2}px)`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        left: `calc(50% + ${x}px - ${isExpanded ? NODE_CONFIG.expanded.width / 2 : getSize() / 2}px)`,
        top: `calc(50% + ${y}px - ${isExpanded ? getExpandedHeight(project) / 2 : getSize() / 2}px)`,
        zIndex: isExpanded ? 50 : 20,
      }}
      transition={{
        delay: index * animation.initialDelay,
        duration: 0.8,
        type: 'spring',
        left: { duration: animation.positionDuration, ease: 'easeOut' },
        top: { duration: animation.positionDuration, ease: 'easeOut' },
        zIndex: { duration: 0 },
      }}
    >
      <motion.div
        className="relative cursor-pointer"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        onClick={handleClick}
        animate={{
          y: isExpanded ? 0 : [0, -animation.floatOffset, 0],
          rotate: isExpanded ? 0 : [0, 1, 0, -1, 0],
        }}
        transition={{
          duration: isExpanded
            ? animation.hoverDuration
            : animation.floatDuration + index * 0.8,
          repeat: isExpanded ? 0 : Number.POSITIVE_INFINITY,
          ease: 'easeInOut',
        }}
      >
        {/* Main project node */}
        <motion.div
          className="relative flex items-center justify-center"
          style={{
            width: isExpanded ? NODE_CONFIG.expanded.width : getSize(),
            height: isExpanded ? getExpandedHeight(project) : getSize(),
          }}
          animate={{
            width: isExpanded ? NODE_CONFIG.expanded.width : getSize(),
            height: isExpanded ? getExpandedHeight(project) : getSize(),
          }}
          transition={{ duration: animation.sizeDuration, ease: 'easeOut' }}
        >
          {/* Background layer */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)`,
            }}
            animate={{
              borderRadius: isExpanded ? '12px' : '50%',
            }}
            transition={{
              duration: animation.sizeDuration,
              ease: 'easeOut',
            }}
          />{' '}
          {/* Glow that transitions with the node */}
          <motion.div
            className="absolute"
            style={{
              left: 0,
              top: 0,
              zIndex: -1,
            }}
            animate={{
              width: isExpanded ? NODE_CONFIG.expanded.width : getSize(),
              height: isExpanded ? getExpandedHeight(project) : getSize(),
              borderRadius: isExpanded ? '22px' : '50%',
              boxShadow: isExpanded
                ? `0 0 40px ${project.color}80`
                : `0 0 20px ${project.color}60`,
            }}
            transition={{
              duration: animation.sizeDuration,
              ease: 'easeOut',
            }}
          />
          {/* Border layer */}
          <motion.div
            className="absolute inset-0"
            style={{
              border: `3px solid ${project.color}`,
            }}
            animate={{
              borderRadius: isExpanded ? '12px' : '50%',
            }}
            transition={{
              duration: animation.sizeDuration,
              ease: 'easeOut',
            }}
          />{' '}
          {/* Content area */}
          <div className="relative z-10 w-full h-full">
            {' '}
            {/* Normal state content */}
            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  key="normal-content" // Added key for explicit animation control
                  initial={{ opacity: 0, scale: 0.8 }} // Start slightly scaled down and invisible
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: NODE_CONFIG.animation.sizeDuration * 0.7,
                      duration: NODE_CONFIG.animation.sizeDuration * 0.3,
                    }, // Delay appearance
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.8,
                    transition: { duration: 0.05 },
                  }} // Exit quickly
                  className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
                >
                  {/* Project icon */}
                  <motion.div
                    className={spacing.normal.iconMarginBottom}
                    animate={{
                      scale: isHovered ? 1.1 : 1,
                    }}
                  >
                    {getProjectIcon()}
                  </motion.div>{' '}
                  {/* Project title */}
                  <h3
                    className={`text-white ${sizeTypography.normal.titleSize} font-medium ${spacing.normal.titleMarginBottom}`}
                  >
                    {project.name}
                  </h3>
                  {/* Quick tech icons */}
                  <div
                    className={`flex items-center justify-center ${spacing.normal.techIconGap}`}
                  >
                    {getTechIcons()
                      .slice(0, 3)
                      .map(({ tech, iconClass }, iconIndex) => (
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
            </AnimatePresence>{' '}
            {/* Expanded state content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  key="expanded-content" // Added key
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: NODE_CONFIG.animation.hoverDuration,
                      delay: NODE_CONFIG.animation.sizeDuration * 0.1,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      duration: NODE_CONFIG.animation.sizeDuration * 0.5,
                      delay: NODE_CONFIG.animation.sizeDuration * 0,
                      ease: 'easeOut',
                    },
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-start p-4 overflow-hidden"
                >
                  {/* Top section: Icon and Title */}
                  <div className="flex flex-col items-center space-y-2">
                    {/* Project icon - larger */}
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: 1.2 }}
                      transition={{ duration: animation.hoverDuration }}
                    >
                      {getProjectIcon()}
                    </motion.div>

                    {/* Project title - larger */}
                    <h3
                      className={`text-white ${sizeTypography.expanded.titleSize} leading-none font-bold text-center ${spacing.expanded.titleMarginBottom}`}
                      style={{ lineHeight: '0.8' }}
                    >
                      {project.name}
                    </h3>
                  </div>
                  {/* Middle section: Description and Tech */}
                  <div className="flex flex-col items-center space-y-2 flex-1 justify-center">
                    {' '}
                    {/* Description */}
                    <p
                      className={`text-gray-300 ${sizeTypography.expanded.descriptionSize} text-center leading-relaxed px-2 overflow-hidden`}
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical' as const,
                        maxHeight: '3.6rem',
                      }}
                    >
                      {project.description}
                    </p>
                    {/* Tech stack */}
                    <div className="flex flex-wrap items-center justify-center gap-1 px-2">
                      {getTechIcons()
                        .slice(0, 5)
                        .map(({ tech, iconClass }, iconIndex) => (
                          <div
                            key={iconIndex}
                            className={`flex items-center gap-1 bg-gray-800/50 rounded-md px-1.5 py-0.5 ${sizeTypography.expanded.techTextSize}`}
                          >
                            <i
                              className={`${iconClass} ${sizeTypography.expanded.techIconSize}`}
                              style={{ color: project.color }}
                            />
                            <span
                              className={`text-gray-300 ${sizeTypography.expanded.techTextSize} whitespace-nowrap`}
                            >
                              {tech}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>{' '}
                  {/* Bottom section: Action Buttons */}
                  {project.buttons && project.buttons.length > 0 ? (
                    <div
                      className={`flex ${project.buttons.length === 1 ? 'justify-center' : 'gap-2'} w-full px-2`}
                    >
                      {project.buttons
                        .slice(0, 2)
                        .map((button, buttonIndex) => (
                          <motion.button
                            key={buttonIndex}
                            className={`${project.buttons!.length === 1 ? 'px-4' : 'flex-1 max-w-[120px]'} bg-gray-800/70 hover:bg-gray-700/80 text-white px-3 py-1.5 rounded text-xs font-medium border border-gray-600/50 hover:border-gray-500/70 flex items-center justify-center gap-1.5 transition-colors duration-200`}
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(button.url, '_blank');
                            }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="text-xs flex-shrink-0">
                              {getButtonIcon(button.type)}
                            </span>
                            <span className="text-xs leading-none">
                              {button.label}
                            </span>
                          </motion.button>
                        ))}
                    </div>
                  ) : project.link ? (
                    <motion.div
                      className={`${sizeTypography.expanded.linkHintSize} text-gray-400 opacity-80`}
                    >
                      Click to visit →
                    </motion.div>
                  ) : null}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Main container component
const ProjectNodes2D = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [containerBounds, setContainerBounds] = useState({
    width: 1200,
    height: 800,
  });

  useEffect(() => {
    const updateBounds = () => {
      // Use viewport dimensions with some padding, but cap at reasonable maximums
      const width = Math.min(window.innerWidth * 0.9, 1600); // 90% of viewport width, max 1600px
      const height = Math.min(window.innerHeight * 0.8, 1000); // 80% of viewport height, max 1000px
      setContainerBounds({ width, height });
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);

    return () => window.removeEventListener('resize', updateBounds);
  }, []);

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
  );
};

export default ProjectNodes2D;
