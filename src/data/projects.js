const projects = [
  {
    id: 'prompble',

    title: 'Prompble',
    tag: 'AI Application',

    categories: ['genai', 'software', 'automation'],

    description:
      'A teacher-controlled AI tutoring platform with configurable tutors, managed classrooms, real-time chat, usage controls, and asynchronous processing built for classroom use.',

    thumbnail: '/images/projects/prompble-thumb.svg',
    background: '/images/projects/prompble-background.svg',

    image: '/images/projects/prompble-img.png',
    imageFit: 'cover',

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

    link: 'https://prompble.com',

    featured: true,
  },

  {
    id: 'resumate',

    title: 'Resumate',
    tag: 'AI Automation',

    categories: ['genai', 'software', 'automation'],

    description:
      'A local AI-powered Chrome extension that scrapes job postings and orchestrates specialized LLM agents to tailor resume sections, generate configurable resumes, and create personalized cover letters.',

    thumbnail: '/images/projects/resumate-thumb.svg',
    background: '/images/projects/resumate-background.svg',

    image: '/images/projects/resumate-img.png',
    imageFit: 'cover',

    technologies: [
      'Python',
      'Flask',
      'JavaScript',
      'Chrome Extension',
      'Web Scraping',
      'LangChain',
      'Cloud Run',
    ],

    // Add GitHub URL when available
    link: null,

    featured: true,
  },

  {
    id: 'shinkansen-hackathon',

    title: 'Shinkansen Travel Experience Hackathon',
    tag: 'Machine Learning',

    categories: ['ml'],

    description:
        'Developed and evaluated machine learning models to predict passenger satisfaction on Japan’s Shinkansen bullet trains. Combined travel and survey datasets, performed data preprocessing, and compared multiple models, with XGBoost achieving the highest accuracy.',

    image: '/images/projects/shinkansen-img.png',
    imageFit: 'cover',
        
    technologies: [
        'Python',
        'Pandas',
        'Scikit-learn',
        'XGBoost',
        'Data Analysis',
        'Classification',
    ],

    link: 'https://github.com/gbisco/Shinkansen-Travel-Experience-Hackathon',

    featured: false,
  },

  {
    id: 'techtrack',

    title: 'TechTrack',
    tag: 'Computer Vision',

    categories: ['ml', 'software'],

    description:
        'A computer vision inference system that processes video streams using YOLO object detection. Integrates frame preprocessing, non-maximum suppression, detection evaluation, and hard negative mining to support object detection workflows.',

    image: '/images/projects/techtrack-img.png',
    imageFit: 'cover',

    technologies: [
        'Python',
        'OpenCV',
        'YOLO',
        'NumPy',
        'Pandas',
        'Docker',
        'FFmpeg',
    ],

    link: 'https://github.com/gbisco/techtrack',

    featured: false,
  },
]

export default projects