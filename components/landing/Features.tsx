interface Feature {
  title: string;
  description: string;
  image: string;
}

interface FeaturesProps {
  title?: string;
  description?: string;
  feature1?: Feature;
  feature2?: Feature;
  feature3?: Feature;
  feature4?: Feature;
}

const Features = ({
  title = "Focus on what matters",
  description = "Explore powerful features designed to help teams plan, track, and deliver tasks with ease.",
  feature1 = {
    title: "Stay organized & manage tasks easily",
    description:
      "Prioritize, track progress, and manage everything in one place for a smoother workflow.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  feature2 = {
    title: "AI teammate",
    description:
      "Oasis AI handles tasks and predicts timelines to keep you on track.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  feature3 = {
    title: "Team collaboration",
    description:
      "Work seamlessly with your team. Share, assign, and succeed together.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  feature4 = {
    title: "Powerful data integration without limits",
    description:
      "Easily integrate data from any source to create a seamless, automated, and unified workflow system.",
    image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
}: FeaturesProps) => {
  return (
    <section id="features" className="py-(--section-padding-y-lg)">
      <div className="container max-w-(--container-max-w) mx-auto px-(--container-padding-x)">
        <div className="mb-16 flex flex-col items-center gap-6">
          <h2 className="text-center text-4xl md:text-5xl leading-[1.15] font-semibold tracking-tighter lg:max-w-4xl">
            {title}
          </h2>
          <p className="text-muted-foreground text-center text-xl lg:max-w-2xl">
            {description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:max-w-6xl mx-auto">
          {/* Row 1 */}
          {/* Feature 1 - Big Left (7 cols) */}
          <div className="lg:col-span-7 border-border flex flex-col justify-between rounded-(--card-radius-lg) border bg-card p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-full flex-1 flex items-center justify-center mb-8 bg-muted/20 rounded-(--card-radius) overflow-hidden">
               <img
                src={feature1.image}
                alt={feature1.title}
                className="w-full h-[300px] object-cover aspect-[16/9]"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{feature1.title}</h3>
              <p className="text-muted-foreground text-base mt-2">{feature1.description}</p>
            </div>
          </div>

          {/* Feature 2 - Small Right (5 cols) */}
          <div className="lg:col-span-5 border-border flex flex-col justify-between rounded-(--card-radius-lg) border bg-card p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-full flex-1 flex items-center justify-center mb-8 bg-muted/20 rounded-(--card-radius) overflow-hidden">
              <img
                src={feature2.image}
                alt={feature2.title}
                className="w-full h-[300px] object-cover aspect-square"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{feature2.title}</h3>
              <p className="text-muted-foreground text-base mt-2">{feature2.description}</p>
            </div>
          </div>

          {/* Row 2 */}
          {/* Feature 3 - Small Left (5 cols) */}
          <div className="lg:col-span-5 border-border flex flex-col justify-between rounded-(--card-radius-lg) border bg-card p-8 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="w-full flex-1 flex items-center justify-center mb-8 bg-muted/20 rounded-(--card-radius) overflow-hidden">
              <img
                src={feature3.image}
                alt={feature3.title}
                className="w-full h-[300px] object-cover aspect-square"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{feature3.title}</h3>
              <p className="text-muted-foreground text-base mt-2">{feature3.description}</p>
            </div>
          </div>

          {/* Feature 4 - Big Right (7 cols) */}
          <div className="lg:col-span-7 border-border flex flex-col justify-between rounded-(--card-radius-lg) border bg-card p-8 shadow-sm hover:shadow-md transition-all duration-300">
             <div className="w-full flex-1 flex items-center justify-center mb-8 bg-muted/20 rounded-(--card-radius) overflow-hidden">
              <img
                src={feature4.image}
                alt={feature4.title}
                className="w-full h-[300px] object-cover aspect-[16/9]"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">{feature4.title}</h3>
              <p className="text-muted-foreground text-base mt-2">{feature4.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
