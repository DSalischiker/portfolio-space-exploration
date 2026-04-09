---
name: plan-roadmap-step
description: "Use when planning a phase or step from project-roadmap.md. Systematically analyze the step, world-design-document, and roadmap; ask clarifying questions; create a detailed plan for approval; then generate phase_n.n.md and update related documents."
---

# Plan Roadmap Step

## Purpose

This skill provides a structured workflow for **breaking down and planning any step** from the project roadmap. Before any implementation begins, this skill ensures:

- The step is fully understood in context (world-design, dependencies, constraints)
- Design decisions are explicit and approved before coding
- Assumptions and unknowns are surfaced as questions
- A phase_n.n.md planning document (the source of truth) is created
- Roadmap and design documents are updated if needed

Use this skill whenever you're starting work on a new roadmap phase or step.

---

## Workflow

### Step 1: Gather Context

Read the following **minimum**:
1. The specific step from **project-roadmap.md** that's being planned
2. The **world-design-document.md** (especially sections relevant to the step)
3. Related schema or design guides (if the phase modifies how systems/planets/moons work)
4. The repo memory notes (`schema-design.md`, etc.)

From these sources, extract:
- **What** is this step building or defining?
- **Why** is it ordered here in the roadmap?
- **What dependencies** does it have on prior phases?
- **What constraints** exist (world design rules, schema limitations, performance budgets)?

### Step 2: Surface Questions & Decisions

Identify:
- **Architectural decisions** — If multiple approaches exist (e.g., vanilla Three.js vs React Three Fiber), what tradeoffs apply?
- **Scope ambiguities** — Is this "implement UI panels" or "define the design language for all UI"?
- **Visual/UX unknowns** — If the step involves rendering, interaction, or visual design, what's undefined?
- **Integration points** — What existing code does this step depend on? What will future phases depend on?
- **Future phase dependencies** — How does this step enable or constrain future roadmap phases? Are there decisions now that should be made with downstream phases in mind?

**Ask the user clarifying questions** only for critical unknowns. Avoid trivial questions; use the world-design-document and roadmap as authority where they already define the answer.

### Step 3: Draft a Detailed Plan

Structure the plan document with these sections (see Phase_2.1.md as a reference template):

```
# Phase N.N — [Title]

**Status:** Planning  
**Date:** [Today]  
**Author:** [Name]

## Overview
[1–2 paragraphs describing what this phase builds and why it matters]

## Design Decisions
[For each key architectural/UX/visual choice, document:]
- **Decision:** [What was decided]
- **Rationale:** [Why this choice over alternatives]
- [Additional context: tradeoffs, constraints, tuning parameters, etc.]

## Implementation Approach
[High-level steps, milestones, or criteria for completion]

## Success Criteria
[What "done" looks like — testable, observable outcomes]

## Risks & Mitigations
[Known blockers and how to handle them]

## Open Questions
[Anything still undecided, to be resolved during implementation or in the next planning phase]
```

### Step 4: Present Plan for Approval

Display the draft plan clearly and ask: **"Does this plan look good? Any changes before I proceed?"**

Wait for user feedback. Be ready to:
- Adjust the plan based on feedback
- Answer follow-up questions
- Iterate if the plan is unclear or incomplete

### Step 5: Create & Update Files

Once approved, execute:

1. **Create phase_n.n.md file:**
   - Save the approved plan to `/project-roadmap/phases/Phase_n.n.md`
   - Update Status from "Planning" to "Planning Complete"
   - Add creation timestamp

2. **Update roadmap (if needed):**
   - If the phase's scope or dependencies changed during planning, update `project-roadmap.md`
   - Link to the new phase_n.n.md file for easy reference

3. **Update world-design-document (if needed):**
   - If planning revealed new design decisions (camera behavior, interaction patterns, content structure), update the world-design-document.md
   - Maintain versioning and update timestamp

4. **Update schema/guides (if needed):**
   - If the step modifies the data schema or extends the portfolio structure, update relevant files in `src/data/`

---

## Invocation Methods

Choose whichever feels natural:

**Option 1: Direct skill command**
```
/plan-roadmap-step Phase 2.2
```

**Option 2: Natural mention**
```
Let's plan Phase 2.2
```

Both trigger the same workflow.

## Example Usage

**User:** "I'm ready to plan Phase 2.2"

**Agent:**
1. Reads Phase 2.2 step from roadmap: "Procedural planet & system renderer"
2. Reads world-design-document sections on visual tone and system layout
3. Reads schema-design.md to understand the System/Planet/Moon structure
4. Identifies key decisions: geometry approach, shader strategy, deterministic seeding, LOD strategy
5. Asks questions on visual fidelity targets AND how this phase enables Phase 2.3 (proximity detection)
6. Drafts a comprehensive plan with Design Decisions, Implementation Approach, Success Criteria
7. Presents plan for approval
8. On approval, creates `phases/Phase_2.2.md` and updates roadmap if needed

---

## Key Principles

- **Authority:** The world-design-document is authoritative on interaction, visual tone, and content structure. The roadmap is authoritative on sequencing and phase goals.
- **Artifact:** The phase_n.n.md file becomes the source of truth for that phase — developers reference it during implementation.
- **Living documents:** Roadmap and world-design-document are updated if planning uncovers changes; they are not static.
- **Clarity over brevity:** Better to over-document decisions than to leave unknowns for implementation.
- **No assumptions:** If the answer is not in the world-design or roadmap, ask the user.

