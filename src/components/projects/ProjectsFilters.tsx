import React from "react";
import CategoryFilter from "./CategoryFilter";
import EcosystemFilter from "./EcosystemFilter";

const ProjectsFilters: React.FC = () => {
  return (
    <div className="flex gap-2">
      <EcosystemFilter />
      <CategoryFilter />
    </div>
  );
};

export default ProjectsFilters;
