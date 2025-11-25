/**
 * Feature and domain types
 * Business logic and domain-specific type definitions
 */

export type PricingPlan = {
  id: string;
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  /** Dodo Payments product ID (e.g., "pdt_xxxxxxxxxxxxxxxxxxxxx") */
  dodoProductId?: string;
  /** URL-friendly slug for checkout (e.g., "pro-plan") */
  slug?: string;
};

export type PricingFrequency = "monthly" | "yearly";
