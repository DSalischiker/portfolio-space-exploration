/**
 * Data Schema for Space Portfolio Systems & Planets
 * 
 * This file defines the complete TypeScript interfaces for systems (projects/experiences)
 * and their child elements (planets/moons). The schema is designed to be:
 * - Extensible: adding new systems requires only a data entry, never code changes
 * - Visual: supports deep customization of appearance per system
 * - Content-rich: captures all metadata needed for portfolio, discovery, and analytics
 * - Maintainable: clear field purposes, sensible defaults, minimal required fields
 */

/**
 * A Moon — a minor detail orbiting a Planet
 * Used for sub-points, achievements, or additional context
 */
export interface Moon {
  /** Unique ID within the parent planet. e.g. "achievement-1" */
  id: string;

  /** Display name. e.g. "Won first place" */
  name: string;

  /** Brief description. Keep under 100 characters */
  description: string;

  /** Distance from parent planet in world units. Recommend 2–4 */
  orbitRadius: number;

  /** Optional mood/emoji/badge for quick visual identification */
  badge?: string;
}

/**
 * A Planet — a clickable detail or aspect of a System
 * Represents a key facet of a project, skill, or experience
 */
export interface Planet {
  /** Unique ID within the system. e.g. "overview", "tech-stack", "outcome" */
  id: string;

  /** Display name. e.g. "Overview", "Tech Stack", "Key Achievement" */
  name: string;

  /** Detailed description. Appears in the info panel. ~200–300 chars recommended */
  description: string;

  /** Technology tags, skills, outcomes. e.g. ["React", "TypeScript", "Database Design"] */
  tags: string[];

  /** External links: live demo, GitHub, case study, etc. */
  links: Link[];

  /** Distance from system star in world units. Recommend 6–15 */
  orbitRadius: number;

  /** Optional path to a custom .glb model. If null, uses procedural geometry */
  modelPath?: string | null;

  /** Optional: sub-details orbiting this planet */
  moons?: Moon[];

  /** Optional: custom planet color. Overrides system's derived color */
  color?: string;

  /** Optional: intensity of bloom/glow effect (0–1). Default inherits from system */
  glowIntensity?: number;

  /** Optional: mark as a "featured" planet. Appears first or highlighted in UI */
  featured?: boolean;

  /** Optional: complexity/difficulty level (1–5). Useful for filtering or sorting */
  complexity?: 1 | 2 | 3 | 4 | 5;
}

/**
 * A System — a solar system representing a project, experience, or skill group
 * The top-level container for a portfolio entry
 */
export interface System {
  /** Unique identifier slug. e.g. "my-awesome-project", "senior-frontend-dev" */
  id: string;

  /** Display name. e.g. "My Awesome Project", "Senior Frontend Developer (2023-2025)" */
  name: string;

  /** 3D world position [x, y, z]. Units are arbitrary but should be consistent */
  position: [number, number, number];

  /**
   * System type determines visual style and location in the galaxy:
   * - "project": major portfolio project, centered in middle ring
   * - "side-project": smaller projects, outer ring, dimmer visuals
   * - "experience": professional role/company, large central system
   * - "skill": grouped in an asteroid belt, non-interactive individually
   * - "about": special space station near center
   */
  type: "project" | "side-project" | "experience" | "skill" | "about";

  /** Hex color of the system's star. e.g. "#4f8eff" */
  starColor: string;

  /** Planets orbiting this star. Each is a clickable detail/aspect */
  planets: Planet[];

  /** Optional: moons of the star itself (system-level details) */
  moons?: Moon[];

  /** Optional: brief tagline or subtitle. Appears in galaxy map and proximity indicator */
  tagline?: string;

  /** Optional: long-form description. Appears in the about section of the info panel */
  description?: string;

  /** Optional: metadata tags for filtering, search, or categorization */
  categories?: string[];

  /**
   * Optional: dates associated with the system
   * Useful for experiences, projects with timelines, or deprecation notices
   */
  dates?: {
    /** Start date. ISO 8601 format: "2023-01-15" */
    start?: string;
    /** End date. Null means ongoing/current */
    end?: string | null;
  };

  /**
   * Optional: people involved (authors, collaborators, leads)
   * Useful for team projects, experiences, or case studies showing team composition
   */
  contributors?: {
    /** Full name */
    name: string;
    /** Optional: role/title. e.g. "Lead Designer", "Backend Architect" */
    role?: string;
    /** Optional: personal website, LinkedIn, GitHub profile URL */
    url?: string;
  }[];

