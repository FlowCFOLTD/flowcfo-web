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

export interface AgentSettings {
  margin_guardian_enabled: boolean;
  margin_guardian_threshold: number;
  category_suggester_enabled: boolean;
  inventory_replenishment_enabled: boolean;
  inventory_replenishment_target_days: number;
  fee_audit_enabled: boolean;
  fee_audit_buffer_pct: number;
}

export interface AgentLogItem {
  id: string;
  agent_name: string;
  status: string;
  trigger: string;
  output: Record<string, unknown>;
  error: Record<string, unknown> | null;
  user_response: string | null;
  created_at: string;
}

export interface AgentLogsResponse {
  logs: AgentLogItem[];
  total: number;
}

export interface PendingApproval {
  id: string;
  agent_name: string;
  title: string;
  message: string;
  alert_metadata: Record<string, unknown>;
  created_at: string;
}

export interface PendingApprovalsResponse {
  approvals: PendingApproval[];
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
  getSettings: () =>
    apiClient<{ settings: AgentSettings }>('/api/v1/agents/settings'),
  updateSettings: (settings: Partial<AgentSettings>) =>
    apiClient<{ settings: AgentSettings }>('/api/v1/agents/settings', {
      method: 'PUT',
      body: settings,
    }),
  getLogs: (limit = 20, offset = 0, agent_name?: string) =>
    apiClient<AgentLogsResponse>(`/api/v1/agents/logs?limit=${limit}&offset=${offset}${agent_name ? `&agent_name=${agent_name}` : ''}`),
  getPendingApprovals: () =>
    apiClient<PendingApprovalsResponse>('/api/v1/agents/pending-approvals'),
  approveAction: (logId: string) =>
    apiClient<{ status: string; message: string }>(`/api/v1/agents/pending/${logId}/approve`, {
      method: 'POST',
    }),
  rejectAction: (logId: string) =>
    apiClient<{ status: string; message: string }>(`/api/v1/agents/pending/${logId}/reject`, {
      method: 'POST',
    }),
};
