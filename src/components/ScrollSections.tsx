import { motion } from 'framer-motion';
import { SCROLL_CONFIG } from '../config/scroll';
import { useAppContext } from '../contexts/AppContext';
import { education, experiences } from '../data/experiences';
import { skillCategories, skills } from '../data/skills';
import { useThemeColors } from '../hooks/useThemeColors';
import { isSkillOrSuperset } from '../utils/isSkillOrSuperset';

interface ScrollSectionsProps {
  scrollProgress: number;
  onSkillHover: (skill: string | null) => void;
  onSkillHoverEnd?: () => void;
}

const ScrollSections = ({ scrollProgress }: ScrollSectionsProps) => {
  const { hoveredSkill, setHoveredSkill, clearHoveredSkill } = useAppContext();
  const colors = useThemeColors();
  // Breakpoint prefixes for responsive design
  const bp = {
    medium: '2xl:',
    large: '3xl:'
  };

  // Responsive sizing for different screen sizes
  const breakpoints = {
    small: {
      heading: 'text-sm',
      subheading: 'text-xs',
      body: 'text-xs',
      icon: 'text-sm',
      logoW: 'w-8',
      logoH: 'h-8',
      containerX: 'px-2',
      containerY: 'py-1',
      sectionMargin: 'mb-2',
      cardPadding: 'p-2',
      gaps: 'gap-2',
      smallGap: 'gap-1',
      headingMargin: 'mb-2',
      itemSpacing: 'gap-2',
      innerPadding: 'px-1 py-1',
      containerHeight: 'h-[65vh]',
      maxHeight: 'max-h-[65vh]'
    },
    medium: {
      heading: 'text-lg',
      subheading: 'text-sm',
      body: 'text-sm',
      icon: 'text-lg',
      logoW: 'w-10',
      logoH: 'h-10',
      containerX: 'px-2',
      containerY: 'py-2',
      sectionMargin: 'mb-4',
      cardPadding: 'p-3',
      gaps: 'gap-3',
      smallGap: 'gap-2',
      headingMargin: 'mb-3',
      itemSpacing: 'gap-3',
      innerPadding: 'px-2 py-2',
      containerHeight: 'h-[68vh]',
      maxHeight: 'max-h-[68vh]'
    },
    large: {
      heading: 'text-2xl',
      subheading: 'text-sm',
      body: 'text-sm',
      icon: 'text-2xl',
      logoW: 'w-12',
      logoH: 'h-12',
      containerX: 'px-2',
      containerY: 'py-2',
      sectionMargin: 'mb-6',
      cardPadding: 'p-3',
      gaps: 'gap-3',
      smallGap: 'gap-2',
      headingMargin: 'mb-3',
      itemSpacing: 'gap-3',
      innerPadding: 'px-2 py-2',
      containerHeight: 'h-[68vh]',
      maxHeight: 'max-h-[68vh]'
    }
  };

  // Combine all responsive values for easy use
  const sizes = {
    heading: `${breakpoints.small.heading} ${bp.medium}${breakpoints.medium.heading} ${bp.large}${breakpoints.large.heading}`,
    subheading: `${breakpoints.small.subheading} ${bp.medium}${breakpoints.medium.subheading} ${bp.large}${breakpoints.large.subheading}`,
    body: `${breakpoints.small.body} ${bp.medium}${breakpoints.medium.body} ${bp.large}${breakpoints.large.body}`,
    icon: `${breakpoints.small.icon} ${bp.medium}${breakpoints.medium.icon} ${bp.large}${breakpoints.large.icon}`,
    logo: `${breakpoints.small.logoW} ${breakpoints.small.logoH} ${bp.medium}${breakpoints.medium.logoW} ${bp.medium}${breakpoints.medium.logoH} ${bp.large}${breakpoints.large.logoW} ${bp.large}${breakpoints.large.logoH}`,
    containerX: `${breakpoints.small.containerX} ${bp.medium}${breakpoints.medium.containerX} ${bp.large}${breakpoints.large.containerX}`,
    containerY: `${breakpoints.small.containerY} ${bp.medium}${breakpoints.medium.containerY} ${bp.large}${breakpoints.large.containerY}`,
    sectionMargin: `${breakpoints.small.sectionMargin} ${bp.medium}${breakpoints.medium.sectionMargin} ${bp.large}${breakpoints.large.sectionMargin}`,
    cardPadding: `${breakpoints.small.cardPadding} ${bp.medium}${breakpoints.medium.cardPadding} ${bp.large}${breakpoints.large.cardPadding}`,
    gaps: `${breakpoints.small.gaps} ${bp.medium}${breakpoints.medium.gaps} ${bp.large}${breakpoints.large.gaps}`,
    smallGap: `${breakpoints.small.smallGap} ${bp.medium}${breakpoints.medium.smallGap} ${bp.large}${breakpoints.large.smallGap}`,
    headingMargin: `${breakpoints.small.headingMargin} ${bp.medium}${breakpoints.medium.headingMargin} ${bp.large}${breakpoints.large.headingMargin}`,
    itemSpacing: `${breakpoints.small.itemSpacing} ${bp.medium}${breakpoints.medium.itemSpacing} ${bp.large}${breakpoints.large.itemSpacing}`,
    innerPadding: `${breakpoints.small.innerPadding} ${bp.medium}${breakpoints.medium.innerPadding} ${bp.large}${breakpoints.large.innerPadding}`,
    containerHeight: `${breakpoints.small.containerHeight} ${bp.medium}${breakpoints.medium.containerHeight} ${bp.large}${breakpoints.large.containerHeight}`,
    maxHeight: `${breakpoints.small.maxHeight} ${bp.medium}${breakpoints.medium.maxHeight} ${bp.large}${breakpoints.large.maxHeight}`
  };

  const handleSkillHover = (skill: string) => {
    setHoveredSkill(skill);
  };
  const experienceUsesSkill = (experience: typeof experiences[0], skillName: string) => {
    const allSkills = [...experience.skills, ...(experience.invisibleSkills || [])];
    return allSkills.some(skill => isSkillOrSuperset(skillName, skill));
  };

  const educationUsesSkill = (skillName: string) => {
    return education.courses.some(course =>
      course.skills.some(skill => isSkillOrSuperset(skillName, skill))
    );
  };

  const sectionsStartProgress = SCROLL_CONFIG.sectionsStart;
  const sectionsFullProgress = SCROLL_CONFIG.sectionsFull;
  const sectionsProgress = Math.max(0, Math.min(1,
    (scrollProgress - sectionsStartProgress) / (sectionsFullProgress - sectionsStartProgress)
  ));
  const opacity = sectionsProgress;
  const yTransform = (1 - sectionsProgress) * 50;

  if (sectionsProgress <= 0) return null;
  return (<motion.div
    className={`absolute inset-x-0 ${colors.textPrimary} overflow-hidden ${sizes.containerHeight} ${sizes.maxHeight}`}
    style={{
      bottom: '2vh',
      opacity,
      transform: `translateY(${yTransform}%)`
    }}
    transition={{ duration: 0.1, ease: 'linear' }}
  >    <div className={`max-w-[95rem] mx-auto ${sizes.containerX} ${sizes.containerY} h-full flex flex-col`}>      <section className={`flex-shrink-0 ${sizes.sectionMargin}`}>        <h2 className={`${sizes.heading} font-bold text-center text-transparent bg-clip-text bg-gradient-to-r ${colors.gradientText} ${sizes.headingMargin}`}>
    Skills & Technologies
  </h2>
    <div className={`grid grid-cols-3 ${sizes.gaps}`}> {/* categories grid wrapper */}
      {Object.entries(skillCategories).map(([category, skillList]) => (
        <div key={category} className={`${colors.cardBackground} ${sizes.cardPadding} rounded-lg border ${colors.border}`}>              <h3 className={`${sizes.subheading} font-semibold ${sizes.headingMargin} ${colors.textSecondary} text-center`}>
          {category}
        </h3>
          <div className={`grid grid-cols-4 ${sizes.smallGap}`} onMouseLeave={clearHoveredSkill}>
            {skillList.slice(0, 8).map((skill) => {
              const IconComponent = skill.icon;
              const isHighlighted = hoveredSkill === skill.name;
              return (
                <motion.div
                  key={skill.name}
                  className={`flex flex-col items-center ${sizes.innerPadding} rounded-md border transition-all duration-300 cursor-pointer ${isHighlighted
                    ? `${colors.skillActive}`
                    : `${colors.skillInactive} ${colors.skillHover}`
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => handleSkillHover(skill.name)}
                  animate={{
                    opacity: hoveredSkill && !isHighlighted ? 0.3 : 1,
                  }}
                  transition={{
                    opacity: { duration: 0.3 }
                  }}
                >
                  {IconComponent && (
                    <IconComponent
                      className={`${sizes.icon} mb-1 transition-all duration-300 ${isHighlighted ? skill.color + ' drop-shadow-lg' : skill.color}`}
                    />
                  )}
                  <span className={`${sizes.body} ${colors.textSecondary} text-center font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full`}>
                    {skill.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  </section>      {/* Experience & Education */}
      <div className={`flex-1 grid grid-cols-4 ${sizes.gaps} overflow-hidden min-h-0`}>

        {/* Experience Section */}
        <section className="col-span-3 flex flex-col overflow-hidden min-h-0">
          <h2 className={`${sizes.heading} font-bold text-center text-transparent bg-clip-text bg-gradient-to-r ${colors.gradientText} mb-2`}>
            Experience
          </h2>
          <div className="flex-1 flex gap-2 overflow-hidden min-h-0">            {experiences.map((exp) => {
            const isHighlighted = hoveredSkill && experienceUsesSkill(exp, hoveredSkill);
            const shouldDim = hoveredSkill && !isHighlighted;

            return (<motion.div
              key={`${exp.company}-${exp.period}`}
              className={`flex-1 ${sizes.cardPadding} rounded-lg border transition-all duration-300 flex flex-col overflow-hidden min-h-0 ${isHighlighted
                ? `${colors.cardBackground} ${colors.borderActive}`
                : `${colors.cardBackground} ${colors.border}`
                }`}
              whileHover={{ scale: 1.01 }}
              animate={{
                opacity: shouldDim ? 0.3 : 1,
              }}
              transition={{
                opacity: { duration: 0.3 }
              }}
            >
              <div className="flex gap-2 mb-2 flex-shrink-0">
                {exp.logo && (
                  <img
                    src={exp.logo}
                    alt={`${exp.company} logo`}
                    className={`${sizes.logo} object-contain rounded flex-shrink-0`}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className={`${sizes.subheading} font-semibold ${colors.textSecondary} mb-1 truncate`}>
                    {exp.role}
                  </h3>
                  <div className="flex justify-between items-center gap-1">
                    <p className={`${colors.textAccent} ${sizes.body} truncate`}>{exp.company}</p>
                    <p className={`${sizes.body} ${colors.textTertiary} flex-shrink-0`}>{exp.period}</p>
                  </div>
                </div>
              </div>

              <p className={`${colors.textSecondary} ${sizes.body} mb-2 flex-grow overflow-y-auto leading-relaxed lg:scrollbar-thin`} style={{
                scrollbarColor: `${colors.scrollbarThumb} ${colors.scrollbarTrack}`
              }}>{exp.description}</p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 flex-shrink-0">
                {exp.skills.map((skillName) => {
                  const skill = skills.find(s =>
                    s.name.toLowerCase() === skillName.toLowerCase()
                  ) || skills.find(s =>
                    s.name.toLowerCase().includes(skillName.toLowerCase()) ||
                    skillName.toLowerCase().includes(s.name.toLowerCase())
                  );

                  if (!skill) return null;

                  const IconComponent = skill.icon;
                  const isSkillHighlighted = hoveredSkill && isSkillOrSuperset(hoveredSkill, skill.name);

                  return (
                    <div
                      key={skillName}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md ${sizes.body} transition-all duration-300 cursor-pointer border ${isSkillHighlighted
                        ? `${colors.skillActive} ${colors.textPrimary} shadow-lg`
                        : `${colors.skillInactive} ${colors.textSecondary}`
                        } hover:${colors.skillHoverBg} hover:${colors.skillHoverBorder}`}
                    >
                      {IconComponent && (
                        <IconComponent className={`${skill.color} ${sizes.body}`} />
                      )}
                      <span className={`truncate`}>{skillName}</span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
            );
          })}
          </div>
        </section>        {/* Education Section */}
        <section className="col-span-1 flex flex-col overflow-hidden min-h-0">
          <h2 className={`${sizes.heading} font-bold text-center text-transparent bg-clip-text bg-gradient-to-r ${colors.gradientText} mb-2`}>
            Education
          </h2>
          <motion.div
            className={`${colors.cardBackground} ${sizes.cardPadding} rounded-lg border transition-all duration-300 flex-1 flex flex-col overflow-hidden min-h-0 ${hoveredSkill && educationUsesSkill(hoveredSkill)
              ? `${colors.borderActive}`
              : `${colors.border}`
              }`}
            whileHover={{ scale: 1.01 }}
            animate={{
              opacity: hoveredSkill && !educationUsesSkill(hoveredSkill) ? 0.3 : 1,
            }}
            transition={{
              opacity: { duration: 0.3 }
            }}
          >
            <div className="flex flex-col h-full">
              <div>
                <div className="flex gap-2 mb-1">
                  {education.logo && (
                    <img
                      src={education.logo}
                      alt={`${education.institution} logo`}
                      className={`${sizes.logo} object-contain rounded flex-shrink-0`}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className={`${sizes.subheading} font-semibold ${colors.textSecondary} mb-1 leading-tight`}>
                      {education.degree}
                    </h3>
                    <div className="flex justify-between items-center gap-1">
                      <p className={`${colors.textAccent} ${sizes.body} truncate`}>{education.institution}</p>
                      <p className={`${sizes.body} ${colors.textTertiary} flex-shrink-0`}>{education.period}</p>
                    </div>
                    <div className="flex justify-end">
                      <p className={`${sizes.body} ${colors.textTertiary}`}>GPA: {education.gpa}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative flex-1 mt-2 min-h-0">
                <div
                  className="absolute bottom-0 left-0 right-0 max-h-full overflow-y-auto"
                  style={{ scrollbarColor: `${colors.scrollbarThumb} ${colors.scrollbarTrack}` }}
                >
                  <div className="flex flex-wrap gap-1">
                    {education.courses.filter(course => course.visible !== false).map((course, index) => {
                      const courseUsesHoveredSkill = hoveredSkill && course.skills.some(skill =>
                        isSkillOrSuperset(hoveredSkill, skill)
                      );

                      return (
                        <span
                          key={index}
                          className={`px-2 py-1 border rounded-md ${sizes.body} leading-tight transition-all duration-300 cursor-pointer ${courseUsesHoveredSkill
                            ? `${colors.skillActive} ${colors.textPrimary} shadow-lg`
                            : `${colors.skillInactive} ${colors.textSecondary}`
                            } hover:${colors.skillHoverBg} hover:${colors.skillHoverBorder}`}
                        >
                          {course.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  </motion.div>
  );
};

export default ScrollSections;
