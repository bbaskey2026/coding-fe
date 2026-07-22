# 💻 Coding Platform

A full-featured competitive programming & interview prep platform built with **React 19**, **Vite**, and **Tailwind CSS v4**. It includes a problem library, mock interviews, study plans, contests, a leaderboard, discussion forums, notes, certificates, and more — all wrapped in a polished, responsive shell with a persistent sidebar and navbar.

---

## ✨ Features

| Feature | Route |
|---|---|
| 🏠 Hero / Landing | `/` |
| 🔐 Authentication | `/auth` |
| 📊 Dashboard | `/dashbaord` |
| 📝 Problem List | `/problems` |
| 🔍 Problem Details | `/problems/:id` |
| 📚 Study Plans | `/study-plans` |
| 🏆 Leaderboard | `/leaderboard` |
| 🎯 Contests | `/contests` |
| 💬 Discussion Forum | `/forum` |
| 🎤 Interview Experiences | `/interviews` |
| 🤖 Mock Interview | `/mock-interview` |
| 📓 Notes | `/notes` |
| 🎖️ Certificates | `/certificates` |
| 👤 Profile | `/profile` |
| ⚙️ Settings | `/settings` |
| 🛡️ Admin Dashboard | `/admin` |

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.motion.com/)
- **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/), [Heroicons](https://heroicons.com/)
- **Code Editor**: [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- **Charts**: [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/)
- **Linting**: ESLint 10 with React Hooks & React Refresh plugins

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm v9+

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd coding

# Install dependencies
npm install
```

### Development

```bash
npm start
```

Opens the app at `http://localhost:5173` with Hot Module Replacement (HMR) enabled.

### Build for Production

```bash
npm run build
```

Output is placed in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

---

## 📁 Project Structure

```
coding/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images & media
│   ├── components/
│   │   ├── layout/         # Navbar, Sidebar
│   │   └── features/       # CommandPalette, NotificationCenter, ...
│   ├── context/            # AppContext (global state)
│   ├── data/               # Static data / mock datasets
│   ├── pages/              # Route-level page components
│   ├── App.jsx             # Root component & routing
│   ├── App.css
│   ├── index.css           # Global styles & Tailwind imports
│   └── main.jsx            # React DOM entry point
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## 🏗️ Architecture

The app uses a **`LayoutShell`** wrapper that conditionally renders the `Navbar` and `Sidebar` around page content. Standalone pages (e.g., `/auth`, `/landing`) bypass the shell and render full-screen. A global `AppProvider` context supplies shared state across all pages.

---

## 📜 License

This project is private. All rights reserved.
