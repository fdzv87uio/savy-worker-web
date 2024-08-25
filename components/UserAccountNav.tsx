'use client'

import { User } from '../types/payload-types';
import { Button, buttonVariants } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Link from 'next/link'
// import { useAuth } from '@/hooks/use-auth'
import { toast } from 'sonner'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

const UserAccountNav = ({ user, setCAuth, setUser }: { user: User, setCAuth: any, setUser: any }) => {
  // const { signOut } = useAuth()
  const router = useRouter()

  function handleSignOut() {
    deleteCookie('savy-auth-token');
    deleteCookie('savy-user-email');
    setCAuth('');
    setUser(null);
    toast.success('Logout Successful');
    router.push("/signIn");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className='overflow-visible'>
        <Button
          variant='ghost'
          size='sm'
          className='relative'>
          My Account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='bg-white w-60 font-mono text-sm'
        align='end'>
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            <p className='font-medium text-sm text-secondary'>
              {user.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={`/control-panel`}>Control Panel</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/improve-your-account`}>Improve Your Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`mailto:support@saviworker.com`}>Contact Us</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleSignOut}
          className='cursor-pointer'>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu >
  )
}

export default UserAccountNav
