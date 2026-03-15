import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface UserState {
  user: User;
  isAuthenticated: boolean;
  login: (user: Partial<User>) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const defaultUser: User = {
  id: 'usr-001',
  name: 'Aakash Kumar',
  email: 'aakash@zipride.in',
  phone: '+91-9876543210',
  isAuthenticated: false,
  memberSince: '2025-06-15',
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: defaultUser,
      isAuthenticated: false,
      login: (userData) =>
        set((state) => ({
          user: { ...state.user, ...userData, isAuthenticated: true },
          isAuthenticated: true,
        })),
      logout: () =>
        set({
          user: { ...defaultUser, isAuthenticated: false },
          isAuthenticated: false,
        }),
      updateProfile: (updates) =>
        set((state) => ({
          user: { ...state.user, ...updates },
        })),
    }),
    { name: 'zipride-user' }
  )
);
