export const getVehiclesCount = (category) =>
    fetch(`http://localhost:3000/vehicles/count${category ? `?category=${category}` : ''}`)
        .then(res => res.json())
        .then(data => data.count)
        .catch(err => err);

export const getVehiclesPerPage = (page, pageSize, sort, category) => {

    let path = `http://localhost:3000/vehicles?page=${page}&pageSize=${pageSize}`;

    if (sort) { path += `&sort=${sort}`; }

    if (category) { path += `&category=${category}`; }

    return fetch(path)
        .then(res => res.json())
        .catch(err => []);
}

export const getLatestVehicles = (count) =>
    fetch(`http://localhost:3000/vehicles?latest=${count}`)
        .then(res => res.json())
        .catch(err => []);

export const getVehicleCategories = () =>
    fetch(`http://localhost:3000/vehicles/categories`)
        .then(res => res.json())
        .then(data => data.categories)
        .catch(err => []);

export const getVehicleMakes = () =>
    fetch(`http://localhost:3000/vehicles/makes`)
        .then(res => res.json())
        .then(data => data.makes)
        .catch(err => []);

