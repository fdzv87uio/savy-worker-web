"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { sidebarLinks } from "@/constants"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { deleteCookie, getCookie } from 'cookies-next';
import { useAuthTokenStore } from "@/stores/authTokenStore"

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const { clearAuthToken } = useAuthTokenStore();

  const handleToggleSubMenu = (label: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  const handleLogout = () => {
    deleteCookie('curcle-auth-token')
    clearAuthToken();
    router.push('/');
  };

  return (
    <section>
      <Sheet>
        <SheetTrigger>
          <Image src="/icons/hamburger.svg" width={30} height={30} alt="menu" className="cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left" className="border-none bg-slate-800">
          <Link href="/" className="flex cursor-pointer items-center gap-1 pb-10 pl-2">
            <Image src="/icons/home.svg" alt="logo" width={23} height={27} />
            <h1 className="text-24 font-extrabold text-white-1 ml-2">Title</h1>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 text-white-1">
                {sidebarLinks.map(({ route, label, imgURL, subMenu }) => {
                  const isActive = pathname === route || pathname.startsWith(`${route}/`);
                  const hasSubMenu = subMenu && subMenu.length > 0;
                  const isSubMenuOpen = openSubMenu === label;

                  return (
                    <div key={label}>
                      <SheetClose asChild>
                        <Link href={route} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-start", {
                          'bg-gradient-radial from-[#B86E9F1F] to-[#6625255F] rounded-lg text-white-2': isActive && !pathname.startsWith(`${route}/`)
                        })}>
                          <Image src={imgURL} alt={label} width={24} height={24} />
                          <p>{label}</p>
                          {hasSubMenu && (
                            <button
                              onClick={(event) => handleToggleSubMenu(label, event)}
                              className="p-2 focus:outline-none ml-auto"
                            >
                              {isSubMenuOpen ? <Image src="/icons/arrowUp.svg" alt="arrowUp" width={24} height={24} /> : <Image src="/icons/arrowUp.svg" alt="arrowUp" width={24} height={24} className='rotate-180' />}
                            </button>
                          )}
                        </Link>
                      </SheetClose>
                      {hasSubMenu && isSubMenuOpen && (
                        <div className="flex flex-col ml-7">
                          {subMenu.map(({ route: subRoute, label: subLabel, imgURL: subImgURL }, index) => {
                            const isSubActive = pathname === subRoute || pathname.startsWith(`${subRoute}/`);
                            const isLastItem = index === subMenu.length - 1;

                            return (
                              <div key={subLabel} className='flex'>
                                <div className='flex flex-col'>
                                  <div className='border-b border-l border-white-2/40 rounded-bl-sm h-full w-[15px]'>
                                  </div>
                                  <div className={`h-full w-[15px] border-white-2/40 ${!isLastItem ? 'border-l' : ''}`}></div>
                                </div>
                                <SheetClose asChild>
                                  <Link href={subRoute} className={cn("flex gap-3 items-center py-2 w-[158px] text-white-2/40 h-[36px]", {
                                    'bg-gradient-radial from-[#B86E9F1F] to-[#6625255F] rounded-lg text-white-2': isSubActive
                                  })}>
                                    <p className="text-xs px-3">{subLabel}</p>
                                  </Link>
                                </SheetClose>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className='h-[1px] w-[208px] bg-gradient-to-r from-[#3772AD00] via-[#9BAEC0] to-[#3772AD00] opacity-60 my-3'></div>
                <div>
                  <div onClick={handleLogout} className="flex gap-3 items-center py-4 justify-start w-[208px] text-white-2/40  px-4 cursor-pointer">
                    <Image src="/icons/logout.svg" alt="Log Out" width={24} height={24} />
                    <p className='text-base shadow-white-2/50 text-shadow-sm'>Log out</p>
                  </div>
                </div>
              </nav>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

export default MobileNav;
