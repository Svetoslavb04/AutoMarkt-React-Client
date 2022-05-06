export const getAll = () => {
    return fetch('http://localhost:3000/vehicles')
        .then(res => res.json())
        .catch(err => err);
}