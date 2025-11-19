import { Marquee } from "@/components/ui/marquee";
import {
  Logo01,
  Logo02,
  Logo03,
  Logo04,
  Logo05,
  Logo06,
  Logo07,
  Logo08,
} from "@/components/landing/Logos";

const logos = [
  Logo01,
  Logo02,
  Logo03,
  Logo04,
  Logo05,
  Logo06,
  Logo07,
  Logo08,
];

const LogoCloud = () => {
  return (
    <div className="py-12 md:py-20 bg-background border-y border-border/40">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          <p className="text-sm font-medium text-muted-foreground text-center uppercase tracking-wider">
            Trusted by the world's leading organizations
          </p>

          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:30s] [--gap:3rem]">
              {logos.map((Logo, index) => (
                <div key={index} className="flex items-center justify-center h-12 w-32 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                  <Logo className="h-8 w-auto object-contain" />
                </div>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background dark:from-background"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCloud;
