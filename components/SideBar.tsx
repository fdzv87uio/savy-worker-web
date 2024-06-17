'use client';
import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const SideBar = () => {
  const pathname = usePathname();

  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const handleToggleSubMenu = (label: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  return (
    <section className="left_sidebar w-[208px]">
      <div className='image_container flex flex-col justify-start items-center'>
        <div className='flex gap-1 mt-20'>
          <Image className='rounded-full' src="/images/userExample.png" alt="profile" width={61} height={61} />
          <div className='flex flex-col justify-center items-center text-white-1'>
            <h3 className='text-xl'>Hello, Andy</h3>
            <span className={`text-xs bg-primary-1 rounded-full px-3 text-white-1 ${inter.className}`}>Sports Enthusiast</span>
          </div>
        </div>
        <div className='h-[1px] w-[208px] bg-gradient-to-r from-[#3772AD00] via-[#9BAEC0] to-[#3772AD00] opacity-60 my-3'></div>
        <nav className="flex flex-col justify-center items-start">
          {sidebarLinks.map(({ route, label, imgURL, subMenu }) => {
            const isActive = pathname === route || pathname.startsWith(`${route}/`);
            const hasSubMenu = subMenu && subMenu.length > 0;
            const isSubMenuOpen = openSubMenu === label;

            return (
              <div key={label}>
                <Link href={route} className={cn("flex gap-3 items-center py-4 justify-start w-[208px] text-white-2/40  px-4 h-[56px]", {
                  'bg-gradient-radial from-[#B86E9F1F] to-[#6625255F] rounded-lg text-white-2 ': isActive && !pathname.startsWith(`${route}/`)
                })}>
                  <Image src={imgURL} alt={label} width={24} height={24} />
                  <p className='text-base shadow-white-2/50 text-shadow-sm'>{label}</p>
                  {hasSubMenu && (
                    <button
                      onClick={(event) => handleToggleSubMenu(label, event)}
                      className="p-2 focus:outline-none ml-auto"
                    >
                      {isSubMenuOpen ? <Image src="/icons/arrowUp.svg" alt="arrowUp" width={24} height={24} /> : <Image src="/icons/arrowUp.svg" alt="arrowUp" width={24} height={24} className='rotate-180' />}
                    </button>
                  )}
                </Link>
                {hasSubMenu && isSubMenuOpen && (
                  <div className="flex flex-col ml-7">
                    {subMenu.map(({ route: subRoute, label: subLabel, imgURL: subImgURL }, index) => {
                      const isSubActive = pathname === subRoute || pathname.startsWith(`${subRoute}/`);
                      const isLastItem = index === subMenu.length - 1;

                      return (
                        <>
                          <div className='flex'>
                            <div className='flex flex-col'>
                              <div className='border-b border-l border-white-2/40 rounded-bl-sm h-full w-[15px]'>
                              </div>
                              <div className={`h-full w-[15px] border-white-2/40  ${!isLastItem ? 'border-l' : ''}`}></div>
                            </div>
                            <Link href={subRoute} key={subLabel} className={cn("flex gap-3 items-center py-2 w-[158px] text-white-2/40 h-[36px]", {
                              'bg-gradient-radial from-[#B86E9F1F] to-[#6625255F] rounded-lg text-white-2 ': isSubActive
                            })}>
                              {/* <Image src={subImgURL} alt={subLabel} width={20} height={20} /> */}
                              <p className={`text-xs ${inter.className} px-3`}>{subLabel}</p>
                            </Link>
                          </div>
                        </>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        <div className='h-[1px] w-[208px] bg-gradient-to-r from-[#3772AD00] via-[#9BAEC0] to-[#3772AD00] opacity-60 my-3'></div>
        <div>
          <Link href="/#" className="flex gap-3 items-center py-4 justify-start w-[208px] text-white-2/40  px-4">
            <Image src="/icons/logout.svg" alt="Log Out" width={24} height={24} />
            <p className='text-base shadow-white-2/50 text-shadow-sm'>Log out</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SideBar;
