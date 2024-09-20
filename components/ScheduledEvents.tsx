import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { getAllEvents } from '@/utils/eventsUtils';
import { getAllPreferences, getPreferenceName } from '@/utils/preferencesUtils';
import ScheduledEventCard from './ui/scheduledEventCard';


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
          <ScheduledEventCard key={event._id} event={event} allPrefs={allPrefs} />
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