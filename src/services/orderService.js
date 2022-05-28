import { baseUrl } from '../config/api';

const basePath = `${baseUrl}/orders`;

export const getAllCountries = () => fetch('https://restcountries.com/v2/all?fields=name')
    .then(res => res.json())
    .then(countries => countries.map(c => c.name))
    .catch(err => {
    });

export const createOrder = (order) => fetch(basePath, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(order)
})
    .then(res => res.json())
    .then(data => {
        if (data.status != 200) {
            throw data;
        }

        return data.order;

    })
    .catch(err => {
        if (err.errors) {

            const messagesArray = Object.values(err.errors);

            throw { messages: messagesArray };
        }

        throw { message: 'Failed to create order!' };
    });

export const getOrderById = (_id) => fetch(`${basePath}/${_id}`)
    .then(res => res.json())
    .then(data => data.order)
    .catch(err => {
        throw Error;
    });

export const getOrdersByUser = () => fetch(basePath, {
    method: 'GET',
    credentials: 'include'
})
    .then(res => res.json())
    .then(data => {

        if (data.status != 200) {
            throw Error;
        }

        return data.orders
    })
    .catch(err => []);
