import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { emailTheme } from "@/lib/email/theme";

type ChangeEmailOTPProps = {
  otp: string;
  userEmail?: string;
  userName?: string;
  appName?: string;
  expirationMinutes?: number;
  logoUrl?: string;
};

const nameSplitRegex = /\s+/;

export function ChangeEmailOTP({
  otp,
  userEmail,
  userName,
  appName,
  expirationMinutes = 10,
  logoUrl = "https://0o4pg1fpby.ufs.sh/f/RSbfEU0J8DcdtpRbOh6sAUj3N86LXf57JKBqdoixIRQHecMu",
}: ChangeEmailOTPProps) {
  const brand = appName ?? "AI SaaS";
  const previewText = `Your verification code for ${brand}`;
  const greetingName =
    userName?.trim().split(nameSplitRegex)[0] ||
    (userEmail ? userEmail.split("@")[0] : "there");

  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body
          className="mx-auto my-auto px-2"
          style={{
            backgroundColor: emailTheme.background,
            fontFamily:
              "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
          }}
        >
          <Container className="mx-auto my-10 max-w-[600px]">
            <Section
              className="border border-solid"
              style={{
                backgroundColor: emailTheme.cardBackground,
                borderColor: emailTheme.linkBackground,
                borderRadius: 12,
              }}
            >
              <Section className="p-8">
                <Section className="mb-8 text-center">
                  <Img
                    alt={`${brand} logo`}
                    className="mx-auto block"
                    src={logoUrl}
                    style={{ display: "block", height: "auto" }}
                    width={48}
                  />
                </Section>

                <Heading
                  className="m-0 mb-5 text-center font-semibold text-[24px] leading-[1.3]"
                  style={{ color: emailTheme.text, letterSpacing: "-0.01em" }}
                >
                  Verify your email change
                </Heading>

                <Text
                  className="mt-0 mb-3 text-[16px] leading-normal"
                  style={{ color: emailTheme.secondaryText, fontWeight: 500 }}
                >
                  Hello {greetingName},
                </Text>

                <Text
                  className="mt-0 mb-5 text-[14px] leading-normal"
                  style={{ color: emailTheme.secondaryText }}
                >
                  You requested to change your email address. Please use the
                  verification code below to confirm this action:
                </Text>

                <Section
                  className="my-6 text-center"
                  style={{
                    backgroundColor: emailTheme.linkBackground,
                    borderRadius: 8,
                    padding: "24px",
                  }}
                >
                  <Text
                    className="m-0 font-bold font-mono text-[32px] tracking-wider"
                    style={{
                      color: emailTheme.primary,
                      letterSpacing: "0.25em",
                    }}
                  >
                    {otp}
                  </Text>
                </Section>

                <Text
                  className="mt-5 mb-3 text-[14px] leading-normal"
                  style={{ color: emailTheme.secondaryText }}
                >
                  This code will expire in{" "}
                  <span style={{ fontWeight: 600 }}>
                    {expirationMinutes} minutes
                  </span>
                  .
                </Text>

                <Hr
                  className="mx-0 my-6 w-full border border-solid"
                  style={{ borderColor: emailTheme.linkBackground }}
                />

                <Text
                  className="mt-0 mb-3 text-[12px] leading-normal"
                  style={{ color: emailTheme.mutedText }}
                >
                  <span style={{ fontWeight: 600 }}>Security Notice:</span> Do
                  not share this code with anyone. {brand} will never ask you
                  for this code.
                </Text>

                <Text
                  className="mt-3 mb-4 text-[12px] leading-normal"
                  style={{ color: emailTheme.mutedText }}
                >
                  If you didn't request to change your email address, please
                  ignore this email and ensure your account is secure.
                </Text>
              </Section>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default ChangeEmailOTP;
