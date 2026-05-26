import { apiClient } from '../api-client';

export interface ChatRequest {
  message: string;
}

export interface AgentInsights {
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

export const agentApi = {
  chat: (message: string) =>
    apiClient<string>(`/api/v1/agent/chat`, {
      method: 'POST',
      body: { message },
    }),
  generateInsights: () =>
    apiClient<{ status: string; insights: AgentInsights }>('/api/v1/agent/generate-insights', {
      method: 'POST',
    }),
  getInsights: () =>
    apiClient<{ status: string; insights: AgentInsights }>('/api/v1/agent/insights'),
};
