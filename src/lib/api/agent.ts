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

export interface OrchestratorAgent {
  agent_name: string;
  last_run: string | null;
  status: string;
  run_count: number;
  last_output: Record<string, unknown> | null;
}

export interface MorningBrief {
  date: string;
  cash_position: string;
  alerts_summary: string;
  agent_activity: string;
  recommendations: string;
  full_text: string;
}

export interface AutonomyTiersResponse {
  tiers: Record<string, { name: string; description: string }>;
  action_classifications: Record<string, number>;
  default_tier: number;
}

export interface ActionTierResponse {
  action_type: string;
  tier: number;
  description: string;
}

export interface ShouldAskResponse {
  action_type: string;
  tier: number;
  should_ask: boolean;
}

export interface AgentPreference {
  id: string;
  action_type: string;
  approved_count: number;
  rejected_count: number;
  threshold: number;
  auto_approve: boolean;
  created_at: string;
  updated_at: string;
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
  runAgent: (agentName: string) =>
    apiClient<{ status: string; message: string }>(`/api/v1/agents/run/${agentName}`, {
      method: 'POST',
    }),
  approveAction: (logId: string) =>
    apiClient<{ status: string; message: string }>(`/api/v1/agents/pending/${logId}/approve`, {
      method: 'POST',
    }),
  rejectAction: (logId: string) =>
    apiClient<{ status: string; message: string }>(`/api/v1/agents/pending/${logId}/reject`, {
      method: 'POST',
    }),

  // Orchestrator
  getOrchestratorStatus: () =>
    apiClient<{ agents: OrchestratorAgent[] }>('/api/v1/orchestrator/status'),

  // Morning Brief
  getMorningBriefPreview: () =>
    apiClient<{ brief: MorningBrief }>('/api/v1/morning-brief/preview'),
  sendMorningBrief: () =>
    apiClient<{ status: string }>('/api/v1/morning-brief/send', { method: 'POST' }),

  // Autonomy Tiers
  getAutonomyTiers: () =>
    apiClient<AutonomyTiersResponse>('/api/v1/autonomy/tiers'),
  getActionTier: (actionType: string) =>
    apiClient<ActionTierResponse>(`/api/v1/autonomy/tiers/${actionType}`),
  shouldAskUser: (actionType: string) =>
    apiClient<ShouldAskResponse>(`/api/v1/autonomy/should-ask/${actionType}`),

  // Agent Memory
  getAgentPreferences: () =>
    apiClient<{ preferences: AgentPreference[] }>('/api/v1/agent-memory/preferences'),
};
