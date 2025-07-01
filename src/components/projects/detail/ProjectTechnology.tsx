import { Project } from "@/types/project";
import {
  Check,
  Code,
  Cpu,
  Database,
  Network,
  Settings,
  Shield,
  X,
} from "lucide-react";

interface ProjectTechnologyProps {
  project: Project;
}

export function ProjectTechnology({ project }: ProjectTechnologyProps) {
  return (
    <section id="technology" className="scroll-mt-20">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Technology Overview */}

        <div className="space-y-6">
          <h3 className="text-2xl font-semibold mb-4">Technology</h3>

          <div className="space-y-4">
            {/* Open Source */}
            <div className="bg-card p-4 rounded-lg border">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Code className="h-4 w-4" />
                Open Source
              </h4>
              {project.blockchain_features?.opensource !== undefined ? (
                <div className="flex items-center gap-2">
                  {project.blockchain_features.opensource ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">Yes</span>
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600">No</span>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No data available
                </p>
              )}
            </div>

            {/* Asset Custody */}
            <div className="bg-card p-4 rounded-lg border">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Asset Custody
              </h4>
              {project.blockchain_features?.asset_custody_type ? (
                <p className="text-muted-foreground text-sm">
                  {project.blockchain_features.asset_custody_type}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No data available
                </p>
              )}
            </div>

            {/* Upgradability */}
            <div className="bg-card p-4 rounded-lg border">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Upgradability
              </h4>
              {project.blockchain_features?.upgradability ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {project.blockchain_features.upgradability.enabled ? (
                      <>
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-green-600">Enabled</span>
                      </>
                    ) : (
                      <>
                        <X className="h-4 w-4 text-red-500" />
                        <span className="text-sm text-red-600">Disabled</span>
                      </>
                    )}
                  </div>
                  {project.blockchain_features.upgradability.type && (
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Type:</span>{" "}
                      {project.blockchain_features.upgradability.type}
                    </p>
                  )}
                  {project.blockchain_features.upgradability.admin_keys && (
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">Admin Keys:</span>{" "}
                      {project.blockchain_features.upgradability.admin_keys}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No data available
                </p>
              )}
            </div>

            {/* Technology Type */}
            <div className="bg-card p-4 rounded-lg border">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                Technology Type
              </h4>
              {project.technology?.type ? (
                <p className="text-muted-foreground text-sm">
                  {project.technology.type}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No data available
                </p>
              )}
            </div>

            {/* Peer to Peer (P2P) */}
            <div className="bg-card p-4 rounded-lg border">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Network className="h-4 w-4" />
                Peer to Peer (P2P)
              </h4>
              {project.blockchain_features?.p2p !== undefined ? (
                <div className="flex items-center gap-2">
                  {project.blockchain_features.p2p ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">Supported</span>
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600">
                        Not Supported
                      </span>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No data available
                </p>
              )}
            </div>

            {/* Decentralized Storage */}
            <div className="bg-card p-4 rounded-lg border">
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Database className="h-4 w-4" />
                Decentralized Storage
              </h4>
              {project.storage?.decentralized !== undefined ? (
                <div className="flex items-center gap-2">
                  {project.storage.decentralized ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">Yes</span>
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600">No</span>
                    </>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No data available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
