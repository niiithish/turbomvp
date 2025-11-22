"use client";

export default function VideoSection() {
  return (
    <section className="bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col items-center gap-6">
          <h2 className="text-center font-semibold text-4xl leading-[1.15] tracking-tighter md:text-5xl lg:max-w-4xl">
            Accelerate Your Development
          </h2>
          <p className="text-center text-muted-foreground text-xl lg:max-w-2xl">
            Watch how this SaaS starter kit helps you skip the boilerplate and
            ship your product in record time.
          </p>
        </div>
        <div className="mx-auto max-w-5xl">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border/50 bg-card shadow-2xl shadow-primary/5">
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 h-full w-full"
              src="https://www.youtube.com/embed/xwJhhPCweWk"
              title="Product Demo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
