/**
 * SCHEMA GUIDE — Systems & Planets Data
 * 
 * This guide explains the space portfolio data schema and best practices for adding content.
 * 
 * Path: src/types/systems.ts (schema definition)
 * Path: src/data/systems.ts (example data)
 * 
 * ---
 */

/**
 * OVERVIEW
 * ========
 * 
 * The schema defines two hierarchy levels:
 * 
 * System (Solar System)
 *   ├─ Planet (Key detail/aspect)
 *   │  └─ Moon (Sub-detail)
 *   └─ Moon (System-level achievement/detail)
 * 
 * A System represents a project, experience, skill group, or special content (About Me).
 * Planets are the clickable interactive elements visitors engage with.
 * Moons are secondary details orbiting planets or the star itself.
 * 
 * ---
 */

/**
 * CORE FIELDS CHECKLIST
 * =====================
 * 
 * Every System requires:
 * ✓ id - Unique slug, no spaces, lowercase. e.g., "my-awesome-project"
 * ✓ name - Display name, any format. e.g., "My Awesome Project"
 * ✓ position - [x, y, z] world coordinates. Keep in range ±200 to avoid getting lost
 * ✓ type - One of: "project", "side-project", "experience", "skill", "about"
 * ✓ starColor - Hex color for the system's star. e.g., "#4f8eff"
 * ✓ planets - Array of Planet objects (can be empty, but not recommended)
 * 
 * Every Planet requires:
 * ✓ id - Unique within the system. e.g., "overview", "tech-stack"
 * ✓ name - Display name. e.g., "Overview"
 * ✓ description - 100–300 characters describing this aspect
 * ✓ tags - String array of related topics/techs
 * ✓ links - Array of Link objects (can be empty)
 * ✓ orbitRadius - Distance from star (typically 6–18 world units)
 * 
 * ---
 */

/**
 * QUICK START: Adding a New Project
 * ===================================
 * 
 * Step 1: Open src/data/systems.ts
 * 
 * Step 2: Copy this template:
 * 
 *   {
 *     id: "project-slug",
 *     name: "Project Name",
 *     position: [x, y, z],         // Pick a spot in the galaxy
 *     type: "project",             // or "side-project", "experience", etc.
 *     starColor: "#4f8eff",        // Pick a color
 *     planets: [
 *       {
 *         id: "overview",
 *         name: "Overview",
 *         description: "What is this project?",
 *         tags: ["React", "TypeScript"],
 *         links: [
 *           { label: "Live", url: "https://..." },
 *           { label: "GitHub", url: "https://github.com/..." }
 *         ],
 *         orbitRadius: 8,
 *       }
 *     ],
 *   }
 * 
 * Step 3: Add it to the systems array at the bottom
 * 
 * Step 4: Runtime — the system automatically appears in the galaxy!
 * 
 * That's it. No code changes elsewhere needed.
 * 
 * ---
 */

/**
 * FIELD REFERENCE
 * ===============
 */

// SYSTEM FIELDS

/**
 * id (required, string)
 * Unique identifier. Used in URLs, fast-travel, deep links.
 * - Lowercase, no spaces
 * - Use hyphens to separate words
 * - Examples: "my-awesome-project", "senior-frontend-dev", "color-palette-tool"
 */

/**
 * name (required, string)
 * Display name shown in HUD, galaxy map, proximity indicators.
 * - Can be any format (Title Case, UPPERCASE, etc.)
 * - Keep under 50 characters for map display
 * - Examples: "My Awesome Project", "Senior Frontend Developer", "React Skills"
 */

/**
 * position (required, [number, number, number])
 * 3D world coordinates [x, y, z].
 * - Units are arbitrary (world units)
 * - Use a consistent scale (typically ±200 for the whole galaxy)
 * - Keep systems visually separated (at least 40 units apart)
 * - Arrange meaningfully: center = core identity, outer = side projects
 * - Examples:
 *   - Central: [0, 0, 0] to [50, 50, 50]
 *   - Mid ring: [100, ±50, 100]
 *   - Outer: [150+, ±80, 150+]
 */

/**
 * type (required, enum)
 * Determines visual styling and logical grouping.
 * 
 * - "project" — Major portfolio project. Centered in the mid ring. Large, bright star.
 * - "side-project" — Smaller projects, hobby work. Outer ring. Dimmer star.
 * - "experience" — Job role, professional experience. Central system. Largest star.
 * - "skill" — Grouped in asteroid belt. No individual triggering. Dimmer, scattered.
 * - "about" — Special About Me space station. Central position. Unique model.
 */

