const login = (email, password) =>
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
    })
        .then(res => res.json())
        .then(user => user)
        .catch(err => err);

const refreshToken = () =>
    fetch('http://localhost:3000/refreshToken', {
        method: 'GET',
        credentials: 'include'
    })
        .then(res => res.json())
        .then(data => data.xToken)
        .catch(err => err);

export default {
    login,
    refreshToken
}

