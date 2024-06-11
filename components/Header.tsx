import React from 'react'

const Header = () => {
  return (
    <div className="sticky top-0 flex size-full flex-col bg-black-5 z-50">
      <section className="glassmorphism-black flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <div className="flex items-center gap-4 max-md:hidden">
          <div className="flex w-[160px] flex-col">
            <h2 className="text-14 truncate font-semibold text-white-1">
              Header
            </h2>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Header