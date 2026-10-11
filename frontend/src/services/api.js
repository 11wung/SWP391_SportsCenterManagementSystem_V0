const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const getHeaders = () => {
  const token = localStorage.getItem('sportcenter_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

async function request(endpoint, options = {}) {
  let res;
  try {
    res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: { ...getHeaders(), ...(options.headers || {}) },
    });
  } catch (networkErr) {
    throw new Error(
      `Không thể kết nối đến máy chủ Backend (${BASE_URL}). Vui lòng kiểm tra dịch vụ Backend và Database.`
    );
  }

  let data;
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await res.json();
  } else {
    data = await res.text();
  }

  if (!res.ok) {
    const errorMsg =
      (typeof data === 'object' && (data.message || data.error)) ||
      (typeof data === 'string' && data) ||
      `Yêu cầu thất bại với mã lỗi HTTP ${res.status}`;
    throw new Error(errorMsg);
  }

  return data;
}

export const api = {
  // Auth
  login: async (email, password) => {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  register: async (data) => {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Users
  getMyProfile: async () => {
    return request('/users/me', { method: 'GET' });
  },

  updateMyProfile: async (data) => {
    return request('/users/me', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  searchUsers: async (search = '', role = '') => {
    const q = new URLSearchParams();
    if (search) q.append('search', search);
    if (role) q.append('role', role);
    const queryString = q.toString() ? `?${q.toString()}` : '';
    return request(`/users${queryString}`, { method: 'GET' });
  },

  getUserById: async (id) => {
    return request(`/users/${id}`, { method: 'GET' });
  },

  createUser: async (data) => {
    return request('/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  createMember: async (data) => {
    return request('/users/members', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateUser: async (id, data) => {
    return request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteUser: async (id) => {
    return request(`/users/${id}`, { method: 'DELETE' });
  },

  updateUserStatus: async (id, isActive) => {
    return request(`/users/${id}/status?isActive=${isActive}`, {
      method: 'PUT',
    });
  },

  // Packages
  getAllPackages: async () => {
    return request('/packages', { method: 'GET' });
  },

  getPackageById: async (id) => {
    return request(`/packages/${id}`, { method: 'GET' });
  },

  createPackage: async (data) => {
    return request('/packages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updatePackage: async (id, data) => {
    return request(`/packages/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deletePackage: async (id) => {
    return request(`/packages/${id}`, { method: 'DELETE' });
  },

  // Subscriptions
  getAllSubscriptions: async () => {
    return request('/subscriptions', { method: 'GET' });
  },

  getMySubscriptions: async () => {
    return request('/subscriptions/me', { method: 'GET' });
  },

  getUserSubscriptions: async (userId) => {
    return request(`/subscriptions/user/${userId}`, { method: 'GET' });
  },

  getMyActiveSubscriptions: async () => {
    return request('/subscriptions/me/active', { method: 'GET' });
  },

  createSubscription: async (data) => {
    return request('/subscriptions', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  subscribeMe: async (packageId) => {
    return request(`/subscriptions/me?packageId=${packageId}`, {
      method: 'POST',
    });
  },

  // Payments
  getAllPayments: async () => {
    return request('/payments', { method: 'GET' });
  },

  processPayment: async (data) => {
    return request('/payments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // Attendances
  getRecentAttendances: async () => {
    return request('/attendances', { method: 'GET' });
  },

  getUserAttendances: async (userId) => {
    return request(`/attendances/user/${userId}`, { method: 'GET' });
  },

  checkIn: async (data) => {
    return request('/attendances/check-in', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  checkOut: async (id) => {
    return request(`/attendances/check-out/${id}`, {
      method: 'PUT',
    });
  },

  // Roles
  getAllRoles: async () => {
    return request('/roles', { method: 'GET' });
  },
};
