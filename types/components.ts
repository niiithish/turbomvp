/**
 * Component prop types and interfaces
 * Centralized type definitions for component properties
 */

import type React from "react";

// Landing page component types
export type Feature = {
  title: string;
  description: string;
  image: string;
};

export type FeaturesProps = {
  title?: string;
  description?: string;
  feature1?: Feature;
  feature2?: Feature;
  feature3?: Feature;
  feature4?: Feature;
};

// Dashboard component types
export type MetricCardProps = {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  period: string;
};

export type ApiCall = {
  id: string;
  user: string;
  model: string;
  status: string;
  latency: string;
  cost: number;
};

// Navigation component types
export type NavItem = {
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
};

// Profile component types
export type PersonalDetailsProps = {
  user: {
    firstName?: string | null;
    lastName?: string | null;
    image?: string | null;
    name?: string | null;
  };
};

// Hooks types
export type UseProfileUpdateProps<T> = {
  initialData: T;
  onUpdate?: (data: T) => void;
};
