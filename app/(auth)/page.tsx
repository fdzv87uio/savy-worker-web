import React from 'react'
import Hero from '@/components/Hero';
import RecommendedEvents from '@/components/RecommendedEvents';

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      {/* Hero */}
      <Hero />
      {/* Recommended Events */}
      <RecommendedEvents />
    </div>
  )
}

export default Home