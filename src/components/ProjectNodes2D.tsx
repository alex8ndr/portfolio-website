import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BiCode } from 'react-icons/bi';
import {
  BsBagFill,
  BsCameraReelsFill,
  BsHeadsetVr,
  BsMusicNoteBeamed,
  BsRobot,
} from 'react-icons/bs';
import { DiDotnet } from 'react-icons/di';
import {
  FaCalendarAlt,
  FaCode,
  FaExternalLinkAlt,
  FaGamepad,
  FaGithub,
  FaGooglePlay,
  FaJava,
  FaYoutube,
} from 'react-icons/fa';
import {
  SiCplusplus,
  SiCss3,
  SiDevpost,
  SiDjango,
  SiHtml5,
  SiJavascript,
  SiNodedotjs,
  SiNumpy,
  SiOpencv,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScipy,
  SiSharp,
  SiSpring,
  SiStreamlit,
  SiTailwindcss,
  SiTypescript,
  SiUnity,
  SiVite
} from 'react-icons/si';
import { projects, type Project, type ProjectButton } from '../data/projects';

/**
 * Configuration object for easy customization of project nodes
 * Edit these values to adjust the appearance and behavior of project nodes
 */
const NODE_CONFIG = {
  // Node sizes for different project sizes
  sizes: {
    tiny: 70,
    small: 82,
    medium: 100,
    large: 125,
  },

  // Circular ring configuration
  rings: {
    large: { radius: 250 },   // Outer ring for large projects
    medium: { radius: 400 },  // Middle ring for medium projects  
    small: { radius: 550 },   // Far ring for small projects
  },
  // Margins to keep nodes on screen - Made configurable for easy adjustment
  margins: {
    top: 64, // Match header height (pt-16 = 64px) for proper centering
    bottom: 80,
    sides: 60, // Distance from screen edges - ADJUST THIS to move nodes closer/further from center
  },  // Horizontal positioning settings - ADJUST THESE for better node spacing
  horizontal: {
    centerWidth: 250, // Increased space for AT logo in center
    minSpacing: 100,  // Reduced spacing between nodes for tighter grouping
    yOffset: 40,      // Align with ProfileSection: -280px total offset means this should be ~40px from top margin
  },
  // Post-scroll specific sizing - simplified fixed sizes
  postScroll: {
    sizes: {
      tiny: 70,    // Outermost projects
      small: 82,   // Next inner projects  
      medium: 95,  // Closest to center (2 projects on each side)
    },
    // Typography for post-scroll state - smaller sizes to fit the compact nodes
    typography: {
      tiny: {
        iconSize: 'text-xs',
        titleSize: 'text-[0.65rem]/3',
        techIconSize: 'text-xs',
      },
      small: {
        iconSize: 'text-sm',
        titleSize: 'text-xs/3',
        techIconSize: 'text-xs',
      },
      medium: {
        iconSize: 'text-base',
        titleSize: 'text-xs/4',
        techIconSize: 'text-sm',
      },
    },
    // Content visibility by size
    content: {
      tiny: { showTechIcons: false },    // Logo and title only
      small: { showTechIcons: true },    // Logo, title, tech icons
      medium: { showTechIcons: true },   // Logo, title, tech icons
    },
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
    tiny: {
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
      titleMarginBottom: 'mb-1.5',
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
  },  // Skill highlighting
  skillHighlight: {
    glowIntensity: '0 0 25px', // More focused glow for highlighted projects
    glowOpacity: '100',        // Maximum glow opacity for strong effect  
    animationDuration: 0.3,    // Transition duration for glow effect
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
  scrollProgress: number;
  horizontalX: number;
  hoveredSkill: string | null;
  sortedIndex: number; // Add sorted index for better size calculation
}

const ProjectNode2D = ({
  project,
  index,
  hoveredIndex,
  onHover,
  containerBounds,
  scrollProgress,
  horizontalX,
  hoveredSkill,
  sortedIndex,
}: ProjectNode2DProps) => {
  const [isHovered, setIsHovered] = useState(false);

  // Helper function to check if project uses a specific skill (with exact matching for Java/JavaScript)
  const projectUsesSkill = (skillName: string): boolean => {
    if (!skillName) return false;

    return project.techStack.some(tech => {
      const techLower = tech.toLowerCase();
      const skillLower = skillName.toLowerCase();

      // Handle exact matches for Java/JavaScript to prevent confusion
      if (skillLower === 'java' && techLower === 'java') return true;
      if (skillLower === 'javascript' && techLower === 'javascript') return true;

      // For other skills, use includes for broader matching
      if (skillLower !== 'java' && skillLower !== 'javascript') {
        return techLower.includes(skillLower) || skillLower.includes(techLower);
      }

      return false;
    });
  };

  // Check if this project should be highlighted based on hovered skill
  const isSkillHighlighted = hoveredSkill && projectUsesSkill(hoveredSkill);

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
    const radius = ringConfig.radius;

    // Convert position (0-4) to angle in radians
    // 0 = top (270°), 1 = right (0°), 2 = bottom (90°), 3 = left (180°)
    // Each unit is 90 degrees, decimals allow fine-tuning
    const angleInDegrees = (project.position * 90) - 90; // Subtract 90 to make 0 = top
    const angleInRadians = (angleInDegrees * Math.PI) / 180;    // Calculate circular position (hero state) - properly centered below header
    const circularX = Math.cos(angleInRadians) * radius;
    const circularY = Math.sin(angleInRadians) * radius;

    // Center the circular layout in the available space below the header
    // Available height = total height - header height, so center point is offset down
    const availableHeight = height - margins.top;
    const centerYOffset = margins.top + (availableHeight / 2) - (height / 2);
    const adjustedCircularY = circularY + centerYOffset;

    // Apply bounds checking with margins to keep nodes on screen
    const maxX = (width / 2) - margins.sides;
    const maxY = (height / 2) - margins.bottom;
    const minX = -(width / 2) + margins.sides;
    const minY = -(height / 2) + margins.top;

    const clampedCircularX = Math.max(minX, Math.min(maxX, circularX));
    const clampedCircularY = Math.max(minY, Math.min(maxY, adjustedCircularY));// Calculate horizontal line position (scrolled state)
    // Use the preset horizontal position calculated by the parent component
    const horizontalY = -(height / 2) + margins.top + NODE_CONFIG.horizontal.yOffset;

    // Use a faster, more responsive interpolation
    const fastProgress = Math.min(scrollProgress * 2, 1); // Speed up the transition
    const easedProgress = fastProgress < 0.5
      ? 2 * fastProgress * fastProgress
      : 1 - Math.pow(-2 * fastProgress + 2, 2) / 2; // Fast ease-in-out

    const x = clampedCircularX + (horizontalX - clampedCircularX) * easedProgress;
    const y = clampedCircularY + (horizontalY - clampedCircularY) * easedProgress;

    return { x, y };
  };

  const { x, y } = getPosition();
  const isExpanded = hoveredIndex === index; const getSize = () => {
    if (isExpanded) {
      // Return fixed width and let height be determined by CSS flexbox
      return NODE_CONFIG.expanded.width;
    }

    // For smooth transition between circular and horizontal layouts
    const { sizes, postScroll } = NODE_CONFIG;
    const baseSize = sizes[project.size as keyof typeof sizes] || sizes.medium;

    // Determine target post-scroll size based on distance from center using sortedIndex
    const totalProjects = 9; // Current number of projects
    const centerPosition = Math.floor(totalProjects / 2);
    const distanceFromCenter = Math.abs(sortedIndex - centerPosition);

    let targetSize: number;
    if (distanceFromCenter <= 1) {
      targetSize = postScroll.sizes.medium; // 2 projects closest to center
    } else if (distanceFromCenter <= 2) {
      targetSize = postScroll.sizes.small;  // Next 2-4 projects  
    } else {
      targetSize = postScroll.sizes.tiny;   // Outermost projects
    }

    // Smooth interpolation based on scroll progress
    // Start transition at 0.3, complete by 0.7 for smoother feel
    const transitionStart = 0.3;
    const transitionEnd = 0.7;

    if (scrollProgress <= transitionStart) {
      return baseSize; // Use original circular size
    } else if (scrollProgress >= transitionEnd) {
      return targetSize; // Use final post-scroll size
    } else {
      // Smooth interpolation between sizes
      const progress = (scrollProgress - transitionStart) / (transitionEnd - transitionStart);
      const smoothProgress = progress * progress * (3 - 2 * progress); // Smooth step function
      return baseSize + (targetSize - baseSize) * smoothProgress;
    }
  };  // Helper function to determine if tech icons should be shown in post-scroll state
  const shouldShowTechIcons = () => {
    if (isExpanded || scrollProgress <= 0.7) { // Changed to match typography transition
      return true; // Always show in expanded or circular layout
    }

    // For post-scroll state, check the size and content rules
    const currentSize = getSize();
    const { postScroll } = NODE_CONFIG;

    if (currentSize === postScroll.sizes.tiny) {
      return postScroll.content.tiny.showTechIcons;
    } else if (currentSize === postScroll.sizes.small) {
      return postScroll.content.small.showTechIcons;
    } else {
      return postScroll.content.medium.showTechIcons;
    }
  };// Helper function to get the appropriate typography for current state
  const getTypography = () => {
    if (isExpanded) {
      // Use expanded typography
      const nodeSize = project.size as keyof typeof NODE_CONFIG.typography;
      return NODE_CONFIG.typography[nodeSize].expanded;
    } else if (scrollProgress > 0.7) { // Changed to match size transition end
      // Use post-scroll typography based on current size
      const currentSize = getSize();
      const { postScroll } = NODE_CONFIG;

      if (currentSize === postScroll.sizes.tiny) {
        return postScroll.typography.tiny;
      } else if (currentSize === postScroll.sizes.small) {
        return postScroll.typography.small;
      } else {
        return postScroll.typography.medium;
      }
    } else {
      // Use normal typography
      const nodeSize = project.size as keyof typeof NODE_CONFIG.typography;
      return NODE_CONFIG.typography[nodeSize].normal;
    }
  };

  // Get expanded typography when needed
  const getExpandedTypography = () => {
    const nodeSize = project.size as keyof typeof NODE_CONFIG.typography;
    return NODE_CONFIG.typography[nodeSize].expanded;
  }; const getProjectIcon = () => {
    let iconClass: string;

    if (isExpanded) {
      // Use expanded typography
      const nodeSize = project.size as keyof typeof NODE_CONFIG.typography;
      iconClass = NODE_CONFIG.typography[nodeSize].expanded.iconSize;
    } else if (scrollProgress > 0.5) {
      // Use post-scroll typography based on current size
      const currentSize = getSize();
      const { postScroll } = NODE_CONFIG;

      if (currentSize === postScroll.sizes.tiny) {
        iconClass = postScroll.typography.tiny.iconSize;
      } else if (currentSize === postScroll.sizes.small) {
        iconClass = postScroll.typography.small.iconSize;
      } else {
        iconClass = postScroll.typography.medium.iconSize;
      }
    } else {
      // Use normal typography
      const nodeSize = project.size as keyof typeof NODE_CONFIG.typography;
      iconClass = NODE_CONFIG.typography[nodeSize].normal.iconSize;
    } const iconMap: { [key: string]: JSX.Element } = {
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
  }; const getTechIcons = () => {
    const techIconMap: { [key: string]: any } = {
      'C++': SiCplusplus,
      'C#': SiSharp,
      Python: SiPython,
      OpenCV: SiOpencv,
      Unity: SiUnity,
      JavaScript: SiJavascript,
      'HTML/CSS': SiHtml5,
      HTML: SiHtml5,
      CSS: SiCss3,
      TypeScript: SiTypescript,
      'Node.js': SiNodedotjs,
      Tailwind: SiTailwindcss,
      Vite: SiVite,
      Java: FaJava,
      'Spring Boot': SiSpring,
      React: SiReact,
      PostgreSQL: SiPostgresql,
      Pandas: SiPandas,
      NumPy: SiNumpy, Streamlit: SiStreamlit,
      WinForms: DiDotnet,
      Django: SiDjango,
      SciPy: SiScipy,
    };

    return project.techStack.map((tech: string) => {
      const IconComponent = techIconMap[tech];
      return IconComponent
        ? { tech, icon: IconComponent }
        : { tech, icon: BiCode };
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
  const { animation, spacing } = NODE_CONFIG;
  const currentTypography = getTypography();
  const expandedTypography = getExpandedTypography();
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
          />{' '}          {/* Glow that transitions with the node */}
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
              boxShadow: isSkillHighlighted
                ? `${NODE_CONFIG.skillHighlight.glowIntensity} ${project.color}${NODE_CONFIG.skillHighlight.glowOpacity}`
                : isExpanded
                  ? `0 0 40px ${project.color}80`
                  : `0 0 20px ${project.color}60`,
            }}
            transition={{
              duration: isSkillHighlighted
                ? NODE_CONFIG.skillHighlight.animationDuration
                : NODE_CONFIG.animation.sizeDuration,
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
                  {/* Project title */}                  <h3
                    className={`text-white ${currentTypography.titleSize} font-medium ${spacing.normal.titleMarginBottom}`}
                  >
                    {project.name}
                  </h3>{/* Quick tech icons */}
                  {shouldShowTechIcons() && (
                    <div
                      className={`flex items-center justify-center ${spacing.normal.techIconGap}`}
                    >
                      {getTechIcons()
                        .slice(0, 3)
                        .map(({ tech, icon: IconComponent }, iconIndex) => (
                          <IconComponent
                            key={iconIndex}
                            className={`${currentTypography.techIconSize} opacity-70`}
                            style={{ color: project.color }}
                            title={tech}
                          />
                        ))}
                    </div>
                  )}
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
                      className={`text-white ${expandedTypography.titleSize} leading-none font-bold text-center ${spacing.expanded.titleMarginBottom}`}
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
                      className={`text-gray-300 ${expandedTypography.descriptionSize} text-center leading-relaxed px-2 overflow-hidden`}
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical' as const,
                        maxHeight: '3.6rem',
                      }}
                    >
                      {project.description}
                    </p>
                    {/* Tech stack */}                    <div className="flex flex-wrap items-center justify-center gap-1 px-2">
                      {getTechIcons()
                        .slice(0, 5)
                        .map(({ tech, icon: IconComponent }, iconIndex) => (
                          <div
                            key={iconIndex}
                            className={`flex items-center gap-1 bg-gray-800/50 rounded-md px-1.5 py-0.5 ${expandedTypography.techTextSize}`}
                          >
                            <IconComponent
                              className={`${expandedTypography.techIconSize}`}
                              style={{ color: project.color }}
                            />
                            <span
                              className={`text-gray-300 ${expandedTypography.techTextSize} whitespace-nowrap`}
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
                      className={`${expandedTypography.linkHintSize} text-gray-400 opacity-80`}
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
interface ProjectNodes2DProps {
  scrollProgress: number;
  hoveredSkill: string | null;
}

const ProjectNodes2D = ({ scrollProgress, hoveredSkill }: ProjectNodes2DProps) => {
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
  }, []);  // Calculate horizontal positions for all projects based on their circular X positions
  const getProjectsWithHorizontalPositions = () => {
    const { width } = containerBounds;
    const { margins } = NODE_CONFIG;

    // First, calculate where each project currently is in the circular layout
    const projectsWithCircularX = projects.map((project, index) => {
      const ring = NODE_CONFIG.rings[project.size as keyof typeof NODE_CONFIG.rings];
      // Use the actual position from project data for better accuracy
      const angleInDegrees = (project.position * 90) - 90;
      const angleInRadians = (angleInDegrees * Math.PI) / 180;
      const circularX = Math.cos(angleInRadians) * ring.radius;

      // Clamp to screen bounds
      const minX = -(width / 2) + margins.sides + 50;
      const maxX = (width / 2) - margins.sides - 50;
      const clampedX = Math.max(minX, Math.min(maxX, circularX));

      return { project, originalIndex: index, circularX: clampedX };
    });    // Sort by current circular X position (leftmost to rightmost)
    const sortedByPosition = [...projectsWithCircularX].sort((a, b) => a.circularX - b.circularX);    // Calculate positions accounting for actual node sizes
    const desiredGap = 20; // Fixed gap between node edges

    // First, we need to determine the final sizes of all projects
    const projectSizes = sortedByPosition.map((item, sortedIndex) => {
      const totalProjects = projects.length;
      const centerPosition = Math.floor(totalProjects / 2);
      const distanceFromCenter = Math.abs(sortedIndex - centerPosition);

      let targetSize: number;
      if (distanceFromCenter <= 1) {
        targetSize = NODE_CONFIG.postScroll.sizes.medium;
      } else if (distanceFromCenter <= 2) {
        targetSize = NODE_CONFIG.postScroll.sizes.small;
      } else {
        targetSize = NODE_CONFIG.postScroll.sizes.tiny;
      }
      return { ...item, targetSize, sortedIndex };
    }); let positions: number[] = [];

    // Split projects into left and right sides of center
    const totalProjects = projects.length;
    const { centerWidth } = NODE_CONFIG.horizontal;
    const leftProjects = Math.floor(totalProjects / 2);
    const rightProjects = totalProjects - leftProjects;

    // Calculate left side positions (working outward from center)
    if (leftProjects > 0) {
      const leftProjectSizes = projectSizes.slice(0, leftProjects);
      let currentX = -(centerWidth / 2); // Start at left edge of center area

      // Work backwards through left projects to place them correctly
      for (let i = leftProjectSizes.length - 1; i >= 0; i--) {
        const nodeSize = leftProjectSizes[i].targetSize;
        currentX -= (nodeSize / 2); // Move by half the node size
        if (i < leftProjectSizes.length - 1) currentX -= desiredGap; // Add gap
        positions.unshift(currentX); // Add to beginning of array
        currentX -= (nodeSize / 2); // Move by other half of node size
      }
    }

    // Calculate right side positions (working outward from center)  
    if (rightProjects > 0) {
      const rightProjectSizes = projectSizes.slice(leftProjects);
      let currentX = (centerWidth / 2); // Start at right edge of center area

      for (let i = 0; i < rightProjectSizes.length; i++) {
        const nodeSize = rightProjectSizes[i].targetSize;
        currentX += (nodeSize / 2); // Move by half the node size
        if (i > 0) currentX += desiredGap; // Add gap
        positions.push(currentX);
        currentX += (nodeSize / 2); // Move by other half of node size
      }
    }// Assign positions to projects in their sorted order
    return sortedByPosition.map((item, sortedIndex) => ({
      ...item.project,
      originalIndex: item.originalIndex,
      horizontalX: positions[sortedIndex] || 0,
      sortedIndex: sortedIndex // Add sorted index for size calculation
    }));
  };

  const projectsWithPositions = getProjectsWithHorizontalPositions();

  return (<div className="relative w-full h-full">
    {projectsWithPositions.map((project) => (
      <ProjectNode2D
        key={project.id}
        project={project}
        index={project.originalIndex}
        hoveredIndex={hoveredIndex}
        onHover={setHoveredIndex} containerBounds={containerBounds}
        scrollProgress={scrollProgress}
        horizontalX={project.horizontalX}
        hoveredSkill={hoveredSkill}
        sortedIndex={project.sortedIndex}
      />
    ))}
  </div>
  );
};

export default ProjectNodes2D;
