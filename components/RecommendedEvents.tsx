"use client"

import React, { useEffect, useState } from 'react';
import { Inter } from "next/font/google";
import Image from 'next/image';
import { getAllEvents } from '@/utils/eventsUtils';
import RecommendedEventCard from './ui/recommendedEventCard';
const inter = Inter({ subsets: ["latin"] });

interface RecommendedEventsProps {
  isUser?: boolean;
  userInfo?: any;
}


function RecommendedEvents({ isUser, userInfo }: RecommendedEventsProps) {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (events.length === 0) {
      getEventData();
    }
  }, [events])

  async function getEventData() {
    const res: any = await getAllEvents();
    if (res && res.status === "success") {
      setEvents(res.data);
      console.log(res.data);
      setLoading(false);
    }
  }

  function getIcon(categoryList: string[]) {
    if (categoryList.includes('sports')) {
      return "/images/football-icon.png";
    } else if (categoryList.includes('video-games')) {
      return "/images/gaming-icon.png";
    }
  }

  return (
    <>
      <div className="flex flex-col  justify-center items-center text-white-1 mt-10 max-w-[1123px] md:min-h-[525px] z-10">
        <h2 className="text-3xl md:text-4xl font-normal text-center">Recommended Events</h2>
        {events?.length > 0 && loading === false && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-20">
            {events.map((event: any) => (
              <RecommendedEventCard key={event._id} event={event} isUser={isUser} />
            ))}
          </div>
        )}
        {events.length === 0 && (
          <div className='w-full h-auto mt-[5px] text-xl text-[#ffffff] flex flex-col items-center font-normal'>
            <p>No Scheduled Events Available</p>
          </div>
        )}

      </div>
    </>
  );
};

export default RecommendedEvents;
