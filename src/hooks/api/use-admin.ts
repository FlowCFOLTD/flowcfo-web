'use client';

import { useQuery } from '@tanstack/react-query';
import { adminApi, AdminDashboardData } from '@/lib/api/users';

export function useAdminDashboard() {
  return useQuery({
    queryKey: ['admin', 'dashboard'],
    queryFn: adminApi.getDashboard,
  });
}

export function useAdminWaitlist() {
  return useQuery({
    queryKey: ['admin', 'waitlist'],
    queryFn: adminApi.getWaitlist,
  });
}

export function useAdminContacts() {
  return useQuery({
    queryKey: ['admin', 'contacts'],
    queryFn: adminApi.getContacts,
  });
}

export function useAdminUsers() {
  return useQuery({
    queryKey: ['admin', 'users'],
    queryFn: adminApi.getUsers,
  });
}

export function useAdminEvents(limit?: number, event_type?: string) {
  return useQuery({
    queryKey: ['admin', 'events', limit, event_type],
    queryFn: () => adminApi.getEvents(limit, event_type),
  });
}
