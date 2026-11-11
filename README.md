# TV Show Explorer

Search TV shows with the public [TVmaze API](https://www.tvmaze.com/api) and browse the results as a responsive card grid. Built with React 19, TypeScript and Vite. No API key is needed.

live: https://dzmitryi.github.io/tv-show-explorer/

## Features

- Search by show name. Results load as you type (400 ms debounce), or immediately on Enter or the Search button. Nothing is requested while the input is empty.
- Loading, error and empty states.
- Pagination, 3 shows per page.
- Single-select genre filter built from the genres of the current results.
- Mobile-first responsive layout with light and dark themes.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints, normally http://localhost:5173.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Serve the production build locally |

There is no test runner configured.

## Project structure

```
src/
├── App.tsx              application shell
├── main.tsx             entry point
├── index.css            global styles and theme variables
└── pages/home/
    ├── HomePage.tsx     page view
    ├── usePresenter.ts  page state: current page, selected genre, filtering
    ├── useShowSearch.ts search state: request, loading, error
    ├── types.ts         TvShow model
    ├── api/             TVmaze request, response types and mapper
    └── components/      search-bar, genre-filter, show-card, pagination
```

Each component folder separates the view (`Name.tsx` and its CSS Module) from the presenter (`usePresenter.ts`), and exports the component from `index.ts`. See `CLAUDE.md` for the full conventions.
