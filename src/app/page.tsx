"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import {
  Award,
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Code2,
  Cpu,
  Database,
  Download,
  ExternalLink,
  Eye,
  FileText,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Network,
  Printer,
  Rocket,
  Send,
  Server,
  ShieldCheck,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";

type Project = {
  title: string;
  category: string;
  productType: string;
  description: string;
  impact: string;
  problem: string;
  year: string;
  metrics: string[];
  gallery: string[];
  stack: string[];
  status: string;
  image: string;
  accent: string;
  accentTwo: string;
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
  architecture: string;
  learning: string;
  featured?: boolean;
};

type CertificateDomain =
  | "Cyber Security"
  | "AI & Data"
  | "Cloud & DevOps"
  | "Software Engineering"
  | "Frontend & Web"
  | "Programming Foundations"
  | "Emerging Technology";

type Certificate = {
  file: string;
  name: string;
  provider: string;
  date: string;
  domain: CertificateDomain;
  accent: string;
  summary: string;
  learningPoints: string[];
  skills: string;
  url: string;
  previewUrl: string;
};

type ProofDocument = {
  title: string;
  organization: string;
  period: string;
  category: string;
  description: string;
  year?: string;
  issueDate?: string;
  certificateId?: string;
  challenge?: string;
  outcome?: string;
  work?: string[];
  proofUrl: string;
  previewUrl: string;
  accent: string;
  learning: string[];
  stack?: string[];
  metrics?: Array<{ label: string; value: number }>;
};

type ContactLink = {
  label: string;
  value: string;
  image: string;
  href: string;
  external?: boolean;
};

type SkillTechnology = {
  name: string;
  descriptor: string;
  image: string;
};

type SkillCategory = {
  title: string;
  description: string;
  accent: string;
  gridClass: string;
  items: SkillTechnology[];
};

const navItems = [
  ["Home", "home"],
  ["About", "about"],
  ["Education", "education"],
  ["Skills", "skills"],
  ["Experience", "experience"],
  ["Projects", "projects"],
  ["Certificates", "certificates"],
  ["Achievements", "achievements"],
  ["Resume", "resume"],
  ["Contact", "contact"],
];

const heroRoles = [
  "Software Developer",
  "Full Stack Developer",
  "Game Developer",
  "Cyber Security Enthusiast",
];

const keyStrengths = ["AI Systems", "Cyber Security", "Full Stack Engineering", "Cloud Technologies", "Problem Solving"];

const proofProjects = ["Limitra AI", "Nexmart", "Cropix AI Studio", "AegisMTD", "WebGuard", "AnimeZ", "AstroVelo"];

const journey = [
  { year: "2023", title: "Started Cyber Security Engineering", icon: GraduationCap, accent: "#22d3ee" },
  { year: "2024", title: "Built AI, web, and security project foundations", icon: Code2, accent: "#a855f7" },
  { year: "2025", title: "Shipped product-focused systems across multiple domains", icon: Rocket, accent: "#f472b6" },
  { year: "2026", title: "Completed internships and strengthened real-world engineering practice", icon: BriefcaseBusiness, accent: "#f59e0b" },
  { year: "2027", title: "Preparing for software engineering opportunities", icon: Sparkles, accent: "#3b82f6" },
];

const education = [
  {
    phase: "Foundation Phase",
    title: "Foundation Years",
    headline: "Where disciplined learning began",
    institution: "P.U.M. School",
    study: "Primary & Middle School Education",
    specialization: "Built early academic discipline, curiosity, communication habits, and the confidence to grow through every next stage.",
    location: "Ellappalayam, Coimbatore",
    duration: "2011 - 2019",
    scoreLabel: "Status",
    score: "Completed",
    percentage: "",
    mapLink: "https://maps.app.goo.gl/1D9bGehPVBpTAQtJ8?g_st=aw",
    marker: "circle",
    accent: "from-cyan-300 to-sky-500",
    glow: "shadow-cyan-500/20",
  },
  {
    phase: "Growth Phase",
    title: "Higher Secondary",
    headline: "A science chapter that strengthened analytical thinking",
    institution: "Thavathiru Santhalinga Adigalar Government Higher Secondary School",
    study: "Higher Secondary Education",
    specialization: "Developed strong observation, problem-solving, and exam discipline through a science-focused academic path.",
    location: "Kattampatti, Coimbatore",
    duration: "2019 - 2023",
    scoreLabel: "12th Mark",
    score: "497 / 600",
    percentage: "82.83%",
    mapLink: "",
    marker: "hexagon",
    accent: "from-blue-400 to-cyan-400",
    glow: "shadow-blue-500/20",
  },
  {
    phase: "Specialization Phase",
    title: "Cyber Security Engineering",
    headline: "Transforming academic focus into secure software engineering",
    institution: "Sri Krishna College of Engineering and Technology",
    study: "B.E. Computer Science and Engineering",
    specialization: "Specializing in Cyber Security while building a strong foundation in software development, systems, networks, cloud, and modern engineering practices.",
    location: "Kunniyamuthur, Coimbatore",
    duration: "2023 - 2027",
    scoreLabel: "CGPA",
    score: "8.02",
    percentage: "",
    mapLink: "https://maps.app.goo.gl/niyqXzzZMcVyWEDT8?g_st=aw",
    marker: "diamond",
    accent: "from-purple-400 to-fuchsia-500",
    glow: "shadow-purple-500/20",
  },
];

const courseworkCategories = [
  {
    title: "Cyber Security",
    icon: ShieldCheck,
    color: "#a855f7",
    position: { left: "9%", top: "23%" },
    shape: "rounded-[2rem]",
    description: "Security-focused learning that strengthened my ability to evaluate threats, protect systems, and think with a defensive engineering mindset.",
    subjects: [
      {
        name: "Ethical Hacking",
        learning:
          "Through this course, I learned how attackers identify weaknesses and how security professionals test systems responsibly. It helped me understand reconnaissance, vulnerability discovery, exploitation concepts, and the importance of documenting findings clearly. This experience strengthened my ability to think critically about system protection and secure development practices.",
      },
      {
        name: "Cloud Security",
        learning:
          "This course helped me understand how cloud environments are protected through identity management, secure configuration, access policies, monitoring, and shared responsibility models. I learned how organizations reduce risk while running scalable infrastructure and cloud-based services.",
      },
      {
        name: "Cyber Attack Simulation & Security Testing",
        learning:
          "I learned how simulated attacks are used to evaluate system resilience before real threats occur. This subject helped me understand testing workflows, threat scenarios, defensive validation, and the value of controlled security assessment in professional environments.",
      },
      {
        name: "Security Assessment & Risk Analysis",
        learning:
          "This course taught me how to evaluate technical risk, identify security gaps, prioritize vulnerabilities, and recommend practical controls. It improved my ability to connect security decisions with business impact and operational safety.",
      },
      {
        name: "Security Policies & Implementation",
        learning:
          "I learned how security policies guide real-world protection practices inside organizations. This included understanding standards, access rules, compliance thinking, and how policies are translated into practical implementation steps.",
      },
      {
        name: "Access Control & Identity Management",
        learning:
          "This subject helped me understand authentication, authorization, roles, privileges, and identity lifecycle management. I learned why proper access control is essential for reducing internal and external security risks.",
      },
      {
        name: "Digital Forensics",
        learning:
          "I gained an introduction to investigating digital evidence, analyzing incidents, and preserving information for technical review. This strengthened my understanding of how security teams trace activity and respond after suspicious events.",
      },
      {
        name: "Network Security",
        learning:
          "This course helped me understand how networks are protected using secure architecture, monitoring, segmentation, firewalls, and threat detection concepts. It gave me a stronger foundation for building and maintaining safer connected systems.",
      },
    ],
  },
  {
    title: "Software Development",
    icon: Code2,
    color: "#06b6d4",
    position: { left: "39%", top: "7%" },
    shape: "rounded-full",
    description: "Core engineering knowledge for designing efficient, maintainable, and user-focused software systems.",
    subjects: [
      {
        name: "Data Structures & Algorithms",
        learning:
          "This course developed my ability to organize data efficiently and choose the right approach for solving programming problems. I learned how arrays, lists, stacks, queues, trees, graphs, and searching techniques affect performance and software quality.",
      },
      {
        name: "Design & Analysis of Algorithms",
        learning:
          "I learned how to evaluate algorithms using time and space complexity and how to compare multiple solutions for efficiency. This improved my ability to write scalable logic and make better engineering decisions when building applications.",
      },
      {
        name: "Database Management Systems",
        learning:
          "This subject taught me how data is structured, queried, related, and maintained inside database systems. I learned database design, normalization, SQL concepts, and how reliable data storage supports real applications.",
      },
      {
        name: "Operating Systems",
        learning:
          "I learned how operating systems manage processes, memory, files, scheduling, and resources. This gave me a deeper understanding of how software interacts with system-level components and runtime environments.",
      },
      {
        name: "Advanced Java Programming",
        learning:
          "This course strengthened my object-oriented programming skills and helped me understand reusable design, exception handling, collections, and application-level Java development. It improved my confidence in writing structured backend logic.",
      },
      {
        name: "Application Development",
        learning:
          "I learned how software ideas are planned, structured, implemented, tested, and improved as functional applications. This course helped me connect programming knowledge with real-world product-building practices.",
      },
      {
        name: "Web Technology using React",
        learning:
          "This subject helped me understand component-based frontend development, state-driven interfaces, reusable UI patterns, and responsive web experiences. It contributed directly to my interest in modern frontend engineering.",
      },
      {
        name: "REST API Development",
        learning:
          "I learned how applications communicate through structured API endpoints, request methods, responses, status codes, and backend integration patterns. This strengthened my full-stack development foundation.",
      },
    ],
  },
  {
    title: "Cloud Infrastructure",
    icon: Network,
    color: "#3b82f6",
    position: { right: "8%", top: "25%" },
    shape: "rounded-[1.25rem]",
    description: "Infrastructure knowledge for deploying, scaling, virtualizing, and managing modern application environments.",
    subjects: [
      {
        name: "Cloud Computing",
        learning:
          "This course introduced me to cloud infrastructure, virtualization concepts, scalable resource management, and service deployment models. I learned how modern organizations use cloud environments to improve flexibility, reliability, and operational efficiency.",
      },
      {
        name: "Cloud Virtualization",
        learning:
          "I learned how virtualization allows computing resources to be abstracted, shared, and managed efficiently. This helped me understand how cloud platforms support scalable environments and cost-effective infrastructure usage.",
      },
      {
        name: "Containerization",
        learning:
          "Through this course, I gained an understanding of modern application deployment using container technologies. I learned how containerized environments improve consistency, portability, scalability, and deployment efficiency across development and production systems.",
      },
      {
        name: "Enterprise Network Administration",
        learning:
          "This subject helped me understand how enterprise networks are configured, monitored, maintained, and optimized. It gave me practical awareness of infrastructure reliability and administrative responsibilities.",
      },
      {
        name: "Enterprise Network Security & Automation",
        learning:
          "I learned how enterprise networks can be secured and automated to reduce manual effort, improve consistency, and respond more effectively to operational needs. This connected networking knowledge with modern infrastructure practices.",
      },
      {
        name: "Managing Cloud & Containerization",
        learning:
          "This course helped me understand how cloud services and containerized deployments are managed together in professional environments. It strengthened my view of scalable deployment pipelines and infrastructure operations.",
      },
    ],
  },
  {
    title: "Data Intelligence",
    icon: Database,
    color: "#10b981",
    position: { left: "14%", bottom: "16%" },
    shape: "rounded-full",
    description: "Analytical learning that helped me convert raw information into insight, visual reporting, and decision support.",
    subjects: [
      {
        name: "Data Analytics & Visualization",
        learning:
          "I learned how to interpret datasets, identify patterns, and communicate findings through clear visual representations. This improved my ability to convert raw data into useful technical and business insights.",
      },
      {
        name: "Power BI",
        learning:
          "Through this course, I learned how to transform raw datasets into meaningful business insights using interactive dashboards and visual reports. I developed the ability to design KPI-driven analytics, create data visualizations, and communicate information for decision-making.",
      },
      {
        name: "Exploratory Data Analysis using Python",
        learning:
          "This subject taught me how to inspect datasets, clean information, identify trends, and explore relationships using Python-based analysis. It strengthened my ability to approach data problems with structure and evidence.",
      },
      {
        name: "Machine Learning Essentials",
        learning:
          "I gained a foundation in how machine learning models learn patterns from data and support prediction or classification tasks. This course helped me understand the connection between data preparation, model thinking, and intelligent applications.",
      },
    ],
  },
  {
    title: "Networking",
    icon: Server,
    color: "#f59e0b",
    position: { right: "18%", bottom: "14%" },
    shape: "rounded-[2rem]",
    description: "Network-centered knowledge that improved my understanding of connected systems, administration, and secure communication.",
    subjects: [
      {
        name: "Enterprise Network Administration",
        learning:
          "I learned how enterprise networks are organized, configured, and maintained for reliable communication. This gave me a stronger understanding of infrastructure operations and the importance of stable network design.",
      },
      {
        name: "Enterprise Network Security & Automation",
        learning:
          "This subject showed me how automation and security practices improve enterprise network management. I learned how repeatable configurations, access rules, and monitoring practices support safer and more efficient systems.",
      },
      {
        name: "Network Security",
        learning:
          "I developed a foundation in protecting networks through secure design, monitoring, access control, and threat-aware administration. This knowledge supports my cybersecurity learning and secure software mindset.",
      },
    ],
  },
  {
    title: "Problem Solving",
    icon: Sparkles,
    color: "#ef4444",
    position: { left: "40%", bottom: "2%" },
    shape: "rounded-[1.5rem]",
    description: "Thinking practices that sharpened my ability to break down complex problems and design practical solutions.",
    subjects: [
      {
        name: "Problem Solving using C++",
        learning:
          "This course improved my programming logic through structured problem solving with C++. I learned how to translate requirements into algorithms and write clearer, more efficient solutions.",
      },
      {
        name: "Analytical Thinking",
        learning:
          "I learned how to break complex situations into smaller parts, compare possibilities, and make decisions based on evidence. This skill supports both software development and cybersecurity analysis.",
      },
      {
        name: "Design Thinking",
        learning:
          "This subject helped me approach problems from the user's perspective, define needs clearly, and develop practical solution ideas. It strengthened my ability to think beyond code and consider usability and impact.",
      },
      {
        name: "Computational Problem Solving",
        learning:
          "I learned how to frame real-world problems in a computational way using logic, abstraction, and step-by-step solution design. This improved my engineering thinking and algorithmic confidence.",
      },
    ],
  },
];

const skillAsset = (time: string) => encodeURI(`/ChatGPT Image Jun 27, 2026, ${time} PM.png`);
const linkedinAsset = encodeURI("/ChatGPT Image Jun 29, 2026, 12_56_16 PM.png");
const technology = (name: string, descriptor: string, time: string): SkillTechnology => ({
  name,
  descriptor,
  image: skillAsset(time),
});

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    description: "Interfaces, interaction, and responsive product experiences.",
    accent: "#22d3ee",
    gridClass: "lg:col-span-12",
    items: [
      technology("HTML5", "Semantic markup", "08_56_24"),
      technology("CSS3", "Modern styling", "08_56_33"),
      technology("JavaScript", "Web programming language", "08_56_39"),
      technology("React", "Component UI library", "08_56_58"),
      technology("Next.js", "Production React framework", "08_57_03"),
      technology("TypeScript", "Typed JavaScript", "08_57_10"),
      technology("Tailwind CSS", "Utility-first styling", "08_57_18"),
      technology("Framer Motion", "Interface animation", "08_57_24"),
    ],
  },
  {
    title: "Backend",
    description: "APIs, services, authentication, and application architecture.",
    accent: "#a855f7",
    gridClass: "lg:col-span-12",
    items: [
      technology("Node.js", "JavaScript runtime", "08_57_34"),
      technology("FastAPI", "Python API framework", "08_57_52"),
      technology("REST APIs", "Service integration", "08_58_01"),
      technology("Authentication", "Identity and access", "08_58_09"),
      technology("Microservices", "Distributed services", "08_58_17"),
      technology("Spring Boot", "Java backend framework", "09_01_01"),
      technology("Express.js", "Node.js web framework", "09_01_09"),
    ],
  },
  {
    title: "Database",
    description: "Structured data, persistence, modeling, and ORM workflows.",
    accent: "#10b981",
    gridClass: "lg:col-span-5",
    items: [
      technology("Database Design", "Data modeling", "08_58_34"),
      technology("MySQL", "Relational database", "08_58_41"),
      technology("MongoDB", "Document database", "08_58_47"),
      technology("PostgreSQL", "Advanced relational database", "08_59_02"),
      technology("Prisma", "Type-safe ORM", "08_59_09"),
    ],
  },
  {
    title: "DevOps / Cloud",
    description: "Delivery, infrastructure, collaboration, and engineering tools.",
    accent: "#f59e0b",
    gridClass: "lg:col-span-7",
    items: [
      technology("Docker", "Container platform", "08_59_16"),
      technology("Git", "Version control", "08_59_22"),
      technology("GitHub", "Code collaboration", "08_59_28"),
      technology("Postman", "API development", "08_59_35"),
      technology("Figma", "Interface design", "08_59_43"),
      technology("Linux", "Operating environment", "08_59_50"),
      technology("AWS", "Cloud platform", "08_59_56"),
      technology("Azure", "Cloud services", "09_00_03"),
    ],
  },
  {
    title: "Programming Languages",
    description: "Languages, algorithms, and computational foundations.",
    accent: "#8b5cf6",
    gridClass: "lg:col-span-4",
    items: [
      technology("C++", "Systems programming", "09_00_17"),
      technology("Java", "Object-oriented programming", "09_00_29"),
    ],
  },
  {
    title: "Cyber Security",
    description: "Security analysis, network visibility, and defensive tooling.",
    accent: "#ef4444",
    gridClass: "lg:col-span-5",
    items: [
      technology("Kali Linux", "Security testing platform", "09_00_10"),
      technology("Wireshark", "Network protocol analysis", "09_00_46"),
      technology("Nmap", "Network discovery", "09_00_54"),
    ],
  },
  {
    title: "Problem Solving",
    description: "Algorithms and structured computational thinking.",
    accent: "#f59e0b",
    gridClass: "lg:col-span-3",
    items: [
      technology("DSA", "Data structures and algorithms", "09_00_38"),
    ],
  },
];

