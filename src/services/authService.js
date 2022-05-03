export const login = (email, password) =>
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => {
            if (data.status == 401) {
                throw data;
            } else {
                return data
            }
        })
        .catch(err => {
            throw err;
        })

export const logout = () =>
    fetch('http://localhost:3000/logout', {
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

export const refreshToken = () =>
    fetch('http://localhost:3000/refreshToken', {
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