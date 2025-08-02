import { ProjectOpenness } from "@/components/projects/detail/openness/ProjectOpenness";
import { ProjectAudits } from "@/components/projects/detail/ProjectAudits";
import { ProjectHeader } from "@/components/projects/detail/ProjectHeader";
import { ProjectPrivacy } from "@/components/projects/detail/ProjectPrivacy";
import { ProjectRatingWithDetails } from "@/components/projects/detail/ProjectRatingWithDetails";
import { ProjectSecurity } from "@/components/projects/detail/ProjectSecurity";
import { ProjectTechnology } from "@/components/projects/detail/ProjectTechnology";
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

  try {
    const project = await getProject(id);
    return {
      title: `${project.name} - Web3Privacy Explorer`,
      description:
        project.description ||
        `Learn more about ${project.name} on Web3Privacy Explorer`,
    };
  } catch {
    return {
      title: "Project Not Found - Web3Privacy Explorer",
    };
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const paramsData = await params;
  const id = paramsData.id;

  const [project, ecosystems] = await Promise.all([
    getProject(id).catch(() => notFound()),
    getEcosystems(),
  ]);

  return (
    <div className="container px-4 md:px-6 lg:px-8 py-6 md:py-8 mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-muted/20 p-6 border rounded-xl mb-8">
        <ProjectHeader project={project} ecosystems={ecosystems} />
        <ProjectRatingWithDetails project={project} size={160} />
      </div>

      <div className="space-y-8">
        <ProjectOpenness project={project} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProjectTechnology project={project} />
          <ProjectPrivacy project={project} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProjectSecurity project={project} />
          <ProjectAudits project={project} />
        </div>
      </div>
    </div>
  );
}
