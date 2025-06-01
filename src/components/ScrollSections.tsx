import { motion } from 'framer-motion';

const ScrollSections = () => {
  const skills = {
    programming: ['Python', 'Java', 'C#', 'TypeScript', 'C/C++', 'SQL', 'Bash'],
    frameworks: ['Angular', '.NET', 'Spring Boot', 'React', 'Unity'],
    tools: [
      'Git',
      'PostgreSQL',
      'Postman',
      'Selenium',
      'JUnit',
      'Pandas',
      'NumPy',
      'Unix',
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
            {Object.entries(skills).map(([category, skillList]) => (
              <motion.div
                key={category}
                className="bg-slate-800/50 p-6 rounded-lg border border-gray-700"
                variants={itemVariants}
              >
                <h3 className="text-xl font-semibold mb-4 capitalize text-gray-200">
                  {category.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span
                      key={skill}
                      className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 px-3 py-1 rounded-full text-sm text-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
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
