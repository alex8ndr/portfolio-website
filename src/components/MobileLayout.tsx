import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { education, experiences } from '../data/experiences';
import { projects, type Project } from '../data/projects';
import { skillCategories, skills } from '../data/skills';
import { getButtonIcon, getProjectIcon, getTechIcons } from '../utils/iconMaps';

const MOBILE_CONFIG = {
    expanded: {
        width: 280,
        height: 280,
    },
    sizes: {
        large: {
            size: 105,
            icon: 'text-xl',
            title: 'text-sm/4',
            techIcon: 'text-base',
            techCount: 3,
            expanded: {
                width: 220,
                height: 250,
                iconSize: 'text-3xl',
                titleSize: 'text-lg',
                descriptionLines: 4,
                techCount: 4,
                descriptionFontSize: 'text-xs',
                buttonFontSize: 'text-xs',
                buttonPadding: 'px-2 py-2',
                buttonHeight: 'min-h-[40px]',
            },
        },
        medium: {
            size: 90,
            icon: 'text-lg',
            title: 'text-xs/3',
            techIcon: 'text-sm',
            techCount: 3,
            expanded: {
                width: 230,
                height: 280,
                iconSize: 'text-2xl',
                titleSize: 'text-base',
                descriptionLines: 3,
                techCount: 5,
                descriptionFontSize: 'text-xs',
                buttonFontSize: 'text-xs',
                buttonPadding: 'px-2 py-2',
                buttonHeight: 'min-h-[40px]',
            },
        },
        small: {
            size: 80,
            icon: 'text-md',
            title: 'text-xs/3',
            techIcon: 'text-sm',
            techCount: 2,
            expanded: {
                width: 205,
                height: 240,
                iconSize: 'text-xl',
                titleSize: 'text-sm',
                descriptionLines: 3,
                techCount: 4,
                descriptionFontSize: 'text-xs',
                buttonFontSize: 'text-xs',
                buttonPadding: 'px-2 py-1.5',
                buttonHeight: 'min-h-[40px]',
            },
        },
    },
};

const MOBILE_NODE_POSITIONS: Record<string, { x: string | number; y: string | number; sizeCategory: 'large' | 'medium' | 'small' }> = {
    'daily-ball': { x: '15vw', y: '-30vh', sizeCategory: 'large' },     // top-left (largest)
    'vibe': { x: '-15vw', y: '-22vh', sizeCategory: 'large' },          // top-right
    'choose-movie': { x: '20vw', y: '-14vh', sizeCategory: 'large' },   // upper-left
    'personal-website': { x: '-18vw', y: '-5vh', sizeCategory: 'medium' }, // upper-right
    'holoportation': { x: '15vw', y: '2vh', sizeCategory: 'medium' },    // center-left
    'event-horizons': { x: '-10vw', y: '14vh', sizeCategory: 'small' },  // center-right
    'unitrade': { x: '22vw', y: '20vh', sizeCategory: 'small' },         // lower-left
    'impostorbot': { x: '-20vw', y: '28vh', sizeCategory: 'small' },     // lower-right
    'slightly-edited-songs': { x: '15vw', y: '35vh', sizeCategory: 'small' }, // bottom
};

interface MobileProjectNodeProps {
    project: Project;
    index: number;
    position: { x: string | number; y: string | number; sizeCategory: 'large' | 'medium' | 'small' };
    isExpanded: boolean;
    onTap: () => void;
}

