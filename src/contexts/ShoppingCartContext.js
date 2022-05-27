import { useState, createContext, useContext, useEffect, useCallback } from "react";
import { useLocation } from 'react-router-dom';

import useLocalStorage from '../hooks/useLocalStorage';

import { useAuthContext } from "./AuthContext";

import { getShoppingCart, setShoppingCart } from '../services/shoppingCartService';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = (props) => {

    const location = useLocation();

    const { user } = useAuthContext();

    const [items, setItems] = useState([]);

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
                        const shoppingCart = await getShoppingCart();
                        
                        let resultCart = [...localItems, ...shoppingCart]
                            .filter((item, i, items) => items.indexOf(item) == i);

                        setItems(resultCart);
                        setAreItemsSettled(true);
                        localStorageRemoveItem();

                    } catch (error) {

                        setItems(localItems);
                        setAreItemsSettled(true);
                        localStorageRemoveItem();
                    }
                }

                fetchCart();

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
                        
                        await setShoppingCart(items);

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

    }, [items, areItemsSettled, localStorageSetItem, location.pathname, user.isAuthenticated]);

    return areItemsSettled
        ? <ShoppingCartContext.Provider
            value={
                {
                    shoppingCartItems: items,
                    setShoppingCartItems: setItems,
                    shoppingCartItemsCount: items?.length || 0
                }
            }
        >
            {props.children}
        </ShoppingCartContext.Provider>
        : <></>
}

export const useShoppingCartContext = () => useContext(ShoppingCartContext);