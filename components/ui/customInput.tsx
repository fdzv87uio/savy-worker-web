import { register } from "module";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

interface CustomInputProps {
    name: string
    value: string
    onChange: any
    disabled: boolean
    instructions?: string
    placeholder?: string
    errors?: any
    register: any
}

export default function CustomInput({ name, value, onChange, disabled, instructions, placeholder, errors, register }: CustomInputProps) {

    function handleChange(val: string) {
        onChange(val);
        register();
    }

    return (
        <div className="flex flex-col items-left gap-[5px]">
            <input name={name} placeholder={placeholder} value={value} onChange={(e) => { handleChange(e.target.value) }} className={`placeholder-[#ffffff] p-2 w-full z-[90] h-[36px] focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-[#ffffff] focus:border-[#32A852] bg-transparent border-spacing-[2px] border border-[#C4C4C4] rounded-xl ${inter.className} font-normal text-[#ffffff] text-sm`} />
            {instructions && !errors && (
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>{instructions}</p>
            )}
            {errors && (
                <p className={`pl-2 text-red font-normal ${inter.className} text-sm`}>{errors.message}</p>
            )}
        </div>
    )
}