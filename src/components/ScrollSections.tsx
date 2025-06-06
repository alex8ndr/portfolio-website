import { motion } from 'framer-motion';
import { FaJava } from 'react-icons/fa';
import {
  SiAngular,
  SiCplusplus,
  SiDotnet,
  SiGit,
  SiGnubash,
  SiGooglecolab,
  SiJavascript,
  SiJunit5,
  SiLinux,
  SiNumpy,
  SiPandas,
  SiPlotly,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiPytorch,
  SiReact,
  SiSelenium,
  SiSharp,
  SiSpring,
  SiTypescript,
  SiUnity
} from 'react-icons/si';
import { TbSql } from 'react-icons/tb';

const ScrollSections = () => {  // Easy to modify skills configuration with icons
  const skillsConfig = {
    'Programming Languages': [
      { name: 'Python', icon: SiPython, color: 'text-yellow-400' },
      { name: 'Java', icon: FaJava, color: 'text-red-500' },
      { name: 'C#', icon: SiSharp, color: 'text-purple-500' },
      { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500' },
      { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-500' },
      { name: 'C/C++', icon: SiCplusplus, color: 'text-blue-600' },
      { name: 'SQL', icon: TbSql, color: 'text-orange-500' },
      { name: 'Bash', icon: SiGnubash, color: 'text-green-400' },
    ],
    'Frameworks & Libraries': [
      { name: 'Angular', icon: SiAngular, color: 'text-red-600' },
      { name: '.NET', icon: SiDotnet, color: 'text-purple-600' },
      { name: 'Spring Boot', icon: SiSpring, color: 'text-green-500' },
      { name: 'React', icon: SiReact, color: 'text-cyan-400' },
      { name: 'PyTorch', icon: SiPytorch, color: 'text-orange-600' },
      { name: 'Pandas', icon: SiPandas, color: 'text-blue-500' },
      { name: 'NumPy', icon: SiNumpy, color: 'text-blue-600' },
      { name: 'matplotlib', icon: SiPlotly, color: 'text-blue-400' },
    ],
    'Tools': [
      { name: 'Git', icon: SiGit, color: 'text-orange-600' },
      { name: 'Unity', icon: SiUnity, color: 'text-gray-300' },
      { name: 'Unix', icon: SiLinux, color: 'text-yellow-500' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-700' },
      { name: 'Postman', icon: SiPostman, color: 'text-orange-500' },
      { name: 'JUnit', icon: SiJunit5, color: 'text-green-600' },
      { name: 'Selenium', icon: SiSelenium, color: 'text-green-500' },
      { name: 'Google Colab', icon: SiGooglecolab, color: 'text-yellow-600' },
    ],
  };

  const experiences = [
    {
      company: 'Autodesk',
      role: 'Software Developer Intern',
      period: 'May 2025 – Aug 2025',
      location: 'Montreal, QC',
      description:
        "Enhancing real-time collaboration in Fusion, Autodesk's cloud-based design platform (TypeScript, React, C++).",
    },
    {
      company: 'Matrox',
      role: 'Software Engineering Intern',
      period: 'Jan 2024 – Aug 2024',
      location: 'Montreal, QC',
      description:
        'Engineered TypeScript applications and C# WebSocket loggers, optimized log storage by 75%, built Angular components with NgRx.',
    },
    {
      company: 'Hydro-Québec',
      role: 'Software Development Intern',
      period: 'May 2023 – Aug 2023',
      location: 'Montreal, QC',
      description:
        'Automated Excel validation tasks with VBA macros, reducing processing time by 95%. Built testing tools with Windows Forms.',
    },
  ];

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

  return (
    <div className="relative z-10 bg-slate-900/50 backdrop-blur-sm">
      {/* Skills Section */}
      <motion.section
        className="py-20 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
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
            {Object.entries(skillsConfig).map(([category, skillList]) => (
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
                    return (
                      <motion.div
                        key={skill.name}
                        className="flex flex-col items-center p-4 rounded-lg bg-slate-700/30 border border-gray-600/30 hover:bg-slate-700/50 transition-all duration-300"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: '0 4px 20px rgba(139, 92, 246, 0.15)'
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent
                          className={`text-4xl mb-2 ${skill.color} transition-all duration-300`}
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

      {/* Experience Section */}
      <motion.section
        className="py-20 px-6 bg-slate-800/30"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
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
            {experiences.map((exp) => (
              <motion.div
                key={`${exp.company}-${exp.period}`}
                className="bg-slate-800/50 p-6 rounded-lg border border-gray-700"
                variants={itemVariants}
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-200">
                      {exp.role}
                    </h3>
                    <p className="text-lg text-purple-400">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-300">{exp.period}</p>
                    <p className="text-gray-400">{exp.location}</p>
                  </div>
                </div>
                <p className="text-gray-300">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        className="py-20 px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
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
            className="bg-slate-800/50 p-8 rounded-lg border border-gray-700 text-center"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-semibold text-gray-200 mb-2">
              Bachelor of Engineering in Software Engineering Co-op
            </h3>
            <p className="text-xl text-purple-400 mb-3">McGill University</p>
            <p className="text-gray-300 mb-4">
              GPA: 3.68/4.00 | Aug 2021 – Dec 2025
            </p>
            <p className="text-gray-400">
              Key Courses: Algorithms and Data Structures, Operating Systems,
              Database Systems, Applied Machine Learning
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Footer */}
      <motion.footer
        className="py-12 px-6 bg-slate-900/80 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
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
      </motion.footer>
    </div>
  );
};

export default ScrollSections;
