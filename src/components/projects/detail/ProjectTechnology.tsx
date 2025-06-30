import { Project } from "@/types/project";
import {
  Check,
  Code,
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
            {project.blockchain_features?.opensource !== undefined && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Open Source
                </h4>
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
              </div>
            )}

            {/* Peer to Peer (P2P) */}
            {project.blockchain_features?.p2p !== undefined && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Network className="h-4 w-4" />
                  Peer to Peer (P2P)
                </h4>
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
              </div>
            )}

            {/* Asset Custody */}
            {project.blockchain_features?.asset_custody_type && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Asset Custody
                </h4>
                <p className="text-muted-foreground text-sm">
                  {project.blockchain_features.asset_custody_type}
                </p>
              </div>
            )}

            {/* Upgradability */}
            {project.blockchain_features?.upgradability && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Upgradability
                </h4>
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
              </div>
            )}

            {/* Decentralized Storage */}
            {project.storage?.decentralized !== undefined && (
              <div className="bg-card p-4 rounded-lg border">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Decentralized Storage
                </h4>
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
              </div>
            )}

            {/* Additional Blockchain Features */}
            <div className="bg-card p-4 rounded-lg border">
              <h4 className="font-medium mb-2">Additional Features</h4>
              <div className="space-y-2">
                {project.blockchain_features?.encryption && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Encryption:</span>{" "}
                    {project.blockchain_features.encryption}
                  </p>
                )}
                {project.blockchain_features?.network && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Network:</span>{" "}
                    {project.blockchain_features.network}
                  </p>
                )}
                {project.blockchain_features?.viewing_key !== undefined && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Viewing Key:</span>{" "}
                    {project.blockchain_features.viewing_key
                      ? "Supported"
                      : "Not Supported"}
                  </p>
                )}
                {project.blockchain_features?.dissapearing_tx !== undefined && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">
                      Disappearing Transactions:
                    </span>{" "}
                    {project.blockchain_features.dissapearing_tx
                      ? "Supported"
                      : "Not Supported"}
                  </p>
                )}
                {project.blockchain_features?.connected_tx !== undefined && (
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Connected Transactions:</span>{" "}
                    {project.blockchain_features.connected_tx
                      ? "Supported"
                      : "Not Supported"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
