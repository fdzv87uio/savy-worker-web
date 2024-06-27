'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Image from 'next/image';
import Link from 'next/link';
import { getCookie } from 'cookies-next';
import { useAuthTokenStore } from '@/stores/authTokenStore';
import { Skeleton } from './ui/skeleton';

const Header = () => {
  const [isUser, setIsUser] = useState<boolean | null>(null);
  const { authToken } = useAuthTokenStore();

  useEffect(() => {
    const cookieToken = getCookie('curcle-auth-token');
    setIsUser(!!authToken || !!cookieToken);
  }, [authToken])

  return (
    <div className="sticky top-0 flex size-full z-[94] w-full bg-blue-2 border-spacing-0">
      <section className="flex h-[83px] w-full items-center justify-between px-4">
        <div className="flex items-center w-full">
          <div className="flex justify-between w-full md:px-16">
            <div className='flex justify-center items-center gap-3'>
              <Link href="/">
                <h1 className="text-2xl md:text-4xl font-normal text-gray-1 uppercase">
                  Curcleup
                </h1>
              </Link>
            </div>
            <ul className='hidden xl:flex md:gap-7'>
              <Link href="/">
                <li className='text-2xl font-normal text-green-1 uppercase'>Home</li>
              </Link>
              <Link href="#">
                <li className='text-2xl font-normal text-white-1 uppercase'>Events</li>
              </Link>
              <Link href="#">
                <li className='text-2xl font-normal text-white-1 uppercase'>Tournaments</li>
              </Link>
            </ul>
            <div className='hidden md:flex md:gap-5'>
              {isUser === null ? (
                <>
                  <Skeleton className="w-32 h-10 rounded-xl" />
                  <Skeleton className="w-32 h-10 rounded-xl" />
                </>
              ) : (
                isUser ? (
                  <>
                    <Link href="#">
                      <Button variant="primary" size="sm" className={`uppercase text-sm font-normal ${inter.className} gap-3`}>
                        <Image src="/icons/create.svg" alt='icon' width={20} height={20} className='w-[20px] h-[20px]' />
                        Create Event
                      </Button>
                    </Link>
                    <Link href="#">
                      <Button variant="secondary" size="sm" className={`uppercase text-sm font-normal ${inter.className} gap-3`}>
                        Join event
                        <Image src="/icons/loupe.svg" alt='icon' width={20} height={20} className='w-[20px] h-[20px]' />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/signUp">
                      <Button variant="primary" size="sm" className={`uppercase text-sm font-normal ${inter.className} gap-3`}>
                        <Image src="/icons/signUp.svg" alt='icon' width={20} height={20} className='w-[20px] h-[20px]' />
                        Sign Up
                      </Button>
                    </Link>
                    <Link href="/signIn">
                      <Button variant="secondary" size="sm" className={`uppercase text-sm font-normal ${inter.className} gap-3`}>
                        Sign In
                        <Image src="/icons/signIn.svg" alt='icon' width={20} height={20} className='w-[20px] h-[20px]' />
                      </Button>
                    </Link>
                  </>
                )
              )}
            </div>
            <div className='flex flex-col md:hidden'>
              {isUser === null ? (
                <>
                  <div className='flex flex-col gap-2'>
                    <Skeleton className="w-20 h-4 rounded-md" />
                    <Skeleton className="w-20 h-4 rounded-md" />
                  </div>
                </>
              ) : (
                isUser ? (
                  <>
                    <Link href="#">
                      <Button variant="primary" size="xsm" className={`text-xs font-normal ${inter.className} gap-1 px-2 py-1`}>
                        <Image src="/icons/create.svg" alt='icon' width={15} height={15} className='w-[15px] h-[15px]' />
                        Create Event
                      </Button>
                    </Link>
                    <Link href="#">
                      <Button variant="secondary" size="xsm" className={`text-xs font-normal ${inter.className} gap-1 px-2 py-1`}>
                        Join Event
                        <Image src="/icons/loupe.svg" alt='icon' width={15} height={15} className='w-[15px] h-[15px]' />
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/signUp">
                      <Button variant="primary" size="xsm" className={`text-xs font-normal ${inter.className} gap-1 px-2 py-1`}>
                        <Image src="/icons/signUp.svg" alt='icon' width={15} height={15} className='w-[15px] h-[15px]' />
                        Sign Up
                      </Button>
                    </Link>
                    <Link href="/signIn">
                      <Button variant="secondary" size="xsm" className={`text-xs font-normal ${inter.className} gap-1 px-2 py-1`}>
                        Sign In
                        <Image src="/icons/signIn.svg" alt='icon' width={15} height={15} className='w-[15px] h-[15px]' />
                      </Button>
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Header