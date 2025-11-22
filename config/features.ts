/**
 * Features configuration
 * Product features and capabilities data
 */

import type { Feature } from "@/types";

export const defaultFeatures = {
	feature1: {
		title: "Next.js 15 & React 19",
		description:
			"Built on the latest and greatest web technologies for maximum performance and developer experience.",
		image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-1.svg",
	},
	feature2: {
		title: "Authentication Ready",
		description:
			"Secure authentication powered by BetterAuth. Social logins, email/password, and more out of the box.",
		image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-2.svg",
	},
	feature3: {
		title: "Type-Safe Database",
		description:
			"Drizzle ORM for type-safe database interactions. Works with Postgres, MySQL, and SQLite.",
		image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-3.svg",
	},
	feature4: {
		title: "Beautiful UI Components",
		description:
			"Pre-built components using Shadcn UI and Tailwind CSS. Accessible, customizable, and ready to use.",
		image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-4.svg",
	},
} satisfies Record<string, Feature>;

export const featuresSection = {
	title: "Everything you need to ship",
	description:
		"A complete stack for building modern SaaS applications. Don't waste time on boilerplate.",
};
