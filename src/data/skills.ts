import { IconType } from 'react-icons';
import { getSkillIcon } from '../utils/iconMaps';

export interface Skill {
    name: string;
    color: string;
    category: 'programming' | 'frameworks' | 'tools';
    icon?: IconType; // Optional, will be computed from iconMap
}

export const skillsData: Omit<Skill, 'icon'>[] = [
    // Programming Languages
    { name: 'Python', color: 'text-yellow-400', category: 'programming' },
    { name: 'Java', color: 'text-red-500', category: 'programming' },
    { name: 'C#', color: 'text-purple-500', category: 'programming' },
    { name: 'TypeScript', color: 'text-blue-500', category: 'programming' },
    { name: 'JavaScript', color: 'text-yellow-500', category: 'programming' },
    { name: 'C++', color: 'text-blue-600', category: 'programming' },
    { name: 'SQL', color: 'text-orange-500', category: 'programming' },
    { name: 'Bash', color: 'text-green-400', category: 'programming' },
    { name: 'VBA', color: 'text-green-600', category: 'programming' },

    // Frameworks & Libraries
    { name: 'Angular', color: 'text-red-600', category: 'frameworks' },
    { name: '.NET', color: 'text-purple-600', category: 'frameworks' },
    { name: 'Spring Boot', color: 'text-green-500', category: 'frameworks' },
    { name: 'React', color: 'text-cyan-400', category: 'frameworks' },
    { name: 'PyTorch', color: 'text-orange-600', category: 'frameworks' },
    { name: 'Pandas', color: 'text-blue-500', category: 'frameworks' },
    { name: 'NumPy', color: 'text-blue-600', category: 'frameworks' },
    { name: 'matplotlib', color: 'text-blue-400', category: 'frameworks' },
    { name: 'NgRx', color: 'text-purple-600', category: 'frameworks' },
    { name: 'Jest', color: 'text-red-500', category: 'frameworks' },
    { name: 'Windows Forms', color: 'text-purple-600', category: 'frameworks' },

    // Tools
    { name: 'Git', color: 'text-orange-600', category: 'tools' },
    { name: 'Unity', color: 'text-gray-300', category: 'tools' },
    { name: 'Unix', color: 'text-yellow-500', category: 'tools' },
    { name: 'PostgreSQL', color: 'text-blue-700', category: 'tools' },
    { name: 'Postman', color: 'text-orange-500', category: 'tools' },
    { name: 'JUnit', color: 'text-green-600', category: 'tools' },
    { name: 'Selenium', color: 'text-green-500', category: 'tools' },
    { name: 'Google Colab', color: 'text-yellow-600', category: 'tools' },
];

// Computed skills array with icons from iconMap
export const skills: Skill[] = skillsData.map(skill => ({
    ...skill,
    icon: getSkillIcon(skill.name)
}));

export const skillCategories = {
    'Programming Languages': skills.filter(s => s.category === 'programming'),
    'Frameworks & Libraries': skills.filter(s => s.category === 'frameworks'),
    'Tools': skills.filter(s => s.category === 'tools'),
};
