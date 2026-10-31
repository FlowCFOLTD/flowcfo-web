import { authClient } from '@/lib/auth-client';
import { apiClientAtBase } from '@/lib/api-client';

const rawBase = process.env.NEXT_PUBLIC_PRODUCT_API_URL || 'http://localhost:8001';
const PRODUCT_API_BASE = rawBase.startsWith('http://') || rawBase.startsWith('https://')
  ? rawBase.replace(/\/$/, '')
  : `http://${rawBase.replace(/\/$/, '')}`;

type Page<T> = { data: T[] };
export type ProductWorkspace = { id: string; name: string; workspace_type: 'personal' | 'business'; base_currency: string };
export type ProductAccount = { id: string; name: string; currency: string; current_balance: string | null; available_balance: string | null };
export type ProductCommitment = { id: string; name: string; direction: 'inflow' | 'outflow'; amount: string; currency: string; due_on: string; state: string };
export type ProductAlert = { id: string; rule_key: string; severity: string; title: string; message: string; evidence: Record<string, unknown>; triggered_at: string };
export type ProductOfferMatch = { offer_id: string; type: string; provider: string; name: string; description: string; reason: string; matching_exposure_currencies: string[]; requires_provider_assessment: boolean };
export type ProductLedgerEntry = { id: string; direction: 'inflow' | 'outflow'; amount: string; currency: string; occurred_on: string; description: string; category: string | null; event_kind: string };
export type ProductOverview = {
  as_of: string;
  currency: string;
  observed: { posted_external_entry_count: number; cash_inflows: number; cash_outflows: number; net_cash_movement: number };
  data_quality: { history_days_observed: number; confidence: string; forecast_model: string; forecast_model_transactions: number; balance_confidence: string };
  commitments: { open_count: number; inflows: number; outflows: number; items: ProductCommitment[] };
  cash_outlook: { status: string; method: string; horizon_days: number; confidence: string; current_balance: number | null; projected_end_balance: number | null; lowest_projected_balance: number | null; liquidity_gap_date: string | null; points: Array<{ date: string; projected_balance: number | null; projected_net_change: number; known_commitment_flow: number }>; historical_backtest: Record<string, unknown>; limitations: string[] };
  guidance: { actions: Array<{ priority: string; action: string; reason: string }> };
};
export type ProductSpending = {
  category_spend: Array<{ category: string; amount: number; gross_spend?: number; linked_refunds?: number; net_spend?: number }>;
  budgets: Array<{ budget_id: string; category: string; limit: number; spent: number; status: string; period: string; currency: string }>;
  recommendations: Array<{ type: string; priority: string; category?: string; message: string }>;
  data_quality: Record<string, unknown>;
};
export type ProductGuidance = {
  as_of: string; currency: string;
  actions: Array<{ priority: string; action: string; reason: string; evidence?: Record<string, unknown> }>;
  cash_outlook: ProductOverview['cash_outlook'];
  guidance_boundary: string;
};
export type ProductDemoResult = {
  workspace: ProductWorkspace;
  account: ProductAccount;
  overview: ProductOverview;
  spending: ProductSpending;
  guidance: ProductGuidance;
  alerts: ProductAlert[];
  offers: ProductOfferMatch[];
  entries: ProductLedgerEntry[];
  elapsedMs: number;
};

async function request<T>(path: string, options: Omit<RequestInit, 'body'> & { body?: unknown } = {}): Promise<T> {
  const { body, ...config } = options;
  return apiClientAtBase<T>(PRODUCT_API_BASE, `/api/v2${path}`, { ...config, body });
}

const isoDay = (day: Date) => `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
const dateDaysAgo = (days: number) => { const date = new Date(); date.setDate(date.getDate() - days); return isoDay(date); };
const dateInDays = (days: number) => { const date = new Date(); date.setDate(date.getDate() + days); return isoDay(date); };
const money = (value: number) => value.toFixed(2);
const csvCell = (value: string) => `"${value.replaceAll('"', '""')}"`;

