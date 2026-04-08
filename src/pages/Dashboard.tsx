import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const mockProductions = [
  { id: '1', date: '2026-04-01', count: 1240 },
  { id: '2', date: '2026-04-02', count: 1320 },
  { id: '3', date: '2026-04-03', count: 1280 },
  { id: '4', date: '2026-04-04', count: 1450 },
  { id: '5', date: '2026-04-05', count: 1520 },
  { id: '6', date: '2026-04-06', count: 1380 },
  { id: '7', date: '2026-04-07', count: 1410 },
  { id: '8', date: '2026-04-08', count: 1490 },
];

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const total = mockProductions.reduce((s, p) => s + p.count, 0);
const today = new Date().toISOString().slice(0, 10);
const todayCount = mockProductions.find(p => p.date === today)?.count || 0;
const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
const yesterdayCount = mockProductions.find(p => p.date === yesterday)?.count || 0;
const dailyChange = yesterdayCount ? ((todayCount - yesterdayCount) / yesterdayCount) * 100 : 0;
const avg = Math.round(total / mockProductions.length);
const maxEntry = mockProductions.reduce((max, p) => (p.count > max.count ? p : max), mockProductions[0]);

const now = new Date();
const last7 = mockProductions.filter(p => {
  const diff = (now.getTime() - new Date(p.date).getTime()) / (1000 * 3600 * 24);
  return diff <= 7 && diff > 0;
}).reduce((s, p) => s + p.count, 0);
const prev7 = mockProductions.filter(p => {
  const diff = (now.getTime() - new Date(p.date).getTime()) / (1000 * 3600 * 24);
  return diff <= 14 && diff > 7;
}).reduce((s, p) => s + p.count, 0);
const weeklyGrowth = prev7 ? ((last7 - prev7) / prev7) * 100 : 0;

const variance = mockProductions.reduce((sum, p) => sum + Math.pow(p.count - avg, 2), 0) / mockProductions.length;
const consistency = variance < 100 ? 'Stable' : variance < 400 ? 'Moderate' : 'Fluctuating';

const chartData = mockProductions.map(p => ({ date: formatDate(p.date), count: p.count, fullDate: p.date }));

export default function Dashboard() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCount, setNewCount] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleAddProduction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCount || parseInt(newCount) <= 0) return;
    setSubmitting(true);
    setTimeout(() => {
      alert('Demo: record added (UI only). Backend not connected.');
      setSubmitting(false);
      setNewCount('');
      setIsAddModalOpen(false);
    }, 500);
  };

  return (
    <div className="px-6 md:px-10 py-8 bg-gray-50 min-h-screen">
      <div className="max-w-[1300px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Production Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Monitor daily egg output</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-base">add</span>
              Add Production
            </button>
            <Link
              to="/upload"
              className="px-4 py-2 border border-gray-300 bg-white text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">document_scanner</span>
              OCR Receipt
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Total Production */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition">
            <div className="flex justify-between items-start">
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Total Production</span>
              <span className="material-symbols-outlined text-gray-400 text-xl">egg</span>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold tracking-tight text-gray-900">{total.toLocaleString()}</span>
              <span className="text-sm text-gray-500 ml-1">eggs</span>
            </div>
            <div className="mt-1 text-xs text-gray-400">All time</div>
          </div>

          {/* Today's Production */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition">
            <div className="flex justify-between items-start">
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Today</span>
              <span className="material-symbols-outlined text-gray-400 text-xl">today</span>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-gray-900">{todayCount.toLocaleString()}</span>
              <span className={`text-xs ml-1.5 font-medium ${dailyChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {dailyChange >= 0 ? `+${dailyChange.toFixed(1)}%` : `${dailyChange.toFixed(1)}%`}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-1">vs yesterday</p>
          </div>

          {/* Average Daily Output */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition">
            <div className="flex justify-between items-start">
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Daily Avg</span>
              <span className="material-symbols-outlined text-gray-400 text-xl">bar_chart</span>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-gray-900">{avg.toLocaleString()}</span>
              <span className="text-sm text-gray-500 ml-1">eggs/day</span>
            </div>
          </div>

          {/* Peak Production */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition">
            <div className="flex justify-between items-start">
              <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Peak</span>
              <span className="material-symbols-outlined text-gray-400 text-xl">trending_up</span>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-gray-900">{maxEntry.count.toLocaleString()}</span>
              <p className="text-xs text-gray-400 mt-0.5">{formatDate(maxEntry.date)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="border-l-4 border-green-500 pl-4 py-1">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="material-symbols-outlined text-green-600 text-lg">show_chart</span>
              <span className="text-sm font-medium">Weekly Growth</span>
            </div>
            <div className="mt-2">
              <span className={`text-2xl font-bold ${weeklyGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {weeklyGrowth >= 0 ? `+${weeklyGrowth.toFixed(1)}%` : `${weeklyGrowth.toFixed(1)}%`}
              </span>
              <p className="text-xs text-gray-500 mt-1">vs previous 7 days</p>
            </div>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-1">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="material-symbols-outlined text-green-600 text-lg">assessment</span>
              <span className="text-sm font-medium">Consistency</span>
            </div>
            <div className="mt-2">
              <span className={`text-2xl font-bold ${consistency === 'Stable' ? 'text-green-600' : consistency === 'Moderate' ? 'text-yellow-600' : 'text-red-600'}`}>
                {consistency}
              </span>
              <p className="text-xs text-gray-500 mt-1">daily variance</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-12">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900">Production Trends</h3>
            <p className="text-gray-500 text-xs">Last {chartData.length} days</p>
          </div>
          <ResponsiveContainer width="100%" height={420}>
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} opacity={0.3} />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', padding: '6px 10px' }}
                labelFormatter={(label, payload) => payload?.[0]?.payload.fullDate || label}
                formatter={(value: any) => {
                  if (typeof value !== 'number') return ['0 eggs', 'Production'];
                  return [`${value.toLocaleString()} eggs`, 'Production'];
                }}
                cursor={{ stroke: '#22c55e', strokeWidth: 1, strokeDasharray: '4 4' }}
              />
              <Area type="monotone" dataKey="count" stroke="#22c55e" strokeWidth={2.5} fill="url(#colorCount)" dot={false} activeDot={{ r: 4, fill: '#22c55e', stroke: 'white', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-medium text-gray-900">Recent entries</h3>
            <Link to="/records" className="text-xs text-green-600 hover:text-green-700">View all →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs font-medium">
                <tr>
                  <th className="px-5 py-3">Date</th>
                  <th className="px-5 py-3">Eggs</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockProductions.slice(0, 8).map(prod => (
                  <tr key={prod.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-3.5 text-sm text-gray-700">{new Date(prod.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="px-5 py-3.5 text-sm font-medium text-gray-900">{prod.count.toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">Recorded</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add Production Record</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <form onSubmit={handleAddProduction}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().slice(0, 10)}
                      disabled
                      className="mt-1 w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500"
                    />
                    <p className="text-xs text-gray-400 mt-1">(Demo – backend not connected)</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Egg Count</label>
                    <input
                      type="number"
                      value={newCount}
                      onChange={e => setNewCount(e.target.value)}
                      required
                      min="1"
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                      placeholder="e.g., 1250"
                    />
                  </div>
                </div>
                <div className="mt-6 flex gap-3 justify-end">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="submit" disabled={submitting} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50">
                    {submitting ? 'Saving...' : 'Save Record'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}