export interface Experience {
    id: string;
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
    logo?: string; // URL to company logo
    skills: string[]; // Skills used in this experience
    invisibleSkills?: string[]; // Hidden skills for highlighting (e.g., Git)
}

export const experiences: Experience[] = [
    {
        id: 'autodesk',
        company: 'Autodesk',
        role: 'Software Developer Intern',
        period: 'May 2025 – Aug 2025',
        location: 'Montreal, QC',
        description: "Enhancing real-time collaboration in Fusion, Autodesk's cloud-based design platform.",
        logo: '/logos/autodesk.jpeg',
        skills: ['TypeScript', 'React', 'C++'],
        invisibleSkills: ['Git'],
    },
    {
        id: 'matrox',
        company: 'Matrox',
        role: 'Software Engineering Intern',
        period: 'Jan 2024 – Aug 2024',
        location: 'Montreal, QC',
        description: 'Engineered TypeScript applications and C# WebSocket loggers, optimized log storage by 75%, built Angular components with NgRx.',
        logo: '/logos/matrox.jpeg',
        skills: ['TypeScript', 'C#', 'Angular', '.NET', 'JUnit', 'Selenium'],
        invisibleSkills: ['Git', 'Postman'],
    },
    {
        id: 'hydro-quebec',
        company: 'Hydro-Québec',
        role: 'Software Development Intern',
        period: 'May 2023 – Aug 2023',
        location: 'Montreal, QC',
        description: 'Automated Excel validation tasks with VBA macros, reducing processing time by 95%. Built testing tools with Windows Forms.',
        logo: '/logos/hydro-quebec.jpeg',
        skills: ['C#', 'JavaScript'],
        invisibleSkills: ['Git'],
    },
];

export interface Course {
    name: string;
    skills: string[];
    visible?: boolean; // Whether to show this course in the UI
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    period: string;
    location: string;
    gpa: string;
    logo: string;
    courses: Course[];
}

export const education: Education = {
    id: 'mcgill',
    institution: 'McGill University',
    degree: 'B.Eng. Software Engineering Co-op',
    period: 'Aug 2021 – Dec 2025',
    location: 'Montreal, QC',
    gpa: '3.68/4.00',
    logo: '/logos/mcgill.jpeg', courses: [
        { name: 'Algorithms and Data Structures', skills: ['Java', 'JUnit'], visible: true },
        { name: 'Operating Systems', skills: ['C', 'Unix', 'Bash'], visible: true },
        { name: 'Database Systems', skills: ['SQL', 'PostgreSQL'], visible: true },
        { name: 'Applied Machine Learning', skills: ['Python', 'PyTorch', 'NumPy', 'Pandas', 'matplotlib'], visible: true },
        { name: 'Software Engineering', skills: ['Java', 'JUnit', 'Git'], visible: true },
        { name: 'Signals and Networks', skills: [], visible: true },
        { name: 'Web Development', skills: ['JavaScript', 'React', 'TypeScript'], visible: true },
        { name: 'Game Development', skills: ['Unity', 'C#'], visible: false }
    ],
};
