import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { getAnswerById } from "@/utils/answerUtils";
import { motion } from "framer-motion";
//@ts-ignore
const ReactImageAnnotate: any = dynamic(() => import("react-image-annotate"), {
    ssr: false,
});

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [currentAnswer, setCurrentAnswer] = useState<any>(null);
    const [currentImages, setCurrentImages] = useState<any>();
    const [currentClasses, setCurrentClasses] = useState<any>();
    const path = usePathname();

    useEffect(() => {
        if (path) {
            const pathArray = path.split("/");
            getData(pathArray[2]);
        }
    }, [path])

    async function getData(id: string) {
        const res: any = await getAnswerById(id);
        if (res.status === "success") {
            console.log("answer:");
            console.log(res.data);
            setCurrentAnswer(res.data);
            const currentSample = {
                src: res.data.images[0],
                name: `Image for Task ${res.data._id}`,
                regions: [],
            };
            setCurrentImages([currentSample]);
            setCurrentClasses(res.data.classes);
            setLoading(false);

        }
    }

    return (
        <div className="w-full pt-[30px] relative h-[100vh] flex flex-col">
            {loading && (
                <div className='mt-[40px]' style={{ width: "100%", height: "70vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: 'center', position: "relative" }}>
                    <motion.div transition={{ ease: "linear", duration: 1, type: 'spring', repeatType: 'loop', repeat: Infinity }} style={{ rotate: 0 }} animate={{ rotate: 360, speed: 1 }}>
                        <img alt="" src={'/img/marker-pro.jpg'} width={200} height={200} />
                    </motion.div>
                    <p className='text-center text-secondary mt-[35px] text-3xl'>
                        Loading
                    </p>
                </div>
            )}
            {!loading && (
                <div className="absolute top-[20px] left-0 w-full pt- h-auto flex flex-col justify-start">
                    <ReactImageAnnotate
                        labelImages
                        regionClsList={currentClasses}
                        images={currentImages}
                        onExit={(data: any) => {
                            console.log(data);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
