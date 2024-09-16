"use client"

import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [isUser, setIsUser] = useState(false);
  useEffect(() => {
    const token = getCookie('curcle-auth-token')
    const userEmail = getCookie('curcle-user-email')
    if (token && userEmail) {
      setIsUser(true)
    } else {
      setIsUser(false);
    }
  }, [])
  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-[#0D0A2C00]">
        {children}
      </main>
    </div>
  );
}
