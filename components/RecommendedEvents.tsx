import React from 'react';

import { Inter } from "next/font/google";
import Image from 'next/image';
const inter = Inter({ subsets: ["latin"] });
const events = [
  {
    id: 1,
    title: "Football Match",
    location: "Sports Complex",
    city: "Gillette",
    image: "/images/football.png",
    icon: "/images/football-icon.png",
  },
  {
    id: 2,
    title: "Gaming Meetup",
    location: "Sports Complex",
    city: "Gillette",
    image: "/images/gaming.jfif",
    icon: "/images/gaming-icon.png",
  },
  {
    id: 3,
    title: "Football Match",
    location: "Sports Complex",
    city: "Gillette",
    image: "/images/football.png",
    icon: "/images/football-icon.png",
  },
];

const RecommendedEvents = () => {

  const isUser = true;
  return (
    <div className="text-white-1 mt-10 max-w-[1123px] min-h-[525px]">
      <h2 className="text-4xl font-normal text-center">Recommended Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-20">
        {events.map((event) => (
          <div key={event.id} className="min-h-[407px] w-[361px] bg-white-1 rounded-xl overflow-hidden shadow-xl transform transition-all hover:scale-105">
            <div className="relative">
              <img src={event.image} alt={event.title} className="w-full h-64 object-cover rounded-xl" />
              <div className="absolute bottom-[-30px] left-0 bg-green-600 p-2 rounded-full m-4">
                <img src={event.icon} alt={event.title} className="w-6 h-6" />
              </div>
            </div>
            <div className="p-4">
              <div className="relative mb-4">
                <div className="bg-secondary-1 py-2 px-4 transform -skew-x-12 shadow-custom-primary">
                  <h3 className="text-2xl text-center transform  skew-x-12 text-white-1">{event.title}</h3>
                </div>
              </div>
              {isUser &&
                <div className='flex flex-col justify-center items-center gap-3'>
                  <Image src="/images/userExample.png" alt="Profile photo" className="rounded-full" width={53} height={53} />
                  <h2 className='text-black-1 text-2xl'>Cameron Williamson</h2>
                </div>
              }
              <div className="text-center mt-4">
                <p className={`${inter.className} text-black-1`}>Location: {event.location}</p>
                <p className={`${inter.className} text-black-1`}>{event.city}</p>
              </div>
              {isUser &&
                <div className='flex justify-center gap-10 mt-3'>
                  <Image src="/icons/heart.svg" alt="heart" className="rounded-full" width={53} height={53} />
                  <Image src="/icons/calendar.svg" alt="calendat" className="rounded-full" width={53} height={53} />
                  <Image src="/icons/thumb.svg" alt="thumb" className="rounded-full" width={53} height={53} />
                </div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedEvents;
