"use client"

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SideBar from "@/components/SideBar";
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
      <Header />

      <main className="relative flex bg-[#0D0A2C00]">
        {isUser && (
          <>
            <SideBar />
            <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
              <div className="mx-auto flex w-full max-w-8xl flex-col max-sm:px-4">
                <div className="flex flex-col md:pb-14">
                  {/* <Toaster /> */}

                  {children}
                </div>
              </div>
            </section>
          </>
        )}
        {!isUser && (
          <MaxWidthWrapper>
            {children}
          </MaxWidthWrapper>
        )}

      </main>

      <Footer />
    </div>
  );
}
