# Phase 2.1 — Rocket Controller Implementation

**Status:** Planning Complete  
**Date:** April 9, 2026  
**Author:** Diego Salischiker + AI Planning

---

## Overview

Phase 2.1 is the first step of **Phase 2: Core 3D Experience**. This phase implements a flyable rocket with smooth velocity-based physics, unified input handling across keyboard/gamepad/mobile touch, and a lagging third-person camera follow system. The rocket controller is the foundational piece that enables all downstream interaction (planet triggering, approach sequences, etc.).

## Design Decisions

### Input Handling Strategy

**Decision:** Single unified input hook combining all input sources  
**Rationale:** Cleaner architecture than separate modules, easier to manage input precedence and conflicts. Single source of truth for input state.

- **Keyboard:** WASD for x/z movement, Q/E for y-axis (vertical), Shift for boost, arrow keys as alternative
- **Gamepad:** Left analog stick (x/z), bumpers/triggers for y-axis, right trigger for boost
- **Touch:** On-screen joystick appearing dynamically (bottom-right corner) when user taps; returns normalized x/y input; fades after 3 seconds idle
- **Precedence:** Gamepad > Keyboard > Touch (first active input wins, no interference)

### Flight Physics Model

**Decision:** Velocity-based physics with acceleration and inertia (versus simple lerp-based movement)  
**Rationale:** Provides more realistic, predictable flight feel. Separates input intention from actual movement, allowing smooth damping and deceleration. Creates the visceral "weight" and "momentum" that makes space flight feel satisfying.

**Physics implementation:**
- Target velocity = input vector × base speed (× 2 if boosting)
- Current velocity lerps toward target velocity each frame with damping factor ~0.85–0.9
- Resulting position = position + velocity each frame
- Effect: Smooth acceleration into movement, smooth deceleration when input stops (not instant), responsive boost feel
- Tunable parameters: base speed, boost multiplier, damping factor (via dev panel)

**Speed values:**
- Normal flight: ~0.02 units/frame
- Boost: ~0.04 units/frame
- Control is disabled when interaction state changes (planet approach/docking)

### Rocket Representation

**Decision:** Simple procedural geometry (cone body + box cockpit window)  
**Rationale:** Quick to implement, allows iteration without waiting for 3D artist. Placeholder approach; can be replaced with Blender GLTF model during visual polish phase without code refactor.

**Visual details:**
- Positioned at physics output coordinates
- Subtle rotation to face velocity direction (eased rotation, not snappy)
- Engine glow (emissive material) with intensity pulse tied to current speed
- Simple but readable at distance and close-up

### Camera Follow System

**Decision:** Separate CameraFollow component with explicit position lerping  
**Rationale:** Clean separation of concerns (rocket does not manage camera). Camera logic is independent and reusable. Easier to test and tune.

**Camera behavior:**
- Fixed offset from rocket: behind (positive z) and above (positive y)
- Position interpolation: `camera.position.lerp(target, 0.1)` per frame
- Lag factor: ~0.08–0.12 (tunable via dev panel)
- Subtle look-ahead: camera rotation trails velocity direction slightly
- No collision: camera passes through geometry (per world-design-document 3.2)
- Camera always focuses on rocket (cinematic third-person perspective)

### Control Flow Architecture

**Decision:** Explicit interaction state manager (separate hook)  
**Rationale:** Allows clean state transitions during planet approaches and docking sequences. Flight controller doesn't need to know why controls are disabled—only whether they are. Better for future phases.

**Interaction states:**
- `"flying"` (default): Full flight control enabled
- `"approaching"`: Flight controls disabled, camera moving to planet
- `"docking"`: Flight controls disabled, info panel displayed
- `"complete"`: Brief hold after interaction, transition back to flying

## Architecture Overview

### New Hooks

1. **`useFlightInput`** (src/hooks/useFlightInput.ts)
   - Aggregates keyboard, gamepad, and touch input
   - Single frame-independent polling loop (no RAF conflicts)
   - Returns normalized input: `{ x: -1..1, y: -1..1, z: -1..1, boost: boolean }`

2. **`useFlightPhysics`** (src/hooks/useFlightPhysics.ts)
   - Accumulates velocity based on input and damping
   - Computes position from velocity each frame
   - Respects control enabled/disabled state (from interaction state)
   - Returns: `{ position: [x,y,z], velocity: [x,y,z] }`

3. **`useInteractionState`** (src/hooks/useInteractionState.ts)
   - Simple state manager for control enable/disable
   - Transitions between states: flying → approaching → docking → flying
   - Exported functions: `getState()`, `startApproach()`, `startDocking()`, `reset()`
   - No full Context API boilerplate; simple hook-based pattern

