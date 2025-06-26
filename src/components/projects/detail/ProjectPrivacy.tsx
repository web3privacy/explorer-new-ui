import { Project } from "@/types/project";
import { Shield } from "lucide-react";

interface ProjectPrivacyProps {
  project: Project;
}

export function ProjectPrivacy({ project }: ProjectPrivacyProps) {
  return (
    <section id="privacy" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold">Privacy</h2>
      </div>
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground mb-4">
          Privacy is at the core of {project.name}&apos;s design philosophy. We
          implement zero-knowledge proofs, differential privacy, and other
          advanced techniques to ensure user data remains protected while
          maintaining functionality.
        </p>
        <div className="space-y-6 mt-8">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">
              Zero-Knowledge Proofs
            </h3>
            <p className="text-muted-foreground">
              Users can prove they meet certain criteria without revealing the
              underlying data. This enables privacy-preserving verification for
              compliance and access control.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">Data Minimization</h3>
            <p className="text-muted-foreground">
              We collect only the minimum data necessary for service operation.
              All data is encrypted at rest and in transit, with automatic
              deletion policies.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">User Control</h3>
            <p className="text-muted-foreground">
              Users have complete control over their data with granular privacy
              settings, export capabilities, and the right to be forgotten
              implemented by default.
            </p>
          </div>
        </div>
        {project.privacy_policy && (
          <div className="bg-card p-6 rounded-lg border mt-6">
            <h3 className="text-xl font-semibold mb-3">Privacy Policy</h3>
            <p className="text-muted-foreground mb-3">
              <strong>Defined:</strong>{" "}
              {project.privacy_policy.defined ? "Yes" : "No"}
            </p>
            {project.privacy_policy.link && (
              <p className="text-muted-foreground mb-3">
                <strong>Link:</strong>{" "}
                <a
                  href={project.privacy_policy.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Privacy Policy
                </a>
              </p>
            )}
            {project.privacy_policy.data_usage && (
              <p className="text-muted-foreground">
                <strong>Data Usage:</strong> {project.privacy_policy.data_usage}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
