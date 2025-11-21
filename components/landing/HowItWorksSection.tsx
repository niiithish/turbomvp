import DottedLine from "@/components/landing/DottedLine";

export default function HowItWorksSection() {
  const steps = [
    {
      id: 1,
      title: "Clone the Repo",
      description:
        "Get a clean, local copy of the codebase. No complex installers.",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
    },
    {
      id: 2,
      title: "Add Your Keys",
      description:
        "Open the .env.local.example file, rename it, and paste in your credentials.",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
    },
    {
      id: 3,
      title: "Run the Dev Server",
      description:
        "That's it. Your new app is running locally with a database, authentication, and payments ready to go.",
      image:
        "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
    },
  ];

  return (
    <section
      className="bg-muted px-6 md:px-8 py-24 md:py-32"
      id="how-it-works"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-8 font-semibold text-4xl text-foreground leading-[1.15] tracking-tighter md:text-5xl">
            The 5-Minute Promise
          </h2>
          <p className="mx-auto max-w-4xl text-muted-foreground text-xl leading-relaxed">
            Here's The Workflow.{" "}
            <span className="font-medium text-foreground">All Of It.</span> This
            isn't an exaggeration. This is the <em>entire</em> setup process.
          </p>
        </div>

        <div className="relative">
          <div className="relative grid gap-12 lg:grid-cols-3 lg:gap-16">
            {steps.map((step, index) => (
              <div className="relative z-10" key={step.id}>
                <div className="px-4 text-center">
                  <div className="relative mb-8 inline-block">
                    {/* biome-ignore lint/performance/noImgElement: External image */}
                    <img
                      alt={step.title}
                      className="mx-auto h-44 w-80 rounded-xl object-cover shadow-lg"
                      height={176}
                      src={step.image}
                      width={320}
                    />
                    <div className="-top-3 -left-3 absolute flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-primary font-bold text-primary-foreground text-sm shadow-md">
                      {step.id}
                    </div>
                  </div>
                  <h3 className="mb-4 font-semibold text-foreground text-lg tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mx-auto max-w-sm text-base text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
                {/* Dotted line connector between cards */}
                {index < steps.length - 1 && (
                  <DottedLine
                    className="-z-10 pointer-events-none absolute top-16 left-1/2 hidden h-16 w-full text-muted-foreground lg:block"
                    inverted={index === 1}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