### New Components

4. **`<Rocket>`** (src/components/Rocket.tsx)
   - Reads position and velocity from useFlightPhysics
   - Renders procedural cone + box geometry
   - Updates rotation and engine glow each frame
   - ~20 lines of JSX + Three.js integration

5. **`<CameraFollow>`** (src/components/CameraFollow.tsx)
   - Reads rocket position from scene
   - Computes lagging camera position each frame
   - Updates camera via useThree().camera
   - Respects zoom-on-approach signal from interaction state
   - ~25 lines of implementation

6. **`<TouchJoystick>`** (src/components/TouchJoystick.tsx)
   - Mobile-only overlay UI
   - Appears on touch at bottom-right (auto-clamped to safe zone)
   - Circular thumb joystick with distance/angle calculation
   - Fades out after 3 seconds of no input
   - Publishes to useFlightInput context or ref
   - ~60 lines + CSS/styling

### Modifications

7. **`App.tsx`**
   - Remove old CameraController component
   - Add `<Rocket />`, `<CameraFollow />`, `<TouchJoystick />`
   - Link interaction state to control disable logic

8. **`useDevPanel.ts`**
   - Add tuning panel controls:
     - Flight speed (normal/boost)
     - Damping factor
     - Camera lag (lerp factor)
     - Camera offset (distance, height)
     - Touch joystick size/opacity
   - Live preview of changes (no rebuild required)

## Implementation Order

### Parallel Track A: State & Input Foundation
1. Create `useFlightInput` hook
2. Create `useFlightPhysics` hook
3. Create `useInteractionState` hook

### Parallel Track B: 3D Components
4. Create `Rocket` component
5. Create `CameraFollow` component

### Sequential Track C: Integration
6. Create `TouchJoystick` component
7. Add input context for joystick → `useFlightInput` wiring
8. Refactor App.tsx to wire everything together
9. Extend useDevPanel with tuning parameters
10. Polish and playtesting (iterative)

## Verification Checklist

- [ ] **Keyboard flight**: WASD + Q/E move rocket, smooth acceleration, Shift boosts, no instant stops
- [ ] **Gamepad flight**: Analog sticks respond, all axes work, right trigger boosts, smooth feel
- [ ] **Touch joystick**: Appears on tap, normalized input, fades idle, responsive
- [ ] **Camera follow**: Noticeable lag, smooth catchup, stays behind/above, no clipping
- [ ] **Control disable**: Flight blocked during approach sequence, re-enables after
- [ ] **Performance**: Stable 60fps, no frame drops from physics loop
- [ ] **Visual polish**: Rocket orientation correct, engine glow visible, smooth motion

## Performance Considerations

- Input polling: Debounced to useFrame (~60fps), no extra RAF
- Physics loop: Single useFrame update per rocket, minimal computation
- Camera follow: Lerp per frame, under 1ms typical
- Touch joystick: CSS transforms (GPU-accelerated), minimal overhead
- Expected impact: Negligible on target hardware

## Future Phases & Dependencies

This phase sets up the foundation for:

- **Phase 2.2 (Planet Triggering):** Will use interaction state to disable controls during approach
- **Phase 2.3 (Onboarding Sequence):** Camera lerping already supports scripted sequences
- **Phase 2.4 (Visual Polish):** Rocket model swap, enhanced effects (exhaust particles, etc.)
- **Phase 3 (Ecosystem):** Asteroid fields, enemy encounters, etc. all build on this flight feel

No changes to the data schema (systems.ts) are required during this phase.

## Decisions Deferred to Future Phases

- **Mouse look rotation**: Deferred; keyboard/gamepad sufficient for now. May add in Phase 3.
- **Advanced inertia damping**: Simple linear damping sufficient; advanced physics (drag, mass, etc.) can be added if feel is off during playtesting.
- **Vibration feedback**: Gamepad haptics for boost/collision — planned for Phase 3.
- **Rocket 3D model**: Placeholder procedural geometry; Blender custom model planned for Phase 2.4 visual polish.

## Notes

- **Camera lag is critical:** The world-design-document emphasizes a "cinematic feel" (3.2). Tuning the camera lerp factor will be central to achieving this. Expect multiple iterations.
- **Mobile is equal priority:** Touch joystick must feel as responsive as keyboard/gamepad. Test on actual device early.
- **Physics feel is everything:** For a space flight experience, the movement response is core to whether the whole portfolio feels good. Plan for 2-3 iterations of tuning during playtest.

---

## Related Documents

- [project-roadmap.md](../project-roadmap.md) — Phase 2 context
- [world-design-document.md](../world-design-document.md) — Navigation & camera design (sections 3.1–3.2)
