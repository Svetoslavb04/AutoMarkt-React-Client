import { useState, useEffect } from "react";
import useUpdateEffect from './useUpdateEffect';

export default function useLocalStorage() {

    const [items, setItems] = useState({});

    useEffect(() => {

        const itemsKeys = Object.keys(localStorage)

        if (itemsKeys) {

            itemsKeys.forEach(key => {
                items[key] = JSON.parse(localStorage.getItem(key));
            });

            setItems(items);
        }

    }, []);

    useUpdateEffect(() => {

        localStorage.clear();

        const itemsKeys = Object.keys(items);

        if (itemsKeys) {
            try {
                itemsKeys.forEach(key => {
                    localStorage.setItem(key, JSON.stringify(items[key]));
                });
            } catch (error) {

            }

        }

    }, [items]);

    const getItem = (item) =>
        items[item]
            ? items[item]
            : undefined;

    const setItem = (item, value) => {

        const newItems = items;
        newItems[item] = value;

        setItems({ ...newItems });
    }

    const removeItem = (item) => {
        if (items[item]) {

            let updatedItems = {...items};

            delete updatedItems[item];
            console.log(items);
            console.log(updatedItems);
            setItems(updatedItems);

        }
    }

    const clear = () => setItems({});

    return {
        items,
        getItem,
        setItem,
        removeItem,
        clear
    }
}