import { apiClient } from '../api-client';

export interface PlatformConnection {
  id: string;
  platform: 'shopify' | 'amazon' | 'woocommerce';
  store_name: string | null;
  store_url: string | null;
  status: string;
  last_synced_at: string | null;
  created_at: string | null;
}

export interface ConnectionsResponse {
  connections: PlatformConnection[];
  supported_platforms: Record<string, { label: string; integration_id: string }>;
}

export interface ConnectSessionResponse {
  session_token: string;
  platform: string;
  is_reconnect: boolean;
}

export interface SyncResult {
  platform: string;
  orders_fetched: number;
  transactions_created: number;
}

export const connectionsApi = {
  list: () => apiClient<ConnectionsResponse>('/api/v1/connections'),

  createConnectSession: (platform: string) =>
    apiClient<ConnectSessionResponse>('/api/v1/connections/connect-session', {
      method: 'POST',
      body: { platform },
    }),

  sync: (platform: string) =>
    apiClient<SyncResult>(`/api/v1/connections/${platform}/sync`, {
      method: 'POST',
    }),

  disconnect: (platform: string) =>
    apiClient<{ ok: boolean; message: string }>(`/api/v1/connections/${platform}`, {
      method: 'DELETE',
    }),
};
