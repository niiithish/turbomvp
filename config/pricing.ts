/**
 * Pricing configuration
 * Pricing plans, tiers, and related constants
 */

import type { PricingPlan } from "@/types";

export const pricingPlans: PricingPlan[] = [
	{
		id: "free",
		name: "Free",
		price: {
			monthly: 0,
			yearly: 0,
		},
		period: "/Forever",
		description: "Ideal solution for small teams and fast-moving startups.",
		features: [
			"Collaborate with up to 3 teammates",
			"Core task management features",
			"Unlimited projects and tasks",
			"Board and list views",
		],
		cta: "Get Started",
		popular: false,
	},
	{
		id: "pro",
		name: "Pro",
		price: {
			monthly: 16,
			yearly: 12, // Assuming a discount
		},
		period: "/month",
		description:
			"Advanced tools built to empower fast-growing and collaborative modern teams.",
		features: [
			"Collaborate with up to 10 teammates",
			"Custom workflows and templates",
			"Advanced tracking & reports",
			"Role-based access control",
			"Automated task reminders",
			"Priority integrations",
			"Email support",
		],
		cta: "Get Started",
		popular: true,
	},
	{
		id: "team",
		name: "Team",
		price: {
			monthly: 42,
			yearly: 35, // Assuming a discount
		},
		period: "/month",
		description: "Powerful collaboration tools built for growing larger teams.",
		features: [
			"Dedicated success manager included",
			"Custom roles and permissions",
			"Unlimited workflows & automations",
			"Up to 25 teammates",
			"Real-time analytics",
			"Premium integrations",
			"Priority support",
		],
		cta: "Get Started",
		popular: false,
	},
];
