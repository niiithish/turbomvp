import { MetricsCards } from "@/components/dashboard/MetricsCards"
import { ChartAreaInteractive } from "@/components/dashboard/ChartAreaInterActive"
import { DataTable, schema } from "@/components/dashboard/DataTable"
import { z } from "zod"

// Generate some dummy data matching the schema
const data: z.infer<typeof schema>[] = [
    {
        id: 1,
        header: "Q1 Financial Report",
        type: "Executive Summary",
        status: "Done",
        target: "$1.2M",
        limit: "$1.5M",
        reviewer: "Eddie Lake",
    },
    {
        id: 2,
        header: "Marketing Strategy 2024",
        type: "Narrative",
        status: "In Progress",
        target: "10k Leads",
        limit: "15k Leads",
        reviewer: "Jamik Tashpulatov",
    },
    {
        id: 3,
        header: "Product Roadmap",
        type: "Technical Approach",
        status: "Not Started",
        target: "v2.0 Launch",
        limit: "Q3 2024",
        reviewer: "Assign reviewer",
    },
    {
        id: 4,
        header: "Competitor Analysis",
        type: "Focus Documents",
        status: "Done",
        target: "Top 5",
        limit: "Global",
        reviewer: "Emily Whalen",
    },
    {
        id: 5,
        header: "User Research Findings",
        type: "Design",
        status: "In Progress",
        target: "100 Interviews",
        limit: "200 Interviews",
        reviewer: "Eddie Lake",
    },
    {
        id: 6,
        header: "System Architecture",
        type: "Technical Approach",
        status: "Done",
        target: "Scalable",
        limit: "Cloud Native",
        reviewer: "Jamik Tashpulatov",
    },
    {
        id: 7,
        header: "Security Audit",
        type: "Focus Documents",
        status: "Not Started",
        target: "Zero Vulns",
        limit: "ISO 27001",
        reviewer: "Assign reviewer",
    },
]

export default function DashboardPage() {
    return (
        <div className="flex flex-1 flex-col gap-4">
            <MetricsCards />
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
                <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
        </div>
    )
}
