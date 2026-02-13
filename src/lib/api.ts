import axios, { type AxiosInstance, type AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth-store'

const BASE_URL = 'http://api.fotiha.uz:8000'

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60s timeout for image generation
})

// Request interceptor - attach Bearer token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().auth.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - auto-logout on 401
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().auth.logout()
    }
    return Promise.reject(error)
  }
)

export { api }
export default api
