import { useState, useEffect } from "react";
import useUpdateEffect from './useUpdateEffect';

export default function useLocalStorage(itemKey) {

    const [itemValue, setItemValue] = useState(JSON.parse(localStorage.getItem(itemKey)));

    useEffect(() => {

        setItemValue(JSON.parse(localStorage.getItem(itemKey)));

    }, []);

    useUpdateEffect(() =>
        itemValue
            ? localStorage.setItem(itemKey, JSON.stringify(itemValue))
            : localStorage.removeItem(itemKey)
        , [itemValue]);

    const getItem = () => itemValue;

    const setItem = (value) => setItemValue(value);

    const removeItem = () => setItemValue(undefined)

    return {
        getItem,
        setItem,
        removeItem,
    }
}