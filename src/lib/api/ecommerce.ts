import { apiClient } from '../api-client';

export interface EcommerceDashboardData {
  safe_to_spend: {
    amount: number;
    confidence: string;
    breakdown: {
      net_income: number;
      tax_reserve: number;
      fixed_bills: number;
      buffer: number;
    };
  };
  cash_forecast_30d: number;
  gross_margin_pct: number;
  platform_fee_pct: number;
  cash_flow: Array<{ date: string; income: number; expenses: number; balance: number }>;
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

export interface SlowWeekContextData {
  is_slow_week: boolean;
  current_week_revenue?: number;
  expected_weekly_revenue?: number;
  pct_difference?: number;
  safe_to_spend?: number;
  context?: string;
  previous_week_revenue?: number;
  message?: string;
}

export interface PricingResult {
  net_margin: number;
  margin_pct: number;
  breakeven_roas: number | null;
  cost_breakdown: {
    cogs: number;
    shipping: number;
    platform_fees: number;
    payment_fees: number;
    tax: number;
    ad_spend: number;
  };
  revenue_breakdown?: {
    price: number;
    gross_profit: number;
    net_profit: number;
  };
}

export interface BreakevenROASResult {
  breakeven_roas: number | null;
  contribution_margin: number;
  contribution_margin_pct: number;
  cost_breakdown: {
    cogs: number;
    platform_fees: number;
    shipping: number;
    payment_fees: number;
    total: number;
  };
  ad_spend_health?: {
    status: string;
    actual_roas: number;
    gap: number;
    daily_loss_estimate: number;
  };
}

export interface SpendDecisionResult {
  verdict: string;
  confidence: number;
  reasoning: string;
  safe_to_spend: number;
  remaining_after: number;
  tax_reserve_pct: number;
  category: string;
}

export interface VATStatusData {
  country: string;
  vat_rate: number;
  vat_applicable: boolean;
  message?: string;
  total_revenue_with_vat?: number;
  vat_collected?: number;
  revenue_ex_vat?: number;
  total_costs_with_vat?: number;
  vat_on_purchases?: number;
  costs_ex_vat?: number;
  net_vat_owed?: number;
  period_months?: number;
  monthly_breakdown?: Array<{
    month: string;
    vat_collected: number;
    vat_on_purchases: number;
    net_vat: number;
  }>;
}

export interface COGSTrendData {
  trend: string;
  trend_label: string;
  is_compressed: boolean;
  avg_recent_cogs_pct: number;
  avg_prior_cogs_pct: number;
  cogs_change_pct: number;
  avg_recent_margin: number;
  avg_prior_margin: number;
  margin_change: number;
  suggested_price_multiplier: number | null;
  highest_cogs_month: { month: string; cogs_pct: number } | null;
  lowest_cogs_month: { month: string; cogs_pct: number } | null;
  monthly_trend: Array<{
    month: string;
    revenue: number;
    cogs: number;
    fees: number;
    total_costs: number;
    margin_pct: number;
    cogs_pct: number;
  }>;
  message: string;
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
  getSlowWeekContext: () =>
    apiClient<SlowWeekContextData>('/api/v1/verticals/ecommerce/slow-week-context'),
  calculatePricing: (data: Record<string, unknown>) =>
    apiClient<PricingResult>('/api/v1/tools/pricing-calculator', { body: data }),
  calculateBreakevenROAS: (data: Record<string, unknown>) =>
    apiClient<BreakevenROASResult>('/api/v1/tools/breakeven-roas', { body: data }),
  evaluateSpendDecision: (data: Record<string, unknown>) =>
    apiClient<SpendDecisionResult>('/api/v1/tools/spend-decision', { body: data }),
  getVatStatus: () =>
    apiClient<VATStatusData>('/api/v1/verticals/ecommerce/vat-status'),
  getCogstrend: (months?: number) =>
    apiClient<COGSTrendData>(`/api/v1/verticals/ecommerce/cogs-trend${months ? `?months=${months}` : ''}`),
};
