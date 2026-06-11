'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/api/use-user';
import { authClient } from '@/lib/auth-client';
import { User, Shield, LogOut } from 'lucide-react';

export default function UserAvatarButton() {
  const { data: user } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const initials = user?.full_name
    ? user.full_name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const handleLogout = async () => {
    setOpen(false);
    await authClient.signOut();
    router.push('/signin');
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 border border-white/10 px-3 py-2 transition-all hover:border-white/30"
      >
        <div className="h-7 w-7 bg-flow-gold/20 flex items-center justify-center text-flow-gold font-bold text-xs rounded-full">
          {initials}
        </div>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-flow-black border border-flow-line-dark shadow-xl z-50">
          <div className="px-4 py-3 border-b border-flow-line-dark/20">
            <p className="font-body text-xs font-bold text-white truncate">{user?.full_name || 'User'}</p>
            <p className="font-body text-[9px] text-flow-muted uppercase tracking-wider mt-0.5">
              {user?.plan === 'premium' ? 'PREMIUM' : 'FREE TRIAL'}
            </p>
          </div>
          <Link
            href="/dashboard/settings/accounts?tab=profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-flow-muted hover:text-flow-gold hover:bg-white/5 transition-colors font-body text-sm"
          >
            <User className="h-4 w-4" />
            Profile
          </Link>
          <Link
            href="/dashboard/settings/accounts?tab=security"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-flow-muted hover:text-flow-gold hover:bg-white/5 transition-colors font-body text-sm"
          >
            <Shield className="h-4 w-4" />
            Security
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-rose-400 hover:bg-red-500/10 transition-colors font-body text-sm w-full text-left border-t border-flow-line-dark/20"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
