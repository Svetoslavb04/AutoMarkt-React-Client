import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from "react-router-dom";

import useUpdateEffect from '../../hooks/useUpdateEffect.js';
import { getCategoryAggregatedData, getVehicleCategories } from '../../services/vehicleService.js';

import { Typography, Button, FilterAltIcon, CloseIcon, KeyboardArrowDownIcon, Slider, Checkbox } from "../../mui-imports.js";

import SwipeableDrawer from "../../Components/SwipeableDrawer/SwipeableDrawer";
import Dropdown from "../../Components/Dropdown/Dropdown";

import './FilterDrawer.scss';

const mileageIntervals = [
    [0, 10000],
    [10000, 30000],
    [30000, 50000],
    [50000, 100000],
    [100000, 200000],
    [200000, 500000],
    [500000, '']
]

export default function FilterDrawer({ filter, setFiltering, isOpened, setIsOpened }) {

    let [searchParams] = useSearchParams();

    const [categories, setCategories] = useState([]);
    const [categoryData, setCategoryData] = useState({ makes: [] });

    const [areCategoriesOpened, setAreCategoriesOpened] = useState(false);
    const [isPriceFilterOpened, setIsPriceFilterOpened] = useState(false);
    const [isMakeFilterOpened, setIsMakeFilterOpened] = useState(false);
    const [isYearFilterOpened, setIsYearFilterOpened] = useState(false);
    const [isMileageFilterOpened, setIsMileageFilterOpened] = useState(false);

    const [priceSliderValue, setPriceSliderValue] = useState();
    const [yearSliderValue, setYearSliderValue] = useState();

    const [checkedMakesCheckboxexIndexes, setCheckedMakesCheckboxesIndexes] = useState([]);
    const [checkedMileageCheckboxIndex, setCheckedMileageCheckboxIndex] = useState(-1);

    const [filterInternal, setFilter] = useState(filter);

    useEffect(() => {

        setFilter(filter => { return { ...filter, category: searchParams.get('category') } });

        getCategoryAggregatedData(searchParams.get('category'))
            .then(data => {

                setPriceSliderValue([filter.priceGreaterThan || data.minPrice, filter.priceLowerThan || data.maxPrice]);
                setYearSliderValue([filter.yearGreaterThan || data.minYear, filter.yearLowerThan || data.maxYear]);

                if (filter.makes) {
                    const makesIndexes = data.makes
                        .filter(DataMake => filter.makes.some(make => make == DataMake))
                        .map(make => data.makes.indexOf(make));

                    setCheckedMakesCheckboxesIndexes(makesIndexes);
                } else { setCheckedMakesCheckboxesIndexes([]); }

                if (!isNaN(filter.mileageGreaterThan) && !isNaN(filter.mileageLowerThan)) {

                    const lowerValue = Number(filter.mileageGreaterThan);
                    const upperValue = Number(filter.mileageLowerThan);

                    mileageIntervals.forEach((interval, i) => {

                        if (lowerValue >= interval[0] && interval[1] && upperValue <= interval[1]) {
                            setCheckedMileageCheckboxIndex(i);
                        }

                        if (lowerValue >= interval[0] && interval[1] == '') {
                            setCheckedMileageCheckboxIndex(i);
                        }

                    });

                } else { setCheckedMileageCheckboxIndex(-1); }


                setCategoryData(data || {});
            });

        getVehicleCategories(true)
            .then(categories => setCategories(categories));

    },
    [searchParams, filter.makes, filter.mileageGreaterThan,filter.mileageLowerThan,
        filter.priceGreaterThan, filter.priceLowerThan, filter.yearGreaterThan, filter.yearLowerThan]);

    useUpdateEffect(() => {

        setFiltering(filterInternal);

    }, [filterInternal]);

    useUpdateEffect(() => {
        getCategoryAggregatedData(filterInternal.category)
            .then(data => {

                setPriceSliderValue([data.minPrice, data.maxPrice]);
                setYearSliderValue([data.minYear, data.maxYear]);
                setCheckedMakesCheckboxesIndexes([]);
                setCheckedMileageCheckboxIndex([-1]);

                setCategoryData(data || {});
            });

    }, [filterInternal.category]);

    const handleCategoryClick = (item) =>
        filterInternal.category != item.toLowerCase()
            ? setFilter(filter => {
                return { ...filter, category: item.toLowerCase() }
            })
            : setFilter(filter => { return { ...filter, category: undefined } });

    const handleMakesCheckBoxChange = (i) => {

        if (filterInternal.makes) {

            if (!filterInternal.makes.includes(categoryData.makes[i])) {

                setFilter(filter => { return { ...filter, makes: [...filter.makes, categoryData.makes[i]] } });

                setCheckedMakesCheckboxesIndexes(checked => {

                    checked.push(i);
                    return checked.slice(0);

                })

            } else {

                setFilter(filter => { return { ...filter, makes: filter.makes.filter(make => make != categoryData.makes[i]) } });
                setCheckedMakesCheckboxesIndexes(checked => checked.filter(index => index != i));
            }

        } else {

            setFilter(filter => { return { ...filter, makes: [categoryData.makes[i]] } });

            setCheckedMakesCheckboxesIndexes(checked => {

                checked.push(i);
                return checked.slice(0);

            });
        }

    }

    const handleMileageCheckBoxChange = (i) => {

        if (checkedMileageCheckboxIndex != i) {

            setFilter(filter => { return { ...filter, mileageGreaterThan: mileageIntervals[i][0], mileageLowerThan: mileageIntervals[i][1] || Number.MAX_SAFE_INTEGER } });

            setCheckedMileageCheckboxIndex(i);

        } else {

            setFilter(filter => {

                const { mileageInterval, ...rest } = filter;
                return rest;

            });

            setCheckedMileageCheckboxIndex(-1);

        }
    }

    const handleReset = () => {

        const newFilter = {};

        if (filterInternal.category) {
            newFilter.category = filterInternal.category;
        } else {
            newFilter.category = undefined;
        }

        setFilter(newFilter);

        setCheckedMileageCheckboxIndex(-1);
        setCheckedMakesCheckboxesIndexes([]);
        setPriceSliderValue([categoryData.minPrice, categoryData.maxPrice]);
        setYearSliderValue([categoryData.minYear, categoryData.maxYear]);

    };

    const toggleIsOpened = useCallback((isOpen) => {

        setIsOpened(isOpen);

        setAreCategoriesOpened(false);
        setIsPriceFilterOpened(false);
        setIsMakeFilterOpened(false);
        setIsYearFilterOpened(false);
        setIsMileageFilterOpened(false);

    }, [setIsOpened]);

    return (
        <div className="catalog-content-options-filter-button-wrapper">
            <Button
                className="catalog-content-options-filter-button"
                variant="outlined"
                size="small"
                onClick={setIsOpened.bind(null, true)}>
                <FilterAltIcon fontSize="small"></FilterAltIcon>
                Filters
            </Button>
            <SwipeableDrawer
                isOpen={isOpened}
                setIsOpen={toggleIsOpened}
                drawerWrapperClassName='catalog-filter-drawer-wrapper'
                side='left'
            >
                <div className="catalog-filter-drawer-content-wrapper">
                    <div className="catalog-filter-drawer-content-header-wrapper">
                        <div className="catalog-filter-drawer-content-header-text-wrapper">
                            <Typography variant="h6">Filters</Typography>
                        </div>
                        <div className="catalog-filter-drawer-content-header-close-icon-wrapper">
                            <CloseIcon
                                className='navigation-drawer-header-icon'
                                onClick={toggleIsOpened.bind(null, false)}
                            />
                        </div>
                    </div>
                    <div className="catalog-filter-drawer-content-body-wrapper">
                        <div className="catalog-filter-drawer-content-body-item-wrapper">
                            <Dropdown
                                toggleElement={
                                    <Toggler
                                        onClick={setAreCategoriesOpened.bind(null, !areCategoriesOpened)}
                                        text='Category'
                                        isOpened={areCategoriesOpened}
                                    />
                                }
                            >
                                <ul className='catalog-filter-drawer-content-body-categories-list'>
                                    {
                                        categories.map(item => (
                                            <li
                                                key={item}
                                                className='catalog-filter-drawer-content-body-categories-list-item'
                                            >
                                                <Typography
                                                    variant='body1'
                                                    className={
                                                        filterInternal.category == item.toLowerCase()
                                                            ? `catalog-filter-drawer-content-body-categories-list-item-text
                                                                catalog-filter-drawer-content-body-categories-list-item-selected-text`
                                                            : `catalog-filter-drawer-content-body-categories-list-item-text`
                                                    }
                                                    onClick={handleCategoryClick.bind(null, item)}
                                                >
                                                    {item}
                                                </Typography>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </Dropdown>
                        </div>
                        <div className="catalog-filter-drawer-content-body-item-wrapper">
                            <Dropdown
                                toggleElement={
                                    <Toggler
                                        onClick={setIsPriceFilterOpened.bind(null, !isPriceFilterOpened)}
                                        text='Price'
                                        isOpened={isPriceFilterOpened}
                                    />
                                }
                            >
                                <div className='catalog-filter-drawer-content-body-slider-wrapper'>
                                    <Slider
                                        size='small'
                                        disabled={!Boolean(categoryData.category)}
                                        value={priceSliderValue}
                                        min={categoryData.minPrice}
                                        step={categoryData.maxPrice > 10000 ? 500 : 100}
                                        max={categoryData.maxPrice}
                                        onChange={(e, value) => setPriceSliderValue(value)}
                                        onChangeCommitted={(e, value) => setFilter(filter => { return { ...filter, priceGreaterThan: value[0], priceLowerThan: value[1] } })}
                                        valueLabelDisplay="auto"
                                    />
                                    <Typography>
                                        Price: {categoryData.category
                                            ? `€${priceSliderValue[0]}.00 - €${priceSliderValue[1]}.00`
                                            : ''}
                                    </Typography>
                                </div>
                            </Dropdown>
                        </div>
                        <div className="catalog-filter-drawer-content-body-item-wrapper">
                            <Dropdown
                                toggleElement={
                                    <Toggler
                                        onClick={setIsMakeFilterOpened.bind(null, !isMakeFilterOpened)}
                                        text='Make'
                                        isOpened={isMakeFilterOpened}
                                    />
                                }
                            >
                                <div className='catalog-filter-drawer-content-body-makes-wrapper'>
                                    {categoryData?.makes.map((make, i) => (
                                        <div
                                            key={make}
                                            className='catalog-filter-drawer-content-body-checkbox-item'
                                            onClick={handleMakesCheckBoxChange.bind(null, i)}
                                        >
                                            <Checkbox
                                                className='catalog-filter-drawer-content-body-checkbox'
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
                                                checked={checkedMakesCheckboxexIndexes.includes(i) ? true : false}
                                            />
                                            <Typography variant='body1'>{make}</Typography>
                                        </div>
                                    ))}
                                </div>

                            </Dropdown>
                        </div>
                        <div className="catalog-filter-drawer-content-body-item-wrapper">
                            <Dropdown
                                toggleElement={
                                    <Toggler
                                        onClick={setIsYearFilterOpened.bind(null, !isYearFilterOpened)}
                                        text='Year'
                                        isOpened={isYearFilterOpened}
                                    />
                                }
                            >
                                <div className='catalog-filter-drawer-content-body-slider-wrapper'>
                                    <Slider
                                        size='small'
                                        disabled={!Boolean(categoryData.category)}
                                        value={yearSliderValue}
                                        min={categoryData.minYear}
                                        step={1}
                                        max={categoryData.maxYear}
                                        onChange={(e, value) => setYearSliderValue(value)}
                                        onChangeCommitted={(e, value) => setFilter(filter => { return { ...filter, yearGreaterThan: value[0], yearLowerThan: value[1] } })}
                                        valueLabelDisplay="auto"
                                    />
                                    <Typography>
                                        Year: {
                                            categoryData.category
                                                ? `${yearSliderValue[0]} - ${yearSliderValue[1]}`
                                                : ''
                                        }
                                    </Typography>
                                </div>
                            </Dropdown>
                        </div>
                        <div className="catalog-filter-drawer-content-body-item-wrapper">
                            <Dropdown
                                toggleElement={
                                    <Toggler
                                        onClick={setIsMileageFilterOpened.bind(null, !isMileageFilterOpened)}
                                        text='Mileage'
                                        isOpened={isMileageFilterOpened}
                                    />
                                }
                            >
                                <div>
                                    {
                                        categoryData.category
                                            ? mileageIntervals.map((mileageInterval, i) => (
                                                <div
                                                    key={mileageInterval[0]}
                                                    className='catalog-filter-drawer-content-body-checkbox-item'
                                                    onClick={handleMileageCheckBoxChange.bind(null, i)}
                                                >
                                                    <Checkbox
                                                        className='catalog-filter-drawer-content-body-checkbox'
                                                        sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
                                                        checked={i == checkedMileageCheckboxIndex ? true : false}
                                                    />
                                                    <Typography variant='body1'>{`${mileageInterval[0]} - ${mileageInterval[1]}`}</Typography>
                                                </div>
                                            ))
                                            : ''
                                    }
                                </div>

                            </Dropdown>
                        </div>
                    </div>
                    <div className="catalog-filter-drawer-content-footer-wrapper">
                        <div className="catalog-filter-drawer-content-footer-button-wrapper">
                            <Button
                                variant='contained'
                                className='catalog-filter-drawer-content-footer-button'
                                onClick={handleReset}
                                size='small'
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                </div>
            </SwipeableDrawer >

        </div >)
}

const Toggler = (props) => (
    <div
        className='catalog-filter-drawer-content-body-toggler'
        onClick={props.onClick}
    >
        <Typography variant='h6' className='catalog-filter-drawer-content-body-toggler-text'>
            {props.text}
        </Typography>
        <KeyboardArrowDownIcon
            className={`dynamic-arrow ${props.isOpened ? 'rotated' : 'closed'}`}
        />
    </div>
)