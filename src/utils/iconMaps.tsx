import { BiCode } from 'react-icons/bi';
import {
    BsBagFill,
    BsCameraReelsFill,
    BsHeadsetVr,
    BsMusicNoteBeamed,
    BsRobot,
} from 'react-icons/bs';
import { DiDotnet } from 'react-icons/di';
import {
    FaCalendarAlt,
    FaCode,
    FaExternalLinkAlt,
    FaGamepad,
    FaGithub,
    FaGooglePlay,
    FaJava,
    FaYoutube,
} from 'react-icons/fa';
import {
    SiCplusplus,
    SiCss3,
    SiDevpost,
    SiDjango,
    SiHtml5,
    SiJavascript,
    SiNodedotjs,
    SiNumpy,
    SiOpencv,
    SiPandas,
    SiPostgresql,
    SiPython,
    SiReact,
    SiScipy,
    SiSharp,
    SiSpring,
    SiStreamlit,
    SiTailwindcss,
    SiTypescript,
    SiUnity,
    SiVite
} from 'react-icons/si';
import { Project, ProjectButton } from '../data/projects';

// Tech stack icon mapping
export const techIconMap: { [key: string]: any } = {
    'C++': SiCplusplus,
    'C#': SiSharp,
    Python: SiPython,
    OpenCV: SiOpencv,
    Unity: SiUnity,
    JavaScript: SiJavascript,
    'HTML/CSS': SiHtml5,
    HTML: SiHtml5,
    CSS: SiCss3,
    TypeScript: SiTypescript,
    'Node.js': SiNodedotjs,
    Tailwind: SiTailwindcss,
    Vite: SiVite,
    Java: FaJava,
    'Spring Boot': SiSpring,
    React: SiReact,
    PostgreSQL: SiPostgresql,
    Pandas: SiPandas,
    NumPy: SiNumpy,
    Streamlit: SiStreamlit,
    WinForms: DiDotnet,
    Django: SiDjango,
    SciPy: SiScipy,
};

// Project icon mapping
export const getProjectIcon = (project: Project, iconClass: string = '') => {
    const iconMap: { [key: string]: JSX.Element } = {
        'daily-ball': <FaGamepad className={iconClass} style={{ color: project.color }} />,
        'vibe': <BsMusicNoteBeamed className={iconClass} style={{ color: project.color }} />,
        'choose-movie': <BsCameraReelsFill className={iconClass} style={{ color: project.color }} />,
        'personal-website': <FaCode className={iconClass} style={{ color: project.color }} />,
        'holoportation': <BsHeadsetVr className={iconClass} style={{ color: project.color }} />,
        'event-horizons': <FaCalendarAlt className={iconClass} style={{ color: project.color }} />,
        'unitrade': <BsBagFill className={iconClass} style={{ color: project.color }} />,
        'impostorbot': <BsRobot className={iconClass} style={{ color: project.color }} />,
        'slightly-edited-songs': <FaYoutube className={iconClass} style={{ color: project.color }} />,
    };

    return iconMap[project.id] || <FaGamepad className={`text-gray-400 ${iconClass}`} />;
};

// Button icon mapping
export const getButtonIcon = (type: ProjectButton['type']) => {
    const icons: Record<string, JSX.Element> = {
        github: <FaGithub />,
        devpost: <SiDevpost />,
        demo: <FaExternalLinkAlt />,
        googleplay: <FaGooglePlay />,
    };
    return icons[type] || <FaExternalLinkAlt />;
};

// Get tech icons for a project
export const getTechIcons = (techStack: string[]) => {
    return techStack.map((tech: string) => {
        const IconComponent = techIconMap[tech] || BiCode;
        return { tech, icon: IconComponent };
    });
};

// Skills icon mapping
export const skillIconMap: { [key: string]: any } = {
    // Programming Languages
    Python: SiPython,
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    Java: FaJava,
    'C++': SiCplusplus,
    'C#': SiSharp,

    // Web Technologies
    React: SiReact,
    'Node.js': SiNodedotjs,
    HTML: SiHtml5,
    CSS: SiCss3,
    Tailwind: SiTailwindcss,
    Vite: SiVite,

    // Frameworks & Libraries
    Django: SiDjango,
    'Spring Boot': SiSpring,
    Unity: SiUnity,
    WinForms: DiDotnet,

    // Databases
    PostgreSQL: SiPostgresql,

    // Data Science & ML
    Pandas: SiPandas,
    NumPy: SiNumpy,
    SciPy: SiScipy,
    OpenCV: SiOpencv,
    Streamlit: SiStreamlit,
};

export const getSkillIcon = (skillName: string) => {
    return skillIconMap[skillName] || FaCode;
};
