import { baseUrl } from '../config/api';

export const login = (email, password) =>
    fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            if (data.status != 200) {
                throw data;
            } else {
                return data.user
            }
        })
        .catch(err => {
            throw err;
        })

export const register = (email, username, password) =>
    fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, username, password })
    })
        .then(res => res.json())
        .then(data => {
            if (data.status != 200) {
                throw data;
            } else {
                return data.user
            }
        })
        .catch(err => {
            throw err;
        })

export const logout = () =>
    fetch(`${baseUrl}/logout`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            else {
                throw res.json()
            }
        })
        .then(data => data);

export const authStatus = () =>
    fetch(`${baseUrl}/me`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {

            if (data.status == 401) {

                return undefined;

            } else {

                return data;
                
            }

        })
        .catch(err => {
            return undefined;
        });