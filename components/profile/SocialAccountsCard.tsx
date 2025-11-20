"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { GoogleIcon, GithubIcon, CheckmarkCircle02Icon, Link02Icon, Loading03Icon } from "hugeicons-react";

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
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSocialAccounts(prev => prev.map(acc => acc.provider === provider ? { ...acc, linked: true } : acc));
    setLinkingProvider(null);
    toast.success(`Linked ${provider} account`);
  };

  const handleUnlinkSocial = (provider: "google" | "github") => {
    setSocialAccounts(prev => prev.map(acc => acc.provider === provider ? { ...acc, linked: false } : acc));
    toast.success(`Unlinked ${provider} account`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium">Connected Accounts</h3>
        <p className="text-sm text-muted-foreground">
          Connect your social accounts to sign in faster.
        </p>
      </div>

      <div className="space-y-3">
        {socialAccounts.map((account) => (
          <div
            key={account.provider}
            className="flex items-center justify-between p-3 border rounded-sm bg-card"
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
                  <div className="flex items-center gap-1 text-sm text-green-600">
                    <CheckmarkCircle02Icon className="size-3" />
                    Connected
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground">Not connected</div>
                )}
              </div>
            </div>

            {account.linked ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleUnlinkSocial(account.provider)}
                className="text-destructive hover:text-destructive"
              >
                Unlink
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleLinkSocial(account.provider)}
                disabled={linkingProvider === account.provider}
              >
                {linkingProvider === account.provider ? (
                  <Loading03Icon className="size-3 mr-1 animate-spin" />
                ) : (
                  <Link02Icon className="size-3 mr-1" />
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