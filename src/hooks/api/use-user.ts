'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersApi, UserProfile } from '@/lib/api/users';

export function useUser() {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: usersApi.getMe,
    retry: false,
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UserProfile>) => usersApi.updateMe(data),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['user', 'me'], updatedUser);
    },
  });
}
