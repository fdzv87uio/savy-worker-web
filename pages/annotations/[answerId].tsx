import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

//@ts-ignore
const ReactImageAnnotate: any = dynamic(() => import("react-image-annotate"), {
    ssr: false,
});

const Home = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (typeof window !== "undefined" && typeof document !== "undefined") {
            setTimeout(() => {
                setLoading(false);
            }, 2000)
        }
    }, [])
    return (
        <div className="w-full h-full">
            {loading && (
                <p>Loading...</p>
            )}
            {!loading && (
                <ReactImageAnnotate
                    className={{ width: "100%" }}
                    labelImages
                    regionClsList={["Alpha", "Beta", "Charlie", "Delta"]}
                    images={[
                        {
                            src: "https://i.ibb.co/r0034Cd/66e709f31d68f2f9198a8d63.jpg",
                            name: "Image 1",
                            regions: [],
                        },
                    ]}
                    onExit={(data: any) => {
                        console.log("El Papi did it");
                        console.log(data);
                    }}
                />
            )}
        </div>
    );
};

export default Home;
