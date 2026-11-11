# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Commands

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check and production build
- `npm run lint` — run ESLint

There is no test runner configured; do not run `npm test`.

After code changes, run `npm run lint` and `npm run build`.
Fix all reported errors before finishing.

## Workflow

- Do not add dependencies unless I explicitly ask.
- Do not modify unrelated files.
- After code changes, run `npm run lint` and `npm run build`.
- Fix all TypeScript and lint errors before finishing.

## Component architecture

Use a View/Presenter separation for components with meaningful logic.

- `*View.tsx` contains JSX, CSS Module imports, and presentation only.
- `use*Presenter.ts` contains state, event handlers, data preparation, and service calls.
- The view must not contain business logic or API calls.
- The presenter must not contain JSX or styling.
- Export the public component from `index.ts`.

Use this structure only when a component needs separate view and presenter files:

```text
component-name/
  ComponentName.tsx
  ComponentName.module.css
  useComponentNamePresenter.ts
  types.ts
  index.ts
```

For a small presentational component, a single `ComponentName.tsx` file is acceptable.

## Types

- Define a type in the file where it is used when only one file needs it.
- If a type is shared by a component and its presenter hook, define it in a local `types.ts`.
- Use `import type` for type-only imports.
- Do not duplicate types.
- Move a type to a shared location only when two or more unrelated modules need it.

## Component placement

- Place a component in the folder of the feature or component that uses it.
- Put a component in `src/components/` only after it is used by at least two independent features or pages.
- Keep related files together: component, CSS Module, types, and local helper.
- Avoid deep nesting; use at most two or three folder levels.

## Naming

- Folders use `kebab-case`: `home-page`, `tv-show-card`, `search-bar`.
- React components and component files use `PascalCase`: `TvShowCardView.tsx`.
- Variables, functions, and object properties use `camelCase`.
- Constants use `SCREAMING_SNAKE_CASE`.
- CSS Modules use `PascalCase`: `TvShowCard.module.css`.

## File size

- Keep every new or significantly modified source file under 120 lines.
- Count all non-blank lines, including comments.
- If a file exceeds 120 lines, split it into smaller focused files.
- Do not sacrifice readability merely to meet the limit.
