---
name: space-portfolio-schema
description: Create, validate, and maintain space portfolio system data. Use when adding new projects, experiences, or skills to the portfolio galaxy, or when understanding the data schema requirements. Handles System, Planet, and Moon object creation with full field reference and best practices.
---

# Space Portfolio Schema — System & Planet Data

## Overview

The space portfolio uses a three-level data hierarchy to represent portfolio content:

```
System (Solar System)
  ├─ Planet (Clickable detail/aspect)
  │  └─ Moon (Sub-detail)
  └─ Moon (System-level achievement)
```

**System** = Project, experience, skill group, or About Me section  
**Planet** = Key facet (overview, tech stack, key achievement, etc.)  
**Moon** = Secondary detail or sub-achievement

All data lives in `src/data/systems.ts` and is typed by `src/types/systems.ts`.

---

## Core Schema Rules

### System (Top Level)

Every System requires:
- `id` — unique slug, lowercase, no spaces (e.g., "my-awesome-project")
- `name` — display name, any format (e.g., "My Awesome Project")
- `position` — [x, y, z] coordinates in world space (recommend ±200 range)
- `type` — one of: `"project"`, `"side-project"`, `"experience"`, `"skill"`, `"about"`
- `starColor` — hex color for the system's star (e.g., "#4f8eff")
- `planets` — array of Planet objects (minimum 1 planet)

Optional System fields:
- `tagline` — short subtitle (max 80 chars)
- `description` — long-form description (200–400 chars)
- `categories` — tags for filtering
- `dates` — { start, end } ISO dates for timelines
- `contributors` — array of { name, role, url }
- `visual` — { starSize, glowIntensity, nebulaTint, nebulaIntensity, starModelPath }
- `discovery` — { hidden, featured, proximityDistance, proximityIcon }
- `links` — array of { label, url, icon }
- `metadata` — { description, imageUrl, keywords } for SEO/sharing
- `relations` — { relatedSystems, predecessor, successors }
- `flags` — { archived, experimental, openSource: { enabled, license, repositoryUrl } }
- `custom` — arbitrary extensibility object

### Planet (Second Level)

Every Planet requires:
- `id` — unique within the system (e.g., "overview", "tech-stack")
- `name` — display name
- `description` — 100–300 character description
- `tags` — array of tech/skill tags (3–6 items)
- `links` — array of { label, url, icon? } (can be empty)
- `orbitRadius` — distance from star (recommend 6–18 world units)

Optional Planet fields:
- `modelPath` — path to custom .glb model
- `moons` — array of Moon objects
- `color` — hex color for this planet
- `glowIntensity` — bloom intensity (0–1)
- `featured` — if true, appears first/highlighted
- `complexity` — difficulty level (1–5)

### Moon (Third Level)

Every Moon requires:
- `id` — unique within parent
- `name` — display name
- `description` — brief description (max 100 chars)
- `orbitRadius` — distance from parent (recommend 2–4 for planet moons)

Optional Moon fields:
- `badge` — emoji or icon

---

## Type-Specific Guidance

| Type | Position | Star Color | Planets | Size | Glow | Featured |
|------|----------|-----------|---------|------|------|----------|
| **project** | Center/mid-ring | Vibrant (blue, purple, teal, pink) | 3–4 | 1.3–2.0 | 0.8–1.0 | Yes (important) |
| **side-project** | Mid/outer ring | Softer colors | 1–2 | 0.8–1.0 | 0.5–0.7 | No |
| **experience** | Center | Warm (gold, warm pink, orange) | 3–5 | 2.0+ | 0.9–1.0 | Yes |
| **skill** | Scattered (belt) | Cool (cyan, green, gray) | 4–6 | 1.0–1.2 | 0.6–0.8 | No |
| **about** | Center [0,0,0] | White/gold/signature | 2–3 | 1.0 | 1.0 | Yes |

---

