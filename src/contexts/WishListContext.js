import { useState, createContext, useContext, useEffect } from "react";
import useLocalStorage from '../hooks/useLocalStorage';
import useUpdateEffect from "../hooks/useUpdateEffect";
import { useAuthContext } from "./AuthContext";

import { getWishList, setWishList } from '../services/wishListService';

export const WishListContext = createContext();

export const WishListProvider = (props) => {

    const { user } = useAuthContext();

    const [items, setItems] = useState([]);

    const { getItem, setItem, clear } = useLocalStorage();

    const [areItemsSettled, setAreItemsSettled] = useState(false);

    useEffect(() => {

        if (!user.isAuthenticated) {
            
            const wishList = getItem('wishList');

            if (wishList) {

                setItems(wishList);

            }

            setAreItemsSettled(true);
        } else {
            getWishList()
                .then(wishList => {

                    setItems(wishList);

                    setAreItemsSettled(true);

                })
                .catch(err => err)
        }

    }, []);

    useUpdateEffect(() => {
        if (!user.isAuthenticated) {

            setItem('wishList', items);

        } else {

            setWishList(items);

        }

    }, [items]);

    useUpdateEffect(() => {
        if (user.isAuthenticated) {
            getWishList()
                .then(wishList => {

                    items.forEach(item =>
                        !wishList.includes(item)
                            ? wishList.push(item)
                            : {}
                    )

                    setItems(wishList);
                    
                })
                .catch(err => err)
        } else {
            setItems([]);
        }

        clear();
        setAreItemsSettled(true);

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