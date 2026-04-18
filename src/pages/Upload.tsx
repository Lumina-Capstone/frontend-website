import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://agungibr-lumina-ml-capstone.hf.space/';

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [receiptType, setReceiptType] = useState<'income' | 'expenses'>('expenses');
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) handleFileSelect(e.target.files[0]);
  };

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG).');
      return;
    }
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
    setIsVerifying(false); 
  };

  const clearSelection = () => {
    setFile(null);
    setPreviewUrl(null);
    setIsVerifying(false);
    setExtractedData(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file); 

    try {
      const response = await fetch(`${API_BASE_URL}ocr/${receiptType}`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('OCR Processing failed');
      
      const data = await response.json();
      
      setExtractedData(data.data);
      setIsVerifying(true);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to process receipt. Check browser console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleItemEdit = (index: number, field: string, value: any) => {
    const updatedData = { ...extractedData };
    updatedData.items[index][field] = value;
    
    const newTotal = updatedData.items.reduce((sum: number, item: any) => {
      return sum + Number(item.price || item.sub_price || 0);
    }, 0);
    updatedData.amount = newTotal;
    
    setExtractedData(updatedData);
  };

  const handleConfirmSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}ocr/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(extractedData),
      });
      
      if (!response.ok) throw new Error('Failed to save to database');
      
      alert("Receipt verified and saved successfully!");
      navigate('/records');
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save the verified data.");
    } finally {
      setIsSaving(false);
    }
  };

  const formatRupiah = (value: number) => {
    if (isNaN(value)) return 'Rp 0';
    return 'Rp ' + Number(value).toLocaleString('en-US');
  };

  return (
    <div className="bg-[#FDFBF7] text-[#1A2E22] font-['Inter',sans-serif] min-h-screen px-6 md:px-10 py-8 selection:bg-[#D1E8DA] selection:text-[#0B1A13]">
      <div className="max-w-[1200px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col">
        
        <header className="flex flex-col mb-12">
          <h1 className="font-['Manrope',sans-serif] text-3xl md:text-4xl font-bold tracking-tight text-[#0B1A13]">OCR Upload</h1>
          <p className="text-[#4A5D52] text-sm mt-2 font-light max-w-lg">Digitalize and verify your physical farm records.</p>
        </header>

        {isVerifying && extractedData ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12 items-start">
            <div className="bg-white rounded-3xl border border-[#E8F2EC] p-6 shadow-sm sticky top-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#7D8F85]">Original Receipt</span>
                <button onClick={clearSelection} className="text-red-500 hover:text-red-700 text-sm font-bold transition-colors">Discard</button>
              </div>
              {/* <div className="bg-slate-50 rounded-xl border border-[#E8F2EC] overflow-hidden flex justify-center max-h-[600px]"> */}
              <div className="bg-slate-50 rounded-xl border border-[#E8F2EC] overflow-y-auto max-h-[600px] no-scrollbar">
                {/* <img src={previewUrl!} alt="Original Receipt" className="object-contain w-full h-full" /> */}
                <img src={previewUrl!} alt="Original Receipt" className="w-full h-auto block" />
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#E8F2EC] p-8 shadow-sm">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h3 className="font-['Manrope',sans-serif] text-2xl font-extrabold text-[#0B1A13]">Verify Extraction</h3>
                  <p className="text-[#7D8F85] text-sm mt-1">Review and correct the detected items before saving.</p>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#7D8F85] mb-1">Detected Total</span>
                  <span className="font-bold text-xl text-emerald-600">{formatRupiah(extractedData.amount)}</span>
                </div>
              </div>

              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 no-scrollbar mb-8">
                {extractedData.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-3 items-center bg-[#FDFBF7] p-3 rounded-xl border border-[#E8F2EC]">
                    <div className="w-16 shrink-0">
                      <label className="block text-[10px] font-bold uppercase text-[#7D8F85] mb-1">Qty</label>
                      <input 
                        type="number" 
                        value={item.quantity || 1} 
                        onChange={(e) => handleItemEdit(idx, 'quantity', parseInt(e.target.value) || 0)}
                        className="w-full bg-white border border-[#E8F2EC] rounded-lg px-3 py-2 text-sm focus:border-emerald-500 outline-none"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-[10px] font-bold uppercase text-[#7D8F85] mb-1">Item Description</label>
                      <input 
                        type="text" 
                        value={item.item_name || item.name || ''} 
                        onChange={(e) => handleItemEdit(idx, 'item_name', e.target.value)}
                        className="w-full bg-white border border-[#E8F2EC] rounded-lg px-3 py-2 text-sm focus:border-emerald-500 outline-none font-bold"
                      />
                    </div>
                    <div className="w-32 shrink-0">
                      <label className="block text-[10px] font-bold uppercase text-[#7D8F85] mb-1">Price (Rp)</label>
                      <input 
                        type="number" 
                        value={item.price || item.sub_price || 0} 
                        onChange={(e) => handleItemEdit(idx, 'price', parseFloat(e.target.value) || 0)}
                        className="w-full bg-white border border-[#E8F2EC] rounded-lg px-3 py-2 text-sm focus:border-emerald-500 outline-none text-right font-bold text-emerald-700"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-6 border-t border-[#E8F2EC]">
                <button className="px-6 py-4 bg-indigo-50 text-indigo-600 font-bold text-sm rounded-xl hover:bg-indigo-100 transition-colors flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">auto_awesome</span>
                  AI Auto-Correct
                </button>
                <button
                  onClick={handleConfirmSave}
                  disabled={isSaving}
                  className="flex-1 bg-emerald-600 text-white py-4 rounded-xl font-bold transition-all shadow-sm hover:bg-emerald-500 hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <><span className="material-symbols-outlined animate-spin text-lg">autorenew</span> Saving to Ledger...</>
                  ) : (
                    <><span className="material-symbols-outlined text-lg">check_circle</span> Confirm & Save</>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-center">
              <div className="bg-white p-1 rounded-xl border border-[#E8F2EC] inline-flex shadow-sm">
                <button onClick={() => setReceiptType('expenses')} className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${receiptType === 'expenses' ? 'bg-orange-50 text-orange-700 shadow-sm' : 'text-[#7D8F85] hover:text-[#0B1A13]'}`}>Expense Receipt</button>
                <button onClick={() => setReceiptType('income')} className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${receiptType === 'income' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-[#7D8F85] hover:text-[#0B1A13]'}`}>Income Receipt</button>
              </div>
            </div>

            <section className="bg-white rounded-3xl border border-[#E8F2EC] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12 max-w-4xl mx-auto w-full">
              {!file ? (
                <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`border-2 border-dashed rounded-2xl p-16 flex flex-col items-center justify-center text-center transition-all duration-200 ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-[#C3D9CE] hover:border-emerald-400 hover:bg-[#FDFBF7]'}`}>
                  <input type="file" accept="image/jpeg, image/png, image/jpg" className="hidden" ref={fileInputRef} onChange={handleFileInput} />
                  <div className="w-20 h-20 bg-[#FDFBF7] border border-[#E8F2EC] shadow-sm rounded-full flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-4xl text-emerald-600">add_photo_alternate</span>
                  </div>
                  <h4 className="font-['Manrope',sans-serif] text-xl font-bold text-[#0B1A13] mb-2">Drag and drop your receipt here</h4>
                  <p className="text-[#7D8F85] text-sm mb-8 max-w-sm">Supports JPG and PNG up to 10MB.</p>
                  <button onClick={() => fileInputRef.current?.click()} className="bg-emerald-600 text-white px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-emerald-500 transition-all">
                    <span className="material-symbols-outlined text-lg">folder_open</span> Browse Files
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center pt-4 pb-8">
                  <div className="relative mb-8 max-w-sm w-full rounded-2xl overflow-hidden shadow-lg border border-[#E8F2EC]">
                    <img src={previewUrl!} alt="Receipt preview" className="w-full h-auto max-h-[400px] object-contain bg-slate-50" />
                    <button onClick={clearSelection} disabled={isUploading} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1A2E22] hover:bg-white hover:text-red-500 shadow-sm transition-colors disabled:opacity-50">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                  <div className="text-center mb-8">
                    <p className="font-bold text-[#0B1A13]">{file.name}</p>
                    <p className="text-xs text-[#7D8F85] mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button onClick={handleUpload} disabled={isUploading} className="w-full max-w-sm bg-emerald-600 text-white py-4 rounded-xl font-bold transition-all shadow-sm hover:bg-emerald-500 disabled:opacity-50 flex items-center justify-center gap-2">
                    {isUploading ? <><span className="material-symbols-outlined animate-spin text-lg">autorenew</span> Processing OCR...</> : <><span className="material-symbols-outlined text-lg">memory</span> Extract {receiptType === 'income' ? 'Income' : 'Expense'} Data</>}
                  </button>
                </div>
              )}
            </section>
          </>
        )}

        <footer className="mt-auto w-full flex flex-col md:flex-row justify-between items-center py-8 border-t border-[#E8F2EC]">
          <div className="mb-4 md:mb-0">
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