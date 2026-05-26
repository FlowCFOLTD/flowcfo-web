'use client';

import { useQuery } from '@tanstack/react-query';
import { restaurantApi } from '@/lib/api/restaurant';

export function useRestaurantDashboard() {
  return useQuery({
    queryKey: ['restaurant', 'dashboard'],
    queryFn: restaurantApi.getDashboard,
    retry: false,
  });
}

export function useFoodCost(months?: number) {
  return useQuery({
    queryKey: ['restaurant', 'food-cost', months],
    queryFn: () => restaurantApi.getFoodCost(months),
    retry: false,
  });
}

export function useDailyRevenue(days?: number) {
  return useQuery({
    queryKey: ['restaurant', 'daily-revenue', days],
    queryFn: () => restaurantApi.getDailyRevenue(days),
    retry: false,
  });
}

export function useLaborCost(months?: number) {
  return useQuery({
    queryKey: ['restaurant', 'labor-cost', months],
    queryFn: () => restaurantApi.getLaborCost(months),
    retry: false,
  });
}
