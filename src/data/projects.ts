export interface Project {
  id: string
  name: string
  description: string
  techStack: string[]
  timeline: string
  link?: string
  size: 'large' | 'medium' | 'small' // For node sizing
  color: string
}

export const projects: Project[] = [
  {
    id: 'holoportation',
    name: 'Holoportation',
    description: 'Augmented reality app for real-time 3D reconstruction on HoloLens 2 using RGBD cameras',
    techStack: ['C++', 'C#', 'WinForms', 'Python', 'OpenCV'],
    timeline: 'Sep 2024 – Apr 2025',
    size: 'large',
    color: '#8b5cf6', // Purple
  },
  {
    id: 'daily-ball',
    name: 'Daily Ball',
    description: 'Hypercasual 2D mobile game with daily rotation of nine minigames. 1000+ downloads on Google Play',
    techStack: ['Unity', 'C#'],
    timeline: 'May 2023 – Jul 2024',
    link: 'https://dailyball.alext.dev',
    size: 'large',
    color: '#3b82f6', // Blue
  },
  {
    id: 'vibe',
    name: 'Vibe',
    description: 'Content-based music recommender with optimized song generation under 5 seconds',
    techStack: ['Python', 'Streamlit', 'Pandas', 'NumPy', 'SciPy'],
    timeline: 'Sep 2023 – Nov 2023',
    link: 'https://vibe.alext.dev',
    size: 'large',
    color: '#06b6d4', // Cyan
  },
  {
    id: 'unitrade',
    name: 'UniTrade',
    description: 'Student marketplace built with 8-person Agile team using modern web technologies',
    techStack: ['Java', 'Spring Boot', 'React', 'PostgreSQL'],
    timeline: 'Jan 2023 – Apr 2023',
    size: 'medium',
    color: '#10b981', // Emerald
  },
  {
    id: 'choose-movie',
    name: 'Choose Me a Movie',
    description: 'Movie recommendation site using TMDB API, built during McHacks 9 Hackathon',
    techStack: ['JavaScript', 'HTML/CSS'],
    timeline: 'Jan 2022',
    link: 'https://choosemeamovie.alext.dev',
    size: 'medium',
    color: '#f59e0b', // Amber
  }
]
