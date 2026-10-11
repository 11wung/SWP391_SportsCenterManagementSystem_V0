import React, { useState, useEffect } from 'react';

export default function CountdownConfirmModal({
  isOpen,
  title = 'Xác nhận thao tác',
  message = 'Bạn có chắc chắn muốn thực hiện thao tác này?',
  confirmText = 'Xác nhận',
  type = 'danger',
  onConfirm,
  onClose,
}) {
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    if (!isOpen) return;

    setSecondsLeft(5);
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const isCountingDown = secondsLeft > 0;

  const getButtonStyles = () => {
    if (type === 'danger') {
      return isCountingDown
        ? 'bg-rose-950/40 text-rose-400 border border-rose-900/40 cursor-not-allowed opacity-50'
        : 'bg-rose-600 hover:bg-rose-500 text-white cursor-pointer';
    }
    return isCountingDown
      ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/40 cursor-not-allowed opacity-50'
      : 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#0f172a] border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl">
        <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-6">{message}</p>

        <div className="p-3 mb-6 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>Yêu cầu chờ xác nhận an toàn:</span>
          <span className="font-mono font-bold text-emerald-400">
            {isCountingDown ? `Chờ ${secondsLeft}s...` : 'Sẵn sàng'}
          </span>
        </div>

        <div className="flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 transition-colors"
          >
            Hủy bỏ
          </button>

          <button
            type="button"
            disabled={isCountingDown}
            onClick={() => {
              if (!isCountingDown) {
                onConfirm();
              }
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${getButtonStyles()}`}
          >
            {isCountingDown ? `${confirmText} (${secondsLeft}s)` : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
