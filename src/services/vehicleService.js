const path = 'http://localhost:3000/vehicles';

export const getVehicle = (_id) =>
    fetch(`${path}/${_id}`)
        .then(res => res.json())
        .then(vehicle => vehicle)
        .catch(err => {});

export const getVehiclesPerPage = (page, pageSize, sort, filter) => {

    let pagePath = `${path}?page=${page}&pageSize=${pageSize}`;

    if (sort) { pagePath += `&sort=${sort}`; }

    if (filter.category) { pagePath += `&category=${filter.category}`; }

    if (filter.priceInterval) {
        pagePath += filter.priceInterval.map(price => `&priceInterval=${price}`).join('');
    }

    if (filter.makes) {
        pagePath += filter.makes.map(make => `&makes=${make}`).join('');
    }

    if (filter.yearsInterval) {
        pagePath += filter.yearsInterval.map(years => `&yearInterval=${years}`).join('')
    }

    if (filter.mileageInterval) {
        pagePath += `&mileageInterval=${filter.mileageInterval[0]}&mileageInterval=${filter.mileageInterval[1]}`;
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

    if (filter.priceInterval) {
        countPath += filter.priceInterval.map(price => `&priceInterval=${price}`).join('');
    }

    if (filter.makes) {
        countPath += filter.makes.map(make => `&makes=${make}`).join('');
    }

    if (filter.yearsInterval) {
        countPath += filter.yearsInterval.map(years => `&yearInterval=${years}`).join('')
    }

    if (filter.mileageInterval) {
        countPath += `&mileageInterval=${filter.mileageInterval[0]}&mileageInterval=${filter.mileageInterval[1]}`;
    }

    return fetch(countPath)
        .then(res => res.json())
        .then(data => data.count)
        .catch(err => err);
}

export const getVehicleCategories = () =>
    fetch(`${path}/categories`)
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
        .catch(err => err);