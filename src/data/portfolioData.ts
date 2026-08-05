import { SkillItem, Project, AcademicAchievement, EducationItem } from '../types';

export const DEVELOPER_INFO = {
  name: "Shubham Gawade",
  handle: "SHUBHAM",
  title: "Software Developer | Full-Stack Development | AI-Driven Applications",
  tagline: "Building High-Performance Full-Stack Applications & Intelligent Voice-Controlled AI Systems",
  bio: "BBA (Computer Application) graduate with a CGPA of 7.48, an 83rd percentile score in MAH MCA CET, and an All India Rank of 7160 in NIMCET. Skilled in Python, Java, SQL, HTML, CSS, JavaScript, React, and Node.js, with hands-on experience in full-stack development and building AI-driven applications.",
  location: "Pune, Maharashtra, India",
  email: "gawadeshubham859@gmail.com",
  phone: "9960388027",
  github: "https://github.com/UNIQUE14320",
  githubHandle: "UNIQUE14320",
  linkedin: "https://linkedin.com/in/shubhamgawade39",
  linkedinHandle: "shubhamgawade39",
  portfolioUrl: "https://unique14320.github.io/Portfolio",
  leetcodeUrl: "https://leetcode.com/u/unique14320",
  driveCertifications: "https://drive.google.com",
  quickStats: [
    { label: "NIMCET AIR", value: "7160", badge: "All India Rank" },
    { label: "MAH MCA CET", value: "83rd %ile", badge: "State Percentile" },
    { label: "BBA-CA CGPA", value: "7.48 / 10", badge: "SPPU Pune" },
    { label: "Projects Completed", value: "10+", badge: "Production-Ready" },
  ]
};

export const SKILLS_DATA: SkillItem[] = [
  // Languages
  { id: 'python', name: 'Python', category: 'languages', level: 90, description: 'OpenAI API, SpeechRecognition, Whisper, Scripting, Automation', iconName: 'Terminal' },
  { id: 'core-java', name: 'Core Java', category: 'languages', level: 85, description: 'OOPs, Collections, MultiThreading, Exception Handling', iconName: 'Code' },
  { id: 'adv-java', name: 'Advanced Java', category: 'languages', level: 75, description: 'JSP, Servlets, JDBC, Enterprise Web Applications', iconName: 'Server' },
  { id: 'javascript', name: 'JavaScript (ES6+)', category: 'languages', level: 85, description: 'Async/Await, DOM Manipulation, Promises, Modern Web', iconName: 'FileCode' },
  { id: 'cpp', name: 'C / C++', category: 'languages', level: 75, description: 'Pointers, Memory Allocation, Algorithms & Problem Solving', iconName: 'Cpu' },
  { id: 'html-css', name: 'HTML5 & CSS3', category: 'languages', level: 92, description: 'Flexbox, Grid, Responsive UI, Glassmorphism, Animations', iconName: 'Layout' },

  // Databases
  { id: 'mysql', name: 'MySQL', category: 'databases', level: 85, description: 'Complex Joins, Indexing, Triggers, Relational Schemes', iconName: 'Database' },
  { id: 'mongodb', name: 'MongoDB', category: 'databases', level: 70, description: 'NoSQL collections, Aggregation Framework, Document Store', iconName: 'Layers' },
  { id: 'sqlite', name: 'SQLite', category: 'databases', level: 80, description: 'Embedded storage for AI Assistant memory & local persistence', iconName: 'HardDrive' },

  // Frameworks & Web
  { id: 'react', name: 'React.js', category: 'tools', level: 85, description: 'Hooks, State Management, Responsive UI, Component Architecture', iconName: 'Atom' },
  { id: 'nodejs', name: 'Node.js & Express', category: 'tools', level: 70, description: 'RESTful API Integration, Express backends, Node scripts', iconName: 'Server' },
  { id: 'hibernate', name: 'Hibernate ORM', category: 'tools', level: 80, description: 'Entity Mapping, HQL, Secure Data Storage & Retrieval', iconName: 'Box' },
  { id: 'android', name: 'Android Programming', category: 'tools', level: 72, description: 'Mobile UI Layouts, Activities, Intent Handling, XML', iconName: 'Smartphone' },

  // Tools & IDEs
  { id: 'git', name: 'Git & GitHub', category: 'tools', level: 88, description: 'Version Control, Branching, Pull Requests, CI/CD Workflows', iconName: 'GitBranch' },
  { id: 'vscode', name: 'VS Code', category: 'tools', level: 90, description: 'Primary IDE for Full-Stack Development & AI Extensions', iconName: 'Monitor' },
  { id: 'pycharm', name: 'PyCharm', category: 'tools', level: 85, description: 'Python & AI Assistant Development Environment', iconName: 'Command' },

  // Core Concepts
  { id: 'oop', name: 'Object-Oriented Programming', category: 'concepts', level: 90, description: 'Encapsulation, Inheritance, Polymorphism, Abstraction', iconName: 'Boxes' },
  { id: 'dsa', name: 'Data Structures & Algorithms', category: 'concepts', level: 80, description: 'Arrays, Stacks, Queues, Searching & Sorting Logic', iconName: 'Binary' },
  { id: 'ai-pipelines', name: 'LLM & Speech Pipelines', category: 'concepts', level: 85, description: 'Speech-to-Text, Voice synthesis, Prompt engineering, AI tools', iconName: 'Bot' },
  { id: 'crud', name: 'Full-Stack CRUD Apps', category: 'concepts', level: 88, description: 'End-to-end client-server architecture, database integration', iconName: 'Workflow' },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'ryuk-ai',
    title: 'Personal AI Voice Assistant (Ryuk)',
    subtitle: 'Flagship AI Project',
    badgeText: 'AI & Speech Recognition',
    type: 'ai',
    featured: true,
    description: 'A custom-built, voice-controlled AI assistant that listens, understands natural language, and performs real-world actions on command — a self-built AI engine alternative to Alexa or Siri.',
    keyEngineering: [
      'Whisper Speech-Pipeline: Whole voice speech recognition logs with dynamic ambient noise adjustment & translation.',
      'LLM Reasoning & Function-Calling: Built-in AI execution layer to trigger OS-level tasks and real actions.',
      'SQLite Context Storage: Structured persistent conversation memory across user session history.'
    ],
    techStack: ['Python', 'OpenAI API', 'Whisper', 'PyQt5', 'SQLite', 'SpeechRecognition'],
    githubUrl: 'https://github.com/UNIQUE14320/RYUK-Voice-Assistant',
    liveDemoUrl: '#ryuk-demo'
  },
  {
    id: 'hospital-management',
    title: 'Hospital Management System',
    subtitle: 'Enterprise Java Web Application',
    badgeText: 'Java Enterprise & MySQL',
    type: 'enterprise',
    featured: true,
    description: 'A robust Java web system built to streamline hospital workflows, including patient registration, doctor schedules, appointment booking, billing modules, and medical record management.',
    keyEngineering: [
      'Hibernate ORM: Designed relational database models for efficient relational data mapping.',
      'Servlet Business Logic: Created server-based handlers controlling CRUD transactions & billing.',
      'Responsive JSP Frontend: Styled interactive JSP pages for hospital performance and record safety.'
    ],
    techStack: ['Java', 'JSP / Servlet', 'Hibernate ORM', 'MySQL', 'HTML/CSS/JS'],
    githubUrl: 'https://github.com/UNIQUE14320/Hospital-Management-System'
  }
];

