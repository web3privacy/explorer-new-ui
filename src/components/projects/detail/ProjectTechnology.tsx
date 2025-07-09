import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Project } from "@/types/project";
import {
  Check,
  CircleFadingArrowUp,
  Code,
  Cpu,
  Database,
  Info,
  Network,
  Shield,
  X,
} from "lucide-react";

interface ProjectTechnologyProps {
  project: Project;
}

interface DataPoint {
  icon: React.ComponentType<{ className?: string }>;
  key: string;
  getValue: () => boolean | string | undefined;
  isBoolean?: boolean;
  inverted?: boolean;
  positiveDisplay?: string;
  negativeDisplay?: string;
}

export function ProjectTechnology({ project }: ProjectTechnologyProps) {
  const opensource = project.blockchain_features?.opensource;
  const assetCustodyType = project.blockchain_features?.asset_custody_type;
  const upgradability = project.blockchain_features?.upgradability;
  const technologyType = project.technology?.type;
  const p2pSupport = project.blockchain_features?.p2p;
  const decentralizedStorage = project.storage?.decentralized;

  const dataPoints: DataPoint[] = [
    {
      icon: Code,
      key: "Open Source",
      getValue: () => opensource,
      isBoolean: true,
      positiveDisplay: "Yes",
      negativeDisplay: "No",
    },
    {
      icon: Database,
      key: "Decentralized Storage",
      getValue: () => decentralizedStorage,
      isBoolean: true,
      positiveDisplay: "Yes",
      negativeDisplay: "No",
    },
    {
      icon: CircleFadingArrowUp,
      key: "Upgradability",
      getValue: () => upgradability?.enabled,
      isBoolean: true,
      inverted: true,
      positiveDisplay: "No",
      negativeDisplay: "Yes",
    },
    {
      icon: Network,
      key: "Peer to Peer (P2P)",
      getValue: () => p2pSupport,
      isBoolean: true,
      positiveDisplay: "Supported",
      negativeDisplay: "Not Supported",
    },
    {
      icon: Shield,
      key: "Asset Custody",
      getValue: () => assetCustodyType,
    },
    {
      icon: Cpu,
      key: "Technology Type",
      getValue: () => technologyType,
    },
  ];

  const renderValue = (dataPoint: DataPoint) => {
    const value = dataPoint.getValue();

    if (value === undefined || value === null) {
      return (
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            No data available
          </span>
        </div>
      );
    }

    if (dataPoint.isBoolean) {
      const rawValue = Boolean(value);
      const isPositive = dataPoint.inverted ? !rawValue : rawValue;
      const IconComponent = isPositive ? Check : X;
      const displayText = isPositive
        ? dataPoint.positiveDisplay
        : dataPoint.negativeDisplay;

      return (
        <div className="flex items-center gap-2">
          <IconComponent
            className={`h-4 w-4 ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          />
          <span
            className={`text-sm ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {displayText}
          </span>
        </div>
      );
    }

    return <span className="text-sm text-muted-foreground">{value}</span>;
  };

  return (
    <section id="technology" className="scroll-mt-20">
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold">Technology</h3>

        <Card>
          <CardContent>
            <Table>
              <TableBody>
                {dataPoints.map((dataPoint) => {
                  const IconComponent = dataPoint.icon;
                  return (
                    <TableRow key={dataPoint.key}>
                      <TableCell className="text-muted-foreground flex items-center gap-2">
                        <IconComponent className="h-4 w-4" />
                        {dataPoint.key}
                      </TableCell>
                      <TableCell>{renderValue(dataPoint)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
