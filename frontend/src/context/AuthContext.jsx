import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('sportcenter_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('sportcenter_token') || null);
  const [loading, setLoading] = useState(false);

  // Sync state to local storage
  useEffect(() => {
    if (user) {
      localStorage.setItem('sportcenter_user', JSON.stringify(user));
      localStorage.setItem('sportcenter_email', user.email);
      localStorage.setItem('sportcenter_name', user.fullName);
      localStorage.setItem('sportcenter_role', user.role);
    } else {
      localStorage.removeItem('sportcenter_user');
      localStorage.removeItem('sportcenter_email');
      localStorage.removeItem('sportcenter_name');
      localStorage.removeItem('sportcenter_role');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('sportcenter_token', token);
    } else {
      localStorage.removeItem('sportcenter_token');
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.login(email, password);
      setToken(res.token);
      const userInfo = {
        id: res.userId,
        email: res.email,
        fullName: res.fullName,
        role: res.role,
      };
      setUser(userInfo);
      return userInfo;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      return await api.register(data);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('sportcenter_token');
    localStorage.removeItem('sportcenter_user');
  };

  const switchDemoRole = async (roleCode) => {
    const accounts = {
      MANAGER: { email: 'manager@sportcenter.vn', name: 'Trần Văn Quản Lý' },
      RECEPTIONIST: { email: 'receptionist@sportcenter.vn', name: 'Lê Thuỳ Lễ Tân' },
      MEMBER: { email: 'an.nguyen@gmail.com', name: 'Nguyễn Văn An' },
      COACH: { email: 'coach@sportcenter.vn', name: 'Nguyễn Tuấn Kiệt (Coach)' },
    };
    const target = accounts[roleCode] || accounts.MANAGER;
    try {
      await login(target.email, '123456');
    } catch {
      setUser({
        id: 1,
        email: target.email,
        fullName: target.name,
        role: roleCode,
      });
      setToken(`mock-token-${roleCode}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        switchDemoRole,
        isAuthenticated: !!user,
        isManager: user?.role === 'MANAGER',
        isReceptionist: user?.role === 'RECEPTIONIST' || user?.role === 'MANAGER',
        isMember: user?.role === 'MEMBER',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
