import React from "react";
import CategoryFilter from "./CategoryFilter";
import EcosystemFilter from "./EcosystemFilter";
import UsecaseFilter from "./UsecaseFilter";

const ProjectsFilters: React.FC = () => {
  return (
    <div className="flex gap-2">
      <EcosystemFilter />
      <CategoryFilter />
      <UsecaseFilter />
    </div>
  );
};

export default ProjectsFilters;
