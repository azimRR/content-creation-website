import { createFileRoute, redirect } from '@tanstack/react-router'
import { Login } from '@/features/auth/login'
import { useAuthStore } from '@/stores/auth-store'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState().auth

    if (isAuthenticated) {
      throw redirect({
        to: '/text2image',
      })
    }
  },
  component: Login,
})
