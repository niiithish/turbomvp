"use client";

import { Camera01Icon } from "hugeicons-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PersonalDetails() {
  const [formData, setFormData] = useState({
    firstName: "Niiithish",
    lastName: "User",
    avatar: "https://github.com/shadcn.png",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="group relative">
          <Avatar className="h-20 w-20 cursor-pointer border-2 border-border transition-all group-hover:border-primary">
            <AvatarImage src={formData.avatar} />
            <AvatarFallback>NU</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
            <Camera01Icon className="size-6 text-white" />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="font-medium">Profile photo</h3>
          <p className="text-muted-foreground text-sm">
            PNG, JPEG, SVG (Less than 5MB)
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            placeholder="Enter first name"
            value={formData.firstName}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            placeholder="Enter last name"
            value={formData.lastName}
          />
        </div>
      </div>
    </div>
  );
}
