import ChartAreaAxes from "@/components/dashboard/ChartAreaAxes";
import ChartBarActive from "@/components/dashboard/ChartBarActive";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import TableWithActions from "@/components/dashboard/TableWithActions";
import { currentUser } from "@/lib/auth/helpers";

export default async function DashboardPage() {
  const _user = await currentUser();

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Metrics Overview */}
      <DashboardMetrics />

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="min-w-0 lg:col-span-3">
          <ChartAreaAxes />
        </div>
        <div className="min-w-0 lg:col-span-2">
          <ChartBarActive />
        </div>
      </div>

      <TableWithActions />
    </div>
  );
}
