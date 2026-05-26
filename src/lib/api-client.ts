import { authClient } from './auth-client';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

let cachedToken: string | null = null;
let tokenPromise: Promise<string | null> | null = null;

async function refreshToken(): Promise<string | null> {
  try {
    const { data: sessionData } = await authClient.getSession();
    cachedToken = sessionData?.session?.token ?? null;
    return cachedToken;
  } catch {
    cachedToken = null;
    return null;
  } finally {
    tokenPromise = null;
  }
}

function getAuthToken(): Promise<string | null> {
  if (cachedToken) return Promise.resolve(cachedToken);
  if (tokenPromise) return tokenPromise;
  tokenPromise = refreshToken();
  return tokenPromise;
}

export async function apiClient<T>(
  endpoint: string,
  {
    body,
    ...customConfig
  }: Omit<RequestInit, 'body'> & { body?: unknown } = {},
): Promise<T> {
  const token = await getAuthToken();
  const isFormData = body instanceof FormData;
  const headers: HeadersInit = isFormData ? {} : { 'Content-Type': 'application/json' };

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
    config.body = isFormData ? body : JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (response.ok) {
    return (await response.json()) as T;
  }

  if (response.status === 401) {
    cachedToken = null;
    const freshToken = await refreshToken();
    if (freshToken) {
      headers.Authorization = `Bearer ${freshToken}`;
      config.headers = headers;
      const retry = await fetch(`${API_BASE_URL}${endpoint}`, config);
      if (retry.ok) return (await retry.json()) as T;
    }
  }

  const errorData = await response.json().catch(() => ({}));
  const error: ApiError = new Error(
    errorData.message || 'An error occurred while fetching the data.',
  );
  error.status = response.status;
  error.data = errorData;
  throw error;
}
