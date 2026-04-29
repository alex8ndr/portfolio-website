import type { IconType } from 'react-icons';
import { getSkillIcon } from '../utils/iconMaps';

export interface Skill {
    name: string;
    color: string;
    category: 'programming' | 'frameworks' | 'tools';
    icon?: IconType; // Computed from iconMap
}

export const skillsData: Omit<Skill, 'icon'>[] = [
    // Programming Languages (Top 8)
    { name: 'Python', color: 'text-yellow-400', category: 'programming' },
    { name: 'TypeScript', color: 'text-blue-500', category: 'programming' },
    { name: 'JavaScript', color: 'text-yellow-500', category: 'programming' },
    { name: 'Java', color: 'text-red-500', category: 'programming' },
    { name: 'C#', color: 'text-purple-500', category: 'programming' },
    { name: 'C++', color: 'text-blue-600', category: 'programming' },
    { name: 'SQL', color: 'text-orange-500', category: 'programming' },
    { name: 'Bash', color: 'text-green-400', category: 'programming' },
    // Additional
    { name: 'VBA', color: 'text-green-600', category: 'programming' },

    // Frameworks & Libraries (Top 8)
    { name: 'Angular', color: 'text-red-600', category: 'frameworks' },
    { name: 'React', color: 'text-cyan-400', category: 'frameworks' },
    { name: 'Spring Boot', color: 'text-green-500', category: 'frameworks' },
    { name: '.NET', color: 'text-purple-600', category: 'frameworks' },
    { name: 'OpenCV', color: 'text-green-600', category: 'frameworks' },
    { name: 'NumPy', color: 'text-blue-600', category: 'frameworks' },
    { name: 'Azure', color: 'text-blue-600', category: 'frameworks' },
    { name: 'Unity', color: 'text-gray-400', category: 'frameworks' },
    // Additional
    { name: 'Pandas', color: 'text-blue-500', category: 'frameworks' },
    { name: 'NgRx', color: 'text-purple-600', category: 'frameworks' },
    { name: 'PyTorch', color: 'text-orange-600', category: 'frameworks' },
    { name: 'matplotlib', color: 'text-blue-400', category: 'frameworks' },
    { name: 'Windows Forms', color: 'text-purple-600', category: 'frameworks' },
    { name: 'GraphQL', color: 'text-pink-500', category: 'frameworks' },

    // Tools (Top 8)
    { name: 'Git', color: 'text-orange-600', category: 'tools' },
    { name: 'GitHub Actions', color: 'text-blue-500', category: 'tools' },
    { name: 'Docker', color: 'text-blue-400', category: 'tools' },
    { name: 'PostgreSQL', color: 'text-blue-700', category: 'tools' },
    { name: 'Postman', color: 'text-orange-500', category: 'tools' },
    { name: 'Cypress', color: 'text-green-500', category: 'tools' },
    { name: 'Jest', color: 'text-red-500', category: 'tools' },
    { name: 'JUnit', color: 'text-green-600', category: 'tools' },
    // Additional
    { name: 'Swagger', color: 'text-green-500', category: 'tools' },
    { name: 'Selenium', color: 'text-green-500', category: 'tools' },
    { name: 'Jira', color: 'text-blue-600', category: 'tools' },
    { name: 'Unix', color: 'text-yellow-500', category: 'tools' },
    { name: 'Google Colab', color: 'text-yellow-600', category: 'tools' },
    { name: 'AWS', color: 'text-orange-400', category: 'tools' },
    { name: 'Catch2', color: 'text-red-400', category: 'tools' },
];

// Skills array with icons from iconMap
export const skills: Skill[] = skillsData.map(skill => ({
    ...skill,
    icon: getSkillIcon(skill.name)
}));

export const skillCategories = {
    'Programming Languages': skills.filter(s => s.category === 'programming'),
    'Frameworks & Platforms': skills.filter(s => s.category === 'frameworks'),
    'Tools & Testing': skills.filter(s => s.category === 'tools'),
};
