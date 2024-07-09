'use client'

import React, { useEffect, useState } from 'react'
import Hero from '@/components/Hero';
import RecommendedEvents from '@/components/RecommendedEvents';
import SignUpForFree from '@/components/SignUpForFree';
import Image from 'next/image';
import PopularCategories from '@/components/PopularCategories';
import UserReviews from '@/components/UserReviews';
import { getCookie } from 'cookies-next';
import UserBanner from '@/components/UserBanner';
import ScheduledEvents from '@/components/ScheduledEvents';
import { Skeleton } from '@/components/ui/skeleton';
import { findUserByEmail } from '@/utils/authUtils';


const Home = () => {
  const [isUser, setIsUser] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState()
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0)
    }
    const token = getCookie('curcle-auth-token')
    const userEmail = getCookie('curcle-user-email')
    if (token && userEmail) {
      // Si existe token, traer la info del usuario con email
      getUserInfo(userEmail, token);
    } else {
      setIsUser(false);
    }
  }, [isUser, setIsUser])

  // Get User info
  async function getUserInfo(email: string, token: string) {
    const res: any = await findUserByEmail(email, token);
    if (res && res.status === "success") {
      setUserInfo(res.data);
      setName(res.data.name);
      setLastname(res.data.lastname);
      setEmail(res.data.email);
      setIsUser(true);
    } else {
      setIsUser(false);
    }

  }

  return (
    <div className='flex flex-col justify-center items-center relative'>
      <Image
        src="/images/vector1.svg"
        alt="Ellipse"
        width={581}
        height={307}
        className="absolute top-[700px] left-[0] object-cover blur-xl w-[581px] h-[307px]"
      />
      <Image
        src="/images/vector2.svg"
        alt="Ellipse"
        width={699}
        height={430}
        className="hidden xl:flex absolute top-[630px] left-[400px] md:left-[700px] object-cover blur-xl"
      />
      <Image
        src="/images/vector3.svg"
        alt="Ellipse"
        width={238}
        height={227}
        className="absolute top-[1800px] left-[100px] object-cover blur-xl w-[238px] h-[227px]"
      />
      <Image
        src="/images/vector4.svg"
        alt="Ellipse"
        width={324}
        height={364}
        className="hidden xl:flex absolute top-[1750px] md:left-[1000px] object-cover blur-md"
      />
      {isUser ? (
        <Image
          src="/images/vector5.svg"
          alt="Ellipse"
          width={581}
          height={306}
          className="hidden xl:flex absolute top-[1800px] left-[150px] object-cover blur-2xl"
        />
      ) : (
        <Image
          src="/images/vector5.svg"
          alt="Ellipse"
          width={581}
          height={306}
          className="hidden xl:flex absolute top-[2250px] left-[150px] object-cover blur-2xl"
        />)}
      {!isUser &&
        <>
          <Image
            src="/images/vector6.svg"
            alt="Ellipse"
            width={354}
            height={276}
            className="hidden xl:flex absolute top-[2650px] left-[300px] object-cover blur-xl"
          />
          <Image
            src="/images/vector7.svg"
            alt="Ellipse"
            width={290}
            height={306}
            className="hidden xl:flex absolute top-[2650px] left-[200px] object-cover blur-xl"
          />
          <Image
            src="/images/vector6.svg"
            alt="Ellipse"
            width={354}
            height={276}
            className="hidden xl:flex absolute top-[2650px] left-[830px] object-cover blur-xl"
          />
          <Image
            src="/images/vector7.svg"
            alt="Ellipse"
            width={290}
            height={306}
            className="hidden xl:flex absolute top-[2650px] left-[700px] object-cover blur-xl"
          />
        </>
      }

      {/* Hero */}
      {isUser === null ? (
        <Skeleton className="h-[116px] w-full rounded-full mt-10" />
      ) : isUser ? (
        <UserBanner name={name} lastname={lastname} email={email} />
      ) : (
        <Hero />
      )}
      {/* Recommended Events */}
      <RecommendedEvents isUser={isUser} userInfo={userInfo} />
      {/* SignUp*/}
      <SignUpForFree isUser={isUser} setIsUser={setIsUser} />
      {/* Categories */}
      {!isUser &&
        <PopularCategories />
      }
      {/* User Reviews */}
      <div className='h-auto w-full mb-[100px] flex flex-col items-center'>
        {isUser && userInfo ? (
          <ScheduledEvents userInfo={userInfo} />
        ) : (
          <UserReviews />
        )}
      </div>
    </div>
  )
}

export default Home