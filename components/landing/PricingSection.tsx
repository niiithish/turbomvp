'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckIcon, XIcon, InfoIcon } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: {
      monthly: '$0',
      yearly: '$0',
    },
    usage: '$5 free monthly usage',
    features: [
      { name: '10 concurrent runs', included: true },
      { name: 'Unlimited tasks', included: true },
      { name: '5 team members', included: true },
      { name: 'Dev and Prod environments', included: true },
      { name: 'Preview branches', included: false },
      { name: '10 schedules', included: true },
      { name: '1 day log retention', included: true },
      { name: 'Community support', included: true },
      { name: '1 alert destination', included: true },
      { name: '10 concurrent Realtime connections', included: true },
    ],
    cta: 'Get started',
    highlight: false,
  },
  {
    id: 'hobby',
    name: 'Hobby',
    price: {
      monthly: '$10',
      yearly: '$100',
    },
    usage: '$10 monthly usage included',
    features: [
      { name: '25 concurrent runs', included: true },
      { name: 'Unlimited tasks', included: true },
      { name: '5 team members', included: true },
      { name: 'Dev, Staging and Prod environments', included: true },
      { name: '5 preview branches', included: true },
      { name: '100 schedules', included: true },
      { name: '7 day log retention', included: true },
      { name: 'Community support', included: true },
      { name: '3 alert destinations', included: true },
      { name: '50 concurrent Realtime connections', included: true },
    ],
    cta: 'Get started',
    highlight: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: {
      monthly: '$50',
      yearly: '$500',
    },
    usage: '$50 monthly usage included',
    features: [
      { name: '100+ concurrent runs', included: true, subtext: 'Then $50/month per 50' },
      { name: 'Unlimited tasks', included: true },
      { name: '25+ team members', included: true, subtext: 'Then $20/month per seat' },
      { name: 'Dev, Staging and Prod environments', included: true },
      { name: '20+ preview branches', included: true, subtext: 'Then $10/month per branch' },
      { name: '1000+ schedules', included: true, subtext: 'Then $10/month per 1,000' },
      { name: '30 day log retention', included: true },
      { name: 'Dedicated Slack support', included: true },
      { name: '100+ alert destinations', included: true },
      { name: '500+ concurrent Realtime connections', included: true, subtext: 'Then $10/month per 100' },
    ],
    cta: 'Get started',
    highlight: false,
  },
];

const PricingSection = () => {
  const [frequency, setFrequency] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <section className="py-12 bg-background text-foreground">
      <div className="container px-4 md:px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "flex flex-col p-6 rounded-sm border transition-all duration-200",
                plan.highlight
                  ? "border-[#ccff00] bg-card/50"
                  : "border-border bg-card/20"
              )}
            >
              <div className="mb-6">
                <h3 className="text-lg font-medium text-muted-foreground mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-5xl font-medium tracking-tight">
                    {plan.price[frequency]}
                  </span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                
                <div className="flex items-center gap-1 text-sm underline decoration-dotted underline-offset-4 text-muted-foreground hover:text-foreground cursor-help w-fit">
                  {plan.usage}
                  {plan.highlight || plan.id === 'pro' ? <InfoIcon className="w-3 h-3" /> : null}
                </div>
              </div>

              <Button
                className={cn(
                  "w-full py-6 text-base font-medium mb-8 rounded-md transition-colors",
                  plan.highlight
                    ? "bg-[#ccff00] text-black hover:bg-[#b3e600]"
                    : "bg-secondary/50 text-secondary-foreground hover:bg-secondary border border-border/50"
                )}
              >
                {plan.cta}
              </Button>

              <div className="flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className={cn("flex items-start gap-3 text-sm", !feature.included && "opacity-50")}>
                      {feature.included ? (
                        <CheckIcon className="w-4 h-4 text-[#ccff00] shrink-0 mt-0.5" />
                      ) : (
                        <XIcon className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                      )}
                      <div className="flex flex-col">
                        <span className={cn(feature.included ? "text-foreground" : "line-through text-muted-foreground")}>
                          {feature.name}
                        </span>
                        {feature.subtext && (
                          <span className="text-xs text-muted-foreground mt-0.5">{feature.subtext}</span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;