export const ACADEMICS_DATA: AcademicAchievement[] = [
  {
    id: 'nimcet',
    title: 'NIMCET All India Rank 7160',
    subtitle: 'National Level MCA Entrance Examination',
    score: 'AIR 7160',
    scoreLabel: 'All India Rank',
    description: 'Demonstrated strong mathematical aptitude, analytical reasoning, and algorithmic problem-solving in India\'s top MCA entrance exam.',
    highlight: true
  },
  {
    id: 'mah-cet',
    title: '83rd Percentile in MAH MCA CET',
    subtitle: 'State Level Entrance Examination',
    score: '83rd %ile',
    scoreLabel: 'Percentile Score',
    description: 'Top-tier performance in state-level computer applications entrance test.',
    highlight: true
  },
  {
    id: 'bba-ca-cgpa',
    title: 'CGPA 7.46 in BBA (CA)',
    subtitle: 'Savitribai Phule Pune University',
    score: '7.46 / 10',
    scoreLabel: 'Cumulative GPA',
    description: 'Consistent academic performance across software engineering, web technologies, and database design courses.',
    highlight: false
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'bba-ca',
    degree: 'Bachelor of Business Administration (Computer Application)',
    institution: 'Savitribai Phule Pune University, Pune',
    university: 'SPPU Pune',
    year: '2023 - 2025',
    score: 'CGPA: 7.48',
    details: 'Specialized in computer application development, web technologies, object-oriented programming, and database design.',
    specials: ['Java & Advanced Java', 'Web Technologies', 'Database Systems', 'Software Engineering']
  },
  {
    id: 'class-12',
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Maharashtra State Board',
    university: 'State Board',
    year: '2020 - 2022',
    score: 'Percentage: 72%',
    details: 'Completed higher secondary education with focus on science and analytical mathematics.',
    specials: ['Mathematics', 'Commerce Stream']
  },
  {
    id: 'class-10',
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Maharashtra State Board',
    university: 'State Board',
    year: '2019 - 2020',
    score: 'Percentage: 77%',
    details: 'Completed secondary school certificate examination.',
    specials: ['General Academics', 'Mathematics']
  }
];

export const CERTIFICATIONS_LIST = [
  { title: "Software Engineering Core", org: "Verified Certification", link: "https://drive.google.com" },
  { title: "Full-Stack Web Development", org: "Modern Web Development", link: "https://drive.google.com" },
  { title: "Java & Database Management", org: "Database Architecture", link: "https://drive.google.com" },
];
