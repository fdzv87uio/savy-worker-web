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
import Link from "next/link";
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
          <div className='uppercase gap-3 border inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-xl px-3 border-b-4 bg-primary-1 text-white-1 hover:bg-primary-1/90 border-primary-2'>
            <Image src="/images/user-icon.png" alt='icon' width={20} height={20} className='w-[20px] h-[20px]' />
            {name}
            <Image src="/icons/arrowUp.svg" alt="arrowUp" width={24} height={24} className="rotate-180" />
          </div>
        </MenubarTrigger>
        <MenubarContent className={`text-base font-mono text-white-1 bg-slate-800 mt-5 p-3`}>
          {/* <Link href="/profile">
            <MenubarSub>
              <MenubarSubTrigger className="gap-3 hover:bg-slate-700 cursor-pointer">
                <Image src="/icons/profile.svg" alt="Log Out" width={22} height={22} />
                <p className={`text-base font-mono`}>
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
          </Link> */}

          <Link href="/profile">
            <MenubarItem className="gap-3 hover:bg-slate-700 cursor-pointer">
              <Image src="/icons/profile.svg" alt="Log Out" width={22} height={22} />
              <p className={`text-base font-mono`}>
                Profile
              </p>
            </MenubarItem>
          </Link>

          <Link href="/sports">
            <MenubarItem className="gap-3 hover:bg-slate-700 cursor-pointer">
              <Image src="/icons/sports.svg" alt="Log Out" width={22} height={22} />
              <p className={`text-base font-mono`}>
                Sports
              </p>
            </MenubarItem>
          </Link>

          <Link href="/gaming">
            <MenubarItem className="gap-3 hover:bg-slate-700 cursor-pointer">
              <Image src="/icons/gaming.svg" alt="Log Out" width={22} height={22} />
              <p className={`text-base font-mono`}>
                Gaming
              </p>
            </MenubarItem>
          </Link>

          <Link href="/events">
            <MenubarItem className="gap-3 hover:bg-slate-700 cursor-pointer">
              <Image src="/icons/events.svg" alt="Log Out" width={22} height={22} />
              <p className={`text-base font-mono`}>
                Events
              </p>
            </MenubarItem>
          </Link>

          {/* <Link href="/events">
            <MenubarSub>
              <MenubarSubTrigger className="gap-3 hover:bg-slate-700 cursor-pointer">
                <Image src="/icons/events.svg" alt="Log Out" width={22} height={22} />
                <p className={`text-base font-mono`}>
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
          </Link> */}

          <MenubarSeparator />
          <MenubarItem className="gap-3 hover:bg-slate-700 cursor-pointer" onClick={handleLogout}>
            <Image src="/icons/logout.svg" alt="Log Out" width={22} height={22} />
            <p className={`text-base font-mono`}>
              Log out
            </p>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
