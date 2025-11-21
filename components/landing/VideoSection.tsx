"use client";

export default function VideoSection() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col items-center gap-6">
          <h2 className="text-center font-semibold text-4xl leading-[1.15] tracking-tighter md:text-5xl lg:max-w-4xl">
            Accelerate Your Development
          </h2>
          <p className="text-center text-muted-foreground text-xl lg:max-w-2xl">
            Watch how our AI-powered SaaS template helps you skip the boilerplate and ship your product in record time.
          </p>
        </div>
        <div className="max-w-5xl mx-auto">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/5 bg-card">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/xwJhhPCweWk"
              title="Product Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
