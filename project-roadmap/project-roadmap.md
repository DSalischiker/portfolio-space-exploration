# Space Portfolio — Development Roadmap

A living document for building a Three.js space explorer portfolio where the user pilots a rocket through solar systems representing projects and experience.

---

## Phase 1 — Foundation & Architecture
*Estimated time: 2–3 weeks*

### ✦ World design document `design`
Define the universe: scale, navigation style, camera mode, how systems (projects) are laid out in space. Lock this before writing code.

> **Detail:** Decide: first-person or third-person camera? Free-flight or on-rails? How close does the user need to fly to trigger a project card? Can systems be added without breaking the layout? Write 1–2 pages answering these. It'll save weeks of rework.

---

### ⬡ Tech stack decision `code`
Three.js + Vite or React Three Fiber? Decide based on how component-driven the UI panels will be.

> **Detail:** If project info cards are rich (animated, interactive), React Three Fiber + Drei is worth the overhead. If it's mostly 3D with simple overlays, vanilla Three.js + Vite is simpler and faster. Either works — just pick one and commit.

---

### ⬡ Scene scaffold & dev environment `code`
Bootstrap project, set up Three.js scene loop, basic camera controls, ambient starfield. Get something rendering on screen fast.

> **Detail:** Use a procedural starfield (particle system, ~2000 points) rather than a skybox texture — cheaper and easier to tweak. Add stats.js and a GUI panel (lil-dat or Tweakpane) early; you'll use it constantly while building.

---

### ⬡ Data schema for systems & planets `code`
Design the JSON/TS structure that describes each solar system (project) and its planets (details). This is the template everything else plugs into.

> **Detail:** Example fields: `id`, `name`, `position`, `type` (project | experience | skill), `planetColor`, `moons[]`, `description`, `links[]`, `tags[]`, `modelPath` (optional). A good schema makes adding new systems trivial — just add an object.

---

## Phase 2 — Core 3D Experience
*Estimated time: 4–6 weeks*

### ⬡ Rocket controller `code`
Flight physics (simplified), keyboard + mouse/touch input, camera follow rig. The feel of movement is the heart of the experience.

> **Detail:** Use smooth lerp-based movement, not instant. Add subtle camera lag (camera chases the rocket with a delay). Consider gamepad support — it's surprisingly easy and feels great in space games. For mobile: joystick-style touch input.

---

### ⬡ Procedural planet & system renderer `code`
System takes a data object and renders a sun + orbiting planets + moons. Must work for any entry in your schema.

> **Detail:** Use ShaderMaterial for planets — even basic noise-based surface shaders make a huge visual difference. Each planet's color/texture can be seeded from its data ID, making them deterministic and unique without manual art for each one.

---

### ⬡ Proximity detection & UI triggers `code`
When the rocket enters a planet's orbit range, trigger info panel. Raycasting for click/tap interactions.

> **Detail:** Use distance checks per frame (cheap) rather than raycasting everything. Only raycast on pointer events. Animate the info panel in using CSS transitions or GSAP — it should feel like the HUD of a spacecraft.

---

### ◈ Rocket model (hero asset) `asset`
Model or source your rocket. This is the one asset worth spending real time on — the user stares at it the whole visit.

> **Detail:** Model it yourself in Blender if you want something unique — a stylized low-poly rocket (500–1500 tris) is very achievable. Export as `.glb` with baked textures. Add a subtle engine glow effect in Three.js using a PointLight child on the thruster. Sketchfab fallback: search "stylized rocket low poly".

---

### ◈ Ambient audio & sound design `asset`
Space ambience, subtle thruster sound, UI chime on planet discovery. Audio transforms the feel.

> **Detail:** Use the Web Audio API or Howler.js. Freesound.org and ZapSplat have good space/sci-fi sounds. Keep the main ambience loopable and quiet — it should be felt more than heard. Always add a mute button.

---

## Phase 3 — Content & Portfolio Systems
*Estimated time: 3–4 weeks*

### ◉ Map your portfolio to the universe `content`
Decide which projects become systems, which skills become planets, which roles become moons. This is creative work, not just data entry.

> **Detail:** Suggested mapping: major projects = solar systems with multiple planets (one per key detail). Your professional experience = a large system in the center. Skills = a scattered asteroid belt. Side projects = smaller, dimmer systems further out. The spatial metaphor should feel intentional.

---

