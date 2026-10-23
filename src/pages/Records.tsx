import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { formatRupiah } from '../utils/formatRupiah';
import ConfirmDialog from '../components/ConfirmDialog';
import Toast, { type ToastState } from '../components/Toast';
import { apiFetch } from '../services/apiClient';

const PAGE_SIZE = 10;

export default function Records() {
  const [records, setRecords] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [activeTab, setActiveTab] = useState<'All' | 'Income' | 'Expense'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const [recordToDelete, setRecordToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const dismissToast = useCallback(() => setToast(null), []);

  const loadRecords = useCallback(async () => {
    setIsFetching(true);
    try {
      const params = new URLSearchParams({
        limit: String(PAGE_SIZE),
        offset: String(page * PAGE_SIZE),
      });
      if (activeTab !== 'All') params.set('category', activeTab);
      if (debouncedSearch.trim()) params.set('q', debouncedSearch.trim());

      const response = await apiFetch(`/records/?${params.toString()}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();

      setRecords(Array.isArray(data.records) ? data.records : []);
      setTotal(Number(data.total) || 0);
    } catch (error) {
      console.error("Failed to fetch from backend:", error);
      setRecords([]);
      setTotal(0);
    } finally {
      setIsFetching(false);
      setIsLoading(false);
    }
  }, [activeTab, debouncedSearch, page]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(0);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const confirmDelete = async () => {
    if (!recordToDelete) return;
    
    setIsDeleting(true);
    try {
      const response = await apiFetch(`/records/${recordToDelete}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete record');
      }

      if (expandedId === recordToDelete) setExpandedId(null);
      if (records.length === 1 && page > 0) {
        setPage(page - 1);
      } else {
        await loadRecords();
      }
      
      setToast({ message: "Record successfully deleted.", type: 'success' });
    } catch (error) {
      console.error("Delete error:", error);
      setToast({ message: "Failed to delete record. Please try again.", type: 'error' });
    } finally {
      setIsDeleting(false);
      setRecordToDelete(null);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
    <div className="bg-[#FDFBF7] text-[#1A2E22] font-['Inter',sans-serif] min-h-screen px-4 md:px-10 py-6 md:py-8 selection:bg-[#D1E8DA] selection:text-[#0B1A13]">
      <div className="max-w-[1300px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col relative">
        
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-10">
          <div>
            <h1 className="font-['Manrope',sans-serif] text-3xl md:text-4xl font-bold tracking-tight text-[#0B1A13]">Financial Ledger</h1>
            <p className="text-[#4A5D52] text-sm mt-2 font-light max-w-lg">Track all OCR-processed income and expenses to monitor your farm's cash flow.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center w-full md:w-auto">
            <div className="relative w-full sm:w-auto">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#7D8F85] text-lg">search</span>
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                maxLength={100}
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

        <div className="flex gap-2 mb-6 border-b border-[#E8F2EC] pb-px overflow-x-auto no-scrollbar">
          {['All', 'Income', 'Expense'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab as any);
                setPage(0);
              }}
              className={`px-5 py-2.5 text-sm font-bold rounded-t-xl transition-colors relative whitespace-nowrap ${
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
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="bg-[#FDFBF7]/50 border-b border-[#E8F2EC]">
                <tr className="text-[#7D8F85] text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 md:py-5 px-4 md:px-8 w-10"></th> 
                  <th className="py-4 md:py-5 px-4">Date</th>
                  <th className="py-4 md:py-5 px-4 md:px-6">Summary</th>
                  <th className="py-4 md:py-5 px-4 md:px-6">Category</th>
                  <th className="py-4 md:py-5 px-4 md:px-6">Status</th>
                  <th className="py-4 md:py-5 px-4 md:px-8 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8F2EC]">
                {records.length > 0 ? (
                  records.map((record, index) => (
                    <React.Fragment key={record.id || index}>
                      <tr 
                        onClick={() => toggleExpand(record.id)}
                        className="group hover:bg-[#FDFBF7] transition-colors cursor-pointer"
                      >
                        <td className="py-4 md:py-5 pl-4 md:pl-8 pr-2 md:pr-4 text-[#7D8F85]">
                           <span className={`material-symbols-outlined transition-transform duration-200 ${expandedId === record.id ? 'rotate-180' : ''}`}>
                             expand_more
                           </span>
                        </td>
                        <td className="py-4 md:py-5 px-4 text-xs md:text-sm font-medium text-[#4A5D52]">
                          {formatDate(record.date)}
                        </td>
                        <td className="py-4 md:py-5 px-4 md:px-6">
                          <p className="font-bold text-[#0B1A13] text-xs md:text-sm">
                            {record.items && record.items.length > 1 ? `${record.items.length} Items` : (record.itemName || 'Unknown Item')}
                          </p>
                        </td>
                        <td className="py-4 md:py-5 px-4 md:px-6">
                          <span className={`inline-flex items-center px-2 py-1 md:px-2.5 md:py-1 rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-widest border ${
                            record.category === 'Income' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                              : 'bg-orange-50 text-orange-700 border-orange-100'
                          }`}>
                            {record.category || 'Uncategorized'}
                          </span>
                        </td>
                        <td className="py-4 md:py-5 px-4 md:px-6">
                          <div className="flex items-center gap-1 md:gap-1.5 text-[#7D8F85] text-[10px] md:text-xs font-medium">
                            <span className={`material-symbols-outlined text-[14px] md:text-[16px] ${
                              record.status === 'Verified' ? 'text-emerald-500' : 'text-yellow-500'
                            }`}>
                              {record.status === 'Verified' ? 'check_circle' : 'pending'}
                            </span>
                            {record.status || 'Pending'}
                          </div>
                        </td>
                        <td className={`py-4 md:py-5 px-4 md:px-8 text-right font-['Manrope',sans-serif] font-extrabold text-sm md:text-base ${
                          record.category === 'Income' ? 'text-emerald-600' : 'text-[#0B1A13]'
                        }`}>
                          {record.category === 'Income' ? '+' : '-'}{formatRupiah(Number(record.amount || 0), { decimals: 2 })}
                        </td>
                      </tr>

                      {expandedId === record.id && (
                        <tr className="bg-[#FDFBF7]">
                          <td colSpan={6} className="py-4 md:py-6 px-4 md:px-8 lg:px-12 border-b border-[#E8F2EC]">
                            <div className="bg-white rounded-xl border border-[#E8F2EC] p-4 md:p-5 shadow-sm">
                              
                              <div className="flex justify-between items-start mb-4 md:mb-6">
                                <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#7D8F85]">Record Details</h4>
                                <button 
                                  onClick={() => setRecordToDelete(record.id)}
                                  className="flex items-center gap-1 md:gap-1.5 text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-red-600 bg-red-50 border border-red-100 hover:bg-red-500 hover:text-white px-2 md:px-3 py-1 md:py-1.5 rounded-lg transition-all shadow-sm"
                                >
                                  <span className="material-symbols-outlined text-[12px] md:text-[14px]">delete</span>
                                  Delete
                                </button>
                              </div>
                              
                              <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                                {(record.image_url || record.imageUrl) && (
                                  <div className="w-full lg:w-1/3 flex-shrink-0">
                                    <div className="bg-slate-50 rounded-xl border border-[#E8F2EC] overflow-hidden flex justify-center max-h-[300px] md:max-h-[500px]">
                                      <img 
                                        src={record.image_url || record.imageUrl} 
                                        alt="Original Receipt" 
                                        className="object-contain w-full h-auto"
                                      />
                                    </div>
                                    <p className="text-center text-[9px] md:text-[10px] uppercase font-bold text-[#7D8F85] tracking-widest mt-3">Original Image Reference</p>
                                  </div>
                                )}

                                <div className={`w-full overflow-x-auto ${record.image_url || record.imageUrl ? 'lg:w-2/3' : ''}`}>
                                  {record.items && record.items.length > 0 ? (
                                    <table className="w-full text-xs md:text-sm min-w-[300px]">
                                      <thead>
                                        <tr className="text-[#7D8F85] border-b border-[#E8F2EC] text-left">
                                          <th className="pb-2 md:pb-3 font-medium w-10 md:w-16">Qty</th>
                                          <th className="pb-2 md:pb-3 font-medium">Item Name</th>
                                          <th className="pb-2 md:pb-3 text-right font-medium">Price</th>
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-[#E8F2EC]/50">
                                        {record.items.map((item: any, i: number) => (
                                          <tr key={i}>
                                            <td className="py-2.5 md:py-3.5 text-[#4A5D52]">{item.quantity || 1}x</td>
                                            <td className="py-2.5 md:py-3.5 font-bold text-[#0B1A13]">
                                              {item.item_name || item.name || item.itemName || 'Unknown Item'}
                                            </td>
                                            <td className="py-2.5 md:py-3.5 text-right font-bold text-[#0B1A13]">
                                              {formatRupiah(item.sub_price || item.price || 0, { decimals: 2 })}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                      <tfoot className="border-t-2 border-[#E8F2EC]">
                                        <tr>
                                          <td colSpan={2} className="py-3 md:py-4 text-right text-[#7D8F85] font-bold text-[10px] md:text-xs uppercase tracking-widest">Total</td>
                                          <td className="py-3 md:py-4 text-right font-bold text-[#0B1A13] text-sm md:text-base">{formatRupiah(Number(record.amount || 0), { decimals: 2 })}</td>
                                        </tr>
                                      </tfoot>
                                    </table>
                                  ) : (
                                    <div className="text-xs md:text-sm text-[#4A5D52] p-3 md:p-4 bg-slate-50 rounded-lg border border-[#E8F2EC]">
                                      <p className="font-bold text-[#0B1A13]">{record.itemName}</p>
                                      <p className="text-[10px] md:text-xs text-[#7D8F85] mt-1 md:mt-2 italic flex items-center gap-1 md:gap-1.5">
                                        <span className="material-symbols-outlined text-[12px] md:text-[14px]">info</span>
                                        Only summary data available for this record.
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>

                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 md:py-16 text-center text-[#7D8F85]">
                      <span className="material-symbols-outlined text-4xl mb-3 text-[#C3D9CE]">receipt_long</span>
                      <p className="font-bold text-lg text-[#0B1A13]">No records found</p>
                      <p className="text-sm mt-1">Try adjusting your filters or upload a new receipt.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 md:px-8 py-4 border-t border-[#E8F2EC] bg-[#FDFBF7]/40">
            <p className="text-xs text-[#7D8F85] font-medium">
              {total === 0
                ? 'No records'
                : `Showing ${page * PAGE_SIZE + 1}-${Math.min((page + 1) * PAGE_SIZE, total)} of ${total}`}
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPage((current) => Math.max(0, current - 1))}
                disabled={page === 0 || isFetching}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-[#E8F2EC] bg-white text-[#0B1A13] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FDFBF7] transition-colors"
              >
                Previous
              </button>
              <span className="text-xs text-[#7D8F85] font-bold whitespace-nowrap">
                Page {page + 1} of {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setPage((current) => Math.min(totalPages - 1, current + 1))}
                disabled={page + 1 >= totalPages || isFetching}
                className="px-4 py-2 text-xs font-bold rounded-lg border border-[#E8F2EC] bg-white text-[#0B1A13] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FDFBF7] transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <footer className="mt-8 md:mt-12 w-full flex flex-col md:flex-row justify-between items-center py-6 md:py-8 border-t border-[#E8F2EC]">
          <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#7D8F85] font-bold">© 2026 Lumina Tech. All rights reserved.</p>
          </div>
          <div className="flex gap-6 md:gap-8">
            <a href="#" className="text-[10px] md:text-xs uppercase tracking-widest text-[#7D8F85] font-bold hover:text-emerald-600 transition-colors">Privacy</a>
            <a href="#" className="text-[10px] md:text-xs uppercase tracking-widest text-[#7D8F85] font-bold hover:text-emerald-600 transition-colors">Terms</a>
            <a href="#" className="text-[10px] md:text-xs uppercase tracking-widest text-[#7D8F85] font-bold hover:text-emerald-600 transition-colors">Contact</a>
          </div>
        </footer>

      </div>

      {recordToDelete && (
        <ConfirmDialog
          title="Delete Record?"
          body="This action cannot be undone. Are you sure you want to permanently remove this record from your ledger?"
          confirmLabel="Delete"
          loadingLabel="Deleting..."
          icon="warning"
          tone="red"
          loading={isDeleting}
          onCancel={() => setRecordToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}

      <Toast toast={toast} onDismiss={dismissToast} />

    </div>
  );
}