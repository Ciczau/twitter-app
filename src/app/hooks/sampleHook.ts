import React, { useEffect, useState } from 'react';

const useExampleHook = () => {
    const [isSample, setIsSample] = useState<boolean>(false);

    useEffect(() => {
        function handleOnline() {
            setIsSample(true);
        }
        function handleOffline() {
            setIsSample(false);
        }
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return isSample;
};
