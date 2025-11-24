"use client";

import { Alert01Icon, Loading03Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/auth/auth-client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { deleteAccount } from "@/lib/actions/auth-actions";

type DeleteAccountProps = {
  user: {
    email: string;
  };
};

export function DeleteAccount({ user }: DeleteAccountProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyPhrase, setVerifyPhrase] = useState("");

  const handleDelete = async () => {
    if (verifyEmail !== user.email) {
      toast.error("Email does not match");
      return;
    }

    if (verifyPhrase !== "Delete my account") {
      toast.error("Verification phrase does not match");
      return;
    }

    setIsLoading(true);
    try {
      const result = await deleteAccount(user.email);
      if (result.success) {
        await authClient.signOut();
        toast.success("Account deleted successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete account"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isDeleteEnabled =
    verifyEmail === user.email && verifyPhrase === "Delete my account";

  return (
    <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-medium text-destructive">Delete Account</h3>
          <p className="text-muted-foreground text-sm">
            Permanently delete your account and all of your content.
          </p>
        </div>
        <Dialog onOpenChange={setIsOpen} open={isOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone immediately. Your data will be
                retained for 15 days for security reasons before being
                permanently deleted.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="rounded-md bg-destructive/10 p-3">
                <div className="flex items-center gap-2 text-destructive">
                  <Alert01Icon className="h-5 w-5" />
                  <span className="font-medium">Warning</span>
                </div>
                <p className="mt-2 text-destructive/90 text-sm">
                  If you delete your account, you will lose access to all your
                  data.
                </p>
              </div>

              <div className="space-y-2">
                <Label>
                  Type your email{" "}
                  <span className="font-bold font-mono">{user.email}</span> to
                  confirm
                </Label>
                <Input
                  onChange={(e) => setVerifyEmail(e.target.value)}
                  placeholder={user.email}
                  value={verifyEmail}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Type{" "}
                  <span className="font-bold font-mono">Delete my account</span>{" "}
                  to confirm
                </Label>
                <Input
                  onChange={(e) => setVerifyPhrase(e.target.value)}
                  placeholder="Delete my account"
                  value={verifyPhrase}
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                disabled={isLoading}
                onClick={() => setIsOpen(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                disabled={!isDeleteEnabled || isLoading}
                onClick={handleDelete}
                variant="destructive"
              >
                {isLoading && (
                  <Loading03Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Delete Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
