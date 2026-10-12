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
      'Cloud Computing',
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
    link: 'https://youtu.be/Y8KHyFbSjNI?si=86bHJ4NCu0zSnRM2',

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

  {
    id: 'nplm',

    title: 'Neural Probabilistic Language Model',
    tag: 'Deep Learning',

    categories: ['ml', 'genai'],

    description:
        'Implemented and trained a neural probabilistic language model from scratch in PyTorch, building an end-to-end pipeline for text preprocessing, tokenization, training, and evaluation. Conducted experiments comparing model architectures, context lengths, and tokenization strategies using perplexity.',

    image: '/images/projects/nplm-img.png',
    imageFit: 'cover',

    technologies: [
        'Python',
        'PyTorch',
        'NLP',
        'Hugging Face',
        'Docker',
        'BPE Tokenization',
    ],

    link: 'https://github.com/gbisco/PNL-model',

    featured: false,
    },

    {
        id: 'securebank',

        title: 'SecureBank',
        tag: 'Machine Learning Engineering',

        categories: ['ml', 'software'],

        description:
            'Developed an end-to-end fraud detection system that processes financial transaction data, trains and evaluates machine learning models, and serves predictions through a Flask API. Includes feature engineering, model versioning, threshold optimization, and structured monitoring logs.',

        thumbnail: '/images/projects/securebank-thumb.svg',
        background: '/images/projects/securebank-background.svg',

        image: '/images/projects/securebank-img.png',
        imageFit: 'cover',

        technologies: [
            'Python',
            'Scikit-learn',
            'Pandas',
            'Flask',
            'Docker',
            'Gradient Boosting',
        ],

        link: 'https://github.com/gbisco/securebank',
        featured: true,
    },
]

export default projects