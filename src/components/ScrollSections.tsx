import { motion } from 'framer-motion';
import { useState } from 'react';
import { education, experiences } from '../data/experiences';
import { skillCategories, skills } from '../data/skills';

interface ScrollSectionsProps {
  section: 'skills' | 'experience' | 'education';
  scrollProgress: number;
}

const ScrollSections = ({ section, scrollProgress }: ScrollSectionsProps) => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };
  const renderSkillsSection = () => (
    <motion.section
      className="py-20 px-6 h-full flex items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
          variants={itemVariants}
        >
          Skills & Technologies
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(skillCategories).map(([category, skillList]) => (
            <motion.div
              key={category}
              className="bg-slate-800/50 p-6 rounded-xl border border-gray-700/50 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ scale: 1.02, borderColor: 'rgb(139, 92, 246, 0.5)' }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-6 text-gray-200 text-center">
                {category}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {skillList.map((skill) => {
                  const IconComponent = skill.icon;
                  const isHighlighted = hoveredSkill === skill.name;

                  return (
                    <motion.div
                      key={skill.name}
                      className={`flex flex-col items-center p-4 rounded-lg border transition-all duration-300 cursor-pointer ${isHighlighted
                          ? 'bg-slate-700/70 border-purple-500/50 shadow-lg shadow-purple-500/20'
                          : 'bg-slate-700/30 border-gray-600/30 hover:bg-slate-700/50'
                        }`}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: isHighlighted
                          ? '0 8px 32px rgba(139, 92, 246, 0.3)'
                          : '0 4px 20px rgba(139, 92, 246, 0.15)'
                      }}
                      whileTap={{ scale: 0.95 }}
                      onHoverStart={() => setHoveredSkill(skill.name)}
                      onHoverEnd={() => setHoveredSkill(null)}
                    >
                      <IconComponent
                        className={`text-4xl mb-2 transition-all duration-300 ${isHighlighted ? skill.color + ' drop-shadow-lg' : skill.color
                          }`}
                      />
                      <span className="text-sm text-gray-200 text-center font-medium">
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );

  const renderExperienceSection = () => (
    <motion.section
      className="py-20 px-6 h-full flex items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
          variants={itemVariants}
        >
          Work Experience
        </motion.h2>
        <div className="space-y-8">
          {experiences.map((exp) => {
            const isHighlighted = hoveredSkill && experienceUsesSkill(exp, hoveredSkill);

            return (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                className={`p-6 rounded-lg border transition-all duration-300 ${isHighlighted
                    ? 'bg-slate-800/70 border-purple-500/50 shadow-lg shadow-purple-500/20'
                    : 'bg-slate-800/50 border-gray-700'
                  }`}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-200">
                      {exp.role}
                    </h3>
                    <p className="text-lg text-purple-400">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{exp.period}</p>
                    <p className="text-sm text-gray-500">{exp.location}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{exp.description}</p>

                {/* Skills used in this experience */}
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skillName) => {
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
                        <IconComponent className={skill.color} />
                        <span className="text-gray-300">{skillName}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );

  const renderEducationSection = () => (
    <motion.section
      className="py-20 px-6 h-full flex items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
          variants={itemVariants}
        >
          Education
        </motion.h2>
        <motion.div
          className={`bg-slate-800/50 p-6 rounded-lg border transition-all duration-300 ${hoveredSkill && educationUsesSkill(hoveredSkill)
              ? 'border-purple-500/50 shadow-lg shadow-purple-500/20'
              : 'border-gray-700'
            }`}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
            <div>
              <h3 className="text-xl font-semibold text-gray-200">
                {education.degree}
              </h3>
              <p className="text-lg text-purple-400">{education.institution}</p>
              <p className="text-sm text-gray-400">GPA: {education.gpa}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">{education.period}</p>
              <p className="text-sm text-gray-500">{education.location}</p>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Courses:</h4>
            <div className="flex flex-wrap gap-2">
              {education.courses.map((course, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-700/50 border border-gray-600/30 rounded-md text-xs text-gray-300"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>

          {/* Skills covered in education */}
          <div className="flex flex-wrap gap-2">
            {education.skills.map((skillName) => {
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
                  <IconComponent className={skill.color} />
                  <span className="text-gray-300">{skillName}</span>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Contact Footer for education section */}
        <motion.div
          className="mt-12 text-center"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Let's Connect
          </h3>
          <div className="flex justify-center space-x-6 text-gray-300">
            <a
              href="mailto:alex.turianskyj@gmail.com"
              className="hover:text-purple-400 transition-colors"
            >
              alex.turianskyj@gmail.com
            </a>
            <span>|</span>
            <a
              href="tel:+15148948508"
              className="hover:text-purple-400 transition-colors"
            >
              (514) 894-8508
            </a>
            <span>|</span>
            <a
              href="https://linkedin.com/in/alex-turianskyj"
              className="hover:text-purple-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <span>|</span>
            <a
              href="https://github.com/alex8ndr"
              className="hover:text-purple-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );

  return (
    <div className="relative z-10 bg-slate-900/50 backdrop-blur-sm h-full">
      {section === 'skills' && renderSkillsSection()}
      {section === 'experience' && renderExperienceSection()}
      {section === 'education' && renderEducationSection()}
    </div>
  );
};

export default ScrollSections;
