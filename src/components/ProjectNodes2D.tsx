import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { projects, type Project } from '../data/projects';
import { useThemeColors } from '../hooks/useThemeColors';
import { getButtonIcon, getProjectIcon, getTechIcons } from '../utils/iconMaps';
import { isSkillOrSuperset } from '../utils/isSkillOrSuperset';

const NODE_CONFIG = {
  sizes: {
    tiny: 70,
    small: 82,
    medium: 100,
    large: 125,
  },
  rings: {
    small: {
      large: { radius: 180 },
      medium: { radius: 280 },
      small: { radius: 380 },
    },
    medium: {
      large: { radius: 220 },
      medium: { radius: 340 },
      small: { radius: 460 },
    },
    large: {
      large: { radius: 250 },
      medium: { radius: 400 },
      small: { radius: 550 },
    },
  },
  margins: {
    top: 50,
    bottom: 60,
    sides: 70,
  },
  horizontal: {
    centerWidth: 200,
    minSpacing: 0,
    maxSpacing: 25,
    nodeGap: 60,
    yOffset: 40,
  }, scroll: {
    small: { maxScale: 0.8, minScale: 0.75 },
    medium: { maxScale: 0.9, minScale: 0.85 },
    large: { maxScale: 1.0, minScale: 0.95 },
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
  },
  typography: {
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
  }, skillHighlight: {
    glowIntensity: '0 0 40px',
    glowOpacity: '100',
    animationDuration: 0.3,
    dimOpacity: 0.3,
  },
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
  sortedIndex: number;
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
  const themeColors = useThemeColors();
  const projectUsesSkill = (skillName: string): boolean => {
    if (!skillName) return false;
    const allSkills = [...project.techStack, ...(project.invisibleSkills || [])];
    return allSkills.some(tech => isSkillOrSuperset(skillName, tech));
  };
  const isSkillHighlighted = hoveredSkill && projectUsesSkill(hoveredSkill);
  const shouldDim = hoveredSkill && !isSkillHighlighted;
  const getExpandedHeight = (proj: Project) => {
    const { expanded } = NODE_CONFIG;
    let height = expanded.baseHeight;
    const descriptionLines = Math.ceil(proj.description.length / expanded.charsPerLine);
    height += descriptionLines * expanded.heightPerLine; const techItemsShown = Math.min(proj.techStack.length, 5);
    height += expanded.heightPerTechItem * Math.min(Math.ceil(techItemsShown / 2), 2);
    if (proj.buttons && proj.buttons.length > 0) {
      height += expanded.heightPerButton;
    }
    return Math.max(expanded.baseHeight, Math.min(height, expanded.maxHeight));
  }; const getPosition = () => {
    const { width, height } = containerBounds;
    const { rings, margins } = NODE_CONFIG;

    // Get responsive ring values based on screen size
    const getRingValues = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width >= 1920) return rings.large;      // 3xl: 1920px+
        if (width >= 1536) return rings.medium;     // 2xl: 1536px+
      }
      return rings.small; // Default for smaller screens
    }; const ringValues = getRingValues();
    const ringConfig = ringValues[project.size as keyof typeof ringValues];
    const radius = ringConfig.radius;
    const angleInDegrees = (project.position * 90) - 90;
    const angleInRadians = (angleInDegrees * Math.PI) / 180;

    const circularX = Math.cos(angleInRadians) * radius; const circularY = Math.sin(angleInRadians) * radius;

    const scaledMargins = {
      top: margins.top,
      bottom: margins.bottom,
      sides: margins.sides,
    }; const availableHeight = height - scaledMargins.top;
    const centerYOffset = scaledMargins.top + (availableHeight / 2) - (height / 2);
    const adjustedCircularY = circularY + centerYOffset;

    const maxX = (width / 2) - scaledMargins.sides;
    const maxY = (height / 2) - scaledMargins.bottom;
    const minX = -(width / 2) + scaledMargins.sides;
    const minY = -(height / 2) + scaledMargins.top;

    const clampedCircularX = Math.max(minX, Math.min(maxX, circularX));
    const clampedCircularY = Math.max(minY, Math.min(maxY, adjustedCircularY)); const horizontalY = -(height / 2) + scaledMargins.top + NODE_CONFIG.horizontal.yOffset;    // Animate between circular and horizontal positions
    const animationProgress = Math.min(Math.max(scrollProgress * 1.5, 0), 1);
    const easedProgress = animationProgress < 0.5
      ? 2 * animationProgress * animationProgress
      : 1 - Math.pow(-2 * animationProgress + 2, 2) / 2;    // Interpolate between circular and horizontal positions with bounds checking
    const deltaX = horizontalX - clampedCircularX;
    const deltaY = horizontalY - clampedCircularY;

    const x = clampedCircularX + (deltaX * easedProgress);
    const y = clampedCircularY + (deltaY * easedProgress);

    return { x, y };
  };
  const { x, y } = getPosition();
  const isExpanded = hoveredIndex === index; const getSize = () => {
    if (isExpanded) return NODE_CONFIG.expanded.width;
    const { sizes } = NODE_CONFIG;
    const baseSize = sizes[project.size as keyof typeof sizes] || sizes.medium;
    // Return the base size without scroll scaling (scaling is handled by parent motion.div)
    return baseSize;
  };
  const getOriginalSize = () => {
    const { sizes } = NODE_CONFIG;
    return sizes[project.size as keyof typeof sizes] || sizes.medium;
  }; const getScrollScale = () => {
    const { scroll } = NODE_CONFIG;
    const { transitionStart, transitionEnd } = scroll;

    // Get responsive scale values based on screen size
    const getScaleValues = () => {
      if (typeof window !== 'undefined') {
        const width = window.innerWidth;
        if (width >= 1920) return scroll.large;      // 3xl: 1920px+
        if (width >= 1536) return scroll.medium;     // 2xl: 1536px+
      }
      return scroll.small; // Default for smaller screens
    };

    const { minScale, maxScale } = getScaleValues();

    if (scrollProgress <= transitionStart) return maxScale;
    if (scrollProgress >= transitionEnd) return minScale;

    const progress = (scrollProgress - transitionStart) / (transitionEnd - transitionStart);
    // Use a more subtle easing function for smoother scaling
    const smoothProgress = progress * progress * (3 - 2 * progress);
    return maxScale - (maxScale - minScale) * smoothProgress;
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
  }; const getExpandedTypography = () => NODE_CONFIG.typography.expanded;

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
  return (<motion.div
    className="absolute z-20"
    style={{
      left: `calc(50% + ${x}px - ${isExpanded ? NODE_CONFIG.expanded.width / 2 : getOriginalSize() / 2}px)`,
      top: `calc(50% + ${y}px - ${isExpanded ? getExpandedHeight(project) / 2 : getOriginalSize() / 2}px)`,
    }}
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: getScrollScale(),
      opacity: 1,
      left: `calc(50% + ${x}px - ${isExpanded ? NODE_CONFIG.expanded.width / 2 : getOriginalSize() / 2}px)`,
      top: `calc(50% + ${y}px - ${isExpanded ? getExpandedHeight(project) / 2 : getOriginalSize() / 2}px)`,
      zIndex: isExpanded ? 50 : 20,
    }}
    transition={{
      delay: index * animation.initialDelay,
      duration: 0.8,
      type: 'spring',
      scale: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smoother scaling
      },
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
    >      {/* Main project node */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{
          width: isExpanded ? NODE_CONFIG.expanded.width : getSize(),
          height: isExpanded ? getExpandedHeight(project) : getSize(),
        }}
        animate={{
          width: isExpanded ? NODE_CONFIG.expanded.width : getSize(),
          height: isExpanded ? getExpandedHeight(project) : getSize(),
          opacity: shouldDim ? NODE_CONFIG.skillHighlight.dimOpacity : 1,
        }}
        transition={{
          duration: animation.sizeDuration,
          ease: 'easeOut',
          opacity: { duration: NODE_CONFIG.skillHighlight.animationDuration }
        }}
      >        {/* Background layer */}
        <motion.div
          className={`absolute inset-0 ${themeColors.cardBackground}`}
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
            borderRadius: isExpanded ? '22px' : '50%', boxShadow: isSkillHighlighted
              ? `${NODE_CONFIG.skillHighlight.glowIntensity} ${project.color}${NODE_CONFIG.skillHighlight.glowOpacity}, 0 0 80px ${project.color}60`
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
            {!isExpanded && (<motion.div
              key="normal-content"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.05 } }}
              transition={{
                opacity: {
                  delay: NODE_CONFIG.animation.sizeDuration * 0.7,
                  duration: NODE_CONFIG.animation.sizeDuration * 0.3,
                },
                scale: { duration: 0.2, ease: 'easeOut' },
              }}
              className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
            >
              <motion.div
                className={spacing.normal.iconMarginBottom}
                animate={{ scale: isHovered ? 1.1 : 1 }}
                transition={{ duration: isHovered ? 0.2 : 0.3, ease: 'easeInOut' }}
              >
                {getProjectIcon(project, currentTypography.iconSize)}
              </motion.div>

              <h3 className={`${themeColors.textPrimary} ${currentTypography.titleSize} font-medium ${spacing.normal.titleMarginBottom} transition-colors duration-500`}>
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
                    {getTechIcons(project.techStack)
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
                    {getProjectIcon(project, expandedTypography.iconSize)}
                  </motion.div>

                  <h3
                    className={`${themeColors.textPrimary} ${expandedTypography.titleSize} leading-none font-bold text-center ${spacing.expanded.titleMarginBottom} transition-colors duration-500`}
                    style={{ lineHeight: '0.8' }}
                  >
                    {project.name}
                  </h3>
                </div>

                <div className="flex flex-col items-center space-y-2 flex-1 justify-center">
                  <p
                    className={`${themeColors.textSecondary} ${expandedTypography.descriptionSize} text-center leading-relaxed px-2 overflow-hidden transition-colors duration-500`}
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
                    {getTechIcons(project.techStack)
                      .slice(0, 5)
                      .map(({ tech, icon: IconComponent }, iconIndex) => (
                        <div
                          key={iconIndex}
                          className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 ${expandedTypography.techTextSize} transition-colors duration-500`}
                        >
                          <IconComponent
                            className={`${expandedTypography.techIconSize}`}
                            style={{ color: project.color }}
                          />
                          <span className={`${themeColors.textSecondary} ${expandedTypography.techTextSize} whitespace-nowrap transition-colors duration-500`}>
                            {tech}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>                  {project.buttons && project.buttons.length > 0 ? (
                  <div className={`flex ${project.buttons.length === 1 ? 'justify-center' : 'gap-2'} w-full px-2`}>
                    {project.buttons
                      .slice(0, 2)
                      .map((button, buttonIndex) => {
                        const isDisabled = !button.url;
                        const isSingle = (project.buttons?.length ?? 0) === 1;
                        // Gradient backgrounds for buttons
                        const lightGradient = `linear-gradient(90deg, ${project.color}22 60%, #f3f4f6 100%)`;
                        const darkGradient = `linear-gradient(90deg, ${project.color}22 60%, #23293a 100%)`;
                        return (
                          <motion.button
                            key={buttonIndex}
                            className={
                              `${isSingle
                                ? 'w-[80%] mx-auto px-6'
                                : 'flex-auto min-w-0 px-3'} py-2 rounded-lg text-xs font-semibold border flex items-center justify-center gap-2 transition-all duration-200 shadow ` +
                              (isDisabled
                                ? `${themeColors.cardBackground} ${themeColors.border} ${themeColors.textTertiary} cursor-not-allowed pointer-events-none`
                                : `${themeColors.border} ${themeColors.textPrimary} ${themeColors.buttonHover}`)
                            }
                            style={{
                              background: isDisabled
                                ? undefined
                                : (themeColors.backgroundSolid === 'bg-blue-50' ? lightGradient : darkGradient),
                              borderColor: `${project.color}88`,
                              boxShadow: `0 1px 6px 0 ${project.color}22`,
                            }}
                            onClick={isDisabled ? undefined : (e) => {
                              e.stopPropagation();
                              window.open(button.url, '_blank');
                            }}
                            whileHover={isDisabled ? undefined : { scale: 1.05 }}
                            whileTap={isDisabled ? undefined : { scale: 0.98 }}
                            disabled={isDisabled}
                          >
                            <span className="text-xs flex-shrink-0">
                              {getButtonIcon(button.type)}
                            </span>
                            <span className="text-xs leading-none truncate">
                              {button.label}
                            </span>
                          </motion.button>
                        );
                      })}
                  </div>
                ) : project.link ? (
                  <motion.div className={`${expandedTypography.linkHintSize} ${themeColors.textTertiary} opacity-80 transition-colors duration-500`}>
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
      const baseWidth = Math.min(window.innerWidth * 0.9, 1600);
      const baseHeight = Math.min(window.innerHeight * 0.8, 1000);

      setContainerBounds({
        width: baseWidth,
        height: baseHeight
      });
    }; updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  // Calculate horizontal positions for all projects based on their circular X positions
  const getProjectsWithHorizontalPositions = () => {
    const { width } = containerBounds;
    const { margins } = NODE_CONFIG;
    const scaledMargins = {
      top: margins.top,
      bottom: margins.bottom,
      sides: margins.sides,
    };    // Calculate where each project currently is in the circular layout
    const projectsWithCircularX = projects.map((project, index) => {
      // Get responsive ring values based on screen size
      const getRingValues = () => {
        if (typeof window !== 'undefined') {
          const width = window.innerWidth;
          if (width >= 1920) return NODE_CONFIG.rings.large;      // 3xl: 1920px+
          if (width >= 1536) return NODE_CONFIG.rings.medium;     // 2xl: 1536px+
        }
        return NODE_CONFIG.rings.small; // Default for smaller screens
      };

      const ringValues = getRingValues();
      const ring = ringValues[project.size as keyof typeof ringValues];
      const angleInDegrees = (project.position * 90) - 90;
      const angleInRadians = (angleInDegrees * Math.PI) / 180;
      const circularX = Math.cos(angleInRadians) * ring.radius;

      const minX = -(width / 2) + scaledMargins.sides + 50;
      const maxX = (width / 2) - scaledMargins.sides - 50;
      const clampedX = Math.max(minX, Math.min(maxX, circularX));

      return { project, originalIndex: index, circularX: clampedX };
    });

    // Sort by current circular X position (leftmost to rightmost)
    const sortedByPosition = [...projectsWithCircularX].sort((a, b) => a.circularX - b.circularX);    // Calculate post-scroll node sizes
    const projectSizes = sortedByPosition.map((item, sortedIndex) => {
      const { sizes, scroll } = NODE_CONFIG;
      const baseSize = sizes[item.project.size as keyof typeof sizes] || sizes.medium;

      // Get responsive scale values based on screen size
      const getScaleValues = () => {
        if (typeof window !== 'undefined') {
          const width = window.innerWidth;
          if (width >= 1920) return scroll.large;      // 3xl: 1920px+
          if (width >= 1536) return scroll.medium;     // 2xl: 1536px+
        }
        return scroll.small; // Default for smaller screens
      };

      // Apply scroll scaling
      const { transitionStart, transitionEnd } = scroll;
      const { minScale } = getScaleValues();
      let scaleFactor = 1;

      if (scrollProgress > transitionStart) {
        if (scrollProgress >= transitionEnd) {
          scaleFactor = minScale;
        } else {
          const progress = (scrollProgress - transitionStart) / (transitionEnd - transitionStart);
          const smoothProgress = progress * progress * (3 - 2 * progress);
          scaleFactor = 1 - (1 - minScale) * smoothProgress;
        }
      }

      const targetSize = baseSize * scaleFactor;
      return { ...item, targetSize, sortedIndex };
    });// Calculate available width for nodes
    const padding = 100; // Minimum padding on each side
    let availableWidth = width - (scaledMargins.sides * 2) - (padding * 2);

    // Calculate total node width
    const totalNodeWidth = projectSizes.reduce((sum, item) => sum + item.targetSize, 0);

    // Calculate spacing between nodes
    const totalProjects = projects.length;
    const gaps = totalProjects - 1;
    const { nodeGap } = NODE_CONFIG.horizontal;
    const preferredGap = nodeGap || 60; // Use a reasonable default gap

    // Check if we can use the preferred gap
    const totalWidthWithPreferredGap = totalNodeWidth + (gaps * preferredGap);

    let dynamicGap: number;
    if (totalWidthWithPreferredGap <= availableWidth) {
      // We have enough space, use preferred gap and distribute remaining space evenly
      const remainingWidth = availableWidth - totalWidthWithPreferredGap;
      dynamicGap = preferredGap + (gaps > 0 ? remainingWidth / gaps : 0);
    } else {
      // Not enough space, calculate minimum gap that fits
      const remainingWidth = availableWidth - totalNodeWidth;
      dynamicGap = gaps > 0 ? Math.max(10, remainingWidth / gaps) : 0;
    }
    dynamicGap = Math.max(dynamicGap, NODE_CONFIG.horizontal.minSpacing);
    dynamicGap = Math.min(dynamicGap, NODE_CONFIG.horizontal.maxSpacing);    // Calculate positions - always use centered layout for consistency
    let positions: number[] = [];

    // Always center the nodes, no central gap logic
    const totalWidth = totalNodeWidth + (gaps * dynamicGap);
    let currentX = -(totalWidth / 2) + (projectSizes[0]?.targetSize / 2 || 0);

    for (let i = 0; i < projectSizes.length; i++) {
      positions.push(currentX);

      if (i < projectSizes.length - 1) {
        const currentNodeSize = projectSizes[i].targetSize;
        const nextNodeSize = projectSizes[i + 1].targetSize;
        currentX += (currentNodeSize / 2) + dynamicGap + (nextNodeSize / 2);
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
