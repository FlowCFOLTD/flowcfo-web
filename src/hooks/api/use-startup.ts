'use client';

import { useQuery } from '@tanstack/react-query';
import { startupApi } from '@/lib/api/startup';

export function useStartupDashboard() {
  return useQuery({
    queryKey: ['startup', 'dashboard'],
    queryFn: startupApi.getDashboard,
    retry: false,
  });
}

export function useBurnRate(months?: number) {
  return useQuery({
    queryKey: ['startup', 'burn-rate', months],
    queryFn: () => startupApi.getBurnRate(months),
    retry: false,
  });
}

export function useRunway() {
  return useQuery({
    queryKey: ['startup', 'runway'],
    queryFn: startupApi.getRunway,
    retry: false,
  });
}

export function useUnitEconomics() {
  return useQuery({
    queryKey: ['startup', 'unit-economics'],
    queryFn: startupApi.getUnitEconomics,
    retry: false,
  });
}
