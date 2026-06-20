'use client';

import { useState, useCallback } from 'react';
import { useConnections, useConnectPlatform, useSyncPlatform, useDisconnectPlatform } from '@/hooks/api/use-connections';
import { Link, RefreshCw, Unplug, ShoppingBag, Store, Package } from 'lucide-react';
import Nango from '@nangohq/frontend';

const platformIcons: Record<string, React.ReactNode> = {
  shopify: <ShoppingBag className="h-6 w-6" />,
  amazon: <Package className="h-6 w-6" />,
  woocommerce: <Store className="h-6 w-6" />,
};

const platformColors: Record<string, string> = {
  shopify: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  amazon: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  woocommerce: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
};

export default function ConnectionsPage() {
  const { data, isLoading } = useConnections();
  const connectMutation = useConnectPlatform();
  const syncMutation = useSyncPlatform();
  const disconnectMutation = useDisconnectPlatform();
  const [syncFeedback, setSyncFeedback] = useState<{ platform: string; status: 'syncing' | 'ok' | 'error' } | null>(null);
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);

  const connections = data?.connections || [];
  const platforms = data?.supported_platforms || {};

  const handleConnect = useCallback(async (platform: string) => {
    setConnectingPlatform(platform);
    try {
      const session = await connectMutation.mutateAsync(platform);

      const nango = new Nango({ connectSessionToken: session.session_token });
      nango.openConnectUI({
        onEvent: (event) => {
          if (event.type === 'close') {
            setConnectingPlatform(null);
          } else if (event.type === 'connect') {
            setConnectingPlatform(null);
          }
        },
      });
    } catch {
      setConnectingPlatform(null);
    }
  }, [connectMutation]);

  const handleSync = async (platform: string) => {
    setSyncFeedback({ platform, status: 'syncing' });
    try {
      await syncMutation.mutateAsync(platform);
      setSyncFeedback({ platform, status: 'ok' });
      setTimeout(() => setSyncFeedback(null), 3000);
    } catch {
      setSyncFeedback({ platform, status: 'error' });
      setTimeout(() => setSyncFeedback(null), 3000);
    }
  };

  const handleDisconnect = async (platform: string) => {
    if (!confirm(`Disconnect ${platform}? This won't delete your data.`)) return;
    disconnectMutation.mutate(platform);
  };

  return (
    <div className="px-6 md:px-16 py-12">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">Platform Connections</h1>
          <p className="font-body text-white/40 mt-1">
            Connect your stores to automatically sync orders and revenue data
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(platforms).map(([key, cfg]) => {
              const conn = connections.find((c) => c.platform === key);
              const fb = syncFeedback?.platform === key ? syncFeedback.status : null;

              return (
                <div key={key} className="border border-white/10 bg-white/5 p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-12 w-12 flex items-center justify-center border ${platformColors[key] || 'text-white/40 bg-white/5 border-white/10'}`}>
                      {platformIcons[key] || <Link className="h-6 w-6" />}
                    </div>
                    <div>
                      <h3 className="font-body text-sm font-bold text-white">{cfg.label}</h3>
                      <p className="font-body text-sm text-white/30 uppercase tracking-wider">
                        {conn ? conn.status : 'Not connected'}
                      </p>
                    </div>
                  </div>

                  {conn ? (
                    <div className="space-y-3">
                      {conn.store_name && (
                        <p className="font-body text-sm text-white/50">{conn.store_name}</p>
                      )}
                      {conn.last_synced_at && (
                        <p className="font-body text-xs text-white/30">
                          Last synced: {new Date(conn.last_synced_at).toLocaleString()}
                        </p>
                      )}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSync(key)}
                          disabled={fb === 'syncing'}
                          className={`flex items-center gap-1.5 px-4 py-2 font-body text-sm font-bold uppercase tracking-wider transition-colors disabled:opacity-50 ${
                            fb === 'ok' ? 'bg-emerald-500/20 text-emerald-400' :
                            fb === 'error' ? 'bg-rose-500/20 text-rose-400' :
                            'bg-flow-gold/10 text-flow-gold hover:bg-flow-gold/20'
                          }`}
                        >
                          {fb === 'syncing' ? (
                            <div className="h-3 w-3 animate-spin rounded-full border-2 border-flow-gold border-t-transparent" />
                          ) : (
                            <RefreshCw className="h-3 w-3" />
                          )}
                          {fb === 'syncing' ? 'Syncing...' : fb === 'ok' ? 'Synced' : fb === 'error' ? 'Failed' : 'Sync Now'}
                        </button>
                        <button
                          onClick={() => handleDisconnect(key)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-white/5 text-white/40 font-body text-sm font-bold uppercase tracking-wider hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                        >
                          <Unplug className="h-3 w-3" />
                          Disconnect
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleConnect(key)}
                      disabled={connectingPlatform !== null}
                      className="w-full px-4 py-3 bg-flow-gold text-black font-body text-sm font-bold uppercase tracking-wider hover:bg-flow-gold/90 transition-colors disabled:opacity-50"
                    >
                      {connectingPlatform === key ? 'Connecting...' : `Connect ${cfg.label}`}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="border border-white/10 bg-white/5 p-6">
          <h3 className="font-body text-xs font-bold text-white/60 uppercase tracking-wider mb-3">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <span className="font-mono text-lg font-bold text-flow-gold">1</span>
              <div>
                <p className="font-body text-xs font-bold text-white">Connect your store</p>
                <p className="font-body text-xs text-white/30">OAuth flow via Nango — we never see your password</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-lg font-bold text-flow-gold">2</span>
              <div>
                <p className="font-body text-xs font-bold text-white">Sync orders</p>
                <p className="font-body text-xs text-white/30">Pulls last 50 orders into your transaction feed</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="font-mono text-lg font-bold text-flow-gold">3</span>
              <div>
                <p className="font-body text-xs font-bold text-white">Agents analyze</p>
                <p className="font-body text-xs text-white/30">Margin, fees, inventory — all automatically computed from real data</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
