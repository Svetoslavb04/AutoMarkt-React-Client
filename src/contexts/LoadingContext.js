import { useState, createContext, useContext } from "react";

export const LoadingContext = createContext();

export const LoadingProvider = (props) => {

    const [isLoading, setIsLoading] = useState(true);

    const toggleLoading = (isLoading) => setIsLoading(isLoading);

    return (
        <LoadingContext.Provider value={{ isLoading, setIsLoading: toggleLoading }}>
            {props.children}
        </LoadingContext.Provider>
    )
}

export const useLoadingContext = () => useContext(LoadingContext);