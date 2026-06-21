'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { spendApi, taxSuggestionApi } from '@/lib/api/users';

export function useSpendDecisions(limit = 20, offset = 0) {
  return useQuery({
    queryKey: ['spend-decisions', limit, offset],
    queryFn: () => spendApi.listDecisions(limit, offset),
  });
}

export function useSpendFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      decisionId,
      feedback,
      note,
    }: {
      decisionId: string;
      feedback: 'good' | 'bad';
      note?: string;
    }) => spendApi.submitFeedback(decisionId, feedback, note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spend-decisions'] });
    },
  });
}

export function useTaxSuggestion() {
  return useQuery({
    queryKey: ['tax-suggestion'],
    queryFn: taxSuggestionApi.getSuggestion,
  });
}
