import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="p-8 lg:p-12 relative flex-1">
      {/* Header Section */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-secondary font-semibold text-xs tracking-widest uppercase mb-2 block">Financial Control</span>
          <h2 className="text-4xl font-extrabold font-headline text-on-surface tracking-tight">Performance Hub</h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 bg-surface-container-low text-on-surface-variant font-semibold text-sm rounded-xl hover:bg-surface-container-high transition-all">
            Generate Report
          </button>
          <button className="px-6 py-2.5 bg-primary-container text-on-primary-fixed font-bold text-sm rounded-xl shadow-lg shadow-primary-container/20 hover:opacity-90 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">add</span>
            New Entry
          </button>
        </div>
      </header>

      {/* Top Row: Summary Cards (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Total Income */}
        <div className="bg-surface-container-lowest p-8 rounded-xl relative overflow-hidden group hover:bg-surface-bright transition-all duration-300">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-500 font-medium text-xs uppercase tracking-wider">Total Income</span>
              <div className="w-8 h-8 bg-secondary-container/30 rounded-lg flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-lg">trending_up</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-headline font-extrabold text-on-surface">$124,500</span>
              <span className="text-secondary text-xs font-bold">+12%</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary-container/5 rounded-full blur-2xl group-hover:bg-secondary-container/10 transition-all"></div>
        </div>

        {/* Total Expense */}
        <div className="bg-surface-container-lowest p-8 rounded-xl relative overflow-hidden group hover:bg-surface-bright transition-all duration-300">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-500 font-medium text-xs uppercase tracking-wider">Total Expense</span>
              <div className="w-8 h-8 bg-error-container/30 rounded-lg flex items-center justify-center text-error">
                <span className="material-symbols-outlined text-lg">trending_down</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-headline font-extrabold text-on-surface">$48,200</span>
              <span className="text-error text-xs font-bold">-2.4%</span>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-error-container/5 rounded-full blur-2xl group-hover:bg-error-container/10 transition-all"></div>
        </div>

        {/* Net Balance */}
        <div className="bg-slate-900 p-8 rounded-xl relative overflow-hidden group transition-all duration-300">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <span className="text-slate-400 font-medium text-xs uppercase tracking-wider">Net Balance</span>
              <div className="w-8 h-8 bg-primary-container rounded-lg flex items-center justify-center text-on-primary-fixed">
                <span className="material-symbols-outlined text-lg">account_balance_wallet</span>
              </div>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-headline font-extrabold text-white">$76,300</span>
              <span className="text-primary-container text-xs font-bold">Stable</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 blur-3xl opacity-50"></div>
        </div>
      </div>

      {/* Middle Row: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Trends Chart (Simulated) */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-8 rounded-xl hover:bg-surface-bright transition-all">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-bold font-headline">Weekly Revenue Trends</h3>
              <p className="text-slate-400 text-xs">Performance data across last 7 business days</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-surface-container-low text-[10px] font-bold uppercase rounded-full">Mon - Sun</span>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-4 relative">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between opacity-10">
              <div className="border-t border-on-surface"></div>
              <div className="border-t border-on-surface"></div>
              <div className="border-t border-on-surface"></div>
              <div className="border-t border-on-surface"></div>
            </div>
            {/* Chart Bars/Lines Simulation */}
            <div className="flex-1 bg-secondary-container/20 hover:bg-secondary-container/40 transition-all h-[40%] rounded-t-lg relative group">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">12k</div>
            </div>
            <div className="flex-1 bg-secondary-container/20 hover:bg-secondary-container/40 transition-all h-[65%] rounded-t-lg relative group"></div>
            <div className="flex-1 bg-secondary-container/40 hover:bg-secondary-container/60 transition-all h-[55%] rounded-t-lg relative group"></div>
            <div className="flex-1 bg-secondary-container/20 hover:bg-secondary-container/40 transition-all h-[85%] rounded-t-lg relative group"></div>
            <div className="flex-1 bg-secondary-container/60 hover:bg-secondary-container/80 transition-all h-[45%] rounded-t-lg relative group"></div>
            <div className="flex-1 bg-primary-container h-[95%] rounded-t-lg relative group shadow-lg shadow-primary-container/20"></div>
            <div className="flex-1 bg-secondary-container/30 hover:bg-secondary-container/50 transition-all h-[70%] rounded-t-lg relative group"></div>
          </div>
          <div className="flex justify-between mt-4 px-2 text-[10px] text-slate-400 font-bold">
            <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
          </div>
        </div>

        {/* Expense Distribution (Simulated Pie/Donut) */}
        <div className="bg-surface-container-lowest p-8 rounded-xl hover:bg-surface-bright transition-all flex flex-col">
          <div className="mb-8">
            <h3 className="text-lg font-bold font-headline">Expense Ratio</h3>
            <p className="text-slate-400 text-xs">Top spending categories this month</p>
          </div>
          <div className="flex-1 flex items-center justify-center relative">
            {/* Donut Simulation */}
            <div className="w-40 h-40 rounded-full border-[12px] border-slate-100 relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-[12px] border-secondary border-t-transparent border-r-transparent rotate-45"></div>
              <div className="absolute inset-0 rounded-full border-[12px] border-primary-container border-l-transparent border-b-transparent border-r-transparent -rotate-12"></div>
              <div className="text-center">
                <span className="text-xs text-slate-400 block uppercase font-bold tracking-tighter">Total</span>
                <span className="text-xl font-bold font-headline">100%</span>
              </div>
            </div>
          </div>
          <div className="space-y-3 mt-8">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-slate-600">Infrastructure</span>
              </div>
              <span className="font-bold">45%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-container"></div>
                <span className="text-slate-600">Marketing</span>
              </div>
              <span className="font-bold">30%</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                <span className="text-slate-600">Other</span>
              </div>
              <span className="font-bold">25%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent Activity */}
      <section className="mt-8 bg-surface-container-lowest p-8 rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-bold font-headline">Recent Transactions</h3>
          <Link to="/records" className="text-xs font-bold text-secondary hover:underline transition-all">View Ledger</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-slate-400 border-b border-slate-50">
                <th className="pb-4 font-bold">Details</th>
                <th className="pb-4 font-bold">Category</th>
                <th className="pb-4 font-bold">Date</th>
                <th className="pb-4 font-bold text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <tr className="group hover:bg-slate-50/50 transition-all">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm text-slate-500">cloud_queue</span>
                    </div>
                    <span className="text-sm font-semibold">AWS Cloud Services</span>
                  </div>
                </td>
                <td className="py-4 text-xs text-slate-500">Technology</td>
                <td className="py-4 text-xs text-slate-500">Oct 24, 2024</td>
                <td className="py-4 text-sm font-bold text-right text-error">-$1,240.00</td>
              </tr>
              <tr className="group hover:bg-slate-50/50 transition-all">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm text-slate-500">payments</span>
                    </div>
                    <span className="text-sm font-semibold">Stripe Payout</span>
                  </div>
                </td>
                <td className="py-4 text-xs text-slate-500">Revenue</td>
                <td className="py-4 text-xs text-slate-500">Oct 23, 2024</td>
                <td className="py-4 text-sm font-bold text-right text-secondary">+$14,500.00</td>
              </tr>
              <tr className="group hover:bg-slate-50/50 transition-all">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm text-slate-500">restaurant</span>
                    </div>
                    <span className="text-sm font-semibold">Corporate Lunch</span>
                  </div>
                </td>
                <td className="py-4 text-xs text-slate-500">Entertainment</td>
                <td className="py-4 text-xs text-slate-500">Oct 22, 2024</td>
                <td className="py-4 text-sm font-bold text-right text-error">-$450.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer Component */}
      <footer className="w-full flex flex-col md:flex-row justify-between items-center py-12 border-t border-slate-200/15 font-['Inter'] text-xs uppercase tracking-widest mt-12">
        <p className="text-slate-500">© 2024 Lumina Tech. All rights reserved.</p>
        <div className="flex gap-8 mt-4 md:mt-0">
          <a href="#" className="text-slate-500 hover:text-lime-500 transition-colors">Privacy Policy</a>
          <a href="#" className="text-slate-500 hover:text-lime-500 transition-colors">Terms of Service</a>
          <a href="#" className="text-slate-500 hover:text-lime-500 transition-colors">Contact</a>
        </div>
      </footer>
    </div>
  );
}
