import React from 'react';

export default function PaymentTable({ payments, onSelectInvoice }) {
  if (payments.length === 0) {
    return (
      <div className="bg-[#0f172a] rounded-2xl border border-slate-800 p-8 text-center text-slate-400 text-xs">
        Chưa có giao dịch thu phí nào
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#0b1329] border-b border-slate-800 text-slate-400 font-bold uppercase text-[10px] tracking-wider">
            <tr>
              <th className="py-3.5 px-4">Mã Hóa Đơn</th>
              <th className="py-3.5 px-4">Người Nộp Tiền</th>
              <th className="py-3.5 px-4">Số Tiền</th>
              <th className="py-3.5 px-4">Phương Thức</th>
              <th className="py-3.5 px-4">Trạng Thái</th>
              <th className="py-3.5 px-4">Thời Gian & Nhân Viên</th>
              <th className="py-3.5 px-4 text-right">Biên Lai</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80">
            {payments.map((p) => (
              <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="font-mono font-bold text-emerald-400">{p.invoiceNumber}</div>
                  <div className="text-[10px] text-slate-500 font-mono">{p.transactionCode}</div>
                </td>

                <td className="py-3.5 px-4 font-bold text-white">{p.payerName}</td>

                <td className="py-3.5 px-4 font-black text-white text-sm">
                  {(p.amount || 0).toLocaleString('vi-VN')} ₫
                </td>

                <td className="py-3.5 px-4">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {p.paymentMethod}
                  </span>
                </td>

                <td className="py-3.5 px-4">
                  <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {p.status}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                  <div>{new Date(p.paidAt).toLocaleString('vi-VN')}</div>
                  <div className="text-slate-500 text-[10px]">Thu ngân: {p.receivedBy}</div>
                </td>

                <td className="py-3.5 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => onSelectInvoice(p)}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-[11px] transition-colors"
                  >
                    Xem
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
