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
    <div className={cn("relative w-full", className)}>
      <div className="overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40">
        <div className="flex items-center gap-2 py-2 min-w-max md:min-w-0 md:w-full">
          <div className="w-[250px] flex-shrink-0">
            <ProjectSearchInput />
          </div>
          <EcosystemFilter />
          <CategoryFilter />
          <UsecaseFilter />
        </div>
      </div>
    </div>
  );
};

export default ProjectsFilters;
