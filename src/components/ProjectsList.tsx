import { getProjects } from "@/queries/projects.queries";
import { Button } from "./ui/button";

export async function ProjectsList() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">🛠 Proyectos</h1>

      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="border p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold">{project.name}</h2>
            <p className="text-sm text-gray-600">
              {project.description || "Sin descripción"}
            </p>
            <p className="text-xs text-gray-400">
              🌱 Estado: {project.project_phase || "Desconocido"}
            </p>
            <p>{project.links?.twitter}</p>

            <Button>View</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
