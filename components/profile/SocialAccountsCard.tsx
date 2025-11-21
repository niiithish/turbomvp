"use client";

import {
  CheckmarkCircle02Icon,
  GithubIcon,
  GoogleIcon,
  Link02Icon,
  Loading03Icon,
} from "hugeicons-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface SocialAccount {
  provider: "google" | "github";
  linked: boolean;
}

export function SocialAccountsCard() {
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([
    { provider: "google", linked: true },
    { provider: "github", linked: false },
  ]);
  const [linkingProvider, setLinkingProvider] = useState<string | null>(null);

  const handleLinkSocial = async (provider: "google" | "github") => {
    setLinkingProvider(provider);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSocialAccounts((prev) =>
      prev.map((acc) =>
        acc.provider === provider ? { ...acc, linked: true } : acc
      )
    );
    setLinkingProvider(null);
    toast.success(`Linked ${provider} account`);
  };

  const handleUnlinkSocial = (provider: "google" | "github") => {
    setSocialAccounts((prev) =>
      prev.map((acc) =>
        acc.provider === provider ? { ...acc, linked: false } : acc
      )
    );
    toast.success(`Unlinked ${provider} account`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium">Connected Accounts</h3>
        <p className="text-muted-foreground text-sm">
          Connect your social accounts to sign in faster.
        </p>
      </div>

      <div className="space-y-3">
        {socialAccounts.map((account) => (
          <div
            className="flex items-center justify-between rounded-sm border bg-card p-3"
            key={account.provider}
          >
            <div className="flex items-center gap-3">
              {account.provider === "google" ? (
                <GoogleIcon className="size-5" />
              ) : (
                <GithubIcon className="size-5" />
              )}
              <div>
                <div className="font-medium capitalize">{account.provider}</div>
                {account.linked ? (
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <CheckmarkCircle02Icon className="size-3" />
                    Connected
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm">
                    Not connected
                  </div>
                )}
              </div>
            </div>

            {account.linked ? (
              <Button
                className="text-destructive hover:text-destructive"
                onClick={() => handleUnlinkSocial(account.provider)}
                size="sm"
                variant="outline"
              >
                Unlink
              </Button>
            ) : (
              <Button
                disabled={linkingProvider === account.provider}
                onClick={() => handleLinkSocial(account.provider)}
                size="sm"
                variant="outline"
              >
                {linkingProvider === account.provider ? (
                  <Loading03Icon className="mr-1 size-3 animate-spin" />
                ) : (
                  <Link02Icon className="mr-1 size-3" />
                )}
                Link
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
