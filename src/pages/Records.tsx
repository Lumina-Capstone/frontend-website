// FIX: Added 'React' to the import list to stop the white screen crash!
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const API_BASE_URL = 'https://agungibr-lumina-ml-capstone.hf.space/';

export default function Records() {
  const [records, setRecords] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'All' | 'Income' | 'Expense'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}records/`); 
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
        if (data && Array.isArray(data.records)) {
          setRecords(data.records);
        } else if (Array.isArray(data)) {
          setRecords(data);
        } else {
          setRecords([]);
        }
      } catch (error) {
        console.error("Failed to fetch from backend:", error);
        setRecords([]); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecords();
  }, []);

  const filteredRecords = records.filter(record => {
    const matchesTab = activeTab === 'All' || record.category === activeTab;
    const itemName = record.itemName || ''; 
    const matchesSearch = itemName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatRupiah = (value: number) => {
    if (isNaN(value)) return 'Rp 0.00';
    return 'Rp ' + Number(value).toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
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
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="font-['Manrope',sans-serif] text-3xl md:text-4xl font-bold tracking-tight text-[#0B1A13]">Financial Ledger</h1>
            <p className="text-[#4A5D52] text-sm mt-2 font-light max-w-lg">Track all OCR-processed income and expenses to monitor your farm's cash flow.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center">
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

        <section className="bg-white rounded-b-3xl rounded-tr-3xl border border-[#E8F2EC] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex-1">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#FDFBF7]/50 border-b border-[#E8F2EC]">
                <tr className="text-[#7D8F85] text-xs font-bold uppercase tracking-wider">
                  <th className="py-5 px-8 w-10"></th> 
                  <th className="py-5 px-4">Date</th>
                  <th className="py-5 px-6">Summary</th>
                  <th className="py-5 px-6">Category</th>
                  <th className="py-5 px-6">Status</th>
                  <th className="py-5 px-8 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8F2EC]">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record, index) => (
                    <React.Fragment key={record.id || index}>
                      {/* Main Row */}
                      <tr 
                        onClick={() => toggleExpand(record.id)}
                        className="group hover:bg-[#FDFBF7] transition-colors cursor-pointer"
                      >
                        <td className="py-5 pl-8 pr-4 text-[#7D8F85]">
                           <span className={`material-symbols-outlined transition-transform duration-200 ${expandedId === record.id ? 'rotate-180' : ''}`}>
                             expand_more
                           </span>
                        </td>
                        <td className="py-5 px-4 text-sm font-medium text-[#4A5D52]">
                          {formatDate(record.date)}
                        </td>
                        <td className="py-5 px-6">
                          <p className="font-bold text-[#0B1A13] text-sm">
                            {record.items && record.items.length > 1 ? `${record.items.length} Items` : (record.itemName || 'Unknown Item')}
                          </p>
                        </td>
                        <td className="py-5 px-6">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${
                            record.category === 'Income' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                              : 'bg-orange-50 text-orange-700 border-orange-100'
                          }`}>
                            {record.category || 'Uncategorized'}
                          </span>
                        </td>
                        <td className="py-5 px-6">
                          <div className="flex items-center gap-1.5 text-[#7D8F85] text-xs font-medium">
                            <span className={`material-symbols-outlined text-[16px] ${
                              record.status === 'Verified' ? 'text-emerald-500' : 'text-yellow-500'
                            }`}>
                              {record.status === 'Verified' ? 'check_circle' : 'pending'}
                            </span>
                            {record.status || 'Pending'}
                          </div>
                        </td>
                        <td className={`py-5 px-8 text-right font-['Manrope',sans-serif] font-extrabold text-base ${
                          record.category === 'Income' ? 'text-emerald-600' : 'text-[#0B1A13]'
                        }`}>
                          {record.category === 'Income' ? '+' : '-'}{formatRupiah(Number(record.amount || 0))}
                        </td>
                      </tr>

                      {expandedId === record.id && (
                        <tr className="bg-[#FDFBF7]">
                          <td colSpan={6} className="py-6 px-12 border-b border-[#E8F2EC]">
                            <div className="bg-white rounded-xl border border-[#E8F2EC] p-5 shadow-sm">
                              <h4 className="text-xs font-bold uppercase tracking-widest text-[#7D8F85] mb-4">Itemized Receipt Details</h4>
                              
                              {record.items && record.items.length > 0 ? (
                                <table className="w-full text-sm">
                                  <thead>
                                    <tr className="text-[#7D8F85] border-b border-[#E8F2EC] text-left">
                                      <th className="pb-2 font-medium w-16">Qty</th>
                                      <th className="pb-2 font-medium">Item Name</th>
                                      <th className="pb-2 text-right font-medium">Unit Price</th>
                                      <th className="pb-2 text-right font-medium">Subtotal</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-[#E8F2EC]/50">
                                    {record.items.map((item: any, i: number) => (
                                      <tr key={i}>
                                        <td className="py-3 text-[#4A5D52]">{item.quantity || 1}x</td>
                                        <td className="py-3 font-bold text-[#0B1A13]">{item.name || item.itemName || 'Unknown Item'}</td>
                                        <td className="py-3 text-right text-[#4A5D52]">{formatRupiah(item.price || 0)}</td>
                                        <td className="py-3 text-right font-bold text-[#0B1A13]">{formatRupiah(item.sub_price || item.price || 0)}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                  <tfoot className="border-t border-[#E8F2EC]">
                                    <tr>
                                      <td colSpan={3} className="py-3 text-right text-[#7D8F85] font-bold text-xs uppercase tracking-widest">Total</td>
                                      <td className="py-3 text-right font-bold text-[#0B1A13]">{formatRupiah(Number(record.amount || 0))}</td>
                                    </tr>
                                  </tfoot>
                                </table>
                              ) : (
                                <div className="text-sm text-[#4A5D52]">
                                  <p className="font-medium text-[#0B1A13]">{record.itemName}</p>
                                  <p className="text-xs text-[#7D8F85] mt-2 italic flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">info</span>
                                    Only summary data available for this record.
                                  </p>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-[#7D8F85]">
                      <span className="material-symbols-outlined text-4xl mb-3 text-[#C3D9CE]">receipt_long</span>
                      <p className="font-bold text-lg text-[#0B1A13]">No records found</p>
                      <p className="text-sm mt-1">Try adjusting your filters or upload a new receipt.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

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