import { useState, createContext, useContext, useEffect } from "react";
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

    useEffect(() => {
        
        if (location.pathname != '/logout' && !areItemsSettled) {
            
            if (user.isAuthenticated) {

                const localItems = getItem() || [];

                const fetchCart = async () => {
                    try {
                        const shoppingCart = await getShoppingCart();

                        let resultCart = [...localItems, ...shoppingCart]
                            .filter((item, i, items) => items.indexOf(item) == i);

                        setItems(resultCart);
                        setAreItemsSettled(true);
                        removeItem();

                    } catch (error) {

                        setItems(localItems);
                        setAreItemsSettled(true);
                        removeItem();
                    }
                }

                fetchCart();

            } else {

                setItems(getItem() || []);
                setAreItemsSettled(true);

            }
        }

    }, [user.isAuthenticated]);

    useEffect(() => {
        
        if (location.pathname != '/logout' && areItemsSettled) {

            const effect = async () => {
                try {
                    
                    if (user.isAuthenticated) {

                        await setShoppingCart(items);

                    } else if (location.pathname != '/logout') {

                        setItem(items);

                    }


                } catch (error) {

                }
            }

            if (areItemsSettled) {
                effect();
            }

        }

    }, [items]);

    return areItemsSettled
        ? <ShoppingCartContext.Provider
            value={
                {
                    shoppingCartItems: items,
                    setShoppingCartItems: setItems,
                    shoppingCartItemsCount: items.length
                }
            }
        >
            {props.children}
        </ShoppingCartContext.Provider>
        : <></>
}

export const useShoppingCartContext = () => useContext(ShoppingCartContext);