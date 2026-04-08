import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { logout, getSession, clearSession, onAuthChange } from '../services/auth';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (session?.email) {
      setUserEmail(session.email);
    } else {
      navigate('/login');
    }

    const unsubscribe = onAuthChange((user) => {
      if (!user) {
        clearSession();
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout(); 
      clearSession();
      navigate('/login');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const displayName = userEmail ? userEmail.split('@')[0] : 'User';
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen relative flex">
      <div className="prism-node top-24 left-72 opacity-40"></div>
      <div className="prism-node bottom-12 right-12 opacity-30"></div>
      <div className="prism-node top-1/2 right-0 opacity-20"></div>

      <aside className="flex flex-col h-screen fixed left-0 top-0 z-40 bg-slate-900 dark:bg-black font-['Manrope'] text-sm font-medium w-64 shadow-2xl transition-transform duration-200 ease-in-out">
        <div className="px-8 py-10">
          <h1 className="text-xl font-black text-white tracking-tighter uppercase">Lumina</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1">Farm Record System</p>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive
                  ? 'text-teal-400 border-r-4 border-teal-400 bg-slate-800/50'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`
            }
          >
            <span className="material-symbols-outlined text-lg">dashboard</span>
            <span>Overview</span>
          </NavLink>

          <NavLink
            to="/records"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive
                  ? 'text-teal-400 border-r-4 border-teal-400 bg-slate-800/50'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`
            }
          >
            <span className="material-symbols-outlined text-lg">receipt_long</span>
            <span>Records</span>
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                isActive
                  ? 'text-teal-400 border-r-4 border-teal-400 bg-slate-800/50'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`
            }
          >
            <span className="material-symbols-outlined text-lg">settings</span>
            <span>Settings</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-800/50 mt-auto">
          <div className="flex items-center gap-3 p-4 bg-slate-800/30 rounded-xl mb-4 border border-white/5">
            {/* Avatar with initial instead of external image */}
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-sm">
              {userInitial}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-white text-xs font-bold truncate">{displayName}</p>
              <p className="text-slate-500 text-[10px] truncate">{userEmail}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all rounded-lg text-xs uppercase tracking-widest font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
          </button>
        </div>
      </aside>

      {/* Main Content Canvas */}
      <main className="ml-64 flex-1 w-full min-h-screen relative overflow-hidden flex flex-col">
        <div className="flex-1 w-full flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}