import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const API_BASE_URL = 'https://agungibr-lumina-ml-capstone.hf.space';

export default function Dashboard() {
  const [productions, setProductions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));
  const [newCount, setNewCount] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchProductions = useCallback(async (showSpinner = true) => {
    if (showSpinner) setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/produksi`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      
      if (data && Array.isArray(data.produksis)) {
        setProductions(data.produksis);
      } else if (Array.isArray(data)) {
        setProductions(data);
      } else {
        setProductions([]); 
      }
    } catch (error) {
      console.error("Failed to fetch from backend:", error);
      setProductions([]); 
    } finally {
      if (showSpinner) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProductions(true);
  }, [fetchProductions]);

  const stats = useMemo(() => {
    if (!productions || productions.length === 0) {
      return {
        total: 0, todayCount: 0, dailyChange: 0, avg: 0, 
        maxEntry: { count: 0, date: null }, weeklyGrowth: 0, 
        consistency: 'N/A', chartData: []
      };
    }

    const total = productions.reduce((s, p) => s + (p.count || 0), 0);
    const today = new Date().toISOString().slice(0, 10);
    
    const todayCount = productions.find(p => p.date ? p.date.startsWith(today) : false)?.count || 0;
    
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const yesterdayCount = productions.find(p => p.date ? p.date.startsWith(yesterday) : false)?.count || 0;
    const dailyChange = yesterdayCount ? ((todayCount - yesterdayCount) / yesterdayCount) * 100 : 0;
    
    const avg = Math.round(total / productions.length);
    const maxEntry = productions.reduce((max, p) => ((p.count || 0) > (max.count || 0) ? p : max), productions[0]);

    const now = new Date();
    const last7 = productions.filter(p => {
      if (!p.date) return false;
      const diff = (now.getTime() - new Date(p.date).getTime()) / (1000 * 3600 * 24);
      return diff <= 7 && diff >= 0;
    }).reduce((s, p) => s + (p.count || 0), 0);
    
    const prev7 = productions.filter(p => {
      if (!p.date) return false;
      const diff = (now.getTime() - new Date(p.date).getTime()) / (1000 * 3600 * 24);
      return diff <= 14 && diff > 7;
    }).reduce((s, p) => s + (p.count || 0), 0);
    
    const weeklyGrowth = prev7 ? ((last7 - prev7) / prev7) * 100 : 0;

    const variance = productions.reduce((sum, p) => sum + Math.pow((p.count || 0) - avg, 2), 0) / productions.length;
    const consistency = variance < 5000 ? 'Stable' : variance < 15000 ? 'Moderate' : 'Fluctuating';

    const chartData = productions
      .filter(p => p.date)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(p => ({ date: formatDate(p.date), count: p.count || 0, fullDate: p.date }));

    return { total, todayCount, dailyChange, avg, maxEntry, weeklyGrowth, consistency, chartData };
  }, [productions]);

  const handleAddProduction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCount || parseInt(newCount) <= 0) return;
    setSubmitting(true);
    
    const newRecord = {
      date: newDate, 
      count: parseInt(newCount)
    };

    try {
      const response = await fetch(`${API_BASE_URL}/produksi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecord),
      });

      if (!response.ok) throw new Error('Failed to save record');
      
      await fetchProductions(false); 
      
      setNewCount('');
      setNewDate(new Date().toISOString().slice(0, 10)); 
      setIsAddModalOpen(false);
    } catch (error) {
      console.error("Error saving record:", error);
      alert("Failed to save to backend. (Check console for details)");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDFBF7]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] text-[#1A2E22] font-['Inter',sans-serif] min-h-screen px-6 md:px-10 py-8 selection:bg-[#D1E8DA] selection:text-[#0B1A13]">
      <div className="max-w-[1300px] mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <h1 className="font-['Manrope',sans-serif] text-3xl md:text-4xl font-bold tracking-tight text-[#0B1A13]">Production Dashboard</h1>
            <p className="text-[#4A5D52] text-sm mt-2 font-light">Monitor daily farm output and metrics</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-500 transition-colors flex items-center gap-2 shadow-[0_4px_14px_0_rgba(16,185,129,0.39)]"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              Add Production
            </button>
            <Link
              to="/upload"
              className="px-5 py-2.5 border border-[#E8F2EC] bg-white text-[#1A2E22] text-sm font-bold rounded-xl hover:bg-[#F2EDE8] transition-colors flex items-center gap-2 shadow-sm"
            >
              <span className="material-symbols-outlined text-lg">document_scanner</span>
              OCR Receipt
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          <div className="bg-white rounded-3xl border border-[#E8F2EC] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start">
              <span className="text-[#7D8F85] text-xs font-bold uppercase tracking-wider">Total Production</span>
              <span className="material-symbols-outlined text-emerald-200 text-2xl">egg</span>
            </div>
            <div className="mt-4">
              <span className="font-['Manrope',sans-serif] text-3xl font-extrabold tracking-tight text-[#0B1A13]">{stats.total.toLocaleString()}</span>
              <span className="text-sm text-[#4A5D52] ml-1.5 font-light">units</span>
            </div>
            <div className="mt-1 text-xs text-[#7D8F85] font-medium">All time</div>
          </div>

          <div className="bg-white rounded-3xl border border-[#E8F2EC] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start">
              <span className="text-[#7D8F85] text-xs font-bold uppercase tracking-wider">Today</span>
              <span className="material-symbols-outlined text-emerald-200 text-2xl">today</span>
            </div>
            <div className="mt-4 flex items-baseline">
              <span className="font-['Manrope',sans-serif] text-3xl font-extrabold text-[#0B1A13]">{stats.todayCount.toLocaleString()}</span>
              <div className={`ml-2 flex items-center px-2 py-0.5 rounded-md text-xs font-bold ${stats.dailyChange >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {stats.dailyChange >= 0 ? `+${stats.dailyChange.toFixed(1)}%` : `${stats.dailyChange.toFixed(1)}%`}
              </div>
            </div>
            <p className="text-xs text-[#7D8F85] mt-1 font-medium">vs yesterday</p>
          </div>

          <div className="bg-white rounded-3xl border border-[#E8F2EC] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start">
              <span className="text-[#7D8F85] text-xs font-bold uppercase tracking-wider">Daily Avg</span>
              <span className="material-symbols-outlined text-emerald-200 text-2xl">bar_chart</span>
            </div>
            <div className="mt-4">
              <span className="font-['Manrope',sans-serif] text-3xl font-extrabold text-[#0B1A13]">{stats.avg.toLocaleString()}</span>
              <span className="text-sm text-[#4A5D52] ml-1.5 font-light">units/day</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#E8F2EC] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start">
              <span className="text-[#7D8F85] text-xs font-bold uppercase tracking-wider">Peak</span>
              <span className="material-symbols-outlined text-emerald-200 text-2xl">trending_up</span>
            </div>
            <div className="mt-4 flex flex-col">
              <span className="font-['Manrope',sans-serif] text-3xl font-extrabold text-[#0B1A13]">{stats.maxEntry.count.toLocaleString()}</span>
              <span className="text-sm text-emerald-600 font-medium mt-0.5">{stats.maxEntry.date ? formatDate(stats.maxEntry.date) : 'N/A'}</span>
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white rounded-3xl border border-[#E8F2EC] p-6 shadow-sm flex items-center gap-6">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center shrink-0">
               <span className="material-symbols-outlined text-emerald-600 text-2xl">show_chart</span>
            </div>
            <div>
              <div className="text-[#4A5D52] text-sm font-medium mb-1">Weekly Growth</div>
              <div className="flex items-baseline gap-2">
                <span className={`font-['Manrope',sans-serif] text-2xl font-extrabold ${stats.weeklyGrowth >= 0 ? 'text-[#0B1A13]' : 'text-red-600'}`}>
                  {stats.weeklyGrowth >= 0 ? `+${stats.weeklyGrowth.toFixed(1)}%` : `${stats.weeklyGrowth.toFixed(1)}%`}
                </span>
                <span className="text-xs text-[#7D8F85]">vs previous 7 days</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#E8F2EC] p-6 shadow-sm flex items-center gap-6">
            <div className="w-12 h-12 bg-[#F2EDE8] rounded-2xl flex items-center justify-center shrink-0">
               <span className="material-symbols-outlined text-[#7D8F85] text-2xl">assessment</span>
            </div>
            <div>
              <div className="text-[#4A5D52] text-sm font-medium mb-1">Consistency Rating</div>
              <div className="flex items-baseline gap-2">
                <span className={`font-['Manrope',sans-serif] text-2xl font-extrabold ${stats.consistency === 'Stable' ? 'text-emerald-600' : stats.consistency === 'Moderate' ? 'text-yellow-600' : 'text-red-600'}`}>
                  {stats.consistency}
                </span>
                <span className="text-xs text-[#7D8F85]">daily variance</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#E8F2EC] p-6 md:p-8 mb-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="mb-6">
            <h3 className="font-['Manrope',sans-serif] text-xl font-bold text-[#0B1A13]">Production Trends</h3>
            <p className="text-[#7D8F85] text-sm font-medium mt-1">Last {stats.chartData.length} days</p>
          </div>
          <div className="h-[420px] w-full">
            {stats.chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E8F2EC" vertical={false} opacity={0.6} />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#7D8F85', fontFamily: 'Inter' }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis tick={{ fontSize: 12, fill: '#7D8F85', fontFamily: 'Inter' }} axisLine={false} tickLine={false} dx={-10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#11241A', borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)', padding: '10px 14px', color: '#fff' }}
                    itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                    labelStyle={{ color: '#C3D9CE', fontSize: '12px', marginBottom: '4px' }}
                    labelFormatter={(label, payload) => payload?.[0]?.payload.fullDate || label}
                    formatter={(value: any) => [`${value.toLocaleString()} units`, 'Output']}
                    cursor={{ stroke: '#10b981', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#10b981" strokeWidth={3} fill="url(#colorCount)" dot={false} activeDot={{ r: 6, fill: '#10b981', stroke: '#fff', strokeWidth: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-[#7D8F85] bg-[#FDFBF7]/50 rounded-2xl border border-dashed border-[#E8F2EC]">
                <span className="material-symbols-outlined text-4xl mb-2 text-[#C3D9CE]">monitoring</span>
                <p className="font-medium">No data available to chart.</p>
                <p className="text-xs mt-1">Add a production record to see trends.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#E8F2EC] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="px-6 py-5 border-b border-[#E8F2EC] flex justify-between items-center bg-[#FDFBF7]/50">
            <h3 className="font-['Manrope',sans-serif] text-lg font-bold text-[#0B1A13]">Recent Entries</h3>
            {productions.length > 0 && (
              <Link to="/records" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors">View all →</Link>
            )}
          </div>
          <div className="overflow-x-auto">
            {productions.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead className="bg-white text-[#7D8F85] text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4 border-b border-[#E8F2EC]">Date</th>
                    <th className="px-6 py-4 border-b border-[#E8F2EC]">Output</th>
                    <th className="px-6 py-4 border-b border-[#E8F2EC]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8F2EC] bg-white">
                  {[...productions].filter(p => p.date).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5).map((prod, index) => (
                    <tr key={prod.id || index} className="hover:bg-[#FDFBF7] transition-colors group">
                      <td className="px-6 py-4 text-sm text-[#4A5D52] font-medium">{new Date(prod.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</td>
                      <td className="px-6 py-4 text-sm font-bold text-[#0B1A13]">{prod.count?.toLocaleString() || 0}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                          Recorded
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="px-6 py-12 text-center text-[#7D8F85]">
                <span className="material-symbols-outlined text-3xl mb-2 text-[#C3D9CE]">receipt_long</span>
                <p className="font-medium">Your record log is empty.</p>
              </div>
            )}
          </div>
        </div>

        {isAddModalOpen && (
          <div className="fixed inset-0 bg-[#0B1A13]/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-[#E8F2EC]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-['Manrope',sans-serif] text-2xl font-bold text-[#0B1A13]">Add Record</h3>
                <button onClick={() => setIsAddModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-[#FDFBF7] text-[#7D8F85] hover:bg-[#E8F2EC] hover:text-[#0B1A13] transition-colors">
                  <span className="material-symbols-outlined text-lg">close</span>
                </button>
              </div>
              
              <form onSubmit={handleAddProduction}>
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-[#1A2E22]">Date</label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={e => setNewDate(e.target.value)}
                      required
                      className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#E8F2EC] rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-200 outline-none text-[#0B1A13]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-sm font-medium text-[#1A2E22]">Total Output</label>
                    <input
                      type="number"
                      value={newCount}
                      onChange={e => setNewCount(e.target.value)}
                      required
                      min="1"
                      className="w-full px-4 py-3.5 bg-[#FDFBF7] border border-[#E8F2EC] rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all duration-200 outline-none text-[#0B1A13] placeholder:text-[#7D8F85]"
                      placeholder="e.g., 1250"
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsAddModalOpen(false)} 
                    className="flex-1 py-3.5 border border-[#E8F2EC] bg-white rounded-xl text-[#4A5D52] font-bold hover:bg-[#FDFBF7] transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={submitting} 
                    className="flex-1 py-3.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
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