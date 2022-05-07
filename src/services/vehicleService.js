export const getAll = () => {
    return fetch('http://localhost:3000/vehicles')
        .then(res => res.json())
        .catch(err => err);
}

export const sort = (vehicles, sortingType) => {

    switch (sortingType) {
        case 'Default' || 'Name (A-Z)':
            vehicles = vehicles.sort((a, b) => a.make.localeCompare(b.make))
            break;
        case 'Name (Z-A)':
            vehicles = vehicles.sort((a, b) => b.make.localeCompare(a.make))
            break;
        case 'Price Low to High':
            vehicles = vehicles.sort((a, b) =>
                Number(a.price) - Number(b.price) || a.make.localeCompare(b.make)
            )
            break;
        case 'Price High to Low':
            vehicles = vehicles.sort((a, b) => 
                Number(b.price) - Number(a.price) || a.make.localeCompare(b.make)
                )
            break;
        case 'Oldest to Newest':
            vehicles = vehicles.sort((a, b) => 
            Number(a.year) - Number(b.year) || a.make.localeCompare(b.make)
            )
            break;
        case 'Newest to Oldest':
            vehicles = vehicles.sort((a, b) =>
            Number(b.year) - Number(a.year) || a.make.localeCompare(b.make)
            )
            break;
        default:
            break;
    }

    return [...vehicles]
}