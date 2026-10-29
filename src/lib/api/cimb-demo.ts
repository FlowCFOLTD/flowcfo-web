import { apiClient } from '../api-client';

export interface DemoEnvelope<T> {
  status: 'ok';
  data: T;
  meta: { request_id: string; timestamp: string };
}

export interface DemoAnalysis {
  scenario: 'consumer_banking' | 'business_banking';
  currency: string;
  as_of: string;
  summary: Record<string, number | string | null>;
  alerts: Array<Record<string, unknown>>;
  product_recommendations: Array<Record<string, unknown>>;
  disclosures: string[];
  calculation_version: string;
  spending_by_category?: Array<{ category: string; amount: number }>;
  budget_actions?: Array<Record<string, unknown>>;
  early_warning?: { score: number; band: string; drivers: string[] };
  fx_opportunities?: Array<Record<string, unknown>>;
  advisor?: { headline: string; message: string; mode: string };
  virtual_cfo?: { headline: string; message: string; mode: string };
  delinquency_prevention?: {
    status: string;
    repayment_name: string;
    repayment_amount: number;
    repayment_date: string;
    intervention_by: string;
    coverage_ratio: number | null;
    action: string;
  } | null;
}

export interface IngestionEvidence {
  filename?: string;
  source_format?: string;
  source_type?: string;
  row_count?: number;
  columns?: string[];
  preview?: Array<Record<string, string>>;
  candidate?: Record<string, string | number | null>;
  confidence?: number;
  status?: string;
  warnings?: string[];
  text_excerpt?: string;
}

export type DemoAlertType =
  | 'consumer_commitment'
  | 'business_liquidity'
  | 'delinquency_prevention';

export interface DemoNotificationDelivery {
  delivery_status: 'sent';
  channel: 'email';
  recipient: string;
  alert_type: DemoAlertType;
  provider_message_id: string | null;
  subject: string;
}

export const cimbDemoApi = {
  consumer: (payload: unknown) =>
    apiClient<DemoEnvelope<DemoAnalysis>>('/api/v1/admin/cimb-demo/consumer/analyze', {
      method: 'POST',
      body: payload,
    }),
  business: (payload: unknown) =>
    apiClient<DemoEnvelope<DemoAnalysis>>('/api/v1/admin/cimb-demo/business/analyze', {
      method: 'POST',
      body: payload,
    }),
  previewTabular: (file: File) => {
    const body = new FormData();
    body.append('file', file);
    return apiClient<DemoEnvelope<IngestionEvidence>>('/api/v1/documents/tabular/preview', { method: 'POST', body });
  },
  extractDocument: (file: File) => {
    const body = new FormData();
    body.append('file', file);
    return apiClient<DemoEnvelope<IngestionEvidence>>('/api/v1/documents/extract', { method: 'POST', body });
  },
  previewGoogleSheet: (url: string, purpose: 'statement' | 'invoice') =>
    apiClient<DemoEnvelope<IngestionEvidence>>('/api/v1/documents/google-sheets/preview', {
      method: 'POST',
      body: { url, purpose },
    }),
  sendNotification: (email: string, alertType: DemoAlertType) =>
    apiClient<DemoEnvelope<DemoNotificationDelivery>>('/api/v1/admin/cimb-demo/notifications/send', {
      method: 'POST',
      body: { email, alert_type: alertType },
    }),
};
