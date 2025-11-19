"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { MoreHorizontalIcon, Search01Icon } from "hugeicons-react"

const employees = [
    {
        id: "#EP5659",
        name: "Cody Fisher",
        email: "masum@halallab.co",
        role: "Web Designer",
        status: "Full-time",
        avatar: "https://github.com/shadcn.png", // Placeholder
    },
    {
        id: "#AP2589",
        name: "Jane Cooper",
        email: "hello@hugeicons.com",
        role: "Product Designer",
        status: "Freelance",
        avatar: "https://github.com/shadcn.png", // Placeholder
    },
    {
        id: "#DS9735",
        name: "Albert Flores",
        email: "albertf@gmail.com",
        role: "Lead Designer",
        status: "Full-time",
        avatar: "https://github.com/shadcn.png", // Placeholder
    },
]

export function EmployeeTable() {
    return (
        <Card className="bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium">All Employee</CardTitle>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search01Icon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search"
                            className="w-[200px] pl-9 h-9 bg-background/50"
                        />
                    </div>
                    <Button variant="outline" size="sm" className="h-9">
                        See All
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-b border-border/50">
                            <TableHead className="w-[300px]">Name</TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id} className="hover:bg-muted/50 border-b border-border/50">
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={employee.avatar} alt={employee.name} />
                                            <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium leading-none">{employee.name}</span>
                                            <span className="text-xs text-muted-foreground mt-1">{employee.email}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{employee.id}</TableCell>
                                <TableCell>{employee.role}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className={`w-2 h-2 rounded-full ${employee.status === "Full-time" ? "bg-green-500" : "bg-blue-500"
                                                }`}
                                        />
                                        <span className={employee.status === "Full-time" ? "text-green-500" : "text-blue-500"}>
                                            {employee.status}
                                        </span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontalIcon className="h-4 w-4" />
                                        <span className="sr-only">Open menu</span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
