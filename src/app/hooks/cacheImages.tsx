export const cacheImages = async (
    imagesArray: string[],
    setLoaded: (data: boolean) => void
) => {
    const promises = await imagesArray.map((image) => {
        return new Promise(function (resolve, reject) {
            const img = new Image();
            img.src = image;
            img.onload = () => resolve(image);
            img.onerror = () => reject();
        });
    });
    await Promise.all(promises);
    console.log('chuj');
    setLoaded(true);
};