/**
 * starColor (required, string)
 * Hex color for the system's primary star.
 * - Format: "#rrggbb" or "#rrggbbaa" (with alpha)
 * - Examples: "#4f8eff", "#ff6b9d", "#ffd700"
 * - Tip: Use https://coolors.co to generate harmonious palettes
 * - Varies by type:
 *   - project: vibrant, saturated colors (blues, purples, teals)
 *   - side-project: softer/dimmer versions of main colors
 *   - experience: warm, welcoming colors (warm pinks, goldish tones)
 *   - skill: cool, neutral tones
 *   - about: white, gold, silver, or a signature color
 */

/**
 * planets (required, Planet[])
 * Array of clickable planets orbiting this star.
 * Minimum 1 planet recommended (at least "Overview").
 * Typical range: 2–4 planets per system.
 * 
 * Each Planet:
 * - id: unique within this system (e.g., "overview", "tech-stack", "outcome")
 * - name: display name (e.g., "Overview", "Tech Stack")
 * - description: 100–300 chars describing this detail
 * - tags: array of tech tags, skills, or outcomes
 * - links: array of {label, url, icon?}
 * - orbitRadius: distance from star (recommend 6–18 world units)
 * - Optional: moons, color, glowIntensity, featured, complexity
 */

/**
 * moons (optional, Moon[])
 * Secondary details orbiting the star itself.
 * Useful for system-level achievements, awards, or milestones.
 * Each Moon:
 * - id: unique ID
 * - name: display name
 * - description: brief description
 * - orbitRadius: distance from star
 * - badge: emoji or icon (optional)
 */

/**
 * tagline (optional, string)
 * Short subtitle (1 line). Appears in galaxy map and proximity indicators.
 * Example: "A space explorer portfolio built with React & Three.js"
 * Keep under 80 characters for cramped displays.
 */

/**
 * description (optional, string)
 * Long-form description. Appears in the info panel "About" section.
 * ~200–400 characters. Can span 2–3 sentences.
 * Sell the value/intent of this project or experience.
 */

/**
 * categories (optional, string[])
 * Tags for filtering, search, or grouping.
 * Examples: ["Open Source", "3D", "Performance", "Design Systems", "Mentorship"]
 * Not mandatory but useful for future filtering UI.
 */

/**
 * dates (optional, { start?, end? })
 * Timeline metadata.
 * - start: ISO date "YYYY-MM-DD" (e.g., "2023-01-15")
 * - end: ISO date "YYYY-MM-DD" or null (null = ongoing)
 * Useful for:
 *   - Professional experiences (shows tenure)
 *   - Time-bound projects (shows duration)
 *   - Deprecation notices (archival date)
 */

/**
 * contributors (optional, Contributor[])
 * People involved in the project/experience.
 * Each Contributor:
 * - name: full name
 * - role: optional job title or role (e.g., "Lead Designer", "Backend Lead")
 * - url: optional website/LinkedIn/GitHub URL
 * Useful for:
 *   - Team projects (shows collaboration)
 *   - Highlighting mentorship (who you worked with)
 *   - Assigning credit
 */

/**
 * visual (optional, VisualConfig)
 * Customization of the visual appearance.
 * Fields:
 * - starSize: scale multiplier (default 1.0). Use 1.5+ for important projects.
 * - glowIntensity: bloom/glow (0–1, default varies by type)
 * - nebulaTint: hex color for nebula atmosphere around the system
 * - nebulaIntensity: cloud density (0–1, default 0.5)
 * - starModelPath: path to custom .glb model (instead of procedural sphere)
 * 
 * Example:
 *   visual: {
 *     starSize: 1.8,
 *     glowIntensity: 0.9,
 *     nebulaTint: "#ff69b4",
 *     nebulaIntensity: 0.6,
 *   }
 */

/**
 * discovery (optional, DiscoveryConfig)
 * Controls how the system is discovered.
 * Fields:
 * - hidden: if true, system doesn't appear in proximity indicators or map (easter egg)
 * - featured: if true, gets priority in indicators and marked on map
 * - proximityDistance: custom distance at which indicator appears (default ~50 units)
 * - proximityIcon: emoji to show in indicator instead of default
 * 
 * Example:
 *   discovery: {
 *     featured: true,
 *     proximityIcon: "🚀",
 *     proximityDistance: 60,
 *   }
 */

