"use client";

import { useQueryState } from "nuqs";

export function ProjectSearchInput() {
  const [query] = useQueryState("q"); // solo lectura inicial

  return (
    <form method="GET" className="w-full max-w-md mx-auto mb-6">
      <input
        type="text"
        name="q" // importante para que el form mande ?q=...
        defaultValue={query ?? ""}
        placeholder="Search projects..."
        className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input type="hidden" name="page" value="1" />
    </form>
  );
}
