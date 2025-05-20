import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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

  const getEcosystemIcon = (ecosystemId: string) => {
    const ecosystem = ecosystems.find((eco) => eco.id === ecosystemId);
    return ecosystem?.icon;
  };

  return (
    <div className="container px-4 md:px-6 lg:px-8">
      <div className="space-y-8">
        <div className="flex items-center gap-6">
          <Avatar className="size-20">
            <AvatarImage
              src={project.logos ? project.logos[0].url : ""}
              alt={project.name}
            />
            <AvatarFallback className="bg-primary/10 text-primary text-2xl">
              {project.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{project.name}</h1>
            {project.categories && project.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.categories.map((category: string, index: number) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {category}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            {project.description || "No description available"}
          </p>
        </div>

        {project.ecosystem && project.ecosystem.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Ecosystems</h2>
            <div className="flex gap-2">
              {project.ecosystem.map((eco: string, index: number) => {
                const icon = getEcosystemIcon(eco);
                return (
                  <Avatar
                    key={index}
                    className="size-10 border-2 border-card bg-white"
                  >
                    <AvatarImage
                      src={icon}
                      alt={eco}
                      className="object-contain bg-white p-1"
                    />
                    <AvatarFallback className="bg-secondary/50 text-secondary-foreground">
                      {eco[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
