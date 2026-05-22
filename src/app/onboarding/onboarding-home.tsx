'use client';

import Link from 'next/link';
import {
  User,
  ShoppingCart,
  Users,
  Utensils,
  Rocket,
  ArrowRight,
} from 'lucide-react';

const entities = [
  {
    id: 'freelancer',
    icon: User,
    label: 'Freelancer',
    desc: 'Solo operators and independent consultants.',
    path: '/onboarding/freelancer/step-1',
    color: 'hover:border-blue-500/50',
  },
  {
    id: 'ecommerce',
    icon: ShoppingCart,
    label: 'E-commerce',
    desc: 'Digital storefronts and inventory-based retail.',
    path: '/onboarding/ecommerce/step-1',
    color: 'hover:border-flow-gold',
  },
  {
    id: 'agency',
    icon: Users,
    label: 'Agency',
    desc: 'Service-based firms and creative studios.',
    path: '/onboarding/agency/step-1',
    color: 'hover:border-purple-500/50',
  },
  {
    id: 'restaurant',
    icon: Utensils,
    label: 'Restaurant',
    desc: 'Hospitality and food service establishments.',
    path: '/onboarding/restaurant/step-1',
    color: 'hover:border-orange-500/50',
  },
  {
    id: 'startup',
    icon: Rocket,
    label: 'Startup',
    desc: 'Venture-backed high-growth technology companies.',
    path: '/onboarding/startup/step-1',
    color: 'hover:border-flow-gold',
  },
];

export default function OnboardingHome() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 md:px-16">
      <div className="mb-16">
        <span className="flow-label mb-4 block text-flow-gold tracking-[0.3em]">
          ONBOARDING PHASE ONE
        </span>
        <h1 className="font-display text-5xl font-extrabold tracking-[-0.03em] md:text-7xl mb-8">
          Tell us how you build
        </h1>
        <p className="max-w-3xl font-body text-xl leading-relaxed text-white/60">
          To give you the right numbers, we need to know your business model.
          Select the category that best represents how you generate revenue.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="flow-label text-white/30 tracking-[0.2em]">
          SELECT BUSINESS ENTITY
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
        {entities.map((entity) => {
          const Icon = entity.icon;
          return (
            <Link
              key={entity.id}
              href={entity.path}
              className={`group relative flex flex-col border border-white/10 bg-white/5 p-10 text-left transition-all duration-500 hover:-translate-y-2 ${entity.color} hover:bg-white/[0.08]`}
            >
              <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-full bg-flow-gold/10 transition-all duration-500 group-hover:bg-flow-gold/20 group-hover:scale-110">
                <Icon className="h-8 w-8 text-flow-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-4 text-white group-hover:text-flow-gold transition-colors">
                {entity.label}
              </h3>
              <p className="font-body text-base leading-relaxed text-white/50 mb-8">
                {entity.desc}
              </p>
              <div className="mt-auto flex items-center gap-2 text-flow-gold opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                <span className="flow-label text-[10px]">SELECT</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
