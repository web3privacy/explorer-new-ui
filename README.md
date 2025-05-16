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
