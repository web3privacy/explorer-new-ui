import { ProjectHeader } from "@/components/projects/detail/ProjectHeader";
import { ProjectStats } from "@/components/projects/detail/ProjectStats";
import { getEcosystems } from "@/queries/ecosystems.queries";
import { getProject } from "@/queries/projects.queries";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const paramsData = await params;
  const id = paramsData.id;
  const project = await getProject(id).catch(() => notFound());

  return {
    title: `${project.name} - Explorer | Web3 Privacy Now`,
    description: project.description || `Details about ${project.name}`,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const paramsData = await params;
  const id = paramsData.id;

  const [project, ecosystems] = await Promise.all([
    getProject(id).catch(() => notFound()),
    getEcosystems(),
  ]);

  return (
    <div className="container px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 bg-muted/20 p-6 border rounded-xl">
        <ProjectHeader project={project} />
        <ProjectStats project={project} ecosystems={ecosystems} />
      </div>
      {/* Other page content can go here */}
    </div>
  );
}