function scenarioCsv(scenario: 'consumer' | 'business') {
  const rows = ['date,amount,direction,description,category,currency,event_kind,reference'];
  if (scenario === 'consumer') {
    for (let ago = 59; ago >= 0; ago -= 3) {
      const day = dateDaysAgo(ago);
      const cycle = Math.floor((59 - ago) / 3);
      const category = ['Groceries', 'Dining', 'Transport', 'Dining', 'Utilities'][cycle % 5];
      const amount = category === 'Dining' ? 82 + (cycle % 3) * 12 : category === 'Groceries' ? 115 : category === 'Transport' ? 54 : 68;
      rows.push([day, money(amount), 'debit', `${category} purchase`, category, 'MYR', 'operating', `consumer-${day}-${cycle}`].map(csvCell).join(','));
      if (ago % 14 === 0) rows.push([day, '4200.00', 'credit', 'Salary payment', 'Income', 'MYR', 'operating', `salary-${day}`].map(csvCell).join(','));
    }
    for (const [offset, amount, label] of [[6, 1800, 'Rent'], [36, 1800, 'Rent']] as const) {
      const day = dateDaysAgo(offset);
      rows.push([day, money(amount), 'debit', label, 'Housing', 'MYR', 'operating', `rent-${day}`].map(csvCell).join(','));
    }
  } else {
    for (let ago = 57; ago >= 0; ago -= 3) {
      const day = dateDaysAgo(ago);
      const cycle = Math.floor((57 - ago) / 3);
      const olderPeriod = ago >= 30;
      const inflow = olderPeriod ? 11800 : 7600;
      const outflow = olderPeriod ? 8800 : 9700;
      rows.push([day, money(inflow), 'credit', 'Customer settlement', 'Sales', 'MYR', 'operating', `business-in-${day}-${cycle}`].map(csvCell).join(','));
      rows.push([day, money(outflow), 'debit', cycle % 2 ? 'Supplier payment' : 'Payroll and operating costs', cycle % 2 ? 'Suppliers' : 'Payroll', 'MYR', 'operating', `business-out-${day}-${cycle}`].map(csvCell).join(','));
    }
  }
  return rows.join('\n');
}

