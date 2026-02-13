import { create } from 'zustand'

interface AuthUser {
  name: string
  email: string
  picture: string
}

interface AuthState {
  auth: {
    token: string | null
    user: AuthUser | null
    isAuthenticated: boolean
    login: (token: string, user: AuthUser) => void
    logout: () => void
  }
}

export const useAuthStore = create<AuthState>()((set) => {
  const initToken = localStorage.getItem('token')
  const initUser = localStorage.getItem('user_data')
    ? JSON.parse(localStorage.getItem('user_data')!)
    : null
  const initAuthenticated = !!initToken && !!initUser

  return {
    auth: {
      token: initToken,
      user: initUser,
      isAuthenticated: initAuthenticated,
      login: (token, user) =>
        set((state) => {
          localStorage.setItem('token', token)
          localStorage.setItem('user_data', JSON.stringify(user))
          return {
            ...state,
            auth: { ...state.auth, token, user, isAuthenticated: true },
          }
        }),
      logout: () =>
        set((state) => {
          localStorage.removeItem('token')
          localStorage.removeItem('user_data')
          return {
            ...state,
            auth: { ...state.auth, token: null, user: null, isAuthenticated: false },
          }
        }),
    },
  }
})
