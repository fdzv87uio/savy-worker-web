// import * as React from "react"

// import { cn } from "@/lib/utils";
// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

// export interface InputProps
//   extends React.InputHTMLAttributes<HTMLInputElement> { }

// const InputFile = React.forwardRef<HTMLInputElement, InputProps>(
//   ({ className, ...props }, ref) => {
//     return (
//       <input
//         type='file'
//         className={cn(
//           `placeholder-[#ffffff] p-2 w-full z-[90] h-[88px] focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-[#ffffff] focus:border-[#32A852] bg-transparent border-spacing-[2px] border-[2px] border-[#C4C4C4] rounded-xl font-mono font-normal text-[#ffffff] text-sm flex items-center justify-center`,
//           className
//         )}
//         ref={ref}
//         {...props}
//       />
//     )
//   }
// )
// InputFile.displayName = "Input"

// export { InputFile }

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const InputFile = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const fileInputRef = React.useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
      fileInputRef.current?.click();
    };

    return (
      <div className="relative w-full h-[88px]">
        <input
          type='file'
          className="hidden"
          ref={(el) => {
            if (ref) {
              if (typeof ref === 'function') {
                ref(el);
              } else {
                ref.current = el;
              }
            }
            fileInputRef.current = el;
          }}
          {...props}
        />
        <button
          type="button"
          className={cn(
            `placeholder-[#ffffff] p-2 w-full h-full z-[90] focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-[#ffffff] focus:border-[#32A852] bg-transparent border-spacing-[2px] border-[2px] border-[#C4C4C4] rounded-xl font-mono font-normal text-[#9E9E9E] text-sm flex items-center justify-center bg-white-1 gap-3`,
            className
          )}
          onClick={handleButtonClick}
        >
          <Image src="/icons/round.svg" alt='icon' width={15} height={15} className='w-[48px] h-[48px]' />
          Share any relevant documents or media
        </button>
      </div>
    );
  }
);
InputFile.displayName = "InputFile";

export { InputFile };
