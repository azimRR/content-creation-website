import { GoogleOAuthProvider, GoogleLogin, type CredentialResponse } from '@react-oauth/google'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import axios, { AxiosError } from 'axios'

interface AuthResponse {
  access_token: string
  token_type: string
  // User fields can be nested or top-level
  user?: {
    id: number
    email: string
    name: string
    picture: string
  }
  id?: number
  email?: string
  name?: string
  picture?: string
}

function LoginCard() {
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const handleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      toast.error('Login failed. No credential received.')
      return
    }

    try {
      // Exchange Google token for JWT via backend (plain axios, no interceptors)
      const { data } = await axios.post<AuthResponse>('https://api.fotiha.uz/auth/google', {
        token: response.credential,
      })

      console.log('Auth response:', data)

      // Handle both nested user object and flat response
      const u = data.user || data
      const user = {
        name: u.name || u.email?.split('@')[0] || 'User',
        email: u.email || '',
        picture: u.picture || '',
      }

      if (!data.access_token) {
        console.error('No access_token in auth response:', data)
        toast.error('Login failed: server did not return an access token.')
        return
      }

      auth.login(data.access_token, user)
      toast.success('Signed in successfully!')
      navigate({ to: '/text2image' })
    } catch (error) {
      console.error('Auth error:', error)
      if (error instanceof AxiosError) {
        const detail = error.response?.data?.detail
        toast.error(typeof detail === 'string' ? detail : 'Authentication failed. Please try again.')
      } else {
        toast.error('Authentication failed. Please try again.')
      }
    }
  }

  const handleError = () => {
    toast.error('Google Sign-In failed. Please try again.')
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-background p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='space-y-1 text-center'>
          <div className='flex justify-center mb-4'>
            <div className='flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground'>
              <span className='text-xl font-bold'>F</span>
            </div>
          </div>
          <CardTitle className='text-2xl'>Welcome to Fotiha Studio</CardTitle>
          <CardDescription>
            Sign in with your Google account to get started
          </CardDescription>
        </CardHeader>
        <CardContent className='flex justify-center'>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
            theme='outline'
            size='large'
            width='320'
            text='signin_with'
          />
        </CardContent>
      </Card>
    </div>
  )
}

export function Login() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

  if (!clientId || clientId === 'your-google-client-id-here') {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background p-4'>
        <Card className='w-full max-w-md'>
          <CardHeader className='space-y-1 text-center'>
            <CardTitle className='text-2xl'>Configuration Required</CardTitle>
            <CardDescription>
              Set <code className='text-sm bg-muted px-1.5 py-0.5 rounded'>VITE_GOOGLE_CLIENT_ID</code> in your <code className='text-sm bg-muted px-1.5 py-0.5 rounded'>.env</code> file to enable Google Sign-In.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LoginCard />
    </GoogleOAuthProvider>
  )
}
