import { GoogleOAuthProvider, GoogleLogin, type CredentialResponse } from '@react-oauth/google'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useAuthStore } from '@/stores/auth-store'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

function decodeJwt(token: string) {
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )
  return JSON.parse(jsonPayload)
}

function LoginCard() {
  const navigate = useNavigate()
  const { auth } = useAuthStore()

  const handleSuccess = (response: CredentialResponse) => {
    if (!response.credential) {
      toast.error('Login failed. No credential received.')
      return
    }

    try {
      const decoded = decodeJwt(response.credential)
      const user = {
        name: decoded.name || decoded.email?.split('@')[0] || 'User',
        email: decoded.email || '',
        picture: decoded.picture || '',
      }

      auth.login(response.credential, user)
      toast.success('Signed in successfully!')
      navigate({ to: '/text2image' })
    } catch {
      toast.error('Failed to decode login response.')
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
