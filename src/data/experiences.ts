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
        description: "Enhancing real-time collaboration in Fusion, Autodesk's flagship cloud-based 3D design and manufacturing platform.",
        logo: '/logos/autodesk.jpeg',
        skills: ['TypeScript', 'React', 'C++', 'Jest'],
        invisibleSkills: ['Git'],
    }, {
        id: 'matrox',
        company: 'Matrox',
        role: 'Software Engineering Intern',
        period: 'Jan 2024 – Aug 2024',
        location: 'Montreal, QC',
        description: 'Developed an internal Angular app for remote KVM extender analysis and debugging with custom logging via WebSocket. Built bespoke UI components and REST API endpoints to control the device\'s volume and keyboard layout, translating Figma designs into code with NgRx state management.',
        logo: '/logos/matrox.jpeg',
        skills: ['TypeScript', 'Angular', 'NgRx', 'C#', '.NET', 'JUnit', 'Selenium'],
        invisibleSkills: ['Git', 'Postman'],
    }, {
        id: 'hydro-quebec',
        company: 'Hydro-Québec',
        role: 'Software Development Intern',
        period: 'May 2023 – Aug 2023',
        location: 'Montreal, QC',
        description: 'Developed VBA macros for Excel automation, reducing validation processing time by over 95%. Engineered an interactive testing tool for substation devices using Windows Forms and DTM with modular JavaScript tests. Optimized data handling through structured JSON storage for config data and test results.',
        logo: '/logos/hydro-quebec.jpeg',
        skills: ['VBA', 'JavaScript', 'Windows Forms'],
        invisibleSkills: [],
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
        { name: 'Operating Systems', skills: ['Unix', 'Bash'], visible: true },
        { name: 'Database Systems', skills: ['SQL', 'PostgreSQL'], visible: true },
        { name: 'Applied Machine Learning', skills: ['Python', 'PyTorch', 'Colab', 'NumPy', 'Pandas', 'matplotlib'], visible: true },
        { name: 'Design Principles', skills: ['Python'], visible: true },
        { name: 'Software Engineering', skills: ['Java', 'JUnit', 'JavaScript', 'Git'], visible: true },
        { name: 'Signals and Networks', skills: [], visible: true },
        { name: 'Computer Organization', skills: ['Assembly'], visible: true },
        { name: 'Discrete Structures', skills: [], visible: true },

        { name: 'Digital Logic', skills: [], visible: false },
        { name: 'Software Systems', skills: ['Unix', 'Bash'], visible: false },
    ],
};
