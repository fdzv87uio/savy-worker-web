import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const profileData = [
  {
    id: 1,
    name: "Adam Smith",
    username: "ortayblack",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    image: '/images/userExample2.png',
  },
  {
    id: 2,
    name: "Adam Smith",
    username: "ortayblack",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    image: '/images/userExample2.png',
  },
  {
    id: 3,
    name: "Adam Smith",
    username: "ortayblack",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    image: '/images/userExample2.png',
  },
  {
    id: 4,
    name: "Adam Smith",
    username: "ortayblack",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    image: '/images/userExample2.png',
  },
  {
    id: 5,
    name: "Adam Smith",
    username: "ortayblack",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    image: '/images/userExample2.png',
  },
  {
    id: 1,
    name: "Adam Smith",
    username: "ortayblack",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.",
    image: '/images/userExample2.png',
  },
];


const UserReviews = () => {
  return (
    <div className='text-white-1 mt-28'>
      <h2 className='text-4xl text-center'>
        UserReviews
      </h2>
      <div className='w-[1024px] mt-10'>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {profileData.map((profile) => (
              <CarouselItem key={profile.id} className="md:basis-1/2 lg:basis-1/2">
                <Card className='flex items-center justify-center bg-gradient-to-r from-[#FFFFFF]/10 to-[#D9D9D9]/10 border border-gray-600'>
                    <CardContent className="flex items-start justify-center w-[525px] h-[289px] flex-col">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-12 w-12">
                          <Image src={profile.image} alt={profile.name} width={65} height={65} className="rounded-full"/>
                        </div>
                        <div>
                          <div className='flex justify-start items-start'>
                            <h3 className="text-2xl">{profile.name}</h3>
                            <Image src="/icons/check.svg" alt="check" width={14} height={14} />
                          </div>
                          <p className={`text-neutral-1 ${inter.className}`}>{profile.username}</p>
                          <div className='flex'>
                            <Image src="/icons/star.svg" alt="start" width={12} height={12} />
                            <Image src="/icons/star.svg" alt="start" width={12} height={12} />
                            <Image src="/icons/star.svg" alt="start" width={12} height={12} />
                            <Image src="/icons/star.svg" alt="start" width={12} height={12} />
                            <Image src="/icons/star.svg" alt="start" width={12} height={12} />
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 max-w-[440px]">
                        <p className={`text-neutral-2 ${inter.className}`}>{profile.description}</p>
                      </div>
                    </CardContent>
                  </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="flex mt-4 space-x-1 justify-center gap-3">
          <span className="block w-4 h-4 bg-gray-400 rounded-full"></span>
          <span className="block w-4 h-4 bg-gray-400 rounded-full"></span>
          <span className="block w-4 h-4 bg-blue-500 rounded-full"></span>
          <span className="block w-4 h-4 bg-gray-400 rounded-full"></span>
          <span className="block w-4 h-4 bg-gray-400 rounded-full"></span>
        </div>
      </div>
    </div>
  )
}

export default UserReviews