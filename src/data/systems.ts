/**
 * Example Systems Data
 * 
 * This file contains sample systems using the full schema.
 * Each example demonstrates different features and complexity levels.
 * 
 * To add a new system:
 * 1. Copy an example below as a template
 * 2. Fill in your content
 * 3. Add it to the systems array
 * 4. No other code changes needed — the renderer handles the rest
 */

import type { System } from "../types/systems";

export const systems: System[] = [
  // Example 1: A major flagship project with full features
  {
    id: "my-awesome-project",
    name: "My Awesome Project",
    position: [100, 0, -50],
    type: "project",
    starColor: "#4f8eff",
    tagline: "A space explorer portfolio built with React & Three.js",
    description:
      "A unique interactive portfolio where visitors pilot a rocket through solar systems representing my projects. Built to showcase 3D skills and create a memorable first impression.",
    
    planets: [
      {
        id: "overview",
        name: "Overview",
        description:
          "This is the flagship project showcasing 3D interaction design, spatial navigation, and React Three Fiber.",
        tags: ["React", "Three.js", "TypeScript", "Vite", "WebGL"],
        links: [
          { label: "Live", url: "https://example.com", icon: "link" },
          { label: "GitHub", url: "https://github.com/user/project", icon: "github" },
        ],
        orbitRadius: 8,
        featured: true,
        complexity: 5,
      },
      {
        id: "tech-stack",
        name: "Tech Stack",
        description:
          "React Three Fiber for component-driven 3D, Drei helpers, GSAP for animation, TailwindCSS for HUD UI.",
        tags: ["React Three Fiber", "Drei", "GSAP", "TailwindCSS"],
        links: [],
        orbitRadius: 12,
      },
      {
        id: "key-features",
        name: "Key Features",
        description: "Free-flight 3D navigation, procedural planet generation, proximity-based discovery, galaxy map.",
        tags: [],
        links: [],
        orbitRadius: 16,
        moons: [
          {
            id: "feature-flight",
            name: "3D Flight",
            description: "Smooth WASD + mouse controls with gamepad support",
            orbitRadius: 2,
            badge: "🚀",
          },
          {
            id: "feature-discovery",
            name: "Discovery",
            description: "Proximity indicators + galaxy map navigation",
            orbitRadius: 3.5,
            badge: "🔭",
          },
        ],
      },
    ],
    
    moons: [
      {
        id: "award-1",
        name: "Featured on Awwwards",
        description: "Won SOTD for interactive design",
        orbitRadius: 20,
        badge: "⭐",
      },
    ],

    contributors: [
      {
        name: "Diego Salischiker",
        role: "Full Stack Developer",
        url: "https://example.com",
      },
    ],

    dates: {
      start: "2025-01-15",
      end: null,
    },

    categories: ["Web", "3D", "Portfolio", "Open Source"],

    visual: {
      starSize: 1.5,
      glowIntensity: 0.9,
      nebulaTint: "#6a5acd",
      nebulaIntensity: 0.6,
    },

    discovery: {
      featured: true,
      proximityDistance: 60,
      proximityIcon: "🚀",
    },

    links: [
      { label: "Live Site", url: "https://example.com", icon: "link" },
      { label: "Source Code", url: "https://github.com/user/project", icon: "github" },
    ],

    metadata: {
      description:
        "An interactive 3D space portfolio built with React Three Fiber, where visitors pilot a rocket through solar systems.",
      imageUrl: "/preview-images/space-portfolio.png",
      keywords: ["3D", "interactive", "portfolio", "React", "WebGL"],
    },

    flags: {
      archived: false,
      experimental: false,
      openSource: {
        enabled: true,
        license: "MIT",
        repositoryUrl: "https://github.com/user/project",
      },
    },
  },

  // Example 2: A work experience system
  {
    id: "senior-frontend-dev",
    name: "Senior Frontend Developer",
    position: [-30, 0, 40],
    type: "experience",
    starColor: "#ff6b9d",
    tagline: "Leading frontend architecture at TechCorp (2023-2025)",
    description:
      "Led a team of 4 frontend engineers building the main product dashboard used by 50k+ users. Owned architecture decisions, performance optimization, and team growth.",

    planets: [
      {
        id: "role-overview",
        name: "Role Overview",
        description: "Reporting to VP of Engineering. Led 4-person team. Owned frontend strategy and mentorship.",
        tags: ["Leadership", "Mentorship", "Architecture", "Performance"],
        links: [
          { label: "Company", url: "https://techcorp.example.com", icon: "link" },
        ],
        orbitRadius: 10,
        featured: true,
      },
      {
        id: "key-projects",
        name: "Key Projects",
        description:
          "Rebuilt dashboard in Next.js, cutting load time by 60%. Implemented real-time data sync. Launched mobile app.",
        tags: ["Next.js", "WebSockets", "React Native", "Performance"],
        links: [],
        orbitRadius: 14,
        moons: [
          {
            id: "project-dashboard",
            name: "Dashboard Overhaul",
            description: "Migrated from Angular to Next.js, reduced bundle by 70%",
            orbitRadius: 2,
          },
          {
            id: "project-mobile",
            name: "Mobile App",
            description: "Launched iOS & Android with React Native",
            orbitRadius: 3,
          },
        ],
      },
      {
        id: "impact-metrics",
        name: "Impact & Metrics",
        description:
          "Improved Core Web Vitals score from 45 to 95. Reduced customer support tickets by 40%. Shipped 12 major features.",
        tags: [],
        links: [],
        orbitRadius: 18,
      },
    ],

    contributors: [
      {
        name: "Diego Salischiker",
        role: "Senior Frontend Developer / Tech Lead",
      },
    ],

    dates: {
      start: "2023-01-15",
      end: "2025-01-31",
    },

    visual: {
      starSize: 2.0,
      glowIntensity: 1.0,
      nebulaIntensity: 0.7,
    },

    discovery: {
      featured: true,
    },

    metadata: {
      keywords: ["experience", "leadership", "frontend", "React", "Next.js"],
    },
  },

  // Example 3: A side project (smaller, dimmer)
  {
    id: "color-palette-tool",
    name: "Color Palette Generator",
    position: [120, -40, 100],
    type: "side-project",
    starColor: "#ffd700",
    tagline: "AI-powered color palette generation tool",

    planets: [
      {
        id: "overview",
        name: "Overview",
        description: "Uses AI to generate accessible, harmonious color palettes from a single input color.",
        tags: ["React", "AI", "Design Tools", "Accessibility"],
        links: [
          { label: "Try It", url: "https://color-palette.example.com", icon: "link" },
        ],
        orbitRadius: 8,
      },
    ],

    visual: {
      starSize: 0.8,
      glowIntensity: 0.6,
    },

    discovery: {
      featured: false,
    },

    flags: {
      archived: false,
    },
  },

  // Example 4: A skill group (no individual planets, grouped display)
  {
    id: "frontend-skills",
    name: "Frontend Skills",
    position: [50, 60, -30],
    type: "skill",
    starColor: "#00ff88",
    tagline: "Technologies and tools I work with daily",
    description:
      "A curated list of tools, frameworks, and concepts I use regularly and can speak to with expertise.",

    planets: [
      {
        id: "javascript-ecosystem",
        name: "JavaScript Ecosystem",
        description: "Node.js, npm/yarn, modern JS (ES2020+), TypeScript",
        tags: ["JavaScript", "TypeScript", "Node.js", "npm"],
        links: [],
        orbitRadius: 8,
      },
      {
        id: "frontend-frameworks",
        name: "Frontend Frameworks",
        description: "React, Next.js, React Router, state management (Zustand, Context)",
        tags: ["React", "Next.js", "React Router", "State Management"],
        links: [],
        orbitRadius: 12,
      },
      {
        id: "styling",
        name: "Styling & CSS",
        description: "TailwindCSS, CSS-in-JS, responsive design, animations (GSAP)",
        tags: ["TailwindCSS", "CSS", "Responsive Design", "GSAP"],
        links: [],
        orbitRadius: 10,
      },
      {
        id: "3d-webgl",
        name: "3D & WebGL",
        description: "Three.js, React Three Fiber, Shader programming (GLSL)",
        tags: ["Three.js", "React Three Fiber", "GLSL", "WebGL"],
        links: [],
        orbitRadius: 14,
      },
    ],

    visual: {
      starSize: 1.2,
      glowIntensity: 0.7,
    },

    discovery: {
      hidden: false,
    },
  },

  // Example 5: The About Me space station
  {
    id: "about-me",
    name: "Diego Salischiker",
    position: [0, 0, 0],
    type: "about",
    starColor: "#ffffff",
    tagline: "Frontend Engineer & Creative Technologist",
    description:
      "I'm a full-stack frontend engineer with a passion for interactive 3D experiences, performance optimization, and building tools that bring joy to users. Always exploring the intersection of design and code.",

    planets: [
      {
        id: "bio",
        name: "Bio",
        description:
          "Based in Buenos Aires. 5+ years building products at startups and scale-ups. Passionate about open source and mentoring junior developers.",
        tags: [],
        links: [],
        orbitRadius: 8,
      },
      {
        id: "contact",
        name: "Contact & Links",
        description: "Reach out—I'm interested in interesting projects.",
        tags: [],
        links: [
          { label: "Email", url: "mailto:diego@example.com", icon: "email" },
          { label: "LinkedIn", url: "https://linkedin.com/in/diego", icon: "linkedin" },
          { label: "GitHub", url: "https://github.com/diego", icon: "github" },
          { label: "Twitter", url: "https://twitter.com/diego", icon: "twitter" },
        ],
        orbitRadius: 12,
      },
      {
        id: "cv",
        name: "Resume",
        description: "Download my full CV with employment history and education.",
        tags: [],
        links: [
          { label: "PDF Resume", url: "/resume.pdf", icon: "link" },
        ],
        orbitRadius: 10,
      },
    ],

    visual: {
      starSize: 1.0,
      glowIntensity: 1.0,
      starModelPath: "/models/space-station.glb", // Custom model instead of procedural sphere
    },

    discovery: {
      featured: true,
      proximityDistance: 40,
    },

    metadata: {
      description: "Frontend Engineer & Creative Technologist based in Buenos Aires.",
      imageUrl: "/preview-images/profile.png",
    },
  },

  // Example 6: An archived project (legacy/old)
  {
    id: "legacy-blog-platform",
    name: "Blog Platform v1",
    position: [-100, 20, 80],
    type: "project",
    starColor: "#888888",
    tagline: "Educational blogging platform (archived 2024)",
    description:
      "A full-stack blogging platform I built as a learning project. Now archived, but demonstrates fundamental full-stack skills.",

    planets: [
      {
        id: "tech",
        name: "Technology",
        description: "Built with Express.js, MongoDB, and React. Single-page app with JWT auth.",
        tags: ["Express.js", "MongoDB", "React", "REST API"],
        links: [
          { label: "GitHub", url: "https://github.com/user/blog-platform", icon: "github" },
        ],
        orbitRadius: 8,
      },
    ],

    flags: {
      archived: true,
      experimental: false,
      openSource: {
        enabled: true,
        license: "MIT",
        repositoryUrl: "https://github.com/user/blog-platform",
      },
    },

    visual: {
      starSize: 0.7,
      glowIntensity: 0.4,
    },

    discovery: {
      featured: false,
    },
  },

  // Example 7: An experimental/in-progress project
  {
    id: "ai-code-assistant",
    name: "AI Code Assistant (Experimental)",
    position: [80, -50, -60],
    type: "project",
    starColor: "#00ffff",
    tagline: "Exploring LLM integration for IDE plugins",

    planets: [
      {
        id: "concept",
        name: "Concept",
        description:
          "Experimenting with fine-tuned LLMs for context-aware code completions in VS Code.",
        tags: ["LLM", "VS Code API", "Transformers.js", "Experimental"],
        links: [
          { label: "WIP Repository", url: "https://github.com/user/ai-assistant", icon: "github" },
        ],
        orbitRadius: 9,
      },
    ],

    flags: {
      archived: false,
      experimental: true,
      openSource: {
        enabled: true,
        license: "MIT",
      },
    },

    metadata: {
      keywords: ["experimental", "AI", "VS Code", "LLM"],
    },
  },

  // Example 8: A project with multiple contributors
  {
    id: "design-system-ui",
    name: "Design System UI Library",
    position: [-60, -30, 50],
    type: "project",
    starColor: "#ff69b4",
    tagline: "Accessible, reusable component library for rapid product development",

    planets: [
      {
        id: "components",
        name: "Components",
        description:
          "50+ production-ready, fully accessible components: buttons, modals, forms, data tables, navigation.",
        tags: ["React", "TypeScript", "Storybook", "Testing Library"],
        links: [
          { label: "Storybook", url: "https://design-system.example.com", icon: "link" },
        ],
        orbitRadius: 8,
        featured: true,
      },
      {
        id: "documentation",
        name: "Documentation",
        description: "Complete guides, examples, accessibility standards (WCAG 2.1 AA), and usage patterns.",
        tags: ["Docs", "Accessibility", "Guidelines"],
        links: [
          { label: "View Docs", url: "https://design-system-docs.example.com", icon: "link" },
        ],
        orbitRadius: 12,
      },
    ],

    contributors: [
      {
        name: "Diego Salischiker",
        role: "Lead Developer",
        url: "https://example.com",
      },
      {
        name: "Sarah Chen",
        role: "Design Lead",
        url: "https://sarah-chen.example.com",
      },
      {
        name: "Marcus Johnson",
        role: "QA & Accessibility Lead",
        url: "https://marcus.example.com",
      },
    ],

    dates: {
      start: "2024-06-01",
      end: null,
    },

    categories: ["Open Source", "Developer Tools", "Design Systems"],

    visual: {
      starSize: 1.3,
      glowIntensity: 0.8,
      nebulaTint: "#ff1493",
    },

    flags: {
      openSource: {
        enabled: true,
        license: "MIT",
        repositoryUrl: "https://github.com/company/design-system",
      },
    },

    relations: {
      relatedSystems: ["color-palette-tool"],
      successors: [],
    },
  },
];
