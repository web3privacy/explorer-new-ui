import { ProjectHeader } from "@/components/projects/detail/ProjectHeader";
import { ProjectOpenness } from "@/components/projects/detail/ProjectOpenness";
import { ProjectPrivacy } from "@/components/projects/detail/ProjectPrivacy";
import { ProjectSecurity } from "@/components/projects/detail/ProjectSecurity";
import { ProjectStats } from "@/components/projects/detail/ProjectStats";
import { ProjectTechnology } from "@/components/projects/detail/ProjectTechnology";
import { TableOfContents } from "@/components/ui/inline-toc";
import { getEcosystems } from "@/queries/ecosystems.queries";
import { getProject } from "@/queries/projects.queries";
import { Cpu, Eye, Lock, Shield } from "lucide-react";
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

  const tocItems = [
    { title: "Openness", url: "#openness", depth: 1, icon: Eye },
    { title: "Technology", url: "#technology", depth: 1, icon: Cpu },
    { title: "Privacy", url: "#privacy", depth: 1, icon: Shield },
    { title: "Security", url: "#security", depth: 1, icon: Lock },
  ];

  return (
    <div className="container px-4 md:px-6 lg:px-8 py-6 md:py-8">
      {/* Header Section - Full Width */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 bg-muted/20 p-6 border rounded-xl mb-8">
        <ProjectHeader project={project} />
        <ProjectStats project={project} ecosystems={ecosystems} />
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Table of Contents - Left Side, Pinned */}
        <div className="lg:w-80 lg:flex-shrink-0">
          <div className="lg:sticky lg:top-8">
            <TableOfContents
              items={tocItems}
              title="Page Contents"
              className="w-full"
              defaultOpen={true}
            />
          </div>
        </div>

        {/* Content Sections - Right Side */}
        <div className="flex-1 space-y-12">
          <ProjectOpenness project={project} />
          <ProjectTechnology project={project} />
          <ProjectPrivacy project={project} />
          <ProjectSecurity project={project} />
        </div>
      </div>
    </div>
  );
}
