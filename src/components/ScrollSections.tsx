import { motion } from 'framer-motion';
import { useState } from 'react';
import { education, experiences } from '../data/experiences';
import { skillCategories, skills } from '../data/skills';

interface ScrollSectionsProps {
  scrollProgress: number;
}

const ScrollSections = ({ scrollProgress }: ScrollSectionsProps) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Function to check if an experience uses a specific skill
  const experienceUsesSkill = (experience: typeof experiences[0], skillName: string) => {
    return experience.skills.some(skill =>
      skill.toLowerCase().includes(skillName.toLowerCase()) ||
      skillName.toLowerCase().includes(skill.toLowerCase())
    );
  };

  // Function to check if education covers a specific skill
  const educationUsesSkill = (skillName: string) => {
    return education.skills.some(skill =>
      skill.toLowerCase().includes(skillName.toLowerCase()) ||
      skillName.toLowerCase().includes(skill.toLowerCase())
    );
  };

  // Show sections based on scroll progress
  const showSections = scrollProgress > 0.3;

  if (!showSections) return null;

  return (<motion.div
    className="absolute inset-x-0 bottom-0 bg-slate-900/95 backdrop-blur-sm border-t border-gray-700/50 overflow-y-auto scrollbar-thin"
    style={{ height: '70vh' }}
    initial={{ y: '100%', opacity: 0 }}
    animate={{
      y: showSections ? '0%' : '100%',
      opacity: showSections ? 1 : 0
    }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

      {/* Skills Section - Compact Grid Layout */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Skills & Technologies
        </h2>          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {Object.entries(skillCategories).map(([category, skillList]) => (
            <div
              key={category}
              className="bg-slate-800/50 p-4 rounded-lg border border-gray-700/50"
            >
              <h3 className="text-lg font-semibold mb-3 text-gray-200 text-center">
                {category}
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                {skillList.map((skill) => {
                  const IconComponent = skill.icon;
                  const isHighlighted = hoveredSkill === skill.name;

                  return (
                    <motion.div
                      key={skill.name}
                      className={`flex flex-col items-center p-2 rounded-md border transition-all duration-300 cursor-pointer ${isHighlighted
                          ? 'bg-slate-700/70 border-purple-500/50 shadow-lg shadow-purple-500/20'
                          : 'bg-slate-700/30 border-gray-600/30 hover:bg-slate-700/50'
                        }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setHoveredSkill(skill.name)}
                      onHoverEnd={() => setHoveredSkill(null)}
                    >
                      <IconComponent
                        className={`text-2xl mb-1 transition-all duration-300 ${isHighlighted ? skill.color + ' drop-shadow-lg' : skill.color
                          }`}
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
      </section>

      {/* Experience Section - Horizontal Timeline */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Work Experience
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {experiences.map((exp) => {
            const isHighlighted = hoveredSkill && experienceUsesSkill(exp, hoveredSkill);

            return (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                className={`p-4 rounded-lg border transition-all duration-300 ${isHighlighted
                    ? 'bg-slate-800/70 border-purple-500/50 shadow-lg shadow-purple-500/20'
                    : 'bg-slate-800/50 border-gray-700'
                  }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-200">
                      {exp.role}
                    </h3>
                    <p className="text-purple-400 text-sm">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">{exp.period}</p>
                    <p className="text-xs text-gray-500">{exp.location}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2">{exp.description}</p>

                {/* Skills used in this experience */}
                <div className="flex flex-wrap gap-1">
                  {exp.skills.slice(0, 6).map((skillName) => {
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
                        className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all duration-300 ${isSkillHighlighted
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
      </section>

      {/* Education Section - Compact Single Card */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Education
        </h2>
        <motion.div
          className={`bg-slate-800/50 p-4 rounded-lg border transition-all duration-300 ${hoveredSkill && educationUsesSkill(hoveredSkill)
              ? 'border-purple-500/50 shadow-lg shadow-purple-500/20'
              : 'border-gray-700'
            }`}
          whileHover={{ scale: 1.01 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-200">
                {education.degree}
              </h3>
              <p className="text-purple-400 text-sm">{education.institution}</p>
              <p className="text-xs text-gray-400">GPA: {education.gpa}</p>
              <p className="text-xs text-gray-400">{education.period} | {education.location}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Courses:</h4>
              <div className="flex flex-wrap gap-1 mb-3">
                {education.courses.slice(0, 4).map((course, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-700/50 border border-gray-600/30 rounded-md text-xs text-gray-300"
                  >
                    {course}
                  </span>
                ))}
              </div>

              {/* Skills covered in education */}
              <div className="flex flex-wrap gap-1">
                {education.skills.slice(0, 6).map((skillName) => {
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
                      className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs transition-all duration-300 ${isSkillHighlighted
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
          </div>
        </motion.div>
      </section>

      {/* Contact Footer */}
      <section className="text-center border-t border-gray-700/50 pt-6">
        <h3 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Let's Connect
        </h3>
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300">
          <a
            href="mailto:alex.turianskyj@gmail.com"
            className="hover:text-purple-400 transition-colors"
          >
            alex.turianskyj@gmail.com
          </a>
          <span className="text-gray-500">|</span>
          <a
            href="tel:+15148948508"
            className="hover:text-purple-400 transition-colors"
          >
            (514) 894-8508
          </a>
          <span className="text-gray-500">|</span>
          <a
            href="https://linkedin.com/in/alex-turianskyj"
            className="hover:text-purple-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <span className="text-gray-500">|</span>
          <a
            href="https://github.com/alex8ndr"
            className="hover:text-purple-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </section>
    </div>
  </motion.div>
  );
};

export default ScrollSections;
