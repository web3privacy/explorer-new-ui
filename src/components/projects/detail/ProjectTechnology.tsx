import { Project } from "@/types/project";
import { Cpu } from "lucide-react";

interface ProjectTechnologyProps {
  project: Project;
}

export function ProjectTechnology({ project }: ProjectTechnologyProps) {
  return (
    <section id="technology" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <Cpu className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold">Technology</h2>
      </div>
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground mb-4">
          {project.name} is built with cutting-edge technologies focused on
          performance, scalability, and user experience. The stack is designed
          to handle enterprise-level privacy requirements while maintaining
          excellent developer experience.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">Frontend</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• Next.js 15 with App Router</li>
              <li>• TypeScript for type safety</li>
              <li>• Tailwind CSS for styling</li>
              <li>• Radix UI for accessibility</li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">Backend</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• Node.js with Express</li>
              <li>• PostgreSQL database</li>
              <li>• Redis for caching</li>
              <li>• JWT authentication</li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">Blockchain</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• Ethereum integration</li>
              <li>• Smart contract deployment</li>
              <li>• Web3.js for interactions</li>
              <li>• MetaMask wallet support</li>
            </ul>
          </div>
        </div>
        {project.technology && (
          <div className="bg-card p-6 rounded-lg border mt-6">
            <h3 className="text-xl font-semibold mb-3">Project Technology</h3>
            <p className="text-muted-foreground mb-3">
              <strong>Type:</strong> {project.technology.type}
            </p>
            {project.technology.features &&
              project.technology.features.length > 0 && (
                <div>
                  <strong className="text-foreground">Features:</strong>
                  <ul className="text-muted-foreground space-y-1 mt-2">
                    {project.technology.features.map((feature, index) => (
                      <li key={index}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        )}
      </div>
    </section>
  );
}
