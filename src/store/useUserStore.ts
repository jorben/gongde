import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WorshipRecord {
  id: string
  buddha: string
  time: string
  wish: string
  merit: number
  isCheckin: boolean
}

interface UserState {
  totalMerit: number
  consecutiveDays: number
  dailyData: {
    incenseUsed: boolean
    wishCount: number
    chatCount: number
    lastResetDate: string
  }
  records: {
    worship: WorshipRecord[]
  }
  addMerit: (amount: number) => void
  addWorshipRecord: (record: Omit<WorshipRecord, 'id' | 'time' | 'merit'>) => void
  resetDailyDataIfNeeded: () => void
  useIncense: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      totalMerit: 0,
      consecutiveDays: 0,
      dailyData: {
        incenseUsed: false,
        wishCount: 0,
        chatCount: 0,
        lastResetDate: new Date().toISOString().split('T')[0],
      },
      records: {
        worship: [],
      },
      addMerit: (amount) => set((state) => ({ totalMerit: state.totalMerit + amount })),
      addWorshipRecord: (record) => {
        const newRecord: WorshipRecord = {
          ...record,
          id: crypto.randomUUID(),
          time: new Date().toISOString(),
          merit: 1,
        }
        set((state) => ({
          totalMerit: state.totalMerit + 1,
          records: {
            ...state.records,
            worship: [newRecord, ...state.records.worship],
          },
          dailyData: {
            ...state.dailyData,
            wishCount: state.dailyData.wishCount + 1,
          }
        }))
      },
      resetDailyDataIfNeeded: () => {
        const today = new Date().toISOString().split('T')[0]
        const lastReset = get().dailyData.lastResetDate
        if (today !== lastReset) {
          set(() => ({
            dailyData: {
              incenseUsed: false,
              wishCount: 0,
              chatCount: 0,
              lastResetDate: today,
            }
          }))
        }
      },
      useIncense: () => set((state) => ({
        dailyData: { ...state.dailyData, incenseUsed: true }
      })),
    }),
    {
      name: 'gongde-user-storage',
      migrate: (persistedState: unknown) => {
        const state = persistedState as Record<string, unknown>
        if (state?.dailyData) {
          const dailyData = state.dailyData as Record<string, unknown>
          // 迁移旧的 wishUsed (boolean) 到 wishCount (number)
          if (typeof dailyData.wishUsed === 'boolean') {
            dailyData.wishCount = dailyData.wishUsed ? 1 : 0
            delete dailyData.wishUsed
          }
          // 确保 wishCount 是数字
          if (typeof dailyData.wishCount !== 'number') {
            dailyData.wishCount = 0
          }
        }
        return state
      },
      version: 1,
    }
  )
)
