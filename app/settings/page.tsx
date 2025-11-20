import { Separator } from "@/components/ui/separator";
import { PersonalDetails } from "@/components/profile/PersonalDetails";
import { SecuritySettings } from "@/components/profile/SecuritySettings";
import { Preferences } from "@/components/profile/Preferences";
import { SocialAccountsCard } from "@/components/profile/SocialAccountsCard";

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">

      
      <div className="space-y-8">
        <PersonalDetails />
        <SecuritySettings />
        <div className="pt-4">
          <Preferences />
        </div>
        <div className="pt-4">
          <SocialAccountsCard />
        </div>
      </div>
    </div>
  );
}
