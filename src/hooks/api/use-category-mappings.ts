'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { categoryMappingsApi } from '@/lib/api/category-mappings';

export function useCategoryMappingsStatus() {
  return useQuery({
    queryKey: ['category-mappings', 'status'],
    queryFn: categoryMappingsApi.getStatus,
    retry: false,
  });
}

export function useSaveCategoryMappings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (mappings: Record<string, string>) => categoryMappingsApi.save(mappings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category-mappings', 'status'] });
    },
  });
}
