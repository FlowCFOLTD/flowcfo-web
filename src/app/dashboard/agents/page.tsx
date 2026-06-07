'use client';

import { useState } from 'react';
import { useAgentLogs, usePendingApprovals, useApproveAction, useRejectAction } from '@/hooks/api/use-agent';
import { CheckCircle2, XCircle, Clock, AlertTriangle, Info, TrendingUp, Package, Search, Receipt, ShieldCheck } from 'lucide-react';

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

export default function AgentsPage() {
  const [tab, setTab] = useState<'logs' | 'approvals'>('logs');
  const { data: approvalsData } = usePendingApprovals();
  const approvalsCount = approvalsData?.approvals?.length || 0;

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Autonomous Agents</h1>
          <p className="font-body text-white/40 mt-1">
            AI agents that monitor your finances 24/7 — running on autopilot
          </p>
        </div>

        <div className="flex items-center gap-1 border-b border-white/10">
          <button
            onClick={() => setTab('logs')}
            className={`px-5 py-3 font-body text-sm transition-colors ${
              tab === 'logs' ? 'text-flow-gold border-b-2 border-flow-gold' : 'text-white/40 hover:text-white/60'
            }`}
          >
            Activity Log
          </button>
          <button
            onClick={() => setTab('approvals')}
            className={`px-5 py-3 font-body text-sm transition-colors ${
              tab === 'approvals' ? 'text-flow-gold border-b-2 border-flow-gold' : 'text-white/40 hover:text-white/60'
            }`}
          >
            Pending Approvals
            {approvalsCount > 0 && (
              <span className="ml-2 px-1.5 py-0.5 text-[9px] bg-blue-500/20 text-blue-400 rounded-full">
                {approvalsCount}
              </span>
            )}
          </button>
        </div>

        {tab === 'logs' ? <LogsTab /> : <ApprovalsTab />}

        <div className="border border-white/10 bg-white/5 p-6">
          <h3 className="font-body text-xs font-bold text-white/60 uppercase tracking-wider mb-3">About Your Agents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-4 w-4 text-flow-gold mt-0.5" />
              <div>
                <p className="font-body text-xs font-bold text-white">Margin Guardian</p>
                <p className="font-body text-[10px] text-white/30">Runs daily at 9 AM. Monitors gross margin trends. Alerts when margin drops below threshold.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Search className="h-4 w-4 text-flow-gold mt-0.5" />
              <div>
                <p className="font-body text-xs font-bold text-white">Category Suggester</p>
                <p className="font-body text-[10px] text-white/30">Runs daily at 6 AM. Suggests category mappings for uncategorized transactions.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Package className="h-4 w-4 text-flow-gold mt-0.5" />
              <div>
                <p className="font-body text-xs font-bold text-white">Inventory Replenishment</p>
                <p className="font-body text-[10px] text-white/30">Runs weekly on Sundays at 8 AM. Analyzes inventory health and recommends reorders.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Receipt className="h-4 w-4 text-flow-gold mt-0.5" />
              <div>
                <p className="font-body text-xs font-bold text-white">Fee Auditor</p>
                <p className="font-body text-[10px] text-white/30">Runs monthly on the 1st. Audits platform fees against known rate benchmarks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
