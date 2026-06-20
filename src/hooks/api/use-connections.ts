'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { connectionsApi } from '@/lib/api/connections';

export function useConnections() {
  return useQuery({
    queryKey: ['connections'],
    queryFn: connectionsApi.list,
    retry: false,
  });
}

export function useConnectPlatform() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (platform: string) => connectionsApi.createConnectSession(platform),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['connections'] }),
  });
}

export function useSyncPlatform() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (platform: string) => connectionsApi.sync(platform),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['connections'] }),
  });
}

export function useDisconnectPlatform() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (platform: string) => connectionsApi.disconnect(platform),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['connections'] }),
  });
}
