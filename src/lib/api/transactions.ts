import { apiClient } from '@/lib/api-client';

export type TransactionItem = {
  id: string;
  date: string;
  merchant_name: string | null;
  description: string | null;
  amount: number;
  currency: string;
  is_income: boolean;
  category: string | null;
  account_id: string | null;
};

export type TransactionsResponse = {
  transactions: TransactionItem[];
  total: number;
  page: number;
  page_size: number;
};

function buildQuery(params?: Record<string, string | number | undefined>): string {
  if (!params) return '';
  const parts = Object.entries(params).filter(([, v]) => v != null).map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`);
  return parts.length ? `?${parts.join('&')}` : '';
}

export const transactionsApi = {
  list: (params?: { page?: number; page_size?: number; category?: string; start_date?: string; end_date?: string }) =>
    apiClient<TransactionsResponse>(`/api/v1/transactions${buildQuery(params)}`),
};
