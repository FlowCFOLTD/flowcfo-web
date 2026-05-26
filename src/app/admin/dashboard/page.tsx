'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { adminApi, usersApi } from '@/lib/api/users';
import {
  Users,
  Mail,
  ListTodo,
  BarChart3,
  Activity,
  LogOut,
  Landmark,
  TrendingUp,
  UserPlus,
  MessageSquare,
  ChevronRight,
  Loader2,
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
  is_admin: boolean;
  created_at: string;
}

interface AnalyticsEvent {
  id: string;
  user_id: string | null;
  event_type: string;
  ip_address: string;
  user_agent: string;
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
  const [activeTab, setActiveTab] = useState<
    'overview' | 'waitlist' | 'contacts' | 'users' | 'events' | 'health'
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
        const profile = await usersApi.getMe();
        if (!profile.is_admin) {
          router.push('/dashboard');
          return;
        }
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
          <div className="w-8 h-8 bg-[#FFD700] flex items-center justify-center">
            <Landmark className="text-black h-5 w-5" />
          </div>
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
              href="/dashboard"
              className="text-[10px] uppercase tracking-widest text-white/30 hover:text-[#FFD700] transition-colors"
            >
              Back to App
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
                    header: 'Plan',
                    accessor: 'plan',
                    className: 'uppercase text-[10px] font-bold text-[#FFD700]',
                  },
                  {
                    header: 'Business',
                    accessor: 'business_type',
                    className: 'capitalize',
                  },
                  { header: 'Step', accessor: 'onboarding_step' },
                  {
                    header: 'Status',
                    accessor: (item) =>
                      item.onboarding_completed ? (
                        <span className="text-green-400 text-[10px] uppercase font-bold">
                          Completed
                        </span>
                      ) : (
                        <span className="text-yellow-400 text-[10px] uppercase font-bold">
                          In Progress
                        </span>
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
                      new Date(item.created_at).toLocaleTimeString(),
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
                    header: 'IP Address',
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