const marqueeTechnologyNames = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "Docker",
  "AWS",
  "GitHub",
  "TypeScript",
  "FastAPI",
  "Spring Boot",
  "Linux",
  "Azure",
];

const marqueeTechnologies = marqueeTechnologyNames
  .map((name) => skillCategories.flatMap((category) => category.items).find((item) => item.name === name))
  .filter((item): item is SkillTechnology => Boolean(item));

const internships: ProofDocument[] = [
  {
    title: "Full Stack Development Internship",
    organization: "Vaidsys Technologies",
    period: "6 May 2026 - 5 June 2026",
    category: "Full-Stack Development",
    year: "2026",
    issueDate: "06 June 2026",
    certificateId: "VST0526281",
    description:
      "Completed a structured full-stack development internship focused on frontend engineering, backend integration, API workflows, debugging practices, and software delivery fundamentals within a professional development environment.",
    challenge:
      "Move beyond isolated academic programming concepts and understand how full-stack development is organized in a professional workflow.",
    outcome:
      "Built stronger confidence in application structure, API-centered thinking, implementation clarity, and the discipline required to complete assigned development work.",
    work: [
      "Studied how frontend, backend, and data flow combine in full-stack applications.",
      "Practiced organizing development work with clearer feature and API thinking.",
      "Improved code reading, debugging, and implementation discipline.",
    ],
    proofUrl: "/intern/Full%20Stack%20Development%20Intership.pdf",
    previewUrl: "/intern-previews/Full%20Stack%20Development%20Intership.png",
    accent: "#22d3ee",
    learning: [
      "Understood the relationship between interface design, backend services, and data movement.",
      "Learned how development tasks are structured, reviewed, and improved in practice.",
      "Strengthened debugging habits and clearer implementation thinking.",
      "Gained exposure to professional software delivery expectations.",
      "Improved confidence in building complete application workflows.",
    ],
    stack: ["Full-Stack Development", "Frontend Flow", "Backend Logic", "API Thinking", "Debugging", "Delivery Discipline"],
  },
  {
    title: "Cyber Security Internship",
    organization: "The Red Users",
    period: "11 December 2024 - 10 January 2025",
    category: "Cyber Security",
    year: "2024 - 2025",
    issueDate: "21 January 2025",
    certificateId: "TRU-PF-20250116-016",
    description:
      "A one-month cyber security internship that strengthened my foundation in security thinking, responsible assessment, threat awareness, and disciplined technical learning.",
    challenge:
      "Build practical awareness of how security professionals evaluate systems, document observations, and think defensively about risk.",
    outcome:
      "Gained stronger confidence in cyber security fundamentals, structured investigation, and communicating security concepts with clarity.",
    work: [
      "Explored core security concepts through structured internship tasks.",
      "Practiced thinking about vulnerabilities, risk, and defensive controls.",
      "Improved discipline in documenting technical learning and observations.",
    ],
    proofUrl: "/intern/Intern%20Certificate.pdf",
    previewUrl: "/intern-previews/Intern%20Certificate.png",
    accent: "#10b981",
    learning: [
      "Built a stronger foundation in cyber security concepts and defensive thinking.",
      "Learned to evaluate risks with a more structured and responsible mindset.",
      "Improved technical documentation habits during security-focused learning.",
      "Understood why disciplined observation matters in security assessment.",
      "Strengthened my interest in secure software and network protection.",
    ],
    stack: ["Cyber Security", "Threat Awareness", "Risk Thinking", "Security Documentation", "Defensive Mindset"],
  },
  {
    title: "Software Development Internship",
    organization: "Cognifyz IT Solutions Pvt. Ltd.",
    period: "28 May 2026 - 28 June 2026",
    category: "Software Development",
    year: "2026",
    issueDate: "30 June 2026",
    certificateId: "CTI/AI/C363568",
    description:
      "Completed a one-month Software Development Internship at Cognifyz IT Solutions, demonstrating consistent dedication, professional communication, coordination, and close attention to assigned work.",
    challenge:
      "Adapt to new software development assignments while maintaining consistency, communication, and professional responsibility throughout the internship period.",
    outcome:
      "Strengthened professional discipline, assignment ownership, coordination, and the confidence to approach unfamiliar development challenges with a continuous-learning mindset.",
    work: [
      "Completed assigned software development activities with consistent effort and enthusiasm.",
      "Coordinated effectively and communicated progress within a professional environment.",
      "Applied careful attention to detail while approaching new assignments and challenges.",
    ],
    proofUrl: "/Software%20Development%20Internship%20.pdf",
    previewUrl: "/intern-previews/Software%20Development%20Internship.png",
    accent: "#3b82f6",
    learning: [
      "Improved professional communication and coordination habits.",
      "Developed stronger ownership and consistency when completing assigned work.",
      "Learned to approach unfamiliar assignments with curiosity and persistence.",
      "Strengthened attention to detail in a software development setting.",
      "Reinforced the value of continuous learning and professional discipline.",
    ],
    stack: ["Software Development", "Communication", "Coordination", "Attention to Detail", "Continuous Learning"],
  },
].sort(
  (first, second) =>
    new Date(second.issueDate ?? "1 January 1970").getTime() - new Date(first.issueDate ?? "1 January 1970").getTime(),
);

const projects: Project[] = [
  {
    title: "AnimeZ",
    category: "Streaming / Frontend",
    productType: "Anime media platform",
    description:
      "A responsive anime media platform built for fast discovery, clean episode browsing, and smooth mobile-first viewing.",
    impact: "A responsive anime media platform built for fast discovery, clean episode browsing, and smooth mobile-first viewing.",
    problem: "Turns scattered anime media links into a structured, searchable, and mobile-friendly streaming interface.",
    year: "2025",
    metrics: ["58+ Episodes", "Drive Delivery", "Auto Detection", "Mobile Media UX"],
    gallery: ["Library", "Watch Flow", "Episode Grid", "Mobile View"],
    stack: ["Next.js 15", "React", "Media UI", "Responsive Design"],
    status: "Live",
    image: "/projects/Screenshot%202026-06-20%20205627.png",
    accent: "#ec4899",
    accentTwo: "#a855f7",
    liveUrl: "https://animez-plum.vercel.app",
    githubUrl: "https://github.com/sakthisrisanth98/AnimeZ",
    features: ["Media Discovery Engine", "Google Drive Delivery", "Episode Detection", "Responsive Watch Flow", "Mobile Navigation"],
    architecture: "Next.js frontend with media-driven content rendering, responsive layout systems, and streaming-ready video routing.",
    learning: "Responsive Grid System | Content Discovery Architecture | Streaming UI Optimization",
    featured: true,
  },
  {
    title: "AstroVelo",
    category: "Game Development",
    productType: "Arcade survival game",
    description:
      "Arcade space survival game with boss battles, missions, upgrades, rewards, local progress saving, and responsive PC/mobile controls.",
    impact: "A replay-focused browser game with progression, rewards, and fast arcade interaction.",
    problem: "Creates a lightweight game experience that works across devices while keeping player progression engaging.",
    year: "2025",
    metrics: ["12 Ships", "7 Power Systems", "13 Environments", "Boss Progression"],
    stack: ["Phaser 3", "JavaScript", "Game UI", "Responsive Controls", "Missions"],
    gallery: ["Run", "Shop", "Boss Battle", "Missions", "Rewards"],
    status: "Live",
    image: "/projects/Screenshot%202026-06-20%20205753.png",
    accent: "#8b5cf6",
    accentTwo: "#2563eb",
    liveUrl: "https://astrovelo-space-survival-game.vercel.app",
    githubUrl: "https://github.com/sakthisrisanth98/astrovelo-space-survival-game",
    features: ["Responsive Gameplay", "Progression Economy", "Boss Battle System", "Mission Loop", "Profile Avatars"],
    architecture: "Phaser-based gameplay loop with modular scenes, player progression state, interactive menus, and responsive input handling.",
    learning: "Progression Engine | Arcade State Management | Responsive Control System",
    featured: true,
  },
  {
    title: "Limitra AI",
    category: "AI / Full Stack",
    productType: "AI assistant workspace",
    description:
      "AI assistant workspace combining chat, web research, file workflows, image lookup, image generation, memory, voice typing, and saved conversations.",
    impact: "A calm full-stack AI workspace that brings multiple intelligent tools into one practical workflow.",
    problem: "Reduces context switching by combining research, files, media tools, chat history, and memory in one interface.",
    year: "2026",
    metrics: ["Chat", "Research", "Files", "Images", "Voice", "Memory"],
    gallery: ["Chat", "Research", "Files", "Image Tools", "Memory"],
    stack: ["Next.js", "Prisma", "MySQL", "Gemini", "File Upload", "Voice"],
    status: "Live",
    image: "/projects/Screenshot%202026-06-20%20210330.png",
    accent: "#22d3ee",
    accentTwo: "#8b5cf6",
    liveUrl: "https://limitra-ai.vercel.app",
    githubUrl: "https://github.com/sakthisrisanth98/Limitra-AI",
    features: ["AI Command Workspace", "Research Workflow", "File Intelligence", "Voice Input", "Persistent Memory"],
    architecture: "Next.js full-stack app using Prisma and MySQL for persistence, Gemini-powered AI workflows, and modular tool panels.",
    learning: "AI Workspace Orchestration | Persistent Memory Flow | Multi-Tool Product Architecture",
    featured: true,
  },
  {
    title: "Nexmart",
    category: "E-commerce / Marketplace",
    productType: "Multi-vendor marketplace",
    description:
      "Premium multi-vendor marketplace with customer shopping, seller/admin dashboards, checkout, orders, coupons, reviews, analytics, and AI-ready commerce workflows.",
    impact: "A complete commerce product with marketplace, seller operations, and admin management flows.",
    problem: "Connects customer shopping, seller control, and administrative visibility inside one organized commerce system.",
    year: "2026",
    metrics: ["Marketplace", "Seller Console", "Admin Panel", "Checkout Flow"],
    gallery: ["Storefront", "Seller", "Admin", "Orders", "Analytics"],
    stack: ["Next.js", "Marketplace", "Dashboards", "Cart", "Orders", "Analytics"],
    status: "Live",
    image: "/projects/Screenshot%202026-06-20%20210410.png",
    accent: "#3b82f6",
    accentTwo: "#10b981",
    liveUrl: "https://nexmart-ebon.vercel.app",
    githubUrl: "https://github.com/sakthisrisanth98/Nexmart",
    features: ["Customer Marketplace", "Seller Operations", "Admin Intelligence", "Order Pipeline", "Review System"],
    architecture: "Multi-role commerce platform with separate marketplace, seller, and admin experiences designed for scalable shopping workflows.",
    learning: "Multi-Role Commerce Flow | Dashboard Architecture | Order Pipeline Design",
    featured: true,
  },
  {
    title: "Cropix AI Studio",
    category: "AI / Image Processing",
    productType: "Image processing studio",
    description:
      "Image-processing workspace for collage splitting, cropping, restoration, conversion, batch export, ZIP downloads, and HD asset generation.",
    impact: "A production-style visual tool for preparing clean image assets from messy inputs.",
    problem: "Helps users extract, repair, convert, and export image assets without switching between multiple tools.",
    year: "2026",
    metrics: ["Batch ZIP", "HD Restore", "OpenCV", "FastAPI Pipeline"],
    gallery: ["Upload", "Crop", "Restore", "Convert", "Export"],
    stack: ["Next.js", "FastAPI", "OpenCV", "Pillow", "JSZip", "Real-ESRGAN"],
    status: "Live",
    image: "/projects/Screenshot%202026-06-20%20210436.png",
    accent: "#84cc16",
    accentTwo: "#06b6d4",
    liveUrl: "https://cropix-ai.vercel.app",
    githubUrl: "https://github.com/sakthisrisanth98/Cropix-AI",
    features: ["Image Extraction", "Collage Splitting", "HD Restoration", "Batch Export", "Format Conversion"],
    architecture: "Next.js interface connected to FastAPI image-processing services with OpenCV, Pillow, JSZip export, and HD restoration workflow.",
    learning: "Image Processing Pipeline | Batch Export Workflow | FastAPI Media Operations",
  },
  {
    title: "AegisMTD",
    category: "Cyber Security / Cloud Defense",
    productType: "SOC defense dashboard",
    description:
      "Cyber defense dashboard for moving target defense, deception monitoring, honeypots, threat globe visualization, incident reports, and real/demo security modes.",
    impact: "A SOC-style defense system concept for visualizing attacks, mutations, honeypots, and security reports.",
    problem: "Makes moving target defense easier to explain through dashboards, risk metrics, simulated traffic, and response views.",
    year: "2025",
    metrics: ["SOC Console", "871 Threat Events", "MTD Mutations", "Honeypot Signals"],
    gallery: ["Overview", "Containers", "Threat Intel", "Reports", "Network"],
    stack: ["Flask", "SOC Dashboard", "Honeypots", "Threat Globe", "RBAC", "Reports"],
    status: "Local / Case Study",
    image: "/projects/Screenshot%202026-05-06%20192632.png",
    accent: "#ef4444",
    accentTwo: "#22c55e",
    githubUrl: "https://github.com/sakthisrisanth98/Aegistmd",
    features: ["Defense Command Center", "Threat Visualization", "Honeypot Workflow", "Mutation Engine", "Role-Based Access"],
    architecture: "Flask backend with SOC-style dashboard modules, deception controls, reporting workflow, and security visualization layers.",
    learning: "SOC Dashboard Modeling | Deception Workflow Design | Threat Visualization System",
  },
  {
    title: "WebGuard",
    category: "Cyber Security / Browser Extension",
    productType: "Chrome privacy extension",
    description:
      "Chrome privacy intelligence extension for real-time tracking detection, anomaly analysis, domain intelligence, risk scoring, and sensitive data exposure alerts.",
    impact: "A browser-side privacy companion that turns hidden tracking behavior into readable security signals.",
    problem: "Helps users notice risky domains, suspicious behavior, and possible data exposure while browsing.",
    year: "2024",
    metrics: ["Risk Score", "Tracker Signals", "Domain Intel", "Privacy Alerts"],
    gallery: ["Extension Popup", "Risk View", "Domain Intel", "Alerts", "Settings"],
    stack: ["Chrome Extension", "AI Privacy", "Risk Scoring", "Domain Intelligence", "Security UX"],
    status: "Local / Case Study",
    image: "/projects/ChatGPT%20Image%20Jun%2021%2C%202026%2C%2011_53_44%20AM.png",
    accent: "#10b981",
    accentTwo: "#14b8a6",
    githubUrl: "https://github.com/sakthisrisanth98/WebGuard---Extension",
    features: ["Privacy Signal Layer", "Anomaly Detection", "Domain Intelligence", "Exposure Alerts", "Risk Scoring"],
    architecture: "Chrome extension architecture with browser activity monitoring, local risk signals, and privacy-focused user feedback.",
    learning: "Browser Security Signals | Privacy Risk Scoring | Extension UX Architecture",
  },
];

const projectFilters = ["All", "AI", "Full Stack", "Cyber Security", "E-Commerce", "Game", "Extension", "Image Tools"];

const projectFilterAccent: Record<string, string> = {
  All: "#67e8f9",
  AI: "#22d3ee",
  "Full Stack": "#8b5cf6",
  "Cyber Security": "#ef4444",
  "E-Commerce": "#3b82f6",
  Game: "#8b5cf6",
  Extension: "#10b981",
  "Image Tools": "#84cc16",
};

const certificateFiles = [
  "AIFundamentalsFoundationsforUnderstandingAI_Badge20260615-31-lsfs5p.pdf",
  "Apache Maven.pdf",
  "Apply_AI-_Analyze_Customer_Reviews_certificate_727723eucy046-skcet-ac-in_199c3548-e86f-4ae1-aa4a-c4f2d5b1b827.pdf",
  "Artifical Intelligence.pdf",
  "AWS Cloud Practitioner Essentials.pdf",
  "basics of python.pdf",
  "Block chain.pdf",
  "BlockChain.pdf",
  "C++ fundamentals .pdf",
  "CCNA-_Switching-_Routing-_and_Wireless_Essentials_certificate_727723eucy046-skcet-ac-in_907c490e-59aa-4720-8216-8cd6d33b489b.pdf",
  "Cloud Computing Fundamentals.pdf",
  "Cloud Security Administration Introduction.pdf",
  "Completion Certificate _ SkillsBuild.pdf",
  "Completion Certificate _ SkillsBuild1.pdf",
  "Completion Certificate _ SkillsBuild2.pdf",
  "css certificate.pdf",
  "Cyber security.pdf",
  "Data Fundamentals.pdf",
  "Data science workshop .pdf",
  "Data Structures and Algorihtm using java-An Interactive way.pdf",
  "Data Structures and Algorithm using java.pdf",
  "DATA STRUCTURES AND ALGORITHM.pdf",
  "Database and sql.pdf",
  "Database Management Part-1.pdf",
  "Database Management Part-2.pdf",
  "Diplomo of completion.pdf",
  "Ethical Hacker.pdf",
  "Ethical Hacking 101.pdf",
  "Ethical Hacking Essentials.pdf",
  "Ethical_Hacker_certificate_727723eucy046-skcet-ac-in_9d0584e4-f223-4eda-b1dc-909b0b4ef597.pdf",
  "Ethical_Hacker_certificate_727723eucy046-skcet-ac-in_f8b51417-52ad-457e-a4f7-afb88aedb115.pdf",
  "Frontend techniques.pdf",
  "Full stack development.pdf",
  "Hibernate Framework - Basics.pdf",
  "Identity and Access Management.pdf",
  "Introduction to Cyber Security .pdf",
  "Introduction to Cyber Security.pdf",
  "Introduction to Dark Web.pdf",
  "Introduction to HTML.pdf",
  "Introduction to NoSQL Databases.pdf",
  "Introduction_to_Cybersecurity_certificate_727723eucy046-skcet-ac-in_5cfa841c-f2bd-4d6e-97ac-d4733b4ee87d.pdf",
  "Introduction_to_Data_Science_certificate_727723eucy046-skcet-ac-in_1c52b06d-1cff-4778-9609-ef2d13bbf552.pdf",
  "Introduction_to_Modern_AI_certificate_727723eucy046-skcet-ac-in_cad2d490-c510-444a-b3ae-219d760f494b.pdf",
  "Iot  workshop.pdf",
  "Java Foundation Certification.pdf",
  "Java language features.pdf",
  "Java programming fundamentals.pdf",
  "JAVA SE 8 FEAUTURES.pdf",
  "Javascript training.pdf",
  "java_basic certificate.pdf",
  "LearningPath_Certificate_05042024144314247.pdf",
  "LearningPath_Certificate_05042024153115606.pdf",
  "LearningPath_Certificate_05042024154816372.pdf",
  "LearningPath_Certificate_05042024155120012.pdf",
  "LearningPath_Certificate_05042024155210213.pdf",
  "LearningPath_Certificate_05042024155234018.pdf",
  "Programming Using Java.pdf",
  "Python for Absolute Beginners.pdf",
  "Python_Essentials_1_certificate_727723eucy046-skcet-ac-in_b8f837b0-bbc1-4160-b9ef-6ea210d617be.pdf",
  "Python_Essentials_2_certificate_727723eucy046-skcet-ac-in_7c98bfc9-ac7a-43bc-84ee-27ac2de35857.pdf",
  "React JS.pdf",
  "React Web Developer Certification.pdf",
  "Software engineering and agile software development.pdf",
  "Spring 5 Basics with Spring Boot.pdf",
  "Spring Data JPA with Boot.pdf",
  "Spring REST.pdf",
  "sql_basic certificate.pdf",
  "sql_intermediate certificate.pdf",
  "Ui path automation explorer for students.pdf",
  "Ultimate Javascript Strings.pdf",
  "Unit Testing in Java - JUnit.pdf",
  "Workshop of Agentic AI.PDF",
];

