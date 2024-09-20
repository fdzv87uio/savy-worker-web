import dynamic from 'next/dynamic';
import React, { useState } from 'react';
//@ts-ignore
const ReactImageAnnotate: any = dynamic(() => import('react-image-annotate'), { ssr: false });


const Annotation = () => {
    const [annotations, setAnnotations] = useState<any>([]);

    const handleAddAnnotation = (annotation: any) => {
        setAnnotations([...annotations, annotation]);
    };

    return (
        <ReactImageAnnotate
            labelImages
            regionClsList={["Alpha", "Beta", "Charlie", "Delta"]}
            regionTagList={["tag1", "tag2", "tag3"]}
            images={[
                {
                    src: "https://i.ibb.co/wJzL6gs/66e87e7a9243bf71ff746a58.jpg",
                    name: "Image 1",
                    regions: annotations,
                },
            ]}
            onAddAnnotation={handleAddAnnotation}
        />
    );
};

export default Annotation;