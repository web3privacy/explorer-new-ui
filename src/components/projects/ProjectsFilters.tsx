import { cn } from "@/lib/utils";
import CategoryFilter from "./CategoryFilter";
import EcosystemFilter from "./EcosystemFilter";
import { ProjectSearchInput } from "./ProjectSearchInput";
import UsecaseFilter from "./UsecaseFilter";

interface ProjectsFiltersProps {
  className?: string;
}

const ProjectsFilters: React.FC<ProjectsFiltersProps> = ({ className }) => {
  return (
    <div className={cn("relative w-full -mx-4 md:mx-0", className)}>
      {/* Title and searchbar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 mb-4">
        <h2 className="text-2xl font-semibold">302 Applications</h2>
        <div className="mt-2 md:mt-0 w-full md:w-[300px]">
          <ProjectSearchInput />
        </div>
      </div>
      {/* Scrollable container with custom scrollbar styles */}
      <div className="overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40">
        {/* Content wrapper that allows horizontal scrolling */}
        <div className="flex items-center gap-2 px-4 py-2 min-w-max md:min-w-0 md:w-full">
          <EcosystemFilter />
          <CategoryFilter />
          <UsecaseFilter />
        </div>
      </div>
    </div>
  );
};

export default ProjectsFilters;
