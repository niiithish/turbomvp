import {
  Header as AccordionHeader,
  Trigger as AccordionTrigger,
} from "@radix-ui/react-accordion";
import { PlusSignIcon } from "hugeicons-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils/cn";

const faq = [
  {
    question: "What is included in this starter kit?",
    answer:
      "This kit includes Next.js 15, React 19, Tailwind CSS, Shadcn UI, BetterAuth for authentication, Drizzle ORM for database management, and Stripe for payments (coming soon).",
  },
  {
    question: "Is this free to use?",
    answer:
      "Yes, this project is open source and available under the MIT license. You can use it for personal and commercial projects.",
  },
  {
    question: "How do I deploy this?",
    answer:
      "You can deploy this to any hosting provider that supports Next.js, such as Vercel, Netlify, or a VPS. The project is optimized for Vercel.",
  },
  {
    question: "Which database does it use?",
    answer:
      "It uses Drizzle ORM which supports PostgreSQL, MySQL, and SQLite. By default, it's configured for PostgreSQL (e.g. Neon, Supabase).",
  },
  {
    question: "How can I customize the design?",
    answer:
      "The project uses Tailwind CSS and Shadcn UI. You can easily customize the theme in `globals.css` and modify components in the `components` directory.",
  },
  {
    question: "Do you offer support?",
    answer:
      "Since this is an open source project, support is community-driven. You can open issues on GitHub or contribute to the project.",
  },
];

const FAQ = () => (
  <div
    className="flex min-h-screen items-center justify-center px-6 py-24 md:px-8 md:py-32"
    id="faq"
  >
    <div className="w-full max-w-7xl">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left Column - Header */}
        <div className="mx-auto text-center lg:sticky lg:top-24 lg:mx-0 lg:text-left">
          <h2 className="font-semibold text-4xl leading-[1.15] tracking-tighter md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Everything you need to know—features, benefits, and common questions
            answered clearly
          </p>
        </div>

        {/* Right Column - FAQ Items */}
        <div>
          <Accordion className="space-y-4" collapsible type="single">
            {faq.map(({ question, answer }, index) => (
              <AccordionItem
                className="rounded-sm border border-border/50 bg-background/50 px-6 py-2 transition-colors hover:bg-accent/50"
                key={question}
                value={`question-${index}`}
              >
                <AccordionHeader className="flex">
                  <AccordionTrigger
                    className={cn(
                      "flex flex-1 cursor-pointer items-center justify-between py-4 font-semibold tracking-tight transition-all [&[data-state=open]>svg]:rotate-45",
                      "text-start text-lg"
                    )}
                  >
                    {question}
                    <PlusSignIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                  </AccordionTrigger>
                </AccordionHeader>
                <AccordionContent className="pb-4 text-base text-muted-foreground">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  </div>
);

export default FAQ;
