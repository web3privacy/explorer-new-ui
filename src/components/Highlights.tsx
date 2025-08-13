import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProject } from "@/queries/projects.queries";
import Link from "next/link";

// IDs of the projects we want to highlight
const HIGHLIGHTED_PROJECT_IDS = ["railgun", "aztec", "cake-wallet"];

// Background colors for highlighted projects (fallback for styling)
const PROJECT_BG_COLORS: Record<string, string> = {
  railgun: "bg-gray-700",
  aztec: "bg-purple-600",
  "cake-wallet": "bg-orange-500",
};

export async function Highlights() {
  // Fetch each highlighted project individually
  const highlightedProjects = await Promise.all(
    HIGHLIGHTED_PROJECT_IDS.map((id) => getProject(id))
  );

  return (
    <section className="py-16">
      <div className="space-y-8">
        {/* Bordered Title */}
        <div className="flex justify-center">
          <div className="border border-light  px-8 py-4 w-full">
            <h2 className="text-3xl md:text-4xl tracking-tight text-white text-center font-major-mono">
              highlights
            </h2>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlightedProjects.map((project) => (
            <Link
              key={project.id}
              href={`/project/${project.id}`}
              className="no-underline"
            >
              <Card className="group hover:shadow-lg !rounded-none transition-all duration-200 h-full border-light bg-background">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar
                      className={`h-12 w-12 ${
                        PROJECT_BG_COLORS[project.id] || "bg-gray-500"
                      }`}
                    >
                      <AvatarImage
                        src={project.logos?.[0]?.url}
                        alt={project.name}
                      />
                      <AvatarFallback className="text-white font-semibold">
                        {project.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-dm-mono font-light">
                          {project.name}
                        </CardTitle>
                      </div>
                      <Badge
                        variant="secondary"
                        className="w-fit font-dm-mono font-light"
                      >
                        {project.categories?.[0] || "General"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