### ✦ HUD & info panel design `design`
Design the in-world UI: project cards, navigation hints, "you are here" indicator. Must feel like a spacecraft HUD.

> **Detail:** Use CSS for the overlay UI (not 3D objects). A dark translucent panel with a mono font and subtle scan-line effect goes a long way. Include: project name, description, tech stack tags, links. Keep it skimmable in 10 seconds.

---

### ⬡ Navigation / galaxy map `code`
A 2D minimap or fast-travel system so recruiters can jump directly to a project without flying there manually.

> **Detail:** A recruiter visiting your site has 90 seconds. Give them a "jump to" menu or a pause-screen galaxy map. Animate the camera flying to the target instead of cutting — that's the fun part. This is critical for usability.

---

### ⬡ Onboarding sequence `code`
First 10 seconds of the experience: animated title, brief controls explanation, camera pan revealing the universe.

> **Detail:** This is your first impression. A slow camera pull-back revealing the galaxy, your name appearing in space, then the rocket spawning in — done well, this alone will get you shared on Twitter. Use GSAP Timeline for sequencing. Don't skip this.

---

## Phase 4 — Polish & Performance
*Estimated time: 2–3 weeks*

### ⬡ Performance optimization `code`
LOD for distant systems, frustum culling, texture compression, draw call batching. Target 60fps on a mid-range laptop.

> **Detail:** Use `THREE.LOD` to swap high/low poly planets at distance thresholds. Compress textures with KTX2/Basis. Merge static geometries. Profile with Chrome DevTools — GPU bottleneck vs CPU bottleneck need different fixes. Three.js `renderer.info` is your friend.

---

### ◈ Custom planet models (selected) `asset`
For your 2–3 most important projects, model or source a distinctive planet/moon instead of using procedural geometry.

> **Detail:** These hero planets are what people screenshot and share. Consider something thematic to the project — a planet that looks like a browser window, a moon shaped like a component. Even a distinctive texture baked in Blender makes a huge difference. Keep poly count under 5k for web.

---

### ✦ Post-processing & visual effects `design`
Bloom on planet glows, subtle film grain, depth of field on the planet info state. Use Three.js EffectComposer.

> **Detail:** Bloom is the single highest-impact post-processing effect for a space scene. Even low intensity makes everything look cinematic. Add it last and be conservative — too much looks broken. Use `UnrealBloomPass` from Three.js examples.

---

### ⬡ Mobile & accessibility fallback `code`
Touch controls, detect low-end devices and reduce quality settings, provide a static fallback for no-WebGL environments.

> **Detail:** Detect GPU tier with `detect-gpu` library. On low-end: disable post-processing, reduce star count, simplify shaders. On no-WebGL: show a stylized 2D SVG version of the galaxy map linking to projects. Don't let recruiters hit a black screen.

---

## Phase 5 — Launch & Maintainability
*Estimated time: 1–2 weeks*

### ▲ Deploy to Vercel or Cloudflare Pages `deploy`
Static deploy, custom domain, CDN for assets, automated deploys from main branch.

---

### ◉ Adding new systems — the template habit `content`
Document the 3-step process for adding a new project: schema entry → optional model → data file. Should take under 30 minutes per project.

> **Detail:** Your schema from Phase 1 is what makes this painless. The goal: a new project should require zero code changes — just a new JSON object in your `systems.ts` file. Write a short README for your future self with the exact steps and field descriptions.

---

### ▲ Analytics & share metadata `deploy`
Add Plausible or Fathom (privacy-friendly), OG image for link sharing, and a shareable direct URL to specific systems.

> **Detail:** Deep links like `yoursite.com/?system=project-name` that teleport the user directly to a project are great for sharing in job applications. Your OG image should be a screenshot of the most visually impressive moment in the experience.

---

## System Data Template

Copy-paste this to add a new project to your universe. No other code changes needed.

```typescript
{
  id: "project-slug",
  name: "Project Name",
  position: [x, y, z],
  type: "project", // project | experience | skill
  starColor: "#hex",
  planets: [
    {
      name: "Detail name",
      description: "Short description of this aspect of the project.",
      tags: ["React", "Three.js"],
      links: [{ label: "Live", url: "https://..." }],
      orbitRadius: 8,
      modelPath: null // or "./models/planet-name.glb"
    }
  ],
  moons: []
}
```

---

*Last updated: April 2026*