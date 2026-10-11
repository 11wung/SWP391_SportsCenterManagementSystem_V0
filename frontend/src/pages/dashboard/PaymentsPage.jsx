import React, { useState, useEffect } from 'react';
import PaymentTable from '../../components/dashboard/payments/PaymentTable';
import InvoiceModal from '../../components/dashboard/payments/InvoiceModal';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('sc_payments') || '[]');
      setPayments(stored);
    } catch (e) {
      console.error(e);
    }
  };

  const filteredPayments = payments.filter((p) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      p.invoiceNumber?.toLowerCase().includes(term) ||
      p.transactionCode?.toLowerCase().includes(term) ||
      p.payerName?.toLowerCase().includes(term)
    );
  });

  const totalCollected = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Lịch Sử Thu Phí & Hóa Đơn Điện Tử</h2>
          <p className="text-xs text-slate-400">Tra cứu các giao dịch thanh toán gói tập và xuất hóa đơn dịch vụ</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl px-4 py-2 text-right">
          <div className="text-[11px] text-slate-400 font-semibold">Tổng doanh thu đã thu:</div>
          <div className="text-lg font-black text-emerald-400">
            {totalCollected.toLocaleString('vi-VN')} ₫
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a] rounded-2xl p-4 border border-slate-800 flex items-center justify-between">
        <div className="w-full sm:w-96">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo mã hóa đơn, mã GD, tên khách..."
            className="w-full bg-slate-900 border border-slate-700/80 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-emerald-500"
          />
        </div>
        <span className="text-xs text-slate-400 hidden sm:inline">
          {filteredPayments.length} giao dịch
        </span>
      </div>

      <PaymentTable
        payments={filteredPayments}
        onSelectInvoice={setSelectedInvoice}
      />

      <InvoiceModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    </div>
  );
}
