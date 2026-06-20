'use client';

import { useState } from 'react';
import {
  useAgentLogs, usePendingApprovals, useApproveAction, useRejectAction, useRunAgent,
  useOrchestratorStatus, useMorningBriefPreview, useSendMorningBrief,
  useAutonomyTiers, useAgentPreferences,
} from '@/hooks/api/use-agent';
import {
  CheckCircle2, XCircle, Clock, AlertTriangle, Info, TrendingUp, Package,
  Search, Receipt, ShieldCheck, Play, Send, Settings, Brain, Activity,
  Mail, ChevronRight,
} from 'lucide-react';

const agentIcons: Record<string, React.ReactNode> = {
  margin_guardian: <TrendingUp className="h-4 w-4" />,
  category_suggester: <Search className="h-4 w-4" />,
  inventory_replenishment: <Package className="h-4 w-4" />,
  fee_audit: <Receipt className="h-4 w-4" />,
};

const statusColors: Record<string, string> = {
  ok: 'text-emerald-400 bg-emerald-500/10',
  alerted: 'text-amber-400 bg-amber-500/10',
  skipped: 'text-white/30 bg-white/5',
  pending: 'text-blue-400 bg-blue-500/10',
  approved: 'text-emerald-400 bg-emerald-500/10',
  rejected: 'text-rose-400 bg-rose-500/10',
  completed: 'text-emerald-400 bg-emerald-500/10',
};

const tierDescriptions: Record<number, { label: string; color: string }> = {
  1: { label: 'Autonomous', color: 'text-emerald-400 bg-emerald-500/10' },
  2: { label: 'Confirm First', color: 'text-amber-400 bg-amber-500/10' },
  3: { label: 'Full Approval', color: 'text-blue-400 bg-blue-500/10' },
};

