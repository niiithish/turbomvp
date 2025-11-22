"use client";

import { useCallback, useEffect, useState } from "react";

// import { useSessionOptimized } from '@/components/auth/SessionProvider';

// Mock session hook since auth component is missing
const useSessionOptimized = () => ({
  session: {
    user: {
      id: "mock-user-id",
      firstName: "Mock",
      lastName: "User",
      email: "mock@example.com",
      image: null,
    },
  },
  isLoading: false,
});

import { FloppyDiskIcon, Loading03Icon, UserIcon } from "hugeicons-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getProfileAction,
  updateProfileAction,
} from "@/lib/actions/profile-actions";

type Profile = {
  id: string;
  user_id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export function ProfileManager() {
  const { session, isLoading: sessionLoading } = useSessionOptimized();
  const user = session?.user;

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
  });

  // Load existing profile on component mount
  const loadProfile = useCallback(async () => {
    if (!user) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await getProfileAction();

      if (result.success && result.profile) {
        setProfile(result.profile);
        setFormData({
          first_name: result.profile.first_name || "",
          last_name: result.profile.last_name || "",
          username: result.profile.username || "",
        });
      } else {
        toast.error(result.error || "Failed to load profile");
      }
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!sessionLoading && user) {
      loadProfile();
    }
  }, [sessionLoading, user, loadProfile]);

  const handleInputChange =
    (field: keyof typeof formData) => (e: { target: { value: string } }) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleSave = async () => {
    if (!user) {
      toast.error("Please sign in to update your profile");
      return;
    }

    setIsSaving(true);

    try {
      const updateResult = await updateProfileAction(formData);

      if (updateResult.success) {
        toast.success("Profile updated successfully");
        await loadProfile();
      } else {
        toast.error(updateResult.error || "Failed to update profile");
        if (updateResult.details) {
          console.error("Profile update error:", updateResult.details);
        }
      }
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Profile update error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (sessionLoading || isLoading) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Profile Manager</CardTitle>
          <CardDescription>Loading your profile...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <Loading03Icon className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!user) {
    return (
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Profile Manager</CardTitle>
          <CardDescription>
            Please sign in to manage your profile.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const getInitials = () => {
    if (formData.first_name && formData.last_name) {
      return `${formData.first_name[0]}${formData.last_name[0]}`;
    }
    if (user.firstName && user.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    return user.email[0].toUpperCase();
  };

  const displayName = (() => {
    if (formData.first_name && formData.last_name) {
      return `${formData.first_name} ${formData.last_name}`;
    }
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.email;
  })();

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserIcon className="h-5 w-5" />
          Profile Manager
        </CardTitle>
        <CardDescription>Manage your profile information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage alt={displayName} src={user.image || undefined} />
            <AvatarFallback>{getInitials()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-lg">{displayName}</h3>
            <p className="text-muted-foreground text-sm">{user.email}</p>
            <p className="text-muted-foreground text-xs">User ID: {user.id}</p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                onChange={handleInputChange("first_name")}
                placeholder="Enter your first name"
                value={formData.first_name}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                onChange={handleInputChange("last_name")}
                placeholder="Enter your last name"
                value={formData.last_name}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              onChange={handleInputChange("username")}
              placeholder="Enter your username"
              value={formData.username}
            />
          </div>

          {/* Profile Status */}
          {profile && (
            <div className="rounded-sm bg-muted/50 p-3">
              <h4 className="mb-1 font-medium text-sm">Profile Status</h4>
              <div className="space-y-1 text-muted-foreground text-xs">
                <p>Profile ID: {profile.id}</p>
                <p>
                  Last updated: {new Date(profile.updated_at).toLocaleString()}
                </p>
                <p>Created: {new Date(profile.created_at).toLocaleString()}</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <Button className="w-full" disabled={isSaving} onClick={handleSave}>
          {isSaving ? (
            <>
              <Loading03Icon className="mr-2 h-4 w-4 animate-spin" />
              Updating Profile...
            </>
          ) : (
            <>
              <FloppyDiskIcon className="mr-2 h-4 w-4" />
              Update Profile
            </>
          )}
        </Button>

        {/* Instructions */}
        <div className="rounded-sm bg-muted/30 p-3 text-muted-foreground text-xs">
          <p className="mb-1 font-medium">How it works:</p>
          <ul className="list-inside list-disc space-y-1">
            <li>
              Update your profile information and click "Update Profile" to save
              changes
            </li>
            <li>Your email is managed through your account settings</li>
            <li>Changes are saved to your profile database</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
