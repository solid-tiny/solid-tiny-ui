# Project Guidelines

## Purpose

This repository is a SolidJS UI component library. These guidelines help maintain code quality, consistency, and collaboration across the project.

---

## Language and edits

- Use English for all code-level artifacts: comments, JSDoc/TSDoc, commit messages, and code examples. This keeps the codebase consistent and tooling-friendly.
- When discussing work with teammates (chat/PR comments), match the recipient's language — but keep the repository artifacts in English unless there's a strong reason not to.
- Ask before creating or modifying files unless the task explicitly requests it.

---

## Component style guidelines (what our components should follow)

Headless vs presentational

- Separate logic (headless primitives) and presentation (components). Use the `primitives/` folder for fully unstyled building blocks (Root, Item, Input, Label) and compose them in `components/` for styled controls.
- Prefer consuming headless primitives inside the styled component (so others can reuse primitives for custom UIs).

State & reactivity

- Use Solid primitives (signals, memos, effects) and `createWatch` (or project helpers) to keep external `value` and internal state in sync. Defer initial watches where necessary to avoid double updates.
- Use `createComponentState` for managing complex internal state with multiple related signals.

Styling

- Mount SCSS per-component with `mountStyle(css, 'tiny-<component>')`.
- Use predictable, prefixed CSS class names (e.g. `tiny-radio-group`, `tiny-radio-item`) and data attributes for state (`data-checked`, `data-disabled`).

Testing & examples

- Add a minimal example in the playground (use `PlayIt` for interactive knobs). Keep examples lightweight.

Performance & quality

- Keep render trees small; memoize derived arrays with `createMemo`.
- Add small unit tests for critical behavior (controlled/uncontrolled, disabled, keyboard/aria).

## Developer workflow & linting

- Format and fix issues with `pnpm lint:fix` as a pre-commit step.
- Prefer small PRs that change one component at a time. Include a playground snapshot or short demo for visual changes.

Keep this file concise; update when conventions change. Follow the rules here when adding or changing components in `packages/core`.
