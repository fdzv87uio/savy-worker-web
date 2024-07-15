'use client'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "./ui/button"
import Image from "next/image"
import { useState } from "react";
import { Inter, Audiowide } from "next/font/google";
import Link from "next/link";
const audiowide = Audiowide({ subsets: ["latin"], weight: "400" });
import { deleteCookie, getCookie } from 'cookies-next';
import { useAuthTokenStore } from "@/stores/authTokenStore";
import { useRouter } from "next/navigation";

export function NavigationMenuTop({ name }: { name: string }) {
  const router = useRouter();
  const { clearAuthToken } = useAuthTokenStore();

  const handleLogout = () => {
    deleteCookie('curcle-auth-token');
    deleteCookie('curcle-user-email');
    clearAuthToken();
    router.push('/');
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Button variant="primary" size="sm" className='uppercase text-sm font-normal gap-3'>
            <Image src="/images/user-icon.png" alt='icon' width={20} height={20} className='w-[20px] h-[20px]' />
            {name}
            <Image src="/icons/arrowUp.svg" alt="arrowUp" width={24} height={24} />
          </Button>
        </MenubarTrigger>
        <MenubarContent className={`text-base ${audiowide.className} text-white-1 bg-slate-800 mt-5 p-3`}>
          <Link href="/profile">
            <MenubarSub>
              <MenubarSubTrigger className="gap-3 hover:bg-slate-700 cursor-pointer">
                <Image src="/icons/profile.svg" alt="Log Out" width={22} height={22} />
                <p className={`text-base ${audiowide.className}`}>
                  Profile
                </p>
              </MenubarSubTrigger>
              <MenubarSubContent className="bg-slate-800">
                <Link href="/profile/personal-information">
                  <MenubarItem className="hover:bg-slate-700 cursor-pointer">
                    Personal Information
                  </MenubarItem>
                </Link>

                <Link href="/profile/address">
                  <MenubarItem className="hover:bg-slate-700 cursor-pointer">
                    Address
                  </MenubarItem>
                </Link>

                <Link href="/profile/preferences">
                  <MenubarItem className="hover:bg-slate-700 cursor-pointer" >
                    Preferences
                  </MenubarItem>
                </Link>

              </MenubarSubContent>
            </MenubarSub>
          </Link>

          <Link href="/sports">
            <MenubarItem className="gap-3 hover:bg-slate-700 cursor-pointer">
              <Image src="/icons/sports.svg" alt="Log Out" width={22} height={22} />
              <p className={`text-base ${audiowide.className}`}>
                Sports
              </p>
            </MenubarItem>
          </Link>

          <Link href="/gaming">
            <MenubarItem className="gap-3 hover:bg-slate-700 cursor-pointer">
              <Image src="/icons/gaming.svg" alt="Log Out" width={22} height={22} />
              <p className={`text-base ${audiowide.className}`}>
                Gaming
              </p>
            </MenubarItem>
          </Link>

          <Link href="/events">
            <MenubarSub>
              <MenubarSubTrigger className="gap-3 hover:bg-slate-700 cursor-pointer">
                <Image src="/icons/events.svg" alt="Log Out" width={22} height={22} />
                <p className={`text-base ${audiowide.className}`}>
                  Events
                </p>
              </MenubarSubTrigger>
              <MenubarSubContent>
                <Link href="/events/create-event">
                  <MenubarItem className="hover:bg-slate-700 cursor-pointer">Create Event</MenubarItem>
                </Link>
                <Link href="/events/my-events">
                  <MenubarItem className="hover:bg-slate-700 cursor-pointer">My events</MenubarItem>
                </Link>
                <Link href="/events/upcomming-events">
                  <MenubarItem className="hover:bg-slate-700 cursor-pointer">Upcomming events</MenubarItem>
                </Link>
              </MenubarSubContent>
            </MenubarSub>
          </Link>

          <MenubarSeparator />
          <MenubarItem className="gap-3 hover:bg-slate-700 cursor-pointer" onClick={handleLogout}>
            <Image src="/icons/logout.svg" alt="Log Out" width={22} height={22} />
            <p className={`text-base ${audiowide.className}`}>
              Log out
            </p>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
