export interface ProjectButton {
  label: string;
  url: string;
  type: 'devpost' | 'github' | 'demo' | 'googleplay' | 'other';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  timeline: string;
  link?: string; // Keep for backward compatibility with the current click behavior
  buttons?: ProjectButton[]; // New flexible buttons, max 2
  size: 'large' | 'medium' | 'small'; // For node sizing
  color: string;
}

export const projects: Project[] = [
  {
    id: 'holoportation',
    name: 'Holoportation',
    description:
      'Augmented reality app for real-time 3D reconstruction on HoloLens 2 using RGBD cameras',
    techStack: ['C++', 'C#', 'WinForms', 'Python', 'OpenCV'],
    timeline: 'Sep 2024 – Apr 2025',
    buttons: [
      {
        label: 'Code',
        url: 'https://github.com/alex8ndr/Holoportation',
        type: 'github',
      },
    ],
    size: 'medium',
    color: '#8b5cf6', // Purple
  },
  {
    id: 'daily-ball',
    name: 'Daily Ball',
    description:
      'Hypercasual 2D mobile game with over 1000 downloads on Google Play',
    techStack: ['Unity', 'C#'],
    timeline: 'May 2023 – Jul 2024',
    link: 'https://dailyball.alext.dev',
    buttons: [
      {
        label: 'Play Store',
        url: 'https://play.google.com/store/apps/details?id=com.AlexTurianskyj.DailyBall',
        type: 'googleplay',
      },
      { label: 'Demo', url: 'https://dailyball.alext.dev', type: 'demo' },
    ],
    size: 'large',
    color: '#3b82f6', // Blue
  },
  {
    id: 'vibe',
    name: 'Vibe',
    description: 'Content-based music recommender with over 1 million songs',
    techStack: ['Python', 'Streamlit', 'Pandas', 'NumPy', 'SciPy'],
    timeline: 'Sep 2023 – Nov 2023',
    link: 'https://vibe.alext.dev',
    buttons: [
      {
        label: 'Code',
        url: 'https://github.com/alex8ndr/vibe',
        type: 'github',
      },
      { label: 'View', url: 'https://vibe.alext.dev', type: 'demo' },
    ],
    size: 'large',
    color: '#06b6d4', // Cyan
  },
  {
    id: 'unitrade',
    name: 'UniTrade',
    description: 'Student marketplace built with 8-person Agile team',
    techStack: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
    timeline: 'Jan 2023 – Apr 2023',
    buttons: [
      {
        label: 'Code',
        url: 'https://github.com/IBGA/UniTrade',
        type: 'github',
      },
    ],
    size: 'small',
    color: '#10b981', // Emerald
  },
  {
    id: 'choose-movie',
    name: 'Choose Me a Movie',
    description: 'Movie recommendation site powered by the TMDB API',
    techStack: ['JavaScript', 'HTML/CSS'],
    timeline: 'Jan 2022',
    link: 'https://choosemeamovie.alext.dev',
    buttons: [
      {
        label: 'Code',
        url: 'https://github.com/alex8ndr/choose-me-a-movie',
        type: 'github',
      },
      { label: 'View', url: 'https://choosemeamovie.alext.dev', type: 'demo' },
    ],
    size: 'large',
    color: '#f59e0b', // Amber
  },
];
