import { baseUrl } from "../config/api";

const path = `${baseUrl}/vehicles`;

export const getVehicle = (_id) =>
    fetch(`${path}/${_id}`)
        .then(res => res.json())
        .then(vehicle => {

            if (!vehicle) {

                throw Error('Vehicle not found!')

            }

            return vehicle;

        })
        .catch(err => {
            throw err.message;
        });

export const getVehicles = (_ids) => {

    const promises = [];

    _ids.forEach(_id => promises.push(getVehicle(_id)));

    return Promise.allSettled(promises)
        .then(results => {
            
            const vehiclesResult = [];

            results.forEach(result =>
                result.status == 'fulfilled'
                    ? vehiclesResult.push(result.value)
                    : {}
            )

            return vehiclesResult;
        });
}

export const getVehiclesPerPage = (page, pageSize, sort, filter) => {

    let pagePath = `${path}?page=${page}&pageSize=${pageSize}`;

    if (sort) { pagePath += `&sort=${sort}`; }

    if (filter.category) { pagePath += `&category=${filter.category}`; }

    if (filter.priceGreaterThan) {
        pagePath += `&priceGreaterThan=${filter.priceGreaterThan}`
    }

    if (filter.priceLowerThan) {
        pagePath += `&priceLowerThan=${filter.priceLowerThan}`
    }

    if (filter.makes) {
        pagePath += filter.makes.map(make => `&makes=${make}`).join('');
    }

    if (filter.yearGreaterThan) {
        pagePath += `&yearGreaterThan=${filter.yearGreaterThan}`
    }

    if (filter.yearLowerThan) {
        pagePath += `&yearLowerThan=${filter.yearLowerThan}`
    }

    if (filter.mileageGreaterThan) {
        pagePath += `&mileageGreaterThan=${filter.mileageGreaterThan}`;
    }

    if (filter.mileageLowerThan) {
        pagePath += `&mileageLowerThan=${filter.mileageLowerThan}`;
    }


    return fetch(pagePath)
        .then(res => res.json())
        .catch(err => []);
}

export const getLatestVehicles = (count) =>
    fetch(`${path}?latest=${count}`)
        .then(res => res.json())
        .catch(err => []);

export const getVehiclesCount = (filter) => {

    let countPath = `${path}/count?`;

    if (filter.category) { countPath += `&category=${filter.category}`; }

    if (filter.priceGreaterThan) {
        countPath += `&priceGreaterThan=${filter.priceGreaterThan}`
    }

    if (filter.priceLowerThan) {
        countPath += `&priceLowerThan=${filter.priceLowerThan}`
    }

    if (filter.makes) {
        countPath += filter.makes.map(make => `&makes=${make}`).join('');
    }

    if (filter.yearGreaterThan) {
        countPath += `&yearGreaterThan=${filter.yearGreaterThan}`
    }

    if (filter.yearLowerThan) {
        countPath += `&yearLowerThan=${filter.yearLowerThan}`
    }

    if (filter.mileageGreaterThan) {
        countPath += `&mileageGreaterThan=${filter.mileageGreaterThan}`;
    }

    if (filter.mileageLowerThan) {
        countPath += `&mileageLowerThan=${filter.mileageLowerThan}`;
    }

    return fetch(countPath)
        .then(res => res.json())
        .then(data => data.count)
        .catch(err => err);
}

export const getVehicleCategories = (used) =>
    fetch(`${path}/categories?used=${used ? 'true' : 'false'}`)
        .then(res => res.json())
        .then(data => data.categories)
        .catch(err => []);

export const getCategoryAggregatedData = (category) =>
    fetch(`${path}/categoryData${category ? `?category=${category}` : ''}`)
        .then(res => res.json())
        .then(data => {

            if (data.data.message) {

                return { makes: [] };

            }

            return data.data;

        })
        .catch(err => { return { makes: [] } });

export const deleteVehicle = (_id) =>
    fetch(`${path}/${_id}`, {
        method: 'DELETE',
        credentials: 'include'
    })
        .then(res => {

            if (res.status != 200 || !res) {
                throw Error
            }

            return res.json();
        })
        .then(data => data.message)
        .catch(err => {
            throw Error('Failed to remove vehicle!');
        });

export const getImageUploadUrl = () =>
    fetch(`${path}/imageUploadUrl`, {
        method: 'GET',
        credentials: 'include'
    })
        .then(res => {
            if (res.status != 200) {
                throw res.json();
            }

            return res.json();
        })
        .then(res => {

            if (res) {
                return {
                    awsUrl: res.awsUrl,
                    imageUrl: res.awsUrl.split('?')[0]
                }
            } else {
                throw Error;
            }

        })
        .catch(async (err) => {
            const message = (await err)?.message;

            throw message || 'Error';
        });

export const createVehicle = (vehicle) =>
    fetch(`${path}/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(vehicle)
    })
        .then(res => res.json())
        .then(res => {

            if (res.status == 401) {
                throw Error(res.message);
            }

            if (res.status && res.status != 200) {
                throw Error('Invalid vehicle');
            }

            return res;
        })
        .catch(err => { throw err.message });

export const editVehicle = (vehicle) =>
    fetch(`${path}/${vehicle._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(vehicle)
    })
        .then(res => res.json())
        .then(res => {

            if (res.status == 401) {
                throw Error(res.message);
            }

            if (res.status && res.status != 200) {
                throw Error('Invalid vehicle');
            }

            return res;
        })
        .catch(err => { throw err.message })