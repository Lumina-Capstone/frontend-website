import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
    { to: '/dashboard', icon: 'dashboard', label: 'Overview' },
    { to: '/records', icon: 'receipt_long', label: 'Records' },
    { to: '/settings', icon: 'settings', label: 'Settings' },
  ];

  const TooltipWrapper = ({ children, label, show }: { children: React.ReactNode; label: string; show: boolean }) => {
    if (!show) return <>{children}</>;
    return (
      <div className="relative group flex justify-center">
        {children}
        <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white text-[#0B1A13] font-bold text-xs rounded-lg shadow-[0_4px_20px_rgb(0,0,0,0.1)] border border-[#E8F2EC] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {label}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen flex font-['Inter',sans-serif] selection:bg-[#D1E8DA] selection:text-[#0B1A13]">
      
      <aside
        className={`flex flex-col h-screen fixed left-0 top-0 z-40 bg-[#11241A] shadow-2xl transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-[88px]' : 'w-[260px]'
        }`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3.5 top-8 w-7 h-7 bg-white border border-[#E8F2EC] rounded-full flex items-center justify-center text-[#11241A] shadow-sm hover:scale-110 hover:text-emerald-600 transition-all z-50"
        >
          <span className="material-symbols-outlined text-[16px]">
            {isCollapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>

        <div className={`flex items-center h-24 px-6 mb-2 ${isCollapsed ? 'justify-center' : 'justify-start'}`}>
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 text-[#0B1A13] w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
               <span className="material-symbols-outlined text-[22px]">spa</span>
            </div>
            {!isCollapsed && (
              <span className="font-['Manrope',sans-serif] font-bold text-2xl tracking-tight text-white">
                Lumina
              </span>
            )}
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto overflow-x-hidden no-scrollbar">
          {navItems.map((item) => (
            <TooltipWrapper key={item.to} label={item.label} show={isCollapsed}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-[0_4px_20px_-5px_rgba(16,185,129,0.4)]'
                      : 'text-[#8EA698] hover:bg-white/5 hover:text-white'
                  } ${isCollapsed ? 'justify-center px-0 w-14 mx-auto' : ''}`
                }
              >
                {({ isActive }) => (
                  <>
                    <span 
                      className={`material-symbols-outlined text-[22px] transition-colors ${
                        isActive ? 'text-white' : 'text-[#8EA698] group-hover:text-emerald-400'
                      }`}
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && <span className={`text-sm font-bold tracking-wide ${isActive ? 'text-white' : ''}`}>{item.label}</span>}
                  </>
                )}
              </NavLink>
            </TooltipWrapper>
          ))}
        </nav>

        <div className="px-4 pb-6 mt-auto space-y-2 border-t border-white/5 pt-6">
          <TooltipWrapper label="Logout" show={isCollapsed}>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 text-[#8EA698] hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50 group ${
                isCollapsed ? 'justify-center px-0 w-14 mx-auto' : ''
              }`}
            >
              <span className="material-symbols-outlined text-[22px] group-hover:text-red-400 transition-colors">
                logout
              </span>
              {!isCollapsed && <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>}
            </button>
          </TooltipWrapper>
        </div>
      </aside>

      <main
        className={`flex-1 min-h-screen bg-[#FDFBF7] transition-all duration-300 ease-in-out ${
          isCollapsed ? 'ml-[88px]' : 'ml-[260px]'
        }`}
      >
        <div className="h-full w-full">
          <Outlet />
        </div>
      </main>
      
    </div>
  );
}