import { Project } from "@/types/project";
import {
  Check,
  CheckCircle,
  Database,
  FileText,
  LogIn,
  Shield,
  UserCheck,
  X,
} from "lucide-react";

interface ProjectPrivacyProps {
  project: Project;
}

export function ProjectPrivacy({ project }: ProjectPrivacyProps) {
  return (
    <section id="privacy" className="scroll-mt-20">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Privacy Settings */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold mb-4">Privacy</h3>

          <div className="space-y-4">
            {/* Default Privacy */}
            {project.default_privacy !== undefined && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Default Privacy
                </h4>
                <div className="flex items-center gap-2">
                  {project.default_privacy ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">
                        Enabled by Default
                      </span>
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600">
                        Disabled by Default
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Know Your Customer (KYC) */}
            {project.tracebility?.kyc !== undefined && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Know Your Customer (KYC)
                </h4>
                <div className="flex items-center gap-2">
                  {project.tracebility.kyc ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">Required</span>
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600">Not Required</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Compliance */}
            {project.compliance && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Compliance
                </h4>
                <p className="text-muted-foreground text-sm">
                  {project.compliance}
                </p>
              </div>
            )}

            {/* Sign-in Requirements */}
            {project.tracebility?.sign_in_type_requirments &&
              project.tracebility.sign_in_type_requirments.length > 0 && (
                <div className="bg-card p-4 rounded-lg border">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign-in Requirements
                  </h4>
                  <div className="space-y-1">
                    {project.tracebility.sign_in_type_requirments.map(
                      (requirement, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                          {requirement}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

            {/* Collected Data */}
            {project.tracebility?.tracked_data && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Collected Data
                </h4>
                <p className="text-muted-foreground text-sm">
                  {project.tracebility.tracked_data}
                </p>
              </div>
            )}
            {/* Privacy Policy Status */}
            {project.privacy_policy && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Privacy Policy Status
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {project.privacy_policy.defined ? (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">
                          Privacy Policy Defined
                        </span>
                      </>
                    ) : (
                      <>
                        <X className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-600">
                          No Privacy Policy Defined
                        </span>
                      </>
                    )}
                  </div>

                  {project.privacy_policy.link && (
                    <div className="pt-2">
                      <a
                        href={project.privacy_policy.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-2 text-sm"
                      >
                        View Privacy Policy <span className="text-xs">↗</span>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Data Usage */}
            {project.privacy_policy?.data_usage && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2">Data Usage</h4>
                <p className="text-muted-foreground text-sm">
                  {project.privacy_policy.data_usage}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Privacy Policy */}
        <div className="space-y-6">
          <div className="space-y-4"></div>
        </div>
      </div>
    </section>
  );
}
