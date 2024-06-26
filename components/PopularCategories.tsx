import Image from 'next/image';
import React from 'react'

const events = [
  {
    id: 1,
    title: "Football",
    image: "/images/football.png",
  },
  {
    id: 2,
    title: "Tennis",
    image: "/images/tennis.jfif",
  },
  {
    id: 3,
    title: "Basketball",
    image: "/images/basketball2.jfif",
  },
];

const PopularCategories = () => {
  return (
    <div className='flex flex-col mt-32 max-w-[1124px]'>
      <h1 className='text-white-1 text-center text-3xl md:text-4xl'>
        PopularCategories
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-20 w-[300px] md:w-full">
        {events.map((event) => (
          <div key={event.id} className="transform transition-all hover:scale-105">
            <div className="relative">
              <div className='h-[265px] w-[300px] md:w-[361px]'>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover rounded-xl border border-gray-600"
                />
              </div>
              <div className="absolute top-56 left-12 md:left-8 w-[200px] md:w-[300px]">
                <div className="bg-primary-1 py-2 px-4 transform -skew-x-12 shadow-custom-secondary">
                  <h3 className="text-2xl text-center transform  skew-x-12 text-white-1">{event.title}</h3>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularCategories