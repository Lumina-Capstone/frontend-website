import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://lumina-backend-e7cjgdhte6hdg9by.southeastasia-01.azurewebsites.net';

export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [receiptType, setReceiptType] = useState<'income' | 'expenses'>('expenses');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      alert('Please upload an image file (JPG, PNG).');
      return;
    }
    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const clearSelection = () => {
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file); 

    try {
      const response = await fetch(`${API_BASE_URL}/ocr/${receiptType}`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('OCR Processing failed');
      }

      const data = await response.json();
      console.log("OCR Success:", data);
      
      alert("Receipt processed successfully!");
      navigate('/records');

    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to process receipt. Make sure the backend is running and the ML models are loaded.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-[#FDFBF7] text-[#1A2E22] font-['Inter',sans-serif] min-h-screen px-6 md:px-10 py-8 selection:bg-[#D1E8DA] selection:text-[#0B1A13]">
      <div className="max-w-[1000px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col">
        
        <header className="flex flex-col mb-12">
          <h1 className="font-['Manrope',sans-serif] text-3xl md:text-4xl font-bold tracking-tight text-[#0B1A13]">OCR Upload</h1>
          <p className="text-[#4A5D52] text-sm mt-2 font-light max-w-lg">Digitalize your physical farm records instantly.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="md:col-span-2 bg-white rounded-3xl border border-[#E8F2EC] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7D8F85] mb-3 block">Precision Processing</span>
              <h3 className="font-['Manrope',sans-serif] text-2xl font-extrabold text-[#0B1A13] mb-3">
                Fast, Accurate Extraction.
              </h3>
              <p className="text-[#4A5D52] text-sm max-w-md leading-relaxed">
                Our proprietary neural engine identifies line items, quantities, and totals with high accuracy in seconds.
              </p>
            </div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-bl-full -mr-10 -mt-10"></div>
          </div>

          <div className="bg-[#11241A] rounded-3xl p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/20 blur-2xl rounded-full"></div>
            <span className="material-symbols-outlined text-emerald-400 text-4xl mb-4 relative z-10">memory</span>
            <div className="relative z-10">
              <div className="font-['Manrope',sans-serif] text-xl font-bold text-white mb-1">Smart Vision</div>
              <div className="text-xs text-[#8EA698] font-medium">Cloud-accelerated processing</div>
            </div>
          </div>
        </div>

        <div className="mb-6 flex justify-center">
          <div className="bg-white p-1 rounded-xl border border-[#E8F2EC] inline-flex shadow-sm">
            <button
              onClick={() => setReceiptType('expenses')}
              className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${
                receiptType === 'expenses'
                  ? 'bg-orange-50 text-orange-700 shadow-sm'
                  : 'text-[#7D8F85] hover:text-[#0B1A13]'
              }`}
            >
              Expense Receipt
            </button>
            <button
              onClick={() => setReceiptType('income')}
              className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${
                receiptType === 'income'
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                  : 'text-[#7D8F85] hover:text-[#0B1A13]'
              }`}
            >
              Income Receipt
            </button>
          </div>
        </div>

        <section className="bg-white rounded-3xl border border-[#E8F2EC] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-12">
          {!file ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-16 flex flex-col items-center justify-center text-center transition-all duration-200 ${
                isDragging
                  ? 'border-emerald-500 bg-emerald-50'
                  : 'border-[#C3D9CE] hover:border-emerald-400 hover:bg-[#FDFBF7]'
              }`}
            >
              <input
                type="file"
                accept="image/jpeg, image/png, image/jpg"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileInput}
              />
              
              <div className="w-20 h-20 bg-[#FDFBF7] border border-[#E8F2EC] shadow-sm rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-4xl text-emerald-600">add_photo_alternate</span>
              </div>
              
              <h4 className="font-['Manrope',sans-serif] text-xl font-bold text-[#0B1A13] mb-2">
                Drag and drop your receipt here
              </h4>
              <p className="text-[#7D8F85] text-sm mb-8 max-w-sm">
                Supports JPG and PNG up to 10MB. Ensure text is clearly visible and well-lit.
              </p>
              
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-emerald-600 text-white px-8 py-3.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/20 transition-all active:scale-95"
              >
                <span className="material-symbols-outlined text-lg">folder_open</span>
                Browse Files
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center pt-4 pb-8">
              <div className="relative mb-8 max-w-sm w-full rounded-2xl overflow-hidden shadow-lg border border-[#E8F2EC]">
                <img src={previewUrl!} alt="Receipt preview" className="w-full h-auto max-h-[400px] object-contain bg-slate-50" />
                <button
                  onClick={clearSelection}
                  disabled={isUploading}
                  className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1A2E22] hover:bg-white hover:text-red-500 shadow-sm transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              <div className="text-center mb-8">
                <p className="font-bold text-[#0B1A13]">{file.name}</p>
                <p className="text-xs text-[#7D8F85] mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>

              <button
                onClick={handleUpload}
                disabled={isUploading}
                className="w-full max-w-sm bg-emerald-600 text-white py-4 rounded-xl font-bold transition-all shadow-sm hover:bg-emerald-500 hover:shadow-lg hover:shadow-emerald-600/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-lg">autorenew</span>
                    Processing OCR...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">memory</span>
                    Extract {receiptType === 'income' ? 'Income' : 'Expense'} Data
                  </>
                )}
              </button>
            </div>
          )}

          <div className="mt-8 flex items-center justify-center gap-8 border-t border-[#E8F2EC] pt-6">
            <div className="flex items-center gap-2 text-[#7D8F85]">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span className="text-xs font-bold uppercase tracking-widest">Encrypted</span>
            </div>
            <div className="flex items-center gap-2 text-[#7D8F85]">
              <span className="material-symbols-outlined text-[18px]">history</span>
              <span className="text-xs font-bold uppercase tracking-widest">Auto-Archived</span>
            </div>
          </div>
        </section>

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