import { currentUser } from "@/lib/auth-helpers";

export default async function DashboardPage() {
  const user = await currentUser();
  
  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-bold">Welcome back, {user?.name || "User"}!</h2>
      <div className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
        <h3 className="font-semibold mb-2">User Details</h3>
        <pre className="bg-muted p-2 rounded text-xs overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}
