import { useState, createContext, useContext, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import useUpdateEffect from "../hooks/useUpdateEffect";
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

        setAreItemsSettled(false);

        if (!user.isAuthenticated || location.pathname == '/logout') {

            const shoppingCart = getItem();

            setItems(shoppingCart ? [...shoppingCart] : []);

        } else {
            getShoppingCart()
                .then(shoppingCart => {

                    setItems([...shoppingCart]);

                })
                .catch(err => err)
        }

    }, [location]);

    useUpdateEffect(() => {
        if (!user.isAuthenticated) {

            setItem(items);

        } else {

            setShoppingCart(items);

        }

        setAreItemsSettled(true);

    }, [items]);

    useUpdateEffect(() => {
        if (user.isAuthenticated) {

            removeItem();

            getShoppingCart()
                .then(shoppingCart => {

                    items.forEach(item =>
                        !shoppingCart.includes(item)
                            ? shoppingCart.push(item)
                            : {}
                    )

                    setItems([...shoppingCart]);

                })
                .catch(err => err)
        } else {
            setItems([]);
        }

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