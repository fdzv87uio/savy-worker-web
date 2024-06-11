import React from 'react'

const Footer = () => {
  return (
    <div className="flex size-full flex-col bg-black-5">
      <section className="glassmorphism-black flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <div className="flex items-center gap-4 max-md:hidden">
          <div className="flex w-[160px] flex-col">
            <h2 className="text-14 font-semibold text-white-1">
              Footer
            </h2>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Footer