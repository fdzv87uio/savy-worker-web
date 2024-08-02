import * as React from "react"

import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div className="w-full h-[36px] relative mb-2">
        <input
          type={type}
          className={cn(
            `placeholder-[#ffffff] p-2.5 w-full z-[90] h-[36px] focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-[#ffffff] focus:border-[#32A852] bg-transparent border-spacing-[2px] border-[2px] border-[#C4C4C4] rounded-xl ${inter.className} font-normal text-[#ffffff] text-sm`,
            className
          )}
          ref={ref}
          {...props}
        />
        <img src={"/icons/search.svg"} alt="" width={17} height={17} className='absolute top-3.5 right-4' />
      </div>

    )
  }
)
Input.displayName = "Input"

export { Input }
