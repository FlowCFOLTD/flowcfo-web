import { apiClient } from '../api-client';

export interface StartupDashboardData {
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
  cash_flow_30d: number;
  monthly_burn: number;
  burn_change_pct: number;
  runway_months: number;
  runway_status: string;
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
  expense_categories: Array<{ category: string; amount: number; percentage: number }>;
}

export interface BurnRateData {
  period_months: number;
  total_expenses: number;
  avg_monthly_burn: number;
  avg_monthly_income: number;
  net_monthly_burn: number;
  trend_pct: number;
  trend_label: string;
  burn_trend: Array<{ month: string; label: string; gross_burn: number; net_burn: number }>;
  category_breakdown: Record<string, { amount: number; percentage: number }>;
  burn_ratio_history: Array<{ month: string; burn: number }>;
  strategic_insight: { summary: string };
  recommendations: Array<{ icon: string; text: string }>;
  monthly_breakdown: Array<{ month: string; label: string; expenses: number; income: number; net_burn: number }>;
}

export interface RunwayData {
  available_balance: number;
  monthly_burn: number;
  runway_months: number;
  runway_date: string;
  runway_status: string;
  runway_pct: number;
  zero_cash_date: string;
  burn_snapshot: {
    gross_burn: number;
    gross_burn_change: string;
    net_burn: number;
    net_burn_change: string;
  };
  quick_action: { message: string; action_label: string };
  scenarios: Array<{
    label: string;
    icon: string;
    name: string;
    description: string;
    runway_months: number;
    fundraise_date: string;
  }>;
  monthly_trend: Array<{ month: string; label: string; runway_months: number; cash_reserve: number }>;
  components: Array<{
    component: string;
    current_month: number;
    last_month: number;
    variance: string;
    runway_impact: string;
  }>;
}

export interface UnitEconomicsData {
  period_days: number;
  mrr: number;
  mrr_growth_pct: number;
  ltv: number;
  ltv_label: string;
  customer_acquisition_cost: number;
  cac_label: string;
  new_customers: number;
  prev_customers: number;
  efficiency_ratio: number;
  efficiency_label: string;
  efficiency_note: string;
  mrr_projection: Array<{ month: string; label: string; actual?: number; projected?: number }>;
  channel_performance: Array<{
    channel: string;
    spend: number;
    new_customers: number;
    cac: number;
    ltv_est: number;
    ratio: number;
  }>;
}

export const startupApi = {
  getDashboard: () => apiClient<StartupDashboardData>('/api/v1/verticals/startup/dashboard'),
  getBurnRate: (months?: number) =>
    apiClient<BurnRateData>(`/api/v1/verticals/startup/burn-rate${months ? `?months=${months}` : ''}`),
  getRunway: () => apiClient<RunwayData>('/api/v1/verticals/startup/runway'),
  getUnitEconomics: () => apiClient<UnitEconomicsData>('/api/v1/verticals/startup/unit-economics'),
};
