import { useState, createContext, useContext, useEffect } from "react";
import useLocalStorage from '../hooks/useLocalStorage';
import useUpdateEffect from "../hooks/useUpdateEffect";
import { useAuthContext } from "./AuthContext";

import { getShoppingCart, setShoppingCart } from '../services/shoppingCartService';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = (props) => {

    const { user } = useAuthContext();

    const [items, setItems] = useState([]);

    const { getItem, setItem, clear } = useLocalStorage();

    const [areItemsSettled, setAreItemsSettled] = useState(false);

    useEffect(() => {

        if (!user.isAuthenticated) {
            const shoppingCart = getItem('shoppingCart');

            if (shoppingCart) {

                setItems(shoppingCart);

            }

            setAreItemsSettled(true);
        } else {
            getShoppingCart()
                .then(shoppingCart => {

                    setItems(shoppingCart);

                    setAreItemsSettled(true);

                })
                .catch(err => err)
        }

    }, []);

    useUpdateEffect(() => {
        if (!user.isAuthenticated) {

            setItem('shoppingCart', items);

        } else {

            setShoppingCart(items);

        }

    }, [items]);

    useUpdateEffect(() => {
        if (user.isAuthenticated) {
            getShoppingCart()
                .then(shoppingCart => {

                    items.forEach(item =>
                        !shoppingCart.includes(item)
                            ? shoppingCart.push(item)
                            : {}
                    )

                    setItems(shoppingCart);
                    
                })
                .catch(err => err)
        } else {
            setItems([]);
        }

        clear();
        setAreItemsSettled(true);

    }, [user.isAuthenticated]);

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