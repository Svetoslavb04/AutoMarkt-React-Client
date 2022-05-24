const basePath = 'https://automarkt-rest-api.herokuapp.com/wishList';

export const getWishList = () =>
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
        .then(wishList => wishList.wishList)
        .catch(err => []);

export const setWishList = (items) =>
    fetch(`${basePath}/create`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ items }),
        credentials: 'include'
    })
    .then(res => res.json())
    .then(wishList => wishList)
    .catch(err => {
        throw err;
    });