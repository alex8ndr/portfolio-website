import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { education, experiences } from '../data/experiences';
import { projects } from '../data/projects';
import { skillCategories } from '../data/skills';
import { getButtonIcon, getProjectIcon, getSkillIcon, techIconMap } from '../utils/iconMaps';

const MobileLayout = () => {
    const [activeSection, setActiveSection] = useState<'projects' | 'experience' | 'skills'>('projects');

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Mobile Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
                <div className="flex items-center justify-between p-4">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Alex Turianskyj
                    </h1>
                    <div className="flex gap-4">
                        <a href="https://linkedin.com/in/alexturianskyj" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-xl text-blue-400 hover:text-blue-300" />
                        </a>
                        <a href="https://github.com/AlexTurianskyj" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="text-xl text-gray-300 hover:text-white" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="fixed top-16 left-0 right-0 z-40 bg-slate-800/95 backdrop-blur-sm">
                <div className="flex">
                    {(['projects', 'experience', 'skills'] as const).map((section) => (
                        <button
                            key={section}
                            onClick={() => setActiveSection(section)}
                            className={`flex-1 py-3 px-4 text-sm font-medium capitalize transition-colors ${activeSection === section
                                ? 'bg-purple-500/20 text-purple-300 border-b-2 border-purple-400'
                                : 'text-gray-400 hover:text-gray-300'
                                }`}
                        >
                            {section}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="pt-28 pb-8 px-4">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-2xl font-bold mb-2">Software Developer</h2>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        Passionate about creating innovative software solutions with expertise in full-stack development,
                        AI/ML, and immersive technologies.
                    </p>
                </motion.div>

                {/* Projects Section */}
                {activeSection === 'projects' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-4"
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <div className="text-2xl mt-1">
                                        {getProjectIcon(project, 'text-2xl')}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg mb-1" style={{ color: project.color }}>
                                            {project.name}
                                        </h3>
                                        <p className="text-gray-300 text-sm leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Tech Stack */}
                                <div className="flex flex-wrap gap-2 mb-3">                                    {project.techStack.slice(0, 6).map((tech, techIndex) => {
                                    const IconComponent = techIconMap[tech] || getSkillIcon(tech);
                                    return (
                                        <div
                                            key={techIndex}
                                            className="flex items-center gap-1 bg-slate-700/50 rounded-md px-2 py-1"
                                        >
                                            <IconComponent className="text-xs" style={{ color: project.color }} />
                                            <span className="text-xs text-gray-300">{tech}</span>
                                        </div>
                                    );
                                })}
                                </div>

                                {/* Buttons */}
                                {project.buttons && project.buttons.length > 0 && (
                                    <div className="flex gap-2">
                                        {project.buttons.map((button, buttonIndex) => (
                                            <button
                                                key={buttonIndex}
                                                onClick={() => window.open(button.url, '_blank')}
                                                className="flex items-center gap-2 bg-slate-700/70 hover:bg-slate-600/70 text-white px-3 py-2 rounded text-xs font-medium border border-slate-600 hover:border-slate-500 transition-colors"
                                            >
                                                {getButtonIcon(button.type)}
                                                <span>{button.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Experience Section */}
                {activeSection === 'experience' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        {/* Work Experience */}
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-purple-300">Work Experience</h3>
                            <div className="space-y-4">
                                {experiences.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                                    >                    <h4 className="font-bold text-lg text-blue-300">{exp.role}</h4>
                                        <p className="text-purple-400 font-medium">{exp.company}</p>
                                        <p className="text-gray-400 text-sm mb-2">{exp.period}</p>
                                        <p className="text-gray-300 text-sm mb-3">{exp.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {exp.skills.map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className="bg-slate-700/50 text-gray-300 text-xs px-2 py-1 rounded"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-purple-300">Education</h3>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                            >                <h4 className="font-bold text-lg text-blue-300">{education.degree}</h4>
                                <p className="text-purple-400 font-medium">{education.institution}</p>
                                <p className="text-gray-400 text-sm mb-2">{education.period}</p>
                                <p className="text-gray-300 text-sm mb-3">GPA: {education.gpa}</p>
                                <div className="flex flex-wrap gap-2">
                                    {education.skills.map((skill, skillIndex) => (
                                        <span
                                            key={skillIndex}
                                            className="bg-slate-700/50 text-gray-300 text-xs px-2 py-1 rounded"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}        {/* Skills Section */}
                {activeSection === 'skills' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        {Object.entries(skillCategories).map(([categoryName, categorySkills], categoryIndex) => (
                            <motion.div
                                key={categoryName}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: categoryIndex * 0.1 }}
                                className="bg-slate-800/50 rounded-lg p-4 border border-slate-700"
                            >
                                <h3 className="text-lg font-bold mb-3 text-purple-300">
                                    {categoryName}
                                </h3>
                                <div className="grid grid-cols-2 gap-3">                                    {categorySkills.map((skill, skillIndex) => {
                                    const IconComponent = getSkillIcon(skill.name);
                                    return (
                                        <div
                                            key={skillIndex}
                                            className="flex items-center gap-2 bg-slate-700/30 rounded-lg p-2"
                                        >
                                            <IconComponent
                                                className="text-lg flex-shrink-0"
                                                style={{ color: skill.color.replace('text-', '') === skill.color ? '#8b5cf6' : undefined }}
                                            />
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-gray-200 truncate">
                                                    {skill.name}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default MobileLayout;
