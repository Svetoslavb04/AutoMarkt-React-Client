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
        
        if (location.pathname != '/logout') {

            const localItems = getItem() || [];
            
            if (user.isAuthenticated) {

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

                setItems(localItems);
                setAreItemsSettled(true);

            }
        }

    }, [user.isAuthenticated, location]);

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

const areSame = (array1, array2) => {
    if (array1.length != array2.length) {
        return false;
    }

    let difference = array1
        .filter(x => !array2.includes(x))
        .concat(array2.filter(x => !array1.includes(x)));

    if (difference.length > 0) {
        return false;
    }

    return true;
}