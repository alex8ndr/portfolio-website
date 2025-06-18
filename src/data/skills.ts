import { IconType } from 'react-icons';
import { DiDotnet } from 'react-icons/di';
import { FaJava } from 'react-icons/fa';
import { RiFileExcel2Fill } from 'react-icons/ri';
import {
    SiAngular,
    SiCplusplus,
    SiDotnet,
    SiGit,
    SiGnubash,
    SiGooglecolab,
    SiJavascript,
    SiJest,
    SiJunit5,
    SiLinux,
    SiNgrx,
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

export interface Skill {
    name: string;
    icon: IconType;
    color: string;
    category: 'programming' | 'frameworks' | 'tools';
}

export const skills: Skill[] = [    // Programming Languages
    { name: 'Python', icon: SiPython, color: 'text-yellow-400', category: 'programming' },
    { name: 'Java', icon: FaJava, color: 'text-red-500', category: 'programming' },
    { name: 'C#', icon: SiSharp, color: 'text-purple-500', category: 'programming' },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-blue-500', category: 'programming' },
    { name: 'JavaScript', icon: SiJavascript, color: 'text-yellow-500', category: 'programming' },
    { name: 'C++', icon: SiCplusplus, color: 'text-blue-600', category: 'programming' },
    { name: 'SQL', icon: TbSql, color: 'text-orange-500', category: 'programming' },
    { name: 'Bash', icon: SiGnubash, color: 'text-green-400', category: 'programming' },

    { name: 'VBA', icon: RiFileExcel2Fill, color: 'text-green-600', category: 'programming' },

    // Frameworks & Libraries
    { name: 'Angular', icon: SiAngular, color: 'text-red-600', category: 'frameworks' },
    { name: '.NET', icon: SiDotnet, color: 'text-purple-600', category: 'frameworks' },
    { name: 'Spring Boot', icon: SiSpring, color: 'text-green-500', category: 'frameworks' },
    { name: 'React', icon: SiReact, color: 'text-cyan-400', category: 'frameworks' },
    { name: 'PyTorch', icon: SiPytorch, color: 'text-orange-600', category: 'frameworks' },
    { name: 'Pandas', icon: SiPandas, color: 'text-blue-500', category: 'frameworks' },
    { name: 'NumPy', icon: SiNumpy, color: 'text-blue-600', category: 'frameworks' },
    { name: 'matplotlib', icon: SiPlotly, color: 'text-blue-400', category: 'frameworks' },

    { name: 'NgRx', icon: SiNgrx, color: 'text-purple-600', category: 'frameworks' },
    { name: 'Jest', icon: SiJest, color: 'text-red-500', category: 'frameworks' },
    { name: 'Windows Forms', icon: DiDotnet, color: 'text-purple-600', category: 'frameworks' },

    // Tools
    { name: 'Git', icon: SiGit, color: 'text-orange-600', category: 'tools' },
    { name: 'Unity', icon: SiUnity, color: 'text-gray-300', category: 'tools' },
    { name: 'Unix', icon: SiLinux, color: 'text-yellow-500', category: 'tools' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-blue-700', category: 'tools' },
    { name: 'Postman', icon: SiPostman, color: 'text-orange-500', category: 'tools' },
    { name: 'JUnit', icon: SiJunit5, color: 'text-green-600', category: 'tools' },
    { name: 'Selenium', icon: SiSelenium, color: 'text-green-500', category: 'tools' },
    { name: 'Google Colab', icon: SiGooglecolab, color: 'text-yellow-600', category: 'tools' },
];

export const skillCategories = {
    'Programming Languages': skills.filter(s => s.category === 'programming'),
    'Frameworks & Libraries': skills.filter(s => s.category === 'frameworks'),
    'Tools': skills.filter(s => s.category === 'tools'),
};
