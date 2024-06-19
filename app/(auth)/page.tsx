import React, { useState } from 'react'
import Hero from '@/components/Hero';
import RecommendedEvents from '@/components/RecommendedEvents';
import SignUpForFree from '@/components/SignUpForFree';
import Image from 'next/image';
import PopularCategories from '@/components/PopularCategories';
import UserReviews from '@/components/UserReviews';

const Home = () => {

  return (
    <div className='flex flex-col justify-center items-center relative'>

      <Image
        src="/images/vector1.svg"
        alt="Ellipse"
        width={581}
        height={307}
        className="absolute top-[600px] left-[250px] object-cover blur-xl"
      />
      <Image
        src="/images/vector2.svg"
        alt="Ellipse"
        width={699}
        height={430}
        className="absolute top-[630px] left-[900px] object-cover blur-xl"
      />
      <Image
        src="/images/vector3.svg"
        alt="Ellipse"
        width={238}
        height={227}
        className="absolute top-[1600px] left-[300px] object-cover blur-xl"
      />
      <Image
        src="/images/vector4.svg"
        alt="Ellipse"
        width={324}
        height={364}
        className="absolute top-[1550px] left-[1200px] object-cover blur-md"
      />
      <Image
        src="/images/vector5.svg"
        alt="Ellipse"
        width={581}
        height={306}
        className="absolute top-[2050px] left-[350px] object-cover blur-2xl"
      />
      <Image
        src="/images/vector6.svg"
        alt="Ellipse"
        width={354}
        height={276}
        className="absolute top-[2450px] left-[500px] object-cover blur-xl"
      />
      <Image
        src="/images/vector7.svg"
        alt="Ellipse"
        width={290}
        height={306}
        className="absolute top-[2450px] left-[400px] object-cover blur-xl"
      />
      <Image
        src="/images/vector6.svg"
        alt="Ellipse"
        width={354}
        height={276}
        className="absolute top-[2450px] left-[1030px] object-cover blur-xl"
      />
      <Image
        src="/images/vector7.svg"
        alt="Ellipse"
        width={290}
        height={306}
        className="absolute top-[2450px] left-[900px] object-cover blur-xl"
      />

      {/* Hero */}
      <Hero />
      {/* Recommended Events */}
      <RecommendedEvents />
      {/* SignUp*/}
      <SignUpForFree />
      {/* Categories */}
      <PopularCategories/>
      {/* User Reviews */}
      <UserReviews/>
    </div>
  )
}

export default Home