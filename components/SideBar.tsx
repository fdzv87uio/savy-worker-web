'use client';
import { sidebarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const SideBar = () => {
  const pathname = usePathname();

  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const handleToggleSubMenu = (label: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setOpenSubMenu(openSubMenu === label ? null : label);
  };

  return (
    <section className="left_sidebar">
      <nav className="flex flex-col gap-6">
        {sidebarLinks.map(({ route, label, imgURL, subMenu }) => {
          const isActive = pathname === route || pathname.startsWith(`${route}/`);
          const hasSubMenu = subMenu && subMenu.length > 0;
          const isSubMenuOpen = openSubMenu === label;

          return (
            <div key={label}>
              <Link href={route} className={cn("flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start w-full", {
                'bg-nav-focus': isActive && !pathname.startsWith(`${route}/`)
              })}>
                <Image src={imgURL} alt={label} width={24} height={24} />
                <p>{label}</p>
                {hasSubMenu && (
                  <button
                    onClick={(event) => handleToggleSubMenu(label, event)}
                    className="p-2 focus:outline-none ml-auto"
                  >
                    {isSubMenuOpen ? '▲' : '▼'}
                  </button>
                )}
              </Link>
              {hasSubMenu && isSubMenuOpen && (
                <div className="flex flex-col gap-3 pl-6">
                  {subMenu.map(({ route: subRoute, label: subLabel, imgURL: subImgURL }) => {
                    const isSubActive = pathname === subRoute || pathname.startsWith(`${subRoute}/`);

                    return (
                      <Link href={subRoute} key={subLabel} className={cn("flex gap-3 items-center py-2", {
                        'bg-nav-focus': isSubActive
                      })}>
                        <Image src={subImgURL} alt={subLabel} width={20} height={20} />
                        <p>{subLabel}</p>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </section>
  );
}

export default SideBar;
