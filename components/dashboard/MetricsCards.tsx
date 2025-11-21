import { ActiveUsersCard } from "./ActiveUsersCard";
import { RevenueCard } from "./RevenueCard";

export function MetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <RevenueCard />
      <ActiveUsersCard />
    </div>
  );
}
