import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import useUpdateEffect from "../../hooks/useUpdateEffect";

import { getAllVehiclesCount, getVehiclesPerPage } from "../../services/vehicleService";

import { Typography, Button, Pagination, FilterAltIcon } from "../../mui-imports.js";

import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import SelectDropdown from "../../Components/SelectDropdown/SelectDropdown";
import VehicleCard from "../../Components/VehicleCard/VehicleCard";

import './Catalog.scss';

const sortingTypes = {
    'Default': 'default',
    'Name (A-Z)': 'makeAsc',
    'Name (Z-A)': 'makeDesc',
    'Price Low to High': 'priceAsc',
    'Price High to Low': 'priceDesc',
    'Oldest to Newest': 'yearAsc',
    'Newest to Oldest': 'yearDesc',
}

export default function Catalog() {

    const [allVehiclesCount, setAllVehiclesCount] = useState(0);

    const [vehicles, setVehicles] = useState([]);

    const { page, setPage, pageSize, setPageSize, pageSizeOptions } = usePagination(onPageChange, onPageSizeChange);

    const [sorting, setSorting] = useState('default');

    const getVehiclesFromService = (page) => {
        getVehiclesPerPage(page, pageSize, sorting)
            .then(vehicles => setVehicles(vehicles));

        getAllVehiclesCount()
            .then(count => setAllVehiclesCount(count));
    }

    useEffect(() => {
        getVehiclesFromService(1);
    }, [])

    useUpdateEffect(() => {

        setPage(1);

        getVehiclesFromService(1);

    }, [sorting]);

    function onPageChange() { return getVehiclesFromService(page); };

    function onPageSizeChange() { return getVehiclesFromService(1); };

    const handleSortingTypeChange = (sortingType) => setSorting(sortingTypes[sortingType]);
    const handleVehiclesPerPageChange = (number) => setPageSize(Number(number));

    return (
        <div className='common-page-wrapper'>
            <Breadcrumbs items={['Home', 'Catalog']} />
            <Typography variant='h3' component='h1' className='catalog-header-text'>Catalog</Typography>
            <div className="catalog-content">
                <div className='catalog-content-options'>
                    <div className="catalog-content-options-filter-button-wrapper">
                        <Button className="catalog-content-options-filter-button" variant="outlined" size="small">
                            <FilterAltIcon fontSize="small"></FilterAltIcon>
                            Filters
                        </Button>
                    </div>
                    <div className="catalog-content-options-sort-by-wrapper">
                        <Typography variant='body1' component='h3' className='catalog-content-options-sort-by-text'>Sort By</Typography>
                        <SelectDropdown
                            onChange={handleSortingTypeChange}
                            items={Object.keys(sortingTypes)}
                            dropdownWrapperClassName='catalog-content-options-dropdown-wrapper'
                            openButtonClassName='catalog-content-options-dropdown-sort-by-open-button'
                            openButtonSize='small'
                            menuItemClassName='catalog-content-options-dropdown-menu-item'
                        />
                    </div>
                    <div className="catalog-content-options-show-wrapper">
                        <Typography variant='body1' component='h3' className='catalog-content-options-show-text'>Show</Typography>
                        <SelectDropdown
                            onChange={handleVehiclesPerPageChange}
                            items={Object.keys(pageSizeOptions)}
                            dropdownWrapperClassName='catalog-content-options-dropdown-wrapper'
                            openButtonClassName='catalog-content-options-dropdown-show-open-button'
                            openButtonSize='small'
                            menuItemClassName='catalog-content-options-dropdown-menu-item'
                        />
                    </div>
                </div>
                <div className="catalog-content-items-list">
                    {
                        vehicles.length > 0
                            ? vehicles.map(vehicle => {
                                return <VehicleCard
                                    key={vehicle._id}
                                    make={vehicle.make}
                                    model={vehicle.model}
                                    year={vehicle.year}
                                    mileage={vehicle.mileage}
                                    price={vehicle.price}
                                    imageUrl={vehicle.imageUrl}
                                />
                            })

                            : <Typography variant="h4">There are no vehicles available</Typography>
                    }
                </div>
            </div>
            <div className="page-pagination-wrapper">
                <Pagination
                    count={Math.ceil(allVehiclesCount / pageSize)}
                    variant="outlined"
                    color="primary"
                    onChange={(e, value) => setPage(value)}
                    page={page}
                />
            </div>
        </div>
    )
}