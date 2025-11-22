import Image from "next/image";

type Feature = {
  title: string;
  description: string;
  image: string;
};

type FeaturesProps = {
  title?: string;
  description?: string;
  feature1?: Feature;
  feature2?: Feature;
  feature3?: Feature;
  feature4?: Feature;
};

const Features = ({
  title = "Focus on what matters",
  description = "Explore powerful features designed to help teams plan, track, and deliver tasks with ease.",
  feature1 = {
    title: "Stay organized & manage tasks easily",
    description:
      "Prioritize, track progress, and manage everything in one place for a smoother workflow.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
  },
  feature2 = {
    title: "AI teammate",
    description:
      "Oasis AI handles tasks and predicts timelines to keep you on track.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
  },
  feature3 = {
    title: "Team collaboration",
    description:
      "Work seamlessly with your team. Share, assign, and succeed together.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
  },
  feature4 = {
    title: "Powerful data integration without limits",
    description:
      "Easily integrate data from any source to create a seamless, automated, and unified workflow system.",
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
  },
}: FeaturesProps) => {
  return (
    <section className="py-24 md:py-32" id="features">
      <div className="container mx-auto max-w-7xl px-6 md:px-8">
        <div className="mb-16 flex flex-col items-center gap-6">
          <h2 className="text-center font-semibold text-4xl leading-[1.15] tracking-tighter md:text-5xl lg:max-w-4xl">
            {title}
          </h2>
          <p className="text-center text-muted-foreground text-xl lg:max-w-2xl">
            {description}
          </p>
        </div>

        <div className="mx-auto grid grid-cols-1 gap-6 lg:max-w-6xl lg:grid-cols-12">
          {/* Row 1 */}
          {/* Feature 1 - Big Left (7 cols) */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md lg:col-span-7">
            <div className="mb-8 flex w-full flex-1 items-center justify-center overflow-hidden rounded-lg bg-muted/20">
              <Image
                alt={feature1.title}
                className="aspect-video h-[300px] w-full object-cover"
                height={300}
                src={feature1.image}
                width={533}
              />
            </div>
            <div>
              <h3 className="font-semibold text-xl tracking-tight">
                {feature1.title}
              </h3>
              <p className="mt-2 text-base text-muted-foreground">
                {feature1.description}
              </p>
            </div>
          </div>

          {/* Feature 2 - Small Right (5 cols) */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md lg:col-span-5">
            <div className="mb-8 flex w-full flex-1 items-center justify-center overflow-hidden rounded-lg bg-muted/20">
              <Image
                alt={feature2.title}
                className="aspect-square h-[300px] w-full object-cover"
                height={300}
                src={feature2.image}
                width={300}
              />
            </div>
            <div>
              <h3 className="font-semibold text-xl tracking-tight">
                {feature2.title}
              </h3>
              <p className="mt-2 text-base text-muted-foreground">
                {feature2.description}
              </p>
            </div>
          </div>

          {/* Row 2 */}
          {/* Feature 3 - Small Left (5 cols) */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md lg:col-span-5">
            <div className="mb-8 flex w-full flex-1 items-center justify-center overflow-hidden rounded-lg bg-muted/20">
              <Image
                alt={feature3.title}
                className="aspect-square h-[300px] w-full object-cover"
                height={300}
                src={feature3.image}
                width={300}
              />
            </div>
            <div>
              <h3 className="font-semibold text-xl tracking-tight">
                {feature3.title}
              </h3>
              <p className="mt-2 text-base text-muted-foreground">
                {feature3.description}
              </p>
            </div>
          </div>

          {/* Feature 4 - Big Right (7 cols) */}
          <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md lg:col-span-7">
            <div className="mb-8 flex w-full flex-1 items-center justify-center overflow-hidden rounded-lg bg-muted/20">
              <Image
                alt={feature4.title}
                className="aspect-video h-[300px] w-full object-cover"
                height={300}
                src={feature4.image}
                width={533}
              />
            </div>
            <div>
              <h3 className="font-semibold text-xl tracking-tight">
                {feature4.title}
              </h3>
              <p className="mt-2 text-base text-muted-foreground">
                {feature4.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
