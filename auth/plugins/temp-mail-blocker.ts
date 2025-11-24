import { BetterAuthPlugin } from "better-auth";
import { APIError } from "better-auth/api";
import { isDisposableEmail } from "@/lib/disposable-email";

export const tempMailBlocker = () => {
    return {
        id: "temp-mail-blocker",
        hooks: {
            before: [
                {
                    matcher: (context) => context.path === "/sign-up/email",
                    handler: async (context) => {
                        const body = context.body as Record<string, any>;
                        const email = body?.email;
                        if (email && isDisposableEmail(email)) {
                            throw new APIError("BAD_REQUEST", {
                                message: "Disposable email addresses are not allowed",
                            });
                        }
                    },
                },
            ],
        },
    } satisfies BetterAuthPlugin;
};
