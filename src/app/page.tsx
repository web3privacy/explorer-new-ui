//import { CategoryTabs } from "@/components/navigation/CategoryTabs";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import ProjectsFilters from "@/components/projects/filters/ProjectsFilters";
import { ProjectsList } from "@/components/projects/list/ProjectsList";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  const searchParamsKey = JSON.stringify(await searchParams);
  return (
    <div className="container px-4 md:px-6 lg:px-8">
      <div className="space-y-8">
        <Hero />
        <Highlights />
        <div id="projects-section" className="space-y-8">
          <ProjectsFilters />
          {/* <CategoryTabs /> */}
          <Suspense key={searchParamsKey} fallback={ProjectsList.fallback()}>
            <ProjectsList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
