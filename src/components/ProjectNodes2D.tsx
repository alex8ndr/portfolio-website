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

const NODE_CONFIG = {
  sizes: {
    tiny: 70,
    small: 82,
    medium: 100,
    large: 125,
  },
  rings: {
    large: { radius: 250 },
    medium: { radius: 400 },
    small: { radius: 550 },
  },
  margins: {
    top: 64,
    bottom: 80,
    sides: 60,
  },
  horizontal: {
    centerWidth: 250,
    minSpacing: 100,
    nodeGap: 0,
    yOffset: 40,
  },
  scroll: {
    minScale: 0.8,
    transitionStart: 0.1,
    transitionEnd: 0.6,
  },
  expanded: {
    width: 255,
    baseHeight: 115,
    charsPerLine: 40,
    heightPerLine: 15,
    heightPerTechItem: 20,
    heightPerButton: 35,
    maxHeight: 350,
    padding: 20,
  }, typography: {
    expanded: {
      iconSize: 'text-2xl',
      titleSize: 'text-base/5',
      descriptionSize: 'text-xs',
      techIconSize: 'text-xs',
      techTextSize: 'text-xs',
      linkHintSize: 'text-xs',
    },
    tiny: { normal: { iconSize: 'text-sm', titleSize: 'text-xs/3', techIconSize: 'text-xs' } },
    small: { normal: { iconSize: 'text-sm', titleSize: 'text-xs/3', techIconSize: 'text-xs' } },
    medium: { normal: { iconSize: 'text-lg', titleSize: 'text-xs/3', techIconSize: 'text-sm' } },
    large: { normal: { iconSize: 'text-xl', titleSize: 'text-sm/4', techIconSize: 'text-lg' } },
  },
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
  animation: {
    initialDelay: 0.2,
    positionDuration: 0.4,
    sizeDuration: 0.4,
    hoverDuration: 0.3,
    expandedContentDelay: 0.1,
    floatDuration: 5,
    floatOffset: 10,
  },
  skillHighlight: {
    glowIntensity: '0 0 25px',
    glowOpacity: '100',
    animationDuration: 0.3,
  },
};

