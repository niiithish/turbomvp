import { currentUser } from "@/lib/auth-helpers";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import { MetricsCards } from "@/components/dashboard/MetricsCards";
import ChartAreaAxes, {
  title as chartAreaTitle,
} from "@/components/dashboard/ChartAreaAxes";
import ChartBarActive, {
  title as chartBarTitle,
} from "@/components/dashboard/ChartBarActive";
import TableWithActions, {
  title as tableTitle,
} from "@/components/dashboard/TableWithActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-6">
      {/* Metrics Overview */}
      <DashboardMetrics />

      {/* Chart Cards */}
      <MetricsCards />

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{chartAreaTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartAreaAxes />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{chartBarTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartBarActive />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>{tableTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <TableWithActions />
        </CardContent>
      </Card>
    </div>
  );
}
