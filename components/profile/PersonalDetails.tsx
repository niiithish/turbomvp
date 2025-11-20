'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera01Icon } from 'hugeicons-react';

export function PersonalDetails() {
  const [formData, setFormData] = useState({
    firstName: 'Niiithish',
    lastName: 'User',
    avatar: 'https://github.com/shadcn.png',
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <div className="relative group">
          <Avatar className="h-20 w-20 cursor-pointer border-2 border-border transition-all group-hover:border-primary">
            <AvatarImage src={formData.avatar} />
            <AvatarFallback>NU</AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Camera01Icon className="size-6 text-white" />
          </div>
        </div>
        <div className="space-y-1">
          <h3 className="font-medium">Profile photo</h3>
          <p className="text-sm text-muted-foreground">
            PNG, JPEG, SVG (Less than 5MB)
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            placeholder="Enter first name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            placeholder="Enter last name"
          />
        </div>
      </div>
    </div>
  );
}
