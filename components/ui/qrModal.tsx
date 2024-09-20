import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog";
import QRCode from "react-qr-code";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "./button";

interface QrModalProps {
    url: string;
}

export default function QrModal({ url }: QrModalProps) {
    return (
        <Dialog>
            <DialogTrigger>
                <div className='cursor-pointer w-[44px] h-[44px] flex flex-col justify-center items-center rounded-full bg-[#EBEBEB] hover:bg-[#EBEBEB]/50'>
                    <img src="/icons/share-icon.svg" width={25} height={29} />
                </div>
            </DialogTrigger>
            <DialogContent>
                <div className="w-full h-auto flex flex-col">
                    <div className="w-full h-auto flex flex-col md:grid md:grid-cols-2 items-center gap-5">
                        <div className="w-full h-auto flex flex-col items-center md:items-left col-span-1" >
                            <h3 className={`text-[#ffffff] w-full text-center md:text-left text-[24px] font-mono`}>
                                Share Event
                            </h3>
                            <p className={`font-mono text-[14px] text-center md:text-left md:text-[18px] text-[#ffffff] mt-[14px]`}>
                                Generate QR code and share links
                            </p>
                        </div>
                        <div className="w-full items-center md:items-left h-auto flex flex-col col-span-1" >
                            <div className="hidden md:flex w-[215px] h-auto bg-[#ffffff] p-1">
                                <QRCode
                                    size={215}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    value={url}
                                // viewBox={`0 0 215 215`}
                                />
                            </div>
                            <div className="flex md:hidden w-[150px] h-auto bg-[#ffffff] p-1">
                                <QRCode
                                    size={150}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    value={url}
                                // viewBox={`0 0 215 215`}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-auto grid grid-cols-2 md:grid-cols-3 gap-2.5 items-center mt-12">
                        <div className="w-full h-auto flex flex-col items-center gap-2.5">
                            <div className='cursor-pointer w-[74px] h-[74px] flex flex-col justify-center items-center rounded-full bg-[#EBEBEB] hover:bg-[#EBEBEB]/50'>
                                <img src="/icons/share-icon.svg" width={45} height={49} />
                            </div>
                            <h6 className={`text-[#ffffff] text-[14px] md:text-[17px] font-mono`}>
                                Share Event
                            </h6>
                        </div>
                        <div className="w-full h-auto flex flex-col items-center gap-2.5">
                            <div className='cursor-pointer w-[74px] h-[74px] flex flex-col justify-center items-center rounded-full bg-[#EBEBEB] hover:bg-[#EBEBEB]/50'>
                                <img src="/icons/link-icon.svg" width={45} height={49} />
                            </div>
                            <h6 className={`text-[#ffffff] text-[14px] md:text-[17px] font-mono`}>
                                Share Link
                            </h6>
                        </div>
                        <div className="w-full h-auto flex flex-col col-span-2 md:col-span-1 items-center gap-2.5">
                            <div className='cursor-pointer w-[74px] h-[74px] flex flex-col justify-center items-center rounded-full bg-[#EBEBEB] hover:bg-[#EBEBEB]/50'>
                                <img src="/icons/download-icon.svg" width={45} height={49} />
                            </div>
                            <h6 className={`text-[#ffffff] text-[14px] md:text-[17px] font-mono`}>
                                Download
                            </h6>
                        </div>
                        <DialogClose className="flex md:hidden w-[250px] p-0">
                            <Button variant="default" size="lg" className="mb-4 mt-5 w-[250px]">Finish</Button>
                        </DialogClose>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    )
}