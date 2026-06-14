'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { adminApi, blogApi } from '@/lib/api/users';
import type {
  BlogSettingsData,
  BlogPostSummary,
  BlogGenerationLogEntry,
} from '@/lib/api/users';
import {
  Users,
  Mail,
  ListTodo,
  BarChart3,
  Activity,
  LogOut,
  TrendingUp,
  UserPlus,
  MessageSquare,
  ChevronRight,
  Loader2,
  FileText,
  Plus,
  Send,
  CheckCircle,
  XCircle,
  Archive,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

import { DataTable } from '@/components/admin/data-table';

interface HealthData {
  database: string;
  timestamp: string;
  user_count: number;
  waitlist_count: number;
  version: string;
}

interface DashboardStats {
  total_waitlist: number;
  total_contacts: number;
  total_users: number;
  users_by_business_type: Record<string, number>;
  waitlist_by_business_type: Record<string, number>;
  signups_last_7_days: number;
  logins_last_7_days: number;
}

interface WaitlistEntry {
  id: string;
  email: string;
  full_name: string;
  business_type: string;
  challenge: string;
  referral_source: string;
  ip_address: string;
  created_at: string;
}

interface ContactEntry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  ip_address: string;
  created_at: string;
}

interface UserEntry {
  id: string;
  email: string;
  full_name: string;
  business_type: string;
  plan: string;
  onboarding_completed: boolean;
  onboarding_step: string;
  approved: boolean;
  approval_requested: boolean;
  created_at: string;
}

interface AnalyticsEvent {
  id: string;
  user_id: string | null;
  event_type: string;
  ip_address: string;
  user_agent: string;
  country: string | null;
  metadata: {
    path: string;
    method: string;
    status: number;
  };
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [users, setUsers] = useState<UserEntry[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [health, setHealth] = useState<HealthData | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [blogSubTab, setBlogSubTab] = useState<'posts' | 'settings' | 'generate'>('posts');
  const [blogPosts, setBlogPosts] = useState<BlogPostSummary[]>([]);
  const [blogTotal, setBlogTotal] = useState(0);
  const [blogSettings, setBlogSettings] = useState<BlogSettingsData | null>(null);
  const [blogLogs, setBlogLogs] = useState<BlogGenerationLogEntry[]>([]);
  const [blogTopic, setBlogTopic] = useState('');
  const [generateStatus, setGenerateStatus] = useState<string | null>(null);
  const [settingsDirty, setSettingsDirty] = useState(false);

  const [activeTab, setActiveTab] = useState<
    'overview' | 'waitlist' | 'contacts' | 'users' | 'events' | 'health' | 'blog'
  >('overview');
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const { data: sessionData, error } = await authClient.getSession();
      if (error || !sessionData?.user) {
        router.push('/admin/login');
        return;
      }

      try {
        await adminApi.getMe();
      } catch {
        router.push('/admin/login');
        return;
      }

      try {
        const data = await adminApi.getDashboard();
        setStats(data);
      } catch {
        router.push('/admin/login');
      }
      setIsLoading(false);
    };

