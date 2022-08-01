import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import useUpdateEffect from "../../hooks/useUpdateEffect";

import { useCatalogDataContext } from "../../contexts/CatalogDataContext";
import { useLoadingContext } from "../../contexts/LoadingContext";

import { getVehicleBySearchQuery, getVehiclesPerPage } from "../../services/vehicleService";

import { Typography, Pagination, CircularProgress } from "../../mui-imports.js";

import CommonPage from "../CommonPage/CommonPage";
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

    const { setIsLoading } = useLoadingContext();

    const {
        page, setPage, pageSize, setPageSize, pageSizeOptions,
        sorting, setSorting,
        filtering, setFiltering
    } = useCatalogDataContext();

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const [areVehiclesLoading, setAreVehicleLoading] = useState(true);

    const [vehiclesData, setVehiclesData] = useState();

    const [isFilterDrawerOpened, setIsFilterDrawerOpened] = useState(false);

    useEffect(() => {

        if (vehiclesData) {

            setAreVehicleLoading(false);

        }
        
    }, [vehiclesData]);

    useEffect(() => {

        setPage(1);

        if (!searchParams.get('search')) {
            setFiltering(filter => { return { ...filter, category: searchParams.get('category') } });
        }

        setIsLoading(false);

    }, [setIsLoading, setFiltering, searchParams, setPage]);

    useUpdateEffect(() => setPage(1), [sorting]);

    useUpdateEffect(() => {

        setPage(1);

        if (searchParams.get('search')) {
            navigate(`/catalog`, { replace: true });
        } else {
            if (filtering.category != searchParams.get('category')) {
                if (!filtering.category) {
                    navigate(`/catalog`, { replace: true });
                } else {
                    navigate(`/catalog?category=${filtering.category}`, { replace: true });
                }

            }
        }

    }, [filtering]);

    useEffect(() => {

        setAreVehicleLoading(true);

        if (searchParams.get('search')) {
            getVehicleBySearchQuery(searchParams.get('search'), page, pageSize, sorting == 'default' ? undefined : sorting)
                .then(data => setVehiclesData(data));
        } else {
            getVehiclesPerPage(page, pageSize, sorting == 'default' ? undefined : sorting, filtering)
                .then(data => setVehiclesData(data));
        }

    }, [page, pageSize, searchParams, sorting, filtering]);

    useUpdateEffect(() => setPage(1), [pageSize]);

    const handleSortingTypeChange = (sortingType) => setSorting(sortingTypes[sortingType]);

    const handleVehiclesPerPageChange = (number) => setPageSize(Number(number));

    return (
        <CommonPage breadcrumbs={filtering.category ? ['Home', 'Catalog', categories[filtering.category]] : ['Home', 'Catalog']}>
            <Typography variant='h3' component='h1' className='catalog-header-text'>
                {filtering.category ? categories[filtering.category] : 'Catalog'}
            </Typography>
            <div className="catalog-content">
                <div className='catalog-content-options'>
                    <FilterDrawer
                        isOpened={isFilterDrawerOpened}
                        setIsOpened={setIsFilterDrawerOpened}
                        vehiclesData={vehiclesData}
                    />
                    <div className="catalog-content-options-sort-by-wrapper">
                        <Typography variant='body1' component='h3' className='catalog-content-options-sort-by-text'>Sort By</Typography>
                        <SelectDropdown
                            onChange={handleSortingTypeChange}
                            items={Object.keys(sortingTypes)}
                            defaultSelected={Object.keys(sortingTypes).find(key => sortingTypes[key] === sorting)}
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
                            defaultSelected={pageSize}
                            dropdownWrapperClassName='catalog-content-options-dropdown-wrapper'
                            openButtonClassName='catalog-content-options-dropdown-show-open-button'
                            openButtonSize='small'
                            menuItemClassName='catalog-content-options-dropdown-menu-item'
                        />
                    </div>
                </div>
                <div
                    className=
                    {`catalog-content-items-list${vehiclesData?.vehicles?.length > 0
                        ? '' : ' catalog-content-items-list-empty'}${areVehiclesLoading
                            ? ' catalog-content-items-list-loading' : ''
                        }`
                    }
                >
                    {
                        areVehiclesLoading
                            ? <div className="create-loading-wrapper">
                                <CircularProgress color='primary' className='create-loading-svg' />
                            </div>
                            : vehiclesData && vehiclesData.vehicles && vehiclesData.vehicles.length > 0
                                ? vehiclesData.vehicles.map(vehicle => {
                                    return (
                                        <Link
                                            to={`/catalog/${vehicle._id}`}
                                            key={vehicle._id}
                                            className='navigation-link-element catalog-vehicle-card-link-wrapper'
                                        >
                                            <VehicleCard
                                                publisherId={vehicle.publisherId}
                                                _id={vehicle._id}
                                                make={vehicle.make}
                                                model={vehicle.model}
                                                year={vehicle.year}
                                                mileage={vehicle.mileage}
                                                price={vehicle.price}
                                                imageUrl={vehicle.imageUrl}
                                                buttons={true}
                                            />
                                        </Link>)
                                })

                                : <Typography className="catalog-no-vehicles-text">There are no vehicles available</Typography>
                    }
                </div>
            </div>
            <div className="page-pagination-wrapper">
                <Pagination
                    count={areVehiclesLoading ? 0 : Math.ceil(vehiclesData?.meta?.count / pageSize)}
                    variant="outlined"
                    color="primary"
                    onChange={(e, value) => setPage(value)}
                    page={page}
                />
            </div>
        </CommonPage >
    )
}