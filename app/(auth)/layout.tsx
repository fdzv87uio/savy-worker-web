import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <Header />

      <main className="relative flex bg-black-3 bg-slate-700">
        <section className="flex min-h-screen flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex w-full max-w-8xl flex-col max-sm:px-4">
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
