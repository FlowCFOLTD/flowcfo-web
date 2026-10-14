import { apiClient } from '../api-client';

export interface Envelope<T> {
  status: 'ok';
  data: T;
  meta: { request_id: string; timestamp: string };
}

const unwrap = <T,>(p: Promise<Envelope<T>>): Promise<T> => p.then((r) => r.data);

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
  approved: boolean;
  approval_requested: boolean;
  plan: string;
  ai_insights: AIInsights;
  buffer_mode: 'conservative' | 'standard' | 'aggressive';
  auto_allocate_pct: number;
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

export interface AdminProfile {
  id: string;
  email: string;
  role: string;
}

export const adminApi = {
  getMe: () => apiClient<AdminProfile>('/api/v1/admin/me'),
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
  approveUser: (userId: string) =>
    apiClient<{ status: string; approved: boolean }>(`/api/v1/admin/users/${userId}/approve`, {
      method: 'POST',
    }),
};

export interface CsvUploadData {
  status: string;
  account_id: string;
  transactions: number;
  warnings?: string[];
}

export interface AccountData {
  id: string;
  provider: string;
  institution_name: string | null;
  account_name: string | null;
  account_type: string | null;
  current_balance: number | null;
  available_balance: number | null;
  currency: string;
  is_primary: boolean;
  last_synced_at: string | null;
}

export interface BlogSettingsData {
  author_name: string;
  brand_voice_notes: string | null;
  target_keywords: string[];
  auto_publish: boolean;
  schedule_frequency: string;
}

export interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  meta_description: string | null;
  keywords: string[];
  status: string;
  author: string | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface BlogPostDetail extends BlogPostSummary {
  body_markdown: string;
}

export interface BlogGenerationLogEntry {
  id: string;
  topic: string;
  status: string;
  post_id: string | null;
  error_text: string | null;
  triggered_by: string | null;
  created_at: string | null;
}

export const blogApi = {
  getSettings: () => apiClient<BlogSettingsData>('/api/v1/admin/blog/settings'),
  updateSettings: (data: Partial<BlogSettingsData>) =>
    apiClient<BlogSettingsData>('/api/v1/admin/blog/settings', { method: 'PUT', body: data }),
  getPosts: (status?: string) =>
    apiClient<{ total: number; posts: BlogPostSummary[] }>(
      `/api/v1/admin/blog/posts${status ? `?status=${status}` : ''}`,
    ),
  getPost: (id: string) => apiClient<BlogPostDetail>(`/api/v1/admin/blog/posts/${id}`),
  publishPost: (id: string) =>
    apiClient<{ status: string; id: string }>(`/api/v1/admin/blog/posts/${id}/publish`, { method: 'PUT' }),
  archivePost: (id: string) =>
    apiClient<{ status: string; id: string }>(`/api/v1/admin/blog/posts/${id}/archive`, { method: 'PUT' }),
  generate: (topic: string, extra_context?: string) =>
    apiClient<{ status: string; topic: string }>('/api/v1/admin/blog/generate', {
      method: 'POST',
      body: { topic, extra_context: extra_context || '' },
    }),
  getLogs: () => apiClient<BlogGenerationLogEntry[]>('/api/v1/admin/blog/logs'),
  updatePost: (id: string, data: { title?: string; slug?: string; meta_description?: string; keywords?: string[]; body_markdown?: string; author?: string }) =>
    apiClient<BlogPostDetail>(`/api/v1/admin/blog/posts/${id}`, { method: 'PUT', body: data }),
  deletePost: (id: string) =>
    apiClient<{ status: string; id: string }>(`/api/v1/admin/blog/posts/${id}`, { method: 'DELETE' }),
};

export const accountsApi = {
  uploadCsv: (formData: FormData, override?: boolean) =>
    apiClient<CsvUploadData>(
      `/api/v1/accounts/csv/upload${override ? '?override=true' : ''}`,
      {
        method: 'POST',
        body: formData,
      },
    ),
  list: () => apiClient<AccountData[]>('/api/v1/accounts'),
};

export interface SpendDecision {
  id: string;
  amount: number;
  category: string;
  verdict: 'safe' | 'borderline' | 'risky';
  confidence: number;
  reasoning: string;
  safe_to_spend_at_time: number | null;
  remaining_after: number | null;
  tax_reserve_pct: number | null;
  user_feedback: string | null;
  feedback_note: string | null;
  created_at: string | null;
}

