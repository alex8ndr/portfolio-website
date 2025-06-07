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

  return (
    <motion.div
      className="absolute inset-x-0 text-white overflow-hidden"
      style={{
        height: '65vh',
        bottom: '5vh',
        opacity,
        transform: `translateY(${yTransform}%)`
      }}
      transition={{ duration: 0.1, ease: 'linear' }} // Smoother, more responsive transition
    >      <div className="max-w-7xl mx-auto px-4 py-6 h-full flex flex-col">
        <section className="flex-shrink-0">
          <h2 className={`text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-3`}>
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(skillCategories).map(([category, skillList]) => (
              <div key={category} className="bg-slate-800/50 p-4 rounded-lg border border-gray-700/50">
                <h3 className="text-sm font-semibold mb-3 text-gray-200 text-center">
                  {category}
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {skillList.slice(0, 8).map((skill) => {
                    const IconComponent = skill.icon;
                    const isHighlighted = hoveredSkill === skill.name;

                    return (
                      <motion.div
                        key={skill.name}
                        className={`flex flex-col items-center px-1 py-2 rounded-md border transition-all duration-300 cursor-pointer ${isHighlighted
                          ? 'bg-slate-700/70 border-purple-500/50 shadow-lg shadow-purple-500/20'
                          : 'bg-slate-700/30 border-gray-600/30 hover:bg-slate-700/50'
                          }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onHoverStart={() => handleSkillHover(skill.name)}
                        onHoverEnd={() => handleSkillHover(null)}
                      >
                        <IconComponent
                          className={`text-lg mb-1 transition-all duration-300 ${isHighlighted ? skill.color + ' drop-shadow-lg' : skill.color}`}
                        />
                        <span className="text-xs text-gray-200 text-center font-medium leading-tight">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>{/* Experience & Education - 75/25 Split */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 mt-6 overflow-hidden">

          {/* Experience Section - Takes 3/4 of the width */}
          <section className="lg:col-span-3 flex flex-col overflow-hidden">
            <h2 className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-3">
              Experience
            </h2>
            {/* Horizontal layout for experiences */}
            <div className="flex-1 flex flex-col lg:flex-row gap-3 overflow-hidden">
              {experiences.map((exp) => {
                const isHighlighted = hoveredSkill && experienceUsesSkill(exp, hoveredSkill);

                return (
                  <motion.div
                    key={`${exp.company}-${exp.period}`}
                    className={`flex-1 p-4 rounded-lg border transition-all duration-300 flex flex-col overflow-hidden ${isHighlighted
                      ? 'bg-slate-800/70 border-purple-500/50 shadow-lg shadow-purple-500/20'
                      : 'bg-slate-800/50 border-gray-700'
                      }`}
                    whileHover={{ scale: 1.01 }}                  >                    <div className="flex gap-3 mb-2">
                      {exp.logo && (
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="w-10 h-10 object-contain rounded flex-shrink-0"
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-gray-200 mb-1">
                          {exp.role}
                        </h3>
                        <div className="flex justify-between items-center">
                          <p className="text-purple-400 text-xs">{exp.company}</p>
                          <p className="text-xs text-gray-400">{exp.period}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-xs mb-3 flex-grow overflow-y-auto">{exp.description}</p>

                    {/* Skills used in this experience */}
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
                            className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs transition-all duration-300 ${isSkillHighlighted
                              ? 'bg-purple-500/30 border border-purple-400/50'
                              : 'bg-gray-700/50 border border-gray-600/30'
                              }`}
                          >
                            <IconComponent className={`${skill.color} text-xs`} />
                            <span className="text-gray-300 text-xs">{skillName}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>          {/* Education Section - Takes 1/4 of the width */}
          <section className="lg:col-span-1 flex flex-col overflow-hidden">
            <h2 className="text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-3">
              Education
            </h2>
            <motion.div
              className={`bg-slate-800/50 p-4 rounded-lg border transition-all duration-300 flex-1 flex flex-col overflow-hidden ${hoveredSkill && educationUsesSkill(hoveredSkill)
                ? 'border-purple-500/50 shadow-lg shadow-purple-500/20'
                : 'border-gray-700'
                }`}
              whileHover={{ scale: 1.01 }}
            >              <div className="space-y-3 flex-1 flex flex-col overflow-y-auto">
                <div className="flex-grow">
                  <div className="flex gap-3 mb-2">
                    {education.logo && (
                      <img
                        src={education.logo}
                        alt={`${education.institution} logo`}
                        className="w-10 h-10 object-contain rounded flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-gray-200 mb-1">
                        {education.degree}
                      </h3>                      <div className="flex justify-between items-center">
                        <p className="text-purple-400 text-xs">{education.institution}</p>
                        <p className="text-xs text-gray-400">{education.period}</p>
                      </div>
                      <div className="flex justify-end">
                        <p className="text-xs text-gray-400">GPA: {education.gpa}</p>
                      </div>
                    </div>
                  </div>                  <div className="-mt-3">
                    <h4 className="text-xs font-semibold text-gray-300 mb-2">Key Courses:</h4>
                    <div className="flex flex-wrap gap-1">
                      {education.courses.slice(0, 3).map((course, index) => (
                        <span
                          key={index}
                          className="px-1.5 py-0.5 bg-gray-700/50 border border-gray-600/30 rounded-md text-xs text-gray-300"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Skills covered in education - at bottom like experience */}
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
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs transition-all duration-300 ${isSkillHighlighted
                          ? 'bg-purple-500/30 border border-purple-400/50'
                          : 'bg-gray-700/50 border border-gray-600/30'
                          }`}
                      >
                        <IconComponent className={`${skill.color} text-xs`} />
                        <span className="text-gray-300 text-xs">{skillName}</span>
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
