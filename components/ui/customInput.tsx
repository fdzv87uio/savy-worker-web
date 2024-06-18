import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface CustomInputProps {
    value: string
    onChange: any
    disabled: boolean
    instructions?: string
    placeholder?: string
}

export default function CustomInput({ value, onChange, disabled, instructions, placeholder }: CustomInputProps) {

    return (
        <div className="flex flex-col items-left gap-[5px]">
            <input placeholder={placeholder} value={value} onChange={(e) => { onChange(e.target.value) }} className={`placeholder-[#ffffff] p-2 w-full z-[90] h-[36px] focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-[#ffffff] focus:border-[#32A852] bg-transparent border-spacing-[2px] border border-[#C4C4C4] rounded-xl ${inter.className} font-normal text-[#ffffff] text-sm`} />
            {instructions && (
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>{instructions}</p>
            )}
        </div>
    )
}