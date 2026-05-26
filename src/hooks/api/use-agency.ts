'use client';

import { useQuery } from '@tanstack/react-query';
import { agencyApi } from '@/lib/api/agency';

export function useAgencyDashboard() {
  return useQuery({
    queryKey: ['agency', 'dashboard'],
    queryFn: agencyApi.getDashboard,
    retry: false,
  });
}

export function useClientProfitability(months?: number) {
  return useQuery({
    queryKey: ['agency', 'client-profitability', months],
    queryFn: () => agencyApi.getClientProfitability(months),
    retry: false,
  });
}

export function useRevenueDiversification(months?: number) {
  return useQuery({
    queryKey: ['agency', 'revenue-diversification', months],
    queryFn: () => agencyApi.getRevenueDiversification(months),
    retry: false,
  });
}
