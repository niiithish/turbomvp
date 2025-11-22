import { Logo01, Logo02, Logo03, Logo04 } from "@/components/landing/Logos";
import { Marquee } from "@/components/ui/marquee";

const logos = [
  { id: "logo-1", Component: Logo01 },
  { id: "logo-2", Component: Logo02 },
  { id: "logo-3", Component: Logo03 },
  { id: "logo-4", Component: Logo04 },
];

const LogoCloud = () => (
  <div className="bg-background py-6 md:py-12">
    <div className="mx-auto max-w-7xl px-6 md:px-8">
      <div className="flex flex-col items-center gap-8">
        <p className="text-center font-medium text-muted-foreground text-sm uppercase tracking-wider">
          Trusted by the world's leading organizations
        </p>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <Marquee
            className="[--duration:30s] [--gap:3rem]"
            pauseOnHover
            repeat={6}
          >
            {logos.map(({ id, Component }) => (
              <div
                className="flex h-12 w-32 shrink-0 items-center justify-center opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                key={id}
              >
                <Component className="h-8 w-auto object-contain" />
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </div>
  </div>
);

export default LogoCloud;
