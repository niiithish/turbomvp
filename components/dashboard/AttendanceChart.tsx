"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const data = [
    { name: "On Time", value: 46.7, color: "#10b981" }, // Green
    { name: "Delay Time", value: 35.2, color: "#f59e0b" }, // Orange
    { name: "On Leave", value: 27.1, color: "#3b82f6" }, // Blue
]

export function AttendanceChart() {
    return (
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">Attendance Overview</CardTitle>
                <Select defaultValue="today">
                    <SelectTrigger className="w-[100px] h-8 text-xs">
                        <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="yesterday">Yesterday</SelectItem>
                        <SelectItem value="last-week">Last Week</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="100%"
                                startAngle={180}
                                endAngle={0}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={0}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                                itemStyle={{ color: '#fff' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-4 text-center">
                        <div className="text-2xl font-bold">82%</div>
                        <div className="text-xs text-muted-foreground">Total Attendance</div>
                    </div>
                </div>
                <div className="flex justify-between mt-4 text-xs">
                    {data.map((item) => (
                        <div key={item.name} className="flex flex-col items-center">
                            <div className="flex items-center mb-1">
                                <div
                                    className="w-2 h-2 rounded-full mr-1"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="text-muted-foreground">{item.name}</span>
                            </div>
                            <span className="font-bold">{item.value}%</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
