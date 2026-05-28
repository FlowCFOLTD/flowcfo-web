'use client';

import { useUser } from './use-user';
import { useFreelancerDashboard } from './use-freelancer';
import { useStartupDashboard } from './use-startup';
import { useAgencyDashboard } from './use-agency';
import { useRestaurantDashboard } from './use-restaurant';
import { useEcommerceDashboard } from './use-ecommerce';

export function useDashboard() {
  const { data: user, isLoading: userLoading } = useUser();
  const bt = user?.business_type;

  const freelancer = useFreelancerDashboard({ enabled: bt === 'freelancer' });
  const startup = useStartupDashboard({ enabled: bt === 'startup' });
  const agency = useAgencyDashboard({ enabled: bt === 'agency' });
  const restaurant = useRestaurantDashboard({ enabled: bt === 'restaurant' });
  const ecommerce = useEcommerceDashboard({ enabled: bt === 'ecommerce' });

  if (userLoading) return { data: null, isLoading: true };

  switch (bt) {
    case 'freelancer': return freelancer;
    case 'startup': return startup;
    case 'agency': return agency;
    case 'restaurant': return restaurant;
    case 'ecommerce': return ecommerce;
    default: return { data: null, isLoading: false };
  }
}