const MobileProjectNode = ({ project, index, position, isExpanded, onTap }: MobileProjectNodeProps) => {
    const [isPressed, setIsPressed] = useState(false);

    // Get size config based on category
    const sizeConfig = MOBILE_CONFIG.sizes[position.sizeCategory];
    const nodeSize = sizeConfig.size;

    // Get expanded dimensions based on size category
    const expandedConfig = sizeConfig.expanded;
    const expandedWidth = expandedConfig.width;
    const expandedHeight = expandedConfig.height;

    // Helper function to format position values
    const formatPosition = (pos: string | number) => {
        return typeof pos === 'string' ? pos : `${pos}px`;
    }; return (<motion.div
        className="absolute cursor-pointer" style={{
            left: `calc(50% + ${formatPosition(position.x)} - ${isExpanded ? expandedWidth / 2 : nodeSize / 2}px)`,
            top: `calc(50% + ${formatPosition(position.y)} - ${isExpanded ? expandedHeight / 2 : nodeSize / 2}px)`,
            zIndex: isExpanded ? 50 : 20 + index,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
            scale: 1,
            opacity: 1,
            left: `calc(50% + ${formatPosition(position.x)} - ${isExpanded ? expandedWidth / 2 : nodeSize / 2}px)`,
            top: `calc(50% + ${formatPosition(position.y)} - ${isExpanded ? expandedHeight / 2 : nodeSize / 2}px)`,
            zIndex: isExpanded ? 50 : 20,
        }}
        transition={{
            delay: index * 0.1,
            duration: 0.6,
            type: 'spring',
            damping: 20,
            left: { duration: 0.4, ease: 'easeOut' },
            top: { duration: 0.4, ease: 'easeOut' },
            zIndex: { duration: 0 },
        }} onTapStart={() => setIsPressed(true)}
        onTap={(e) => {
            e.stopPropagation(); // Prevent bubbling to background overlay
            setIsPressed(false);
            onTap();
        }}
        onTapCancel={() => setIsPressed(false)}
    >
        <motion.div
            animate={{
                scale: isPressed ? 0.95 : 1,
                y: isExpanded ? 0 : [0, -5, 0],
                rotate: isExpanded ? 0 : [0, 1, 0, -1, 0],
            }}
            transition={{
                scale: { duration: 0.1 },
                y: isExpanded ? { duration: 0.3 } : { duration: 4 + index * 0.5, repeat: Infinity },
                rotate: isExpanded ? { duration: 0.3 } : { duration: 6 + index * 0.3, repeat: Infinity },
            }}
        >            {/* Main node container */}
            <motion.div
                className="relative flex items-center justify-center" style={{
                    width: isExpanded ? expandedWidth : nodeSize,
                    height: isExpanded ? expandedHeight : nodeSize,
                }}
                animate={{
                    width: isExpanded ? expandedWidth : nodeSize,
                    height: isExpanded ? expandedHeight : nodeSize,
                }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >{/* Background layer - exact copy from desktop */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)`,
                    }}
                    animate={{ borderRadius: isExpanded ? '12px' : '50%' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                />                {/* Glow effect - exact copy from desktop */}
                <motion.div
                    className="absolute"
                    style={{ left: 0, top: 0, zIndex: -1 }} animate={{
                        width: isExpanded ? expandedWidth : nodeSize,
                        height: isExpanded ? expandedHeight : nodeSize,
                        borderRadius: isExpanded ? '22px' : '50%',
                        boxShadow: isExpanded
                            ? `0 0 40px ${project.color}80`
                            : `0 0 20px ${project.color}60`,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                />

                {/* Border layer - exact copy from desktop */}
                <motion.div
                    className="absolute inset-0"
                    style={{ border: `3px solid ${project.color}` }}
                    animate={{ borderRadius: isExpanded ? '12px' : '50%' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                />

                {/* Content */}
                <div className="relative z-10 w-full h-full">
                    <AnimatePresence mode="wait">
                        {!isExpanded ? (
                            <motion.div
                                key="collapsed" className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.05 } }}
                                transition={{
                                    opacity: { delay: 0.3, duration: 0.2 },
                                    scale: { duration: 0.1, ease: 'easeOut' },
                                }}
                            >
                                <motion.div
                                    className="mb-1.5"
                                    animate={{ scale: isPressed ? 1.1 : 1 }}
                                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                                >
                                    {getProjectIcon(project, sizeConfig.icon)}
                                </motion.div>

                                <h3 className={`text-white ${sizeConfig.title} font-medium mb-1.5`}>
                                    {project.name}
                                </h3>

                                <div className="flex items-center justify-center gap-1">
                                    {getTechIcons(project.techStack)
                                        .slice(0, sizeConfig.techCount)
                                        .map(({ tech, icon: IconComponent }, iconIndex) => (
                                            <IconComponent
                                                key={iconIndex}
                                                className={`${sizeConfig.techIcon} opacity-70`}
                                                style={{ color: project.color }}
                                                title={tech}
                                            />
                                        ))}
                                </div>
                            </motion.div>
                        ) : (<motion.div
                            key="expanded"
                            className="absolute inset-0 flex flex-col items-center justify-start p-4 overflow-hidden"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >                            <div className="flex flex-col items-center space-y-2">
                                <motion.div
                                    initial={{ scale: 1 }}
                                    animate={{ scale: 1.2 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {getProjectIcon(project, expandedConfig.iconSize)}
                                </motion.div>

                                <h3 className={`text-white ${expandedConfig.titleSize} leading-none font-bold text-center mb-1`} style={{ lineHeight: '0.8' }}>
                                    {project.name}
                                </h3>
                            </div>                            <div className="flex flex-col items-center space-y-2 flex-1 justify-center">
                                <p className={`text-gray-300 ${expandedConfig.descriptionFontSize} text-center leading-relaxed px-2 overflow-hidden`}
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: expandedConfig.descriptionLines,
                                        WebkitBoxOrient: 'vertical' as const,
                                        maxHeight: `${expandedConfig.descriptionLines * 1.2}rem`,
                                    }}>
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap items-center justify-center gap-1 px-2">
                                    {getTechIcons(project.techStack)
                                        .slice(0, expandedConfig.techCount)
                                        .map(({ tech, icon: IconComponent }, iconIndex) => (
                                            <div
                                                key={iconIndex}
                                                className="flex items-center gap-1 bg-gray-800/50 rounded-md px-1.5 py-0.5 text-xs"
                                            >
                                                <IconComponent
                                                    className="text-xs"
                                                    style={{ color: project.color }}
                                                />
                                                <span className="text-gray-300 text-xs whitespace-nowrap">
                                                    {tech}
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>                            {project.buttons && project.buttons.length > 0 ? (
                                <div className="flex gap-1.5 w-full px-0">
                                    {project.buttons
                                        .slice(0, 2)
                                        .map((button, buttonIndex) => (
                                            <motion.button
                                                key={buttonIndex}
                                                className={`flex-1 bg-gray-800/70 active:bg-gray-700/90 text-white ${expandedConfig.buttonPadding} rounded-lg ${expandedConfig.buttonFontSize} font-medium border border-gray-600/50 active:border-gray-500/70 flex items-center justify-center gap-1.5 transition-colors duration-200 ${expandedConfig.buttonHeight}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(button.url, '_blank');
                                                }}
                                                whileTap={{ scale: 0.96 }}
                                            >
                                                <span className={`${expandedConfig.buttonFontSize} flex-shrink-0`}>
                                                    {getButtonIcon(button.type)}
                                                </span>
                                                <span className={`${expandedConfig.buttonFontSize} leading-none truncate`}>
                                                    {button.label}
                                                </span>
                                            </motion.button>
                                        ))}
                                </div>) : project.link ? (
                                    <motion.div className={`${expandedConfig.buttonFontSize} text-gray-400 opacity-80`}>
                                        Tap to visit →
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

const MobileLayout = () => {
    const [expandedProject, setExpandedProject] = useState<string | null>(null); return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Mobile Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
                <div className="flex items-center justify-between p-4">                    <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    Alex Turianskyj - Software Developer
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
            </div>            {/* Hero Section with Project Nodes */}
            <div className="relative h-screen pt-16">
                {/* Background overlay for closing expanded nodes */}
                {expandedProject !== null && (
                    <motion.div
                        className="absolute inset-0 z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onTap={() => setExpandedProject(null)}
                    />
                )}                {/* Project Nodes */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {projects
                        .filter(project => MOBILE_NODE_POSITIONS[project.id])
                        .map((project, index) => (
                            <MobileProjectNode
                                key={project.id}
                                project={project}
                                index={index}
                                position={MOBILE_NODE_POSITIONS[project.id]}
                                isExpanded={expandedProject === project.id}
                                onTap={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                            />
                        ))}
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: expandedProject === null ? 1 : 0 }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                >
                    <p className="text-gray-400 text-sm mb-2">Tap projects to explore</p>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-gray-400"
                    >
                        ↓
                    </motion.div>
                </motion.div>
            </div>            {/* Scrollable Sections */}
            <div className="relative z-20 bg-slate-900">
                {/* Skills Section - Desktop-like with 2x4 grid and colored logos */}
                <div className="px-4 py-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >                        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Skills & Technologies
                        </h3>
                        <div className="space-y-4">
                            {Object.entries(skillCategories).map(([categoryName, categorySkills], categoryIndex) => (
                                <motion.div
                                    key={categoryName}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: categoryIndex * 0.05, duration: 0.4 }}
                                    className="bg-slate-800/50 rounded-lg p-4 border border-gray-700/50"
                                >
                                    <h4 className="text-base font-semibold mb-4 text-gray-200 text-center">
                                        {categoryName}
                                    </h4>                                    <div className="grid grid-cols-4 gap-3">
                                        {categorySkills.slice(0, 8).map((skill, skillIndex) => {
                                            const IconComponent = skill.icon;
                                            return (
                                                <motion.div
                                                    key={skillIndex}
                                                    className="flex flex-col items-center p-3 rounded-md border bg-slate-700/30 border-gray-600/30 hover:bg-slate-700/50 transition-all duration-300"
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <IconComponent
                                                        className={`text-xl mb-2 transition-all duration-300 ${skill.color}`}
                                                    />
                                                    <span className="text-xs text-gray-200 text-center font-medium leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                                                        {skill.name}
                                                    </span>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Experience Section - Desktop-like with logos */}
                <div className="px-4 py-8 bg-slate-800/20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h3 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Experience
                        </h3>

                        {/* Work Experience */}
                        <div className="space-y-4 mb-6">
                            {experiences.slice(0, 3).map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05, duration: 0.4 }}
                                    className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/50"
                                    whileHover={{ scale: 1.01 }}
                                >
                                    <div className="flex gap-2 mb-2 flex-shrink-0">
                                        {exp.logo && (
                                            <img
                                                src={exp.logo}
                                                alt={`${exp.company} logo`}
                                                className="w-10 h-10 object-contain rounded flex-shrink-0"
                                            />
                                        )}                                        <div className="flex-1 min-w-0">
                                            <h5 className="text-sm font-semibold text-gray-200 mb-1 truncate">{exp.role}</h5>
                                            <div className="flex justify-between items-center gap-1">
                                                <p className="text-purple-400 text-xs truncate">{exp.company}</p>
                                                <p className="text-xs text-gray-400 flex-shrink-0">{exp.period}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-gray-300 text-xs leading-relaxed mb-2">{exp.description}</p>                                    <div className="flex flex-wrap gap-1">
                                        {exp.skills.slice(0, 3).map((skillName, skillIndex) => {
                                            const skill = skills.find(s =>
                                                s.name.toLowerCase().includes(skillName.toLowerCase()) ||
                                                skillName.toLowerCase().includes(s.name.toLowerCase())
                                            );

                                            if (!skill) {
                                                return (
                                                    <div
                                                        key={skillIndex}
                                                        className="flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-gray-700/50 border border-gray-600/30"
                                                    >
                                                        <span className="text-gray-300 truncate">{skillName}</span>
                                                    </div>
                                                );
                                            }

                                            const IconComponent = skill.icon;

                                            return (
                                                <div
                                                    key={skillIndex}
                                                    className="flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-gray-700/50 border border-gray-600/30"
                                                >
                                                    <IconComponent className={`${skill.color} text-xs`} />
                                                    <span className="text-gray-300 truncate">{skillName}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            ))}
                        </div>                        {/* Education Section */}
                        <div className="mb-6">
                            <h4 className="text-lg font-bold mb-4 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                Education
                            </h4>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.4 }}
                                className="bg-slate-800/40 rounded-lg p-3 border border-slate-700/50"
                                whileHover={{ scale: 1.01 }}
                            >
                                <div className="flex gap-2 mb-2 flex-shrink-0">
                                    {education.logo && (
                                        <img
                                            src={education.logo}
                                            alt={`${education.institution} logo`}
                                            className="w-10 h-10 object-contain rounded flex-shrink-0"
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h5 className="text-sm font-semibold text-gray-200 leading-tight">{education.degree}</h5>
                                            <p className="text-xs text-gray-400 flex-shrink-0 ml-2">{education.period}</p>
                                        </div>
                                        <div className="flex justify-between items-center gap-1">
                                            <p className="text-purple-400 text-xs truncate">{education.institution}</p>
                                            <p className="text-xs text-gray-400">GPA: {education.gpa}</p>
                                        </div>
                                    </div>
                                </div>

                                {education.courses && (
                                    <div className="mb-2">
                                        <h6 className="text-xs font-semibold text-gray-300 mb-1">Key Courses:</h6>
                                        <div className="flex flex-wrap gap-1">
                                            {education.courses.slice(0, 3).map((course, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 bg-gray-700/50 border border-gray-600/30 rounded-md text-xs text-gray-300 leading-tight"
                                                >
                                                    {course}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Skills with icons */}
                                <div className="flex flex-wrap gap-1">
                                    {education.skills.slice(0, 4).map((skillName, skillIndex) => {
                                        const skill = skills.find(s =>
                                            s.name.toLowerCase().includes(skillName.toLowerCase()) ||
                                            skillName.toLowerCase().includes(s.name.toLowerCase())
                                        );

                                        if (!skill) {
                                            return (
                                                <div
                                                    key={skillIndex}
                                                    className="flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-gray-700/50 border border-gray-600/30"
                                                >
                                                    <span className="text-gray-300 truncate">{skillName}</span>
                                                </div>
                                            );
                                        }

                                        const IconComponent = skill.icon;

                                        return (
                                            <div
                                                key={skillIndex}
                                                className="flex items-center gap-1 px-2 py-1 rounded-md text-xs bg-gray-700/50 border border-gray-600/30"
                                            >
                                                <IconComponent className={`${skill.color} text-xs`} />
                                                <span className="text-gray-300 truncate">{skillName}</span>                                        </div>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default MobileLayout;
