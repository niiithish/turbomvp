import type { ReactNode } from "react";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: ReactNode;
}) => {
  const from = process.env.EMAIL_FROM || "onboarding@resend.dev";

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      react,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { error };
    }

    return { data };
  } catch (error) {
    console.error("Error sending email:", error);
    return { error };
  }
};
