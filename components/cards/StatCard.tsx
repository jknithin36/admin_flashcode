import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

// ✅ Interface for props
interface StatCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: string;
  subtext: string;
  icon?: "up" | "down" | ""; // ✅ Allow empty string for no icon
}

// ✅ Functional component with typed props
export function StatCard({
  title,
  value,
  change,
  trend,
  subtext,
  icon = "",
}: StatCardProps) {
  const Icon =
    icon === "down" ? TrendingDownIcon : icon === "up" ? TrendingUpIcon : null; // ✅ Handle empty string

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
          {value}
        </CardTitle>
        {icon && (
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {Icon && <Icon className="size-3" />}
              {change}
            </Badge>
          </div>
        )}
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1 text-sm">
        <div className="flex gap-2 font-medium">
          {trend} {Icon && <Icon className="size-4" />}
        </div>
        <div className="text-muted-foreground">{subtext}</div>
      </CardFooter>
    </Card>
  );
}
