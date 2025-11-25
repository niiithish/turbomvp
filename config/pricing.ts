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
    // Dodo Payments configuration
    // Replace with your actual product ID from the Dodo Payments dashboard
    dodoProductId: "pdt_jqAwQTf2T4RtHqhC5s0Tm",
    slug: "pro-plan",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: {
      monthly: 0, // Custom pricing
      yearly: 0,
    },
    period: "/month",
    description:
      "Custom solutions and dedicated support for large organizations.",
    features: [
      "Dedicated success manager",
      "Custom contracts & invoicing",
      "Unlimited workflows & automations",
      "Unlimited teammates",
      "Advanced analytics & reporting",
      "SSO & advanced security",
      "24/7 Priority support",
    ],
    cta: "Contact Us",
    popular: false,
  },
];