    init();
  }, [router]);

  useEffect(() => {
    if (activeTab === 'overview' || isLoading) return;

    const loadTabData = async () => {
      setIsDataLoading(true);
      try {
        let data: unknown;
        if (activeTab === 'waitlist') data = await adminApi.getWaitlist();
        else if (activeTab === 'contacts') data = await adminApi.getContacts();
        else if (activeTab === 'users') data = await adminApi.getUsers();
        else if (activeTab === 'events') data = await adminApi.getEvents(100);
        else if (activeTab === 'health') data = await adminApi.getHealth();
        else if (activeTab === 'blog') {
          const [postsRes, settings, logs] = await Promise.all([
            blogApi.getPosts(),
            blogApi.getSettings(),
            blogApi.getLogs(),
          ]);
          setBlogPosts(postsRes.posts);
          setBlogTotal(postsRes.total);
          setBlogSettings(settings);
          setBlogLogs(logs);
          data = true;
        }
        if (data) {
          if (activeTab === 'waitlist') setWaitlist(data as WaitlistEntry[]);
          else if (activeTab === 'contacts') setContacts(data as ContactEntry[]);
          else if (activeTab === 'users') setUsers(data as UserEntry[]);
          else if (activeTab === 'events') setEvents(data as AnalyticsEvent[]);
          else if (activeTab === 'health') setHealth(data as HealthData);
        }
      } catch {
        // silent — session check already handled
      }
      setIsDataLoading(false);
    };

    loadTabData();
  }, [activeTab, isLoading]);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#FFD700] animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-[#141416] border-r border-white/5 flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <Image src="/logo-dark.svg" alt="FlowCFO" width={32} height={32} className="h-8 w-8" />
          <span className="font-bold tracking-tight">FlowCFO Admin</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavButton
            active={activeTab === 'overview'}
            onClick={() => setActiveTab('overview')}
            icon={<BarChart3 className="h-4 w-4" />}
            label="Overview"
          />
          <NavButton
            active={activeTab === 'waitlist'}
            onClick={() => setActiveTab('waitlist')}
            icon={<ListTodo className="h-4 w-4" />}
            label="Waitlist"
          />
          <NavButton
            active={activeTab === 'contacts'}
            onClick={() => setActiveTab('contacts')}
            icon={<MessageSquare className="h-4 w-4" />}
            label="Contacts"
          />
          <NavButton
            active={activeTab === 'users'}
            onClick={() => setActiveTab('users')}
            icon={<Users className="h-4 w-4" />}
            label="Users"
          />
          <NavButton
            active={activeTab === 'events'}
            onClick={() => setActiveTab('events')}
            icon={<Activity className="h-4 w-4" />}
            label="Events"
          />
          <NavButton
            active={activeTab === 'health'}
            onClick={() => setActiveTab('health')}
            icon={<BarChart3 className="h-4 w-4" />}
            label="Health"
          />
          <NavButton
            active={activeTab === 'blog'}
            onClick={() => setActiveTab('blog')}
            icon={<FileText className="h-4 w-4" />}
            label="Blog"
          />
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full p-3 text-white/40 hover:text-white hover:bg-white/5 transition-colors text-sm"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-64">
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0A0A0B]/50 backdrop-blur-md sticky top-0 z-10">
          <h2 className="text-sm font-medium text-white/60 uppercase tracking-widest">
            {activeTab}
          </h2>
          <div className="flex items-center gap-4">
            <a
              href="/admin/dashboard"
              className="text-[10px] uppercase tracking-widest text-white/30 hover:text-[#FFD700] transition-colors"
            >
              Dashboard
            </a>
            <div className="text-right">
              <p className="text-xs font-bold text-white">Admin User</p>
              <p className="text-[10px] text-[#FFD700] uppercase tracking-tighter">
                Super Admin
              </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-white/40" />
            </div>
          </div>
        </header>

        <div className="p-8">
          {activeTab === 'overview' && stats && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard
                  label="Total Users"
                  value={stats.total_users}
                  subLabel="Registered accounts"
                  icon={<Users className="text-[#FFD700]" />}
                />
                <StatCard
                  label="Waitlist"
                  value={stats.total_waitlist}
                  subLabel="Pre-launch signups"
                  icon={<UserPlus className="text-[#FFD700]" />}
                />
                <StatCard
                  label="Contacts"
                  value={stats.total_contacts}
                  subLabel="Support requests"
                  icon={<MessageSquare className="text-[#FFD700]" />}
                />
                <StatCard
                  label="Signups (7d)"
                  value={stats.signups_last_7_days}
                  subLabel="New signups"
                  icon={<TrendingUp className="text-[#FFD700]" />}
                />
                <StatCard
                  label="Logins (7d)"
                  value={stats.logins_last_7_days}
                  subLabel="Past 7 days activity"
                  icon={<Activity className="text-[#FFD700]" />}
                />
              </div>

              {/* Charts/Tables Placeholder */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-[#141416] border border-white/5 p-6">
                  <h3 className="text-lg font-bold mb-6">
                    Users by Business Type
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(stats.users_by_business_type).map(
                      ([type, count]) => (
                        <div
                          key={type}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-white/60 capitalize">
                            {type}
                          </span>
                          <div className="flex items-center gap-4 flex-1 mx-8">
                            <div className="h-1.5 bg-white/5 flex-1 overflow-hidden">
                              <div
                                className="h-full bg-[#FFD700]"
                                style={{
                                  width: `${(count / stats.total_users) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                          <span className="text-sm font-mono font-bold">
                            {count}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="bg-[#141416] border border-white/5 p-6">
                  <h3 className="text-lg font-bold mb-6">
                    Waitlist by Business Type
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(stats.waitlist_by_business_type).map(
                      ([type, count]) => (
                        <div
                          key={type}
                          className="flex items-center justify-between"
                        >
                          <span className="text-sm text-white/60 capitalize">
                            {type}
                          </span>
                          <div className="flex items-center gap-4 flex-1 mx-8">
                            <div className="h-1.5 bg-white/5 flex-1 overflow-hidden">
                              <div
                                className="h-full bg-white/20"
                                style={{
                                  width: `${(count / stats.total_waitlist) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                          <span className="text-sm font-mono font-bold">
                            {count}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'waitlist' && (
            <div className="bg-[#141416] border border-white/5 overflow-hidden">
              <DataTable
                data={waitlist}
                isLoading={isDataLoading}
                columns={[
                  {
                    header: 'Date',
                    accessor: (item) =>
                      new Date(item.created_at).toLocaleDateString(),
                  },
                  { header: 'Name', accessor: 'full_name' },
                  { header: 'Email', accessor: 'email' },
                  {
                    header: 'Business',
                    accessor: 'business_type',
                    className: 'capitalize',
                  },
                  {
                    header: 'Challenge',
                    accessor: 'challenge',
                    className: 'max-w-xs truncate',
                  },
                ]}
              />
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="bg-[#141416] border border-white/5 overflow-hidden">
              <DataTable
                data={contacts}
                isLoading={isDataLoading}
                columns={[
                  {
                    header: 'Date',
                    accessor: (item) =>
                      new Date(item.created_at).toLocaleDateString(),
                  },
                  { header: 'Name', accessor: 'name' },
                  { header: 'Email', accessor: 'email' },
                  { header: 'Subject', accessor: 'subject' },
                  {
                    header: 'Message',
                    accessor: 'message',
                    className: 'max-w-xs truncate',
                  },
                ]}
              />
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-[#141416] border border-white/5 overflow-hidden">
              <DataTable
                data={users}
                isLoading={isDataLoading}
                columns={[
                  {
                    header: 'Joined',
                    accessor: (item) =>
                      new Date(item.created_at).toLocaleDateString(),
                  },
                  { header: 'Email', accessor: 'email' },
                  {
                    header: 'Business',
                    accessor: 'business_type',
                    className: 'capitalize',
                  },
                  {
                    header: 'Approved',
                    accessor: (item) => (
                      <span className={`text-[10px] uppercase font-bold ${item.approved ? 'text-green-400' : 'text-amber-400'}`}>
                        {item.approved ? 'Yes' : 'No'}
                      </span>
                    ),
                  },
                  {
                    header: 'Requested',
                    accessor: (item) =>
                      item.approval_requested ? (
                        <span className="text-green-400 text-[10px] uppercase font-bold">Yes</span>
                      ) : (
                        <span className="text-white/20 text-[10px]">—</span>
                      ),
                  },
                  {
                    header: '',
                    accessor: (item) => (
                      <button
                        onClick={async () => {
                          try {
                            const result = await adminApi.approveUser(item.id);
                            const updated = users.map((u) =>
                              u.id === item.id ? { ...u, approved: result.approved } : u,
                            );
                            setUsers(updated);
                          } catch {
                            // silent
                          }
                        }}
                        className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-wider transition-all ${
                          item.approved
                            ? 'border border-red-500/30 text-red-400 hover:bg-red-500/10'
                            : 'border border-green-500/30 text-green-400 hover:bg-green-500/10'
                        }`}
                      >
                        {item.approved ? 'Revoke' : 'Approve'}
                      </button>
                    ),
                  },
                ]}
              />
            </div>
          )}

          {activeTab === 'events' && (
            <div className="bg-[#141416] border border-white/5 overflow-hidden">
              <DataTable
                data={events}
                isLoading={isDataLoading}
                columns={[
                  {
                    header: 'Time',
                    accessor: (item) =>
                      new Date(item.created_at).toLocaleString(),
                  },
                  {
                    header: 'Event',
                    accessor: 'event_type',
                    className: 'text-[#FFD700] font-mono',
                  },
                  { header: 'Path', accessor: (item) => item.metadata.path },
                  {
                    header: 'Method',
                    accessor: (item) => item.metadata.method,
                    className: 'font-bold',
                  },
                  {
                    header: 'Status',
                    accessor: (item) => (
                      <span
                        className={
                          item.metadata.status >= 400
                            ? 'text-red-400'
                            : 'text-green-400'
                        }
                      >
                        {item.metadata.status}
                      </span>
                    ),
                  },
                  {
                    header: 'Country',
                    accessor: 'country',
                    className: 'text-[10px] uppercase',
                  },
                  {
                    header: 'IP',
                    accessor: 'ip_address',
                    className: 'text-[10px] text-white/30',
                  },
                ]}
              />
            </div>
          )}

          {activeTab === 'health' && (
            <div className="space-y-6">
              {isDataLoading && !health && (
                <div className="bg-[#141416] border border-white/5 p-12 text-center">
                  <Loader2 className="h-6 w-6 text-[#FFD700] animate-spin mx-auto" />
                </div>
              )}
              {health && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                      label="Database"
                      value={health.database === 'healthy' ? 'Healthy' : 'Unhealthy'}
                      subLabel="Connection status"
                      icon={<Activity className={health.database === 'healthy' ? 'text-green-400' : 'text-red-400'} />}
                    />
                    <StatCard label="Users" value={health.user_count} subLabel="Total registered" icon={<Users className="text-[#FFD700]" />} />
                    <StatCard label="Waitlist" value={health.waitlist_count} subLabel="Pre-launch signups" icon={<UserPlus className="text-[#FFD700]" />} />
                    <StatCard label="Version" value={health.version} subLabel={new Date(health.timestamp).toLocaleString()} icon={<BarChart3 className="text-[#FFD700]" />} />
                  </div>
                  <div className="bg-[#141416] border border-white/5 p-6">
                    <p className="text-xs text-white/40 font-mono">
                      {JSON.stringify(health, null, 2)}
                    </p>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="space-y-6">
              {/* Blog sub-tabs */}
              <div className="flex gap-2 border-b border-white/5 pb-4">
                {(['posts', 'settings', 'generate'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setBlogSubTab(st)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all ${
                      blogSubTab === st
                        ? 'bg-[#FFD700] text-black'
                        : 'text-white/40 hover:text-white border border-white/10'
                    }`}
                  >
                    {st === 'posts' ? 'Posts' : st === 'settings' ? 'Settings' : 'Generate'}
                  </button>
                ))}
              </div>

              {/* Posts list */}
              {blogSubTab === 'posts' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/60">{blogTotal} post{blogTotal !== 1 ? 's' : ''}</p>
                    <div className="flex gap-2">
                      {['all', 'draft', 'published', 'archived'].map((s) => (
                        <button
                          key={s}
                          onClick={async () => {
                            const res = await blogApi.getPosts(s === 'all' ? undefined : s);
                            setBlogPosts(res.posts);
                            setBlogTotal(res.total);
                          }}
                          className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/40 hover:text-white border border-white/10 hover:border-white/30 transition-all"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {blogPosts.length === 0 ? (
                    <div className="bg-[#141416] border border-white/5 p-12 text-center">
                      <FileText className="h-8 w-8 text-white/20 mx-auto mb-3" />
                      <p className="text-sm text-white/40">No posts yet. Generate your first post.</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {blogPosts.map((post) => (
                        <div
                          key={post.id}
                          className="bg-[#141416] border border-white/5 p-4 flex items-center justify-between hover:border-white/20 transition-all"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span
                                className={`inline-block w-2 h-2 rounded-full ${
                                  post.status === 'published'
                                    ? 'bg-green-400'
                                    : post.status === 'archived'
                                      ? 'bg-white/20'
                                      : 'bg-[#FFD700]'
                                }`}
                              />
                              <p className="text-sm font-medium text-white truncate">{post.title}</p>
                            </div>
                            <p className="text-xs text-white/40 truncate ml-5">
                              {post.meta_description || 'No description'}
                            </p>
                            <p className="text-[10px] text-white/20 ml-5 mt-1">
                              {post.created_at ? new Date(post.created_at).toLocaleDateString() : ''}
                              {post.author ? ` · ${post.author}` : ''}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 ml-4 shrink-0">
                            <button
                              onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                              className="p-2 text-white/30 hover:text-white transition-all"
                              title="Preview"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            {post.status === 'draft' && (
                              <button
                                onClick={async () => {
                                  await blogApi.publishPost(post.id);
                                  const res = await blogApi.getPosts();
                                  setBlogPosts(res.posts);
                                  setBlogTotal(res.total);
                                }}
                                className="p-2 text-green-400/50 hover:text-green-400 transition-all"
                                title="Publish"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                            )}
                            {post.status === 'published' && (
                              <button
                                onClick={async () => {
                                  await blogApi.archivePost(post.id);
                                  const res = await blogApi.getPosts();
                                  setBlogPosts(res.posts);
                                  setBlogTotal(res.total);
                                }}
                                className="p-2 text-white/30 hover:text-white/60 transition-all"
                                title="Archive"
                              >
                                <Archive className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Settings */}
              {blogSubTab === 'settings' && blogSettings && (
                <div className="max-w-xl space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={blogSettings.author_name}
                      onChange={(e) => {
                        setBlogSettings({ ...blogSettings, author_name: e.target.value });
                        setSettingsDirty(true);
                      }}
                      className="w-full bg-[#141416] border border-white/10 p-3 text-sm text-white focus:border-[#FFD700] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                      Brand Voice Notes
                    </label>
                    <textarea
                      value={blogSettings.brand_voice_notes || ''}
                      onChange={(e) => {
                        setBlogSettings({ ...blogSettings, brand_voice_notes: e.target.value });
                        setSettingsDirty(true);
                      }}
                      rows={4}
                      className="w-full bg-[#141416] border border-white/10 p-3 text-sm text-white focus:border-[#FFD700] focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                      Target Keywords
                    </label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(blogSettings.target_keywords || []).map((kw, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 bg-[#FFD700]/10 border border-[#FFD700]/20 px-2 py-1 text-xs text-[#FFD700]"
                        >
                          {kw}
                          <button
                            onClick={() => {
                              const updated = blogSettings.target_keywords.filter((_, j) => j !== i);
                              setBlogSettings({ ...blogSettings, target_keywords: updated });
                              setSettingsDirty(true);
                            }}
                            className="text-white/40 hover:text-white ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      type="text"
                      placeholder="Type a keyword and press Enter"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          const input = e.currentTarget;
                          const val = input.value.trim();
                          if (val && !blogSettings.target_keywords.includes(val)) {
                            setBlogSettings({
                              ...blogSettings,
                              target_keywords: [...blogSettings.target_keywords, val],
                            });
                            setSettingsDirty(true);
                          }
                          input.value = '';
                        }
                      }}
                      className="w-full bg-[#141416] border border-white/10 p-3 text-sm text-white focus:border-[#FFD700] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-white/60">
                      Auto-publish
                    </label>
                    <button
                      onClick={() => {
                        setBlogSettings({ ...blogSettings, auto_publish: !blogSettings.auto_publish });
                        setSettingsDirty(true);
                      }}
                      className={`relative w-10 h-5 rounded-full transition-all ${
                        blogSettings.auto_publish ? 'bg-[#FFD700]' : 'bg-white/10'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
                          blogSettings.auto_publish ? 'left-5' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {settingsDirty && (
                    <button
                      onClick={async () => {
                        await blogApi.updateSettings(blogSettings);
                        setSettingsDirty(false);
                      }}
                      className="bg-[#FFD700] text-black px-6 py-3 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all"
                    >
                      Save Settings
                    </button>
                  )}
                </div>
              )}

              {/* Generate */}
              {blogSubTab === 'generate' && (
                <div className="max-w-xl space-y-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                      Topic
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={blogTopic}
                        onChange={(e) => setBlogTopic(e.target.value)}
                        placeholder="e.g. How much cash should a freelancer keep in reserve?"
                        className="flex-1 bg-[#141416] border border-white/10 p-3 text-sm text-white focus:border-[#FFD700] focus:outline-none"
                      />
                      <button
                        onClick={async () => {
                          if (!blogTopic.trim()) return;
                          setGenerateStatus('queued');
                          try {
                            await blogApi.generate(blogTopic.trim());
                            setGenerateStatus('done');
                            setBlogTopic('');
                            const logs = await blogApi.getLogs();
                            setBlogLogs(logs);
                            setTimeout(() => setGenerateStatus(null), 3000);
                          } catch {
                            setGenerateStatus('error');
                            setTimeout(() => setGenerateStatus(null), 3000);
                          }
                        }}
                        disabled={!blogTopic.trim() || generateStatus === 'queued'}
                        className="bg-[#FFD700] text-black px-6 py-3 text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Send className="h-3 w-3" />
                        {generateStatus === 'queued' ? 'Generating...' : 'Generate'}
                      </button>
                    </div>
                    {generateStatus === 'done' && (
                      <p className="text-xs text-green-400 mt-2">Generation queued. Check logs for results.</p>
                    )}
                    {generateStatus === 'error' && (
                      <p className="text-xs text-red-400 mt-2">Failed to queue generation. Try again.</p>
                    )}
                  </div>

                  <div className="border-t border-white/5 pt-6">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white/60 mb-4">Generation Logs</h3>
                    {blogLogs.length === 0 ? (
                      <p className="text-sm text-white/40">No generation logs yet.</p>
                    ) : (
                      <div className="space-y-2">
                        {blogLogs.map((log) => (
                          <div key={log.id} className="bg-[#141416] border border-white/5 p-3 flex items-center justify-between">
                            <div>
                              <p className="text-sm text-white truncate max-w-md">{log.topic}</p>
                              <p className="text-[10px] text-white/30 mt-1">
                                {log.created_at ? new Date(log.created_at).toLocaleString() : ''}
                                {log.triggered_by ? ` by ${log.triggered_by}` : ''}
                              </p>
                            </div>
                            <span
                              className={`text-[10px] font-bold uppercase px-2 py-1 ${
                                log.status === 'done'
                                  ? 'text-green-400 bg-green-400/10'
                                  : log.status === 'failed'
                                    ? 'text-red-400 bg-red-400/10'
                                    : log.status === 'running'
                                      ? 'text-[#FFD700] bg-[#FFD700]/10'
                                      : 'text-white/40 bg-white/5'
                              }`}
                            >
                              {log.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function NavButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-all ${
        active
          ? 'bg-[#FFD700] text-black font-bold'
          : 'text-white/40 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({
  label,
  value,
  subLabel,
  icon,
}: {
  label: string;
  value: number | string;
  subLabel: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-[#141416] border border-white/5 p-6 group hover:border-[#FFD700]/20 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:border-[#FFD700]/30 transition-colors">
          {icon}
        </div>
        <ChevronRight className="h-4 w-4 text-white/10 group-hover:text-[#FFD700] transition-colors" />
      </div>
      <p className="text-xs uppercase tracking-widest text-white/40 font-medium mb-1">
        {label}
      </p>
      <p className="text-3xl font-mono font-bold mb-1">{value}</p>
      <p className="text-[10px] text-white/20 uppercase tracking-tighter">
        {subLabel}
      </p>
    </div>
  );
}
