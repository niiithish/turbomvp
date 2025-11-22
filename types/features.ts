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
};

export type PricingFrequency = "monthly" | "yearly";