/**
 * links (optional, Link[])
 * System-level links (outside of planets).
 * Common:
 * - Live site / deployment
 * - GitHub repository
 * - Case study or writeup
 * - Live demo
 * 
 * Each Link:
 * - label: display text (e.g., "Live", "GitHub", "Case Study")
 * - url: full URL
 * - icon: optional icon name for UI rendering (e.g., "github", "link", "youtube")
 */

/**
 * metadata (optional, SEO Metadata)
 * For social sharing and SEO.
 * Fields:
 * - description: ~160 chars for social card snippets
 * - imageUrl: path to image for social sharing (e.g., "/preview-images/project.png")
 * - keywords: array of search keywords (for internal search feature, if added)
 * 
 * Enables shareable deep links like:
 *   yoursite.com/?system=my-awesome-project
 */

/**
 * relations (optional, RelationConfig)
 * Links between systems for "related projects" features.
 * Fields:
 * - relatedSystems: IDs of similar/related projects
 * - predecessor: ID of project this evolved from
 * - successors: IDs of projects that evolved from this one
 * 
 * Example: v2 of a project links to its v1 predecessor.
 */

/**
 * flags (optional, Flags)
 * Special status flags.
 * Fields:
 * - archived: if true, system is legacy/old. Show visually dimmed or faded.
 * - experimental: if true, WIP/"beta". May show badge.
 * - openSource: { enabled, license?, repositoryUrl? }
 *   Marks the project as open source with license info.
 * 
 * Example:
 *   flags: {
 *     archived: false,
 *     experimental: true,
 *     openSource: { enabled: true, license: "MIT" }
 *   }
 */

/**
 * custom (optional, Record<string, unknown>)
 * Arbitrary extensibility field for future app-specific data.
 * Don't use unless you have a specific use case.
 */

/**
 * ---
 */

/**
 * PLANET FIELDS
 * =============
 * 
 * id (required)
 * Unique within the system. e.g., "overview", "tech-stack", "outcome"
 * 
 * name (required)
 * Display name. e.g., "Overview", "Tech Stack", "Key Achievement"
 * 
 * description (required)
 * 100–300 character description. This is what appears in the info HUD.
 * 
 * tags (required)
 * Array of strings. Tech stack, skills, outcomes, keywords.
 * Examples: ["React", "TypeScript", "Performance", "User Growth"]
 * 
 * links (required)
 * Array of {label, url, icon?}. Can be empty.
 * 
 * orbitRadius (required)
 * Distance from star in world units. Recommend 6–18.
 * Impacts visual spacing. Larger radius = further away = harder to see.
 * 
 * modelPath (optional)
 * Path to custom .glb file for this planet's geometry.
 * If null/omitted, uses procedural generation.
 * 
 * moons (optional)
 * Sub-details orbiting this planet. Array of Moon objects.
 * Useful for showcasing achievements under a planet.
 * 
 * color (optional)
 * Hex color for this specific planet. Overrides system's derived color.
 * 
 * glowIntensity (optional)
 * Bloom intensity (0–1). Overrides system default.
 * 
 * featured (optional)
 * If true, appears first in planet list or highlighted in UI.
 * Use for the most important planet in the system.
 * 
 * complexity (optional)
 * Difficulty level (1–5). Useful for sorting/filtering.
 * 1 = simple, 5 = highly complex.
 * 
 * ---
 */

/**
 * MOON FIELDS
 * ===========
 * 
 * id (required)
 * Unique within parent (planet or system). e.g., "achievement-1"
 * 
 * name (required)
 * Display name. e.g., "Won first place", "100% Uptime"
 * 
 * description (required)
 * Brief description. Keep under 100 characters.
 * 
 * orbitRadius (required)
 * Distance from parent. Recommend 2–4 for planet moons.
 * 
 * badge (optional)
 * Emoji or icon for quick visual identification.
 * Examples: "⭐", "🏆", "🚀", "🎯"
 * 
 * ---
 */

