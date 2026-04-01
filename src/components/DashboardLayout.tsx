import { Outlet, NavLink } from 'react-router-dom';

export default function DashboardLayout() {
  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen relative flex">
      {/* Prismatic Decorative Nodes (Bleeding edges) */}
      <div className="prism-node top-24 left-72 opacity-40"></div>
      <div className="prism-node bottom-12 right-12 opacity-30"></div>
      <div className="prism-node top-1/2 right-0 opacity-20"></div>

      {/* SideNavBar Component */}
      <aside className="flex flex-col h-screen fixed left-0 top-0 z-40 bg-slate-900 dark:bg-black font-['Manrope'] text-sm font-medium w-64 shadow-2xl transition-transform duration-200 ease-in-out">
        <div className="px-8 py-10">
          <h1 className="text-xl font-black text-white tracking-tighter uppercase">Lumina</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mt-1">Tech Startup</p>
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
          {/* Analytics isn't fully designed, redirecting to dashboard for demo */}
          <NavLink
            to="/dashboard"
            className={() =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all group text-slate-400 hover:bg-slate-800 hover:text-slate-200`
            }
          >
            <span className="material-symbols-outlined text-lg">analytics</span>
            <span>Analytics</span>
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
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5zXLFXKE6EKTZTro7B6am3Ta2O3puu7l-JqNGwtx6d_hZj7Ic19xWWc31sRSG1ULRmDtsWsz_k8VBLM-N1zrA8IUBxTIO6K7DIN-4N5qBdm4w3UGII2YDMO3G_rpFLSM82ZsWQy2pc_8vNlkZPA8vMNm3faouimcgV-1lG8SuAHLoGakCEvXgMy_INX_RuC0VfuR_LUcs52OV0sT_HEJ1FFH3VymP-Q5NWoWt10g5D-PuaIjmnL_iogQC2rbmWC98RRysjVreO4Q"
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover grayscale brightness-110"
            />
            <div className="flex-1 overflow-hidden">
              <p className="text-white text-xs font-bold truncate">Adrian Thorne</p>
              <p className="text-slate-500 text-[10px] truncate">Admin Account</p>
            </div>
          </div>
          <NavLink
            to="/login"
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all rounded-lg text-xs uppercase tracking-widest font-bold"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span>Logout</span>
          </NavLink>
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
