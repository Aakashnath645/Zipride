import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WalletTransaction } from '@/types';
import { MOCK_WALLET_TRANSACTIONS } from '@/lib/constants';
import { generateId } from '@/lib/utils';

interface WalletState {
  balance: number;
  transactions: WalletTransaction[];
  addMoney: (amount: number, description?: string) => void;
  deductMoney: (amount: number, description?: string) => void;
  addTransaction: (tx: WalletTransaction) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set) => ({
      balance: 250,
      transactions: MOCK_WALLET_TRANSACTIONS,
      addMoney: (amount, description = 'Added to wallet') =>
        set((state) => ({
          balance: state.balance + amount,
          transactions: [
            {
              id: generateId(),
              type: 'credit',
              amount,
              description,
              date: new Date().toISOString(),
              category: 'topup',
            },
            ...state.transactions,
          ],
        })),
      deductMoney: (amount, description = 'Ride payment') =>
        set((state) => ({
          balance: state.balance - amount,
          transactions: [
            {
              id: generateId(),
              type: 'debit',
              amount,
              description,
              date: new Date().toISOString(),
              category: 'ride',
            },
            ...state.transactions,
          ],
        })),
      addTransaction: (tx) =>
        set((state) => ({
          transactions: [tx, ...state.transactions],
        })),
    }),
    { name: 'zipride-wallet' }
  )
);
