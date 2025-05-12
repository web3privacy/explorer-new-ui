import { ProjectsList } from "@/components/ProjectsList";
import { SearchParams } from "nuqs/server";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  return (
    <div>
      <main>
        <ProjectsList searchParams={searchParams} />
      </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
