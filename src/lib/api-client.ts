import { authClient } from './auth-client';

const rawUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
export const API_BASE_URL =
  rawUrl.startsWith('http://') || rawUrl.startsWith('https://')
    ? rawUrl
    : `http://${rawUrl}`;

export interface ApiError extends Error {
  status?: number;
  data?: unknown;
}

function apiErrorMessage(value: unknown): string | undefined {
  if (typeof value === 'string' && value.trim()) return value.trim();
  if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const record = value as Record<string, unknown>;
  for (const key of ['message', 'detail', 'error']) {
    const message = apiErrorMessage(record[key]);
    if (message) return message;
  }
  return undefined;
}

let cachedToken: string | null = null;
let tokenPromise: Promise<string | null> | null = null;

function localPitchPreviewToken(): string | null {
  if (process.env.NODE_ENV === 'production' || typeof window === 'undefined') return null;
  if (new URLSearchParams(window.location.search).get('preview') !== '1') return null;
  return process.env.NEXT_PUBLIC_PITCH_TEST_BEARER || null;
}

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

export async function apiClientAtBase<T>(
  baseUrl: string,
  endpoint: string,
  {
    body,
    ...customConfig
  }: Omit<RequestInit, 'body'> & { body?: unknown } = {},
): Promise<T> {
  const token = localPitchPreviewToken() ?? await getAuthToken();
  const isFormData = body instanceof FormData;
  const isRawBody = typeof body === 'string' || body instanceof Blob || body instanceof ArrayBuffer;
  const headers: HeadersInit = isFormData || isRawBody ? {} : { 'Content-Type': 'application/json' };

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
    config.body = isFormData || isRawBody ? body as BodyInit : JSON.stringify(body);
  }

  const response = await fetch(`${baseUrl}${endpoint}`, config);

  if (response.ok) {
    return (await response.json()) as T;
  }

  if (response.status === 401) {
    cachedToken = null;
    const freshToken = await refreshToken();
    if (freshToken) {
      headers.Authorization = `Bearer ${freshToken}`;
      config.headers = headers;
      const retry = await fetch(`${baseUrl}${endpoint}`, config);
      if (retry.ok) return (await retry.json()) as T;
    }
  }

  const errorData = await response.json().catch(() => ({}));
  const errorMessage = apiErrorMessage(errorData);
  const error: ApiError = new Error(
    errorMessage || 'An error occurred while fetching the data.',
  );
  error.status = response.status;
  error.data = errorData;
  throw error;
}

export function apiClient<T>(
  endpoint: string,
  options: Omit<RequestInit, 'body'> & { body?: unknown } = {},
): Promise<T> {
  return apiClientAtBase(API_BASE_URL, endpoint, options);
}
