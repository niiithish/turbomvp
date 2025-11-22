"use client";

import { Camera01Icon } from "hugeicons-react";
import { useRef } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfileUpdate } from "@/hooks/use-profile-update";
import type { PersonalDetailsProps } from "@/types";

const ALLOWED_IMAGE_TYPES = /^image\/(jpeg|png)$/;

export function PersonalDetails({ user }: PersonalDetailsProps) {
  // Derive name parts if not explicitly set
  const nameParts = user.name ? user.name.split(" ") : [];
  const defaultFirstName = user.firstName || nameParts[0] || "";
  const defaultLastName = user.lastName || nameParts.slice(1).join(" ") || "";
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, updateField, isLoading } = useProfileUpdate({
    initialData: {
      firstName: defaultFirstName,
      lastName: defaultLastName,
      image: user.image || "",
    },
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.match(ALLOWED_IMAGE_TYPES)) {
      toast.error("Invalid file type. Please upload PNG or JPEG.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;

      // Validate image integrity
      const img = new Image();
      img.onload = () => {
        updateField("image", base64String);
      };
      img.onerror = () => {
        toast.error("Failed to load image. The file might be corrupted.");
      };
      img.src = base64String;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <button
          className="group relative cursor-pointer"
          onClick={handleImageClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleImageClick();
            }
          }}
          type="button"
        >
          <Avatar className="h-20 w-20 border-2 border-border transition-all group-hover:border-primary">
            <AvatarImage className="object-cover" src={data.image} />
            <AvatarFallback>
              {data.firstName?.[0] || user.name?.[0] || "U"}
              {data.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <Camera01Icon className="size-6 text-white" />
          </div>
          <input
            accept="image/png, image/jpeg"
            className="hidden"
            onChange={handleFileChange}
            ref={fileInputRef}
            type="file"
          />
        </button>
        <div className="space-y-1">
          <h3 className="font-medium">Profile photo</h3>
          <p className="text-muted-foreground text-sm">
            PNG, JPEG (Less than 2MB)
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            disabled={isLoading}
            id="firstName"
            onChange={(e) => updateField("firstName", e.target.value)}
            placeholder="Enter first name"
            value={data.firstName}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            disabled={isLoading}
            id="lastName"
            onChange={(e) => updateField("lastName", e.target.value)}
            placeholder="Enter last name"
            value={data.lastName}
          />
        </div>
      </div>
    </div>
  );
}
