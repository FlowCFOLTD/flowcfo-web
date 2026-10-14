'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invoiceApi, insightsApi } from '@/lib/api/users';

export function useInvoices(opts?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['invoices', 'list'],
    queryFn: invoiceApi.list,
    enabled: opts?.enabled ?? true,
    retry: false,
  });
}

export function useAging(opts?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['invoices', 'aging'],
    queryFn: invoiceApi.aging,
    enabled: opts?.enabled ?? true,
    retry: false,
  });
}

export function useOpex(opts?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['insights', 'opex'],
    queryFn: insightsApi.opex,
    enabled: opts?.enabled ?? true,
    retry: false,
  });
}

export function useRisk(opts?: { enabled?: boolean }) {
  return useQuery({
    queryKey: ['insights', 'risk'],
    queryFn: insightsApi.risk,
    enabled: opts?.enabled ?? true,
    retry: false,
  });
}

export function useCreateInvoice() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: invoiceApi.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
}

export function useMarkInvoicePaid() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: invoiceApi.markPaid,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
}
