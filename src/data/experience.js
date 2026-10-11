const experience = [
  {
    id: 'wsu-graduation',
    type: 'education',

    period: '2022',
    timeline: true,
    timelineOrder: 1,

    title: 'B.S. Mechanical Engineering',
    organization: 'Washington State University',

    website: 'https://wsu.edu',

    logo: '/brands/wsu-logo.webp',
    document: null,
    image: '/brands/wsu-img.jpg',

    headline: 'Undergraduate studies in Mechanical Engineering.',

    gpa: 3.2,

    highlights: [
      'Co-founder, WSU Rocket Club',
      'High Power Rocketry Level 2 certified',
      'Member, American Society of Mechanical Engineers (ASME)',
    ],

    coursework: [
        'Programming in C/C++',
        'Data Structures',
        'Advanced Data Structures',
        'Control Systems',
        'Mechatronics',
        'Dynamic Systems',
        'Electrical Circuits',
    ],
  },

  {
    id: 'ats-automation',
    type: 'work',

    period: '2022 — 2024',
    timeline: true,
    timelineOrder: 2,

    title: 'Project Engineer',
    organization: 'ATS Automation',

    website: 'https://www.atsintegrators.com',

    logo: '/brands/ats-logo.webp',
    image: '/brands/ats-img.jpg',

    headline:
      'Designed, deployed, and supported networked building automation systems from requirements through field commissioning.',

    description:
      'Worked as a Project Engineer delivering building automation systems across healthcare, hospitality, and education projects. Managed projects from requirements and system design through programming, integration, commissioning, customer handoff, and post-deployment support.',

    highlights: [
      'Led full-lifecycle building automation and DDC projects from requirements and system design through programming, commissioning, and customer handoff.',
      'Engineered controller and network architectures, I/O mappings, communication protocols, and control logic across BACnet/IP, BACnet MS/TP, and Modbus systems.',
      'Configured customer workstations, communication adapters, networked controllers, and field devices used to program and commission automation systems.',
      'Provided on-site IT and controls troubleshooting across Ethernet, software, controller, and integration issues in live customer environments.',
      'Created technical documentation, control programs, graphics, and system interfaces while coordinating technicians, vendors, contractors, and client stakeholders.',
    ],
  },

  {
    id: 'eit-certification',
    type: 'certification',

    period: '2022',
    timeline: false,

    title: 'Engineer-in-Training (EIT)',
    organization: 'Washington State',

    website: 'https://brpels.wa.gov',
    document: null,

    logo: '/brands/eit-logo.svg',

    headline:
      'Engineer-in-Training certification through the Washington State engineering licensing board.',
  },

  {
    id: 'cu-embedded-systems',
    type: 'certification',

    period: '2025',
    timeline: false,

    title: 'Real-Time Embedded Systems Concepts and Practices',
    organization: 'University of Colorado Boulder',

    website: 'https://www.colorado.edu',
    document: null,

    logo: '/brands/cu-logo.png',

    headline:
        'Studied real-time embedded systems, including system design, timing constraints, and practical implementation concepts.',
  },

  {
    id: 'mit-ai-data-science',
    type: 'certification',

    period: '2024',
    timeline: true,
    timelineOrder: 3,

    title: 'Applied AI & Data Science',
    organization: 'MIT',

    website: 'https://professionalprogramsmit.com',
    document: null,

    logo: '/brands/mit-logo.png',
    image: '/brands/mit-img.png',

    headline:
      'Applied machine learning, data analysis, and AI techniques to practical decision-making problems.',
  },

  {
    id: 'manhattan-investimentos',
    type: 'work',

    period: '2026',
    timeline: true,
    timelineOrder: 6,

    title: 'AI & Automation Intern',
    organization: 'Manhattan Investimentos',

    website: 'https://mhtprivate.com.br',

    logo: '/brands/mht-logo.png',
    image: '/brands/mht-img.webp',

    headline:
      'Built an end-to-end AI and automation workflow spanning data processing, cloud services, business systems, and identity access.',

    description:
      'Worked on an end-to-end AI and automation project that collected and processed business data, applied LLM-based analysis, and delivered recurring outputs to non-technical stakeholders. The work combined Python services, cloud platforms, databases, APIs, Microsoft tools, and business-process automation.',

    highlights: [
      'Built Python-based data processing and monitoring workflows to automate recurring analytics, reporting, and decision-support tasks.',
      'Integrated APIs, databases, LLM providers, Microsoft automation services, notifications, and reporting into a single workflow that reduced manual effort.',
      'Supported Microsoft 365 and Entra ID administration, including users, groups, application permissions, and least-privilege access controls for the automation environment.',
      'Adapted the solution to the company’s existing IT environment and translated business requirements into practical technical workflows for stakeholder use.',
    ],
  },

  {
    id: 'jhu-generative-ai',
    type: 'certification',

    period: '2025',
    timeline: true,
    timelineOrder: 4,

    title: 'Applied Generative AI',
    organization: 'Johns Hopkins University',

    website: 'https://www.jhu.edu',

    logo: '/brands/jhu-logo.svg',
    document: null,

    headline:
      'Studied generative AI technologies and their applications in modern software systems.',
  },

  {
    id: 'johns-hopkins-ms',
    type: 'education',

    period: '2025',
    timeline: true,
    timelineOrder: 5,

    title: 'M.S. Artificial Intelligence - In progress',
    organization: 'Johns Hopkins University',

    website: 'https://www.jhu.edu',
    document: null,

    logo: '/brands/jhu-logo.svg',
    image: '/brands/jhu-img.webp',

    headline: 'Graduate studies in Artificial Intelligence.',

    gpa: 3.3,

    highlights: [
      'Member, Society of Hispanic Professional Engineers (SHPE)',
    ],

    coursework: [
        'Applied Machine Learning',
        'AI Algorithm Design and Analysis',
        'Creating AI-Enabled Systems',
        'Large Language Models: Theory and Practice',
        'Cloud Computing',
        'Modern Software Concepts in Python',
        'Software Verification, Validation & Testing',
    ],
  },
]

export default experience