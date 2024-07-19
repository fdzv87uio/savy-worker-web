import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";

import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
import React from "react";
import { getCookie } from "cookies-next";
import { uploadFile } from "@/utils/uploadFilesUtils";

const inter = Inter({ subsets: ["latin"] });

type Inputs = {
    file: {
        name: string;
        url: string;
    };
};

const defaultValues: Inputs = {
    file: {
        name: "",
        url: "",
    },
};

export default function StepTwo() {
    const { control, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({ defaultValues });
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;

    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
    };

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const token = getCookie('curcle-auth-token') as string;
        let uploadedFileUrl = "";

        if (images.length > 0) {
            try {
                const uploadResponse = await uploadFile(images[0].file, token);
                if (uploadResponse.status === 'success') {
                    const uploadedFileName = images[0].file.name;
                    uploadedFileUrl = uploadResponse.data.url;

                    // Actualizar el estado del formulario con el nombre y la URL del archivo
                    data.file.name = uploadedFileName;
                    data.file.url = uploadedFileUrl;

                    console.log(data); // Aquí puedes enviar los datos al backend o hacer cualquier otra acción necesaria
                } else {
                    return;
                }
            } catch (error) {
                console.error(error);
                return;
            }
        }
    };

    return (
        <form className={`absolute w-[250px] md:w-[450px] mt-12 flex flex-col gap-4`} onSubmit={handleSubmit(onSubmit)}>
            {/* File upload */}
            <div className="flex flex-col items-left gap-[5px]">
                <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Upload files</p>
                <ImageUploading
                    multiple
                    value={images}
                    onChange={onChange}
                    maxNumber={maxNumber}
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps
                    }) => (
                        <div className="upload__image-wrapper">
                            <button
                                style={isDragging ? { color: "black" } : undefined}
                                {...dragProps}
                                type="button"
                                className={`placeholder-[#ffffff] p-2 w-full h-full z-[90] focus:outline focus:outline-offset-2 focus:outline-2 focus:outline-[#ffffff] focus:border-[#32A852] bg-transparent border-spacing-[2px] border-[2px] border-[#C4C4C4] rounded-xl ${inter.className} font-normal text-[#9E9E9E] text-sm flex items-center justify-center bg-white-1 gap-3`}
                                onClick={onImageUpload}
                            >
                                <Image src="/icons/round.svg" alt='icon' width={15} height={15} className='w-[48px] h-[48px]' />
                                Share any relevant documents or media
                            </button>
                            <p className={`pl-2 text-[#ffffff] font-normal ${inter.className} text-sm`}>Share any relevant documents or media</p>
                            <div className="flex gap-3 mt-3">
                                {imageList.map((image, index) => (
                                    <div key={index} className="flex gap-3">
                                        <div className="relative">
                                            <img src={image.dataURL} alt="" className="w-[100px] h-[100px] object-cover" />
                                            <Image src="/icons/x.svg" alt="Remove" width={24} height={24} onClick={() => onImageRemove(index)} className="absolute top-[-10px] right-[-10px] cursor-pointer" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {imageList.length > 0 && (
                                <button onClick={onImageRemoveAll} className={`pl-2 text-[#ffffff] font-normal ${inter.className}`}>
                                    Remove all images
                                </button>
                            )}
                        </div>
                    )}
                </ImageUploading>
            </div>
            <Button type="submit" variant="primary" size="sm" className={`w-[95px] h-[36px] px-4 py-2 text-sm font-normal ${inter.className} mt-3`}>
                Next
            </Button>
            {/* Mostrar nombre del archivo */}
            <div>
                <p>File Name: {watch('file.name')}</p>
            </div>
        </form>
    );
}
