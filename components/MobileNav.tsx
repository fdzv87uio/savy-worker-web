'use client'

import { Menu, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { buttonVariants } from './ui/button'
import { deleteCookie } from 'cookies-next'
import { toast } from 'sonner'

const MobileNav = ({ user, setCAuth, cAuth, setUser }: { user?: any, setCAuth: any, cAuth: any, setUser: any }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const router = useRouter()

  function handleSignOut() {
    setIsOpen(false);
    deleteCookie('savy-auth-token');
    deleteCookie('savy-user-email');
    setCAuth('');
    setUser(null);
    toast.success('Logout Successful');
    router.push("/signIn");

  }



  if (!isOpen)
    return (
      <button
        type='button'
        onClick={() => setIsOpen(true)}
        className='lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
        <Menu className='h-6 w-6' aria-hidden='true' />
      </button>
    )

  return (
    <div>
      <div className='relative z-40 lg:hidden'>
        <div className='fixed inset-0 bg-black bg-opacity-25' />
      </div>

      <div className='fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex'>
        <div className='w-4/5'>
          <div className='relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
            <div className='flex px-4 pb-2 pt-5'>
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
                <X className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>

            {!user && (
              <div className='space-y-6 border-t border-gray-200 px-4 py-6'>

                <div className='flow-root'>
                  <div
                    onClick={() => { router.push('/sign-up'); setIsOpen(false) }}
                    className={buttonVariants({
                      variant: 'default',
                    })}>
                    Join The Team
                  </div>
                </div>
                <div className='flow-root'>
                  <div
                    onClick={() => { router.push('/sign-in'); setIsOpen(false) }}
                    className='-m-2 block p-2 font-medium text-gray-900'>
                    Login
                  </div>
                </div>
              </div>
            )}
            {user && (
              <div className='font-mono text-sm space-y-6 border-t border-gray-200 px-4 py-6'>

                <div className='flow-root'>
                  <div
                    onClick={() => { router.push('/control-panel'); setIsOpen(false) }}
                    className='-m-2 block p-2 font-medium text-gray-900'>
                    Control Panel
                  </div>
                </div>
                <div className='flow-root'>
                  <div
                    onClick={() => { router.push('/improve-your-account'); setIsOpen(false) }}
                    className='-m-2 block p-2 font-medium text-gray-900'>
                    Improve Your Account
                  </div>
                </div>
                <div className='flow-root'>
                  <a
                    href='mailto:support@saviworker.com'
                    className='-m-2 block p-2 font-medium text-gray-900'>
                    Contact Us
                  </a>
                </div>
                <div className='flow-root'>
                  <div
                    onClick={handleSignOut}
                    className='-m-2 block p-2 font-medium text-gray-900'>
                    Logout
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav
