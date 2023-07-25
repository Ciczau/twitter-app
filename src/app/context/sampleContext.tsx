import React, { useState, useMemo } from 'react';

export interface sampleContextState {
    isSample: boolean;
    setIsSample: (value: boolean) => void;
}

const DEFAUL_STATE: sampleContextState = {
    isSample: true,
    setIsSample: () => {},
};

export const SampleContext = React.createContext(DEFAUL_STATE);

export function useSampleContext(): sampleContextState {
    const context = React.useContext<sampleContextState>(SampleContext);
    if (context === undefined) {
        throw new Error(
            'useSampleContext must be used within a UseSampleContextProvider'
        );
    }
    return context;
}

interface Props {
    children: React.ReactNode;
}

export const CvvModalProvider: React.FC<Props> = ({ children }: Props) => {
    const [isSample, setIsSample] = useState<boolean>(false);

    const value = useMemo<sampleContextState>(
        () => ({
            isSample,
            setIsSample,
        }),
        [isSample, setIsSample]
    );

    return (
        <SampleContext.Provider value={value}>
            {children}
        </SampleContext.Provider>
    );
};
