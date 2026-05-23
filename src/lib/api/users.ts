import { apiClient } from '../api-client';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  business_name: string;
  business_type: string;
  onboarding_completed: boolean;
  onboarding_step: string;
  terms_accepted: boolean;
  plan: string;
  created_at: string;
}

export const usersApi = {
  getMe: () => apiClient<UserProfile>('/api/v1/users/me'),
  updateMe: (data: Partial<UserProfile>) =>
    apiClient<UserProfile>('/api/v1/users/me', {
      method: 'PATCH',
      body: data,
    }),
};
