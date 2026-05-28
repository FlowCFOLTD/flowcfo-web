'use client';

import { useQuery } from '@tanstack/react-query';
import { freelancerApi } from '@/lib/api/freelancer';

export function useFreelancerDashboard(opts?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['freelancer', 'dashboard'],
    queryFn: freelancerApi.getDashboard,
    enabled: opts?.enabled ?? true,
    retry: false,
  });
}

export function useFreelancerIncomeVolatility(months?: number) {
  return useQuery({
    queryKey: ['freelancer', 'income-volatility', months],
    queryFn: () => freelancerApi.getIncomeVolatility(months),
    retry: false,
  });
}

export function useFreelancerTaxReadiness() {
  return useQuery({
    queryKey: ['freelancer', 'tax-readiness'],
    queryFn: freelancerApi.getTaxReadiness,
    retry: false,
  });
}

export function useFreelancerRateAnalysis(months?: number) {
  return useQuery({
    queryKey: ['freelancer', 'rate-analysis', months],
    queryFn: () => freelancerApi.getRateAnalysis(months),
    retry: false,
  });
}
