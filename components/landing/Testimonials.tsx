import Link from "next/link";
import type { ComponentProps } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";

const socialProofData = [
  {
    id: 1,
    name: "Alex Chen",
    designation: "Indie Developer",
    company: "AI Startup",
    testimonial:
      "Launched my AI SaaS in 3 days instead of 3 months. The template saved me from building auth, payments, and database from scratch. Pure gold for indie hackers!",
    avatar: "AC",
    twitter: "@alexchen",
  },
  {
    id: 2,
    name: "Sarah Martinez",
    designation: "CTO",
    company: "TechVentures",
    testimonial:
      "We built and deployed our enterprise AI tool in 2 weeks. The Clerk integration was seamless, and Polar payments worked perfectly out of the box. Incredible time saver.",
    avatar: "SM",
    twitter: "@sarahmartinez",
  },
  {
    id: 3,
    name: "Mike Johnson",
    designation: "Startup Founder",
    company: "DataFlow AI",
    testimonial:
      "As a non-technical founder, this template was a game-changer. I could focus on the AI features while the infrastructure just worked. Got our first paying customer in week 1.",
    avatar: "MJ",
    twitter: "@mikejohnson",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    designation: "Full-Stack Developer",
    company: "Freelance",
    testimonial:
      "I've built 3 client projects using this template. Each one would have taken months to build from scratch. Now I can deliver production-ready AI apps in weeks.",
    avatar: "ER",
    twitter: "@emilyrod",
  },
  {
    id: 5,
    name: "David Park",
    designation: "Product Manager",
    company: "Enterprise Corp",
    testimonial:
      "We evaluated multiple solutions and this template was the clear winner. The architecture is clean, the integrations work perfectly, and our dev team loves it.",
    avatar: "DP",
    twitter: "@davidpark",
  },
  {
    id: 6,
    name: "Lisa Thompson",
    designation: "Solo Founder",
    company: "AI Tools Co",
    testimonial:
      "From idea to revenue in 14 days. The template handled everything I needed to launch. Best investment I've made for my SaaS journey. Highly recommended!",
    avatar: "LT",
    twitter: "@lisathompson",
  },
];

const Testimonials = () => {
  const firstColumn = socialProofData.slice(0, 3);
  const secondColumn = socialProofData.slice(3, 6);

  return (
    <div
      className="overflow-hidden bg-black px-6 md:px-8 py-24 md:py-32 text-white"
      id="testimonials"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[40%_60%]">
        {/* Left Side: Content */}
        <div className="flex flex-col items-start text-left">
          <h2 className="mb-6 font-semibold text-4xl text-white tracking-tighter">
            What people are <br />
            saying about Brightly
          </h2>
          <p className="mb-8 max-w-lg text-base text-gray-400">
            Hear from real users who have transformed their workflows with the
            power of Ticksy
          </p>
          <Button asChild size="lg">
            <Link href="/signup">Get started</Link>
          </Button>
        </div>

        {/* Right Side: Marquee Columns */}
        <div className="mask-[linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] relative grid h-[600px] grid-cols-2 gap-4 overflow-hidden">
          {/* First Column: Scroll Up (Bottom to Top) */}
          <Marquee className="[--duration:30s]" repeat={4} vertical>
            {firstColumn.map((story) => (
              <TestimonialCard key={story.id} story={story} />
            ))}
          </Marquee>

          {/* Second Column: Scroll Down (Top to Bottom) */}
          <Marquee className="[--duration:30s]" repeat={4} vertical>
            {secondColumn.map((story) => (
              <TestimonialCard key={story.id} story={story} />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

const TestimonialCard = ({ story }: { story: (typeof socialProofData)[0] }) => (
  <div className="relative rounded-xl bg-card p-6 text-card-foreground shadow-lg">
    {/* Twitter Link */}
    <div className="absolute top-4 right-4">
      <Button asChild size="icon" variant="ghost">
        <Link href="#" target="_blank" title={story.twitter}>
          <TwitterLogo className="h-4 w-4" />
        </Link>
      </Button>
    </div>

    <div className="mb-4 flex items-center gap-4">
      <Avatar>
        <AvatarFallback className="bg-primary font-medium text-primary-foreground text-xl">
          {story.avatar}
        </AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold text-lg">{story.name}</p>
        <p className="text-muted-foreground text-sm">
          {story.designation} at {story.company}
        </p>
      </div>
    </div>
    <p className="text-base leading-relaxed">{story.testimonial}</p>
  </div>
);

const TwitterLogo = (props: ComponentProps<"svg">) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>X</title>
    <path
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      fill="currentColor"
    />
  </svg>
);

export default Testimonials;
