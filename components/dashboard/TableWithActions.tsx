"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontalIcon } from "hugeicons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const title = "Recent API Calls";

type ApiCall = {
  id: string;
  user: string;
  model: string;
  status: string;
  latency: string;
  cost: number;
};

const data: ApiCall[] = [
  {
    id: "req_8x92ns",
    user: "alice@example.com",
    model: "gpt-4",
    status: "success",
    latency: "1.2s",
    cost: 0.04,
  },
  {
    id: "req_9s83kd",
    user: "bob@company.com",
    model: "claude-3",
    status: "success",
    latency: "0.8s",
    cost: 0.02,
  },
  {
    id: "req_2k9s8d",
    user: "charlie@dev.io",
    model: "gpt-3.5",
    status: "failed",
    latency: "0.1s",
    cost: 0.0,
  },
  {
    id: "req_7d2k9s",
    user: "david@app.net",
    model: "llama-3",
    status: "success",
    latency: "0.5s",
    cost: 0.01,
  },
  {
    id: "req_4m2n9x",
    user: "eve@startup.ai",
    model: "gpt-4",
    status: "success",
    latency: "1.5s",
    cost: 0.05,
  },
];

const columns: ColumnDef<ApiCall>[] = [
  {
    accessorKey: "id",
    header: "Request ID",
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("user")}</div>
    ),
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("model")}</div>
    ),
  },
  {
    accessorKey: "latency",
    header: "Latency",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-sm">{row.getValue("latency")}</span>
      </div>
    ),
  },
  {
    accessorKey: "cost",
    header: () => <div className="text-right">Cost</div>,
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("cost"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      let badgeClass =
        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";

      if (status === "success") {
        badgeClass =
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      } else if (status === "processing") {
        badgeClass =
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      }

      return (
        <div className="flex items-center">
          <span
            className={`inline-flex rounded-full px-2 py-1 font-semibold text-xs ${badgeClass}`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const call = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontalIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(call.id)}
            >
              Copy Request ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Logs</DropdownMenuItem>
            <DropdownMenuItem>View Trace</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const Example = () => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <div className="rounded-md border bg-background">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Example;
