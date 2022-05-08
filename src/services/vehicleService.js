export const getAll = () =>
    fetch('http://localhost:3000/vehicles')
        .then(res => res.json())
        .catch(err => err);

export const getAllVehiclesCount = () =>
    fetch('http://localhost:3000/vehicles/count')
        .then(res => res.json())
        .then(data => data.count)
        .catch(err => err);

export const getVehiclesPerPage = (page, pageSize, sort) =>
    fetch(`http://localhost:3000/vehicles?page=${page}&pageSize=${pageSize}${sort ? `&sort=${sort}` : ''}`)
        .then(res => res.json())
        .catch(err => err);