'use client';

import { useUser } from '@/hooks/api/use-user';
import FreelancerDashboardPage from './freelancer-dashboard';
import StartupDashboardPage from './startup-dashboard';
import AgencyDashboardPage from './agency-dashboard';
import RestaurantDashboardPage from './restaurant-dashboard';
import EcommerceDashboardPage from './ecommerce-dashboard';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
    </div>
  );
}

export default function DashboardPage() {
  const { data: user, isLoading: userLoading } = useUser();

  if (userLoading) return <LoadingSpinner />;

  if (user?.business_type === 'freelancer') {
    return <FreelancerDashboardPage />;
  }

  if (user?.business_type === 'startup') {
    return <StartupDashboardPage />;
  }

  if (user?.business_type === 'agency') {
    return <AgencyDashboardPage />;
  }

  if (user?.business_type === 'restaurant') {
    return <RestaurantDashboardPage />;
  }

  if (user?.business_type === 'ecommerce') {
    return <EcommerceDashboardPage />;
  }

  // ── Generic dashboard for other business types ──
  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto">
        <div className="mb-12">
          <h1 className="font-display text-4xl font-bold text-white tracking-tight">
            Welcome{user?.full_name ? `, ${user.full_name}` : ''}
          </h1>
          <p className="mt-2 font-body text-lg text-white/40">
            {user?.business_type
              ? user.business_type.charAt(0).toUpperCase() + user.business_type.slice(1)
              : 'Business'}{' '}
            Dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-white/10 bg-white/5 p-8">
            <p className="flow-label text-white/40 mb-4">LIQUIDITY</p>
            <p className="font-mono text-3xl text-white/20">—</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-8">
            <p className="flow-label text-white/40 mb-4">BURN RATE</p>
            <p className="font-mono text-3xl text-white/20">—</p>
          </div>
          <div className="border border-white/10 bg-white/5 p-8">
            <p className="flow-label text-white/40 mb-4">RUNWAY</p>
            <p className="font-mono text-3xl text-white/20">—</p>
          </div>
        </div>
      </div>
    </div>
  );
}
