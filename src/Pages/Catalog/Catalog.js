import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import useUpdateEffect from "../../hooks/useUpdateEffect";

import { getVehiclesCount, getVehiclesPerPage } from "../../services/vehicleService";

import { Typography, Pagination, CircularProgress } from "../../mui-imports.js";

import Breadcrumbs from "../../Components/Breadcrumbs/Breadcrumbs";
import SelectDropdown from "../../Components/SelectDropdown/SelectDropdown";
import VehicleCard from "../../Components/VehicleCard/VehicleCard";
import FilterDrawer from "./FilterDrawer";

import './Catalog.scss';

const categories = {
    motorcycle: 'Motorcycles',
    car: 'Cars',
    atv: 'ATVs',
    snowbike: 'Snowbikes',
    truck: 'Trucks'
};

const sortingTypes = {
    'Default': 'default',
    'Name (A-Z)': 'makeAsc',
    'Name (Z-A)': 'makeDesc',
    'Price Low to High': 'priceAsc',
    'Price High to Low': 'priceDesc',
    'Oldest to Newest': 'yearAsc',
    'Newest to Oldest': 'yearDesc',
    'Post Oldest to Newest': 'postedOnAsc',
    'Post Newest to Oldest': 'postedOnDesc',
};

export default function Catalog() {

    const navigate = useNavigate();

    let [searchParams] = useSearchParams();

    const [areVehiclesLoading, setAreVehicleLoading] = useState(true);

    const [allVehiclesCount, setAllVehiclesCount] = useState(0);

    const [vehicles, setVehicles] = useState([]);

    const { page, setPage, pageSize, setPageSize, pageSizeOptions } = usePagination(onPageChange, onPageSizeChange);

    const [sorting, setSorting] = useState('default');

    const [isFilterDrawerOpened, setIsFilterDrawerOpened] = useState(false);

    const [filtering, setFiltering] = useState({});

    const getVehiclesFromService = (page) => {

        setAreVehicleLoading(true);
        getVehiclesPerPage(page, pageSize, sorting == 'default' ? undefined : sorting, filtering)
            .then(vehicles => {

                setVehicles(vehicles);
                setAreVehicleLoading(false);

            });
    }

    useUpdateEffect(() => {

        setPage(1);
        getVehiclesFromService(1);

    }, [sorting]);

    useUpdateEffect(() => {

        if (filtering.category != searchParams.get('category')) {
            if (!filtering.category) {
                return navigate(`/catalog`, { replace: true });
            }

            return navigate(`/catalog?category=${filtering.category}`, { replace: true })
        }

        setPage(1);
        getVehiclesFromService(1);

        getVehiclesCount(filtering)
            .then(count => setAllVehiclesCount(count));

    }, [filtering]);

    function onPageChange() { return getVehiclesFromService(page); };

    function onPageSizeChange() { return getVehiclesFromService(1); };

    const handleSortingTypeChange = (sortingType) => setSorting(sortingTypes[sortingType]);

    const handleVehiclesPerPageChange = (number) => setPageSize(Number(number));

    return (
        <div className='common-page-wrapper'>
            <Breadcrumbs items={['Home', 'Catalog']} />
            <Typography variant='h3' component='h1' className='catalog-header-text'>
                {filtering.category ? categories[filtering.category] : 'Catalog'}
            </Typography>
            <div className="catalog-content">
                <div className='catalog-content-options'>
                    <FilterDrawer
                        isOpened={isFilterDrawerOpened}
                        setIsOpened={setIsFilterDrawerOpened}
                        setFiltering={setFiltering}
                        filter={filtering}
                    />
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
                        areVehiclesLoading
                            ? <CircularProgress color="primary" />
                            : vehicles.length > 0
                                ? vehicles.map(vehicle => {
                                    return (
                                        <Link to={`/vehicles/${vehicle._id}`} className='navigation-link-element'>
                                            <VehicleCard
                                                key={vehicle._id}
                                                make={vehicle.make}
                                                model={vehicle.model}
                                                year={vehicle.year}
                                                mileage={vehicle.mileage}
                                                price={vehicle.price}
                                                imageUrl={vehicle.imageUrl}
                                            />
                                        </Link>)
                                })

                                : <Typography className="catalog-no-vehicles-text">There are no vehicles available</Typography>
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