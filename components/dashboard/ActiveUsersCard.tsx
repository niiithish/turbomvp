"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ActiveUsersCard() {
  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle>Active Users</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="font-bold text-3xl">2,847</div>
        <p className="text-muted-foreground text-xs">
          <span className="text-primary">+12.5%</span> from last month
        </p>
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between rounded-sm bg-muted/50 p-2">
            <span className="text-muted-foreground text-xs">Daily Active</span>
            <span className="font-semibold text-xs">1,234</span>
          </div>
          <div className="flex items-center justify-between rounded-sm bg-muted/50 p-2">
            <span className="text-muted-foreground text-xs">Weekly Active</span>
            <span className="font-semibold text-xs">2,103</span>
          </div>
          <div className="flex items-center justify-between rounded-sm bg-muted/50 p-2">
            <span className="text-muted-foreground text-xs">
              Monthly Active
            </span>
            <span className="font-semibold text-xs">2,847</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
