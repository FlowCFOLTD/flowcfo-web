import { apiClient } from '../api-client';

export interface CategoryMappingItem {
  name: string;
  mapped_to: string | null;
  is_known: boolean;
  needs_mapping: boolean;
}

export interface MappingStatusResponse {
  categories: CategoryMappingItem[];
  unmapped_count: number;
  total_count: number;
  has_mappings: boolean;
}

export const categoryMappingsApi = {
  getStatus: () => apiClient<MappingStatusResponse>('/api/v1/category-mappings/status'),

  save: (mappings: Record<string, string>) =>
    apiClient<{ status: string }>('/api/v1/category-mappings/', {
      method: 'PUT',
      body: mappings,
    }),
};
