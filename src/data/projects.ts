export interface ProjectButton {
  label: string;
  url: string;
  type: 'devpost' | 'github' | 'demo' | 'googleplay' | 'other';
}

export interface ProjectContent {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  invisibleSkills?: string[]; // Hidden skills for highlighting (e.g., Git)
  timeline: string;
  link?: string; // Keep for backward compatibility with the current click behavior
  buttons?: ProjectButton[]; // New flexible buttons, max 2
  color: string;
}

export interface ProjectLayout {
  id: string;
  size: 'large' | 'medium' | 'small' | 'tiny';
  position: number; // Position 0-4 (0=top, 1=right, 2=bottom, 3=left, decimals for fine-tuning)
}

export interface Project extends ProjectContent {
  size: 'large' | 'medium' | 'small' | 'tiny';
  position: number;
}

// Position guide: 0=top, 1=right, 2=bottom, 3=left (decimals for fine-tuning)
export const projectLayouts: ProjectLayout[] = [
  // LARGE PROJECTS (inner ring)
  { id: 'daily-ball', size: 'large', position: 3.25 },
  { id: 'vibe', size: 'large', position: 1.75 },
  { id: 'choose-movie', size: 'large', position: 0.5 },

  // MEDIUM PROJECTS (middle ring)
  { id: 'personal-website', size: 'medium', position: 1.05 },
  { id: 'holoportation', size: 'medium', position: 2.7 },

  // SMALL PROJECTS (outer ring)
  { id: 'event-horizons', size: 'small', position: 3.45 },
  { id: 'unitrade', size: 'small', position: 0.7 },
  { id: 'impostorbot', size: 'small', position: 1.3 },
  { id: 'slightly-edited-songs', size: 'small', position: 3 },
];

export const projectContent: ProjectContent[] = [{
  id: 'daily-ball',
  name: 'Daily Ball',
  description: 'Hypercasual 2D mobile game with over 1000 downloads on Google Play',
  techStack: ['Unity', 'C#'],
  invisibleSkills: ['Git'],
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
  color: '#3b82f6', // Blue
},
{
  id: 'vibe',
  name: 'Vibe',
  description: 'Content-based music recommender with over 1 million songs',
  techStack: ['Python', 'Streamlit', 'Pandas', 'NumPy', 'SciPy'],
  invisibleSkills: ['Git'],
  timeline: 'Sep 2023 – Nov 2023',
  link: 'https://vibe.alext.dev',
  buttons: [
    {
      label: 'Code',
      url: 'https://github.com/alex8ndr/vibe',
      type: 'github',
    },
    { label: 'Launch', url: 'https://vibe.alext.dev', type: 'demo' },
  ],
  color: '#06b6d4', // Cyan
},
{
  id: 'choose-movie',
  name: 'Choose Me a Movie',
  description: 'Movie recommendation site powered by the TMDB API',
  techStack: ['JavaScript', 'HTML/CSS'],
  invisibleSkills: ['Git'],
  timeline: 'Jan 2022',
  link: 'https://choosemeamovie.alext.dev',
  buttons: [
    {
      label: 'Code',
      url: 'https://github.com/alex8ndr/choose-me-a-movie',
      type: 'github',
    },
    { label: 'Launch', url: 'https://choosemeamovie.alext.dev', type: 'demo' },
  ],
  color: '#f59e0b', // Amber
},
{
  id: 'personal-website',
  name: 'Portfolio Website',
  description: 'Interactive portfolio with 2D project visualization and responsive design',
  techStack: ['TypeScript', 'React', 'Vite'],
  invisibleSkills: ['Git'],
  timeline: '2024 – Present',
  buttons: [
    {
      label: 'Code',
      url: 'https://github.com/alex8ndr/personal-website',
      type: 'github',
    },
  ],
  color: '#ef4444', // Red
},
{
  id: 'holoportation',
  name: 'Holoportation',
  description: 'Augmented reality app for real-time 3D reconstruction on HoloLens 2 using RGBD cameras',
  techStack: ['C++', 'C#', 'WinForms', 'Python', 'OpenCV'],
  invisibleSkills: ['Git'],
  timeline: 'Sep 2024 – Apr 2025',
  buttons: [
    {
      label: 'Code',
      url: 'https://github.com/alex8ndr/Holoportation',
      type: 'github',
    },
  ],
  color: '#8b5cf6', // Purple
},
{
  id: 'event-horizons',
  name: 'Event Horizons',
  description: 'McGill calendar for campus events with Google Calendar API integration',
  techStack: ['JavaScript', 'Python', 'Django'],
  invisibleSkills: ['Git'],
  timeline: '2023',
  buttons: [
    {
      label: 'Code',
      url: 'https://github.com/alex8ndr/event-horizons',
      type: 'github',
    },
    {
      label: 'Devpost',
      url: 'https://devpost.com/software/event-horizons',
      type: 'devpost',
    },
  ],
  color: '#059669', // Green
},
{
  id: 'unitrade',
  name: 'UniTrade',
  description: 'Student marketplace built in an 8-person Agile team',
  techStack: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
  invisibleSkills: ['Git'],
  timeline: 'Jan 2023 – Apr 2023',
  buttons: [
    {
      label: 'Code',
      url: 'https://github.com/IBGA/UniTrade',
      type: 'github',
    },
  ],
  color: '#10b981', // Emerald
},
{
  id: 'impostorbot',
  name: 'ImpostorBot',
  description: 'Interactive Discord bot built using the Discord.py API',
  techStack: ['Python'],
  timeline: '2022',
  buttons: [
    {
      label: 'Code',
      url: 'https://github.com/alex8ndr/ImpostorBot',
      type: 'github',
    },
    {
      label: 'Devpost',
      url: 'https://devpost.com/software/impostorbot',
      type: 'devpost',
    },
  ],
  color: '#7c3aed', // Violet
}, {
  id: 'slightly-edited-songs',
  name: 'Slightly Edited Songs',
  description: 'YouTube channel featuring edits of existing songs with 500+ subscribers',
  techStack: [],
  timeline: '2023',
  buttons: [
    {
      label: 'View Channel',
      url: 'https://www.youtube.com/@SlightlyEditedSongs',
      type: 'demo',
    },
  ],
  color: '#ef4444', // Red
},
];

export const projects: Project[] = projectContent.map(content => {
  const layout = projectLayouts.find(l => l.id === content.id);
  if (!layout) {
    throw new Error(`No layout found for project: ${content.id}`);
  }
  return {
    ...content,
    size: layout.size,
    position: layout.position,
  };
});
