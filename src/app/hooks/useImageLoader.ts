import { useState, useEffect } from 'react';

function useImageLoader(imagesUrl: string[]): boolean {
    const [images, setImages] = useState<Array<{ src: string }>>([]);
    console.log('cipa jeżą');
    useEffect(() => {
        const loadImages = async () => {
            images.forEach((img) => {
                img.src = '';
            });

            const imageList = imagesUrl.map((imageUrl) => {
                const img = new Image();
                img.src = imageUrl;
                return img;
            });
            setImages(imageList);
        };

        loadImages();
        return () => {
            images.forEach((img) => {
                img.src = '';
            });
        };
    }, [imagesUrl]);

    return true;
}

export default useImageLoader;
