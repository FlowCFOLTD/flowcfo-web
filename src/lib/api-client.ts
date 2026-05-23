import { authClient } from './auth-client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

async function getAuthToken() {
  const { data: sessionData } = await authClient.getSession();
  return sessionData?.session?.token;
}

export async function apiClient<T>(
  endpoint: string,
  {
    body,
    ...customConfig
  }: Omit<RequestInit, 'body'> & { body?: unknown } = {},
): Promise<T> {
  const token = await getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (response.ok) {
    return (await response.json()) as T;
  } else {
    const errorData = await response.json().catch(() => ({}));
    const error: ApiError = new Error(
      errorData.message || 'An error occurred while fetching the data.',
    );
    error.status = response.status;
    error.data = errorData;
    throw error;
  }
}
