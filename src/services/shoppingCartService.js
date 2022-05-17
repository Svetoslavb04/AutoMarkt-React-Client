const basePath = 'http://localhost:3000/shoppingCart';

export const getShoppingCart = () =>
    fetch(basePath, {
        method: 'GET',
        credentials: 'include'
    })
        .then(res => {
            if (res.status != 200) {
                throw Error;
            }

            return res.json();
            
        })
        .then(shoppingCart => shoppingCart.shoppingCart)
        .catch(err => []);

export const setShoppingCart = (items) =>
    fetch(`${basePath}/create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ items }),
        credentials: 'include'
    })
    .then(res => res.json())
    .then(shoppingCart => shoppingCart)
    .catch(err => {
        throw err;
    });