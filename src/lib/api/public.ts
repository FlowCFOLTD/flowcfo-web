import { apiClient } from '../api-client';

export interface WaitlistData {
  email: string;
  business_type: string;
  challenge?: string;
}

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const publicApi = {
  joinWaitlist: (data: WaitlistData) =>
    apiClient<{ status: string }>('/api/v1/waitlist', {
      body: data,
    }),
  submitContact: (data: ContactData) =>
    apiClient<{ status: string }>('/api/v1/contact', {
      body: data,
    }),
};
