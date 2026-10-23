type ConfirmDialogProps = {
  title: string;
  body: string;
  confirmLabel: string;
  loadingLabel?: string;
  icon: string;
  tone?: 'red' | 'orange';
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  title,
  body,
  confirmLabel,
  loadingLabel,
  icon,
  tone = 'red',
  loading,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  const toneClasses = tone === 'orange'
    ? 'bg-orange-50 text-orange-500'
    : 'bg-red-50 text-red-500';

  return (
    <div className="fixed inset-0 bg-[#0B1A13]/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 md:p-8 shadow-2xl border border-[#E8F2EC] text-center">
        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-5 ${toneClasses}`}>
          <span className="material-symbols-outlined text-2xl md:text-3xl">{icon}</span>
        </div>
        <h3 className="font-['Manrope',sans-serif] text-lg md:text-xl font-bold text-[#0B1A13] mb-2">{title}</h3>
        <p className="text-[#4A5D52] text-xs md:text-sm mb-6 md:mb-8">{body}</p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2.5 md:py-3 border border-[#E8F2EC] bg-white rounded-xl text-[#4A5D52] text-sm md:text-base font-bold hover:bg-[#FDFBF7] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 md:py-3 bg-red-600 text-white rounded-xl text-sm md:text-base font-bold hover:bg-red-500 hover:shadow-lg hover:shadow-red-600/20 transition-all flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <><span className="material-symbols-outlined animate-spin text-sm">autorenew</span> {loadingLabel ?? confirmLabel}</>
            ) : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
