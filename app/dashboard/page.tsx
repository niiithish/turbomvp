import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics"
import ChartAreaAxes from "@/components/dashboard/ChartAreaAxes"
import ChartBarActive from "@/components/dashboard/ChartBarActive"
import Example from "@/components/dashboard/TableWithActions"


export default function DashboardPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
            </div>
            <DashboardMetrics />
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-3/5">
                    <ChartAreaAxes />
                </div>
                <div className="w-full lg:w-2/5">
                    <ChartBarActive />
                </div>
            </div>
            <Example />
        </div>
    )
}
