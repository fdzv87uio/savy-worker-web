import { create } from 'zustand';

type AuthTokenStore = {
  authToken: string | null;
  setAuthToken: (authToken: string) => void;
  clearAuthToken: () => void;
};

export const useAuthTokenStore = create<AuthTokenStore>()((set) => ({
  authToken: null,  // Estado inicial del authToken
  setAuthToken: (authToken: string) => set({ authToken }),  // Función para actualizar el authToken
  clearAuthToken: () => set({ authToken: null }),  // Función para borrar el authToken
}));
