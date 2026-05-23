'use client';

import { useMutation } from '@tanstack/react-query';
import { onboardingApi, OnboardingStep1Data } from '@/lib/api/onboarding';

export function useSubmitOnboardingStep1() {
  return useMutation({
    mutationFn: (data: OnboardingStep1Data) => onboardingApi.submitStep1(data),
  });
}

export function useVerifyBankSync() {
  return useMutation({
    mutationFn: onboardingApi.verifyBankSync,
  });
}

export function useSubmitOnboardingStep2() {
  return useMutation({
    mutationFn: onboardingApi.submitStep2,
  });
}

export function useSubmitOnboardingStep3() {
  return useMutation({
    mutationFn: (data: { tax_rate: number }) => onboardingApi.submitStep3(data),
  });
}
