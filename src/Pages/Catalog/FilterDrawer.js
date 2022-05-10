import { useState, useEffect } from 'react';

import { Typography, Button, FilterAltIcon, CloseIcon, KeyboardArrowDownIcon, Slider, Checkbox } from "../../mui-imports.js";

import SwipeableDrawer from "../../Components/SwipeableDrawer/SwipeableDrawer";
import Dropdown from "../../Components/Dropdown/Dropdown";

import './FilterDrawer.scss';
import { getVehicleCategories, getVehicleMakes } from '../../services/vehicleService.js';

const mileageIntervals = [
    [0, 10000],
    [10000, 30000],
    [30000, 50000],
    [50000, 100000],
    [100000, 200000],
    [200000, 500000],
    [500000, '']
]

const initialFilter = {
    makes: [],
    price: [0, 100000],
    year: [1900, Number(new Date().getFullYear())],
    mileageInterval: []
}

export default function FilterDrawer(props) {

    const [categories, setCategories] = useState([]);
    const [makes, setMakes] = useState([]);

    const [areCategoriesOpened, setAreCategoriesOpened] = useState(false);
    const [isPriceFilterOpened, setIsPriceFilterOpened] = useState(false);
    const [isMakeFilterOpened, setIsMakeFilterOpened] = useState(false);
    const [isYearFilterOpened, setIsYearFilterOpened] = useState(false);
    const [isMileageFilterOpened, setIsMileageFilterOpened] = useState(false);

    const [checkedMakesCheckboxexIndexes, setCheckedMakesCheckboxesIndexes] = useState([-1]);
    const [checkedMileageCheckboxIndex, setCheckedMileageCheckboxIndex] = useState(-1);

    const [filter, setFilter] = useState(initialFilter);

    useEffect(() => {

        getVehicleCategories()
            .then(categories => setCategories(categories));

        getVehicleMakes()
            .then(makes => setMakes(makes));

    }, []);

    const handleMakesCheckBoxChange = (i, e) => {

        if (e.target.checked) {
            
            setFilter(filter => { return { ...filter, makes: [...filter.makes, makes[i]] } });
            setCheckedMakesCheckboxesIndexes(checked => {
                checked.push(i);
                return checked.slice(0);
            })

        } else {

            setFilter(filter => {
                return {
                    ...filter,
                    makes: filter.makes.filter(make => make != makes[i])
                };
            });

            setCheckedMakesCheckboxesIndexes(checked => checked.filter(index => index != i))
        }
    }

    const handleMileageCheckBoxChange = (i, e) => {

        if (e.target.checked) {
            console.log(checkedMakesCheckboxexIndexes);
            setFilter(filter => { return { ...filter, mileageInterval: mileageIntervals[i] } });

            setCheckedMileageCheckboxIndex(i);

        } else {

            setFilter(filter => {
                return {
                    ...filter,
                    mileageInterval: []
                };
            });

            setCheckedMileageCheckboxIndex(-1);

        }
    }

    const handleReset = () => {
        setFilter(initialFilter);
        setCheckedMileageCheckboxIndex(-1);
        setCheckedMakesCheckboxesIndexes([]);
    };

    return (
        <div className="catalog-content-options-filter-button-wrapper">
            <Button
                className="catalog-content-options-filter-button"
                variant="outlined"
                size="small"
                onClick={props.setIsOpened.bind(null, true)}>
                <FilterAltIcon fontSize="small"></FilterAltIcon>
                Filters
            </Button>
            <SwipeableDrawer
                isOpen={props.isOpened}
                setIsOpen={props.setIsOpened}
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
                                onClick={() => props.setIsOpened(false)}
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
                                                        filter.category == item.toLowerCase()
                                                            ? `catalog-filter-drawer-content-body-categories-list-item-text
                                                                catalog-filter-drawer-content-body-categories-list-item-selected-text`
                                                            : `catalog-filter-drawer-content-body-categories-list-item-text`
                                                    }
                                                    onClick={() => setFilter(filter => { return { ...filter, category: item.toLowerCase() } })}
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
                                <div className='catalog-filter-drawer-content-body-price-slider-wrapper'>
                                    <Slider
                                        size='small'
                                        value={filter.price}
                                        min={0}
                                        step={500}
                                        max={100000}
                                        onChange={(e, value) => setFilter(filter => { return { ...filter, price: value } })}
                                        valueLabelDisplay="auto"
                                    />
                                    <Typography>Price: €0.00 - €100 000.00</Typography>
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
                                    {makes.map((make, i) => (
                                        <div key={make} className='catalog-filter-drawer-content-body-makes-item'>
                                            <Checkbox
                                                className='catalog-filter-drawer-content-body-makes-checkbox'
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
                                                onChange={handleMakesCheckBoxChange.bind(null, i)}
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
                                <div className='catalog-filter-drawer-content-body-price-slider-wrapper'>
                                    <Slider
                                        size='small'
                                        value={filter.year}
                                        min={1900}
                                        step={1}
                                        max={new Date().getFullYear()}
                                        onChange={(e, value) => setFilter(filter => { return { ...filter, year: value } })}
                                        valueLabelDisplay="auto"
                                    />
                                    <Typography>Year: 1900 - {new Date().getFullYear()}</Typography>
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
                                <div className='catalog-filter-drawer-content-body-makes-wrapper'>
                                    {mileageIntervals.map((mileageInterval, i) => (
                                        <div key={mileageInterval[0]} className='catalog-filter-drawer-content-body-makes-item'>
                                            <Checkbox
                                                className='catalog-filter-drawer-content-body-makes-checkbox'
                                                sx={{ '& .MuiSvgIcon-root': { fontSize: 22 } }}
                                                onChange={handleMileageCheckBoxChange.bind(null, i)}
                                                checked={i == checkedMileageCheckboxIndex ? true : false}
                                            />
                                            <Typography variant='body1'>{`${mileageInterval[0]} - ${mileageInterval[1]}`}</Typography>
                                        </div>
                                    ))}
                                </div>

                            </Dropdown>
                        </div>
                    </div>
                    <div className="catalog-filter-drawer-content-footer-wrapper">
                        <div className="catalog-filter-drawer-content-footer-button-wrapper">
                            <Button
                                variant='contained'
                                className='catalog-filter-drawer-content-footer-button'
                            >
                                Apply
                            </Button>
                        </div>
                        <div className="catalog-filter-drawer-content-footer-button-wrapper">
                            <Button
                                variant='contained'
                                className='catalog-filter-drawer-content-footer-button'
                                onClick={handleReset}
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