const getButtonIcon = (type: ProjectButton['type']) => {
  const icons: Record<string, JSX.Element> = {
    github: <FaGithub />,
    devpost: <SiDevpost />,
    demo: <FaExternalLinkAlt />,
    googleplay: <FaGooglePlay />,
  };
  return icons[type] || <FaExternalLinkAlt />;
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
}: ProjectNode2DProps) => {
  const [isHovered, setIsHovered] = useState(false);
  // Helper function to check if project uses a specific skill
  const projectUsesSkill = (skillName: string): boolean => {
    if (!skillName) return false;
    return project.techStack.some(tech => {
      const techLower = tech.toLowerCase();
      const skillLower = skillName.toLowerCase();
      // Exact matching for Java/JavaScript to prevent confusion
      if (skillLower === 'java' && techLower === 'java') return true;
      if (skillLower === 'javascript' && techLower === 'javascript') return true;
      if (skillLower !== 'java' && skillLower !== 'javascript') {
        return techLower.includes(skillLower) || skillLower.includes(techLower);
      }
      return false;
    });
  };

  // Check if this project should be highlighted based on hovered skill
  const isSkillHighlighted = hoveredSkill && projectUsesSkill(hoveredSkill);  // Calculate optimal height for expanded projects
  const getExpandedHeight = (proj: Project) => {
    const { expanded } = NODE_CONFIG;
    let height = expanded.baseHeight;
    const descriptionLines = Math.ceil(proj.description.length / expanded.charsPerLine);
    height += descriptionLines * expanded.heightPerLine;
    const techItemsShown = Math.min(proj.techStack.length, 5);
    height += expanded.heightPerTechItem * Math.min(Math.ceil(techItemsShown / 2), 2);
    if (proj.buttons && proj.buttons.length > 0) {
      height += expanded.heightPerButton;
    }
    return Math.max(expanded.baseHeight, Math.min(height, expanded.maxHeight));
  }; const getPosition = () => {
    const { width, height } = containerBounds;
    const { rings, margins } = NODE_CONFIG;

    const ringConfig = rings[project.size as keyof typeof rings];
    const radius = ringConfig.radius;
    const angleInDegrees = (project.position * 90) - 90;
    const angleInRadians = (angleInDegrees * Math.PI) / 180;

    const circularX = Math.cos(angleInRadians) * radius;
    const circularY = Math.sin(angleInRadians) * radius;

    const availableHeight = height - margins.top;
    const centerYOffset = margins.top + (availableHeight / 2) - (height / 2);
    const adjustedCircularY = circularY + centerYOffset;

    const maxX = (width / 2) - margins.sides;
    const maxY = (height / 2) - margins.bottom;
    const minX = -(width / 2) + margins.sides;
    const minY = -(height / 2) + margins.top;

    const clampedCircularX = Math.max(minX, Math.min(maxX, circularX));
    const clampedCircularY = Math.max(minY, Math.min(maxY, adjustedCircularY));

    const horizontalY = -(height / 2) + margins.top + NODE_CONFIG.horizontal.yOffset;
    const fastProgress = Math.min(scrollProgress * 2, 1);
    const easedProgress = fastProgress < 0.5
      ? 2 * fastProgress * fastProgress
      : 1 - Math.pow(-2 * fastProgress + 2, 2) / 2;

    const x = clampedCircularX + (horizontalX - clampedCircularX) * easedProgress;
    const y = clampedCircularY + (horizontalY - clampedCircularY) * easedProgress;

    return { x, y };
  };
  const { x, y } = getPosition();
  const isExpanded = hoveredIndex === index;

  const getSize = () => {
    if (isExpanded) return NODE_CONFIG.expanded.width;
    const { sizes, scroll } = NODE_CONFIG;
    const baseSize = sizes[project.size as keyof typeof sizes] || sizes.medium;
    const { transitionStart, transitionEnd, minScale } = scroll;

    if (scrollProgress <= transitionStart) return baseSize;
    if (scrollProgress >= transitionEnd) return baseSize * minScale;

    const progress = (scrollProgress - transitionStart) / (transitionEnd - transitionStart);
    const smoothProgress = progress * progress * (3 - 2 * progress);
    const scaleFactor = 1 - (1 - minScale) * smoothProgress;
    return baseSize * scaleFactor;
  };

  const getOriginalSize = () => {
    const { sizes } = NODE_CONFIG;
    return sizes[project.size as keyof typeof sizes] || sizes.medium;
  };

  const getScrollScale = () => {
    const { scroll } = NODE_CONFIG;
    const { transitionStart, transitionEnd, minScale } = scroll;

    if (scrollProgress <= transitionStart) return 1;
    if (scrollProgress >= transitionEnd) return minScale;

    const progress = (scrollProgress - transitionStart) / (transitionEnd - transitionStart);
    const smoothProgress = progress * progress * (3 - 2 * progress);
    return 1 - (1 - minScale) * smoothProgress;
  };

  const getTechIconsOpacity = () => {
    if (isExpanded) return 1;
    const { scroll } = NODE_CONFIG;
    const { transitionStart, transitionEnd } = scroll;

    if (scrollProgress <= transitionStart) return 1;
    if (scrollProgress >= transitionEnd) return 0.7;

    const progress = (scrollProgress - transitionStart) / (transitionEnd - transitionStart);
    return 1 - (0.3 * progress);
  }; const getTypography = () => {
    if (isExpanded) return NODE_CONFIG.typography.expanded;
    const nodeSize = project.size as 'tiny' | 'small' | 'medium' | 'large';
    return (NODE_CONFIG.typography[nodeSize] as { normal: any }).normal;
  };

  const getExpandedTypography = () => NODE_CONFIG.typography.expanded; const getProjectIcon = (typography: any) => {
    const iconClass = isExpanded
      ? NODE_CONFIG.typography.expanded.iconSize
      : typography.iconSize;

    const iconMap: { [key: string]: JSX.Element } = {
      holoportation: <BsHeadsetVr className={`text-purple-400 ${iconClass}`} />,
      'daily-ball': <FaGamepad className={`text-blue-400 ${iconClass}`} />,
      vibe: <BsMusicNoteBeamed className={`text-cyan-400 ${iconClass}`} />,
      unitrade: <BsBagFill className={`text-emerald-400 ${iconClass}`} />,
      'choose-movie': <BsCameraReelsFill className={`text-amber-400 ${iconClass}`} />,
      'personal-website': <FaCode className={`text-red-400 ${iconClass}`} />,
      'event-horizons': <FaCalendarAlt className={`text-green-400 ${iconClass}`} />,
      impostorbot: <BsRobot className={`text-violet-400 ${iconClass}`} />,
      'slightly-edited-songs': <FaYoutube className={`text-red-400 ${iconClass}`} />,
    };

    return iconMap[project.id] || <FaGamepad className={`text-gray-400 ${iconClass}`} />;
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
      NumPy: SiNumpy,
      Streamlit: SiStreamlit,
      WinForms: DiDotnet,
      Django: SiDjango,
      SciPy: SiScipy,
    };

    return project.techStack.map((tech: string) => {
      const IconComponent = techIconMap[tech] || BiCode;
      return { tech, icon: IconComponent };
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
      className="absolute z-20" style={{
        left: `calc(50% + ${x}px - ${isExpanded ? NODE_CONFIG.expanded.width / 2 : getOriginalSize() / 2}px)`,
        top: `calc(50% + ${y}px - ${isExpanded ? getExpandedHeight(project) / 2 : getOriginalSize() / 2}px)`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        left: `calc(50% + ${x}px - ${isExpanded ? NODE_CONFIG.expanded.width / 2 : getOriginalSize() / 2}px)`,
        top: `calc(50% + ${y}px - ${isExpanded ? getExpandedHeight(project) / 2 : getOriginalSize() / 2}px)`,
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
        >          {/* Background layer */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)`,
            }}
            animate={{ borderRadius: isExpanded ? '12px' : '50%' }}
            transition={{ duration: animation.sizeDuration, ease: 'easeOut' }}
          />

          {/* Glow effect */}
          <motion.div
            className="absolute"
            style={{ left: 0, top: 0, zIndex: -1 }}
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
            style={{ border: `3px solid ${project.color}` }}
            animate={{ borderRadius: isExpanded ? '12px' : '50%' }}
            transition={{ duration: animation.sizeDuration, ease: 'easeOut' }}
          />          {/* Content area */}
          <div className="relative z-10 w-full h-full">
            {/* Normal state content */}
            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  key="normal-content"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: getScrollScale() }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.05 } }}
                  transition={{
                    opacity: {
                      delay: NODE_CONFIG.animation.sizeDuration * 0.7,
                      duration: NODE_CONFIG.animation.sizeDuration * 0.3,
                    },
                    scale: { duration: 0.1, ease: 'easeOut' },
                  }}
                  className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
                >
                  <motion.div
                    className={spacing.normal.iconMarginBottom}
                    animate={{ scale: isHovered ? 1.1 : 1 }}
                    transition={{ duration: isHovered ? 0.2 : 0.3, ease: 'easeInOut' }}
                  >
                    {getProjectIcon(currentTypography)}
                  </motion.div>

                  <h3 className={`text-white ${currentTypography.titleSize} font-medium ${spacing.normal.titleMarginBottom}`}>
                    {project.name}
                  </h3>

                  <AnimatePresence>
                    {getTechIconsOpacity() > 0.05 && (
                      <motion.div
                        key="tech-icons"
                        className={`flex items-center justify-center ${spacing.normal.techIconGap}`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: getTechIconsOpacity(), scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>            {/* Expanded state content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  key="expanded-content"
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
                  <div className="flex flex-col items-center space-y-2">
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: 1.2 }}
                      transition={{ duration: animation.hoverDuration }}
                    >
                      {getProjectIcon(expandedTypography)}
                    </motion.div>

                    <h3
                      className={`text-white ${expandedTypography.titleSize} leading-none font-bold text-center ${spacing.expanded.titleMarginBottom}`}
                      style={{ lineHeight: '0.8' }}
                    >
                      {project.name}
                    </h3>
                  </div>

                  <div className="flex flex-col items-center space-y-2 flex-1 justify-center">
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

                    <div className="flex flex-wrap items-center justify-center gap-1 px-2">
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
                            <span className={`text-gray-300 ${expandedTypography.techTextSize} whitespace-nowrap`}>
                              {tech}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>                  {project.buttons && project.buttons.length > 0 ? (
                    <div className={`flex ${project.buttons.length === 1 ? 'justify-center' : 'gap-2'} w-full px-2`}>
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
                    <motion.div className={`${expandedTypography.linkHintSize} text-gray-400 opacity-80`}>
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
  const [containerBounds, setContainerBounds] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const updateBounds = () => {
      const width = Math.min(window.innerWidth * 0.9, 1600);
      const height = Math.min(window.innerHeight * 0.8, 1000);
      setContainerBounds({ width, height });
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);  // Calculate horizontal positions for all projects based on their circular X positions
  const getProjectsWithHorizontalPositions = () => {
    const { width } = containerBounds;
    const { margins } = NODE_CONFIG;

    // Calculate where each project currently is in the circular layout
    const projectsWithCircularX = projects.map((project, index) => {
      const ring = NODE_CONFIG.rings[project.size as keyof typeof NODE_CONFIG.rings];
      const angleInDegrees = (project.position * 90) - 90;
      const angleInRadians = (angleInDegrees * Math.PI) / 180;
      const circularX = Math.cos(angleInRadians) * ring.radius;

      const minX = -(width / 2) + margins.sides + 50;
      const maxX = (width / 2) - margins.sides - 50;
      const clampedX = Math.max(minX, Math.min(maxX, circularX));

      return { project, originalIndex: index, circularX: clampedX };
    });

    // Sort by current circular X position (leftmost to rightmost)
    const sortedByPosition = [...projectsWithCircularX].sort((a, b) => a.circularX - b.circularX);
    const { nodeGap } = NODE_CONFIG.horizontal;
    const desiredGap = nodeGap;

    // Calculate positions accounting for actual node sizes
    const projectSizes = sortedByPosition.map((item, sortedIndex) => {
      const { sizes } = NODE_CONFIG;
      const targetSize = sizes[item.project.size as keyof typeof sizes] || sizes.medium;
      return { ...item, targetSize, sortedIndex };
    });

    let positions: number[] = [];
    const totalProjects = projects.length;
    const { centerWidth } = NODE_CONFIG.horizontal;
    // Split projects into left and right sides of center
    const leftProjects = Math.floor(totalProjects / 2);
    const rightProjects = totalProjects - leftProjects;

    // Calculate left side positions (working outward from center)
    if (leftProjects > 0) {
      const leftProjectSizes = projectSizes.slice(0, leftProjects);
      let currentX = -(centerWidth / 2);

      for (let i = leftProjectSizes.length - 1; i >= 0; i--) {
        const nodeSize = leftProjectSizes[i].targetSize;
        currentX -= (nodeSize / 2);
        positions.unshift(currentX);
        currentX -= (nodeSize / 2);
        if (i > 0) currentX -= desiredGap;
      }
    }

    // Calculate right side positions (working outward from center)
    if (rightProjects > 0) {
      const rightProjectSizes = projectSizes.slice(leftProjects);
      let currentX = (centerWidth / 2);

      for (let i = 0; i < rightProjectSizes.length; i++) {
        const nodeSize = rightProjectSizes[i].targetSize;
        currentX += (nodeSize / 2);
        positions.push(currentX);
        currentX += (nodeSize / 2);
        if (i < rightProjectSizes.length - 1) currentX += desiredGap;
      }
    }

    return sortedByPosition.map((item, sortedIndex) => ({
      ...item.project,
      originalIndex: item.originalIndex,
      horizontalX: positions[sortedIndex] || 0,
      sortedIndex: sortedIndex
    }));
  };
  const projectsWithPositions = getProjectsWithHorizontalPositions();

  return (
    <div className="relative w-full h-full">
      {projectsWithPositions.map((project) => (
        <ProjectNode2D
          key={project.id}
          project={project}
          index={project.originalIndex}
          hoveredIndex={hoveredIndex}
          onHover={setHoveredIndex}
          containerBounds={containerBounds}
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
