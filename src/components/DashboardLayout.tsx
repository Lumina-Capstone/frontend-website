import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { LayoutDashboard, Receipt, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { logout, getSession, clearSession, onAuthChange } from '../services/auth';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

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

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { to: '/records', icon: Receipt, label: 'Records' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const TooltipWrapper = ({ children, label, show }: { children: React.ReactNode; label: string; show: boolean }) => {
    if (!show) return <>{children}</>;
    return (
      <div className="relative group">
        {children}
        <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50">
          {label}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen flex">
      <aside
        className={`flex flex-col h-screen fixed left-0 top-0 z-40 bg-[#0f172a] shadow-xl transition-all duration-200 ease-in-out ${
          isCollapsed ? 'w-[72px]' : 'w-[240px]'
        }`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <img src="/Logo.png" alt="Lumina" className="h-7 w-auto" />
            </div>
          )}
          {isCollapsed && (
            <div className="w-full flex justify-center">
              <img src="/Logo.png" alt="Lumina" className="h-7 w-auto" />
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <TooltipWrapper key={item.to} label={item.label} show={isCollapsed}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-green-500/12 text-white'
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  } ${isCollapsed ? 'justify-center' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      size={18}
                      strokeWidth={1.5}
                      className={isActive ? 'text-green-500' : 'text-slate-400 group-hover:text-slate-300'}
                    />
                    {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                  </>
                )}
              </NavLink>
            </TooltipWrapper>
          ))}
        </nav>

        <div className="px-3 pb-6 mt-auto space-y-3">
          <TooltipWrapper label={displayName} show={isCollapsed}>
            <div
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-semibold text-sm shadow-md flex-shrink-0">
                {userInitial}
              </div>
              {!isCollapsed && (
                <p className="text-white text-sm font-semibold truncate">{displayName}</p>
              )}
            </div>
          </TooltipWrapper>

          <TooltipWrapper label="Logout" show={isCollapsed}>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-slate-300 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50 ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <LogOut size={18} strokeWidth={1.5} />
              {!isCollapsed && <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>}
            </button>
          </TooltipWrapper>
        </div>
      </aside>

      <main
        className={`flex-1 min-h-screen bg-gray-50 overflow-auto transition-all duration-200 ${
          isCollapsed ? 'ml-[72px]' : 'ml-[240px]'
        }`}
      >
        <div className="p-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
}