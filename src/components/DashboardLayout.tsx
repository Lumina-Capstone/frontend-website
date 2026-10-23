import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { logout, getSession, clearSession, onAuthChange } from '../services/auth';
import ConfirmDialog from './ConfirmDialog';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session?.email) {
      navigate('/signin');
    }

    const unsubscribe = onAuthChange((user) => {
      if (!user) {
        clearSession();
        navigate('/signin');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      clearSession();
      navigate('/signin');
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoggingOut(false);
      setShowLogoutModal(false);
    }
  };

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
      
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#0B1A13]/40 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside
        className={`flex flex-col h-screen fixed left-0 top-0 z-50 bg-[#11241A] shadow-2xl transition-all duration-300 ease-in-out ${
          isCollapsed ? 'md:w-[88px]' : 'md:w-[260px]'
        } ${
          isMobileMenuOpen ? 'translate-x-0 w-[260px]' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3.5 top-8 w-7 h-7 bg-white border border-[#E8F2EC] rounded-full items-center justify-center text-[#11241A] shadow-sm hover:scale-110 hover:text-emerald-600 transition-all z-50"
        >
          <span className="material-symbols-outlined text-[16px]">
            {isCollapsed ? 'chevron_right' : 'chevron_left'}
          </span>
        </button>

        <button 
          onClick={() => setIsMobileMenuOpen(false)}
          className="md:hidden absolute right-4 top-6 text-[#8EA698] hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className={`flex items-center h-24 px-6 mb-2 ${isCollapsed && !isMobileMenuOpen ? 'justify-center' : 'justify-start'}`}>
          <div className="flex items-center gap-3 mt-2 md:mt-0">
            <div className="bg-emerald-500 text-[#0B1A13] w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
               <span className="material-symbols-outlined text-[22px]">spa</span>
            </div>
            {(!isCollapsed || isMobileMenuOpen) && (
              <span className="font-['Manrope',sans-serif] font-bold text-2xl tracking-tight text-white">
                Lumina
              </span>
            )}
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto overflow-x-hidden no-scrollbar">
          {navItems.map((item) => (
            <TooltipWrapper key={item.to} label={item.label} show={isCollapsed && !isMobileMenuOpen}>
              <NavLink
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)} 
                className={({ isActive }) =>
                  `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-emerald-500 text-white shadow-[0_4px_20px_-5px_rgba(16,185,129,0.4)]'
                      : 'text-[#8EA698] hover:bg-white/5 hover:text-white'
                  } ${isCollapsed && !isMobileMenuOpen ? 'justify-center px-0 w-14 mx-auto' : ''}`
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
                    {(!isCollapsed || isMobileMenuOpen) && <span className={`text-sm font-bold tracking-wide ${isActive ? 'text-white' : ''}`}>{item.label}</span>}
                  </>
                )}
              </NavLink>
            </TooltipWrapper>
          ))}
        </nav>

        <div className="px-4 pb-6 mt-auto space-y-2 border-t border-white/5 pt-6">
          <TooltipWrapper label="Logout" show={isCollapsed && !isMobileMenuOpen}>
            <button
              onClick={() => setShowLogoutModal(true)}
              className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 text-[#8EA698] hover:bg-red-500/10 hover:text-red-400 group ${
                isCollapsed && !isMobileMenuOpen ? 'justify-center px-0 w-14 mx-auto' : ''
              }`}
            >
              <span className="material-symbols-outlined text-[22px] group-hover:text-red-400 transition-colors">
                logout
              </span>
              {(!isCollapsed || isMobileMenuOpen) && <span>Logout</span>}
            </button>
          </TooltipWrapper>
        </div>
      </aside>

      <main
        className={`flex-1 min-h-screen bg-[#FDFBF7] transition-all duration-300 ease-in-out w-full ${
          isCollapsed ? 'md:ml-[88px]' : 'md:ml-[260px]'
        } ml-0`}
      >
        <div className="md:hidden bg-white border-b border-[#E8F2EC] px-5 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="bg-emerald-500 text-[#0B1A13] w-8 h-8 rounded-lg flex items-center justify-center shadow-sm">
               <span className="material-symbols-outlined text-[18px]">spa</span>
            </div>
            <span className="font-['Manrope',sans-serif] font-bold text-xl tracking-tight text-[#0B1A13]">Lumina</span>
          </div>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-[#4A5D52] hover:text-[#0B1A13] transition-colors p-1"
          >
            <span className="material-symbols-outlined text-[28px]">menu</span>
          </button>
        </div>

        <div className="h-full w-full">
          <Outlet />
        </div>
      </main>
      
      {showLogoutModal && (
        <ConfirmDialog
          title="Sign Out?"
          body="Are you sure you want to sign out of your account? You will need to log in again to access your ledger."
          confirmLabel="Sign Out"
          loadingLabel="Signing out..."
          icon="logout"
          tone="orange"
          loading={isLoggingOut}
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}

    </div>
  );
}