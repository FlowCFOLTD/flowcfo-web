'use client';

import { useQuery } from '@tanstack/react-query';
import { ecommerceApi } from '@/lib/api/ecommerce';

export function useEcommerceDashboard(opts?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['ecommerce', 'dashboard'],
    queryFn: ecommerceApi.getDashboard,
    enabled: opts?.enabled ?? true,
    retry: false,
  });
}

export function useGrossMargin(months?: number) {
  return useQuery({
    queryKey: ['ecommerce', 'gross-margin', months],
    queryFn: () => ecommerceApi.getGrossMargin(months),
    retry: false,
  });
}

export function usePlatformFees(months?: number) {
  return useQuery({
    queryKey: ['ecommerce', 'platform-fees', months],
    queryFn: () => ecommerceApi.getPlatformFees(months),
    retry: false,
  });
}

export function useInventoryHealth(months?: number) {
  return useQuery({
    queryKey: ['ecommerce', 'inventory-health', months],
    queryFn: () => ecommerceApi.getInventoryHealth(months),
    retry: false,
  });
}

export function useSeasonalPatterns(months?: number) {
  return useQuery({
    queryKey: ['ecommerce', 'seasonal-patterns', months],
    queryFn: () => ecommerceApi.getSeasonalPatterns(months),
    retry: false,
  });
}

export function usePayoutAnalysis(months?: number) {
  return useQuery({
    queryKey: ['ecommerce', 'payouts', months],
    queryFn: () => ecommerceApi.getPayoutAnalysis(months),
    retry: false,
  });
}
