export interface Project {
  id: number
  name: string
  description: string
  url: string
  homepage?: string
  technologies: string[]
  category: string
  featured: boolean
  screenshot: string
  achievements: string[]
}

export const projects: Project[] = [
  {
    id: 1,
    name: 'GymQuest',
    description: 'A modern fitness tracking application with AI-powered workout recommendations, personalized training plans, and real-time progress analytics.',
    url: 'https://github.com/mohitchamoIi/GymQuest',
    homepage: '',
    technologies: ['TypeScript', 'React', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    category: 'Featured Projects',
    featured: true,
    screenshot: '/assets/images/project1-thumbnail.jpg',
    achievements: ['42+ stars on GitHub', 'Featured on Dev.to', 'Used by 100+ fitness enthusiasts'],
  },
  {
    id: 2,
    name: 'UniRide',
    description: 'Campus ride-sharing platform connecting students for safe, affordable, and eco-friendly transportation around university grounds.',
    url: 'https://github.com/mohitchamoIi/UniRide',
    homepage: '',
    technologies: ['Flutter', 'Firebase', 'Dart', 'Google Maps API'],
    category: 'Featured Projects',
    featured: true,
    screenshot: '/assets/images/project1-thumbnail.jpg',
    achievements: ['Won campus innovation award', '200+ active users', 'Partnered with 3 universities'],
  },
  {
    id: 3,
    name: 'Obscura',
    description: 'Privacy-focused VPN and digital security application with end-to-end encryption, ad-blocking, and multi-hop routing.',
    url: 'https://github.com/mohitchamoIi/Obscura',
    homepage: '',
    technologies: ['Rust', 'Go', 'React', 'WebRTC'],
    category: 'Featured Projects',
    featured: true,
    screenshot: '/assets/images/project2-thumbnail.jpg',
    achievements: ['31+ stars', 'Open-source collaboration with 5 contributors', 'Featured on ProductHunt'],
  },
  {
    id: 4,
    name: 'UniBus',
    description: 'Real-time university bus tracking application with live arrival times, route maps, and delay notifications.',
    url: 'https://github.com/mohitchamoIi/UniBus',
    homepage: '',
    technologies: ['React', 'Express', 'Socket.io', 'PostgreSQL'],
    category: 'Major Applications',
    featured: false,
    screenshot: '/assets/images/project3-thumbnail.jpg',
    achievements: ['Deployed on campus', 'Used daily by 150+ students'],
  },
  {
    id: 5,
    name: 'TapeVibe',
    description: 'Retro-style music streaming application with customizable playlists, visualizers, and vintage aesthetic.',
    url: 'https://github.com/mohitchamoIi/TapeVibe',
    homepage: '',
    technologies: ['Vue.js', 'Spotify API', 'Three.js'],
    category: 'Experiments & Side Projects',
    featured: false,
    screenshot: '/assets/images/project1-thumbnail.jpg',
    achievements: ['25+ GitHub stars'],
  },
  {
    id: 6,
    name: 'BingeBuddy',
    description: 'Movie recommendation engine with AI-powered suggestions, watch party features, and personalized content curation.',
    url: 'https://github.com/mohitchamoIi/BingeBuddy',
    homepage: '',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    category: 'Major Applications',
    featured: false,
    screenshot: '/assets/images/project2-thumbnail.jpg',
    achievements: ['18+ stars', 'ML model with 92% recommendation accuracy'],
  },
  {
    id: 7,
    name: 'CypherFusion',
    description: 'Cryptocurrency portfolio tracker with real-time price updates, charting, and multi-exchange integration.',
    url: 'https://github.com/mohitchamoIi/CypherFusion',
    homepage: '',
    technologies: ['TypeScript', 'Next.js', 'Prisma', 'PostgreSQL'],
    category: 'Major Applications',
    featured: false,
    screenshot: '/assets/images/project3-thumbnail.jpg',
    achievements: ['12+ stars'],
  },
  {
    id: 8,
    name: 'AFWAHH Tracker',
    description: 'Habit and productivity tracker with streak management, goal setting, and analytics dashboard.',
    url: 'https://github.com/mohitchamoIi/AFWAHH-Tracker',
    homepage: '',
    technologies: ['React Native', 'SQLite', 'Redux'],
    category: 'Experiments & Side Projects',
    featured: false,
    screenshot: '/assets/images/project1-thumbnail.jpg',
    achievements: ['7+ stars'],
  },
]
