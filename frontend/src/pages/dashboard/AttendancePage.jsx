import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import CheckInPanel from '../../components/dashboard/attendance/CheckInPanel';
import AttendanceHistoryTable from '../../components/dashboard/attendance/AttendanceHistoryTable';

export default function AttendancePage() {
  const [attendances, setAttendances] = useState([]);
  const [members, setMembers] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  const [selectedUserId, setSelectedUserId] = useState('');
  const [checkInNotes, setCheckInNotes] = useState('Cổng FaceID số 1 - Khu Thể Thao');
  const [selectedUserObj, setSelectedUserObj] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [atts, usersData, subsData] = await Promise.all([
        api.getRecentAttendances(),
        api.searchUsers('', 'MEMBER'),
        api.getAllSubscriptions(),
      ]);
      setAttendances(atts);
      setMembers(usersData);
      setSubscriptions(subsData);

      if (usersData.length > 0 && !selectedUserId) {
        setSelectedUserId(usersData[0].id);
        setSelectedUserObj(usersData[0]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUserId(userId);
    const found = members.find((m) => m.id === Number(userId));
    setSelectedUserObj(found || null);
  };

  const memberActiveSubs = selectedUserObj
    ? subscriptions.filter((s) => s.userId === selectedUserObj.id && s.status === 'ACTIVE')
    : [];

  const handleCheckIn = async (e) => {
    e.preventDefault();
    if (!selectedUserId) return;
    try {
      await api.checkIn({
        userId: Number(selectedUserId),
        notes: checkInNotes,
      });

      const memberName = selectedUserObj?.fullName || 'Hội viên';
      setMessage({
        type: 'success',
        text: `Check-in thành công cho ${memberName}! Đã mở cổng kiểm soát.`,
      });
      loadData();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Lỗi khi check-in' });
    }
  };

  const handleCheckOut = async (attId, memberName) => {
    try {
      await api.checkOut(attId);
      setMessage({
        type: 'success',
        text: `Đã check-out thành công cho ${memberName}!`,
      });
      loadData();
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Lỗi khi check-out' });
    }
  };

  const activeInFacility = attendances.filter((a) => !a.checkOutTime);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white">Điểm Danh & Kiểm Soát Ra Vào</h2>
          <p className="text-xs text-slate-400">Ghi nhận lượt check-in/check-out và kiểm tra hạn thẻ hội viên</p>
        </div>

        <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl px-4 py-2">
          <div className="text-[11px] text-emerald-300 font-semibold">Đang trong cơ sở:</div>
          <div className="text-lg font-black text-white">{activeInFacility.length} hội viên</div>
        </div>
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

      <CheckInPanel
        members={members}
        selectedUserId={selectedUserId}
        onUserSelect={handleUserSelect}
        selectedUserObj={selectedUserObj}
        memberActiveSubs={memberActiveSubs}
        checkInNotes={checkInNotes}
        onNotesChange={setCheckInNotes}
        onCheckIn={handleCheckIn}
        activeInFacility={activeInFacility}
        onCheckOut={handleCheckOut}
      />

      <AttendanceHistoryTable attendances={attendances} />
    </div>
  );
}
