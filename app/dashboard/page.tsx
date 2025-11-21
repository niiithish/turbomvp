import { currentUser } from "@/lib/auth-helpers";

export default async function DashboardPage() {
  const user = await currentUser();

  return (
    <div className="grid gap-4">
      <h2 className="font-bold text-2xl">
        Welcome back, {user?.name || "User"}!
      </h2>
      <div className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
        <h3 className="mb-2 font-semibold">User Details</h3>
        <pre className="overflow-auto rounded bg-muted p-2 text-xs">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}
