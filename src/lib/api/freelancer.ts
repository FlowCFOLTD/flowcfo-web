import { apiClient } from '../api-client';

// ─── Dashboard ────────────────────────────────────────────────────────

export interface DashboardData {
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
  income_volatility_level: 'low' | 'medium' | 'high';
  tax_readiness_pct: number;
  avg_monthly_income: number;
  client_concentration_pct: number;
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

// ─── Income Volatility ────────────────────────────────────────────────

export interface IncomeVolatilityData {
  period_months: number;
  avg_monthly_income: number;
  std_deviation: number;
  coefficient_of_variation: number;
  volatility_level: 'low' | 'medium' | 'high';
  monthly_breakdown: Array<{ month: string; label: string; income: number }>;
  peak_month: { month: string; label: string; income: number; vs_avg: string } | null;
  trough_month: { month: string; label: string; income: number; vs_avg: string } | null;
  expense_buffer: { amount: number; label: string; basis: string };
  strategic_insight: { summary: string | null; detail: string };
}

// ─── Client Concentration ─────────────────────────────────────────────

export interface ClientConcentrationData {
  period_days: number;
  total_revenue: number;
  client_count: number;
  top_client_share_pct: number;
  concentration_level: 'low' | 'medium' | 'high';
  clients: Array<{
    name: string;
    revenue: number;
    share_pct: number;
    transaction_count: number;
    latest_date: string;
  }>;
  diversification_note: string;
}

// ─── Tax Readiness ────────────────────────────────────────────────────

export interface TaxReadinessData {
  estimated_tax_this_quarter: number;
  tax_set_aside: number;
  shortfall: number;
  readiness_pct: number;
  shortfall_breakdown: {
    self_employment_tax: number;
    federal_income_tax: number;
    state_tax: number;
  };
  allocation_ledger: Array<{
    date: string;
    source: string;
    gross_income: number;
    auto_allocated: number;
  }>;
  strategy_notes: {
    immediate_action: { label: string; message: string };
    optimization_tip: { label: string; message: string };
  };
  next_deadline: { label: string; date: string };
  vault_balance: number;
}

// ─── Rate Analysis ────────────────────────────────────────────────────

export interface RateAnalysisData {
  period_months: number;
  total_income: number;
  billable_transactions: number;
  avg_per_project: number;
  avg_per_project_yoy: {
    current: number;
    previous: number;
    change_pct: number;
    label: string;
  };
  monthly_run_rate: number;
  run_rate_target: number;
  run_rate_history: Array<{ month: string; label: string; income: number }>;
  efficiency_index: {
    value: number;
    optimal_range: { min: number; max: number };
    note: string;
  };
  billable_hours: number;
  admin_overhead_hours: number;
  admin_insight: {
    overhead_change_pct: number;
    recoverable_hours: number;
    message: string;
  };
  market_benchmark: {
    region: string;
    premium_pct: number;
    description: string;
    source: string;
  };
  ai_suggestion: {
    rate: number;
    current_rate: number;
    reason: string;
  };
}

export const freelancerApi = {
  getDashboard: () => apiClient<DashboardData>('/api/v1/verticals/freelancer/dashboard'),
  getIncomeVolatility: (months?: number) =>
    apiClient<IncomeVolatilityData>(`/api/v1/verticals/freelancer/income-volatility${months ? `?months=${months}` : ''}`),
  getClientConcentration: () =>
    apiClient<ClientConcentrationData>('/api/v1/verticals/freelancer/client-concentration'),
  getTaxReadiness: () => apiClient<TaxReadinessData>('/api/v1/verticals/freelancer/tax-readiness'),
  getRateAnalysis: (months?: number) =>
    apiClient<RateAnalysisData>(`/api/v1/verticals/freelancer/rate-analysis${months ? `?months=${months}` : ''}`),
};
