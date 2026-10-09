const projects = [
  {
    id: 'prompble',

    title: 'Prompble',
    tag: 'AI Application',

    description:
        'A teacher-controlled AI tutoring platform with configurable tutors, managed classrooms, real-time chat, usage controls, and asynchronous processing built for classroom use.',

    thumbnail: '/images/projects/prompble-thumb.svg',
    background: '/images/projects/prompble-background.svg',

    technologies: [
        'React',
        'TypeScript',
        'Flask',
        'PostgreSQL',
        'Redis',
        'Celery',
        'RabbitMQ',
        'WebSockets',
        'Docker',
        'Gemini',
    ],

    links: {
        project: '/projects/prompble',
        live: 'https://prompble.com',
    },

    featured: true,
  },

  {
    id: 'resumate',

    title: 'Resumate',
    tag: 'AI Automation',

    description:
      'A local AI-powered Chrome extension that scrapes job postings and orchestrates specialized LLM agents to tailor resume sections, generate configurable resumes, and create personalized cover letters.',

    thumbnail: '/images/projects/resumate-thumb.svg',
    background: '/images/projects/resumate-background.svg',

    technologies: [
      'Python',
      'Flask',
      'JavaScript',
      'Chrome Extension',
      'Web Scrapping',
      'LangChain',
      'Cloud Run',
    ],

    links: {
      project: '/projects/resumate',
    },

    featured: true,
  },
]

export default projects