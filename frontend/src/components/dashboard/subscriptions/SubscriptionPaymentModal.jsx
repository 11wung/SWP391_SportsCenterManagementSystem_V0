import React from 'react';

const METHODS = [
  { id: 'VIETQR', label: 'Chuyển khoản VietQR' },
  { id: 'CASH', label: 'Tiền mặt tại quầy' },
  { id: 'CARD', label: 'Quẹt thẻ POS' },
];

export default function SubscriptionPaymentModal({
  isOpen,
  onClose,
  subscription,
  paymentMethod,
  onMethodChange,
  onSubmit,
}) {
  if (!isOpen || !subscription) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#0f172a] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg p-1"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-white mb-1">Thanh Toán Gói Tập</h3>
        <p className="text-xs text-slate-400 mb-5">
          Hợp đồng #{subscription.id} — {subscription.packageNameSnapshot}
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Hội viên:</span>
              <span className="text-white font-semibold">{subscription.userFullName}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Số tiền thanh toán:</span>
              <span className="text-emerald-400 font-bold text-base">
                {subscription.totalAmount?.toLocaleString('vi-VN')} đ
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Hình thức thanh toán</label>
            <div className="space-y-2">
              {METHODS.map(({ id, label }) => (
                <label
                  key={id}
                  className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                    paymentMethod === id
                      ? 'bg-emerald-950/30 border-emerald-500 text-emerald-300 font-bold'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={id}
                      checked={paymentMethod === id}
                      onChange={(e) => onMethodChange(e.target.value)}
                      className="accent-emerald-500"
                    />
                    <span>{label}</span>
                  </div>
                  {id === 'VIETQR' && (
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded">
                      Khuyên dùng
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
