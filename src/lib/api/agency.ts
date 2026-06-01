import { apiClient } from '../api-client';

export interface AgencyDashboardData {
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
  overall_margin_pct: number;
  top_client_pct: number;
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

export interface ClientProfitabilityData {
  period_months: number;
  total_revenue: number;
  total_expenses: number;
  net_profit: number;
  overall_margin_pct: number;
  client_breakdown: Array<{
    client: string;
    revenue: number;
    expenses: number;
    profit: number;
    margin_pct: number;
    status: string;
  }>;
  profitable_count: number;
  at_risk_count: number;
  quarterly_outlook: {
    projected_revenue: number;
    projected_profit: number;
    outlook: string;
  };
}

export interface RevenueDiversificationData {
  period_months: number;
  total_revenue: number;
  client_count: number;
  top_client_pct: number;
  top_3_clients_pct: number;
  hhi_index: number;
  portfolio_health_score: number;
  diversification_risk: string;
  revenue_breakdown: Array<{ client: string; revenue: number; pct: number }>;
  portfolio_risk_assessment: Array<{
    entity: string;
    revenue: number;
    pct: number;
    risk_level: string;
  }>;
  strategic_note: string;
}

export const agencyApi = {
  getDashboard: () => apiClient<AgencyDashboardData>('/api/v1/verticals/agency/dashboard'),
  getClientProfitability: (months?: number) =>
    apiClient<ClientProfitabilityData>(`/api/v1/verticals/agency/client-profitability${months ? `?months=${months}` : ''}`),
  getRevenueDiversification: (months?: number) =>
    apiClient<RevenueDiversificationData>(`/api/v1/verticals/agency/revenue-diversification${months ? `?months=${months}` : ''}`),
};
