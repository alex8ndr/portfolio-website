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
import { MdLocationOn } from 'react-icons/md';
import { RiFileExcel2Fill } from 'react-icons/ri';
import {
    SiAngular,
    SiCplusplus,
    SiCss3,
    SiDevpost,
    SiDjango,
    SiDotnet,
    SiGit,
    SiGnubash,
    SiGooglecolab,
    SiHtml5,
    SiJavascript,
    SiJest,
    SiJunit5,
    SiJupyter,
    SiLinux,
    SiNgrx,
    SiNodedotjs,
    SiNumpy,
    SiOpencv,
    SiPandas,
    SiPlotly,
    SiPostgresql,
    SiPostman,
    SiPython,
    SiPytorch,
    SiReact,
    SiScipy,
    SiSelenium,
    SiSharp,
    SiSpring,
    SiStreamlit,
    SiTailwindcss,
    SiTypescript,
    SiUnity,
    SiVite
} from 'react-icons/si';
import { TbSql } from 'react-icons/tb';
import { Project, ProjectButton } from '../data/projects';

// Maps project IDs to icons
export const getProjectIcon = (project: Project, iconClass: string = '') => {
    const iconMap: { [key: string]: JSX.Element } = {
        'daily-ball': <FaGamepad className={iconClass} style={{ color: project.color }} />,
        'vibe': <BsMusicNoteBeamed className={iconClass} style={{ color: project.color }} />,
        'choose-movie': <BsCameraReelsFill className={iconClass} style={{ color: project.color }} />,
        'portfolio-website': <FaCode className={iconClass} style={{ color: project.color }} />,
        'holoportation': <BsHeadsetVr className={iconClass} style={{ color: project.color }} />,
        'event-horizons': <FaCalendarAlt className={iconClass} style={{ color: project.color }} />,
        'unitrade': <BsBagFill className={iconClass} style={{ color: project.color }} />,
        'impostorbot': <BsRobot className={iconClass} style={{ color: project.color }} />,
        'slightly-edited-songs': <FaYoutube className={iconClass} style={{ color: project.color }} />,
    };

    return iconMap[project.id] || <FaGamepad className={`text-gray-400 ${iconClass}`} />;
};

// Maps button types to icons
export const getButtonIcon = (type: ProjectButton['type']) => {
    const icons: Record<string, JSX.Element> = {
        github: <FaGithub />,
        devpost: <SiDevpost />,
        demo: <FaExternalLinkAlt />,
        googleplay: <FaGooglePlay />,
        location: <MdLocationOn />,
    };
    return icons[type] || <FaExternalLinkAlt />;
};

// Returns icon components for each tech in a stack
export const getTechIcons = (techStack: string[]) => {
    return techStack.map((tech: string) => {
        const IconComponent = techIconMap[tech] || BiCode;
        return { tech, icon: IconComponent };
    });
};

// Maps skill names to icon components
export const skillIconMap: { [key: string]: any } = {
    // Programming Languages
    Python: SiPython,
    JavaScript: SiJavascript,
    TypeScript: SiTypescript,
    Java: FaJava,
    'C++': SiCplusplus,
    'C#': SiSharp,
    SQL: TbSql,
    Bash: SiGnubash,
    VBA: RiFileExcel2Fill,

    // Web Technologies
    React: SiReact,
    'Node.js': SiNodedotjs,
    HTML: SiHtml5,
    CSS: SiCss3,
    Tailwind: SiTailwindcss,
    Vite: SiVite,

    // Frameworks & Libraries
    Angular: SiAngular,
    '.NET': SiDotnet,
    'Spring Boot': SiSpring,
    Unity: SiUnity,
    'Windows Forms': DiDotnet,
    Django: SiDjango,
    PyTorch: SiPytorch,
    NgRx: SiNgrx,
    Jest: SiJest,
    matplotlib: SiPlotly,

    // Databases
    PostgreSQL: SiPostgresql,

    // Data Science & ML
    Pandas: SiPandas,
    NumPy: SiNumpy,
    SciPy: SiScipy,
    OpenCV: SiOpencv,
    Streamlit: SiStreamlit,

    // Tools
    Git: SiGit,
    Unix: SiLinux,
    Postman: SiPostman,
    JUnit: SiJunit5,
    Selenium: SiSelenium,
    'Google Colab': SiGooglecolab,

    // Legacy mappings for compatibility
    WinForms: DiDotnet,
    Linux: SiLinux,
    GoogleColab: SiGooglecolab,
    Jupyter: SiJupyter,
    Excel: RiFileExcel2Fill,
    Plotly: SiPlotly,
    Ngrx: SiNgrx,
    Pytorch: SiPytorch,
    Dotnet: SiDotnet,
    Sql: TbSql,
};

export const getSkillIcon = (skillName: string) => {
    return skillIconMap[skillName] || FaCode;
};

// Maps tech stack names to icon components
export const techIconMap: { [key: string]: any } = {
    // Most tech icons use skillIconMap
    ...skillIconMap,

    // Project-specific tech mappings
    'HTML/CSS': SiHtml5,
    WinForms: DiDotnet, // Alias for Windows Forms
};
