import { useState, useEffect } from "react";
import usePagination from "../../hooks/usePagination";

import { getAllVehiclesCount, getVehiclesPerPage } from "../../services/vehicleService";

import { Box, Typography, Button, Pagination } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

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

    const { page, setPage, pageSize, setPageSize, pageSizeOptions } = usePagination();

    const [sorting, setSorting] = useState('default');

    useEffect(() => {

        setPage(1);

        getVehiclesPerPage(1, pageSize, sorting)
            .then(vehicles => setVehicles(vehicles));
            
    }, [sorting]);

    useEffect(() => {
        
        getVehiclesPerPage(page, pageSize, sorting)
            .then(vehicles => setVehicles(vehicles));

        getAllVehiclesCount()
            .then(count => setAllVehiclesCount(count));

    }, [page, pageSize]);

    const handleSortingTypeChange = (sortingType) => setSorting(sortingTypes[sortingType]);
    const handleVehiclesPerPageChange = (number) => setPageSize(Number(number));

    return (
        <Box className='common-page-wrapper'>
            <Breadcrumbs items={['Home', 'Catalog']} />
            <Typography variant='h3' component='h1' className='catalog-header-text'>Catalog</Typography>
            <Box className="catalog-content">
                <Box className='catalog-content-options'>
                    <Box className="catalog-content-options-filter-button-wrapper">
                        <Button className="catalog-content-options-filter-button" variant="outlined" size="small">
                            <FilterAltIcon fontSize="small"></FilterAltIcon>
                            Filters
                        </Button>
                    </Box>
                    <Box className="catalog-content-options-sort-by-wrapper">
                        <Typography variant='body1' component='h3' className='catalog-content-options-sort-by-text'>Sort By</Typography>
                        <SelectDropdown
                            onChange={handleSortingTypeChange}
                            items={Object.keys(sortingTypes)}
                            dropdownWrapperClassName='catalog-content-options-dropdown-wrapper'
                            openButtonClassName='catalog-content-options-dropdown-sort-by-open-button'
                            openButtonSize='small'
                            menuItemClassName='catalog-content-options-dropdown-menu-item'
                        />
                    </Box>
                    <Box className="catalog-content-options-show-wrapper">
                        <Typography variant='body1' component='h3' className='catalog-content-options-show-text'>Show</Typography>
                        <SelectDropdown
                            onChange={handleVehiclesPerPageChange}
                            items={Object.keys(pageSizeOptions)}
                            dropdownWrapperClassName='catalog-content-options-dropdown-wrapper'
                            openButtonClassName='catalog-content-options-dropdown-show-open-button'
                            openButtonSize='small'
                            menuItemClassName='catalog-content-options-dropdown-menu-item'
                        />
                    </Box>
                </Box>
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

                            : <h1>No </h1>
                    }
                </div>
            </Box>
            <div className="page-pagination-wrapper">
                <Pagination
                    count={Math.ceil(allVehiclesCount / pageSize)}
                    variant="outlined"
                    color="primary"
                    onChange={(e, value) => setPage(value)}
                    page={page}
                />
            </div>
        </Box>
    )
}