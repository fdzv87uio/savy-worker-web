'use client'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

import Image from 'next/image';
import Link from 'next/link';
import { getCookie, deleteCookie } from 'cookies-next';
import { useAuthTokenStore } from '@/stores/authTokenStore';
import { Skeleton } from './ui/skeleton';
import { usePathname, useRouter } from 'next/navigation';
import { findUserByEmail } from '@/utils/authUtils';
import { NavigationMenuTop } from './NavigationMenuTop';
import { useHeaderLinkStore } from '@/stores/headerLinkStore';

const Header = () => {
  const { headerLink, setHeaderLink }: any = useHeaderLinkStore();
  const [isUser, setIsUser] = useState<boolean | null>(null);
  const [name, setName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState("");
  const { authToken, clearAuthToken } = useAuthTokenStore();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {

  }, [isUser, setIsUser])

  // Get User info
  async function getUserInfo(email: string, token: string) {
    const res: any = await findUserByEmail(email, token);
    if (res && res.status === "success") {
      setName(res.data.name);
    }
  }


  useEffect(() => {
    function isTokenExpired(token: string): boolean {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
        return currentTime > payload.exp;
      } catch (error) {
        console.error("Invalid token", error);
        return true;
      }
    }
    function checkTokenValidity() {
      const cookieToken = getCookie('curcle-auth-token');
      const userEmail = getCookie('curcle-user-email')
      if (!cookieToken || isTokenExpired(cookieToken as string)) {
        deleteCookie('curcle-auth-token')
        clearAuthToken();
        setIsUser(false);
        // router.push('/signIn');
      }
      setIsUser(!!authToken || !!cookieToken);
      if (cookieToken && userEmail) {
        getUserInfo(userEmail, cookieToken);

      }
    }

    checkTokenValidity();
  }, [authToken])

  function handleLinkClick(target: string) {
    if (target === "home") {
      setHeaderLink("home");
      router.push("/");
    } else if (target === "events") {
      setHeaderLink("events");
      router.push('/search');
    } else if (target === "tournaments") {
      setHeaderLink("tournaments");
      router.push("/tournaments");
    }
  }

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
              <div onClick={() => { handleLinkClick("home") }}>
                <li className={`text-2xl font-normal ${headerLink === "home" ? "text-green-1" : "text-white-1"} cursor-pointer uppercase`}>Home</li>
              </div>
              <div onClick={() => { handleLinkClick("events") }}>
                <li className={`text-2xl font-normal ${headerLink === "events" ? "text-green-1" : "text-white-1"} cursor-pointer uppercase`}>Events</li>
              </div>
              <div onClick={() => { handleLinkClick("tournaments") }}>
                <li className={`text-2xl font-normal ${headerLink === "" ? "text-green-1" : "text-white-1"} cursor-pointer uppercase`}>Tournaments</li>
              </div>
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
                    <NavigationMenuTop name={name} />
                  </>
                ) : (
                  <>
                    <Link href="/signUp">
                      <Button variant="default" size="sm" className={`uppercase text-sm font-normal font-mono gap-3`}>
                        <Image src="/icons/signUp.svg" alt='icon' width={20} height={20} className='w-[20px] h-[20px]' />
                        Sign Up
                      </Button>
                    </Link>
                    <Link href="/signIn">
                      <Button variant="secondary" size="sm" className={`uppercase text-sm font-normal font-mono gap-3`}>
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
                    <NavigationMenuTop name={name} />
                  </>
                ) : (
                  <>
                    <Link href="/signUp">
                      <Button variant="default" size="sm" className={`text-xs font-normal font-mono gap-1 px-2 py-1`}>
                        <Image src="/icons/signUp.svg" alt='icon' width={15} height={15} className='w-[15px] h-[15px]' />
                        Sign Up
                      </Button>
                    </Link>
                    <Link href="/signIn">
                      <Button variant="secondary" size="sm" className={`text-xs font-normal font-mono gap-1 px-2 py-1`}>
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