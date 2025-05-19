import React from "react";
import EcosystemFilter from "./EcosystemFilter";

const ProjectsFilters: React.FC = () => {
  return (
    <div className="flex gap-2">
      <EcosystemFilter />
    </div>
  );
};

export default ProjectsFilters;
