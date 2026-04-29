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
    widthFactor?: number;
}

export const experiences: Experience[] = [
    {
        id: 'autodesk-aps',
        company: 'Autodesk',
        role: 'Software Developer, APS (Contract)',
        period: 'Feb 2026 – Present',
        location: 'Montreal, QC',
        description: 'Extending an Apollo Federation supergraph on AWS for core APS data access, including a zero-downtime GraphOS pipeline upgrade across multiple subgraphs. Added field-level tracing through DGS context propagation and improved production observability with Catchpoint and Splunk automation.',
        logo: '/logos/autodesk.jpeg',
        skills: ['Spring Boot', 'GraphQL', 'AWS'],
        invisibleSkills: ['Git', 'Spinnaker', 'Splunk', 'Slack'],
        widthFactor: 1,
    },
    {
        id: 'autodesk-fusion',
        company: 'Autodesk',
        role: 'Software Developer Intern, Fusion',
        period: 'May 2025 – Aug 2025',
        location: 'Montreal, QC',
        description: "Enhanced Fusion's concurrent properties panel for collaborative editing using TypeScript and React. Resolved persistent bugs and authored Jest and Cypress tests, improving the panel's usability and stability. Addressed critical C++ backend issues to ensure cache and analytics integrity.",
        logo: '/logos/autodesk.jpeg',
        skills: ['TypeScript', 'React', 'C++', 'Cypress', 'Jest'],
        invisibleSkills: ['Git', 'LaunchDarkly'],
        widthFactor: 1,
    },
    {
        id: 'matrox',
        company: 'Matrox',
        role: 'Software Engineering Intern',
        period: 'Jan 2024 – Aug 2024',
        location: 'Montreal, QC',
        description: 'Developed a TypeScript monitoring dashboard with live device charting for remote analysis. Built Angular + NgRx components from Figma and extended ASP.NET Core APIs for full-stack features, while engineering a SignalR logging provider and architecture updates that increased log retention by 75%.',
        logo: '/logos/matrox.jpeg',
        skills: ['TypeScript', 'Angular', 'NgRx', 'C#', '.NET', 'Selenium'],
        invisibleSkills: ['Git', 'Postman'],
        widthFactor: 1,
    },
    {
        id: 'hydro-quebec',
        company: 'Hydro-Québec',
        role: 'Software Development Intern',
        period: 'May 2023 – Aug 2023',
        location: 'Montreal, QC',
        description: 'Automated substation data validation in Excel with VBA macros, reducing processing time by over 95%. Engineered a JavaScript testing tool and JSON schema for efficient storage and analysis of test results.',
        logo: '/logos/hydro-quebec.jpeg',
        skills: ['VBA', 'JavaScript'],
        invisibleSkills: [],
        widthFactor: 1,
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
    gpa: '3.69/4.00',
    logo: '/logos/mcgill.jpeg', courses: [
        { name: 'Algorithms and Data Structures', skills: ['Java', 'JUnit'], visible: true },
        { name: 'Operating Systems', skills: ['Linux', 'Bash', 'C'], visible: true },
        { name: 'Software Engineering', skills: ['Java', 'JUnit', 'JavaScript', 'Git', 'GitHub Actions', 'Spring Boot'], visible: true },
        { name: 'Applied Machine Learning', skills: ['Python', 'PyTorch', 'Google Colab', 'NumPy', 'Pandas', 'matplotlib'], visible: true },
        { name: 'Design Principles', skills: ['Python'], visible: false },
        { name: 'Database Systems', skills: ['SQL', 'PostgreSQL'], visible: true },
        { name: 'Software Delivery', skills: ['Git', 'Docker', 'Azure', 'GitHub Actions'], visible: true },
        { name: 'Computer Vision', skills: ['Python', 'OpenCV', 'NumPy'], visible: true },

        // Hidden courses
        { name: 'Computer Networks', skills: ['Python', 'TCP/IP'], visible: false },
        { name: 'Computer Organization', skills: ['Assembly'], visible: false },
        { name: 'Discrete Structures', skills: [], visible: false },
        { name: 'Digital Logic', skills: [], visible: false },
        { name: 'Software Systems', skills: ['Linux', 'Bash'], visible: false },
    ],
};
