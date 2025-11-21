import { currentUser } from "@/lib/auth-helpers";
import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics";
import ChartAreaAxes from "@/components/dashboard/ChartAreaAxes";
import ChartBarActive from "@/components/dashboard/ChartBarActive";
import TableWithActions, {
  title as tableTitle,
} from "@/components/dashboard/TableWithActions";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Metrics Overview */}
      <DashboardMetrics />

      {/* Charts Section */}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 min-w-0">
          <ChartAreaAxes />
        </div>
        <div className="lg:col-span-2 min-w-0">
          <ChartBarActive />
        </div>
      </div>

      <TableWithActions />
    </div>
  );
}
