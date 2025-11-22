"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useProfileUpdate } from "@/hooks/use-profile-update";

interface PreferencesProps {
  user: {
    timezone?: string | null;
    language?: string | null;
    use24Hour?: boolean | null;
  };
}

export function Preferences({ user }: PreferencesProps) {
  const { data, updateField, isLoading } = useProfileUpdate({
    initialData: {
      timezone: user.timezone || "utc",
      language: user.language || "en",
      use24Hour: user.use24Hour ?? true,
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-semibold text-lg">Preferences</h2>
        <p className="text-muted-foreground text-sm">
          Manage your application preferences
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>Timezone</Label>
          <Select
            onValueChange={(value) => updateField("timezone", value)}
            value={data.timezone!}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="utc">
                UTC (Coordinated Universal Time)
              </SelectItem>
              <SelectItem value="est">EST (Eastern Standard Time)</SelectItem>
              <SelectItem value="pst">PST (Pacific Standard Time)</SelectItem>
              <SelectItem value="ist">IST (Indian Standard Time)</SelectItem>
              <SelectItem value="gmt">GMT (Greenwich Mean Time)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Language</Label>
          <Select
            onValueChange={(value) => updateField("language", value)}
            value={data.language!}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English (US)</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
              <SelectItem value="ja">Japanese</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">24 hour time format</Label>
            <p className="text-muted-foreground text-sm">
              Example: 20:00 PM, 12-hour format if switch off
            </p>
          </div>
          <Switch
            checked={data.use24Hour!}
            onCheckedChange={(checked) => updateField("use24Hour", checked)}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
