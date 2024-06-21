'use client'

import React, { useEffect, useState } from 'react'
import Hero from '@/components/Hero';
import RecommendedEvents from '@/components/RecommendedEvents';
import SignUpForFree from '@/components/SignUpForFree';
import Image from 'next/image';
import PopularCategories from '@/components/PopularCategories';
import UserReviews from '@/components/UserReviews';
import { useAuthStore } from '@/stores/authStore';
import UserBanner from '@/components/UserBanner';
import ScheduledEvents from '@/components/ScheduledEvents';

const Home = () => {
  const authStore: any = useAuthStore();
  const isUser = true;
  useEffect(() => {
    console.log('auth-token:');
    console.log(authStore.authToken);
  }, [])
  return (
    <div className='flex flex-col justify-center items-center relative'>
      <Image
        src="/images/vector1.svg"
        alt="Ellipse"
        width={581}
        height={307}
        className="absolute top-[600px] left-[0] object-cover blur-xl"
      />
      <Image
        src="/images/vector2.svg"
        alt="Ellipse"
        width={699}
        height={430}
        className="absolute top-[630px] left-[700px] object-cover blur-xl"
      />
      <Image
        src="/images/vector3.svg"
        alt="Ellipse"
        width={238}
        height={227}
        className="absolute top-[1600px] left-[100px] object-cover blur-xl"
      />
      <Image
        src="/images/vector4.svg"
        alt="Ellipse"
        width={324}
        height={364}
        className="absolute top-[1550px] left-[1000px] object-cover blur-md"
      />
      {isUser ? (
        <Image
          src="/images/vector5.svg"
          alt="Ellipse"
          width={581}
          height={306}
          className="absolute top-[1900px] left-[150px] object-cover blur-2xl"
        />
      ) : (
        <Image
          src="/images/vector5.svg"
          alt="Ellipse"
          width={581}
          height={306}
          className="absolute top-[2050px] left-[150px] object-cover blur-2xl"
        />)}
      {!isUser &&
        <>
          <Image
            src="/images/vector6.svg"
            alt="Ellipse"
            width={354}
            height={276}
            className="absolute top-[2450px] left-[300px] object-cover blur-xl"
          />
          <Image
            src="/images/vector7.svg"
            alt="Ellipse"
            width={290}
            height={306}
            className="absolute top-[2450px] left-[200px] object-cover blur-xl"
          />
          <Image
            src="/images/vector6.svg"
            alt="Ellipse"
            width={354}
            height={276}
            className="absolute top-[2450px] left-[830px] object-cover blur-xl"
          />
          <Image
            src="/images/vector7.svg"
            alt="Ellipse"
            width={290}
            height={306}
            className="absolute top-[2450px] left-[700px] object-cover blur-xl"
          />
        </>
      }

      {/* Hero */}
      {isUser ? (
        <UserBanner />
      ) : (
        <Hero />
      )}
      {/* Recommended Events */}
      <RecommendedEvents />
      {/* SignUp*/}
      <SignUpForFree />
      {/* Categories */}
      {!isUser &&
        <PopularCategories />
      }
      {/* User Reviews */}
      {isUser ? (
        <ScheduledEvents />
      ) : (
        <UserReviews />
      )}
    </div>
  )
}

export default Home