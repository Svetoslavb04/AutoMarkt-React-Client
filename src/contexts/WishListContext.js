import { useState, createContext, useContext, useEffect, useCallback } from "react";
import { useLocation } from 'react-router-dom';

import useLocalStorage from '../hooks/useLocalStorage';

import { useAuthContext } from "./AuthContext";

import { getWishList, setWishList } from '../services/wishListService';

export const WishListContext = createContext();

export const WishListProvider = (props) => {

    const location = useLocation();

    const { user } = useAuthContext();

    const [items, setItems] = useState({ list: [], updateAPIList: false });

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
                        setAreItemsSettled(true);

                        const wishList = await getWishList();

                        if (localItems.length > 0) {

                            let resultList = [...localItems, ...wishList]
                                .filter((item, i, items) => items.indexOf(item) == i);

                            setItems({ list: resultList, updateAPIList: true });

                        } else {
                            setItems({ list: wishList, updateAPIList: false });
                        }

                        localStorageRemoveItem();

                    } catch (error) {

                        setAreItemsSettled(true);
                        setItems({ list: localItems, updateAPIList: true });
                        localStorageRemoveItem();

                    }
                }

                fetchList();

            } else {

                setItems({ list: localItems, updateAPIList: false });
                setAreItemsSettled(true);

            }
        }

    }, [user.isAuthenticated, location, localStorageGetItem, localStorageRemoveItem]);

    useEffect(() => {
        
        if (location.pathname != '/logout' && areItemsSettled) {

            const effect = async () => {
                try {

                    if (user.isAuthenticated && items.updateAPIList) {

                        await setWishList(items.list);

                    } else if (location.pathname != '/logout' && !user.isAuthenticated) {

                        localStorageSetItem(items.list);

                    }


                } catch (error) {

                }
            }

            if (areItemsSettled) {
                effect();
            }

        }

    }, [items, areItemsSettled, localStorageSetItem, location.pathname, user.isAuthenticated]);

    const setWishListItems = (items) => {
        setItems({ list: items, updateAPIList: true });
    }

    return areItemsSettled
        ? <WishListContext.Provider
            value={
                {
                    wishListItems: items.list,
                    setWishListItems: setWishListItems,
                    wishListItemsCount: items?.list?.length || 0
                }
            }
        >
            {props.children}
        </WishListContext.Provider>
        : <></>
}

export const useWishListContext = () => useContext(WishListContext);