async function ensureWorkspace(scenario: 'consumer' | 'business') {
  const kind = scenario === 'consumer' ? 'personal' : 'business';
  const today = isoDay(new Date());
  const workspaceName = `FlowCFO demo ${scenario} ${today}`;
  const list = await request<Page<ProductWorkspace>>('/workspaces');
  let workspace = list.data.find((item) => item.name === workspaceName && item.workspace_type === kind);
  if (!workspace) {
    workspace = await request<ProductWorkspace>('/workspaces', {
      method: 'POST', body: { name: workspaceName, workspace_type: kind, base_currency: 'MYR', timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC' },
    });
  }

  let accounts = (await request<Page<ProductAccount>>(`/workspaces/${workspace.id}/accounts`)).data;
  let account = accounts.find((item) => item.name === 'Demonstration cash account' && item.currency === 'MYR');
  if (!account) {
    account = await request<ProductAccount>(`/workspaces/${workspace.id}/accounts`, {
      method: 'POST', body: { name: 'Demonstration cash account', account_type: 'checking', provider: 'synthetic_demo', external_ref: 'primary-myr', currency: 'MYR', current_balance: scenario === 'consumer' ? '9200.00' : '42000.00', available_balance: scenario === 'consumer' ? '9200.00' : '42000.00', balance_as_of: new Date().toISOString() },
    });
    accounts = [...accounts, account];
  }
  if (scenario === 'business' && !accounts.some((item) => item.name === 'Demonstration USD exposure')) {
    const fx = await request<ProductAccount>(`/workspaces/${workspace.id}/accounts`, {
      method: 'POST', body: { name: 'Demonstration USD exposure', account_type: 'depository', provider: 'synthetic_demo', external_ref: 'foreign-usd', currency: 'USD', current_balance: '8500.00', available_balance: '8500.00', balance_as_of: new Date().toISOString() },
    });
    accounts = [...accounts, fx];
  }

  const entries = await request<Page<ProductLedgerEntry>>(`/workspaces/${workspace.id}/ledger-entries?from_date=${dateDaysAgo(70)}&to_date=${isoDay(new Date())}&limit=200`);
  if (entries.data.length === 0) {
    await request(`/workspaces/${workspace.id}/imports/statement?account_id=${account.id}&filename=flowcfo-synthetic-demo-${scenario}.csv`, {
      method: 'POST', headers: { 'Content-Type': 'text/csv' },
      body: new Blob([scenarioCsv(scenario)], { type: 'text/csv' }),
    });
  }

  const budgets = await request<Page<{ category: string }>>(`/workspaces/${workspace.id}/budgets`);
  if (scenario === 'consumer' && !budgets.data.some((item) => item.category.toLowerCase() === 'dining')) {
    await request(`/workspaces/${workspace.id}/budgets`, { method: 'POST', body: { name: 'Dining plan', category: 'Dining', currency: 'MYR', limit_amount: '300.00', period: 'monthly' } });
  }
  const commitments = await request<Page<ProductCommitment>>(`/workspaces/${workspace.id}/commitments?limit=200`);
  const required = scenario === 'consumer'
    ? [{ name: 'Motor insurance', amount: '980.00', days: 6 }, { name: 'Education instalment', amount: '650.00', days: 13 }, { name: 'Home internet', amount: '139.00', days: 20 }]
    : [{ name: 'Payroll', amount: '14500.00', days: 5 }, { name: 'Supplier batch', amount: '13200.00', days: 9 }, { name: 'Tax instalment', amount: '6800.00', days: 23 }, { name: 'Term loan repayment', amount: '17000.00', days: 17 }, { name: 'USD supplier invoice', amount: '8500.00', days: 19, currency: 'USD' }];
  for (const item of required) {
    if (!commitments.data.some((existing) => existing.name === item.name)) {
      await request(`/workspaces/${workspace.id}/commitments`, { method: 'POST', body: {
        name: item.name, direction: 'outflow', amount: item.amount, currency: 'currency' in item ? item.currency : 'MYR', due_on: dateInDays(item.days), source: 'synthetic_demo', counterparty: 'Fictional demonstration counterparty',
      } });
    }
  }
  const previousMatches = await request<{ recommendations: ProductOfferMatch[] }>(`/workspaces/${workspace.id}/recommendations/products`);
  const catalogs = scenario === 'consumer'
    ? [{ offer_type: 'banking', provider_name: 'Demonstration catalogue', name: 'Spending account review', description: 'Illustrative bank account catalogue entry for category-spend matching.', target_categories: ['Dining'], supported_currencies: ['MYR'] }]
    : [
        { offer_type: 'financing', provider_name: 'Demonstration catalogue', name: 'Working-capital discussion', description: 'Route a recorded projected cash gap for a provider eligibility assessment.', target_categories: [], supported_currencies: ['MYR'], minimum_cash_gap: '1.00' },
        { offer_type: 'fx', provider_name: 'Demonstration catalogue', name: 'FX exposure review', description: 'Review recorded foreign-currency exposure with a qualified treasury provider; no live-rate signal is supplied.', target_categories: [], supported_currencies: ['USD'] },
      ];
  for (const offer of catalogs) {
    if (!previousMatches.recommendations.some((item) => item.name === offer.name)) {
      await request(`/workspaces/${workspace.id}/offers`, { method: 'POST', body: offer });
    }
  }
  return { workspace, account };
}

export const productDemoApi = {
  async runScenario(scenario: 'consumer' | 'business'): Promise<ProductDemoResult> {
    const started = performance.now();
    const { workspace, account } = await ensureWorkspace(scenario);
    await request(`/workspaces/${workspace.id}/alerts/evaluate`, { method: 'POST' });
    const asOf = isoDay(new Date());
    const queryAsOf = `as_of=${asOf}`;
    const [overview, spending, guidance, alerts, offers, entries] = await Promise.all([
      request<ProductOverview>(`/workspaces/${workspace.id}/insights/overview?${queryAsOf}&horizon_days=60`),
      request<ProductSpending>(`/workspaces/${workspace.id}/insights/spending?${queryAsOf}`),
      request<ProductGuidance>(`/workspaces/${workspace.id}/insights/guidance?${queryAsOf}&horizon_days=60`),
      request<Page<ProductAlert>>(`/workspaces/${workspace.id}/alerts?state=active&limit=100`),
      request<{ recommendations: ProductOfferMatch[] }>(`/workspaces/${workspace.id}/recommendations/products`),
      request<Page<ProductLedgerEntry>>(`/workspaces/${workspace.id}/ledger-entries?from_date=${dateDaysAgo(60)}&to_date=${asOf}&limit=200`),
    ]);
    return { workspace, account, overview, spending, guidance, alerts: alerts.data, offers: offers.recommendations, entries: entries.data, elapsedMs: Math.round(performance.now() - started) };
  },
  listWorkspaces: () => request<Page<ProductWorkspace>>('/workspaces'),
  listAccounts: (workspaceId: string) => request<Page<ProductAccount>>(`/workspaces/${workspaceId}/accounts`),
  async createIngestionWorkspace(scenario: 'consumer' | 'business', currency: string) {
    const suffix = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
    const workspace = await request<ProductWorkspace>('/workspaces', { method: 'POST', body: {
      name: `FlowCFO ingestion ${scenario} ${isoDay(new Date())} ${suffix}`,
      workspace_type: scenario === 'consumer' ? 'personal' : 'business',
      base_currency: currency,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    } });
    const account = await request<ProductAccount>(`/workspaces/${workspace.id}/accounts`, { method: 'POST', body: {
      name: `Document review account (${currency})`, account_type: 'checking', provider: 'synthetic_demo',
      external_ref: `document-review-${suffix}`, currency,
    } });
    return { workspace, account };
  },
  createAccount: (workspaceId: string, currency: string, externalRef: string) => request<ProductAccount>(`/workspaces/${workspaceId}/accounts`, { method: 'POST', body: {
    name: `Demonstration ${currency} statement account`, account_type: 'checking', provider: 'synthetic_demo', external_ref: externalRef, currency,
  } }),
  uploadStatement: (workspaceId: string, accountId: string, file: File) => request(`/workspaces/${workspaceId}/imports/statement?account_id=${accountId}&filename=${encodeURIComponent(file.name)}`, {
    method: 'POST', headers: { 'Content-Type': file.type || 'application/octet-stream' }, body: file,
  }),
  uploadDocument: (workspaceId: string, kind: 'invoice' | 'receipt', file: File) => request<Record<string, unknown>>(`/workspaces/${workspaceId}/documents?document_kind=${kind}&filename=${encodeURIComponent(file.name)}`, {
    method: 'POST', headers: { 'Content-Type': file.type || 'application/octet-stream' }, body: file,
  }),
  listDocuments: (workspaceId: string) => request<Page<Record<string, unknown>>>(`/workspaces/${workspaceId}/documents?limit=50`),
  reviewDocument: (workspaceId: string, documentId: string, decision: Record<string, unknown>) => request<Record<string, unknown>>(`/workspaces/${workspaceId}/documents/${documentId}/review`, { method: 'POST', body: decision }),
  deleteDocumentContent: (workspaceId: string, documentId: string) => request<Record<string, unknown>>(`/workspaces/${workspaceId}/documents/${documentId}`, { method: 'DELETE' }),
  addNotificationDestination: (workspaceId: string, email: string) => request<{ id: string; address: string; message: string }>(`/workspaces/${workspaceId}/notification-destinations?address=${encodeURIComponent(email)}`, { method: 'POST' }),
  verifyNotificationDestination: (workspaceId: string, destinationId: string, code: string) => request(`/workspaces/${workspaceId}/notification-destinations/${destinationId}/verify?code=${encodeURIComponent(code)}`, { method: 'POST' }),
  evaluateAlerts: (workspaceId: string) => request<{ candidate_count: number; new_alert_count: number; alerts: ProductAlert[] }>(`/workspaces/${workspaceId}/alerts/evaluate`, { method: 'POST' }),
  listAlerts: (workspaceId: string) => request<Page<ProductAlert>>(`/workspaces/${workspaceId}/alerts?state=active&limit=100`),
  async sessionReady() {
    if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined'
      && new URLSearchParams(window.location.search).get('preview') === '1'
      && process.env.NEXT_PUBLIC_PITCH_TEST_BEARER) return;
    const { data, error } = await authClient.getSession();
    if (error || !data?.session?.token) throw new Error('Your admin session is no longer available. Sign in again, then reopen the pitch page.');
  },
};
