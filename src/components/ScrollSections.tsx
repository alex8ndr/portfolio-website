import { motion } from 'framer-motion';
import { useState } from 'react';
import { education, experiences } from '../data/experiences';
import { skillCategories, skills } from '../data/skills';

interface ScrollSectionsProps {
  scrollProgress: number;
  onSkillHover: (skill: string | null) => void;
}

const ScrollSections = ({ scrollProgress, onSkillHover }: ScrollSectionsProps) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  // Common breakpoint prefixes to avoid repetition
  const bp = {
    medium: '2xl:',     // 1536px+ 
    large: '3xl:'       // 1920px+
  };

  // All responsive sizing in one place - just the values, no prefixes
  const breakpoints = {
    small: {  // Default for very small screens, high scaling, embeds
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
      // Height responsiveness
      containerHeight: 'h-[65vh]',  // Shorter on small screens
      maxHeight: 'max-h-[65vh]'
    },
    medium: {  // Values for xl: = 1280px and up (normal large desktop)
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
      // Height responsiveness  
      containerHeight: 'h-[68vh]',  // Standard height for medium screens
      maxHeight: 'max-h-[68vh]'
    },
    large: {  // Values for 2xl: = 1536px+ ultra-wide displays
      heading: 'text-2xl',
      subheading: 'text-sm',
      body: 'text-sm',
      icon: 'text-3xl',
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
      // Height responsiveness
      containerHeight: 'h-[70vh]',  // Same as medium for consistent height
      maxHeight: 'max-h-[70vh]'
    }
  };

  // Combined everything for easy use
  const sizes = {
    // Text sizes
    heading: `${breakpoints.small.heading} ${bp.medium}${breakpoints.medium.heading} ${bp.large}${breakpoints.large.heading}`,
    subheading: `${breakpoints.small.subheading} ${bp.medium}${breakpoints.medium.subheading} ${bp.large}${breakpoints.large.subheading}`,
    body: `${breakpoints.small.body} ${bp.medium}${breakpoints.medium.body} ${bp.large}${breakpoints.large.body}`,
    icon: `${breakpoints.small.icon} ${bp.medium}${breakpoints.medium.icon} ${bp.large}${breakpoints.large.icon}`,
    logo: `${breakpoints.small.logoW} ${breakpoints.small.logoH} ${bp.medium}${breakpoints.medium.logoW} ${bp.medium}${breakpoints.medium.logoH} ${bp.large}${breakpoints.large.logoW} ${bp.large}${breakpoints.large.logoH}`,
    // Spacing (replaces old spacing object)
    containerX: `${breakpoints.small.containerX} ${bp.medium}${breakpoints.medium.containerX} ${bp.large}${breakpoints.large.containerX}`,
    containerY: `${breakpoints.small.containerY} ${bp.medium}${breakpoints.medium.containerY} ${bp.large}${breakpoints.large.containerY}`,
    sectionMargin: `${breakpoints.small.sectionMargin} ${bp.medium}${breakpoints.medium.sectionMargin} ${bp.large}${breakpoints.large.sectionMargin}`, cardPadding: `${breakpoints.small.cardPadding} ${bp.medium}${breakpoints.medium.cardPadding} ${bp.large}${breakpoints.large.cardPadding}`,
    gaps: `${breakpoints.small.gaps} ${bp.medium}${breakpoints.medium.gaps} ${bp.large}${breakpoints.large.gaps}`,
    // Additional responsive spacing
    smallGap: `${breakpoints.small.smallGap} ${bp.medium}${breakpoints.medium.smallGap} ${bp.large}${breakpoints.large.smallGap}`,
    headingMargin: `${breakpoints.small.headingMargin} ${bp.medium}${breakpoints.medium.headingMargin} ${bp.large}${breakpoints.large.headingMargin}`,
    itemSpacing: `${breakpoints.small.itemSpacing} ${bp.medium}${breakpoints.medium.itemSpacing} ${bp.large}${breakpoints.large.itemSpacing}`,
    innerPadding: `${breakpoints.small.innerPadding} ${bp.medium}${breakpoints.medium.innerPadding} ${bp.large}${breakpoints.large.innerPadding}`,
    // Height responsiveness
    containerHeight: `${breakpoints.small.containerHeight} ${bp.medium}${breakpoints.medium.containerHeight} ${bp.large}${breakpoints.large.containerHeight}`,
    maxHeight: `${breakpoints.small.maxHeight} ${bp.medium}${breakpoints.medium.maxHeight} ${bp.large}${breakpoints.large.maxHeight}`
  };

  // Debug: Let's test if our classes are actually being applied
  console.log('innerPadding classes:', sizes.innerPadding);
  console.log('cardPadding classes:', sizes.cardPadding);

  const handleSkillHover = (skill: string | null) => {
    setHoveredSkill(skill);
    onSkillHover(skill);
  };

  const experienceUsesSkill = (experience: typeof experiences[0], skillName: string) => {
    return experience.skills.some(skill =>
      skill.toLowerCase().includes(skillName.toLowerCase()) ||
      skillName.toLowerCase().includes(skill.toLowerCase())
    );
  };

  const educationUsesSkill = (skillName: string) => {
    return education.skills.some(skill =>
      skill.toLowerCase().includes(skillName.toLowerCase()) ||
      skillName.toLowerCase().includes(skill.toLowerCase())
    );
  };

  const sectionsStartProgress = 0.2;
  const sectionsFullProgress = 0.6;
  const sectionsProgress = Math.max(0, Math.min(1,
    (scrollProgress - sectionsStartProgress) / (sectionsFullProgress - sectionsStartProgress)
  ));
  const opacity = sectionsProgress;
  const yTransform = (1 - sectionsProgress) * 50;

  if (sectionsProgress <= 0) return null;
  return (<motion.div
    className={`absolute inset-x-0 text-white overflow-hidden ${sizes.containerHeight} ${sizes.maxHeight}`}
    style={{
      bottom: '2vh',
      opacity,
      transform: `translateY(${yTransform}%)`
    }}
    transition={{ duration: 0.1, ease: 'linear' }}
  >    <div className={`max-w-[90rem] mx-auto ${sizes.containerX} ${sizes.containerY} h-full flex flex-col`}>      <section className={`flex-shrink-0 ${sizes.sectionMargin}`}>        <h2 className={`${sizes.heading} font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 ${sizes.headingMargin}`}>
    Skills & Technologies
  </h2>
    <div className={`grid grid-cols-3 ${sizes.gaps}`}>
      {Object.entries(skillCategories).map(([category, skillList]) => (
        <div key={category} className={`bg-slate-800/50 ${sizes.cardPadding} rounded-lg border border-gray-700/50`}>              <h3 className={`${sizes.subheading} font-semibold ${sizes.headingMargin} text-gray-200 text-center`}>
          {category}
        </h3>
          <div className={`grid grid-cols-4 ${sizes.smallGap}`}>
            {skillList.slice(0, 8).map((skill) => {
              const IconComponent = skill.icon;
              const isHighlighted = hoveredSkill === skill.name;

              return (
                <motion.div
                  key={skill.name}
                  className={`flex flex-col items-center ${sizes.innerPadding} rounded-md border transition-all duration-300 cursor-pointer ${isHighlighted
                    ? 'bg-slate-700/70 border-purple-500/50 shadow-lg shadow-purple-500/20'
                    : 'bg-slate-700/30 border-gray-600/30 hover:bg-slate-700/50'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => handleSkillHover(skill.name)}
                  onHoverEnd={() => handleSkillHover(null)}
                >                      <IconComponent
                    className={`${sizes.icon} mb-1 transition-all duration-300 ${isHighlighted ? skill.color + ' drop-shadow-lg' : skill.color}`}
                  />
                  <span className={`${sizes.body} text-gray-200 text-center font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full`}>
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
          <h2 className={`${sizes.heading} font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2`}>
            Experience
          </h2>
          <div className="flex-1 flex gap-2 overflow-hidden min-h-0">
            {experiences.map((exp) => {
              const isHighlighted = hoveredSkill && experienceUsesSkill(exp, hoveredSkill);

              return (<motion.div
                key={`${exp.company}-${exp.period}`}
                className={`flex-1 ${sizes.cardPadding} rounded-lg border transition-all duration-300 flex flex-col overflow-hidden min-h-0 ${isHighlighted
                  ? 'bg-slate-800/70 border-purple-500/50 shadow-lg shadow-purple-500/20'
                  : 'bg-slate-800/50 border-gray-700'
                  }`}
                whileHover={{ scale: 1.01 }}
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
                    <h3 className={`${sizes.subheading} font-semibold text-gray-200 mb-1 truncate`}>
                      {exp.role}
                    </h3>
                    <div className="flex justify-between items-center gap-1">
                      <p className={`text-purple-400 ${sizes.body} truncate`}>{exp.company}</p>
                      <p className={`${sizes.body} text-gray-400 flex-shrink-0`}>{exp.period}</p>
                    </div>
                  </div>
                </div>

                <p className={`text-gray-300 ${sizes.body} mb-2 flex-grow overflow-y-auto leading-relaxed lg:scrollbar-thin lg:scrollbar-track-gray-800 lg:scrollbar-thumb-gray-600 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:lg:w-2`}>{exp.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 flex-shrink-0">
                  {exp.skills.slice(0, 3).map((skillName) => {
                    const skill = skills.find(s =>
                      s.name.toLowerCase().includes(skillName.toLowerCase()) ||
                      skillName.toLowerCase().includes(s.name.toLowerCase())
                    );

                    if (!skill) return null;

                    const IconComponent = skill.icon;
                    const isSkillHighlighted = hoveredSkill === skill.name;

                    return (
                      <div
                        key={skillName}
                        className={`flex items-center gap-1 px-2 py-1 rounded-md ${sizes.body} transition-all duration-300 ${isSkillHighlighted
                          ? 'bg-purple-500/30 border border-purple-400/50'
                          : 'bg-gray-700/50 border border-gray-600/30'
                          }`}
                      >
                        <IconComponent className={`${skill.color} ${sizes.body}`} />
                        <span className={`text-gray-300 ${sizes.body} truncate`}>{skillName}</span>
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
          <h2 className={`${sizes.heading} font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2`}>
            Education
          </h2>          <motion.div
            className={`bg-slate-800/50 ${sizes.cardPadding} rounded-lg border transition-all duration-300 flex-1 flex flex-col overflow-hidden min-h-0 ${hoveredSkill && educationUsesSkill(hoveredSkill)
              ? 'border-purple-500/50 shadow-lg shadow-purple-500/20'
              : 'border-gray-700'
              }`}
            whileHover={{ scale: 1.01 }}
          >
            <div className="space-y-2 flex-1 flex flex-col overflow-y-auto min-h-0 lg:scrollbar-thin lg:scrollbar-track-gray-800 lg:scrollbar-thumb-gray-600 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:lg:w-2">
              <div className="flex-grow">
                <div className="flex gap-2 mb-2">
                  {education.logo && (
                    <img
                      src={education.logo}
                      alt={`${education.institution} logo`}
                      className={`${sizes.logo} object-contain rounded flex-shrink-0`}
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className={`${sizes.subheading} font-semibold text-gray-200 mb-1 leading-tight`}>
                      {education.degree}
                    </h3>
                    <div className="flex justify-between items-center gap-1">
                      <p className={`text-purple-400 ${sizes.body} truncate`}>{education.institution}</p>
                      <p className={`${sizes.body} text-gray-400 flex-shrink-0`}>{education.period}</p>
                    </div>
                    <div className="flex justify-end">
                      <p className={`${sizes.body} text-gray-400`}>GPA: {education.gpa}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-2">
                  <h4 className={`${sizes.body} font-semibold text-gray-300 mb-1`}>Key Courses:</h4>
                  <div className="flex flex-wrap gap-1">
                    {education.courses.slice(0, 3).map((course, index) => (
                      <span
                        key={index}
                        className={`px-2 py-1 bg-gray-700/50 border border-gray-600/30 rounded-md ${sizes.body} text-gray-300 leading-tight`}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 flex-shrink-0">
                {education.skills.slice(0, 4).map((skillName) => {
                  const skill = skills.find(s =>
                    s.name.toLowerCase().includes(skillName.toLowerCase()) ||
                    skillName.toLowerCase().includes(s.name.toLowerCase())
                  );

                  if (!skill) return null;

                  const IconComponent = skill.icon;
                  const isSkillHighlighted = hoveredSkill === skill.name;

                  return (
                    <div
                      key={skillName}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md ${sizes.body} transition-all duration-300 ${isSkillHighlighted
                        ? 'bg-purple-500/30 border border-purple-400/50'
                        : 'bg-gray-700/50 border border-gray-600/30'
                        }`}
                    >
                      <IconComponent className={`${skill.color} ${sizes.body}`} />
                      <span className={`text-gray-300 ${sizes.body} truncate`}>{skillName}</span>
                    </div>
                  );
                })}
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
