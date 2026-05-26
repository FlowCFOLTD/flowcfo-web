import { apiClient } from '../api-client';

export interface RestaurantDashboardData {
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
  food_cost_pct: number;
  labor_cost_pct: number;
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
  strategic_insight: string;
}

export interface FoodCostData {
  period_months: number;
  total_revenue: number;
  total_food_cost: number;
  food_cost_pct: number;
  industry_benchmark_pct: number;
  status: string;
  monthly_breakdown: Array<{
    month: string;
    revenue: number;
    food_cost: number;
    food_cost_pct: number;
  }>;
  supplier_breakdown: Array<{
    supplier: string;
    amount: number;
    pct: number;
  }>;
}

export interface DailyRevenueData {
  period_days: number;
  total_revenue: number;
  avg_daily_revenue: number;
  busiest_day: { date: string; revenue: number } | null;
  slowest_day: { date: string; revenue: number } | null;
  daily_breakdown: Array<{ date: string; revenue: number }>;
  weekday_breakdown: Array<{
    day: string;
    avg_revenue: number;
    total_revenue: number;
  }>;
  busiest_weekday: string;
  slowest_weekday: string;
  revenue_range: { high: number; low: number };
}

export interface LaborCostData {
  period_months: number;
  total_labor_cost: number;
  labor_cost_pct: number;
  industry_benchmark_pct: number;
  status: string;
}

export const restaurantApi = {
  getDashboard: () => apiClient<RestaurantDashboardData>('/api/v1/verticals/restaurant/dashboard'),
  getFoodCost: (months?: number) =>
    apiClient<FoodCostData>(`/api/v1/verticals/restaurant/food-cost${months ? `?months=${months}` : ''}`),
  getDailyRevenue: (days?: number) =>
    apiClient<DailyRevenueData>(`/api/v1/verticals/restaurant/daily-revenue${days ? `?days=${days}` : ''}`),
  getLaborCost: (months?: number) =>
    apiClient<LaborCostData>(`/api/v1/verticals/restaurant/labor-cost${months ? `?months=${months}` : ''}`),
};
