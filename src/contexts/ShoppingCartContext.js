import { useState, createContext, useContext, useEffect, useCallback } from "react";
import { useLocation } from 'react-router-dom';

import useLocalStorage from '../hooks/useLocalStorage';

import { useAuthContext } from "./AuthContext";

import { getShoppingCart, setShoppingCart } from '../services/shoppingCartService';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = (props) => {

    const location = useLocation();

    const { user } = useAuthContext();

    const [items, setItems] = useState({ cart: [], updateAPICart: false });

    const { getItem, setItem, removeItem } = useLocalStorage('shoppingCart');

    const [areItemsSettled, setAreItemsSettled] = useState(false);

    const localStorageGetItem = useCallback(() => getItem(), [getItem]);
    const localStorageSetItem = useCallback((item) => setItem(item), [setItem]);
    const localStorageRemoveItem = useCallback(() => removeItem(), [removeItem]);

    useEffect(() => {

        if (location.pathname != '/logout') {

            const localItems = localStorageGetItem() || [];

            if (user.isAuthenticated) {

                const fetchCart = async () => {
                    try {
                        setAreItemsSettled(true);

                        const shoppingCart = await getShoppingCart();

                        if (localItems.length > 0) {

                            let resultCart = [...localItems, ...shoppingCart]
                                .filter((item, i, items) => items.indexOf(item) == i);

                            setItems({ cart: resultCart, updateAPICart: true });

                        } else {
                            setItems({ cart: shoppingCart, updateAPICart: false });
                        }

                        localStorageRemoveItem();

                    } catch (error) {

                        setAreItemsSettled(true);
                        setItems({ cart: localItems, updateAPICart: true });
                        localStorageRemoveItem();

                    }
                }

                fetchCart();

            } else {

                setItems({ cart: localItems, updateAPICart: false });
                setAreItemsSettled(true);

            }
        }

    }, [user.isAuthenticated, location, localStorageGetItem, localStorageRemoveItem]);

    useEffect(() => {

        if (location.pathname != '/logout' && areItemsSettled) {

            const effect = async () => {
                try {

                    if (user.isAuthenticated && items.updateAPICart) {

                        await setShoppingCart(items.cart);

                    } else if (location.pathname != '/logout' && !user.isAuthenticated) {

                        localStorageSetItem(items.cart);

                    }


                } catch (error) {

                }
            }

            if (areItemsSettled) {
                effect();
            }

        }

    }, [items, areItemsSettled, localStorageSetItem, location.pathname, user.isAuthenticated]);

    const setShoppingCartItems = (items) => {
        setItems({ cart: items, updateAPICart: true });
    }

    return areItemsSettled
        ? <ShoppingCartContext.Provider
            value={
                {
                    shoppingCartItems: items.cart,
                    setShoppingCartItems: setShoppingCartItems,
                    shoppingCartItemsCount: items?.cart?.length || 0
                }
            }
        >
            {props.children}
        </ShoppingCartContext.Provider>
        : <></>
}

export const useShoppingCartContext = () => useContext(ShoppingCartContext);