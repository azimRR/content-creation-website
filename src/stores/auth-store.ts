import { create } from 'zustand'
import { getCookie, setCookie, removeCookie } from '@/lib/cookies'

const AUTH_TOKEN = 'fotiha_auth_token'
const USER_DATA = 'fotiha_user_data'

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
  const tokenCookie = getCookie(AUTH_TOKEN)
  const userCookie = getCookie(USER_DATA)

  const initToken = tokenCookie || null
  const initUser = userCookie ? JSON.parse(decodeURIComponent(userCookie)) : null
  const initAuthenticated = !!initToken && !!initUser

  return {
    auth: {
      token: initToken,
      user: initUser,
      isAuthenticated: initAuthenticated,
      login: (token, user) =>
        set((state) => {
          setCookie(AUTH_TOKEN, token)
          setCookie(USER_DATA, encodeURIComponent(JSON.stringify(user)))
          return {
            ...state,
            auth: { ...state.auth, token, user, isAuthenticated: true },
          }
        }),
      logout: () =>
        set((state) => {
          removeCookie(AUTH_TOKEN)
          removeCookie(USER_DATA)
          return {
            ...state,
            auth: { ...state.auth, token: null, user: null, isAuthenticated: false },
          }
        }),
    },
  }
})
