import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TestStore {
  test?: string;
  testFn: () => void;
}

export const useTestStore = create(
  persist<TestStore>(
    (set) => ({
      // state
      test: undefined,
      // actions
      testFn: () => set({ test: undefined }),
    }),
    {
      name: 'user-storage',
    }
  )
);
