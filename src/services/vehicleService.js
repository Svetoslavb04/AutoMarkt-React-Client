export const getVehiclesCount = (filter) => {

    let path = 'http://localhost:3000/vehicles/count?';

    if (filter.category) { path += `&category=${filter.category}`; }

    if (filter.priceInterval) {
        path += filter.priceInterval.map(price => `&priceInterval=${price}`).join('');
    }

    if (filter.makes) {
        path += filter.makes.map(make => `&makes=${make}`).join('');
    }

    if (filter.yearsInterval) {
        path += filter.yearsInterval.map(years => `&yearInterval=${years}`).join('')
    }

    if (filter.mileageInterval) {
        path += `&mileageInterval=${filter.mileageInterval[0]}&mileageInterval=${filter.mileageInterval[1]}`;
    }

    return fetch(path)
        .then(res => res.json())
        .then(data => data.count)
        .catch(err => err);
}


export const getVehiclesPerPage = (page, pageSize, sort, filter) => {

    let path = `http://localhost:3000/vehicles?page=${page}&pageSize=${pageSize}`;

    if (sort) { path += `&sort=${sort}`; }

    if (filter.category) { path += `&category=${filter.category}`; }

    if (filter.priceInterval) {
        path += filter.priceInterval.map(price => `&priceInterval=${price}`).join('');
    }

    if (filter.makes) {
        path += filter.makes.map(make => `&makes=${make}`).join('');
    }

    if (filter.yearsInterval) {
        path += filter.yearsInterval.map(years => `&yearInterval=${years}`).join('')
    }

    if (filter.mileageInterval) {
        path += `&mileageInterval=${filter.mileageInterval[0]}&mileageInterval=${filter.mileageInterval[1]}`;
    }


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

export const getCategoryAggregatedData = (category) =>
    fetch(`http://localhost:3000/vehicles/categoryData${category ? `?category=${category}` : ''}`)
        .then(res => res.json())
        .then(data => {

            if (data.data.message) {

                return { makes: [] };

            }

            return data.data;

        })
        .catch(err => err);

