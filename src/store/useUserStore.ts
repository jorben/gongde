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
    wishUsed: boolean
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
        wishUsed: false,
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
            wishUsed: true,
          }
        }))
      },
      resetDailyDataIfNeeded: () => {
        const today = new Date().toISOString().split('T')[0]
        const lastReset = get().dailyData.lastResetDate
        if (today !== lastReset) {
          set((state) => ({
            dailyData: {
              incenseUsed: false,
              wishUsed: false,
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
    }
  )
)
