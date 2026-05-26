import { apiClient } from '../api-client';

export interface AIInsights {
  market?: {
    label: string;
    value: number;
    change: string;
    context: string;
    recommendation: string;
  };
  strategy?: {
    summary: string;
    detail: string;
  };
  rate_suggestion?: {
    current: number;
    suggested: number;
    reason: string;
  };
  tax_alert?: {
    readiness: number;
    shortfall: number;
    deadline: string;
  };
  retainer_opportunity?: {
    estimated_retainer: number;
    peak_client: string;
    trough_client: string;
  };
  llm_insights?: Array<{
    insight: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  business_name: string;
  business_type: string;
  onboarding_completed: boolean;
  onboarding_step: string;
  bank_synced: boolean;
  terms_accepted: boolean;
  is_admin: boolean;
  plan: string;
  ai_insights: AIInsights;
  created_at: string;
}

export const usersApi = {
  getMe: () => apiClient<UserProfile>('/api/v1/users/me'),
  updateMe: (data: Partial<UserProfile>) =>
    apiClient<UserProfile>('/api/v1/users/me', {
      method: 'PATCH',
      body: data,
    }),
  setupUser: (data: { terms_accepted: boolean }) =>
    apiClient<UserProfile>('/api/v1/users/setup', {
      method: 'POST',
      body: data,
    }),
};

export interface AdminDashboardData {
  total_users: number;
  total_waitlist: number;
  total_contacts: number;
  users_by_business_type: Record<string, number>;
  waitlist_by_business_type: Record<string, number>;
  signups_last_7_days: number;
  logins_last_7_days: number;
}

export interface AdminHealthData {
  database: string;
  timestamp: string;
  user_count: number;
  waitlist_count: number;
  version: string;
}

export const adminApi = {
  getDashboard: () => apiClient<AdminDashboardData>('/api/v1/admin/dashboard'),
  getWaitlist: () => apiClient<unknown[]>('/api/v1/admin/waitlist'),
  getContacts: () => apiClient<unknown[]>('/api/v1/admin/contacts'),
  getUsers: () => apiClient<unknown[]>('/api/v1/admin/users'),
  getEvents: (limit?: number, event_type?: string) => {
    const params = new URLSearchParams();
    params.set('limit', String(limit || 100));
    if (event_type) params.set('event_type', event_type);
    return apiClient<unknown[]>(`/api/v1/admin/events?${params}`);
  },
  getHealth: () => apiClient<AdminHealthData>('/api/v1/admin/health'),
};

export interface CsvUploadData {
  status: string;
  account_id: string;
  transactions: number;
  warnings?: string[];
}

export const accountsApi = {
  uploadCsv: (formData: FormData, override?: boolean) =>
    apiClient<CsvUploadData>(
      `/api/v1/accounts/csv/upload${override ? '?override=true' : ''}`,
      {
        method: 'POST',
        body: formData,
      },
    ),
};
