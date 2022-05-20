import { useState, createContext, useContext, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import useUpdateEffect from "../hooks/useUpdateEffect";
import { useAuthContext } from "./AuthContext";

import { getWishList, setWishList } from '../services/wishListService';

export const WishListContext = createContext();

export const WishListProvider = (props) => {

    const location = useLocation();

    const { user } = useAuthContext();

    const [items, setItems] = useState([]);

    const { getItem, setItem, removeItem } = useLocalStorage('wishList');

    const [areItemsSettled, setAreItemsSettled] = useState(false);

    useEffect(() => {

        setAreItemsSettled(false);

        if (!user.isAuthenticated || (location.pathname == '/logout' && user.isAuthenticated)) {
            const wishList = getItem();

            if (wishList) {

                setItems([...wishList]);

            }

        } else {
            getWishList()
                .then(wishList => {

                    setItems([...wishList]);

                })
                .catch(err => err)
        }

    }, [location]);

    useUpdateEffect(() => {

        if (!user.isAuthenticated) {

            setItem(items);

        } else {

            setWishList(items);

        }

        setAreItemsSettled(true);

    }, [items]);

    useUpdateEffect(() => {
        if (user.isAuthenticated) {

            removeItem();

            getWishList()
                .then(wishList => {

                    items.forEach(item =>
                        !wishList.includes(item)
                            ? wishList.push(item)
                            : {}
                    )

                    setItems([...wishList]);

                })
                .catch(err => err)
        } else {
            setItems([]);
        }

    }, [user.isAuthenticated]);

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