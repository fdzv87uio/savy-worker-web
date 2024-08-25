'use client'

import { usePathname } from 'next/navigation'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { buttonVariants } from './ui/button'

const Footer = ({ relative }: { relative?: boolean }) => {
  const pathname = usePathname()
  const pathsToMinimize = [
    '/inicio',
    '/busqueda',
  ]

  return (
    <footer className={`w-full ${relative ? 'relative bg-white' : 'absolute bottom-[170px] bg-transparent'} flex-grow-0`}>
      <MaxWidthWrapper>
        <div className={`py-10 md:flex md:justify-between flex-row relative`}>
          <div className='text-center md:text-left'>
            <p className='text-sm text-muted-foreground'>
              &copy; {new Date().getFullYear()} All Rights Reserved
            </p>
          </div>

          <div className='mt-4 flex items-center justify-center md:mt-0'>
            <div className='flex space-x-8'>
              <Link
                href='#'
                className='text-xs text-muted-foreground hover:text-gray-600'>
                Terms and Conditions
              </Link>
              <Link
                href='#'
                className='text-xs text-muted-foreground hover:text-gray-600'>
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  )
}

export default Footer
