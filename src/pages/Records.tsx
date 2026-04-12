import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Azure Backend URL
const API_BASE_URL = 'https://lumina-backend-e7cjgdhte6hdg9by.southeastasia-01.azurewebsites.net';

// Temporary mock data until the GET endpoint is fully wired
const initialRecords = [
  { id: '1', date: '2026-04-12', category: 'Income', amount: 1500.00, itemName: 'Duck Egg Sales - Market A', status: 'Verified' },
  { id: '2', date: '2026-04-11', category: 'Expense', amount: 350.50, itemName: 'Premium Feed - 50kg', status: 'Pending' },
  { id: '3', date: '2026-04-10', category: 'Expense', amount: 120.00, itemName: 'Veterinary Supplies', status: 'Verified' },
  { id: '4', date: '2026-04-09', category: 'Income', amount: 850.00, itemName: 'Duck Egg Sales - Local Vendor', status: 'Verified' },
  { id: '5', date: '2026-04-08', category: 'Expense', amount: 45.00, itemName: 'Barn Maintenance Tools', status: 'Verified' },
];

export default function Records() {
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'All' | 'Income' | 'Expense'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Fetch data from Azure Backend
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // NOTE: Replace '/records' with your actual ledger endpoint if you have one.
        // I noticed your Swagger had POST /ocr/income but didn't show a GET for the ledger.
        // If you don't have a GET yet, this will safely fallback to the mock data.
        const response = await fetch(`${API_BASE_URL}/records`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        if (data && Array.isArray(data)) {
          setRecords(data);
        } else {
          setRecords(initialRecords);
        }
      } catch (error) {
        console.error("Failed to fetch from backend, using fallback data.");
        setRecords(initialRecords);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // Filter logic
  const filteredRecords = records.filter(record => {
    const matchesTab = activeTab === 'All' || record.category === activeTab;
    const matchesSearch = record.itemName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#FDFBF7]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] text-[#1A2E22] font-['Inter',sans-serif] min-h-screen px-6 md:px-10 py-8 selection:bg-[#D1E8DA] selection:text-[#0B1A13]">
      <div className="max-w-[1300px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="font-['Manrope',sans-serif] text-3xl md:text-4xl font-bold tracking-tight text-[#0B1A13]">Financial Ledger</h1>
            <p className="text-[#4A5D52] text-sm mt-2 font-light max-w-lg">Track all OCR-processed income and expenses to monitor your farm's cash flow.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative w-full sm:w-auto">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#7D8F85] text-lg">search</span>
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 bg-white border border-[#E8F2EC] rounded-xl py-2.5 pl-11 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-[#0B1A13] placeholder:text-[#7D8F85] shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
              />
            </div>
            
            <Link 
              to="/upload" 
              className="w-full sm:w-auto px-6 py-2.5 bg-emerald-600 text-white text-sm font-bold rounded-xl hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 shadow-[0_4px_14px_0_rgba(16,185,129,0.39)]"
            >
              <span className="material-symbols-outlined text-lg">document_scanner</span>
              Upload Receipt
            </Link>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-[#E8F2EC] pb-px">
          {['All', 'Income', 'Expense'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-5 py-2.5 text-sm font-bold rounded-t-xl transition-colors relative ${
                activeTab === tab 
                  ? 'text-emerald-600 bg-white border-t border-l border-r border-[#E8F2EC]' 
                  : 'text-[#7D8F85] hover:text-[#0B1A13] hover:bg-white/50'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute -bottom-px left-0 right-0 h-0.5 bg-white"></div>
              )}
            </button>
          ))}
        </div>

        {/* Data Table */}
        <section className="bg-white rounded-b-3xl rounded-tr-3xl border border-[#E8F2EC] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#FDFBF7]/50 border-b border-[#E8F2EC]">
                <tr className="text-[#7D8F85] text-xs font-bold uppercase tracking-wider">
                  <th className="py-5 px-8">Date</th>
                  <th className="py-5 px-6">Item Description</th>
                  <th className="py-5 px-6">Category</th>
                  <th className="py-5 px-6">Status</th>
                  <th className="py-5 px-8 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8F2EC]">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <tr key={record.id} className="group hover:bg-[#FDFBF7] transition-colors">
                      <td className="py-5 px-8 text-sm font-medium text-[#4A5D52]">
                        {formatDate(record.date)}
                      </td>
                      <td className="py-5 px-6">
                        <p className="font-bold text-[#0B1A13] text-sm">{record.itemName}</p>
                        {/* Optional subtitle space */}
                      </td>
                      <td className="py-5 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${
                          record.category === 'Income' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                            : 'bg-orange-50 text-orange-700 border-orange-100'
                        }`}>
                          {record.category}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-1.5 text-[#7D8F85] text-xs font-medium">
                          <span className={`material-symbols-outlined text-[16px] ${
                            record.status === 'Verified' ? 'text-emerald-500' : 'text-yellow-500'
                          }`}>
                            {record.status === 'Verified' ? 'check_circle' : 'pending'}
                          </span>
                          {record.status}
                        </div>
                      </td>
                      <td className={`py-5 px-8 text-right font-['Manrope',sans-serif] font-extrabold text-base ${
                        record.category === 'Income' ? 'text-emerald-600' : 'text-[#0B1A13]'
                      }`}>
                        {record.category === 'Income' ? '+' : '-'}${record.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-16 text-center text-[#7D8F85]">
                      <span className="material-symbols-outlined text-4xl mb-3 text-[#C3D9CE]">receipt_long</span>
                      <p className="font-bold text-lg text-[#0B1A13]">No records found</p>
                      <p className="text-sm mt-1">Try adjusting your filters or upload a new receipt.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          {filteredRecords.length > 0 && (
            <div className="border-t border-[#E8F2EC] py-4 px-8 flex justify-between items-center text-xs font-bold text-[#7D8F85]">
              <span>Showing {filteredRecords.length} records</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#FDFBF7] border border-[#E8F2EC] hover:bg-[#E8F2EC] transition-colors text-[#0B1A13]">
                  <span className="material-symbols-outlined text-base">chevron_left</span>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm font-bold">1</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#FDFBF7] border border-[#E8F2EC] hover:bg-[#E8F2EC] transition-colors text-[#0B1A13] font-bold">2</button>
                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#FDFBF7] border border-[#E8F2EC] hover:bg-[#E8F2EC] transition-colors text-[#0B1A13]">
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-12 w-full flex flex-col md:flex-row justify-between items-center py-8 border-t border-[#E8F2EC]">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <p className="text-xs uppercase tracking-widest text-[#7D8F85] font-bold">© 2026 Lumina Tech. All rights reserved.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-xs uppercase tracking-widest text-[#7D8F85] font-bold hover:text-emerald-600 transition-colors">Privacy</a>
            <a href="#" className="text-xs uppercase tracking-widest text-[#7D8F85] font-bold hover:text-emerald-600 transition-colors">Terms</a>
            <a href="#" className="text-xs uppercase tracking-widest text-[#7D8F85] font-bold hover:text-emerald-600 transition-colors">Contact</a>
          </div>
        </footer>
        
      </div>
    </div>
  );
}