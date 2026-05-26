import { apiClient } from '../api-client';

export interface EcommerceDashboardData {
  safe_to_spend: {
    amount: number;
    confidence: string;
    breakdown: {
      available: number;
      tax_reserve: number;
      fixed_bills: number;
      buffer: number;
    };
  };
  cash_forecast_30d: number;
  gross_margin_pct: number;
  platform_fee_pct: number;
  cash_flow: Array<{ date: string; income: number; balance: number }>;
  recent_transactions: Array<{
    entity: string;
    description: string;
    category: string;
    amount: number;
    is_income: boolean;
    date: string;
  }>;
  tax_reserve_status: {
    percentage: number;
    shortfall: number;
    estimated_tax: number;
    set_aside: number;
  };
  active_alerts: Array<{
    type: string;
    icon: string;
    message: string;
    details: string;
  }>;
  market_insight: {
    index_label: string;
    index_value: number;
    index_change: string;
    context: string;
    recommendation: string;
  };
}

export interface GrossMarginData {
  period_months: number;
  total_revenue: number;
  total_cogs: number;
  gross_profit: number;
  gross_margin_pct: number;
  monthly_breakdown: Array<{
    month: string;
    revenue: number;
    cogs: number;
    gross_profit: number;
    margin_pct: number;
  }>;
}

export interface PlatformFeesData {
  period_months: number;
  total_platform_fees: number;
  fee_as_pct_of_revenue: number;
  breakdown_by_platform: Record<string, number>;
}

export interface InventoryHealthData {
  period_months: number;
  total_cogs: number;
  avg_monthly_cogs: number;
  inventory_spend: number;
  inventory_turnover_ratio: number;
  days_on_hand: number | null;
  restocking_urgency: string;
}

export interface SeasonalPatternsData {
  period_months: number;
  avg_monthly_revenue: number;
  monthly_breakdown: Array<{
    month: string;
    revenue: number;
    expenses: number;
    net: number;
  }>;
  seasonal_peaks: Array<{
    month: string;
    revenue: number;
    above_average_pct: number;
  }>;
  peak_count: number;
  lowest_month: { month: string; revenue: number } | null;
  highest_month: { month: string; revenue: number } | null;
}

export interface PayoutAnalysisData {
  period_months: number;
  total_payouts: number;
  payout_count: number;
  breakdown_by_platform: Record<string, {
    total_payouts: number;
    count: number;
    latest: string | null;
  }>;
}

export const ecommerceApi = {
  getDashboard: () => apiClient<EcommerceDashboardData>('/api/v1/verticals/ecommerce/dashboard'),
  getGrossMargin: (months?: number) =>
    apiClient<GrossMarginData>(`/api/v1/verticals/ecommerce/gross-margin${months ? `?months=${months}` : ''}`),
  getPlatformFees: (months?: number) =>
    apiClient<PlatformFeesData>(`/api/v1/verticals/ecommerce/platform-fees${months ? `?months=${months}` : ''}`),
  getInventoryHealth: (months?: number) =>
    apiClient<InventoryHealthData>(`/api/v1/verticals/ecommerce/inventory-health${months ? `?months=${months}` : ''}`),
  getSeasonalPatterns: (months?: number) =>
    apiClient<SeasonalPatternsData>(`/api/v1/verticals/ecommerce/seasonal-patterns${months ? `?months=${months}` : ''}`),
  getPayoutAnalysis: (months?: number) =>
    apiClient<PayoutAnalysisData>(`/api/v1/verticals/ecommerce/payouts${months ? `?months=${months}` : ''}`),
};
