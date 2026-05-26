'use client';

import { useDashboard } from '@/hooks/api/use-dashboard';

function AlertIcon({ icon }: { icon?: string }) {
  const name = icon && ['warning', 'error', 'info', 'trending_up', 'event', 'analytics'].includes(icon) ? icon : 'info';
  return <span className="material-symbols-outlined text-xl">{name}</span>;
}

export default function AlertsPage() {
  const { data, isLoading } = useDashboard();
  const dash: any = data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
      </div>
    );
  }

  if (!dash) {
    return (
      <div className="px-6 md:px-16 py-12">
        <p className="text-white/40 font-body">No alerts available. Connect your accounts first.</p>
      </div>
    );
  }

  const alerts = dash.active_alerts || [];

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Financial Alerts</h1>
          <p className="font-body text-white/40 mt-1">
            Real-time monitoring and risk assessment for your startup
          </p>
        </div>

        {alerts.length === 0 ? (
          <div className="border border-white/10 bg-white/5 p-12 text-center">
            <p className="font-body text-white/40">No active alerts. Your finances are in good shape.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {alerts.map((alert: any, i: number) => {
              const borderColor = alert.type === 'critical' ? 'border-rose-500/30 bg-rose-500/5'
                : alert.type === 'warning' ? 'border-amber-500/30 bg-amber-500/5'
                : 'border-flow-gold/30 bg-flow-gold/5';
              const iconColor = alert.type === 'critical' ? 'text-rose-400'
                : alert.type === 'warning' ? 'text-amber-400'
                : 'text-flow-gold';
              return (
                <div key={i} className={`border ${borderColor} p-6 flex items-start gap-4`}>
                  <div className={`shrink-0 ${iconColor}`}>
                    <AlertIcon icon={alert.icon} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body text-sm font-bold text-white">{alert.message}</h3>
                    {alert.details && (
                      <p className="font-body text-sm text-white/50 mt-1">{alert.details}</p>
                    )}
                  </div>
                  {alert.type === 'critical' && (
                    <span className="shrink-0 flow-label text-[9px] text-rose-400 bg-rose-500/10 px-2 py-1 uppercase tracking-wider">Critical</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {dash.runway_months != null && (
          <div className="border border-white/10 bg-white/5 p-8">
            <h2 className="flow-label text-[10px] text-white/40 tracking-widest mb-3">RUNWAY STATUS</h2>
            <div className="flex items-center gap-6">
              <div>
                <p className="font-mono text-3xl font-bold text-white">{dash.runway_months}m</p>
                <p className="font-body text-xs text-white/40 mt-1">Runway remaining</p>
              </div>
              <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    dash.runway_months >= 12 ? 'bg-emerald-400' : dash.runway_months >= 6 ? 'bg-amber-400' : 'bg-rose-400'
                  }`}
                  style={{ width: `${Math.min((dash.runway_months / 24) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
