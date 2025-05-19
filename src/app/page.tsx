import ProjectsFilters from "@/components/ProjectsFilters";
import { ProjectsList } from "@/components/ProjectsList";
import { SearchParams } from "nuqs/server";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  return (
    <div>
      <main>
        <div className="min-h-screen p-8 max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">🛠 Projects</h1>

          <div className="space-y-4">
            <ProjectsFilters />

            <ProjectsList searchParams={searchParams} />
          </div>
        </div>
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
