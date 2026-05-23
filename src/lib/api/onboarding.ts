import { apiClient } from '../api-client';

export interface OnboardingStep1Data {
  business_type: string;
  business_name: string;
  full_name: string;
  tax_rate: number;
  currency: string;
  timezone: string;
  [key: string]: unknown;
}

export const onboardingApi = {
  submitStep1: (data: OnboardingStep1Data) =>
    apiClient<{ status: string; next_step: string }>(
      '/api/v1/users/onboarding/step-1',
      {
        body: data,
      },
    ),
  verifyBankSync: () =>
    apiClient<{ status: string }>(
      '/api/v1/users/onboarding/step-2/bank-synced',
      {
        method: 'POST',
      },
    ),
  submitStep2: () =>
    apiClient<{ status: string; next_step: string }>(
      '/api/v1/users/onboarding/step-2',
      {
        method: 'POST',
      },
    ),
  submitStep3: (data: { tax_rate: number }) =>
    apiClient<{ status: string }>('/api/v1/users/onboarding/step-3', {
      body: data,
    }),
};
