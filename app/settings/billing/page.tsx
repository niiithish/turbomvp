import PricingSection from "@/components/landing/PricingSection";
import { Separator } from "@/components/ui/separator";

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-lg">Billing</h3>
        <p className="text-muted-foreground text-sm">
          Manage your billing information and subscription plan.
        </p>
      </div>
      <Separator />
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <PricingSection />
      </div>
    </div>
  );
}
