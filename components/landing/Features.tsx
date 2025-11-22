import Image from "next/image";
import { defaultFeatures, featuresSection } from "@/config/features";
import type { FeaturesProps } from "@/types";

const Features = ({
  title = featuresSection.title,
  description = featuresSection.description,
  feature1 = defaultFeatures.feature1,
  feature2 = defaultFeatures.feature2,
  feature3 = defaultFeatures.feature3,
  feature4 = defaultFeatures.feature4,
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
