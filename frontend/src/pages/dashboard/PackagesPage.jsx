import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import PackageCard from '../../components/dashboard/packages/PackageCard';
import PackageFormModal from '../../components/dashboard/packages/PackageFormModal';

export default function PackagesPage() {
  const { isManager } = useAuth();
  const navigate = useNavigate();

  const [packages, setPackages] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    durationMonths: 1,
    price: 500000,
    maxClassesPerWeek: 3,
    isActive: true,
  });

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    try {
      const data = await api.getAllPackages();
      setPackages(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenCreate = () => {
    setEditingPackage(null);
    setFormData({
      code: `PKG-${Date.now().toString().slice(-4)}`,
      name: '',
      description: '',
      durationMonths: 1,
      price: 500000,
      maxClassesPerWeek: 3,
      isActive: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pkg) => {
    setEditingPackage(pkg);
    setFormData({ ...pkg });
    setIsModalOpen(true);
  };

  const handleDeletePackage = async (pkg) => {
    if (!window.confirm(`Bạn có chắc muốn vô hiệu hóa gói "${pkg.name}"?`)) return;
    try {
      await api.deletePackage(pkg.id);
      setMessage({ type: 'success', text: `Đã vô hiệu hóa gói ${pkg.name}` });
      loadPackages();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Lỗi khi xóa gói' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPackage) {
        await api.updatePackage(editingPackage.id, formData);
        setMessage({ type: 'success', text: 'Cập nhật gói tập thành công!' });
      } else {
        await api.createPackage(formData);
        setMessage({ type: 'success', text: 'Tạo gói tập mới thành công!' });
      }
      setIsModalOpen(false);
      loadPackages();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Thao tác thất bại' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Quản lý Gói Tập & Thẻ Thành Viên</h2>
          <p className="text-xs text-slate-400">Danh mục các gói tập Gym, Bể bơi, Sân thể thao và quyền lợi</p>
        </div>

        {isManager && (
          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/20"
          >
            Thêm gói tập mới
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            isManager={isManager}
            onSelect={(p) => navigate(`/app/subscriptions?packageId=${p.id}`)}
            onEdit={handleOpenEdit}
            onDelete={handleDeletePackage}
          />
        ))}
      </div>

      <PackageFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isEditing={Boolean(editingPackage)}
        formData={formData}
        onChange={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