function AgentIcon({ agent_name }: { agent_name: string }) {
  return (
    <div className="h-8 w-8 bg-flow-gold/10 flex items-center justify-center shrink-0">
      {agentIcons[agent_name] || <ShieldCheck className="h-4 w-4 text-flow-gold" />}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const color = statusColors[status] || 'text-white/40 bg-white/5';
  return (
    <span className={`flow-label text-[9px] px-2 py-0.5 uppercase tracking-wider ${color}`}>
      {status}
    </span>
  );
}

function TierBadge({ tier }: { tier: number }) {
  const t = tierDescriptions[tier] || tierDescriptions[1];
  return (
    <span className={`flow-label text-[9px] px-2 py-0.5 uppercase tracking-wider ${t.color}`}>
      {t.label}
    </span>
  );
}

function LogsTab() {
  const [filter, setFilter] = useState<string>('');
  const { data, isLoading } = useAgentLogs(50, 0, filter || undefined);
  const logs = data?.logs || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white/5 border border-white/10 px-3 py-2 font-body text-sm text-white focus:outline-none focus:border-flow-gold"
        >
          <option value="">All Agents</option>
          <option value="margin_guardian">Margin Guardian</option>
          <option value="category_suggester">Category Suggester</option>
          <option value="inventory_replenishment">Inventory Replenishment</option>
          <option value="fee_audit">Fee Audit</option>
        </select>
        <span className="font-body text-xs text-white/30">{data?.total || 0} total runs</span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
        </div>
      ) : logs.length === 0 ? (
        <div className="border border-white/10 bg-white/5 p-12 text-center">
          <ShieldCheck className="h-8 w-8 text-white/20 mx-auto mb-3" />
          <p className="font-body text-sm text-white/30">No agent activity yet. Agents run on schedule and will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <div key={log.id} className="border border-white/10 bg-white/5 p-4 flex items-start gap-4">
              <AgentIcon agent_name={log.agent_name} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-body text-sm font-bold text-white capitalize">
                    {log.agent_name.replace(/_/g, ' ')}
                  </span>
                  <StatusBadge status={log.status} />
                  <span className="font-body text-[10px] text-white/20 uppercase tracking-wider">
                    {log.trigger}
                  </span>
                  <span className="font-body text-[10px] text-white/20">
                    {new Date(log.created_at).toLocaleString()}
                  </span>
                </div>
                {log.output && Object.keys(log.output).length > 0 && (
                  <pre className="font-mono text-[10px] text-white/30 mt-2 whitespace-pre-wrap line-clamp-2">
                    {JSON.stringify(log.output, null, 1)}
                  </pre>
                )}
                {log.user_response && (
                  <div className="flex items-center gap-2 mt-2">
                    {log.user_response === 'approved' ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <XCircle className="h-3 w-3 text-rose-400" />
                    )}
                    <span className="font-body text-[10px] text-white/40 uppercase">
                      {log.user_response}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ApprovalsTab() {
  const { data, isLoading } = usePendingApprovals();
  const approve = useApproveAction();
  const reject = useRejectAction();
  const approvals = data?.approvals || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
      </div>
    );
  }

  if (approvals.length === 0) {
    return (
      <div className="border border-white/10 bg-white/5 p-12 text-center">
        <CheckCircle2 className="h-8 w-8 text-emerald-400/40 mx-auto mb-3" />
        <p className="font-body text-sm text-white/30">No pending approvals. All agents are operating normally.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {approvals.map((a) => (
        <div key={a.id} className="border border-blue-500/20 bg-blue-500/5 p-5">
          <div className="flex items-start gap-4">
            <div className="h-8 w-8 bg-blue-500/10 flex items-center justify-center shrink-0">
              <Clock className="h-4 w-4 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-body text-sm font-bold text-white">{a.title}</h3>
              <p className="font-body text-xs text-white/50 mt-1">{a.message}</p>
              <p className="font-body text-[10px] text-white/20 mt-2">
                {new Date(a.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => approve.mutate(a.id)}
                disabled={approve.isPending}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/20 text-emerald-400 font-body text-xs font-bold hover:bg-emerald-500/30 transition-colors disabled:opacity-50"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                Approve
              </button>
              <button
                onClick={() => reject.mutate(a.id)}
                disabled={reject.isPending}
                className="flex items-center gap-1.5 px-4 py-2 bg-rose-500/20 text-rose-400 font-body text-xs font-bold hover:bg-rose-500/30 transition-colors disabled:opacity-50"
              >
                <XCircle className="h-3.5 w-3.5" />
                Reject
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SystemTab() {
  const { data: statusData, isLoading: statusLoading } = useOrchestratorStatus();
  const { data: briefData, isLoading: briefLoading } = useMorningBriefPreview();
  const sendBrief = useSendMorningBrief();
  const agentsObj = statusData?.agents || {};
  const agents = Array.isArray(agentsObj) ? agentsObj : Object.entries(agentsObj).map(([name, data]) => ({ agent_name: name, ...(data as Record<string, unknown>) }));
  const brief = briefData?.brief;

  return (
    <div className="space-y-6">
      {/* Orchestrator Status */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-4 w-4 text-flow-gold" />
          <h3 className="font-body text-sm font-bold text-white">Agent Status</h3>
        </div>
        {statusLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
          </div>
        ) : agents.length === 0 ? (
          <div className="border border-white/10 bg-white/5 p-8 text-center">
            <p className="font-body text-sm text-white/30">No agent status data yet. Agents will appear here after their first run.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {agents.map((a) => (
              <div key={a.agent_name} className="border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <AgentIcon agent_name={a.agent_name} />
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-sm font-bold text-white capitalize">
                      {a.agent_name.replace(/_/g, ' ')}
                    </p>
                    <StatusBadge status={a.status} />
                  </div>
                  <div className="text-right">
                    <p className="font-body text-[10px] text-white/30">
                      {a.run_count} {a.run_count === 1 ? 'run' : 'runs'}
                    </p>
                    {a.last_run && (
                      <p className="font-body text-[10px] text-white/20">
                        {new Date(a.last_run).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
                {a.last_output && Object.keys(a.last_output).length > 0 && (
                  <pre className="font-mono text-[10px] text-white/30 mt-2 whitespace-pre-wrap line-clamp-2">
                    {JSON.stringify(a.last_output, null, 1)}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Morning Brief */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-flow-gold" />
            <h3 className="font-body text-sm font-bold text-white">Morning Brief</h3>
          </div>
          <button
            onClick={() => sendBrief.mutate()}
            disabled={sendBrief.isPending}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-flow-gold/10 text-flow-gold font-body text-[10px] font-bold uppercase tracking-wider hover:bg-flow-gold/20 transition-colors disabled:opacity-50"
          >
            {sendBrief.isPending ? (
              <div className="h-3 w-3 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
            ) : (
              <Send className="h-3 w-3" />
            )}
            {sendBrief.isPending ? 'Sending...' : 'Send Test Brief'}
          </button>
        </div>
        {briefLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
          </div>
        ) : brief ? (
          <div className="border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-body text-[10px] text-white/30 uppercase tracking-wider">Generated: {brief.date}</span>
            </div>
            <pre className="font-body text-xs text-white/60 whitespace-pre-wrap leading-relaxed">
              {brief.full_text}
            </pre>
          </div>
        ) : (
          <div className="border border-white/10 bg-white/5 p-8 text-center">
            <p className="font-body text-sm text-white/30">No brief data available. Agents need to run first to generate data.</p>
          </div>
        )}
        {sendBrief.isSuccess && (
          <p className="font-body text-xs text-emerald-400 mt-2">Brief sent to Telegram.</p>
        )}
        {sendBrief.isError && (
          <p className="font-body text-xs text-rose-400 mt-2">Failed to send brief. Check Telegram bot connection.</p>
        )}
      </div>
    </div>
  );
}

function SettingsTab() {
  const { data: tiersData, isLoading: tiersLoading } = useAutonomyTiers();
  const { data: prefsData, isLoading: prefsLoading } = useAgentPreferences();
  const prefs = prefsData?.preferences || [];
  const tiers = tiersData?.tiers || {};
  const classifications = tiersData?.action_classifications || {};

  const actionLabels: Record<string, string> = {
    margin_alert: 'Margin Alert',
    fee_alert: 'Fee Alert',
    inventory_alert: 'Inventory Alert',
    category_mapping: 'Category Mapping',
    tax_filing: 'Tax Filing',
    price_update: 'Price Update',
    supplier_order: 'Supplier Order',
  };

  return (
    <div className="space-y-6">
      {/* Autonomy Tiers */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Settings className="h-4 w-4 text-flow-gold" />
          <h3 className="font-body text-sm font-bold text-white">Autonomy Tiers</h3>
        </div>
        <p className="font-body text-xs text-white/40 mb-4">
          Agents operate at different autonomy levels based on action risk. Higher tiers require more user approval.
        </p>
        {tiersLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
          </div>
        ) : (
          <div className="space-y-3">
            {/* Tier descriptions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(tiers).map(([tierNum, tier]) => (
                <div key={tierNum} className="border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <TierBadge tier={Number(tierNum)} />
                  </div>
                  <p className="font-body text-xs font-bold text-white">{tier.name}</p>
                  <p className="font-body text-[10px] text-white/40 mt-1">{tier.description}</p>
                </div>
              ))}
            </div>

            {/* Action classifications */}
            <div className="border border-white/10 bg-white/5 p-4">
              <p className="font-body text-xs font-bold text-white/60 uppercase tracking-wider mb-3">Action Classifications</p>
              <div className="space-y-2">
                {Object.entries(classifications).map(([action, tier]) => (
                  <div key={action} className="flex items-center justify-between py-1.5">
                    <span className="font-body text-xs text-white/60">{actionLabels[action] || action}</span>
                    <TierBadge tier={tier as number} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Agent Memory / Preferences */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Brain className="h-4 w-4 text-flow-gold" />
          <h3 className="font-body text-sm font-bold text-white">Agent Memory</h3>
        </div>
        <p className="font-body text-xs text-white/40 mb-4">
          Tracks your approval history. After enough approvals for the same action type, agents can auto-approve similar actions.
        </p>
        {prefsLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
          </div>
        ) : prefs.length === 0 ? (
          <div className="border border-white/10 bg-white/5 p-8 text-center">
            <Brain className="h-8 w-8 text-white/20 mx-auto mb-3" />
            <p className="font-body text-sm text-white/30">No approval history yet. Approve or reject agent actions to build memory.</p>
          </div>
        ) : (
          <div className="border border-white/10 bg-white/5 p-4">
            <div className="space-y-3">
              {prefs.map((p) => {
                const progress = Math.min((p.approved_count / p.threshold) * 100, 100);
                return (
                  <div key={p.id} className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-body text-xs font-bold text-white">{actionLabels[p.action_type] || p.action_type}</span>
                        {p.auto_approve && (
                          <span className="font-body text-[9px] px-1.5 py-0.5 bg-emerald-500/10 text-emerald-400 uppercase tracking-wider">Auto-approve</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-white/5 overflow-hidden">
                          <div className="h-full bg-flow-gold" style={{ width: `${progress}%` }} />
                        </div>
                        <span className="font-body text-[10px] text-white/30 shrink-0">
                          {p.approved_count}/{p.threshold} approvals
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-body text-[10px] text-white/20">{p.rejected_count} rejected</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AgentsPage() {
  const [tab, setTab] = useState<'logs' | 'approvals' | 'system' | 'settings'>('logs');
  const { data: approvalsData } = usePendingApprovals();
  const approvalsCount = approvalsData?.approvals?.length || 0;
  const runAgent = useRunAgent();
  const [runFeedback, setRunFeedback] = useState<{ agent: string; status: 'running' | 'ok' | 'error' } | null>(null);

  const handleRunAgent = (agentName: string) => {
    setRunFeedback({ agent: agentName, status: 'running' });
    runAgent.mutate(agentName, {
      onSuccess: () => {
        setRunFeedback({ agent: agentName, status: 'ok' });
        setTimeout(() => setRunFeedback(null), 3000);
      },
      onError: () => {
        setRunFeedback({ agent: agentName, status: 'error' });
        setTimeout(() => setRunFeedback(null), 3000);
      },
    });
  };

  const tabs = [
    { key: 'logs', label: 'Activity Log' },
    { key: 'approvals', label: 'Pending Approvals', count: approvalsCount },
    { key: 'system', label: 'System' },
    { key: 'settings', label: 'Settings' },
  ] as const;

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Autonomous Agents</h1>
          <p className="font-body text-white/40 mt-1">
            AI agents that monitor your finances 24/7 — running on autopilot
          </p>
        </div>

        <div className="flex items-center gap-1 border-b border-white/10 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-3 font-body text-sm whitespace-nowrap transition-colors ${
                tab === t.key ? 'text-flow-gold border-b-2 border-flow-gold' : 'text-white/40 hover:text-white/60'
              }`}
            >
              {t.label}
              {t.key === 'approvals' && t.count! > 0 && (
                <span className="ml-2 px-1.5 py-0.5 text-[9px] bg-blue-500/20 text-blue-400 rounded-full">
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {tab === 'logs' && <LogsTab />}
        {tab === 'approvals' && <ApprovalsTab />}
        {tab === 'system' && <SystemTab />}
        {tab === 'settings' && <SettingsTab />}

        {tab !== 'settings' && (
          <div className="border border-white/10 bg-white/5 p-6">
            <h3 className="font-body text-xs font-bold text-white/60 uppercase tracking-wider mb-3">About Your Agents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {([
                ['margin_guardian', 'Margin Guardian', TrendingUp, 'Runs daily at 9 AM. Monitors gross margin trends. Alerts when margin drops below threshold.'],
                ['category_suggester', 'Category Suggester', Search, 'Runs daily at 6 AM. Suggests category mappings for uncategorized transactions.'],
                ['inventory_replenishment', 'Inventory Replenishment', Package, 'Runs weekly on Sundays at 8 AM. Analyzes inventory health and recommends reorders.'],
                ['fee_audit', 'Fee Auditor', Receipt, 'Runs monthly on the 1st. Audits platform fees against known rate benchmarks.'],
              ] as const).map(([name, label, Icon, desc]) => {
                const fb = runFeedback?.agent === name ? runFeedback.status : null;
                return (
                  <div key={name} className="flex items-start gap-3">
                    <Icon className="h-4 w-4 text-flow-gold mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs font-bold text-white">{label}</p>
                      <p className="font-body text-[10px] text-white/30">{desc}</p>
                    </div>
                    <button
                      onClick={() => handleRunAgent(name)}
                      disabled={fb === 'running'}
                      className={`flex items-center gap-1.5 px-3 py-1.5 font-body text-[10px] font-bold uppercase tracking-wider transition-colors shrink-0 disabled:opacity-50 ${
                        fb === 'ok' ? 'bg-emerald-500/20 text-emerald-400' :
                        fb === 'error' ? 'bg-rose-500/20 text-rose-400' :
                        'bg-flow-gold/10 text-flow-gold hover:bg-flow-gold/20'
                      }`}
                    >
                      {fb === 'running' ? (
                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
                      ) : fb === 'ok' ? (
                        <CheckCircle2 className="h-3 w-3" />
                      ) : (
                        <Play className="h-3 w-3" />
                      )}
                      {fb === 'running' ? 'Running' : fb === 'ok' ? 'Done' : fb === 'error' ? 'Failed' : 'Run Now'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