## Spatial Layout Strategy

- **Center (±30 units)** — About Me, major work experience, flagship projects
- **Mid Ring (50–120 units)** — Core portfolio projects, skill groups, solid achievements
- **Outer Ring (120+ units)** — Side projects, hobby work, archived projects
- **Vertical spread (±50–100 Y)** — Use height to avoid visual clutter and group related projects

---

## Adding a New System — 3-Step Template

### Step 1: Pick Your Values

```typescript
const id = "project-slug";              // unique kebab-case ID
const name = "Project Name";            // display name
const position = [x, y, z];             // [x, y, z] coordinates
const type = "project";                 // type enum
const starColor = "#4f8eff";            // hex color
```

### Step 2: Create the System Object

```typescript
{
  id,
  name,
  position,
  type,
  starColor,
  tagline: "Short description",
  planets: [
    {
      id: "overview",
      name: "Overview",
      description: "What is this project?",
      tags: ["React", "TypeScript"],
      links: [
        { label: "Live", url: "https://..." }
      ],
      orbitRadius: 8,
    }
  ],
}
```

### Step 3: Add to systems.ts

Add it to the `systems` array in `src/data/systems.ts`. It automatically appears in the galaxy!

---

## Color Palette Tips

- Use https://coolors.co to generate harmonious palettes
- Ensure good contrast against dark space background (#060810)
- Avoid clustering similar colors near each other
- Reflect project personality/domain in color choice
- Example palette:
  - Blues: #4f8eff, #0066ff, #87ceeb
  - Pinks: #ff6b9d, #ff1493, #ff69b4
  - Greens: #00ff88, #00dd99
  - Golds: #ffd700, #ffed4e, #ffaa00
  - Purples: #9d4edd, #6a5acd, #7851a9

---

## Validation Checklist

Before committing a new system:

- ✓ `id` is kebab-case, unique across all systems
- ✓ `name` is descriptive, under 50 chars
- ✓ `position` is within ±200 and not too close to others
- ✓ `type` is one of the 5 enum values
- ✓ `starColor` is valid hex (e.g., #ff0000, #abcdef)
- ✓ Each planet has: id, name, description (100–300 chars), tags (3–6), links[], orbitRadius (6–18)
- ✓ JSON/TypeScript syntax is valid (run `npm run type-check`)
- ✓ Color scheme is visually distinct from nearby systems
- ✓ Content is custom (not copy-pasted examples)

---

## Reference Files

| File | Purpose |
|------|---------|
| `src/types/systems.ts` | Full TypeScript interfaces with JSDoc |
| `src/data/systems.ts` | Data entries + 8 example systems |
| `src/data/SCHEMA_GUIDE.md` | Detailed guide (20+ sections) |
| `project-roadmap/world-design-document.md` | Design constraints & content structure |

---

## ⚠️ CRITICAL: Keep Everything in Sync

**If you modify the schema (types, fields, or requirements), you MUST update all of the following:**

1. **`src/types/systems.ts`**
   - Update interface definitions
   - Add/remove/change optional fields
   - Update JSDoc comments
   - Update `isValidSystem()` type guard if needed

2. **`src/data/systems.ts`**
   - Update all 8 example systems to use new schema
   - Ensure examples demonstrate all new features
   - Verify no TypeScript compilation errors

3. **`src/data/SCHEMA_GUIDE.md`**
   - Update field reference section with new fields
   - Add new type-specific guidance sections if needed
   - Update examples and best practices
   - Update checklist items

4. **`project-roadmap/world-design-document.md`**
   - If this is a breaking schema change, update Section 9 (System data schema)
   - Update example entries if structure changes significantly
   - Add notes to Section 10 (Open Questions) if new decisions were made

5. **This Skill File (`SKILL.md`)**
   - Update Core Schema Rules section
   - Update Type-Specific Guidance table if needed
   - Update Template section
   - Update Reference Files table if paths changed
   - Update this Sync Instructions section to reflect new requirements

**Sync Process:**
1. Stop — don't make partial changes
2. Make the type change in `src/types/systems.ts`
3. Update examples in `src/data/systems.ts` to match
4. Edit `SCHEMA_GUIDE.md` to document the new field(s)
5. Check `world-design-document.md` — update if it documents the schema structure
6. Update this skill file to match
7. Run `npm run type-check` to verify everything compiles

---

## Common Modifications & Their Impact

| Change | Type | Guide | Examples | World Doc | Skill |
|--------|------|-------|----------|-----------|-------|
| Add optional field | ✓ | ✓ | ✓ | Check | ✓ |
| Remove field | ✓ | ✓ | Update | Check | ✓ |
| Change field type | ✓ | ✓ | ✓ | Check | ✓ |
| Add new system type | ✓ | ✓ | Add example | ✓ | ✓ |
| Change validation rules | ✓ | ✓ | ✓ | Check | ✓ |

---

## Examples

### Example 1: Simple Side Project

```typescript
{
  id: "color-generator",
  name: "Color Palette Generator",
  position: [120, -40, 100],
  type: "side-project",
  starColor: "#ffd700",
  planets: [
    {
      id: "overview",
      name: "Overview",
      description: "AI-powered color palette generation from a single seed color.",
      tags: ["React", "AI", "Design Tools"],
      links: [{ label: "Try It", url: "https://example.com" }],
      orbitRadius: 8,
    }
  ],
}
```

### Example 2: Full-Featured Project

```typescript
{
  id: "flagship-project",
  name: "My Flagship Project",
  position: [50, 20, -50],
  type: "project",
  starColor: "#4f8eff",
  tagline: "A 3D interactive experience",
  description: "Built with React Three Fiber...",
  planets: [
    {
      id: "overview",
      name: "Overview",
      description: "Project description",
      tags: ["React", "Three.js", "TypeScript"],
      links: [
        { label: "Live", url: "https://example.com" },
        { label: "GitHub", url: "https://github.com/user/project" }
      ],
      orbitRadius: 8,
      featured: true,
    },
    {
      id: "tech",
      name: "Tech Stack",
      description: "Technologies used...",
      tags: ["React Three Fiber", "Drei", "GSAP"],
      links: [],
      orbitRadius: 12,
    }
  ],
  visual: { starSize: 1.5, glowIntensity: 0.9 },
  discovery: { featured: true },
}
```

### Example 3: Experience with Dates & Contributors

```typescript
{
  id: "senior-dev-role",
  name: "Senior Frontend Developer",
  position: [-30, 0, 40],
  type: "experience",
  starColor: "#ff6b9d",
  dates: { start: "2023-01-15", end: "2025-01-31" },
  contributors: [
    { name: "You", role: "Tech Lead" },
    { name: "Team Member", role: "Backend Lead" }
  ],
  planets: [
    {
      id: "role",
      name: "Role Overview",
      description: "Led 4-person frontend team...",
      tags: ["Leadership", "React", "Performance"],
      links: [],
      orbitRadius: 10,
      featured: true,
    }
  ],
}
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| System doesn't appear | Check: id, name, position, type, starColor, planets (not empty) |
| Planet isn't clickable | Check: planet id, name, description, orbitRadius (6–18) |
| Colors look wrong | Verify hex code is valid; increase glowIntensity |
| TypeScript error | Run `npm run type-check`; check syntax |
| Info panel cut off | Reduce description length, keep under 300 chars |

---

## Next Steps

After creating a new system:

1. Run `npm run type-check` to verify schema compliance
2. Test in the 3D renderer (Phase 2.2)
3. Verify planet triggering and proximity detection (Phase 2.3)
4. Check info HUD panel display (Phase 3.1)

---

*Last updated: April 8, 2026*  
*Version: 1.0 — Architecture Complete*
