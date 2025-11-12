# Web3Privacy Explorer - New UI

This is the new UI for the [Web3Privacy Explorer](https://explorer.web3privacy.info/), a comprehensive directory of privacy-focused projects in the Web3 ecosystem. The explorer helps users discover tools, protocols, and projects that protect digital freedom and privacy.

## 🚀 Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🔍 Filtering, Sorting & Pagination Layer (Next.js)

✅ What stays the same
- The source of truth is still the public API:
  https://explorer-data.web3privacy.info/
- The data continues to auto-update when changes are merged into the GitHub repository.
- The backend is not modified. The public API remains open and GitHub-powered.

## 🧠 What’s new

We introduce a new internal API route in Next.js that adds filtering, sorting, and pagination capabilities on top of the public JSON feed.
This makes the frontend much lighter and faster by avoiding loading all 700+ projects at once.

## 💡 Why it matters

- 🔄 No changes needed to the backend or GitHub workflow
- ⚡ Dramatically improved performance
- 🔍 Enables dynamic server-side filtering & pagination
- 🌐 Keeps the frontend lean and scalable

## 🧱 Architecture Overview

```bash
GitHub Repo (Projects data)
   ↓  (on merge)
Public JSON API: https://explorer-data.web3privacy.info/
   ↓
Internal API Route in Next.js: /api/projects?filter=...&sort=...&page=...
   ↓
Optimized frontend with on-demand data
```