const certificateAccent: Record<CertificateDomain, string> = {
  "Cyber Security": "#a855f7",
  "AI & Data": "#10b981",
  "Cloud & DevOps": "#3b82f6",
  "Software Engineering": "#22c55e",
  "Frontend & Web": "#f472b6",
  "Programming Foundations": "#f59e0b",
  "Emerging Technology": "#fb923c",
};

const certificateFilters = ["All", ...Object.keys(certificateAccent)] as const;

function certificateUrl(file: string) {
  return `/certificates/${encodeURIComponent(file)}`;
}

function certificatePreviewUrl(file: string) {
  return `/certificate-previews/${encodeURIComponent(file.replace(/\.pdf$/i, ".png"))}`;
}

function certificateTitle(file: string) {
  const exactTitles: Record<string, string> = {
    "AIFundamentalsFoundationsforUnderstandingAI_Badge20260615-31-lsfs5p.pdf": "AI Fundamentals: Foundations for Understanding AI",
    "Apply_AI-_Analyze_Customer_Reviews_certificate_727723eucy046-skcet-ac-in_199c3548-e86f-4ae1-aa4a-c4f2d5b1b827.pdf": "Apply AI: Analyze Customer Reviews",
    "Artifical Intelligence.pdf": "Artificial Intelligence",
    "CCNA-_Switching-_Routing-_and_Wireless_Essentials_certificate_727723eucy046-skcet-ac-in_907c490e-59aa-4720-8216-8cd6d33b489b.pdf": "CCNA: Switching, Routing, and Wireless Essentials",
    "Ethical_Hacker_certificate_727723eucy046-skcet-ac-in_9d0584e4-f223-4eda-b1dc-909b0b4ef597.pdf": "Ethical Hacker",
    "Ethical_Hacker_certificate_727723eucy046-skcet-ac-in_f8b51417-52ad-457e-a4f7-afb88aedb115.pdf": "Ethical Hacker",
    "Introduction_to_Cybersecurity_certificate_727723eucy046-skcet-ac-in_5cfa841c-f2bd-4d6e-97ac-d4733b4ee87d.pdf": "Introduction to Cybersecurity",
    "Introduction_to_Data_Science_certificate_727723eucy046-skcet-ac-in_1c52b06d-1cff-4778-9609-ef2d13bbf552.pdf": "Introduction to Data Science",
    "Introduction_to_Modern_AI_certificate_727723eucy046-skcet-ac-in_cad2d490-c510-444a-b3ae-219d760f494b.pdf": "Introduction to Modern AI",
    "Python_Essentials_1_certificate_727723eucy046-skcet-ac-in_b8f837b0-bbc1-4160-b9ef-6ea210d617be.pdf": "Python Essentials 1",
    "Python_Essentials_2_certificate_727723eucy046-skcet-ac-in_7c98bfc9-ac7a-43bc-84ee-27ac2de35857.pdf": "Python Essentials 2",
  };

  if (exactTitles[file]) {
    return exactTitles[file];
  }

  return file
    .replace(/\.pdf$/i, "")
    .replace(/_/g, " ")
    .replace(/\s*certificate\s*/gi, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/\bSql\b/g, "SQL")
    .replace(/\bCss\b/g, "CSS")
    .replace(/\bHtml\b/g, "HTML")
    .replace(/\bJavascript\b/g, "JavaScript")
    .replace(/\bIot\b/g, "IoT")
    .replace(/\bAws\b/g, "AWS")
    .replace(/\bUi\b/g, "UI")
    .replace(/\bApi\b/g, "API")
    .replace(/\bJpa\b/g, "JPA")
    .replace(/\bJunit\b/g, "JUnit");
}

function certificateDomain(name: string): CertificateDomain {
  const value = name.toLowerCase();

  if (/(ai|artificial|data science|data fundamentals|customer reviews|analytics|visualization)/.test(value)) {
    return "AI & Data";
  }

  if (/(cloud|aws|maven|container|virtualization|uipath|automation)/.test(value)) {
    return "Cloud & DevOps";
  }

  if (/(cyber|ethical|security|forensics|dark web|identity|access|ccna|network)/.test(value)) {
    return "Cyber Security";
  }

  if (/(react|frontend|html|css|javascript|full stack|web)/.test(value)) {
    return "Frontend & Web";
  }

  if (/(java|spring|hibernate|junit|database|sql|nosql|structures|algorithm|software engineering|agile)/.test(value)) {
    return "Software Engineering";
  }

  if (/(python|c\+\+|programming|fundamentals|basics)/.test(value)) {
    return "Programming Foundations";
  }

  return "Emerging Technology";
}

function certificateProvider(file: string, name: string) {
  if (/727723eucy046|ccna|python essentials|cybersecurity/i.test(file)) {
    return "Cisco Networking Academy";
  }

  if (/skillsbuild|ai fundamentals/i.test(file)) {
    return "IBM SkillsBuild";
  }

  if (/aws/i.test(name)) {
    return "AWS Skill Builder";
  }

  if (/sql_basic|sql_intermediate|java_basic|css certificate/i.test(file)) {
    return "HackerRank";
  }

  return "Professional Learning Program";
}

function certificateSummary(name: string, domain: CertificateDomain) {
  const exactSummaries: Record<string, string> = {
    "AI Fundamentals: Foundations for Understanding AI":
      "This credential strengthened my understanding of modern AI concepts, responsible usage, and how intelligent systems can support practical software workflows. It helped me think more clearly about where automation, data, and human judgment meet.",
    "Apply AI: Analyze Customer Reviews":
      "Through this learning experience, I practiced using AI to extract meaning from customer feedback and identify useful patterns from unstructured text. It improved the way I connect product thinking, analysis, and real business context.",
    "CCNA: Switching, Routing, and Wireless Essentials":
      "This certificate built a stronger foundation in switching, routing, wireless communication, and secure network behavior. It helped me understand how reliable infrastructure supports real applications and connected systems.",
    "Ethical Hacker":
      "This certification improved my understanding of ethical hacking methodology, vulnerability discovery, and defensive thinking. It shaped the way I evaluate systems from both an attacker mindset and a responsible security perspective.",
  };

  if (exactSummaries[name]) {
    return exactSummaries[name];
  }

  const summaries: Record<CertificateDomain, string> = {
    "Cyber Security":
      "This certificate strengthened my security mindset through threat awareness, access control, secure networking, and risk evaluation. It helped me understand how to protect systems while thinking carefully about real-world attack surfaces.",
    "AI & Data":
      "This learning experience helped me work with data, AI concepts, analysis workflows, and insight generation. It improved my ability to connect technical output with useful decisions and clear professional communication.",
    "Cloud & DevOps":
      "This certificate improved my understanding of scalable infrastructure, deployment environments, automation, and operational reliability. It helped me see how modern software moves from local development to maintainable production systems.",
    "Software Engineering":
      "This certificate strengthened my software engineering base through programming concepts, databases, algorithms, testing, and backend frameworks. It improved the way I design maintainable, structured, and reliable application logic.",
    "Frontend & Web":
      "This certificate developed my ability to build clean web interfaces with stronger attention to structure, responsiveness, usability, and modern frontend practices. It supports my focus on polished user-facing software.",
    "Programming Foundations":
      "This certificate reinforced my programming fundamentals, problem decomposition, syntax fluency, and implementation discipline. It helped me build confidence in writing clear logic and solving technical problems step by step.",
    "Emerging Technology":
      "This certificate expanded my awareness of modern technology areas and how they connect with software innovation. It helped me explore new technical directions with a stronger engineering curiosity and practical mindset.",
  };

  return summaries[domain];
}

function certificateSkills(name: string, domain: CertificateDomain) {
  const skills: Record<CertificateDomain, string> = {
    "Cyber Security": "Threat analysis, secure networks, access control, ethical assessment",
    "AI & Data": "AI concepts, data interpretation, insight generation, analytical thinking",
    "Cloud & DevOps": "Cloud platforms, deployment thinking, automation, infrastructure basics",
    "Software Engineering": "Algorithms, databases, backend logic, testing, maintainable design",
    "Frontend & Web": "Responsive UI, React foundations, web structure, interface quality",
    "Programming Foundations": "Core syntax, logic building, problem solving, implementation discipline",
    "Emerging Technology": "Innovation awareness, systems thinking, modern technical exploration",
  };

  if (/spring|hibernate|jpa/i.test(name)) {
    return "Java backend, API design, persistence, enterprise application patterns";
  }

  if (/sql|database|nosql/i.test(name)) {
    return "Data modeling, querying, persistence, database fundamentals";
  }

  if (/react|frontend|html|css|javascript/i.test(name)) {
    return "Frontend development, UI structure, responsive interaction, web fundamentals";
  }

  return skills[domain];
}

function certificateLearningPoints(name: string, domain: CertificateDomain) {
  if (/ccna|switching|routing|wireless/i.test(name)) {
    return [
      "Configured switching, routing, and wireless network concepts.",
      "Understood how enterprise networks move traffic between systems.",
      "Practiced network troubleshooting and connectivity analysis.",
      "Learned secure communication principles for connected infrastructure.",
      "Built stronger awareness of network architecture and reliability.",
    ];
  }

  if (/ethical|hacking|dark web|forensics|identity|access|security/i.test(name)) {
    return [
      "Analyzed common threat patterns and vulnerable system behavior.",
      "Studied ethical assessment methods used in defensive security.",
      "Understood access control, identity, and risk reduction concepts.",
      "Practiced thinking from both attacker and defender perspectives.",
      "Strengthened my foundation for secure software and network design.",
    ];
  }

  if (/ai|artificial|customer reviews/i.test(name)) {
    return [
      "Explored how AI systems support automation and decision workflows.",
      "Learned to connect model output with practical product use cases.",
      "Studied responsible AI concepts and human-centered interpretation.",
      "Practiced extracting insights from unstructured information.",
      "Improved my ability to evaluate AI-enabled engineering solutions.",
    ];
  }

  if (/data|analytics|visualization|power bi/i.test(name)) {
    return [
      "Worked with data interpretation and insight development.",
      "Learned how visual reports communicate patterns clearly.",
      "Practiced converting raw information into meaningful analysis.",
      "Built awareness of dashboard thinking and business metrics.",
      "Strengthened analytical communication for technical decisions.",
    ];
  }

  if (/cloud|aws|maven|container|virtualization|automation/i.test(name)) {
    return [
      "Studied scalable infrastructure and modern deployment foundations.",
      "Understood how cloud services support reliable applications.",
      "Learned concepts around automation, portability, and operations.",
      "Explored resource management for production-ready environments.",
      "Built stronger awareness of maintainable software delivery.",
    ];
  }

  if (/react|frontend|html|css|javascript|web|full stack/i.test(name)) {
    return [
      "Built stronger understanding of modern web application structure.",
      "Practiced responsive interface thinking and clean component design.",
      "Improved awareness of user-facing performance and usability.",
      "Connected frontend implementation with practical product experience.",
      "Strengthened my foundation for polished interactive interfaces.",
    ];
  }

  if (/java|spring|hibernate|jpa|junit|database|sql|nosql|algorithm|structures|agile/i.test(name)) {
    return [
      "Strengthened core software engineering and backend fundamentals.",
      "Practiced structured logic, persistence, and maintainable design.",
      "Improved understanding of data flow and application architecture.",
      "Learned patterns used in reliable enterprise-style applications.",
      "Built discipline for testing, correctness, and clean implementation.",
    ];
  }

  if (/python|c\+\+|programming|fundamentals|basics/i.test(name)) {
    return [
      "Reinforced programming syntax, logic, and implementation discipline.",
      "Practiced decomposing problems into clear step-by-step solutions.",
      "Improved confidence in writing readable and structured code.",
      "Built stronger foundations for algorithms and application logic.",
      "Developed better problem-solving habits through hands-on practice.",
    ];
  }

  const fallback: Record<CertificateDomain, string[]> = {
    "Cyber Security": [
      "Strengthened secure thinking across systems and networks.",
      "Studied risk awareness and defensive engineering practices.",
      "Improved my ability to evaluate technical weaknesses.",
      "Built a stronger foundation for security-conscious development.",
    ],
    "AI & Data": [
      "Explored data-driven thinking and intelligent system concepts.",
      "Practiced turning information into useful technical insight.",
      "Improved analytical judgment for software and product decisions.",
      "Built awareness of AI-supported engineering workflows.",
    ],
    "Cloud & DevOps": [
      "Studied infrastructure concepts used in scalable systems.",
      "Learned how deployment environments support reliable software.",
      "Improved awareness of automation and operational quality.",
      "Built stronger understanding of production-ready engineering.",
    ],
    "Software Engineering": [
      "Strengthened structured programming and system design foundations.",
      "Practiced maintainable logic and data-driven application thinking.",
      "Improved understanding of backend and database responsibilities.",
      "Built discipline for reliable software implementation.",
    ],
    "Frontend & Web": [
      "Improved web interface structure and frontend implementation skills.",
      "Practiced responsive, user-friendly application thinking.",
      "Strengthened awareness of modern web development workflows.",
      "Built confidence in creating polished digital experiences.",
    ],
    "Programming Foundations": [
      "Reinforced problem-solving and programming fundamentals.",
      "Practiced clear logic, syntax, and implementation flow.",
      "Improved code-reading and code-writing confidence.",
      "Built a stronger base for advanced software development.",
    ],
    "Emerging Technology": [
      "Explored modern technology areas and innovation patterns.",
      "Improved awareness of how new systems connect with software.",
      "Built curiosity around practical engineering opportunities.",
      "Strengthened my ability to learn unfamiliar technical domains.",
    ],
  };

  return fallback[domain];
}

const certificates: Certificate[] = certificateFiles.map((file) => {
  const name = certificateTitle(file);
  const domain = certificateDomain(name);

  return {
    file,
    name,
    provider: certificateProvider(file, name),
    date: "Verified credential",
    domain,
    accent: certificateAccent[domain],
    summary: certificateSummary(name, domain),
    learningPoints: certificateLearningPoints(name, domain),
    skills: certificateSkills(name, domain),
    url: certificateUrl(file),
    previewUrl: certificatePreviewUrl(file),
  };
});

const achievements: ProofDocument[] = [
  {
    title: "Space Hackathon 2023",
    organization: "India International Science Festival / Hack2skill",
    period: "Certificate of Participation",
    category: "Innovation Participation",
    year: "2023",
    certificateId: "2024H2S01SIF-SH-P100926",
    description:
      "A national-level innovation participation record from Space Hackathon 2023, organized by India International Science Festival and powered by Hack2skill.",
    challenge:
      "Engage with a space-themed innovation challenge that required ideation, structured problem understanding, and clear technical presentation.",
    outcome:
      "Completed the hackathon participation and strengthened confidence in innovation-focused thinking, presentation, and challenge-based learning.",
    proofUrl: "/achievement/space%20hackathon.pdf",
    previewUrl: "/achievement-previews/space%20hackathon.png",
    accent: "#facc15",
    learning: [
      "Practiced approaching a space-focused problem through structured ideation.",
      "Strengthened communication, teamwork, and solution presentation.",
      "Improved my ability to think creatively under event-based constraints.",
      "Built confidence in participating in national innovation platforms.",
      "Learned how hackathon environments sharpen focus and execution clarity.",
    ],
    stack: ["Space Innovation", "Problem Framing", "Presentation", "Teamwork", "Execution"],
    metrics: [
      { label: "Innovation", value: 90 },
      { label: "Problem Solving", value: 88 },
      { label: "Presentation", value: 85 },
      { label: "Teamwork", value: 88 },
      { label: "Execution", value: 92 },
    ],
  },
  {
    title: "VYNFEST 24-Hour Hackathon",
    organization: "KPR Institute of Engineering and Technology",
    period: "National-Level Technical Fest",
    category: "Hackathon Participation",
    year: "2025",
    issueDate: "27-28 February 2025",
    description:
      "Participated in the 24-hour national-level hackathon at VYNFEST, organized by the Department of Computer Science and Engineering at KPR Institute of Engineering and Technology.",
    challenge:
      "Contribute to a technical solution within a concentrated 24-hour format while balancing ideation, teamwork, implementation focus, and presentation readiness.",
    outcome:
      "Completed the national-level hackathon experience and strengthened rapid problem framing, collaborative execution, and technical communication under time constraints.",
    proofUrl: "/Hackathon.pdf",
    previewUrl: "/achievement-previews/VYNFEST%2024-Hour%20Hackathon.png",
    accent: "#38bdf8",
    learning: [
      "Practiced converting an open technical challenge into a structured solution direction.",
      "Improved teamwork and decision-making during a time-bound build environment.",
      "Strengthened technical communication and presentation readiness.",
      "Developed greater confidence working through sustained hackathon constraints.",
      "Experienced the pace and discipline required in a national-level technical event.",
    ],
    stack: ["Rapid Prototyping", "Problem Framing", "Teamwork", "Technical Presentation", "Time-Bound Execution"],
  },
  {
    title: "Hack Shield 2k23",
    organization: "Sri Krishna College of Engineering and Technology",
    period: "Certificate of Achievement",
    category: "Cyber Security Competition",
    year: "2023",
    issueDate: "15 September 2023",
    description:
      "Received achievement and placement recognition for exemplary performance in Hack Shield 2k23, conducted by the Department of Computer Science and Engineering (Cyber Security).",
    challenge:
      "Participate in a cyber security-focused technical competition and demonstrate disciplined analysis, problem solving, and execution in a competitive setting.",
    outcome:
      "Earned formal achievement recognition and strengthened confidence in security-oriented technical competition and structured problem solving.",
    proofUrl: "/Hack%20Shield.pdf",
    previewUrl: "/achievement-previews/Hack%20Shield%202k23.png",
    accent: "#f59e0b",
    learning: [
      "Applied structured thinking in a cyber security-focused competitive environment.",
      "Strengthened analytical decision-making under event constraints.",
      "Improved confidence in presenting and executing technical approaches.",
      "Gained early exposure to security-centered technical competition.",
      "Learned the value of precision, preparation, and disciplined execution.",
    ],
    stack: ["Cyber Security", "Analytical Thinking", "Technical Competition", "Problem Solving", "Execution"],
  },
].sort((first, second) => Number(second.year ?? 0) - Number(first.year ?? 0));

