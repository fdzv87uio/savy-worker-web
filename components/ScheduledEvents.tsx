import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { Inter } from "next/font/google";
import { getAllEvents } from '@/utils/eventsUtils';
import { getAllPreferences, getPreferenceName } from '@/utils/preferencesUtils';
const inter = Inter({ subsets: ["latin"] });


interface ScheduledEventsProps {
  userInfo: any
}

function ScheduledEvents({ userInfo }: ScheduledEventsProps) {
  const [events, setEvents] = useState([]);
  const [allPrefs, setAllPrefs] = useState([]);

  useEffect(() => {
    if (events.length === 0) {
      getData();
    }
  }, [events, allPrefs])

  async function getData() {
    const res: any = await getAllEvents();
    const res2: any = await getAllPreferences();
    if (res && res.status === "success" && res2 && res2.status === "success") {
      const allEvents = res.data;
      const filtered = allEvents.filter((x: any) => x.guestList.includes(userInfo.email));
      setEvents(filtered);
      setAllPrefs(res2.data);
    }
  }


  return (
    <div className='flex flex-col mt-32 z-10 justify-center items-center mb-32'>
      <h2 className='text-white-1 text-3xl md:text-4xl text-center'>Your scheduled events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center gap-4 mt-20">
        {events.length > 0 && events.map((event: any) => (
          <div key={event._id} className="bg-white rounded-lg shadow-lg w-[350px] md:w-[371px] h-[457px] relative border border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10">
            <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 w-[350px] md:w-[371px] h-[457px]">
            </div>
            <div className='absolute top-0 left-0'>
              <Image src={event.images[0]} alt={event.title} width={371} height={236} className="h-[236px] object-cover rounded-lg" />
              <div className="p-4 flex flex-col mt-5">
                <h3 className="text-white-1 text-xl md:text-2xl">{event.title}</h3>
                <p className={`text-white-1 text-base md:text-lg ${inter.className}`}>Date: {event.date}</p>
                <div className='flex items-center gap-2'>
                  <Image src="/icons/star2.svg" alt="start" width={18} height={18} />
                  <p className={`text-white-1 text-base md:text-lg ${inter.className}`}>{event.guestList.length} Guests</p>
                </div>
                <div className='flex gap-[10px]'>
                  {event.preferenceListIds.map((y: any, key: number) => {
                    return (
                      <div key={`pref_${key}`} className='bg-primary-1 px-3 rounded-full'>
                        <p className={`text-white-1 text-base md:text-lg  ${inter.className}`}>
                          {getPreferenceName(allPrefs, y)}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {events.length === 0 && (
        <div className='w-full h-auto mt-[5px] text-xl text-[#ffffff] flex flex-col items-center font-normal'>
          <p>No Scheduled Events Available</p>
        </div>
      )}
    </div>
  )
}

export default ScheduledEvents