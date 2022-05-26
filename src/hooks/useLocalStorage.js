import { useState, useEffect, useCallback } from "react";
import useUpdateEffect from './useUpdateEffect';

export default function useLocalStorage(itemKey) {

    const [itemValue, setItemValue] = useState(JSON.parse(localStorage.getItem(itemKey)));

    useEffect(() => {

        setItemValue(JSON.parse(localStorage.getItem(itemKey)));

    }, [itemKey]);

    useUpdateEffect(() => {

        if (itemValue) {
            
            localStorage.setItem(itemKey, JSON.stringify(itemValue))

        } else {

            localStorage.removeItem(itemKey);
        }

    }, [itemValue]);

    const getItem = useCallback(() => JSON.parse(localStorage.getItem(itemKey)), [itemKey]);

    const setItem = useCallback((value) => setItemValue(value), []);

    const removeItem = useCallback(() => setItemValue(undefined), []);

    return {
        getItem,
        setItem,
        removeItem,
    }
}