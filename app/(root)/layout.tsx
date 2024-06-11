import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import SideBar from "@/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <Header />

      <main className="relative flex bg-black-3">
        <SideBar />

        <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex w-full max-w-8xl flex-col max-sm:px-4">
            <div className="flex h-16 items-center justify-between md:hidden">
              <MobileNav />
            </div>
            <div className="flex flex-col md:pb-14">
              {/* <Toaster /> */}

              {children}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