/**
 * POSITIONING STRATEGY
 * ====================
 * 
 * The placement of systems in 3D space tells a story.
 * Consider these zones:
 * 
 * CENTER (±30 units around origin [0, 0, 0])
 *   - About Me space station
 *   - Major work experience(s)
 *   - Flagship projects
 *   - Most prominent, largest visuals
 * 
 * MID RING (50–120 units from origin)
 *   - Core portfolio projects
 *   - Major professional achievements
 *   - Skill groups (asteroid belts)
 *   - Medium size, bright colors
 * 
 * OUTER RING (120+ units)
 *   - Side projects
 *   - Hobby work
 *   - Archived/legacy projects
 *   - Smaller, dimmer visuals
 * 
 * VERTICAL SPREAD (±50 to ±100 Y axis)
 *   - Use height to separate unrelated projects
 *   - Creates visual variety
 *   - Prevents visual clutter
 * 
 * EXAMPLE LAYOUT:
 *   [0, 0, 0]           – About Me station
 *   [30, 0, 40]         – Senior Frontend Dev (experience)
 *   [50, 20, -50]       – Flagship Project #1
 *   [100, -40, 80]      – Flagship Project #2
 *   [150, 60, -100]     – Side Project #1
 *   [120, -30, 100]     – Side Project #2
 * 
 * ---
 */

/**
 * COLOR PALETTE GUIDANCE
 * ======================
 * 
 * Choose colors that:
 * 1. Are visually distinct from neighbors (avoid clustering similar colors)
 * 2. Reflect the project's personality or domain
 * 3. Work in a space environment (avoid very dark colors, very pale colors may be hard to see)
 * 4. Have good contrast against the dark space background
 * 
 * EXAMPLE PALETTE:
 *   - Blue family: #4f8eff (sky blue), #0066ff (deep blue), #87ceeb (light blue)
 *   - Pink/Magenta: #ff6b9d, #ff1493, #ff69b4
 *   - Green: #00ff88 (neon green), #00dd99 (teal green)
 *   - Yellow/Gold: #ffd700, #ffed4e, #ffaa00
 *   - Purple: #9d4edd, #6a5acd, #7851a9
 *   - Cyan: #00ffff, #00d9ff
 * 
 * TOOLS:
 *   - https://coolors.co — Generate color palettes
 *   - https://colorhexa.com — Verify hex colors and get info
 *   - https://accessible-colors.com — Check contrast
 * 
 * ---
 */

/**
 * LINKS & TAGGING BEST PRACTICES
 * ===============================
 * 
 * LINKS
 * - Every planet should have 1–3 links
 * - Common link types & icons:
 *   { label: "Live", url: "https://example.com", icon: "link" }
 *   { label: "GitHub", url: "https://github.com/...", icon: "github" }
 *   { label: "Case Study", url: "https://...", icon: "document" }
 *   { label: "YouTube", url: "https://youtube.com/...", icon: "youtube" }
 *   { label: "Design", url: "https://figma.com/...", icon: "figma" }
 * 
 * TAGS
 * - Tech stack: "React", "TypeScript", "Node.js", "PostgreSQL"
 * - Domains: "3D", "Performance", "Design Systems", "Mobile"
 * - Outcomes: "User Growth", "Performance Improvement", "Team Leadership"
 * - Skills: "Problem Solving", "Communication", "Mentorship"
 * - 3–6 tags per planet
 * 
 * ---
 */

/**
 * EXAMPLES BY TYPE
 * ================
 * 
 * PROJECT (Major work)
 *   position: Central or mid-ring
 *   starColor: Vibrant (blue, purple, teal, warm pink)
 *   planets: 3–4 (overview, tech stack, key features/outcome, optional)
 *   visual.starSize: 1.3–2.0 (prominent)
 *   glowIntensity: 0.8–1.0
 *   discovery.featured: true (for important ones)
 * 
 * SIDE-PROJECT (Hobby, smaller scale)
 *   position: Mid to outer ring
 *   starColor: Softer or more saturated version of main colors
 *   planets: 1–2 (keep simple)
 *   visual.starSize: 0.8–1.0 (smaller)
 *   glowIntensity: 0.5–0.7 (dimmer)
 * 
 * EXPERIENCE (Job role)
 *   position: Center
 *   starColor: Warm, welcoming (gold, warm pink, orange)
 *   planets: 3–5 (role overview, key projects, metrics, skills learned)
 *   visual.starSize: 2.0+ (large, prominent)
 *   glowIntensity: 0.9–1.0 (bright)
 *   dates: { start, end } — important!
 *   contributors: List team/leadership
 * 
 * SKILL (Grouped)
 *   position: Scattered, forming belt or cluster
 *   starColor: Cool, neutral (cyan, cool green, cool gray)
 *   planets: 4–6 (organized by domain)
 *   visual.starSize: 1.0–1.2
 *   glowIntensity: 0.6–0.8
 *   discovery.featured: false
 * 
 * ABOUT (Special)
 *   position: Center [0, 0, 0] or nearby
 *   starColor: White, gold, or signature color
 *   planets: 2–3 (bio, contact, resume)
 *   visual.starModelPath: custom space station model
 *   type: "about" (unique)
 *   discovery.featured: true
 * 
 * ---
 */

