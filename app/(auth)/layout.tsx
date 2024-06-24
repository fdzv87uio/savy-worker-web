import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col border">
      <Header />
      <main className="relative flex bg-[#0D0A2C00]">
        <section className="flex min-h-screen flex-1 flex-col">
          <div className="mx-auto flex w-full max-w-8xl flex-col max-sm:px-1">
            <div className="flex flex-col justify-center items-center">
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
