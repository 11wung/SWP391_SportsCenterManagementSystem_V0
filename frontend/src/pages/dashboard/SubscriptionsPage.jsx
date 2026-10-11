import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import SubscriptionFilterBar from '../../components/dashboard/subscriptions/SubscriptionFilterBar';
import SubscriptionTable from '../../components/dashboard/subscriptions/SubscriptionTable';
import SubscriptionCreateModal from '../../components/dashboard/subscriptions/SubscriptionCreateModal';
import SubscriptionPaymentModal from '../../components/dashboard/subscriptions/SubscriptionPaymentModal';

export default function SubscriptionsPage() {
  const { user, isReceptionist, isMember } = useAuth();
  const [searchParams] = useSearchParams();

  const [subscriptions, setSubscriptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [packages, setPackages] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [selectedSubForPay, setSelectedSubForPay] = useState(null);

  const [registerForm, setRegisterForm] = useState({ userId: '', packageId: '' });
  const [paymentMethod, setPaymentMethod] = useState('VIETQR');

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    const pkgId = searchParams.get('packageId');
    if (pkgId) {
      setRegisterForm((prev) => ({ ...prev, packageId: pkgId }));
      setIsRegisterOpen(true);
    }
  }, [searchParams]);

  const loadAll = async () => {
    try {
      const [subsData, usersData, pkgsData] = await Promise.all([
        isMember ? api.getMySubscriptions() : api.getAllSubscriptions(),
        api.searchUsers('', 'MEMBER'),
        api.getAllPackages(),
      ]);
      setSubscriptions(subsData);
      setUsers(usersData);
      setPackages(pkgsData.filter((p) => p.isActive));

      if (usersData.length > 0 && !registerForm.userId) {
        setRegisterForm((prev) => ({
          ...prev,
          userId: isMember ? user?.id : usersData[0].id,
          packageId: prev.packageId || (pkgsData[0]?.id || ''),
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateSub = async (e) => {
    e.preventDefault();
    try {
      const targetUserId = isMember ? user?.id : registerForm.userId;
      await api.createSubscription(
        { userId: targetUserId, packageId: registerForm.packageId },
        user?.fullName
      );
      setMessage({ type: 'success', text: 'Tạo đơn đăng ký thành công! Đang chờ thanh toán.' });
      setIsRegisterOpen(false);
      loadAll();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Đăng ký thất bại' });
    }
  };

  const handleRenewSub = async (sub) => {
    try {
      await api.createSubscription(
        { userId: sub.userId, packageId: sub.packageId },
        user?.fullName
      );
      setMessage({
        type: 'success',
        text: `Đã tạo yêu cầu gia hạn gói cho ${sub.userFullName}! Vui lòng thanh toán để tự động nối tiếp ngày sử dụng.`,
      });
      loadAll();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Gia hạn thất bại' });
    }
  };

  const handleOpenPayment = (sub) => {
    setSelectedSubForPay(sub);
    setIsPayOpen(true);
  };

  const handleConfirmPayment = async (e) => {
    e.preventDefault();
    try {
      await api.processPayment({
        subscriptionId: selectedSubForPay.id,
        amount: selectedSubForPay.totalAmount,
        paymentMethod,
      });
      setMessage({
        type: 'success',
        text: `Thanh toán thành công! Gói tập của ${selectedSubForPay.userFullName} đã được kích hoạt.`,
      });
      setIsPayOpen(false);
      loadAll();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Thanh toán thất bại' });
    }
  };

  const filteredSubs = subscriptions.filter((s) => {
    if (statusFilter && s.status !== statusFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        s.userFullName?.toLowerCase().includes(term) ||
        s.packageNameSnapshot?.toLowerCase().includes(term) ||
        s.id.toString().includes(term)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Đăng ký & Quản lý Hợp đồng</h2>
          <p className="text-xs text-slate-400">Theo dõi hợp đồng, kích hoạt và gia hạn thẻ hội viên</p>
        </div>

        {(isReceptionist || isMember) && (
          <button
            type="button"
            onClick={() => setIsRegisterOpen(true)}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20"
          >
            Đăng ký gói mới
          </button>
        )}
      </div>

      {message.text && (
        <div
          className={`p-3 rounded-xl text-xs flex items-center justify-between ${
            message.type === 'success'
              ? 'bg-emerald-950/50 border border-emerald-800 text-emerald-300'
              : 'bg-rose-950/50 border border-rose-800 text-rose-300'
          }`}
        >
          <span>{message.text}</span>
          <button type="button" onClick={() => setMessage({ type: '', text: '' })}>✕</button>
        </div>
      )}

      <SubscriptionFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <SubscriptionTable
        subscriptions={filteredSubs}
        isMember={isMember}
        isReceptionist={isReceptionist}
        onOpenPayment={handleOpenPayment}
        onRenewSub={handleRenewSub}
      />

      <SubscriptionCreateModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        isMember={isMember}
        user={user}
        users={users}
        packages={packages}
        formData={registerForm}
        onChange={setRegisterForm}
        onSubmit={handleCreateSub}
      />

      <SubscriptionPaymentModal
        isOpen={isPayOpen}
        onClose={() => setIsPayOpen(false)}
        subscription={selectedSubForPay}
        paymentMethod={paymentMethod}
        onMethodChange={setPaymentMethod}
        onSubmit={handleConfirmPayment}
      />
    </div>
  );
}
