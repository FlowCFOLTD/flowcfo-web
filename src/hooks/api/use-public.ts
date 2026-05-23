'use client';

import { useMutation } from '@tanstack/react-query';
import { publicApi, WaitlistData, ContactData } from '@/lib/api/public';

export function useJoinWaitlist() {
  return useMutation({
    mutationFn: (data: WaitlistData) => publicApi.joinWaitlist(data),
  });
}

export function useSubmitContact() {
  return useMutation({
    mutationFn: (data: ContactData) => publicApi.submitContact(data),
  });
}
