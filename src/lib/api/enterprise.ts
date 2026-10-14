import { apiClient } from '../api-client';

export interface Envelope<T> {
  status: 'ok';
  data: T;
  meta: { request_id: string; timestamp: string };
}

const unwrap = <T,>(p: Promise<Envelope<T>>): Promise<T> => p.then((r) => r.data);

export interface EnterpriseSummary {
  id: string;
  name: string;
  code: string;
}

export interface EnterpriseRow extends EnterpriseSummary {
  contact_email: string | null;
  sme_count: number;
}

export interface PortfolioSme {
  user_id: string;
  email: string;
  business_name: string | null;
  business_type: string | null;
  risk_score: number;
  risk_band: string;
  health_score: number;
  top_risk_driver: { factor: string; points: number; value: number | string; detail: string } | null;
  risk_drivers: { factor: string; points: number; value: number | string; detail: string }[];
  outstanding_total: number;
  overdue_total: number;
  overdue_count: number;
  aging_buckets: Record<string, number>;
}

export interface PortfolioSummary {
  enterprise: EnterpriseSummary;
  sme_count: number;
  total_overdue: number;
  smes_with_overdue: number;
  risk_bands: Record<string, number>;
  smes: PortfolioSme[];
}

export interface ShortfallItem {
  user_id: string;
  email: string;
  business_name: string | null;
  shortfall_amount: number;
  shortfall_date: string | null;
  monthly_opex_avg: number;
  projected_end_balance: number;
  will_shortfall: boolean;
  [key: string]: unknown;
}

export interface BankScopeOption {
  channel: string;
  pattern: string;
  needs_from_bank: string[];
  effort: string;
}

export interface BankScope {
  options: BankScopeOption[];
  compliance: string[];
  sme_onboarding: string[];
}

export interface ScanResult {
  user_id: string;
  email?: string;
  new_alerts: string[];
}

export const enterpriseApi = {
  list: () =>
    unwrap(apiClient<Envelope<{ enterprises: EnterpriseRow[] }>>('/api/v1/admin/enterprise')),
  create: (data: { name: string; code: string; contact_email?: string; webhook_url?: string; settings?: Record<string, unknown> }) =>
    unwrap(apiClient<Envelope<EnterpriseSummary>>('/api/v1/admin/enterprise', { method: 'POST', body: data })),
  assignSme: (enterpriseId: string, userId: string) =>
    unwrap(apiClient<Envelope<{ user_id: string; enterprise_id: string }>>(`/api/v1/admin/enterprise/${enterpriseId}/smes`, {
      method: 'POST',
      body: { user_id: userId },
    })),
  portfolio: (enterpriseId: string) =>
    unwrap(apiClient<Envelope<PortfolioSummary>>(`/api/v1/admin/enterprise/${enterpriseId}/portfolio`)),
  scan: (enterpriseId: string) =>
    unwrap(apiClient<Envelope<{ enterprise_id: string; scanned: number; results: ScanResult[] }>>(
      `/api/v1/admin/enterprise/${enterpriseId}/scan`,
      { method: 'POST' },
    )),
  shortfalls: (enterpriseId: string) =>
    unwrap(apiClient<Envelope<{ enterprise_id: string; shortfalls: ShortfallItem[] }>>(
      `/api/v1/admin/enterprise/${enterpriseId}/shortfalls`,
    )),
  digest: (enterpriseId: string) =>
    unwrap(apiClient<Envelope<{ enterprise_id: string; digest: string }>>(`/api/v1/admin/enterprise/${enterpriseId}/digest`)),
  emailDigest: (enterpriseId: string) =>
    unwrap(apiClient<Envelope<{ ok: boolean; to?: string; error?: string | null }>>(
      `/api/v1/admin/enterprise/${enterpriseId}/digest/email`,
      { method: 'POST' },
    )),
  connectors: () => unwrap(apiClient<Envelope<{ connectors: string[] }>>('/api/v1/admin/enterprise/connectors/codes')),
  coreBankingScope: () => unwrap(apiClient<Envelope<BankScope>>('/api/v1/admin/enterprise/connectors/core-banking/scope')),
  update: (enterpriseId: string, data: { name?: string; contact_email?: string; webhook_url?: string; settings?: Record<string, unknown> }) =>
    unwrap(apiClient<Envelope<EnterpriseSummary & { contact_email: string | null }>>(`/api/v1/admin/enterprise/${enterpriseId}`, {
      method: 'PATCH',
      body: data,
    })),
  demoSme: (enterpriseId: string, data: { business_name: string; business_type?: string; email?: string; currency?: string }) =>
    unwrap(apiClient<Envelope<{ user_id: string; email: string; business_name: string; enterprise_id: string }>>(
      `/api/v1/admin/enterprise/${enterpriseId}/demo-sme`,
      { method: 'POST', body: data },
    )),
  importSmeInvoices: (enterpriseId: string, smeId: string, file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return unwrap(apiClient<Envelope<{ imported: number; csv_rows: number; warnings: string[]; aging: { outstanding_total: number; outstanding_count: number; overdue_total: number; overdue_count: number; buckets: Record<string, number> } }>>(
      `/api/v1/admin/enterprise/${enterpriseId}/smes/${smeId}/invoices/import`,
      { method: 'POST', body: fd },
    ));
  },
  importSmeTransactions: (enterpriseId: string, smeId: string, file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return unwrap(apiClient<Envelope<{ account_id: string; format: string; transactions_imported: number; warnings: string[]; total_income: number; total_expenses: number; date_range: [string, string] }>>(
      `/api/v1/admin/enterprise/${enterpriseId}/smes/${smeId}/transactions/import`,
      { method: 'POST', body: fd },
    ));
  },
  previewSmeTransactions: (enterpriseId: string, smeId: string, file: File) => {
    const fd = new FormData();
    fd.append('file', file);
    return unwrap(apiClient<Envelope<{ format: string; row_count: number; preview: { date: string; amount: number; description: string; merchant: string }[]; warnings: string[]; total_income: number; total_expenses: number }>>(
      `/api/v1/admin/enterprise/${enterpriseId}/smes/${smeId}/transactions/preview`,
      { method: 'POST', body: fd },
    ));
  },
  scanSme: (enterpriseId: string, smeId: string) =>
    unwrap(apiClient<Envelope<{ user_id: string; new_alerts: string[] }>>(
      `/api/v1/admin/enterprise/${enterpriseId}/smes/${smeId}/scan`,
      { method: 'POST' },
    )),
};
