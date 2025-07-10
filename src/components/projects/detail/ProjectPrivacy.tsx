import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Project } from "@/types/project";
import {
  Check,
  CheckCircle,
  Database,
  FileText,
  Info,
  Lock,
  LogIn,
  ShieldCheck,
  ShieldX,
  UserCheck,
  X,
} from "lucide-react";

interface ProjectPrivacyProps {
  project: Project;
}

interface DataPoint {
  icon: React.ComponentType<{ className?: string }>;
  key: string;
  getValue: () => boolean | string | string[] | undefined;
  isBoolean?: boolean;
  inverted?: boolean;
  positiveDisplay?: string;
  negativeDisplay?: string;
  isArray?: boolean;
  renderAsBadges?: boolean;
}

export function ProjectPrivacy({ project }: ProjectPrivacyProps) {
  const defaultPrivacy = project.default_privacy;
  const kyc = project.tracebility?.kyc;
  const privacyPolicyDefined = project.privacy_policy?.defined;
  const compliance = project.compliance;
  const signInRequirements = project.tracebility?.sign_in_type_requirments;
  const collectedData = project.tracebility?.tracked_data;
  const dataUsage = project.privacy_policy?.data_usage;

  const dataPoints: DataPoint[] = [
    {
      icon: UserCheck,
      key: "Know Your Customer (KYC)",
      getValue: () => kyc,
      isBoolean: true,
      inverted: true,
      positiveDisplay: "Not Required",
      negativeDisplay: "Required",
    },
    {
      icon: FileText,
      key: "Privacy Policy",
      getValue: () => privacyPolicyDefined,
      isBoolean: true,
      positiveDisplay: "Defined",
      negativeDisplay: "Not Defined",
    },
    {
      icon: CheckCircle,
      key: "Compliance",
      getValue: () => compliance,
    },
    {
      icon: LogIn,
      key: "Sign-in Requirements",
      getValue: () => signInRequirements,
      isArray: true,
      renderAsBadges: true,
    },
    {
      icon: Database,
      key: "Collected Data",
      getValue: () => collectedData,
    },
    {
      icon: Database,
      key: "Data Usage",
      getValue: () => dataUsage,
    },
  ];

  const renderValue = (dataPoint: DataPoint) => {
    const value = dataPoint.getValue();

    if (value === undefined || value === null || value === "") {
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

    if (dataPoint.isArray && Array.isArray(value)) {
      if (value.length === 0) {
        return (
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              No data available
            </span>
          </div>
        );
      }

      if (dataPoint.renderAsBadges) {
        return (
          <div className="flex flex-wrap gap-2">
            {value.map((item, index) => (
              <Badge key={index} variant="secondary">
                {item}
              </Badge>
            ))}
          </div>
        );
      }

      return (
        <div className="space-y-1">
          {value.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              {item}
            </div>
          ))}
        </div>
      );
    }

    return <span className="text-sm text-muted-foreground">{value}</span>;
  };

  return (
    <section id="privacy" className="scroll-mt-20">
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Lock className="h-6 w-6" />
            Privacy
            {defaultPrivacy !== undefined && (
              <div className="flex items-center gap-1">
                {defaultPrivacy ? (
                  <>
                    <ShieldCheck className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-600">
                      Enabled by default
                    </span>
                  </>
                ) : (
                  <>
                    <ShieldX className="h-4 w-4 text-red-500" />
                    <span className="text-xs text-red-600">
                      Disabled by default
                    </span>
                  </>
                )}
              </div>
            )}
          </h3>
          <Separator />
        </div>

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
