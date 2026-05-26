'use client';

import { useQuery } from '@tanstack/react-query';
import { transactionsApi } from '@/lib/api/transactions';

export function useTransactions(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ['transactions', page, pageSize],
    queryFn: () => transactionsApi.list({ page, page_size: pageSize }),
    retry: false,
  });
}
