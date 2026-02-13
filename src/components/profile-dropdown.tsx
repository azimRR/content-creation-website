import { useState } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SignOutDialog } from '@/components/sign-out-dialog'
import { useSidebar } from '@/components/ui/sidebar'

export function ProfileDropdown() {
  const [signOutOpen, setSignOutOpen] = useState(false)
  const { auth } = useAuthStore()
  const { state } = useSidebar()

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }

  if (state === 'collapsed') {
    return (
      <>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-8 w-8 rounded-full mx-auto'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={auth.user?.picture} alt={auth.user?.name} />
                <AvatarFallback>
                  {auth.user?.name ? getInitials(auth.user.name) : 'U'}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' side='right' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col gap-1.5'>
                <p className='text-sm leading-none font-medium'>
                  {auth.user?.name || 'User'}
                </p>
                <p className='text-muted-foreground text-xs leading-none'>
                  {auth.user?.email || ''}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setSignOutOpen(true)}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <SignOutDialog open={signOutOpen} onOpenChange={setSignOutOpen} />
      </>
    )
  }

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-auto w-full justify-start gap-3 px-2 py-2'>
            <Avatar className='h-8 w-8'>
              <AvatarImage src={auth.user?.picture} alt={auth.user?.name} />
              <AvatarFallback>
                {auth.user?.name ? getInitials(auth.user.name) : 'U'}
              </AvatarFallback>
            </Avatar>
            <div className='flex flex-col items-start text-left'>
              <span className='text-sm font-medium leading-none'>
                {auth.user?.name || 'User'}
              </span>
              <span className='text-muted-foreground text-xs leading-none mt-1'>
                {auth.user?.email || ''}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56' align='start' side='top' forceMount>
          <DropdownMenuLabel className='font-normal'>
            <div className='flex flex-col gap-1.5'>
              <p className='text-sm leading-none font-medium'>
                {auth.user?.name || 'User'}
              </p>
              <p className='text-muted-foreground text-xs leading-none'>
                {auth.user?.email || ''}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setSignOutOpen(true)}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SignOutDialog open={signOutOpen} onOpenChange={setSignOutOpen} />
    </>
  )
}
