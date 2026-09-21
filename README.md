# Rick & Morty Character Explorer 🛸

A modern, fast, and responsive web application built with React, Vite, and pnpm to search, explore, and bookmark characters and episodes from the Rick and Morty universe.

## ✨ Features

- 🔍 **Live Search**: Real-time character searching powered by the [Rick and Morty API](https://rickandmortyapi.com/) with request cancellation support (`AbortController`).
- 📱 **Fully Responsive**: Carefully designed layouts optimized across mobile, tablet, and desktop screens.
- ❤️ **Favorites System**: Save and manage favorite characters, persisted safely across sessions via `localStorage`.
- 📺 **Episode Browser**: View episodes for any selected character with chronological ascending/descending sorting.
- 🎨 **Dark Theme & Animations**: Portal-inspired modern dark theme with smooth hover transitions, custom scrollbars, and lively character status badges (alive, dead, unknown).
- ♿ **Accessible**: Keyboard navigation, ESC key modal dismiss, scroll locking, and screen-reader friendly ARIA attributes.

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [@heroicons/react](https://heroicons.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Linter**: [ESLint](https://eslint.org/)

## 📁 Project Structure

```text
rick-and-morty/
├── public/              # Static assets
├── src/
│   ├── components/      # React components (Navbar, CharacterList, CharacterDetail, Modal)
│   ├── hooks/           # Custom hooks (useCharacters, useLocalStorage)
│   ├── utils/           # Utility functions and status helpers
│   ├── App.css          # Application layout and responsive styles
│   ├── index.css        # Global CSS variables, design tokens, and resets
│   ├── App.jsx          # Root component
│   └── main.jsx         # Application entry point
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
└── package.json         # Project metadata and dependencies
```

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [pnpm](https://pnpm.io/) (v9 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/Josheqani/rick-and-morty.git

# Navigate into the project directory
cd rick-and-morty

# Install dependencies
pnpm install
```

### Available Scripts

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Starts the local development server |
| `pnpm build` | Compiles and bundles the app for production into `/dist` |
| `pnpm preview` | Locally previews the production build |
| `pnpm lint` | Runs ESLint to check for code issues |

## 📄 License

MIT