/**
 * TROUBLESHOOTING
 * ===============
 * 
 * "System doesn't appear in galaxy"
 *   - Check: id, name, position, type, starColor, planets array (not empty)
 *   - Verify: JSON/TypeScript syntax is correct, no trailing commas in wrong places
 *   - Check: position coordinates make sense (not 0,0,0 if that's where About is)
 * 
 * "Planet isn't clickable"
 *   - Check: planet.id and planet.name are defined
 *   - Check: planet.orbitRadius is a reasonable number (6–18)
 *   - Verify: system is visible in galaxy first
 * 
 * "Colors look wrong / too dim"
 *   - Check: starColor hex is valid (e.g., #ff0000 not ff0000)
 *   - Try: increase glowIntensity in visual config
 *   - Try: ensure your background is dark (should be #060810 per design doc)
 * 
 * "Info panel is cut off / text too small"
 *   - Keep descriptions under 300 characters
 *   - Keep names under 50 characters
 *   - Use 3–6 tags (not more)
 *   - Limit links to 3 per planet
 * 
 * "Too much visual clutter"
 *   - Reduce nebulaIntensity in visual config
 *   - Reduce glowIntensity
 *   - Spread systems further apart spatially
 *   - Hide less important systems with discovery.hidden = true
 * 
 * ---
 */

/**
 * MIGRATION / UPDATING
 * ====================
 * 
 * If you need to update systems:
 * 
 * 1. RENAME/REORGANIZE
 *    - Rename system.id? Update everywhere it's referenced (deep links, relations)
 *    - Move position? Just update the [x, y, z] array
 * 
 * 2. ADD FIELDS
 *    The schema is backwards-compatible. Add new fields with confidence.
 *    Missing optional fields default to reasonable values.
 * 
 * 3. DEPRECATE
 *    - Set flags.archived = true (shows as faded/old)
 *    - Set visual.glowIntensity to low value
 *    - Move position to outer ring or near archive area
 *    - Add deprecation note to description
 * 
 * 4. BULK OPERATIONS
 *    Use TypeScript utilities:
 * 
 *      // Find all projects of a type
 *      const projects = systems.filter(s => s.type === "project");
 * 
 *      // Get all tags across all planets
 *      const allTags = systems
 *        .flatMap(s => s.planets)
 *        .flatMap(p => p.tags);
 * 
 *      // Deep link URL for a system
 *      const deepLink = (systemId: string) =>
 *        `https://yoursite.com/?system=${systemId}`;
 * 
 * ---
 */

/**
 * CHECKLIST FOR NEW SYSTEMS
 * ==========================
 * 
 * Before committing a new system, verify:
 * 
 * ☑ id is unique and kebab-case (no spaces, lowercase)
 * ☑ name is descriptive and under 50 chars
 * ☑ position [x, y, z] is within ±200 and not too close to others
 * ☑ type is one of the 5 allowed values
 * ☑ starColor is a valid hex (e.g. #ff0000, #abcdef)
 * ☑ planets array has at least 1 planet with...
 *   ☑ Unique id (within system)
 *   ☑ Non-empty name
 *   ☑ Description 100–300 chars
 *   ☑ Valid tags array (3–6 items)
 *   ☑ Valid links array
 *   ☑ orbitRadius 6–18
 * ☑ Optional fields are well-formed (no typos in field names)
 * ☑ JSON/TS syntax is valid (test: npm run type-check)
 * ☑ Color scheme is visually distinct from nearby systems
 * ☑ Sample content is not copy-pasted (customize!)
 * 
 * ---
 */

/**
 * NEXT STEPS
 * ==========
 * 
 * With the schema defined, you're ready to:
 * 
 * 1. Populate src/data/systems.ts with your real portfolio content
 * 2. Create the System Renderer (Phase 2.2) to display these in 3D
 * 3. Implement Planet Interaction (Phase 2.3) for clicking/proximity triggers
 * 4. Build the Info HUD Panel to display planet details
 * 5. Create the Galaxy Map UI for fast travel
 * 
 * The data layer is now decoupled from rendering — you can iterate on
 * content without touching code, and iterate on rendering without
 * changing data structure.
 * 
 * Good luck! 🚀
 * 
 * ---
 * Draft: April 2026
 */
