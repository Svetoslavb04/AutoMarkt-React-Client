import { useState, createContext, useContext, useEffect, useCallback } from "react";
import { useLocation } from 'react-router-dom';

import useLocalStorage from '../hooks/useLocalStorage';
import { useAuthContext } from "./AuthContext";

import { getWishList, setWishList } from '../services/wishListService';

export const WishListContext = createContext();

export const WishListProvider = (props) => {

    const location = useLocation();

    const { user } = useAuthContext();

    const [items, setItems] = useState([]);

    const { getItem, setItem, removeItem } = useLocalStorage('wishList');

    const [areItemsSettled, setAreItemsSettled] = useState(false);

    const localStorageGetItem = useCallback(() => getItem(), [getItem]);
    const localStorageSetItem = useCallback((item) => setItem(item), [setItem]);
    const localStorageRemoveItem = useCallback(() => removeItem(), [removeItem]);

    useEffect(() => {

        if (location.pathname != '/logout') {

            const localItems = localStorageGetItem() || [];

            if (user.isAuthenticated) {

                const fetchList = async () => {
                    try {
                        const wishList = await getWishList();

                        let resultList = [...localItems, ...wishList]
                            .filter((item, i, items) => items.indexOf(item) == i);

                        setItems(resultList);
                        setAreItemsSettled(true);
                        localStorageRemoveItem();

                    } catch (error) {

                        setItems(localItems);
                        setAreItemsSettled(true);
                        localStorageRemoveItem();
                    }
                }

                fetchList();

            } else {

                setItems(localItems);
                setAreItemsSettled(true);

            }
        }

    }, [user.isAuthenticated, location, localStorageGetItem, localStorageRemoveItem]);

    useEffect(() => {

        if (location.pathname != '/logout' && areItemsSettled) {

            const effect = async () => {
                try {

                    if (user.isAuthenticated) {

                        await setWishList(items);

                    } else if (location.pathname != '/logout') {

                        localStorageSetItem(items);

                    }


                } catch (error) {

                }
            }

            if (areItemsSettled) {
                effect();
            }

        }

    }, [items, areItemsSettled, location.pathname, localStorageSetItem, user.isAuthenticated]);

    return areItemsSettled
        ? <WishListContext.Provider
            value={
                {
                    wishListItems: items,
                    setWishListItems: setItems,
                    wishListItemsCount: items.length
                }
            }
        >
            {props.children}
        </WishListContext.Provider>
        : <></>
}

export const useWishListContext = () => useContext(WishListContext);