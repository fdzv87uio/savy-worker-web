import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { getAnswerById } from "@/utils/answerUtils";
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

        }
    }



    useEffect(() => {
        if (typeof window !== "undefined" && typeof document !== "undefined") {
            setLoading(false);
        }
    }, [])
    return (
        <div className="w-full relative h-[100vh] flex flex-col">
            {loading && (
                <p>Loading...</p>
            )}
            {!loading && (
                <div className="absolute top-0 left-0 w-full h-auto flex flex-col justify-start">
                    <ReactImageAnnotate
                        labelImages
                        regionClsList={currentClasses}
                        images={currentImages}
                        onExit={(data: any) => {
                            console.log("El Papi did it");
                            console.log(data);
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default Home;