const contactLinks: ContactLink[] = [
  {
    label: "Email",
    value: "sakthisrisanth98@gmail.com",
    image: skillAsset("08_55_59"),
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=sakthisrisanth98%40gmail.com",
    external: true,
  },
  {
    label: "Phone",
    value: "+91 78069 31074",
    image: skillAsset("08_56_05"),
    href: "tel:+917806931074",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/sakthi-sri-santh-m-416540290",
    image: linkedinAsset,
    href: "https://linkedin.com/in/sakthi-sri-santh-m-416540290",
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/sakthisrisanth98",
    image: skillAsset("08_55_24"),
    href: "https://github.com/sakthisrisanth98",
    external: true,
  },
  {
    label: "LeetCode",
    value: "leetcode.com/u/sakthisrisanth98",
    image: skillAsset("08_55_37"),
    href: "https://leetcode.com/u/sakthisrisanth98",
    external: true,
  },
  {
    label: "Telegram",
    value: "t.me/sakthisrisanth",
    image: skillAsset("08_55_43"),
    href: "https://t.me/sakthisrisanth",
    external: true,
  },
];

function SkillPanel({ category, index }: { category: SkillCategory; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={`skill-panel ${category.gridClass}`}
      style={{ "--skill-accent": category.accent } as React.CSSProperties}
    >
      <div className="skill-panel-heading">
        <h3>{category.title}</h3>
        <p>{category.description}</p>
      </div>

      <div className="skill-panel-items">
        {category.items.map((item) => (
          <div key={`${category.title}-${item.name}`} className="skill-panel-item group/skill">
            <div className="skill-panel-icon">
              <Image src={item.image} alt={`${item.name} technology icon`} width={72} height={72} sizes="72px" className="size-full object-cover" />
            </div>
            <p>{item.name}</p>
            <span className="skill-panel-tooltip">{item.descriptor}</span>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

function TechnologyMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7 }}
      className="technology-marquee"
    >
      <div className="technology-marquee-title">
        <Sparkles size={16} />
        <span>Technology Toolkit</span>
      </div>
      <div className="technology-marquee-window">
        <div className="technology-marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="technology-marquee-group" aria-hidden={copy === 1 ? "true" : undefined}>
              {marqueeTechnologies.map((item) => (
                <div key={`${copy}-${item.name}`} className="technology-marquee-item" title={item.name}>
                  <Image src={item.image} alt={copy === 0 ? `${item.name} icon` : ""} width={52} height={52} sizes="52px" className="size-full object-cover" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectVisual({ project, variant = "card" }: { project: Project; variant?: "stage" | "card" | "modal" }) {
  const isStage = variant === "stage";
  const isModal = variant === "modal";
  const heightClass = isModal ? "min-h-0" : isStage ? "h-full min-h-[24rem]" : "h-full";

  return (
    <div className={`${heightClass} min-w-0 overflow-hidden rounded-md bg-[#020617]`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        className={`${isModal ? "h-auto max-h-[68vh] w-full max-w-full object-contain" : "h-full w-full min-w-0 object-cover"} transition duration-700 group-hover:scale-105`}
      />
    </div>
  );
}

function ProjectModal({ project, children }: { project: Project; children?: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {children ? (
          <button type="button" className="project-modal-trigger text-left">
            {children}
          </button>
        ) : (
          <button className="inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 text-sm font-black transition hover:-translate-y-0.5" style={{ borderColor: `${project.accent}55`, color: project.accent }}>
            <Eye size={16} />
            Case Study
          </button>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          className="no-scrollbar fixed left-1/2 top-1/2 z-50 max-h-[88vh] w-[94vw] max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-lg border bg-[#081327]/95 p-5 text-white shadow-2xl md:p-6"
          style={{ borderColor: `${project.accent}55`, boxShadow: `0 28px 90px ${project.accent}1f` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.26em]" style={{ color: project.accent }}>{project.category}</p>
              <Dialog.Title className="mt-2 font-serif text-4xl font-black md:text-5xl">{project.title}</Dialog.Title>
              <Dialog.Description className="mt-3 max-w-3xl text-slate-300">{project.impact}</Dialog.Description>
            </div>
            <Dialog.Close className="rounded-md p-2 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="Close project details">
              <X size={20} />
            </Dialog.Close>
          </div>

          <div className="mt-6 space-y-6">
            <div className="group overflow-hidden rounded-lg border border-white/10 bg-black/25">
              <div className="grid place-items-center">
                <ProjectVisual project={project} variant="modal" />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {[
                ["Overview", project.description],
                ["Problem Solved", project.problem],
                ["Architecture", project.architecture],
                ["Outcome", project.impact],
              ].map(([label, text], index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="rounded-lg border border-white/10 bg-white/[0.035] p-4"
                >
                  <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: project.accent }}>{label}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
              <div>
                <h3 className="font-serif text-2xl font-black text-white">Core Features</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.features.slice(0, 5).map((feature) => (
                    <span key={feature} className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-bold text-slate-300">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-black text-white">Engineering Highlights</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.learning.split(" | ").map((item) => (
                    <span key={item} className="rounded-md px-3 py-2 text-sm font-bold text-slate-950" style={{ background: project.accent }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h3 className="font-serif text-2xl font-black text-white">Tech Stack</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-md border px-3 py-1 text-xs font-bold" style={{ borderColor: `${project.accent}38`, background: `${project.accent}14`, color: "#e2e8f0" }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.liveUrl ? (
                  <a className="inline-flex h-11 items-center gap-2 rounded-md px-4 text-sm font-black text-slate-950 transition hover:-translate-y-0.5" href={project.liveUrl} target="_blank" rel="noreferrer" style={{ background: project.accent }}>
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                ) : null}
                <a className="inline-flex h-11 items-center gap-2 rounded-md border border-white/15 px-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10" href={project.githubUrl ?? "#"} target="_blank" rel="noreferrer">
                  <GitBranch size={16} />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ProofModal({ item, label = "View Proof", compact = false }: { item: ProofDocument; label?: string; compact?: boolean }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          className={`${compact ? "w-full min-w-0 px-4" : "min-w-[11.5rem] px-5"} inline-flex h-12 items-center justify-center gap-2.5 whitespace-nowrap rounded-md text-sm font-black text-slate-950 transition hover:-translate-y-0.5 hover:brightness-110`}
          style={{ background: item.accent, boxShadow: `0 14px 30px ${item.accent}25` }}
        >
          <Eye size={17} className="shrink-0" />
          {label}
        </motion.button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm" />
        <Dialog.Content
          className="no-scrollbar fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[94vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-lg border bg-[#081327]/95 p-5 text-white shadow-2xl"
          style={{ borderColor: `${item.accent}66`, boxShadow: `0 28px 90px ${item.accent}22` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="font-serif text-3xl font-black md:text-4xl">{item.title}</Dialog.Title>
              <Dialog.Description className="mt-2 text-slate-300">{item.category} | {item.period}</Dialog.Description>
            </div>
            <Dialog.Close className="rounded-md p-2 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="Close proof viewer">
              <X size={20} />
            </Dialog.Close>
          </div>
          <div className="mt-6 grid place-items-center rounded-lg bg-black/25 p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.previewUrl} alt={`${item.title} proof preview`} className="max-h-[70vh] max-w-full rounded-sm bg-white object-contain" />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={item.proofUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-black text-slate-950" style={{ background: item.accent }}>
              <ExternalLink size={17} className="shrink-0" />
              Open PDF
            </a>
            <a href={item.proofUrl} download className="inline-flex items-center gap-2 rounded-md border px-5 py-3 text-sm font-black" style={{ borderColor: `${item.accent}66`, color: item.accent }}>
              <Download size={17} className="shrink-0" />
              Download PDF
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [theme] = useState<"dark" | "light">("dark");
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeletingRole, setIsDeletingRole] = useState(false);
  const [certificateFilter, setCertificateFilter] = useState<(typeof certificateFilters)[number]>("Cyber Security");
  const [certificateIndex, setCertificateIndex] = useState(0);
  const [certificatePaused, setCertificatePaused] = useState(false);
  const [activeInternshipIndex, setActiveInternshipIndex] = useState(0);
  const [activeAchievementIndex, setActiveAchievementIndex] = useState(0);
  const [projectFilter, setProjectFilter] = useState("All");
  const certificateViewerRef = useRef<HTMLDivElement | null>(null);
  const visibleProjects = useMemo(
    () =>
      projectFilter === "All"
        ? projects
        : projects.filter((project) => {
            const filter = projectFilter.toLowerCase();
            const category = project.category.toLowerCase();
            const title = project.title.toLowerCase();
            if (filter === "extension") return category.includes("extension") || title.includes("webguard");
            if (filter === "e-commerce") return category.includes("e-commerce") || category.includes("marketplace") || title.includes("nexmart");
            if (filter === "image tools") return category.includes("image") || title.includes("cropix");
            if (filter === "game") return category.includes("game") || title.includes("astrovelo");
            return category.includes(filter) || title.includes(filter);
          }),
    [projectFilter],
  );
  const year = useMemo(() => new Date().getFullYear(), []);
  useEffect(() => {
    document.body.classList.toggle("portfolio-light-mode", theme === "light");
    document.body.classList.toggle("portfolio-dark-mode", theme === "dark");

    return () => {
      document.body.classList.remove("portfolio-light-mode", "portfolio-dark-mode");
    };
  }, [theme]);
  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const subject = String(form.get("subject") ?? "Portfolio enquiry").trim();
    const message = String(form.get("message") ?? "").trim();
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");

    const gmailComposeUrl = new URL("https://mail.google.com/mail/");
    gmailComposeUrl.searchParams.set("view", "cm");
    gmailComposeUrl.searchParams.set("fs", "1");
    gmailComposeUrl.searchParams.set("to", "sakthisrisanth98@gmail.com");
    gmailComposeUrl.searchParams.set("su", subject || "Portfolio enquiry");
    gmailComposeUrl.searchParams.set("body", body);

    window.open(gmailComposeUrl.toString(), "_blank", "noopener,noreferrer");
  };
  const handlePrintResume = () => {
    const printFrame = document.createElement("iframe");
    printFrame.src = "/Resume.pdf";
    printFrame.title = "Print Sakthi Sri Santh M resume";
    printFrame.style.position = "fixed";
    printFrame.style.width = "1px";
    printFrame.style.height = "1px";
    printFrame.style.opacity = "0";
    printFrame.style.pointerEvents = "none";
    printFrame.onload = () => {
      printFrame.contentWindow?.focus();
      printFrame.contentWindow?.print();
      window.setTimeout(() => printFrame.remove(), 1500);
    };
    document.body.appendChild(printFrame);
  };
  const visibleCertificates = useMemo(
    () =>
      certificateFilter === "All"
        ? certificates
        : certificates.filter((certificate) => certificate.domain === certificateFilter),
    [certificateFilter],
  );
  const activeCertificate = visibleCertificates[certificateIndex] ?? visibleCertificates[0] ?? certificates[0];
  const activeInternship = internships[activeInternshipIndex] ?? internships[0];
  const activeAchievement = achievements[activeAchievementIndex] ?? achievements[0];
  const activeInternshipIsCyber = activeInternship.category.includes("Cyber");
  const activeInternshipIsSoftware = activeInternship.category === "Software Development";
  const internshipTheme = activeInternshipIsCyber
    ? {
        primary: "#10b981",
        secondary: "#14b8a6",
        accent: "#34d399",
        text: "#ecfdf5",
        muted: "#94a3b8",
        border: "rgba(16,185,129,0.35)",
        card: "rgba(3, 23, 19, 0.86)",
        background:
          "radial-gradient(circle at top right, rgba(16,185,129,.12), transparent 35%), linear-gradient(135deg, #020617, #031713, #052e2b)",
        label: "Security Training Record",
        contributionTitle: "Security Practice",
        growthTitle: "Defensive Growth",
        viewLabel: "View Certificate",
        downloadLabel: "Download PDF",
      }
    : activeInternshipIsSoftware
      ? {
          primary: "#3b82f6",
          secondary: "#6366f1",
          accent: "#60a5fa",
          text: "#eff6ff",
          muted: "#94a3b8",
          border: "rgba(59,130,246,0.48)",
          card: "rgba(6, 18, 48, 0.9)",
          background:
            "radial-gradient(circle at top right, rgba(59,130,246,.15), transparent 35%), linear-gradient(135deg, #020617, #061230, #0b1735)",
          label: "Certificate Preview",
          contributionTitle: "Development Practice",
          growthTitle: "Professional Growth",
          viewLabel: "View Certificate",
          downloadLabel: "Download PDF",
        }
      : {
        primary: "#22d3ee",
        secondary: "#38bdf8",
        accent: "#67e8f9",
        text: "#f8fafc",
        muted: "#94a3b8",
        border: "rgba(34,211,238,0.30)",
        card: "rgba(8, 24, 42, 0.82)",
        background: "linear-gradient(135deg, #020617, #07192f, #0f172a)",
        label: "Certificate Preview",
        contributionTitle: "Core Contributions",
        growthTitle: "Engineering Growth",
        viewLabel: "View Certificate",
        downloadLabel: "Download PDF",
        };

  useEffect(() => {
    const currentRole = heroRoles[roleIndex];
    const isComplete = typedRole === currentRole;
    const isEmpty = typedRole.length === 0;
    const delay = isComplete && !isDeletingRole ? 1300 : isDeletingRole ? 42 : 82;

    const timeout = window.setTimeout(() => {
      if (isComplete && !isDeletingRole) {
        setIsDeletingRole(true);
        return;
      }

      if (isEmpty && isDeletingRole) {
        setIsDeletingRole(false);
        setRoleIndex((current) => (current + 1) % heroRoles.length);
        return;
      }

      setTypedRole((current) =>
        isDeletingRole
          ? currentRole.slice(0, Math.max(current.length - 1, 0))
          : currentRole.slice(0, current.length + 1),
      );
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [isDeletingRole, roleIndex, typedRole]);

  useEffect(() => {
    setCertificateIndex(0);
  }, [certificateFilter]);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const navBottom = document.querySelector("header nav")?.getBoundingClientRect().bottom ?? 88;
        const marker = window.scrollY + navBottom + 24;
        let nextSection = "home";

        for (const [, id] of navItems) {
          const section = document.getElementById(id);
          if (section && section.getBoundingClientRect().top + window.scrollY <= marker) {
            nextSection = id;
          }
        }

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
          nextSection = navItems.at(-1)?.[1] ?? nextSection;
        }

        setActiveSection((current) => (current === nextSection ? current : nextSection));
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    if (certificatePaused || visibleCertificates.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setCertificateIndex((current) => (current + 1) % visibleCertificates.length);
    }, 8000);

    return () => window.clearInterval(interval);
  }, [certificatePaused, visibleCertificates.length]);

  function openCertificateDomain(domain: CertificateDomain) {
    setCertificateFilter(domain);
    setCertificateIndex(0);
    window.setTimeout(() => {
      const target = certificateViewerRef.current;
      if (!target) {
        return;
      }

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 92,
        behavior: "smooth",
      });
    }, 120);
  }

  function showPreviousCertificate() {
    setCertificateIndex((current) => (current - 1 + visibleCertificates.length) % visibleCertificates.length);
  }

  function showNextCertificate() {
    setCertificateIndex((current) => (current + 1) % visibleCertificates.length);
  }

  function scrollToSection(id: string) {
    const target = document.getElementById(id);
    if (!target) {
      return;
    }

    const navHeight = document.querySelector("header nav")?.getBoundingClientRect().height ?? 64;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 28;
    setActiveSection(id);
    setMobileOpen(false);
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }

  const sectionClass = theme === "dark" ? "portfolio-dark bg-[#050816] text-white" : "portfolio-light bg-white text-slate-950";

  return (
    <main className={`${sectionClass} min-h-screen overflow-x-hidden selection:bg-cyan-300 selection:text-slate-950`}>
      <header className="fixed inset-x-0 top-0 z-40 px-3 pt-3 md:px-5 md:pt-4">
        <nav className={`mx-auto flex max-w-[1540px] items-center justify-between rounded-xl border px-4 py-3 backdrop-blur-2xl transition-colors duration-300 md:px-5 ${theme === "dark" ? "border-cyan-300/15 bg-[#07101f]/88 shadow-[0_18px_55px_rgba(0,0,0,.32),0_0_30px_rgba(34,211,238,.04)]" : "border-slate-200 bg-white/90 shadow-[0_16px_45px_rgba(15,23,42,.12)]"}`}>
          <a
            href="#home"
            onClick={(event) => {
              event.preventDefault();
              scrollToSection("home");
            }}
            className="group relative block h-11 w-[145px] shrink-0 overflow-hidden sm:w-[175px]"
            aria-label="Sakthi.dev home"
          >
            <Image
              src={
                theme === "dark"
                  ? encodeURI("/ChatGPT Image Jun 27, 2026, 08_53_18 PM.png")
                  : encodeURI("/ChatGPT Image Jun 27, 2026, 08_53_24 PM.png")
              }
              alt="Sakthi.dev"
              fill
              priority
              sizes="(max-width: 640px) 145px, 175px"
              className={`object-cover object-center transition duration-300 group-hover:scale-[1.03] ${theme === "dark" ? "mix-blend-lighten" : "mix-blend-multiply"}`}
            />
          </a>

          <div className="hidden items-center gap-4 xl:flex 2xl:gap-5">
            {navItems.map(([label, id]) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(id);
                  }}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative py-2 text-[13px] font-semibold transition ${isActive ? (theme === "dark" ? "text-cyan-200" : "text-blue-600") : theme === "dark" ? "text-slate-400 hover:text-slate-100" : "text-slate-600 hover:text-slate-950"}`}
                >
                  {label}
                  <span
                    className={`absolute inset-x-0 -bottom-1 mx-auto h-px bg-gradient-to-r from-cyan-300 to-purple-400 transition-all duration-300 ${isActive ? "w-full opacity-100" : "w-0 opacity-0"}`}
                  />
                </a>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={() => setRecruiterMode(true)}
              className={`group hidden h-10 items-center gap-2 rounded-lg border bg-gradient-to-r px-4 text-sm font-bold transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:shadow-[0_8px_25px_rgba(34,211,238,.12)] md:inline-flex ${theme === "dark" ? "border-purple-300/35 from-purple-400/[0.08] to-cyan-300/[0.08] text-slate-100" : "border-purple-300/55 from-cyan-50 to-purple-50 text-slate-800"}`}
            >
              Recruiter Summary
              <Sparkles size={15} className="text-cyan-300 transition group-hover:rotate-12" />
            </button>
            <button
              onClick={() => setMobileOpen((current) => !current)}
              className={`grid size-10 place-items-center rounded-lg border transition hover:border-cyan-300/40 hover:text-cyan-500 xl:hidden ${theme === "dark" ? "border-white/10 text-slate-300" : "border-slate-200 bg-white text-slate-700"}`}
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
        {mobileOpen && (
          <div className={`mx-auto mt-2 max-w-[1540px] rounded-xl border p-3 shadow-2xl backdrop-blur-2xl xl:hidden ${theme === "dark" ? "border-cyan-300/15 bg-[#07101f]/96" : "border-slate-200 bg-white/96"}`}>
            <div className="grid gap-1 sm:grid-cols-2">
              {navItems.map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(id);
                  }}
                  className={`rounded-lg px-3 py-2.5 text-sm font-semibold transition ${activeSection === id ? (theme === "dark" ? "bg-cyan-300/10 text-cyan-200" : "bg-cyan-50 text-blue-600") : theme === "dark" ? "text-slate-300 hover:bg-white/[0.05] hover:text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"}`}
                >
                  {label}
                </a>
              ))}
              <button
                onClick={() => {
                  setRecruiterMode(true);
                  setMobileOpen(false);
                }}
                className="rounded-lg bg-gradient-to-r from-cyan-300 to-cyan-400 px-3 py-2.5 text-left text-sm font-bold text-slate-950 md:hidden"
              >
                Recruiter Summary
              </button>
            </div>
          </div>
        )}
      </header>

      <section id="home" className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-7xl items-center gap-10 px-4 py-18 md:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-8 xl:gap-12">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xl font-medium text-cyan-100 md:text-2xl">My Name is</p>
            <h1 className="mt-4 max-w-5xl whitespace-nowrap text-[clamp(1.75rem,4.8vw,5rem)] font-black uppercase leading-[0.95] tracking-[-0.04em] text-white drop-shadow-[0_0_24px_rgba(34,211,238,0.16)]">
              Sakthi Sri <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-purple-200">Santh M</span>
            </h1>
            <div className="mt-5 h-1.5 w-36 rounded-full bg-gradient-to-r from-cyan-300 to-purple-400 shadow-[0_0_24px_rgba(34,211,238,0.5)]" />
            <p className="mt-8 min-h-10 text-2xl font-semibold text-slate-100 md:text-3xl">
              I am a{" "}
              <span className="text-cyan-300">
                {typedRole}
                <span className="ml-1 inline-block animate-pulse text-purple-300">|</span>
              </span>
            </p>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-400 md:text-lg">
              Building secure, intelligent, and scalable digital products across AI, full-stack engineering, and cyber security.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {[
                { label: "LinkedIn", image: linkedinAsset, href: "https://linkedin.com/in/sakthi-sri-santh-m-416540290" },
                { label: "GitHub", image: skillAsset("08_55_24"), href: "https://github.com/sakthisrisanth98" },
                { label: "Telegram", image: skillAsset("08_55_43"), href: "https://t.me/sakthisrisanth" },
                { label: "LeetCode", image: skillAsset("08_55_37"), href: "https://leetcode.com/u/sakthisrisanth98" },
                { label: "Email", image: skillAsset("08_55_59"), href: "https://mail.google.com/mail/?view=cm&fs=1&to=sakthisrisanth98%40gmail.com" },
              ].map(({ label, image, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  aria-label={label}
                  title={label}
                  className="group relative size-12 overflow-hidden rounded-lg border border-cyan-300/20 bg-white transition hover:-translate-y-1 hover:border-cyan-200/60 hover:shadow-[0_0_24px_rgba(34,211,238,0.22)]"
                >
                  <Image src={image} alt="" fill sizes="48px" className="object-cover transition group-hover:scale-105" />
                </a>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#resume" className="inline-flex items-center gap-2 rounded-md border border-cyan-300/22 bg-transparent px-5 py-3 font-bold text-cyan-100 transition hover:-translate-y-1 hover:border-cyan-200/75 hover:text-white hover:shadow-[0_0_26px_rgba(34,211,238,0.2)]">
                <Download size={18} />
                Download Resume
              </a>
              <a href="#projects" className="inline-flex items-center gap-2 rounded-md border border-purple-300/22 bg-transparent px-5 py-3 font-bold text-purple-100 transition hover:-translate-y-1 hover:border-purple-200/75 hover:text-white hover:shadow-[0_0_26px_rgba(168,85,247,0.2)]">
                <Rocket size={18} />
                View Projects
              </a>
            </div>
          </motion.div>
          <motion.div
            className="relative mx-auto aspect-square w-full max-w-[32rem] sm:max-w-[38rem] lg:max-w-[43rem] xl:max-w-[46rem]"
            initial={{ opacity: 0, x: 36, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.18, ease: "easeOut" }}
          >
            <motion.div
              className="absolute inset-4 rounded-full bg-gradient-to-br from-cyan-300/30 via-blue-500/16 to-purple-500/28 blur-2xl"
              animate={{ scale: [1, 1.025, 1], opacity: [0.18, 0.28, 0.18] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-5 rounded-full border border-cyan-300/20" />
            <div className="absolute inset-11 rounded-full border border-purple-300/22" />
            {[
              { name: "React", image: skillAsset("08_56_58") },
              { name: "Next.js", image: skillAsset("08_57_03") },
              { name: "FastAPI", image: skillAsset("08_57_52") },
              { name: "Cyber Security", image: skillAsset("09_00_10") },
            ].map((technology, index) => (
              <motion.span
                key={technology.name}
                aria-hidden="true"
                className={`hero-orbit-icon hero-orbit-icon-${index + 1}`}
                animate={{ y: [0, -7, 0], rotate: [0, index % 2 === 0 ? 3 : -3, 0] }}
                transition={{ duration: 5.5 + index * 0.45, repeat: Infinity, ease: "easeInOut", delay: index * 0.35 }}
              >
                <Image src={technology.image} alt="" fill sizes="56px" className="object-cover" />
              </motion.span>
            ))}
            <div className="relative grid size-full place-items-center rounded-full p-3 sm:p-5">
              <div className="grid size-[91%] place-items-center rounded-full bg-gradient-to-br from-cyan-200 via-blue-500 to-purple-400 p-[2px] shadow-[0_30px_90px_rgba(34,211,238,0.16),0_28px_80px_rgba(2,6,23,0.52)]">
                <div className="relative size-full overflow-hidden rounded-full bg-[#07192f] ring-1 ring-white/10">
                  <Image
                    src="/photo.jpeg"
                    alt="Sakthi Sri Santh M"
                    fill
                    priority
                    sizes="(min-width: 1280px) 620px, (min-width: 1024px) 560px, 86vw"
                    className="object-cover object-[center_30%]"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_18%,transparent_60%,rgba(2,6,23,0.18)_100%)]" />
                </div>
              </div>
            </div>
          </motion.div>
        </section>

      <div className="relative">
        <section id="summary" className="relative mx-auto max-w-7xl px-4 py-20 md:px-6">
          <div className="pointer-events-none absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-400/8 blur-3xl" />
          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.35 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="mx-auto mb-14 max-w-4xl text-center"
            >
              <p className="text-sm font-black uppercase tracking-[0.3em] text-cyan-300">Professional Overview</p>
              <h2 className="mt-4 bg-gradient-to-r from-cyan-100 via-white to-purple-300 bg-clip-text font-serif text-5xl font-black tracking-tight text-transparent md:text-7xl">
                Professional Summary
              </h2>
              <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500" />
            </motion.div>

            <div className="grid items-start gap-10 lg:grid-cols-[1.45fr_0.95fr] xl:gap-12">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.34 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
              >
                <h3 className="max-w-5xl bg-gradient-to-r from-white via-cyan-200 via-45% to-purple-400 bg-clip-text font-serif text-3xl font-black leading-tight tracking-tight text-transparent md:text-5xl">
                  Building Secure, Intelligent & Impactful Digital Products.
                </h3>

                <div className="mt-7 max-w-4xl space-y-5 text-lg leading-8 text-slate-300">
                  <p>
                    Computer Science and Engineering (Cyber Security) student focused on turning complex ideas into secure, useful software products.
                  </p>
                  <p>
                    I build AI platforms, security tools, commerce systems, browser extensions, and web applications with an emphasis on clean architecture, performance, and practical impact.
                  </p>
                </div>

                <div className="mt-9">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">Core Strengths</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {keyStrengths.map((strength, index) => {
                      const strengthIcons = [Cpu, ShieldCheck, Code2, Server, Sparkles];
                      const Icon = strengthIcons[index] ?? Sparkles;

                      return (
                      <motion.div
                        key={strength}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
                        whileHover={{ y: -3 }}
                        className="rounded-lg border border-cyan-300/12 bg-[#07192f]/24 p-4 text-center transition hover:border-purple-300/25"
                      >
                        <Icon className="mx-auto text-cyan-300" size={26} />
                        <p className="mt-3 text-sm font-bold leading-5 text-slate-200">{strength}</p>
                      </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">Products I Have Built</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {proofProjects.map((project, index) => (
                      <motion.span
                        key={project}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0.4 }}
                        transition={{ duration: 0.35, delay: index * 0.045, ease: "easeOut" }}
                        whileHover={{ y: -3 }}
                        className="rounded-md border border-purple-300/14 bg-[#07192f]/22 px-3 py-2 text-sm font-bold text-slate-300 transition hover:border-cyan-300/30 hover:text-white"
                      >
                        {project}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative lg:pt-1"
              >
                <div className="relative overflow-hidden rounded-lg border border-cyan-300/15 bg-[#07192f]/24 p-6 shadow-[0_0_55px_rgba(34,211,238,0.08)] backdrop-blur-sm md:p-7">
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-300 via-purple-400 to-cyan-300" />
                  <div className="pointer-events-none absolute -right-24 top-12 h-48 w-48 rounded-full bg-purple-500/12 blur-3xl" />
                  <div className="pointer-events-none absolute -left-24 bottom-6 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />

                  <div className="relative">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">My Journey</p>
                    <h3 className="mt-3 font-serif text-3xl font-black text-white md:text-4xl">Growth Path</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">
                      Academic growth shaped through projects, internships, and production-focused engineering.
                    </p>
                  </div>

                  <div className="relative mt-8 space-y-6">
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: false, amount: 0.35 }}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                      className="absolute bottom-4 left-5 top-4 w-px origin-top bg-gradient-to-b from-cyan-300 via-purple-400 to-blue-400 shadow-[0_0_22px_rgba(168,85,247,0.45)]"
                    />
                    {journey.map((item, index) => {
                      const Icon = item.icon;

                      return (
                        <motion.div
                          key={item.year}
                          initial={{ opacity: 0, y: 22 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: false, amount: 0.35 }}
                          transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                          className="relative flex gap-4"
                        >
                          <motion.span
                            whileHover={{ scale: 1.08 }}
                            className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border bg-[#07192f]"
                            style={{ borderColor: `${item.accent}70`, color: item.accent, boxShadow: `0 0 24px ${item.accent}24` }}
                          >
                            <Icon size={18} />
                          </motion.span>
                          <div className="min-w-0 flex-1 rounded-md border border-white/8 bg-black/10 px-4 py-3 transition hover:border-cyan-300/20 hover:bg-white/[0.035]">
                            <p className="font-mono text-sm font-black" style={{ color: item.accent }}>{item.year}</p>
                            <p className="mt-1 text-sm font-semibold leading-6 text-slate-300">{item.title}</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        <section id="about" className="relative mx-auto max-w-7xl px-4 py-24 md:px-6">
          <div className="mx-auto mb-14 max-w-4xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.3em] text-cyan-300">About Me</p>
            <h2 className="mt-4 bg-gradient-to-r from-cyan-100 via-white to-purple-400 bg-clip-text font-serif text-5xl font-black tracking-tight text-transparent md:text-7xl">
              About <span className="text-purple-300">Me</span>
            </h2>
            <div className="mx-auto mt-6 h-px w-40 bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500" />
          </div>

          <div className="grid items-center gap-14 lg:grid-cols-[1.55fr_0.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <p className="mt-7 max-w-3xl text-xl font-semibold leading-8 text-cyan-100">
                Cyber Security Engineer • Software Engineer • AI Systems Builder
              </p>
              <div className="mt-7 max-w-4xl space-y-5 text-base leading-8 text-slate-300 md:text-lg">
                <p>
                  I am Sakthi Sri Santh M, a fourth-year Computer Science and Engineering (Cyber Security) student at Sri Krishna College of Engineering and Technology.
                </p>
                <p>
                  I combine cyber security, AI, cloud technologies, and modern web engineering to build practical products that are secure, scalable, and user-focused.
                </p>
              </div>
              <div className="mt-8">
                <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">Primary Focus</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {["AI Systems", "Cyber Security", "Full Stack Engineering", "Cloud Infrastructure", "Product Development"].map((item) => (
                    <span key={item} className="rounded-md border border-cyan-300/18 px-3 py-2 text-xs font-bold text-slate-200">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {[
                  ["Degree", "B.E. CSE (Cyber Security)", GraduationCap, "purple"],
                  ["Specialization", "Cyber Security", ShieldCheck, "cyan"],
                  ["Projects", "10+ Projects Built", Code2, "cyan"],
                  ["Certifications", "72+ Certifications", Award, "purple"],
                ].map(([label, value, Icon, tone]) => (
                  <motion.div
                    key={label as string}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className={`group flex items-start gap-3 rounded-md border px-4 py-4 ${
                      tone === "purple"
                        ? "border-purple-400/35 bg-purple-400/7 text-purple-100 hover:border-purple-300/70"
                        : tone === "blue"
                          ? "border-blue-400/35 bg-blue-400/7 text-blue-100 hover:border-blue-300/70"
                          : "border-cyan-300/35 bg-cyan-300/7 text-cyan-100 hover:border-cyan-200/70"
                    } transition`}
                  >
                    <Icon size={20} className={`mt-0.5 shrink-0 ${tone === "purple" ? "text-purple-300" : tone === "blue" ? "text-blue-300" : "text-cyan-300"}`} />
                    <span>
                      <span className="block text-[0.65rem] font-black uppercase tracking-[0.22em] text-slate-400">{label as string}</span>
                      <span className="mt-1 block text-sm font-black leading-5 text-slate-100">{value as string}</span>
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 28 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-full max-w-sm"
            >
              <motion.div
                className="absolute inset-4 rounded-full bg-cyan-300/10 blur-3xl"
                animate={{ opacity: [0.18, 0.34, 0.18], scale: [0.98, 1.04, 0.98] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="relative aspect-square overflow-hidden rounded-full border border-cyan-300/15 bg-[#020617]/25 p-1.5 shadow-[0_0_42px_rgba(34,211,238,0.1)]"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/ChatGPT%20Image%20Jun%2022%2C%202026%2C%2010_26_04%20PM.png"
                  alt="Futuristic S monogram representing AI, cyber security, cloud, development, and data engineering"
                  width={1254}
                  height={1254}
                  className="size-full rounded-full object-cover"
                  priority={false}
                />
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,transparent_56%,rgba(2,6,23,0.35)_100%)]" />
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="education" className="relative mx-auto max-w-7xl px-4 py-24 md:px-6">
            <div className="mx-auto mb-14 max-w-4xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Education</p>
              <h2 className="mt-3 bg-gradient-to-r from-white via-cyan-100 to-purple-200 bg-clip-text font-serif text-4xl font-black tracking-tight text-transparent md:text-7xl">
                Academic Journey
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                A focused academic path shaped by strong foundations, science-driven discipline, and a growing specialization in secure software engineering.
              </p>
            </div>

            <div className="relative mx-auto max-w-6xl">
              <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-cyan-300 via-purple-400 to-blue-500 shadow-[0_0_24px_rgba(168,85,247,0.65)] md:left-1/2" />
              <div className="space-y-10">
                {education.map((item, index) => (
                  <motion.article
                    key={item.institution}
                    initial={{ opacity: 0, y: index % 2 === 0 ? 42 : -42 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.32 }}
                    transition={{ duration: 0.62, delay: index * 0.1, ease: "easeOut" }}
                    className={`relative grid gap-5 pl-12 md:grid-cols-[1fr_5rem_1fr] md:pl-0 ${index % 2 ? "md:[&_.timeline-card]:col-start-3" : "md:[&_.timeline-card]:col-start-1"}`}
                  >
                    <div className="absolute left-0 top-7 grid size-10 place-items-center rounded-full border border-white/15 bg-[#07192f] shadow-[0_0_26px_rgba(34,211,238,0.45)] md:left-1/2 md:-translate-x-1/2">
                      <div
                        className={`grid size-7 place-items-center bg-gradient-to-br ${item.accent} ${
                          item.marker === "diamond" ? "rotate-45 rounded-md" : item.marker === "hexagon" ? "rounded-xl" : "rounded-full"
                        }`}
                      >
                        <GraduationCap className={`${item.marker === "diamond" ? "-rotate-45" : ""} text-white`} size={15} />
                      </div>
                    </div>

                    <div className={`hidden items-start pt-7 md:flex ${index % 2 ? "md:col-start-1 md:justify-end" : "md:col-start-3 md:justify-start"}`}>
                      <span className="rounded-md border border-white/10 bg-white/10 px-4 py-2 font-mono text-sm font-bold text-cyan-100 backdrop-blur">
                        {item.duration}
                      </span>
                    </div>

                    <motion.div
                      whileHover={{ y: -8, scale: 1.015 }}
                      className={`timeline-card group flex min-h-[25rem] flex-col justify-between overflow-hidden rounded-lg border border-white/10 bg-white/[0.07] p-6 shadow-2xl ${item.glow} backdrop-blur-xl transition hover:border-purple-300/60 md:max-w-xl`}
                    >
                      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition duration-700 group-hover:translate-x-full" />
                      <div>
                        <div className="mb-5 flex flex-wrap items-center gap-3">
                          <span className={`rounded-md bg-gradient-to-r ${item.accent} px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white`}>
                            {item.phase}
                          </span>
                          <span className="inline-flex items-center gap-2 rounded-md border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-sm font-semibold text-cyan-100 md:hidden">
                            <CalendarDays size={15} />
                            {item.duration}
                          </span>
                        </div>

                        <h3 className="font-serif text-2xl font-black text-white">{item.title}</h3>
                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">{item.headline}</p>
                        <p className="mt-4 text-lg font-bold text-white">{item.institution}</p>
                        <p className="mt-2 font-semibold text-purple-100">{item.study}</p>
                        <p className="mt-3 text-sm leading-7 text-slate-300">{item.specialization}</p>
                      </div>

                      <div>
                        <div className="mt-5 grid gap-3 sm:grid-cols-2">
                          <div className="rounded-md border border-white/10 bg-black/20 p-4">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
                              <MapPin size={15} />
                              Location
                            </div>
                            <p className="mt-3 font-semibold text-white">{item.location}</p>
                          </div>
                          <div className="rounded-md border border-yellow-300/20 bg-yellow-300/10 p-4">
                            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-yellow-200">
                              <Award size={15} />
                              Achievement
                            </div>
                            <p className="mt-3 font-semibold text-white">
                              {item.scoreLabel}: {item.score}
                              {item.percentage ? <span className="text-cyan-200"> | {item.percentage}</span> : null}
                            </p>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-wrap gap-3">
                          {item.mapLink ? (
                            <a
                              href={item.mapLink}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2 rounded-md border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 transition hover:-translate-y-1 hover:border-cyan-200 hover:bg-cyan-300/20"
                            >
                              <ExternalLink size={16} />
                              Open Map
                            </a>
                          ) : null}
                          <span className="inline-flex items-center gap-2 rounded-md border border-purple-300/25 bg-purple-300/10 px-4 py-2 text-sm font-bold text-purple-100">
                            <GraduationCap size={16} />
                            {item.duration}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.article>
                ))}
              </div>
            </div>

            <div id="coursework" className="mt-20">
              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[linear-gradient(135deg,#020617,#07192f_48%,#111827)] p-6 shadow-2xl shadow-purple-950/30 md:p-10">
                <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
                <div className="pointer-events-none absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-purple-500/15 blur-3xl" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[length:48px_48px]" />

                <div className="relative">
                  <div className="mx-auto max-w-5xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">Academic capability matrix</p>
                    <h3 className="mt-4 bg-gradient-to-r from-cyan-200 via-white to-purple-200 bg-clip-text font-serif text-4xl font-black tracking-tight text-transparent md:text-6xl">
                      Engineering Knowledge Matrix
                    </h3>
                    <p className="mx-auto mt-5 max-w-4xl text-base leading-8 text-slate-300">
                      A refined map of the academic and practical knowledge that shaped my foundation in secure software development, cloud infrastructure, data intelligence, networking, and computational problem solving.
                    </p>
                  </div>

                  <div className="mt-10 grid gap-4 md:grid-cols-3">
                    {[
                      ["Core Degree", "Computer Science and Engineering (Cyber Security)", Code2],
                      ["Technical Focus", "Secure software, cloud systems, analytics, and engineering logic", Sparkles],
                      ["Professional Outcome", "Stronger judgment for building reliable real-world systems", ShieldCheck],
                    ].map(([label, value, Icon]) => (
                      <div key={label as string} className="rounded-lg border border-cyan-300/15 bg-black/25 p-5 backdrop-blur">
                        <Icon className="text-cyan-200" size={26} />
                        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">{label as string}</p>
                        <p className="mt-2 font-serif text-lg font-bold leading-7 text-white">{value as string}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 grid gap-5 xl:grid-cols-2">
                    {courseworkCategories.map((category, index) => {
                      const Icon = category.icon;
                      return (
                        <motion.article
                          key={category.title}
                          initial={{ opacity: 0, y: 26 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          whileHover={{ y: -6, scale: 1.01 }}
                          viewport={{ once: true, amount: 0.2 }}
                          transition={{ duration: 0.48, delay: index * 0.06 }}
                          className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.065] p-6 shadow-2xl shadow-black/25 backdrop-blur-xl"
                          style={{ borderColor: `${category.color}44` }}
                        >
                          <div className="pointer-events-none absolute inset-y-0 left-0 w-1" style={{ backgroundColor: category.color }} />
                          <div className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100" style={{ background: `radial-gradient(circle at top left, ${category.color}24, transparent 55%)` }} />
                          <div className="relative">
                            <div className="flex items-start gap-4">
                              <div className="grid size-14 shrink-0 place-items-center rounded-lg" style={{ backgroundColor: `${category.color}22`, color: category.color }}>
                                <Icon size={27} />
                              </div>
                              <div>
                              <h4 className="font-serif text-2xl font-black text-white">{category.title}</h4>
                                <p className="mt-1 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: category.color }}>
                                  {category.subjects.length} knowledge areas
                                </p>
                              </div>
                            </div>

                            <p className="mt-5 text-sm leading-7 text-slate-300">{category.description}</p>
                            <div className="mt-5 grid gap-2 sm:grid-cols-2">
                              {category.subjects.map((subject) => (
                                <Dialog.Root key={subject.name}>
                                  <Dialog.Trigger asChild>
                                    <button
                                      className="group/subject flex min-h-12 items-center justify-between gap-3 rounded-md border px-3 py-2.5 text-left text-xs font-semibold text-slate-100 transition duration-300 hover:-translate-y-0.5"
                                      style={{
                                        backgroundColor: `${category.color}10`,
                                        borderColor: `${category.color}3d`,
                                      }}
                                      onMouseEnter={(event) => {
                                        event.currentTarget.style.backgroundColor = `${category.color}24`;
                                        event.currentTarget.style.borderColor = `${category.color}99`;
                                        event.currentTarget.style.boxShadow = `0 0 22px ${category.color}22`;
                                      }}
                                      onMouseLeave={(event) => {
                                        event.currentTarget.style.backgroundColor = `${category.color}10`;
                                        event.currentTarget.style.borderColor = `${category.color}3d`;
                                        event.currentTarget.style.boxShadow = "none";
                                      }}
                                    >
                                      <span>{subject.name}</span>
                                      <span
                                        className="shrink-0 translate-x-0 text-base font-black transition group-hover/subject:translate-x-1"
                                        style={{ color: category.color }}
                                      >
                                        →
                                      </span>
                                    </button>
                                  </Dialog.Trigger>
                                  <Dialog.Portal>
                                    <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
                                    <Dialog.Content
                                      className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg border bg-[#081327]/95 p-6 text-white shadow-2xl backdrop-blur-xl"
                                      style={{ borderColor: `${category.color}66`, boxShadow: `0 24px 80px ${category.color}22` }}
                                    >
                                      <div className="pointer-events-none absolute inset-x-0 top-0 h-1" style={{ backgroundColor: category.color }} />
                                      <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl" style={{ backgroundColor: `${category.color}24` }} />
                                      <div className="flex items-start justify-between gap-4">
                                        <div>
                                          <Dialog.Title className="font-serif text-3xl font-black">{subject.name}</Dialog.Title>
                                          <Dialog.Description className="mt-2 font-semibold" style={{ color: category.color }}>
                                            My Learning Experience
                                          </Dialog.Description>
                                        </div>
                                        <Dialog.Close className="rounded-md p-2 text-slate-300 hover:bg-white/10 hover:text-white" aria-label="Close learning experience">
                                          <X size={20} />
                                        </Dialog.Close>
                                      </div>
                                      <p className="relative mt-6 text-base leading-8 text-slate-300">{subject.learning}</p>
                                    </Dialog.Content>
                                  </Dialog.Portal>
                                </Dialog.Root>
                              ))}
                            </div>
                          </div>
                        </motion.article>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

      <section
        id="skills"
          className={`tech-stack-section relative isolate overflow-hidden border-y py-24 lg:py-28 ${theme === "light" ? "tech-stack-light border-slate-200 bg-[#f7f9fd]" : "border-white/[0.06] bg-[#050a16]"}`}
        >
          <div className="tech-grid-background pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl px-4 text-center md:px-6"
          >
            <p className="tech-stack-eyebrow">Tech Stack</p>
            <h2 className="tech-stack-title">Technologies <span>I Work With</span></h2>
            <p className="tech-stack-subtitle">A focused toolkit that powers my software engineering and product development journey.</p>
          </motion.div>

          <div className="mx-auto mt-14 grid max-w-7xl grid-cols-1 gap-3 px-4 md:px-6 lg:grid-cols-12">
            {skillCategories.map((category, index) => (
              <SkillPanel key={category.title} category={category} index={index} />
            ))}
            <div className="lg:col-span-12">
              <TechnologyMarquee />
            </div>
          </div>
        </section>

      <div className="content-sections-shell bg-[linear-gradient(135deg,#020617,#0f172a,#111827)]">
        <section id="experience" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <div
            className="relative overflow-hidden rounded-lg border p-5 shadow-2xl md:p-8"
            style={{
              borderColor: internshipTheme.border,
              background: internshipTheme.background,
              boxShadow: `0 24px 90px ${internshipTheme.primary}10`,
            }}
          >
            <motion.div
              aria-hidden="true"
              animate={{ backgroundPosition: ["0px 0px", "54px 54px"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.045)_1px,transparent_1px)] bg-[size:54px_54px] opacity-60"
            />
            <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full blur-3xl" style={{ background: `${internshipTheme.primary}14` }} />
            <div className="pointer-events-none absolute -right-24 bottom-12 size-72 rounded-full blur-3xl" style={{ background: `${internshipTheme.secondary}14` }} />
            <div className="relative mx-auto mb-7 max-w-4xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.38em] text-cyan-200">Industry Experience</p>
              <h2 className="mt-4 bg-gradient-to-r from-cyan-200 via-white to-sky-200 bg-clip-text font-serif text-5xl font-black leading-none text-transparent md:text-6xl">
                Internship Journey
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300">
                Hands-on industry exposure where academic knowledge evolved into practical software engineering, security awareness, and deployment-ready thinking.
              </p>
            </div>

            <div className="relative grid gap-4 md:grid-cols-3">
              {internships.map((item, index) => {
                const active = activeInternshipIndex === index;

                return (
                  <motion.button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveInternshipIndex(index)}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    viewport={{ once: false, amount: 0.35 }}
                    transition={{ duration: 0.28, delay: index * 0.06 }}
                    className="group relative overflow-hidden rounded-lg border p-4 text-left backdrop-blur-xl"
                    style={{
                      borderColor: active ? `${item.accent}8c` : `${item.accent}33`,
                      background: active ? `linear-gradient(135deg, ${item.accent}1f, rgba(2,6,23,0.88))` : "rgba(2,6,23,0.62)",
                      boxShadow: active ? `0 18px 58px ${item.accent}18` : "none",
                    }}
                  >
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition duration-700 group-hover:translate-x-full" />
                    <div className="relative flex items-start gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-md border" style={{ borderColor: `${item.accent}66`, background: `${item.accent}18`, color: item.accent }}>
                        {active ? <Rocket size={20} /> : <BriefcaseBusiness size={20} />}
                      </span>
                      <span className="min-w-0">
                        <span className="text-xs font-black uppercase tracking-[0.24em]" style={{ color: item.accent }}>{item.year} / {item.category}</span>
                        <span className="mt-2 block font-serif text-2xl font-black leading-tight text-white">{item.title}</span>
                        <span className="mt-2 block text-sm font-semibold text-slate-400">{item.organization}</span>
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              key={activeInternship.title}
              initial={{ opacity: 0, y: 18, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.3 }}
              className="relative mt-6 overflow-hidden rounded-lg border p-5 shadow-2xl backdrop-blur-xl md:p-6"
              style={{
                borderColor: internshipTheme.border,
                background: internshipTheme.card,
                boxShadow: `0 24px 80px ${internshipTheme.primary}12`,
              }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1" style={{ background: internshipTheme.primary }} />
              <div className="grid gap-7 xl:grid-cols-[1fr_0.48fr]">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: internshipTheme.primary }}>{activeInternship.category}</p>
                    <h3
                      className="mt-3 bg-clip-text font-serif text-3xl font-black leading-tight text-transparent md:text-4xl"
                      style={{ backgroundImage: `linear-gradient(90deg, ${internshipTheme.text}, ${internshipTheme.accent})` }}
                    >
                      {activeInternship.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
                      {[activeInternship.organization, activeInternship.period, `Issued ${activeInternship.issueDate}`].map((meta) => (
                        <span
                          key={meta}
                          className="rounded-md border px-3 py-1.5"
                          style={{
                            borderColor: `${internshipTheme.primary}33`,
                            background: `${internshipTheme.primary}14`,
                            color: internshipTheme.text,
                          }}
                        >
                          {meta}
                        </span>
                      ))}
                    </div>
                    <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">{activeInternship.description}</p>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                      <div className="rounded-lg p-4 backdrop-blur" style={{ background: "rgba(255,255,255,.02)" }}>
                        <h4 className="font-serif text-xl font-black text-slate-100">{internshipTheme.contributionTitle}</h4>
                        <ul className="mt-4 space-y-2.5 text-sm leading-7 text-slate-300">
                          {(activeInternship.work ?? []).slice(0, 3).map((point, pointIndex) => (
                            <motion.li
                              key={point}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.25, delay: pointIndex * 0.05 }}
                              className="flex gap-3"
                            >
                              <span className="mt-2.5 size-2 shrink-0 rounded-full" style={{ background: internshipTheme.primary }} />
                              <span>{point}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-lg p-4 backdrop-blur" style={{ background: "rgba(255,255,255,.02)" }}>
                        <h4 className="font-serif text-xl font-black text-slate-100">{internshipTheme.growthTitle}</h4>
                        <ul className="mt-4 space-y-2.5 text-sm leading-7 text-slate-300">
                          {activeInternship.learning.slice(0, 3).map((point, pointIndex) => (
                            <motion.li
                              key={point}
                              initial={{ opacity: 0, x: 8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.25, delay: pointIndex * 0.05 }}
                              className="flex gap-3"
                            >
                              <span className="mt-2.5 size-2 shrink-0 rounded-full" style={{ background: internshipTheme.primary }} />
                              <span>{point}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Key Skills Developed</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {[
                          ...(activeInternship.stack ?? []),
                          ...(activeInternship.category.includes("Cyber")
                            ? ["Risk Review", "Defensive Analysis"]
                            : ["Application Flow", "API Concepts"]),
                        ].map((skill, skillIndex) => (
                          <motion.span
                            key={skill}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.22, delay: skillIndex * 0.025 }}
                            className="rounded-md border px-3 py-1.5 text-xs font-bold transition hover:-translate-y-0.5"
                            style={{
                              borderColor: `${internshipTheme.primary}40`,
                              background: `${internshipTheme.primary}14`,
                              color: internshipTheme.text,
                              boxShadow: `0 0 0 ${internshipTheme.primary}00`,
                            }}
                            whileHover={{ boxShadow: `0 0 20px ${internshipTheme.primary}33` }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="self-start xl:sticky xl:top-24">
                    <div>
                      <p className="mb-3 text-xs font-black uppercase tracking-[0.24em]" style={{ color: internshipTheme.primary }}>{internshipTheme.label}</p>
                      <motion.a
                        href={activeInternship.proofUrl}
                        target="_blank"
                        rel="noreferrer"
                        animate={{ y: [0, -5, 0] }}
                        whileHover={{ y: -8, scale: 1.04, rotateX: 3, rotateY: -3 }}
                        transition={{
                          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                          scale: { duration: 0.22 },
                          rotateX: { duration: 0.22 },
                          rotateY: { duration: 0.22 },
                        }}
                        className="group relative block w-full max-w-full overflow-hidden rounded-lg border bg-white shadow-2xl"
                        style={{
                          borderColor: `${internshipTheme.primary}4d`,
                          boxShadow: `0 0 40px ${internshipTheme.primary}1f`,
                          background: `linear-gradient(180deg, ${internshipTheme.primary}0d, ${internshipTheme.primary}03)`,
                        }}
                      >
                        <div className="pointer-events-none absolute inset-0 z-10 rounded-lg ring-1 transition" style={{ boxShadow: `inset 0 0 0 1px ${internshipTheme.primary}33` }} />
                        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/0 to-white/25 opacity-0 transition duration-300 group-hover:opacity-100" />
                        {activeInternshipIsCyber ? (
                          <motion.div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-x-0 z-20 h-16 bg-gradient-to-b from-transparent via-emerald-300/15 to-transparent"
                            animate={{ top: ["-20%", "105%"] }}
                            transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
                          />
                        ) : null}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={activeInternship.previewUrl}
                          alt={`${activeInternship.title} certificate preview`}
                          className="max-h-[32rem] w-full max-w-full object-contain transition duration-300 group-hover:brightness-105"
                        />
                      </motion.a>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <ProofModal item={activeInternship} label={internshipTheme.viewLabel} compact />
                      <a
                        href={activeInternship.proofUrl}
                        download
                        className="group inline-flex h-12 w-full min-w-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-md border px-4 text-sm font-black transition hover:-translate-y-0.5"
                        style={{
                          borderColor: `${internshipTheme.primary}59`,
                          background: "transparent",
                          color: internshipTheme.text,
                        }}
                      >
                        <Download size={17} className="shrink-0 transition group-hover:translate-y-0.5" />
                        {internshipTheme.downloadLabel}
                      </a>
                    </div>
                  </div>
                </div>
            </motion.div>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
          <div className="relative overflow-hidden rounded-lg border border-slate-400/15 bg-[linear-gradient(180deg,#020617,#07192f,#0b1220)] p-5 shadow-2xl shadow-cyan-950/20 md:p-8">
            <motion.div
              aria-hidden="true"
              animate={{ backgroundPosition: ["0px 0px", "64px 64px"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:64px_64px] opacity-50"
            />
            <div className="pointer-events-none absolute -left-28 top-12 size-80 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-28 bottom-16 size-80 rounded-full bg-purple-400/10 blur-3xl" />

            <div className="relative mx-auto max-w-3xl text-center">
              <h2 className="bg-gradient-to-r from-white via-cyan-100 to-slate-300 bg-clip-text font-serif text-5xl font-black leading-none text-transparent md:text-6xl">
                Projects
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                A collection of real web, AI, security, commerce, game, and tool-based projects.
              </p>
            </div>

            <div className="relative mt-8 overflow-x-auto pb-2 no-scrollbar">
              <div className="mx-auto flex w-max min-w-full justify-start gap-2 rounded-lg border border-white/10 bg-black/20 p-2 backdrop-blur-xl lg:justify-center">
                {projectFilters.map((filter) => {
                  const active = projectFilter === filter;
                  const accent = projectFilterAccent[filter];
                  return (
                    <motion.button
                      key={filter}
                      type="button"
                      onClick={() => setProjectFilter(filter)}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative h-10 whitespace-nowrap rounded-md px-4 text-xs font-black uppercase tracking-[0.12em] transition"
                      style={{
                        color: active ? "#020617" : "#cbd5e1",
                        background: active ? accent : "transparent",
                        boxShadow: active ? `0 14px 34px ${accent}24` : "none",
                      }}
                    >
                      {filter}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="relative mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {visibleProjects.map((project, index) => (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.18 }}
                  transition={{ duration: 0.32, delay: index * 0.035 }}
                  whileHover={{ y: -8 }}
                  className={`group flex min-w-0 h-full flex-col overflow-hidden rounded-[22px] border bg-[rgba(15,23,42,0.85)] shadow-xl backdrop-blur-xl transition ${index === 0 ? "project-card-featured" : ""}`}
                  style={{ borderColor: "rgba(148,163,184,0.18)" }}
                >
                  <ProjectModal project={project}>
                    <div className="relative h-[240px] w-full max-w-full overflow-hidden bg-[#020617]">
                      <ProjectVisual project={project} />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020617]/70 via-transparent to-transparent" />
                      <span className="absolute left-4 top-4 rounded-md bg-black/60 px-3 py-1 text-xs font-black text-white backdrop-blur">
                        {project.status}
                      </span>
                    </div>
                  </ProjectModal>

                  <div className="flex min-h-[260px] flex-1 flex-col p-5">
                    <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: project.accent }}>{project.category}</p>
                    <h3 className="mt-2 font-serif text-2xl font-black text-white">{project.title}</h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300">{project.description}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.slice(0, 4).map((item) => (
                        <span key={item} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.7rem] font-bold text-slate-300">
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-10 items-center gap-2 rounded-md px-3 text-xs font-black text-slate-950 transition hover:-translate-y-0.5"
                          style={{ background: project.accent, boxShadow: `0 12px 26px ${project.accent}22` }}
                        >
                          <ExternalLink size={14} />
                          Live Demo
                        </a>
                      ) : null}
                      <a href={project.githubUrl ?? "#"} className="inline-flex h-10 items-center gap-2 rounded-md border border-white/15 px-3 text-xs font-black text-white transition hover:-translate-y-0.5 hover:bg-white/10">
                        <GitBranch size={14} />
                        GitHub
                      </a>
                      <ProjectModal project={project} />
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      </div>

      <div className="content-sections-shell bg-[linear-gradient(135deg,#020617,#050816,#111827)]">
        <section id="certificates" className="mx-auto max-w-7xl px-4 py-20 md:px-6">
          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_18%_8%,rgba(168,85,247,0.18),transparent_30%),radial-gradient(circle_at_88%_10%,rgba(6,182,212,0.13),transparent_26%),linear-gradient(135deg,#050816,#0f172a_52%,#1e1b4b)] p-5 shadow-2xl shadow-purple-950/25 md:p-7">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:56px_56px] opacity-60" />

            <div className="relative mx-auto max-w-5xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.42em] text-cyan-200">Learning Intelligence</p>
              <h2 className="mt-4 bg-gradient-to-r from-cyan-200 via-white to-purple-200 bg-clip-text font-serif text-5xl font-black leading-none tracking-tight text-transparent md:text-6xl">
                Certification Studio
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
                A curated portfolio of verified learning records, organized by technical domain and presented with clear outcomes.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  ["Verified Credentials", `${certificates.length}+`],
                  ["Knowledge Domains", Object.keys(certificateAccent).length],
                  ["Documented Growth", "100%"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-white/10 bg-black/25 p-3 backdrop-blur">
                    <p className="font-serif text-3xl font-black text-white">{value}</p>
                    <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-slate-400">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-7">
              {certificateFilters.filter((filter) => filter !== "All").map((filter, index) => {
                const domain = filter as CertificateDomain;
                const accent = certificateAccent[domain];
                const count = certificates.filter((certificate) => certificate.domain === domain).length;
                const isActive = certificateFilter === filter;

                return (
                  <motion.button
                    key={filter}
                    type="button"
                    onClick={() => openCertificateDomain(domain)}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    whileHover={{ y: -5, scale: 1.018 }}
                    viewport={{ once: false, amount: 0.25 }}
                    transition={{ duration: 0.32, delay: index * 0.025 }}
                    className="group relative min-h-44 overflow-hidden rounded-lg border p-4 text-left shadow-xl backdrop-blur-xl"
                    style={{
                      borderColor: isActive ? accent : `${accent}4d`,
                      background: `linear-gradient(150deg, rgba(2,6,23,0.88), ${accent}1f)`,
                      boxShadow: isActive ? `0 0 34px ${accent}2e` : `0 14px 36px ${accent}10`,
                    }}
                  >
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/14 to-transparent transition duration-700 group-hover:translate-x-full" />
                    <div className="pointer-events-none absolute -right-12 -top-10 size-32 rounded-full blur-2xl" style={{ background: `${accent}42` }} />
                    <div className="relative flex h-full flex-col justify-between">
                      <div>
                        <div className="grid size-10 place-items-center rounded-lg" style={{ background: `${accent}24`, color: accent }}>
                          <BadgeCheck size={21} />
                        </div>
                        <h3 className="mt-4 font-serif text-lg font-black leading-tight text-white">{filter}</h3>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-[0.22em]" style={{ color: accent }}>
                          {count} records
                        </p>
                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">{certificates.find((certificate) => certificate.domain === domain)?.skills}</p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              ref={certificateViewerRef}
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setCertificatePaused(true)}
              onMouseLeave={() => setCertificatePaused(false)}
              className="relative mt-10 overflow-hidden rounded-lg border bg-[#070b18]/90 p-4 backdrop-blur-xl md:p-5"
              style={{ borderColor: `${activeCertificate.accent}66`, boxShadow: `0 0 42px ${activeCertificate.accent}1f` }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1" style={{ background: activeCertificate.accent }} />
              <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: activeCertificate.accent }}>
                    Certification Explorer
                  </p>
                  <h3 className="mt-2 font-serif text-3xl font-black text-white md:text-4xl">{certificateFilter}</h3>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 p-1.5">
                  <motion.button
                    type="button"
                    onClick={showPreviousCertificate}
                    whileTap={{ scale: 0.94 }}
                    className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-black transition hover:-translate-x-0.5"
                    style={{
                      borderColor: "rgba(56,189,248,0.55)",
                      background: "linear-gradient(135deg, rgba(14,165,233,0.18), rgba(2,6,23,0.18))",
                      color: "#7dd3fc",
                    }}
                    aria-label="Previous certificate"
                  >
                    <ChevronLeft size={17} />
                    Previous
                  </motion.button>
                  <span
                    className="rounded-md px-4 py-2 text-sm font-black text-slate-950"
                    style={{
                      background: activeCertificate.accent,
                      color: "#020617",
                    }}
                  >
                    {certificateIndex + 1} / {visibleCertificates.length}
                  </span>
                  <motion.button
                    type="button"
                    onClick={showNextCertificate}
                    whileTap={{ scale: 0.94 }}
                    className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-black transition hover:translate-x-0.5"
                    style={{
                      borderColor: "rgba(251,146,60,0.58)",
                      background: "linear-gradient(135deg, rgba(251,146,60,0.18), rgba(2,6,23,0.18))",
                      color: "#fdba74",
                    }}
                    aria-label="Next certificate"
                  >
                    Next
                    <ChevronRight size={17} />
                  </motion.button>
                </div>
              </div>

              <div className="grid items-stretch gap-5 lg:grid-cols-[1.04fr_0.96fr]">
                <motion.div
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.18 }}
                  className="relative flex min-h-full items-center justify-center overflow-visible"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    key={activeCertificate.file}
                    src={activeCertificate.previewUrl}
                    alt={`${activeCertificate.name} certificate preview`}
                    className="block max-h-[34rem] max-w-full rounded-sm bg-white object-contain shadow-2xl"
                    style={{ boxShadow: `0 18px 52px ${activeCertificate.accent}18` }}
                  />
                </motion.div>

                <motion.div
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.18 }}
                  className="flex min-h-full flex-col justify-center rounded-lg border bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.035))] p-6 shadow-xl"
                  style={{ borderColor: `${activeCertificate.accent}44` }}
                >
                  <h4 className="font-serif text-3xl font-black leading-tight text-white md:text-4xl">{activeCertificate.name}</h4>
                  <p className="mt-4 text-xs font-black uppercase tracking-[0.24em]" style={{ color: activeCertificate.accent }}>
                    {activeCertificate.date}
                  </p>

                  <div className="mt-6">
                    <h5 className="font-serif text-2xl font-black text-white">What I Learned</h5>
                    <ul className="mt-4 space-y-2.5 text-[0.96rem] leading-7 text-slate-300">
                      {activeCertificate.learningPoints.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span className="mt-2.5 size-2 shrink-0 rounded-full" style={{ background: activeCertificate.accent }} />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <motion.a
                      href={activeCertificate.url}
                      target="_blank"
                      rel="noreferrer"
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-110"
                      style={{
                        background: "linear-gradient(135deg, #10b981, #06b6d4)",
                        color: "#02111d",
                        boxShadow: "0 14px 30px rgba(16,185,129,0.24)",
                      }}
                    >
                      <ExternalLink size={17} />
                      View Certificate
                    </motion.a>
                    <motion.a
                      href={activeCertificate.url}
                      download
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex items-center gap-2 rounded-md border px-5 py-3 text-sm font-black transition hover:-translate-y-0.5"
                      style={{
                        borderColor: "rgba(250,204,21,0.62)",
                        background: "rgba(250,204,21,0.12)",
                        color: "#fde68a",
                      }}
                    >
                      <Download size={17} />
                      Download PDF
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="achievements" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
          <div className="relative overflow-hidden rounded-lg border border-amber-300/30 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,.12),transparent_35%),linear-gradient(135deg,#020617,#1c1305,#111827)] p-5 shadow-2xl shadow-amber-950/20 md:p-8">
            <motion.div
              aria-hidden="true"
              animate={{ backgroundPosition: ["0px 0px", "54px 54px"] }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(251,191,36,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.045)_1px,transparent_1px)] bg-[size:54px_54px] opacity-55"
            />
            <Trophy className="pointer-events-none absolute -right-6 top-2 text-amber-200/5" size={250} />
            <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-amber-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 bottom-12 size-72 rounded-full bg-yellow-300/10 blur-3xl" />

            <div className="relative mx-auto mb-7 max-w-4xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.38em] text-amber-200">Recognition Showcase</p>
              <h2 className="mt-4 bg-gradient-to-r from-white via-amber-100 to-yellow-300 bg-clip-text font-serif text-5xl font-black leading-none text-transparent md:text-6xl">
                Achievement Portfolio
              </h2>
              <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-300">
                A proof-backed record of challenge participation, innovation practice, execution quality, and presentation confidence.
              </p>
            </div>

            <div className="relative grid gap-4 md:grid-cols-3">
              {achievements.map((item, index) => {
                const active = activeAchievementIndex === index;

                return (
                  <motion.button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveAchievementIndex(index)}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    viewport={{ once: false, amount: 0.35 }}
                    transition={{ duration: 0.28, delay: index * 0.06 }}
                    className="group relative overflow-hidden rounded-lg border p-4 text-left backdrop-blur-xl"
                    style={{
                      borderColor: active ? `${item.accent}a3` : `${item.accent}3d`,
                      background: active ? `linear-gradient(135deg, ${item.accent}24, rgba(2,6,23,0.88))` : "rgba(2,6,23,0.62)",
                      boxShadow: active ? `0 18px 58px ${item.accent}24` : "none",
                    }}
                  >
                    <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/12 to-transparent transition duration-700 group-hover:translate-x-full" />
                    <div className="relative flex items-start gap-4">
                      <span className="grid size-12 shrink-0 place-items-center rounded-md border" style={{ borderColor: `${item.accent}59`, background: `${item.accent}1a`, color: item.accent }}>
                        <Trophy size={20} />
                      </span>
                      <span className="min-w-0">
                        <span className="text-xs font-black uppercase tracking-[0.24em]" style={{ color: item.accent }}>{item.year} / {item.category}</span>
                        <span className="mt-2 block font-serif text-2xl font-black leading-tight text-white">{item.title}</span>
                        <span className="mt-2 block text-sm font-semibold text-slate-400">{item.organization}</span>
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              key={activeAchievement.title}
              initial={{ opacity: 0, y: 18, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 0.3 }}
              className="relative mt-6 overflow-hidden rounded-lg border p-5 shadow-2xl backdrop-blur-xl md:p-6"
              style={{
                borderColor: `${activeAchievement.accent}4d`,
                background: `radial-gradient(circle at top right, ${activeAchievement.accent}1f, transparent 34%), linear-gradient(135deg, ${activeAchievement.accent}14, rgba(2,6,23,0.96) 72%)`,
                boxShadow: `0 24px 80px ${activeAchievement.accent}1f`,
              }}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1" style={{ background: activeAchievement.accent }} />
              <div className="grid gap-7 xl:grid-cols-[1fr_0.48fr]">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em]" style={{ color: activeAchievement.accent }}>{activeAchievement.category}</p>
                  <h3
                    className="mt-3 bg-clip-text font-serif text-3xl font-black leading-tight text-transparent md:text-4xl"
                    style={{ backgroundImage: `linear-gradient(90deg, #ffffff, ${activeAchievement.accent})` }}
                  >
                    {activeAchievement.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
                    {[activeAchievement.organization, activeAchievement.period, activeAchievement.year ?? "Documented"].map((meta) => (
                      <span
                        key={meta}
                        className="rounded-md border px-3 py-1.5"
                        style={{ borderColor: `${activeAchievement.accent}40`, background: `${activeAchievement.accent}17`, color: "#f8fafc" }}
                      >
                        {meta}
                      </span>
                    ))}
                  </div>
                  <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">{activeAchievement.description}</p>

                  <div className="mt-6 grid gap-4 md:grid-cols-2">
                    <div className="rounded-lg border p-4 backdrop-blur" style={{ borderColor: `${activeAchievement.accent}24`, background: `${activeAchievement.accent}0b` }}>
                      <h4 className="font-serif text-xl font-black text-slate-100">Event Overview</h4>
                      <p className="mt-4 text-sm leading-7 text-slate-300">{activeAchievement.challenge}</p>
                    </div>
                    <div className="rounded-lg border p-4 backdrop-blur" style={{ borderColor: `${activeAchievement.accent}24`, background: `${activeAchievement.accent}0b` }}>
                      <h4 className="font-serif text-xl font-black text-slate-100">Professional Impact</h4>
                      <p className="mt-4 text-sm leading-7 text-slate-300">{activeAchievement.outcome}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Skills Demonstrated</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {(activeAchievement.stack ?? []).map((skill, skillIndex) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.22, delay: skillIndex * 0.025 }}
                          whileHover={{ y: -3, boxShadow: `0 0 20px ${activeAchievement.accent}33` }}
                          className="rounded-md border px-3 py-1.5 text-xs font-bold text-slate-100"
                          style={{ borderColor: `${activeAchievement.accent}40`, background: `${activeAchievement.accent}17` }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="self-start xl:sticky xl:top-24">
                  <div>
                    <p className="mb-3 text-xs font-black uppercase tracking-[0.24em]" style={{ color: activeAchievement.accent }}>Achievement Proof</p>
                    <motion.a
                      href={activeAchievement.proofUrl}
                      target="_blank"
                      rel="noreferrer"
                      animate={{ y: [0, -5, 0] }}
                      whileHover={{ y: -8, scale: 1.04, rotateX: 3, rotateY: -3 }}
                      transition={{
                        y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 0.22 },
                        rotateX: { duration: 0.22 },
                        rotateY: { duration: 0.22 },
                      }}
                      className="group relative block w-full max-w-full overflow-hidden rounded-lg border bg-white shadow-2xl"
                      style={{ borderColor: `${activeAchievement.accent}4d`, boxShadow: `0 0 40px ${activeAchievement.accent}24` }}
                    >
                      <div className="pointer-events-none absolute inset-0 z-10 rounded-lg ring-1 ring-amber-100/20 transition group-hover:ring-amber-200/80" />
                      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/0 to-white/25 opacity-0 transition duration-300 group-hover:opacity-100" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={activeAchievement.previewUrl}
                        alt={`${activeAchievement.title} verification preview`}
                        className="max-h-[32rem] w-full max-w-full object-contain transition duration-300 group-hover:brightness-105"
                      />
                    </motion.a>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <ProofModal item={activeAchievement} label="View Proof" compact />
                    <a
                      href={activeAchievement.proofUrl}
                      download
                      className="group inline-flex h-12 w-full min-w-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-md border px-4 text-sm font-black text-slate-100 transition hover:-translate-y-0.5"
                      style={{ borderColor: `${activeAchievement.accent}59`, background: `${activeAchievement.accent}17` }}
                    >
                      <Download size={17} className="shrink-0 transition group-hover:translate-y-0.5" />
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="resume"
          className="relative isolate overflow-hidden border-y border-white/[0.06] bg-[#050a16] px-4 py-24 md:px-6 lg:py-28"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(circle at 18% 45%, rgba(34,211,238,.08), transparent 30%), radial-gradient(circle at 82% 55%, rgba(168,85,247,.08), transparent 28%)",
            }}
          />

          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65 }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-cyan-300">Professional Record</p>
              <h2 className="mt-4 font-serif text-5xl font-bold text-white md:text-7xl">Resume</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
                A concise overview of my education, projects, technical skills, certifications, and professional growth.
              </p>
            </motion.div>

            <div className="mt-14 grid items-start justify-center gap-6 lg:grid-cols-[minmax(0,48rem)_minmax(0,40rem)]">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65 }}
                className="mx-auto w-full rounded-2xl border border-cyan-300/20 bg-[#0b1220]/92 p-4 shadow-[0_24px_70px_rgba(0,0,0,.3)] md:p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-lg bg-cyan-300/10 text-cyan-300">
                      <FileText size={20} />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">Resume Preview</p>
                      <p className="mt-0.5 text-xs text-slate-500">Sakthi Sri Santh M</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["ATS Optimized", "Updated July 2026", "PDF"].map((badge, index) => (
                      <span
                        key={badge}
                        className={`rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] ${
                          index === 1
                            ? "border-purple-300/25 bg-purple-300/10 text-purple-200"
                            : "border-cyan-300/25 bg-cyan-300/10 text-cyan-200"
                        }`}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="resume-preview-frame no-scrollbar mt-5 flex justify-center overflow-hidden bg-transparent">
                  <Image
                    src="/resume-preview.png"
                    alt="Sakthi Sri Santh M resume preview"
                    width={1489}
                    height={2106}
                    sizes="(min-width: 1024px) 54vw, 92vw"
                    className="h-auto max-h-[34rem] w-auto max-w-full rounded-lg bg-white object-contain shadow-[0_18px_50px_rgba(0,0,0,.28)]"
                  />
                </div>
              </motion.div>

              <motion.aside
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: 0.1 }}
                className="mx-auto flex w-full flex-col rounded-[1.35rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_80px_rgba(0,0,0,.28)] backdrop-blur-xl md:p-7 lg:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.08)]">
                    <FileText size={22} />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-300">Document Access</p>
                    <h3 className="mt-2 text-3xl font-bold leading-tight text-white">Resume Actions</h3>
                  </div>
                </div>
                <p className="mt-5 max-w-md leading-7 text-slate-400">
                  Review my experience, technical foundation, projects, and verified learning record.
                </p>

                <div className="mt-8 grid gap-3.5">
                  <motion.a
                    href="/Resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -3 }}
                    className="group inline-flex h-[3.45rem] w-full items-center justify-between rounded-xl border border-cyan-300/20 bg-cyan-300/[0.075] px-5 font-bold text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-cyan-200/45 hover:bg-cyan-300/[0.11] hover:text-white"
                  >
                    <span className="flex items-center gap-3"><Eye size={19} className="text-cyan-200" />View Resume</span>
                    <ExternalLink size={17} className="opacity-60 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                  </motion.a>
                  <motion.a
                    href="/Resume.pdf"
                    download="Sakthi-Sri-Santh-M-Resume.pdf"
                    whileHover={{ y: -3 }}
                    className="group inline-flex h-[3.45rem] w-full items-center justify-between rounded-xl border border-purple-300/20 bg-purple-300/[0.075] px-5 font-bold text-purple-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition hover:border-purple-200/45 hover:bg-purple-300/[0.11] hover:text-white"
                  >
                    <span className="flex items-center gap-3"><Download size={19} className="text-purple-200" />Download PDF</span>
                    <ChevronRight size={17} className="opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100" />
                  </motion.a>
                  <motion.button
                    type="button"
                    onClick={handlePrintResume}
                    whileHover={{ y: -3 }}
                    className="group inline-flex h-[3.45rem] w-full items-center justify-between rounded-xl border border-white/12 bg-white/[0.035] px-5 text-left font-bold text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] transition hover:border-cyan-300/25 hover:bg-white/[0.06] hover:text-white"
                  >
                    <span className="flex items-center gap-3"><Printer size={19} className="text-slate-300" />Print Resume</span>
                    <ChevronRight size={17} className="opacity-60 transition group-hover:translate-x-1 group-hover:opacity-100" />
                  </motion.button>
                </div>

                <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-6 text-slate-500">
                  Available as a verified PDF for quick review, download, and printing.
                </p>
              </motion.aside>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative isolate overflow-hidden border-y border-cyan-300/10 bg-[#050a16] px-4 py-24 md:px-6 lg:py-28"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 12% 35%, rgba(34,211,238,.10), transparent 28%), radial-gradient(circle at 88% 62%, rgba(168,85,247,.10), transparent 30%)",
            }}
          />

          <div className="mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65 }}
              className="mx-auto max-w-3xl text-center"
            >
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-cyan-300">Contact</p>
              <h2 className="mt-4 font-serif text-5xl font-bold text-white md:text-7xl">Let&apos;s Connect</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
                Reach out for internships, software engineering opportunities, project collaboration, or technical discussions.
              </p>
            </motion.div>

            <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65 }}
                className="rounded-[20px] border border-cyan-300/20 bg-[#0b1220]/90 p-6 shadow-[0_24px_70px_rgba(0,0,0,.28)] backdrop-blur-xl md:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="relative block size-11 overflow-hidden rounded-lg border border-cyan-300/25 bg-white">
                    <Image src={skillAsset("08_55_59")} alt="Email" fill sizes="44px" className="object-cover" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-300">Contact Information</p>
                    <h3 className="mt-1 text-2xl font-bold text-white">Direct Contact</h3>
                  </div>
                </div>
                <p className="mt-5 max-w-xl leading-7 text-slate-400">
                  Available for software engineering internships, full-stack projects, AI systems, and cybersecurity-focused roles.
                </p>

                <div className="mt-7 divide-y divide-white/10 border-y border-white/10">
                  {contactLinks.map(({ label, value, image, href, external }, index) => (
                    <motion.a
                      key={label}
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noreferrer" : undefined}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.08 }}
                      whileHover={{ x: 5 }}
                      className="group flex min-w-0 items-center gap-4 px-1 py-4 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-cyan-300"
                    >
                      <span className="relative block size-10 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white transition group-hover:border-cyan-300/35 group-hover:shadow-[0_0_22px_rgba(34,211,238,.18)]">
                        <Image src={image} alt="" fill sizes="40px" className="object-cover transition group-hover:scale-105" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-bold uppercase tracking-[0.18em] text-slate-500 group-hover:text-cyan-300">{label}</span>
                        <span className="mt-1 block break-words text-sm font-medium text-slate-200 md:text-base">{value}</span>
                      </span>
                      <ExternalLink size={17} className="shrink-0 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-purple-300" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: 0.08 }}
                className="rounded-[20px] border border-purple-400/20 bg-[#0b1220]/90 p-6 shadow-[0_24px_70px_rgba(0,0,0,.28)] backdrop-blur-xl md:p-8"
              >
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-purple-300">Start a Conversation</p>
                <h3 className="mt-2 text-2xl font-bold text-white">Send a Message</h3>
                <form onSubmit={handleContactSubmit} className="mt-7 grid gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="grid gap-2 text-sm font-semibold text-slate-200">
                      Name
                      <input
                        required
                        name="name"
                        autoComplete="name"
                        className="h-12 rounded-lg border border-white/10 bg-[#050a16]/75 px-4 text-white outline-none transition placeholder:text-slate-600 hover:border-cyan-300/25 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/10"
                        placeholder="Your name"
                      />
                    </label>
                    <label className="grid gap-2 text-sm font-semibold text-slate-200">
                      Email
                      <input
                        required
                        type="email"
                        name="email"
                        autoComplete="email"
                        className="h-12 rounded-lg border border-white/10 bg-[#050a16]/75 px-4 text-white outline-none transition placeholder:text-slate-600 hover:border-cyan-300/25 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/10"
                        placeholder="you@example.com"
                      />
                    </label>
                  </div>
                  <label className="grid gap-2 text-sm font-semibold text-slate-200">
                    Subject
                    <input
                      required
                      name="subject"
                      className="h-12 rounded-lg border border-white/10 bg-[#050a16]/75 px-4 text-white outline-none transition placeholder:text-slate-600 hover:border-purple-300/25 focus:border-purple-300 focus:ring-2 focus:ring-purple-300/10"
                      placeholder="What would you like to discuss?"
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold text-slate-200">
                    Message
                    <textarea
                      required
                      name="message"
                      className="min-h-40 resize-y rounded-lg border border-white/10 bg-[#050a16]/75 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 hover:border-purple-300/25 focus:border-purple-300 focus:ring-2 focus:ring-purple-300/10"
                      placeholder="Write your message..."
                    />
                  </label>
                  <motion.button
                    type="submit"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex h-12 w-fit items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-300 to-cyan-400 px-6 font-bold text-[#041018] shadow-[0_12px_30px_rgba(34,211,238,.18)] transition hover:shadow-[0_16px_36px_rgba(34,211,238,.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1220]"
                  >
                    <Send size={18} />
                    Send Message
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      <footer className="relative overflow-hidden bg-[#030712] px-4 py-14 text-slate-300 md:px-6 lg:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 12% 20%, rgba(34,211,238,.07), transparent 28%), radial-gradient(circle at 88% 70%, rgba(168,85,247,.07), transparent 30%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl rounded-[20px] border border-cyan-300/15 bg-[#07101f]/80 p-6 shadow-[0_30px_90px_rgba(0,0,0,.35)] backdrop-blur-xl md:p-8 lg:p-10">
          <div className="grid items-start gap-9 md:grid-cols-[1.2fr_1fr_0.9fr] md:gap-10">
            <div>
              <a href="#home" className="group relative block h-12 w-[190px] overflow-hidden" aria-label="Sakthi.dev home">
                <Image
                  src={theme === "dark" ? skillAsset("08_53_18") : skillAsset("08_53_24")}
                  alt="Sakthi.dev"
                  fill
                  sizes="190px"
                  className={`object-cover object-center transition duration-300 group-hover:scale-[1.03] ${theme === "dark" ? "mix-blend-lighten" : "mix-blend-multiply"}`}
                />
              </a>
              <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
                CSE (Cyber Security) student building secure and intelligent software.
              </p>
              <p className="mt-3 text-sm font-semibold text-slate-200">Coimbatore, India</p>
            </div>

            <div className="md:border-l md:border-white/10 md:pl-10">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">Quick Links</p>
              <nav aria-label="Footer navigation" className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
                {navItems
                  .filter(([, id]) => ["about", "education", "projects", "certificates", "resume", "contact"].includes(id))
                  .map(([label, id]) => (
                    <a key={id} href={`#${id}`} className="text-sm text-slate-400 transition hover:text-cyan-200">
                      {label}
                    </a>
                  ))}
              </nav>
            </div>

            <div className="md:border-l md:border-white/10 md:pl-10">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-purple-300">Connect</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {[
                  { label: "GitHub", href: "https://github.com/sakthisrisanth98", image: skillAsset("08_55_24") },
                  { label: "LinkedIn", href: "https://linkedin.com/in/sakthi-sri-santh-m-416540290", image: linkedinAsset },
                  { label: "Telegram", href: "https://t.me/sakthisrisanth", image: skillAsset("08_55_43") },
                  { label: "LeetCode", href: "https://leetcode.com/u/sakthisrisanth98", image: skillAsset("08_55_37") },
                  { label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=sakthisrisanth98%40gmail.com", image: skillAsset("08_55_59") },
                ].map(({ label, href, image }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    aria-label={label}
                    title={label}
                    className="group relative size-11 overflow-hidden rounded-lg border border-white/10 bg-white transition hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_0_22px_rgba(34,211,238,.15)]"
                  >
                    <Image src={image} alt="" fill sizes="44px" className="object-cover transition group-hover:scale-105" />
                  </a>
                ))}
              </div>
              <p className="mt-5 text-sm leading-6 text-slate-400">Available for internships and collaboration.</p>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-5 border-t border-white/10 pt-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>Copyright {year} Sakthi Sri Santh M. All rights reserved.</p>
            <a
              href="#home"
              className="group inline-flex h-10 w-fit items-center gap-2 rounded-lg border border-purple-300/30 bg-purple-300/[0.06] px-4 font-bold text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:text-white"
            >
              Back to Top
              <ChevronUp size={17} className="text-cyan-300 transition group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </footer>

      <Dialog.Root open={recruiterMode} onOpenChange={setRecruiterMode}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
          <Dialog.Content className="no-scrollbar fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[94vw] max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-[1.35rem] border border-cyan-300/20 bg-[#07101f]/98 p-4 text-white shadow-[0_30px_100px_rgba(0,0,0,.62)] outline-none backdrop-blur-2xl sm:p-5 md:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-300 via-purple-400 to-cyan-300" />
            <div className="pointer-events-none absolute right-6 top-8 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="pointer-events-none absolute bottom-10 left-6 h-48 w-48 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="relative">
              <div className="flex min-w-0 flex-col items-center gap-5 pr-0 text-center sm:flex-row sm:pr-14 sm:text-left">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-full border border-cyan-300/55 bg-[#07192f] p-[3px] shadow-[0_0_34px_rgba(34,211,238,.2)] md:size-24">
                  <div className="relative size-full overflow-hidden rounded-full bg-[#07192f]">
                    <Image src="/photo.jpeg" alt="Sakthi Sri Santh M" fill sizes="96px" className="object-cover object-[center_34%]" />
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-300">Candidate Snapshot</p>
                  <Dialog.Title className="mt-2 font-serif text-3xl font-black leading-tight md:text-5xl">Sakthi Sri Santh M</Dialog.Title>
                  <Dialog.Description className="mt-2 text-sm font-medium text-slate-400 md:text-lg">
                    Software Engineering | Cyber Security | AI Systems
                  </Dialog.Description>
                </div>
              </div>
              <Dialog.Close className="absolute right-0 top-0 grid size-10 place-items-center rounded-lg border border-white/10 text-slate-300 transition hover:border-cyan-300/30 hover:bg-white/[0.06] hover:text-white" aria-label="Close recruiter summary">
                <X size={20} />
              </Dialog.Close>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {[
                ["7", "Major Products", Rocket, "text-cyan-300"],
                [String(certificates.length), "Certifications", BadgeCheck, "text-purple-300"],
                [String(internships.length), "Internships", BriefcaseBusiness, "text-emerald-300"],
                ["8.02", "Current CGPA", GraduationCap, "text-amber-300"],
              ].map(([value, label, Icon, tone]) => (
                <motion.div
                  key={label as string}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_18px_50px_rgba(0,0,0,.18)] transition hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/[0.055] md:p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`grid size-10 place-items-center rounded-xl border border-white/10 bg-white/[0.04] ${tone as string}`}>
                      <Icon size={20} />
                    </span>
                    <p className="text-3xl font-black leading-none text-white md:text-4xl">{value as string}</p>
                  </div>
                  <p className="mt-4 text-[11px] font-black uppercase tracking-[0.18em] text-slate-500">{label as string}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1.12fr_.88fr]">
              <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/[0.035] p-5 shadow-[0_20px_60px_rgba(0,0,0,.2)] md:p-7">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-300">Candidate Value</p>
                <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
                  Fourth-year Computer Science and Engineering student specializing in Cyber Security, with hands-on experience shipping AI, full-stack, commerce, media, and defensive security products.
                </p>
                <p className="mt-4 text-base leading-8 text-slate-300 md:text-lg">
                  I combine product thinking with practical engineering: translating requirements into responsive interfaces, API workflows, data systems, and secure, maintainable software.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Next.js", "React", "TypeScript", "Python", "FastAPI", "MySQL", "Cloud", "Cyber Security"].map((skill) => (
                    <span key={skill} className="rounded-full border border-cyan-300/18 bg-[#07192f]/75 px-3.5 py-2 text-xs font-bold text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">{skill}</span>
                  ))}
                </div>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-purple-300">Featured Products</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">Limitra AI | Nexmart | Cropix AI Studio | AegisMTD | WebGuard | AnimeZ | AstroVelo</p>
                </div>
              </div>

              <div className="rounded-2xl border border-purple-300/15 bg-purple-300/[0.035] p-5 shadow-[0_20px_60px_rgba(0,0,0,.2)] md:p-7">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-purple-300">Verified Record</p>
                <div className="mt-5 grid gap-3">
                  {[
                    ["Education", "B.E. CSE (Cyber Security), SKCET | 2023-2027"],
                    ["Experience", "Three internships across software development, full-stack engineering, and cyber security"],
                    ["Product Scope", "Seven major products across AI, commerce, security, media, image processing, and games"],
                    ["Role Fit", "Software engineering, full-stack, AI systems, and security-focused product teams"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                      <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
                      <p className="mt-2 text-sm font-semibold leading-6 text-slate-200">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["View Resume", "resume", FileText],
                ["View Projects", "projects", Rocket],
                ["Certificates", "certificates", BadgeCheck],
                ["Contact Me", "contact", Mail],
              ].map(([label, id, Icon], index) => (
                <a
                  key={id as string}
                  href={`#${id as string}`}
                  onClick={() => setRecruiterMode(false)}
                  className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border px-4 text-sm font-bold transition hover:-translate-y-0.5 ${index === 0 ? "border-cyan-300/70 bg-cyan-300/90 text-[#041018] shadow-[0_12px_30px_rgba(34,211,238,.12)] hover:bg-cyan-200" : "border-white/12 bg-white/[0.035] text-slate-200 hover:border-purple-300/40 hover:bg-white/[0.055] hover:text-white"}`}
                >
                  <Icon size={17} />
                  {label as string}
                </a>
              ))}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </main>
  );
}
