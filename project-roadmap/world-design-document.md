# World Design Document — Space Portfolio

**Author:** Diego Salischiker  
**Version:** 1.0  
**Updated:** April 2026  
**Status:** Living document — update as design decisions are made during development.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Core Concept](#2-core-concept)
3. [Navigation & Camera](#3-navigation--camera)
4. [Interaction & Discovery](#4-interaction--discovery)
5. [Universe Content Structure](#5-universe-content-structure)
6. [Visual Tone & Aesthetic](#6-visual-tone--aesthetic)
7. [About Me — Space Station](#7-about-me--space-station)
8. [Onboarding Sequence](#8-onboarding-sequence)
9. [Extensibility — Adding New Systems](#9-extensibility--adding-new-systems)
10. [Open Questions & Future Decisions](#10-open-questions--future-decisions)

---

## 1. Overview

This document defines the creative and technical design of the Space Portfolio — a Three.js interactive experience where visitors pilot a rocket through a procedurally arranged galaxy. Each solar system in the galaxy represents a project, role, or skill from Diego's professional life.

This document is the authoritative reference for navigation, interaction, visual tone, content structure, and extensibility. It should be consulted before implementing any feature and updated whenever a design decision is made.

---

## 2. Core Concept

The visitor arrives in space. A rocket — their vessel — appears after a short cinematic intro. From here, they are free to fly in any direction through a galaxy of solar systems. Each system is a cluster of a star, orbiting planets, and moons. Flying close to or clicking on a planet reveals a project or experience. The galaxy is intentionally spatial: the arrangement of systems reflects the structure of Diego's career.

> **Design principle:** the space IS the portfolio. Navigation is not a metaphor layered on top of a resume — it is the resume.

---

## 3. Navigation & Camera

### 3.1 Flight mode

Full free-flight in all three axes. The visitor has complete 3D freedom — they can fly up, down, sideways, and in any diagonal. There is no fixed plane or guided path.

| Property | Value |
|---|---|
| Control scheme | Keyboard (WASD / arrow keys) + mouse for direction |
| Mobile | On-screen joystick-style touch input |
| Gamepad | Supported — analog sticks for direction and throttle |
| Movement feel | Lerp-based smooth acceleration, not instant. Subtle inertia on stop. |
| Speed | Two modes: normal cruise and boost (hold Shift / right trigger) |

### 3.2 Camera

Third-person perspective. The camera follows behind the rocket at a fixed offset, with a subtle lag — it chases the rocket rather than being rigidly attached. This gives the flight a cinematic feel and makes the rocket always visible as a reference point.

| Property | Value |
|---|---|
| Camera offset | Behind and slightly above the rocket |
| Camera lag | ~0.08–0.12 lerp factor (to be tuned during implementation) |
| Zoom on docking | Camera slowly pushes in when a planet is triggered |
| Collision | No camera collision with geometry — camera passes through objects |

### 3.3 Scale

Mixed scale. Within a solar system, planets are closely spaced — the visitor can see the whole system from a short distance and quickly navigate between planets. Between systems, distances are long and feel like genuine journeys through open space. This contrast reinforces the idea that each system is a self-contained world worth exploring.

> **Implementation note:** use logarithmic or non-linear spacing between systems so the universe feels vast without requiring impractical travel times. A fast-travel option (see Section 4) mitigates any frustration.

---

## 4. Interaction & Discovery

### 4.1 Triggering a project

Two trigger methods are supported — both lead to the same outcome:

- **Proximity trigger:** flying the rocket within a defined radius of a planet automatically initiates the approach sequence. No button press required.
- **Click/tap trigger:** clicking or tapping directly on any visible planet from a distance initiates an automated camera fly-to sequence, allowing visitors who prefer not to pilot the rocket to still access all content easily.

> **Note:** the click/tap method is critical for usability. Recruiters should never feel forced to master the flight controls to access portfolio content.

### 4.2 Planet approach sequence

When a planet is triggered (by either method above), the following sequence plays:

1. Flight controls are temporarily disabled
2. Camera smoothly zooms in on the planet over ~1.5–2 seconds (GSAP Timeline)
3. Planet rotates slowly to face the camera
4. Info panel slides in from the side (CSS transition)
5. Controls are re-enabled; visitor can dismiss the panel and resume flying

### 4.3 Discovery & navigation aids

The experience is primarily organic — visitors are encouraged to explore freely. However, three navigation aids are available to ensure no content is missed:

#### Proximity indicator

When a solar system is nearby but not yet in view, a directional arrow indicator appears on the edge of the screen pointing toward it, along with a system name label and approximate distance. Inspired by the TanStack Explore experience (tanstack.com/explore). This prevents visitors from missing systems that are behind them or off-axis.

#### Galaxy map

Accessible via a keyboard shortcut (e.g. `M` or `Tab`) or a visible HUD button. Opens a 2D top-down overlay showing all systems as labeled star icons. The visitor can click any system to initiate an automated camera fly-to sequence. The map closes on the same key press or on click-outside.

#### Onboarding hint

During the first 30 seconds of the experience, a subtle control hint appears on screen showing the basic flight controls. It fades out automatically and can be dismissed early.

---

## 5. Universe Content Structure

The galaxy contains five types of content, each mapped to a spatial metaphor:

| Content type | Spatial metaphor | Notes |
|---|---|---|
| Major projects | Solar system (star + planets + moons) | One system per project. Planets represent key details (stack, role, outcome). Moons are minor sub-details. |
| Work experience | Large central system | Positioned near the center of the galaxy. The most prominent system visually — largest star, most planets. |
| Skills | Asteroid belt | A band of smaller bodies scattered between systems. No individual planet triggering; skills shown as a group. |
| Side projects | Dim outer systems | Smaller stars, fewer planets, positioned further from the center. Visually distinct from major projects. |
| About me | Space station | A unique non-planetary object with a distinct custom model. Positioned near the center. |

---

## 6. Visual Tone & Aesthetic

The visual style is a blend of two directions: **stylized & colorful** (flat/cel-shaded geometry, clear shapes, readable forms) and **soft & dreamy** (pastel nebulas, soft glows, whimsical atmosphere). The result should feel like a hand-crafted indie game — not a NASA simulation, not a generic WebGL demo.

### 6.1 Key visual attributes

- **Color palette:** deep space background (`#060810`) with soft pastel nebula washes (purples, teals, warm pinks). Planet colors are vibrant and saturated, not photorealistic.
- **Geometry:** low-poly stylized forms. Planets are not perfect spheres — slight faceting is acceptable and desirable.
- **Lighting:** single directional star light per system + ambient fill. Bloom post-processing on stars and engine glows.
- **Atmosphere:** soft particle systems for nebula clouds. No hard textures on space itself — all atmospheric effects are additive blended geometry or shaders.
- **Typography (HUD):** monospace font (Space Mono or similar). Translucent dark panels with subtle scanline effect.
- **Motion:** everything eases. No instant transitions. Camera moves, panel reveals, and planet rotations all use eased animation curves.

### 6.2 References

- [TanStack Explore](https://tanstack.com/explore) — navigation UX, proximity indicators, click-to-travel
- Journey (thatgamecompany.com) — soft atmosphere, sense of scale, emotional spatial design
- Outer Wilds — intimate solar systems, curiosity-driven exploration
- Studio Ghibli color palettes — soft, warm, whimsical

---

## 7. About Me — Space Station

The About Me section is represented as a space station — a unique, non-planetary structure with its own custom 3D model. It is positioned near the center of the galaxy, making it one of the first objects a visitor encounters.

### 7.1 Content

- Short personal bio (2–3 sentences)
- Photo or illustrated avatar
- Contact links: email, LinkedIn, GitHub
- CV / resume download link
- Current availability status (e.g. "Open to opportunities")

### 7.2 Visual design

The station should be visually distinct from all planets — a constructed object, not a natural body. Consider a modular design (hexagonal hub + solar panel arms) that reads clearly at small sizes. A subtle slow rotation indicates it is interactive. The approach sequence is the same as for planets: camera zooms in, panel slides in.

> **3D modelling note:** this is a strong candidate for a custom Blender model given its importance and uniqueness. Target under 3k triangles for web performance.

---

## 8. Onboarding Sequence

The first 10–15 seconds of the experience are scripted. The visitor has no control during this sequence. The goal is to establish the world, create wonder, and then hand control to the visitor.

| Time | Event |
|---|---|
| 0s | Black screen. Title fades in: "Diego Salischiker" in a large spaced font. |
| 2s | Subtitle fades in: "Frontend Developer" or a short tagline. |
| 4s | Camera begins a slow pull-back, revealing the galaxy from a high vantage point. Stars appear. Nebula glow fades in. |
| 7s | Camera descends toward the center of the galaxy. The space station and nearest systems become visible. |
| 10s | The rocket spawns with a small engine flare animation. Camera settles into its third-person follow position. |
| 11s | Control hint overlay fades in: "WASD to fly · Click planets to explore · M for map". Fades out after 8 seconds. |
| 11s | Visitor now has full control. |

> **Implementation note:** use GSAP Timeline for all sequencing. All camera moves should use cubic ease-in-out. The sequence should be skippable with any keypress after second 4.

---

## 9. Extensibility — Adding New Systems

A core requirement of this project is that adding a new project or experience to the galaxy requires **no code changes** — only a new data entry. The following rules enforce this:

- All systems are defined in a single data file (`systems.ts` or `systems.json`).
- Each system entry contains: `id`, `name`, `position [x,y,z]`, `type`, `starColor`, and a `planets` array.
- The renderer reads this file and generates all 3D geometry procedurally. No manual scene assembly.
- A new system added to the file will appear in the galaxy, on the galaxy map, and in proximity indicators automatically.
- Custom 3D models (`modelPath` field) are optional — procedural geometry is the default.

> **Target:** adding a new project should take under 30 minutes, including writing the content copy for the info panel.

### System data schema

```ts
interface System {
  id: string;                          // unique slug, e.g. "project-name"
  name: string;                        // display name
  position: [number, number, number];  // [x, y, z] in world units
  type: "project" | "experience" | "skill" | "side-project" | "about";
  starColor: string;                   // hex color for the system's star
  planets: Planet[];
  moons?: Moon[];
}

interface Planet {
  name: string;
  description: string;
  tags: string[];                      // tech stack, skills, etc.
  links: { label: string; url: string }[];
  orbitRadius: number;                 // distance from star in world units
  modelPath?: string | null;           // path to .glb, or null for procedural
}

interface Moon {
  name: string;
  description: string;
  orbitRadius: number;
  parentPlanet: string;                // id of the parent planet
}
```

### Example entry

```ts
{
  id: "project-slug",
  name: "Project Name",
  position: [120, 0, -80],
  type: "project",
  starColor: "#4f8eff",
  planets: [
    {
      name: "Overview",
      description: "Short description of what this project is and what problem it solves.",
      tags: ["React", "Three.js", "TypeScript"],
      links: [
        { label: "Live", url: "https://..." },
        { label: "GitHub", url: "https://github.com/..." }
      ],
      orbitRadius: 8,
      modelPath: null
    }
  ],
  moons: []
}
```

---

## 10. Open Questions & Future Decisions

The following decisions are deferred and should be revisited during implementation:

- [ ] Exact flight speed values and boost multiplier — to be tuned through playtesting.
- [ ] Whether the asteroid belt (skills) has any interactive elements or is purely decorative.
- [ ] Whether the galaxy has a defined boundary or is infinite (infinite is simpler but risks disorientation).
- [ ] Contact form vs. external links only in the About Me station.
- [ ] Whether to support deep links (e.g. `?system=project-name`) from launch or as a later addition.
- [ ] Loading strategy: single load upfront vs. streaming systems as the visitor approaches them.
- [ ] Whether to support a first-person cockpit view toggle as an easter egg.

---

*Living document — update this file as design decisions are made during development.*