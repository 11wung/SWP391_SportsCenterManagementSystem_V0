import React from 'react';

export default function InvoiceModal({ invoice, onClose }) {
  if (!invoice) return null;

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

        <div className="text-center pb-4 border-b border-slate-800">
          <div className="text-lg font-black text-white">SportCenter Management</div>
          <p className="text-xs text-slate-400">Phiếu Thu Tiền & Hóa Đơn Dịch Vụ</p>
          <div className="mt-2 text-xs font-mono text-emerald-400 font-bold">{invoice.invoiceNumber}</div>
        </div>

        <div className="py-4 space-y-2.5 text-xs text-slate-300">
          <div className="flex justify-between">
            <span className="text-slate-400">Khách hàng:</span>
            <span className="font-bold text-white">{invoice.payerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Mã giao dịch:</span>
            <span className="font-mono text-slate-300">{invoice.transactionCode}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Hình thức thanh toán:</span>
            <span className="font-semibold text-slate-200">{invoice.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Thời gian thu:</span>
            <span>{new Date(invoice.paidAt).toLocaleString('vi-VN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">Thu ngân:</span>
            <span>{invoice.receivedBy}</span>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-sm">
            <span className="font-bold text-white">Tổng thanh toán:</span>
            <span className="text-xl font-black text-emerald-400">
              {(invoice.amount || 0).toLocaleString('vi-VN')} ₫
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
          >
            In Biên Lai
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
