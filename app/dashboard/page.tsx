import { DashboardMetrics } from "@/components/dashboard/DashboardMetrics"
import { WorkPerformanceChart } from "@/components/dashboard/WorkPerformanceChart"
import { AttendanceChart } from "@/components/dashboard/AttendanceChart"
import { EmployeeTable } from "@/components/dashboard/EmployeeTable"

export default function DashboardPage() {
    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
            </div>

            <DashboardMetrics />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <WorkPerformanceChart />
                <AttendanceChart />
            </div>

            <EmployeeTable />
        </div>
    )
}