export interface TaxSuggestion {
  suggested_rate: number;
  country: string | null;
  country_name: string | null;
  base_rate: number;
  business_type: string;
  adjustment_factor: number;
  notes: string;
  confidence: 'high' | 'medium' | 'low';
}

export const spendApi = {
  listDecisions: (limit = 20, offset = 0) =>
    apiClient<{ decisions: SpendDecision[]; total: number }>(
      `/api/v1/tools/spend-decisions?limit=${limit}&offset=${offset}`,
    ),
  submitFeedback: (decisionId: string, feedback: 'good' | 'bad', note?: string) =>
    apiClient<{ status: string; feedback: string }>(
      `/api/v1/tools/spend-decisions/${decisionId}/feedback`,
      { method: 'POST', body: { feedback, note } },
    ),
};

export const taxSuggestionApi = {
  getSuggestion: () => apiClient<TaxSuggestion>('/api/v1/tax/suggest-rate'),
};

export interface InvoiceItem {
  id: string;
  invoice_no: string;
  client_name: string;
  amount: number;
  currency: string;
  issue_date: string | null;
  due_date: string;
  status: string;
  paid_date: string | null;
  description: string | null;
  days_overdue: number;
  is_overdue: boolean;
  aging_bucket: string;
}

export interface AgingSummary {
  outstanding_total: number;
  outstanding_count: number;
  overdue_total: number;
  overdue_count: number;
  buckets: Record<string, number>;
}

export interface CurrencyOption {
  code: string;
  name: string;
}

export const invoiceApi = {
  list: () => unwrap(apiClient<Envelope<{ invoices: InvoiceItem[] }>>('/api/v1/invoices')),
  create: (data: { invoice_no: string; client_name: string; amount: number; due_date: string; issue_date?: string; currency?: string; description?: string }) =>
    unwrap(apiClient<Envelope<InvoiceItem>>('/api/v1/invoices', { method: 'POST', body: data })),
  markPaid: (id: string) =>
    unwrap(apiClient<Envelope<InvoiceItem>>(`/api/v1/invoices/${id}/paid`, { method: 'POST' })),
  importCsv: (formData: FormData) =>
    unwrap(apiClient<Envelope<{ imported: number; warnings: string[] }>>('/api/v1/invoices/import', {
      method: 'POST',
      body: formData,
    })),
  aging: () => unwrap(apiClient<Envelope<AgingSummary>>('/api/v1/invoices/aging')),
  currencies: () => unwrap(apiClient<Envelope<{ currencies: CurrencyOption[] }>>('/api/v1/invoices/currencies')),
};

export interface OpexOutlook {
  horizon_days: number;
  reference_date: string;
  monthly_opex_avg: number;
  two_month_opex: number;
  will_shortfall: boolean;
  shortfall_amount: number;
  shortfall_date: string | null;
  min_projected_balance: number;
  projected_end_balance: number;
  confidence: string;
}

export interface RiskDriver {
  factor: string;
  points: number;
  value: number | string;
  detail: string;
}

export interface RiskOverview {
  risk_score: number;
  band: string;
  health_score: number;
  drivers: RiskDriver[];
  reference_date: string;
  confidence: string;
}

export const insightsApi = {
  opex: () => unwrap(apiClient<Envelope<OpexOutlook>>('/api/v1/insights/opex')),
  risk: () => unwrap(apiClient<Envelope<RiskOverview>>('/api/v1/insights/risk')),
};

export interface ConsentItem {
  id: string;
  bank_code: string;
  scopes: string[];
  purpose: string;
  revoked: boolean;
  consented_at: string | null;
}

export const consentsApi = {
  list: () => unwrap(apiClient<Envelope<{ consents: ConsentItem[] }>>('/api/v1/consents')),
  grant: (data: { bank_code: string; scopes?: string[]; purpose?: string }) =>
    unwrap(apiClient<Envelope<{ id: string; bank_code: string; scopes: string[] }>>('/api/v1/consents', { method: 'POST', body: data })),
  revoke: (id: string) =>
    unwrap(apiClient<Envelope<{ revoked: boolean }>>(`/api/v1/consents/${id}`, { method: 'DELETE' })),
};
