import { Project } from "@/types/project";
import { Lock } from "lucide-react";

interface ProjectSecurityProps {
  project: Project;
}

export function ProjectSecurity({ project }: ProjectSecurityProps) {
  return (
    <section id="security" className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <Lock className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold">Security</h2>
      </div>
      <div className="prose prose-lg max-w-none">
        <p className="text-muted-foreground mb-4">
          {project.name} implements enterprise-grade security measures to
          protect against threats while maintaining the privacy-first approach.
          Regular security audits and penetration testing ensure continuous
          improvement.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">Encryption</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• AES-256 encryption at rest</li>
              <li>• TLS 1.3 for data in transit</li>
              <li>• End-to-end encryption for messages</li>
              <li>• Hardware security modules (HSM)</li>
            </ul>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-3">Access Control</h3>
            <ul className="text-muted-foreground space-y-2">
              <li>• Multi-factor authentication (MFA)</li>
              <li>• Role-based access control (RBAC)</li>
              <li>• Just-in-time access provisioning</li>
              <li>• Continuous session monitoring</li>
            </ul>
          </div>
        </div>
        <div className="bg-card p-6 rounded-lg border mt-6">
          <h3 className="text-xl font-semibold mb-3">Security Audits</h3>
          <p className="text-muted-foreground">
            Regular third-party security audits, bug bounty programs, and
            automated vulnerability scanning ensure our security posture remains
            strong. All findings are publicly disclosed and promptly addressed.
          </p>
        </div>
        {project.audits && project.audits.length > 0 && (
          <div className="bg-card p-6 rounded-lg border mt-6">
            <h3 className="text-xl font-semibold mb-3">Project Audits</h3>
            <div className="space-y-4">
              {project.audits.map((audit, index) => (
                <div key={index} className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold text-foreground">
                    {audit.name}
                  </h4>
                  {audit.company && (
                    <p className="text-muted-foreground text-sm">
                      By {audit.company}
                    </p>
                  )}
                  {audit.time && (
                    <p className="text-muted-foreground text-sm">
                      Completed: {audit.time}
                    </p>
                  )}
                  {audit.link && (
                    <a
                      href={audit.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      View Audit Report
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
