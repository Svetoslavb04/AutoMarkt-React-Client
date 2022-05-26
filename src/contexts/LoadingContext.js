import { useState, createContext, useContext, useCallback } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = (props) => {

    const [isLoading, setIsLoading] = useState(true);

    const toggleLoading = useCallback((isLoading) => setIsLoading(isLoading), [setIsLoading]);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading: toggleLoading }}>
            {props.children}
        </LoadingContext.Provider>
    )
}

export const useLoadingContext = () => useContext(LoadingContext);