import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useAuthStore = create(
    persist(
        (set, get) => ({
            authToken: "",
            setToken: (token: string) => set({ authToken: token }),
        }),
        {
            name: 'auth-store',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)
