import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
interface UserBannerProps {
  name: string;
  lastname: string;
  email: string;
}

function UserBanner({ name, lastname, email }: UserBannerProps) {
  return (
    <div className='flex w-full relative mt-10'>
      <div className='flex items-center w-full rounded-full bg-gradient-to-r from-[#3772AD] to-[#3772AD80] md:via-[#3772AD] md:to-[#3772AD00] h-[116px]'>
        <div className="flex items-center w-full rounded-full bg-[url('/images/banner.jfif')] bg-cover bg-left-bottom opacity-30 h-[116px]">
        </div>
      </div>
      <div className='absolute inset-0 flex items-center justify-start w-full h-[116px] px-6'>
        <div className='text-white flex items-center gap-3'>
          <Link href='/profile'>
            <Image src="/images/user-icon.png" alt="Profile photo" className="rounded-full" width={63} height={63} />
          </Link>
          <div className='flex flex-col justify-start items-start gap-1'>
            <h1 className="text-xl md:text-2xl text-white-1">Hello, {name} {lastname}</h1>
            <div className=' bg-primary-1 px-3 rounded-full'>
              <p className={`font-mono text-sm text-white-1 `}>{email}</p>
            </div>
            <p className={`font-mono text-white-1 text-sm md:text-base`}>Welcome back to our platform</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default UserBanner