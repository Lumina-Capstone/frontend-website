import { useState, useRef, useEffect } from 'react';
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
  const [isAutoCorrecting, setIsAutoCorrecting] = useState(false);

  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [isCameraMode, setIsCameraMode] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [hasFlash, setHasFlash] = useState(false);
  const [isFlashOn, setIsFlashOn] = useState(false);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setIsCameraMode(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      const videoTrack = stream.getVideoTracks()[0];
      const capabilities = videoTrack.getCapabilities?.();
      if (capabilities && ('torch' in capabilities)) {
        setHasFlash(true);
      } else {
        setHasFlash(false);
      }

    } catch (err) {
      console.error("Camera error:", err);
      setToast({ message: "Camera permission denied or unavailable. Please check browser settings.", type: 'error' });
      setIsCameraMode(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraMode(false);
    setIsFlashOn(false);
    setHasFlash(false);
  };

  const toggleFlash = async () => {
    if (!streamRef.current) return;
    const videoTrack = streamRef.current.getVideoTracks()[0];
    try {
      const newFlashState = !isFlashOn;
      await videoTrack.applyConstraints({
        advanced: [{ torch: newFlashState } as any]
      });
      setIsFlashOn(newFlashState);
    } catch (err) {
      console.error("Failed to toggle flash:", err);
      setToast({ message: "Could not toggle flashlight.", type: 'error' });
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) {
          const capturedFile = new File([blob], "camera-capture.jpg", { type: "image/jpeg" });
          handleFileSelect(capturedFile);
          stopCamera();
        }
      }, 'image/jpeg', 0.9);
    }
  };

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
      setToast({ message: 'Please upload an image file (JPG, PNG).', type: 'error' });
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
      setToast({ message: 'Extraction successful! Please verify the data.', type: 'success' });
    } catch (error) {
      console.error("Upload error:", error);
      setToast({ message: "Failed to process receipt. Check browser console for details.", type: 'error' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleItemEdit = (index: number, field: string, value: any) => {
    const updatedData = { ...extractedData };
    updatedData.items[index][field] = value;

    const item = updatedData.items[index];
    const qty = Number(item.quantity) || 1;
    const price = Number(item.price) || 0;
    item.sub_price = qty * price;

    const newTotal = updatedData.items.reduce((sum: number, it: any) => {
      return sum + (Number(it.sub_price) || (Number(it.quantity || 1) * Number(it.price || 0)));
    }, 0);
    updatedData.amount = newTotal;

    setExtractedData(updatedData);
  };

  const handleAddItem = () => {
    const updatedData = { ...extractedData };
    updatedData.items.push({ quantity: 1, item_name: '', price: 0, sub_price: 0 });
    setExtractedData(updatedData);
  };

  const handleRemoveItem = (index: number) => {
    const updatedData = { ...extractedData };
    updatedData.items.splice(index, 1);

    const newTotal = updatedData.items.reduce((sum: number, item: any) => {
      return sum + (Number(item.sub_price) || (Number(item.quantity || 1) * Number(item.price || 0)));
    }, 0);
    updatedData.amount = newTotal;

    setExtractedData(updatedData);
  };

  const handleAutoCorrect = async () => {
    setIsAutoCorrecting(true);
    try {
      const response = await fetch(`${API_BASE_URL}ocr/autocorrect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(extractedData),
      });

      if (!response.ok) throw new Error('AI Auto-correct failed');

      const data = await response.json();
      setExtractedData(data.data);
      setToast({ message: 'AI successfully cleaned the data.', type: 'success' });

    } catch (error) {
      console.error("AI error:", error);
      setToast({ message: "AI Auto-correct failed. Please edit manually.", type: 'error' });
    } finally {
      setIsAutoCorrecting(false);
    }
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

      setToast({ message: "Receipt verified and saved successfully!", type: 'success' });

      setTimeout(() => {
        navigate('/records');
      }, 1500);

    } catch (error) {
      console.error("Save error:", error);
      setToast({ message: "Failed to save the verified data.", type: 'error' });
      setIsSaving(false);
    }
  };

  const formatRupiah = (value: number) => {
    if (isNaN(value)) return 'Rp 0';
    return 'Rp ' + Number(value).toLocaleString('en-US');
  };

  return (
    <div className="bg-[#FDFBF7] text-[#1A2E22] font-['Inter',sans-serif] min-h-screen px-4 md:px-10 py-6 md:py-8 selection:bg-[#D1E8DA] selection:text-[#0B1A13]">
      <div className="max-w-[1200px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col relative">

        <header className="flex flex-col mb-8 md:mb-12">
          <h1 className="font-['Manrope',sans-serif] text-3xl md:text-4xl font-bold tracking-tight text-[#0B1A13]">OCR Upload</h1>
          <p className="text-[#4A5D52] text-sm mt-2 font-light max-w-lg">Digitalize and verify your physical farm records.</p>
        </header>

        {isVerifying && extractedData ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 items-start">
            <div className="bg-white rounded-3xl border border-[#E8F2EC] p-5 md:p-6 shadow-sm lg:sticky lg:top-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-[#7D8F85]">Original Receipt</span>
                <button onClick={clearSelection} className="text-red-500 hover:text-red-700 text-xs md:text-sm font-bold transition-colors">Discard</button>
              </div>
              <div className="bg-slate-50 rounded-xl border border-[#E8F2EC] overflow-y-auto max-h-[400px] md:max-h-[600px] no-scrollbar">
                <img src={previewUrl!} alt="Original Receipt" className="w-full h-auto block" />
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#E8F2EC] p-5 md:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6 md:mb-8">
                <div>
                  <h3 className="font-['Manrope',sans-serif] text-xl md:text-2xl font-extrabold text-[#0B1A13]">Verify Extraction</h3>
                  <p className="text-[#7D8F85] text-xs md:text-sm mt-1">Review and correct the detected items before saving.</p>
                </div>
                <div className="sm:text-right bg-emerald-50 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-emerald-100 sm:border-transparent">
                  <span className="block text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-emerald-800 sm:text-[#7D8F85] mb-1">Detected Total</span>
                  <span className="font-bold text-lg md:text-xl text-emerald-600">{formatRupiah(extractedData.amount)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-6 md:mb-8 bg-[#FDFBF7] p-3 md:p-4 rounded-xl border border-[#E8F2EC]">
                <span className="material-symbols-outlined text-lg text-[#7D8F85]">calendar_today</span>
                <div className="flex-1">
                  <label className="block text-[9px] md:text-[10px] font-bold uppercase text-[#7D8F85] mb-1">Transaction Date</label>
                  <input
                    type="date"
                    value={extractedData.date || ''}
                    onChange={(e) => setExtractedData({ ...extractedData, date: e.target.value })}
                    className="w-full bg-white border border-[#E8F2EC] rounded-lg px-3 py-2 text-sm focus:border-emerald-500 outline-none font-bold text-[#0B1A13]"
                  />
                </div>
              </div>

              <div className="space-y-4 max-h-[400px] md:max-h-[450px] overflow-y-auto pr-1 md:pr-2 no-scrollbar mb-4">
                {extractedData.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-3 sm:items-center bg-[#FDFBF7] p-3 md:p-4 rounded-xl border border-[#E8F2EC] relative group">
                    <div className="flex gap-3 w-full sm:w-auto flex-1">
                      <div className="w-14 sm:w-16 shrink-0">
                        <label className="block text-[9px] md:text-[10px] font-bold uppercase text-[#7D8F85] mb-1">Qty</label>
                        <input
                          type="number"
                          value={item.quantity || 1}
                          onChange={(e) => handleItemEdit(idx, 'quantity', parseInt(e.target.value) || 0)}
                          className="w-full bg-white border border-[#E8F2EC] rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm focus:border-emerald-500 outline-none"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-[9px] md:text-[10px] font-bold uppercase text-[#7D8F85] mb-1">Item Description</label>
                        <input
                          type="text"
                          value={item.item_name || item.name || ''}
                          onChange={(e) => handleItemEdit(idx, 'item_name', e.target.value)}
                          className="w-full bg-white border border-[#E8F2EC] rounded-lg px-2 sm:px-3 py-2 text-xs sm:text-sm focus:border-emerald-500 outline-none font-bold"
                        />
                      </div>
                    </div>

                    <div className="w-full sm:w-32 shrink-0">
                      <label className="block text-[9px] md:text-[10px] font-bold uppercase text-[#7D8F85] mb-1">Price (Rp)</label>
                      <input
                        type="number"
                        value={item.price || item.sub_price || 0}
                        onChange={(e) => handleItemEdit(idx, 'price', parseFloat(e.target.value) || 0)}
                        className="w-full bg-white border border-[#E8F2EC] rounded-lg px-3 py-2 text-sm focus:border-emerald-500 outline-none sm:text-right font-bold text-emerald-700"
                      />
                    </div>

                    <button
                      onClick={() => handleRemoveItem(idx)}
                      className="absolute -right-2 -top-2 w-6 h-6 bg-red-100 text-red-500 rounded-full flex items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-500 hover:text-white"
                      title="Remove Item"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={handleAddItem}
                className="w-full py-3 mb-6 md:mb-8 border-2 border-dashed border-[#C3D9CE] rounded-xl text-[#7D8F85] font-bold text-xs md:text-sm hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px] md:text-lg">add_circle</span>
                Add Tax, SVC, or Missing Item
              </button>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6 border-t border-[#E8F2EC]">
                <button
                  onClick={handleAutoCorrect}
                  disabled={isAutoCorrecting || isSaving}
                  className="w-full sm:w-auto px-6 py-3 md:py-4 bg-indigo-50 text-indigo-600 font-bold text-sm rounded-xl hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isAutoCorrecting ? (
                    <><span className="material-symbols-outlined animate-spin text-lg">autorenew</span> Thinking...</>
                  ) : (
                    <><span className="material-symbols-outlined text-lg">auto_awesome</span> AI Auto-Correct</>
                  )}
                </button>

                <button
                  onClick={handleConfirmSave}
                  disabled={isSaving || isAutoCorrecting}
                  className="w-full sm:flex-1 bg-emerald-600 text-white py-3 md:py-4 rounded-xl font-bold transition-all shadow-sm hover:bg-emerald-500 hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <><span className="material-symbols-outlined animate-spin text-lg">autorenew</span> Saving...</>
                  ) : (
                    <><span className="material-symbols-outlined text-lg">check_circle</span> Save to Records</>
                  )}
                </button>
              </div>

            </div>
          </div>
        ) : (
          <>
            <div className="mb-6 flex justify-center">
              <div className="bg-white p-1 rounded-xl border border-[#E8F2EC] inline-flex shadow-sm w-full max-w-[400px] sm:w-auto">
                <button onClick={() => setReceiptType('expenses')} className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${receiptType === 'expenses' ? 'bg-orange-50 text-orange-700 shadow-sm' : 'text-[#7D8F85] hover:text-[#0B1A13]'}`}>Expense</button>
                <button onClick={() => setReceiptType('income')} className={`flex-1 sm:flex-none px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all ${receiptType === 'income' ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-[#7D8F85] hover:text-[#0B1A13]'}`}>Income</button>
              </div>
            </div>

            <section className="bg-white rounded-3xl border border-[#E8F2EC] p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-8 md:mb-12 max-w-4xl mx-auto w-full min-h-[400px] flex flex-col justify-center">

              {isCameraMode ? (
                <div className="flex flex-col items-center w-full max-w-2xl mx-auto animate-in fade-in duration-300">
                  <div className="relative w-full bg-black rounded-2xl overflow-hidden shadow-lg border border-[#E8F2EC] mb-6 flex justify-center bg-slate-900 min-h-[300px] md:min-h-[400px]">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-auto max-h-[500px] object-contain"
                    />

                    <div className="absolute inset-8 border-2 border-emerald-500/50 rounded-xl pointer-events-none">
                      <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-emerald-500 rounded-tl-xl"></div>
                      <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-emerald-500 rounded-tr-xl"></div>
                      <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-emerald-500 rounded-bl-xl"></div>
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-emerald-500 rounded-br-xl"></div>
                    </div>

                    {hasFlash && (
                      <button
                        onClick={toggleFlash}
                        className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center border transition-all shadow-sm ${isFlashOn
                            ? 'bg-emerald-500 text-white border-emerald-400'
                            : 'bg-black/50 backdrop-blur-md text-white border-white/20 hover:bg-black/70'
                          }`}
                        title="Toggle Flashlight"
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {isFlashOn ? 'flash_on' : 'flash_off'}
                        </span>
                      </button>
                    )}

                  </div>

                  <canvas ref={canvasRef} className="hidden" />

                  <div className="flex gap-4 w-full">
                    <button
                      onClick={stopCamera}
                      className="flex-1 bg-white border border-[#C3D9CE] text-[#0B1A13] py-3.5 rounded-full font-bold text-sm hover:bg-[#FDFBF7] transition-all shadow-sm"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={capturePhoto}
                      className="flex-[2] bg-emerald-600 text-white py-3.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all shadow-sm"
                    >
                      <span className="material-symbols-outlined text-lg">photo_camera</span> Capture Receipt
                    </button>
                  </div>
                </div>
              ) : !file ? (
                <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 md:p-16 flex flex-col items-center justify-center text-center transition-all duration-200 ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-[#C3D9CE] hover:border-emerald-400 hover:bg-[#FDFBF7]'}`}>
                  <input type="file" accept="image/jpeg, image/png, image/jpg" className="hidden" ref={fileInputRef} onChange={handleFileInput} />

                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#FDFBF7] border border-[#E8F2EC] shadow-sm rounded-full flex items-center justify-center mb-4 md:mb-6">
                    <span className="material-symbols-outlined text-3xl md:text-4xl text-emerald-600">add_photo_alternate</span>
                  </div>
                  <h4 className="font-['Manrope',sans-serif] text-lg md:text-xl font-bold text-[#0B1A13] mb-2">Upload or scan receipt</h4>
                  <p className="text-[#7D8F85] text-xs md:text-sm mb-6 md:mb-8 max-w-sm">Supports JPG and PNG up to 10MB.</p>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs md:max-w-md mx-auto">
                    <button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-white border border-[#C3D9CE] text-[#0B1A13] px-6 py-3 md:py-3.5 rounded-full font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm">
                      <span className="material-symbols-outlined text-[16px] md:text-lg">folder_open</span> Browse Files
                    </button>

                    <button onClick={startCamera} className="flex-1 bg-emerald-600 text-white px-6 py-3 md:py-3.5 rounded-full font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all shadow-sm">
                      <span className="material-symbols-outlined text-[16px] md:text-lg">photo_camera</span> Use Camera
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center pt-2 md:pt-4 pb-6 md:pb-8 animate-in fade-in duration-300 w-full">
                  <div className="relative mb-6 md:mb-8 max-w-sm w-full rounded-2xl overflow-hidden shadow-lg border border-[#E8F2EC]">
                    <img src={previewUrl!} alt="Receipt preview" className="w-full h-auto max-h-[300px] md:max-h-[400px] object-contain bg-slate-50" />
                    <button onClick={clearSelection} disabled={isUploading} className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-[#1A2E22] hover:bg-white hover:text-red-500 shadow-sm transition-colors disabled:opacity-50">
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                  <div className="text-center mb-6 md:mb-8">
                    <p className="font-bold text-sm md:text-base text-[#0B1A13] px-4 truncate max-w-[300px]">{file.name}</p>
                    <p className="text-[10px] md:text-xs text-[#7D8F85] mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <button onClick={handleUpload} disabled={isUploading} className="w-full max-w-sm bg-emerald-600 text-white py-3.5 md:py-4 rounded-xl font-bold transition-all shadow-sm hover:bg-emerald-500 disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base">
                    {isUploading ? <><span className="material-symbols-outlined animate-spin text-lg">autorenew</span> Processing OCR...</> : <><span className="material-symbols-outlined text-lg">memory</span> Extract {receiptType === 'income' ? 'Income' : 'Expense'} Data</>}
                  </button>
                </div>
              )}
            </section>
          </>
        )}

        <footer className="mt-auto w-full flex flex-col md:flex-row justify-between items-center py-6 md:py-8 border-t border-[#E8F2EC]">
          <div className="mb-4 md:mb-0">
            <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#7D8F85] font-bold">© 2026 Lumina Tech. All rights reserved.</p>
          </div>
          <div className="flex gap-6 md:gap-8">
            <a href="#" className="text-[10px] md:text-xs uppercase tracking-widest text-[#7D8F85] font-bold hover:text-emerald-600 transition-colors">Privacy</a>
            <a href="#" className="text-[10px] md:text-xs uppercase tracking-widest text-[#7D8F85] font-bold hover:text-emerald-600 transition-colors">Terms</a>
            <a href="#" className="text-[10px] md:text-xs uppercase tracking-widest text-[#7D8F85] font-bold hover:text-emerald-600 transition-colors">Contact</a>
          </div>
        </footer>

      </div>

      {toast && (
        <div className={`fixed bottom-4 left-4 right-4 md:left-auto md:bottom-8 md:right-8 px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-lg border flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300 z-50 ${toast.type === 'success'
            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
            : 'bg-red-50 text-red-800 border-red-200'
          }`}>
          <span className="material-symbols-outlined text-lg md:text-xl">
            {toast.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <span className="font-bold text-xs md:text-sm">{toast.message}</span>
        </div>
      )}

    </div>
  );
}