  /**
   * Optional: customization of the visual appearance
   * Allows for system-specific styling beyond just the star color
   */
  visual?: {
    /** Scale multiplier for the star. Larger systems get bigger stars. Default 1.0 */
    starSize?: number;
    /** Bloom/glow intensity of the star (0–1). Default depends on type. e.g. 0.8 */
    glowIntensity?: number;
    /** Optional: nebula/atmosphere color distinct from star. e.g. "#ff69b4" */
    nebulaTint?: string;
    /** Optional: density of nebula cloud around the system (0–1). Default 0.5 */
    nebulaIntensity?: number;
    /** Custom model for the star instead of procedural sphere. Path to .glb */
    starModelPath?: string;
  };

  /**
   * Optional: discovery & visibility metadata
   * Affects how and when the system appears to visitors
   */
  discovery?: {
    /** If true, system is hidden by default (easter egg, hidden project, etc.) */
    hidden?: boolean;
    /** If true, prioritize in proximity indicators and galaxy map. Useful for key projects */
    featured?: boolean;
    /** Custom distance at which proximity indicator appears. Default 50 world units */
    proximityDistance?: number;
    /** If provided, shows this emoji/icon in proximity indicator instead of default */
    proximityIcon?: string;
  };

  /**
   * Optional: links at the system level (outside of planets)
   * e.g. overall project GitHub, live deployment, case study, etc.
   */
  links?: Link[];

  /**
   * Optional: SEO & social metadata
   * Enables sharing of specific systems and improves discovery
   */
  metadata?: {
    /** Brief description for social sharing & SEO (160 chars) */
    description?: string;
    /** Path to image for social sharing (e.g. "/preview-images/my-project.png") */
    imageUrl?: string;
    /** Custom keywords for internal search/filtering */
    keywords?: string[];
  };

  /**
   * Optional: relationship to other systems
   * Useful for showing "related projects", dependencies, or evolution
   */
  relations?: {
    /** IDs of related/similar systems */
    relatedSystems?: string[];
    /** If this system evolved from or depends on another, link it */
    predecessor?: string;
    /** Systems that evolved from this one */
    successors?: string[];
  };

  /**
   * Optional: flags for special cases and future extensibility
   */
  flags?: {
    /** If true, system is archived/legacy. May show visually dimmed or faded */
    archived?: boolean;
    /** If true, system is experimental/WIP. May show "beta" badge */
    experimental?: boolean;
    /** If true, this system was licensed under open source. Include license type */
    openSource?: {
      enabled: boolean;
      license?: string; // e.g. "MIT", "Apache-2.0"
      repositoryUrl?: string;
    };
  };

  /** Optional: arbitrary custom data for future extensions or app-specific use */
  custom?: Record<string, unknown>;
}

/**
 * A hyperlink with label and URL
 * Used in multiple contexts: planet links, system links, contributor links
 */
export interface Link {
  /** Display text. e.g. "Live Demo", "GitHub", "Case Study" */
  label: string;
  /** Full URL. e.g. "https://example.com" */
  url: string;
  /** Optional: icon name (e.g. "github", "link", "youtube") for UI rendering */
  icon?: string;
}

/**
 * Type guard to validate a System at runtime
 * Checks required fields; optional fields are not validated
 */
export function isValidSystem(system: unknown): system is System {
  if (!system || typeof system !== "object") return false;

  const s = system as Record<string, unknown>;

  // Required fields
  if (
    typeof s.id !== "string" ||
    typeof s.name !== "string" ||
    !Array.isArray(s.position) ||
    s.position.length !== 3 ||
    !["project", "side-project", "experience", "skill", "about"].includes(
      s.type as string
    ) ||
    typeof s.starColor !== "string" ||
    !Array.isArray(s.planets)
  ) {
    return false;
  }

  // Optional field shape checks (sample-based validation)
  if (s.contributors && !Array.isArray(s.contributors)) return false;
  if (s.links && !Array.isArray(s.links)) return false;
  if (s.dates && typeof s.dates !== "object") return false;
  if (s.visual && typeof s.visual !== "object") return false;
  if (s.metadata && typeof s.metadata !== "object") return false;

  return true;
}

/**
 * Factory function for creating a minimal System
 * Useful for quick prototyping or template generation
 */
export function createSystem(
  id: string,
  name: string,
  position: [number, number, number],
  type: System["type"],
  starColor: string,
  planets: Planet[] = []
): System {
  return {
    id,
    name,
    position,
    type,
    starColor,
    planets,
  };
}

/**
 * Factory function for creating a minimal Planet
 */
export function createPlanet(
  id: string,
  name: string,
  description: string,
  orbitRadius: number,
  tags: string[] = [],
  links: Link[] = []
): Planet {
  return {
    id,
    name,
    description,
    tags,
    links,
    orbitRadius,
  };
}
