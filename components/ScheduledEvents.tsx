import Image from 'next/image';
import React from 'react'
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });


const events = [
  {
    id: 1,
    image: '/images/event.jfif', // Asegúrate de reemplazar esto con la ruta correcta de la imagen
    title: 'Basketball Tournament',
    date: '05/05/2024',
    orders: 175,
    tag: 'Basketball'
  },
  {
    id: 2,
    image: '/images/event.jfif', // Asegúrate de reemplazar esto con la ruta correcta de la imagen
    title: 'Basketball Tournament',
    date: '05/05/2024',
    orders: 175,
    tag: 'Basketball'
  },
  {
    id: 3,
    image: '/images/event.jfif', // Asegúrate de reemplazar esto con la ruta correcta de la imagen
    title: 'Basketball Tournament',
    date: '05/05/2024',
    orders: 175,
    tag: 'Basketball'
  },
];

const ScheduledEvents = () => {
  return (
    <div className='flex flex-col mt-32 z-10 justify-center items-center mb-32'>
      <h2 className='text-white-1 text-3xl md:text-4xl text-center'>Your scheduled events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center gap-4 mt-20">
        {events.map((event) => (
          <div key={event.id} className="bg-white rounded-lg shadow-lg w-[350px] md:w-[371px] h-[457px] relative border border-[rgba(255,255,255,0.2)] bg-[#ffffff]/10">
            <div className="flex items-center bg-[url('/images/card-bg.png')] bg-cover bg-left-bottom opacity-10 w-[350px] md:w-[371px] h-[457px]">
            </div>
            <div className='absolute top-0 left-0'>
              <Image src={event.image} alt={event.title} width={371} height={236} className="h-[236px] object-cover rounded-lg" />
              <div className="p-4 flex flex-col mt-5">
                <h3 className="text-white-1 text-xl md:text-2xl">{event.title}</h3>
                <p className={`text-white-1 text-base md:text-lg ${inter.className}`}>Date: {event.date}</p>
                <div className='flex items-center gap-2'>
                  <Image src="/icons/star2.svg" alt="start" width={18} height={18} />
                  <p className={`text-white-1 text-base md:text-lg ${inter.className}`}>{event.orders} Orders</p>
                </div>
                <div className='flex'>
                  <div className='bg-primary-1 px-3 rounded-full'>
                    <p className={`text-white-1 text-base md:text-lg  ${inter.className}`}>
                      {event.tag}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScheduledEvents